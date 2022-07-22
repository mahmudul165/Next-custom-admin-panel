import React, { useEffect, useMemo, useState } from "react";
import MaterialReactTable from "material-react-table";
import useAuth from "/hook/useAuth";
import Link from "next/link";
import { useTherapitListQuery } from "../../hook/useApi";
//import PagePatientComponentTitle from "../../components/all-ticket/PageTicketComponentTitle";
import dynamic from "next/dynamic";
const TicketComponent = dynamic(() =>
  import("../../components/PibFormula/TicketComponent")
);
const Loading = dynamic(() => import("/components/common/Loading"));

function PibGroup() {
  const { deleteData, Statustest, token, apiRootUrl, apiEndpoint } = useAuth();
  const { data, error, isError } = useTherapitListQuery();
  //console.log("All ticket data  from  ", data);

  const [remoteData, setRemoteData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const response = await fetch(
        `${apiRootUrl}${apiEndpoint?.ticket?.list}`,
        //"https://misiapi.lamptechs.com/api/v1/ticket",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const json = await response.json();
      setRemoteData(
        json.data.filter(
          (item) => item?.ticket_department_info?.name === "PiB Group(Moderate)"
        )
      );
      setIsLoading(false);
    };
    fetchData();
  }, [remoteData, token]);

  const parsedData = useMemo(
    () =>
      remoteData.map((userData) => ({
        //     id
        // patient_info
        // therapist_info
        // ticket_department_info
        // location
        // remarks
        // status
        // language
        // strike
        // strike_history
        // ticket_history
        // date

        id: `${userData.id}`,
        patient_info: `${userData.patient_info?.id}`,
        patient_name: `${userData.patient_info?.first_name} ${userData.patient_info?.last_name}`,
        // therapist_id: `${userData?.therapist_info?.id}`,
        therapist_name: `${userData.therapist_info?.first_name} ${userData.therapist_info?.last_name}`,
        ticket_department: userData?.ticket_department_info?.name,
        location: userData.location,
        status: `${Statustest(userData.status)}`,
        language: userData.language,
        remarks: userData?.remarks,
        strike: userData.strike,
        strike_history: userData.strike_history,
        ticket_history: userData.ticket_history,
        date: userData.date,
      })) ?? [],
    [remoteData]
  );

  const columns = useMemo(
    () => [
      {
        header: "Ticket_id",
        id: "id",
        // muiTableHeadCellProps: {
        //   sx: {
        //     display: "none",
        //   },
        // },
      },
      {
        header: "Patient_id",
        id: "patient_info",
      },
      {
        header: "Patient name",
        id: "patient_name",
      },
      // {
      //   header: "Therapist_id",
      //   id: "therapist_id",
      // },
      {
        header: "Therapist name",
        id: "therapist_name",
      },
      {
        header: "Ticket_department",
        id: "ticket_department",
      },
      {
        header: "Location",
        id: "location",
      },

      {
        header: "Status",
        id: "status",
      },
      {
        header: "Language",
        id: "language",
      },
      {
        header: "Remarks",
        id: "remarks",
      },

      {
        header: "Strike",
        id: "strike",
      },
      {
        header: "Strike_history",
        id: "strike_history",
      },
      {
        header: "Tickets_history",
        id: "ticket_history",
      },

      {
        header: "Date",
        id: "date",
      },
    ],
    []
  );
  return (
    <>
      <main className="p-6  space-y-6">
        <TicketComponent
          title="PiB Group (Moderate)"
          buttonTitle="Create new"
        />

        <section className="grid card  md:grid-cols-1 xl:grid-cols-1   ">
          <div className="p-4">
            {remoteData ? (
              <MaterialReactTable
                columns={columns}
                data={parsedData}
                // state={{
                //   isLoading
                // }}
                initialState={{
                  showGlobalFilter: true,
                  pagination: { pageSize: 5 },
                }}
                positionGlobalFilter="left"
                muiSearchTextFieldProps={{
                  variant: "outlined",
                  size: "small",
                  placeholder: "Search your data",
                  label: "Search",
                  InputLabelProps: { shrink: true },
                }}
                muiTableBodyRowProps={({ row }) => ({
                  sx: {
                    backgroundColor:
                      row.index % 2 === 0 ? "rgba(52, 54, 245, 0.08)" : "",
                  },
                })}
                muiTableBodyCellProps={{
                  sx: { border: "none" },
                  //align: "center",
                }}
                // muiTableContainerProps={{ sx: { maxHeight: 400 } }}
                muiTablePaperProps={{
                  sx: {
                    // maxWidth: "800px",
                    //m: "auto",
                  },
                }}
                muiTableContainerProps={{
                  sx: {
                    // maxHeight: "500px",
                  },
                }}
                //state={{ showSkeletons: true }}
                positionPagination="both"
                // row actions

                enableRowActions
                positionActionsColumn="first"
                renderRowActions={({ row }) => (
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "nowrap",
                      gap: "0.5rem",
                    }}
                  >
                    <Link passHref href={`pit-group/edit/${row.original.id}`}>
                      <button
                        className="text-purple-800 hover:underline"
                        // onClick={() => {
                        //   console.log("View Profile", row.original.id);
                        // }}
                      >
                        Edit
                      </button>
                    </Link>
                    <button
                      className="text-purple-800 hover:underline"
                      onClick={() =>
                        deleteData(
                          //`https://misiapi.lamptechs.com/api/v1/ticket/delete/${row?.original?.id}`
                          `${apiRootUrl}${apiEndpoint?.ticket?.delete}/${row?.original?.id}`
                        )
                      }
                    >
                      Delete
                    </button>
                  </div>
                )}
              />
            ) : (
              <>
                <Loading />
              </>
            )}
          </div>
        </section>
      </main>
    </>
  );
}

export default PibGroup;
