// import React from "react";
// import PatientService from "/components/CreatePatient/PatientService";
// function index() {
//   return (
//     <>
//       <PatientService />
//     </>
//   );
// }

// export default index;

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
function PatientList() {
  const { deleteData, Statustest } = useAuth();
  const { data, error, isError } = useTherapitListQuery();
  //console.log("therapist service data ",userData);

  const [remoteData, setRemoteData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const response = await fetch(
        // "https://jsonplaceholder.typicode.com/users"
        "https://misiapi.lamptechs.com/api/v1/patient"
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
        id: `${userData.id}`,
        first_name: userData.first_name,
        last_name: userData.last_name,
        email: userData.email,
        phone: userData.phone,
        address: userData.address,
        occupation: userData.occupation,
        age: userData.age,
        state_id: userData.state_id,
        country_id: userData.country_id,
        bsn_number: userData.bsn_number,
        dob_number: userData.dob_number,
        insurance_number: userData.insurance_number,
        medical_history: userData.medical_history,
        emergency_contact: userData.emergency_contact,
        gender: userData.gender,
        date_of_birth: userData.date_of_birth,
        remarks: userData.remarks,
        blood_group_id: userData.blood_group_id,

        remarks: userData.remarks,

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
  console.log("id ", remoteData);
  const columns = useMemo(
    () => [
      {
        header: "#",
        id: "id",
      },

      {
        header: "First name",
        id: "first_name",
      },
      {
        header: "Last name",
        id: "last_name",
      },
      {
        header: "Email",
        id: "email",
      },
      {
        header: "Phone",
        id: "phone",
      },

      {
        header: "Address",
        id: "address",
      },
      {
        header: "Occupation",
        id: "occupation",
      },
      {
        header: "Age",
        id: "age",
      },

      {
        header: "BNS_number",
        id: "bsn_number",
      },

      {
        header: "DOB_number",
        id: "dob_number",
      },
      {
        header: "Insurance",
        id: "insurance_number",
      },
      {
        header: "Medical History",
        id: "medical_history",
      },

      {
        header: "Emergency contact",
        id: "emergency_contact",
      },

      {
        header: "Gender",
        id: "gender",
      },
      {
        header: "Date of birth",
        id: "date_of_birth",
      },

      {
        header: "State",
        id: "state_id",
      },
      {
        header: "Country",
        id: "country_id",
      },
      {
        header: "blood_group",
        id: "blood_group_id",
      },
      {
        header: "Remarks",
        id: "remarks",
      },
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
          title="Patient list"
          buttonTitle="Create new patient"
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
                      console.log("View Profile", row.original);
                    }}
                  >
                    View
                  </button>

                  <button
                    className="text-purple-800 hover:underline"
                    onClick={() =>
                      deleteData(
                        `https://misiapi.lamptechs.com/api/v1/patient/delete`,
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

export default PatientList;
