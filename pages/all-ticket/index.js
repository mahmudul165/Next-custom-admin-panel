// import React from "react";
// import TherapistListService from "../../components/therapist-List/TherapistListService";
// function index() {
//   return (
//     <>
//       <TherapistListService />
//     </>
//   );
// }

// export default index;

import React, { useEffect, useMemo, useState } from "react";
import MaterialReactTable from "material-react-table";
import useAuth from "/hook/useAuth";
import Link from "next/link";
import { useTherapitListQuery } from "../../hook/useApi";
import PagePatientComponentTitle from "../../components/all-ticket/PageTicketComponentTitle";
function AllTicketList() {
  const { deleteData, Statustest } = useAuth();
  const { data, error, isError } = useTherapitListQuery();
  console.log("All ticket data ", data);

  const [remoteData, setRemoteData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const response = await fetch(
        // "https://jsonplaceholder.typicode.com/users"
        "https://misiapi.lamptechs.com/api/v1/ticket"
      );
      const json = await response.json();
      setRemoteData(json);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  const parsedData = useMemo(
    () =>
      remoteData.map((userData) => ({
        //     id
        // patient_id
        // therapist_id
        // ticket_department_id
        // location
        // remarks
        // status
        // language
        // strike
        // strike_history
        // ticket_history
        // date
        id: `${userData.id}`,
        patient_id: userData.patient_id,
        therapist_id: userData.therapist_id,
        ticket_department_id: userData.ticket_department_id,
        location: userData.location,
        status: userData.status,
        language: userData.language,
        remarks: userData.remarks,
        strike: userData.strike,
        strike_history: userData.strike_history,
        ticket_history: userData.ticket_history,
        date: userData.date,
        // date_of_birth: userData.date_of_birth,
        // status: userData.status,
        // blood_group_id: userData.blood_group_id,
        // state_id: userData.state_id,
        // country_id: userData.country_id,
        // options: (
        //   <Link
        //     href={`/therapist/edit/${userData.id}`}
        //     class="btn btn-primary btn-sm"
        //   >
        //     Edit
        //   </Link>
        // ),
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
        id: "patient_id",
      },
      {
        header: "Therapist ID",
        id: "therapist_id",
      },
      {
        header: "Ticket_department_id",
        id: "ticket_department_id",
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
      // {
      //   header: "Date of birth",
      //   id: "date_of_birth",
      // },
      // {
      //   header: "Status",
      //   id: "status",
      // },
      // {
      //   header: "State",
      //   id: "state_id",
      // },
      // {
      //   header: "Country",
      //   id: "country_id",
      // },
      // {
      //   header: "blood_group",
      //   id: "blood_group_id",
      // },
      // {
      //   header: "Options",
      //   id: "options",
      // },
    ],
    []
  );
  return (
    <>
      <main className="p-6  space-y-6">
        <PagePatientComponentTitle
          title="All ticket"
          buttonTitle="Create new ticket"
        />

        <section className="grid card  md:grid-cols-1 xl:grid-cols-1   ">
          <div className="p-4">
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
                  style={{ display: "flex", flexWrap: "nowrap", gap: "0.5rem" }}
                >
                  <button
                    className="text-purple-800 hover:underline"
                    onClick={() => {
                      console.log("View Profile", row.original.id);
                    }}
                  >
                    View
                  </button>

                  <button
                    className="text-purple-800 hover:underline"
                    onClick={() =>
                      deleteData(
                        `https://misiapi.lamptechs.com/api/v1/ticket/delete`,
                        row.original.id
                      )
                    }
                  >
                    Delete
                  </button>
                </div>
              )}
            />
          </div>
        </section>
      </main>
    </>
  );
}

export default AllTicketList;
