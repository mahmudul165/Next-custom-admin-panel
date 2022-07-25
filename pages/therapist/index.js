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

//import PageTherapistComponentTitle from "/components/therapist-List/PageTherapistComponentTitle";
import dynamic from "next/dynamic";
const PageTherapistComponentTitle = dynamic(() =>
  import("/components/therapist-List/PageTherapistComponentTitle")
);

import React, { useEffect, useMemo, useState } from "react";
import MaterialReactTable from "material-react-table";
import useAuth from "/hook/useAuth";
import Link from "next/link";
//import { useTherapitListQuery } from "../../hook/useApi";
function TherapistList() {
  const { deleteData, Statustest, token } = useAuth();
  //const { data, error, isError } = useTherapitListQuery();
  //console.log("therapist service data ", data);

  const [remoteData, setRemoteData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const response = await fetch(
        // "https://jsonplaceholder.typicode.com/users"
        "https://misiapi.lamptechs.com/api/v1/therapist",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const json = await response.json();
      setRemoteData(json?.data);
      setIsLoading(false);
    };
    fetchData();
  }, [remoteData, token]);

  const parsedData = useMemo(
    () =>
      remoteData.map((userData) => ({
        id: `${userData.id}`,
        first_name: userData.first_name,
        last_name: userData.last_name,
        email: userData.email,
        phone: userData.phone,
        address: userData.address,
        language: userData.language,
        bsn_number: userData.bsn_number,
        dob_number: userData.dob_number,
        insurance_number: userData.insurance_number,
        emergency_contact: userData.emergency_contact,
        gender: userData.gender,
        date_of_birth: userData.date_of_birth,
        status: `${Statustest(userData.status)}`,
        blood_group: userData?.blood_group?.name,
        state: userData?.state?.name,
        country: userData?.country?.name,
        // options: (
        //   <Link
        //     href={`/therapist/edit/${userData.id}`}
        //     class="btn btn-primary btn-sm"
        //   >
        //     Edit
        //   </Link>
        // ),
      })) ?? [],
    [remoteData, token]
  );

  const columns = useMemo(
    () => [
      {
        header: "Therapist id",
        id: "id",
        // muiTableHeadCellProps: {
        //   sx: {
        //     display: "none",
        //   },
        // },
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
        header: "Language",
        id: "language",
      },
      {
        header: "BNS number",
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
        header: "Status",
        id: "status",
      },
      {
        header: "State",
        id: "state",
      },
      {
        header: "Country",
        id: "country",
      },
      {
        header: "Blood group",
        id: "blood_group",
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
        <PageTherapistComponentTitle
          title="Therapist list"
          buttonTitle="Create new therapist"
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
              positionActionsColumn="first"
              renderRowActions={({ row }) => (
                <div
                  style={{ display: "flex", flexWrap: "nowrap", gap: "0.5rem" }}
                >
                  <Link passHref href={`therapist/edit/${row.original.id}`}>
                    <button
                      className="text-purple-800 hover:underline"
                      // onClick={() => {
                      //   console.log("View Profile", row.original.id);
                      // }}
                    >
                      Edit
                    </button>
                  </Link>

                  {/* <button
                    className="text-purple-800 hover:underline"
                    onClick={() => {
                      console.log("View Profile", row.original);
                    }}
                  >
                    Edit
                  </button> */}

                  <button
                    className="text-purple-800 hover:underline"
                    onClick={() =>
                      deleteData(
                        `https://misiapi.lamptechs.com/api/v1/therapist/delete/${row?.original?.id}`
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

export default TherapistList;
