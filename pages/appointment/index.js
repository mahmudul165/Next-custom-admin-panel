import React, { useEffect, useMemo, useState } from "react";
import MaterialReactTable from "material-react-table";
import useAuth from "/hook/useAuth";
import Link from "next/link";
import { useTherapitListQuery } from "../../hook/useApi";
//import PagePatientComponentTitle from "../../components/all-ticket/PageTicketComponentTitle";
import dynamic from "next/dynamic";

const AppointmentComponent = dynamic(() =>
  import("../../components/appointment/AppointmentComponent")
);
const Loading = dynamic(() => import("/components/common/Loading"));

function AllTicketList() {
  const { deleteData, Statustest, token, apiRootUrl, apiEndpoint } = useAuth();
  const { data, error, isError } = useTherapitListQuery();
  //console.log("All ticket data  from  ", data);

  const [remoteData, setRemoteData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const response = await fetch(
        `${apiRootUrl}${apiEndpoint?.appointment?.list}`,
        //"https://misiapi.lamptechs.com/api/v1/ticket",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const json = await response.json();
      setRemoteData(json.data);
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
        therapist_id: `${userData?.therapist_info?.id}`,
        therapist_name: `${userData.therapist_info?.first_name} ${userData.therapist_info?.last_name}`,
        appointment_type: userData?.type,
        therapist_schedule: userData?.therapist_schedule?.schedule_day,
        start_time: userData?.therapist_schedule?.start_time,
        end_time: userData?.therapist_schedule?.end_time,
        consulting_time: userData?.therapist_schedule?.consulting_time,
        time: userData.time,
        status: userData.status,
        language: userData.language,
        remarks: userData?.ticket_department_info?.remarks,
        therapist_comment: userData?.therapist_comment,
        fee: userData.fee,
        //ticket_history: userData.ticket_history,
        date: userData.date,
      })) ?? [],
    [remoteData]
  );

  const columns = useMemo(
    () => [
      {
        header: "id",
        id: "id",
      },
      {
        header: "Patient ID",
        id: "patient_info",
      },
      {
        header: "Patient name",
        id: "patient_name",
      },
      {
        header: "Therapist ID",
        id: "therapist_id",
      },
      {
        header: "Therapist name",
        id: "therapist_name",
      },
      {
        header: "Appointment_type",
        id: "appointment_type",
      },
      {
        header: "Therapist_schedule",
        id: "therapist_schedule",
      },
      {
        header: "start_time",
        id: "start_time",
      },
      {
        header: "end_time",
        id: "end_time",
      },
      {
        header: "consulting_time",
        id: "consulting_time",
      },

      {
        header: "time",
        id: "time",
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
        header: "Therapist_comment",
        id: "therapist_comment",
      },
      {
        header: "fee",
        id: "fee",
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
        <AppointmentComponent
          title="All appointment"
          buttonTitle="Create new appointment"
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
                positionActionsColumn="last"
                renderRowActions={({ row }) => (
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "nowrap",
                      gap: "0.5rem",
                    }}
                  >
                    <Link passHref href={`all-ticket/edit/${row.original.id}`}>
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
                          `${apiRootUrl}${apiEndpoint?.appointment?.delete}/${row?.original?.id}`
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

export default AllTicketList;
