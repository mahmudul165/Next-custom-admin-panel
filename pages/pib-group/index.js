import React, { useEffect, useMemo, useState } from "react";
import MaterialReactTable from "material-react-table";
import useAuth from "/hook/useAuth";
import Link from "next/link";
import { useTherapitListQuery } from "../../hook/useApi";
//import PagePatientComponentTitle from "../../components/all-ticket/PageTicketComponentTitle";
import dynamic from "next/dynamic";
import { CSVLink } from "react-csv";
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
        header: "Ticket id",
        id: "id",
        // muiTableHeadCellProps: {
        //   sx: {
        //     display: "none",
        //   },
        // },
      },
      {
        header: "Patient id",
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
        header: "Department",
        id: "ticket_department",
      },
      {
        header: "Location",
        id: "location",
      },

      {
        header: "Status treatment",
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
        header: "Strike history",
        id: "strike_history",
      },
      {
        header: "Ticket history",
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
              <>
                {remoteData?.length && (
                  <div className="flex items-end justify-end">
                    <CSVLink
                      filename="pib-group.csv"
                      data={parsedData}
                      // headers={columns.map((c) => c?.header)}
                      //className="mb-32 pb-12"
                    >
                      <button
                        type="button"
                        className="mb-32 pb-12 inline-flex px-2 py-2 text-white   hover:bg-teal-300 focus:bg-teal-400 rounded-md  mb-3"
                        style={{ backgroundColor: "#01a9ac" }}
                      >
                        Download Now
                      </button>
                    </CSVLink>
                  </div>
                )}
                <MaterialReactTable
                  enablePinning
                  enableColumnOrdering
                  enableRowOrdering
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
                      <Link
                        passHref
                        href={`/pib-group/pib-form/${row?.original?.id}`}
                      >
                        <button
                          className="text-purple-800 hover:underline"
                          // onClick={() => {
                          //   console.log("View Profile", row.original.id);
                          // }}
                        >
                          Create PiB
                        </button>
                      </Link>
                    </div>
                  )}
                />
              </>
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
