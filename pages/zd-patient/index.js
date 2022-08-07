import React, { useEffect, useMemo, useState } from "react";
import MaterialReactTable from "material-react-table";
import useAuth from "/hook/useAuth";
import Link from "next/link";
//import { usePatientListQuery } from "../../hook/useApi";
//import PagePatientComponentTitle from "../../components/CreatePatient/PagePatientComponentTitle";
import dynamic from "next/dynamic";
import { CSVLink } from "react-csv";
const PatientComponent = dynamic(() =>
  import("../../components/zd patient/PatientComponent")
);

function PatientList() {
  const { deleteData, Statustest, token } = useAuth();
  //const { data: patientinfo, error, isError } = usePatientListQuery();

  //console.log("patient query service data ", patientinfo);

  const [remoteData, setRemoteData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  //const [token, setToken] = useState("");
  // useEffect(() => {

  //   setToken(localStorage.getItem("token"));
  // }, []);

  // const [token, setToken] = useState("");

  // useEffect(() => {
  //   const items = localStorage.getItem("token");
  //   if (items) {
  //     setToken(items);
  //   }
  // }, []);

  //console.log("patient token", token);
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const response = await fetch(
        "https://misiapi.lamptechs.com/api/v1/patient",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const json = await response.json();
      setRemoteData(json.data.filter((patient) => patient.source === "ZD"));
      setIsLoading(false);
    };
    fetchData();
  }, [remoteData, token]);

  const parsedData = useMemo(
    () =>
      remoteData?.map((userData) => ({
        id: `${userData.id}`,
        first_name: userData.first_name,
        last_name: userData.last_name,
        email: userData.email,
        phone: userData.phone,
        address: userData.address,
        occupation: userData.occupation,
        age: userData.age,
        state: userData?.state?.name,
        country: userData?.country?.name,
        bsn_number: userData.bsn_number,
        dob_number: userData.dob_number,
        insurance_number: userData.insurance_number,
        medical_history: userData.medical_history,
        emergency_contact: userData.emergency_contact,
        gender: userData.gender,
        date_of_birth: userData.date_of_birth,
        remarks: userData.remarks,
        blood_group: userData?.blood_group?.name,
        remarks: userData.remarks,
      })) ?? [],
    [remoteData, token]
  );
  // console.log("id data remoteData", remoteData);
  const columns = useMemo(
    () => [
      {
        header: "Patient id",
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
        header: "Occupation",
        id: "occupation",
      },
      {
        header: "Age",
        id: "age",
      },

      {
        header: "BNS number",
        id: "bsn_number",
      },

      {
        header: "DOB number",
        id: "dob_number",
      },
      {
        header: "Insurance",
        id: "insurance_number",
      },
      {
        header: "Medical history",
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
        <PatientComponent
          title="ZD patient list"
          buttonTitle="Create new patient"
        />

        <section className="grid card  md:grid-cols-1 xl:grid-cols-1   ">
          <div className="p-4">
            <>
              {remoteData?.length && (
                <div className="flex items-end justify-end">
                  <CSVLink
                    filename="zd-patient.csv"
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
                    <Link passHref href={`/patient/edit/${row.original.id}`}>
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
                          `https://misiapi.lamptechs.com/api/v1/patient/delete/${row?.original?.id}`,
                          token
                          //row.original.id
                        )
                      }
                    >
                      Delete
                    </button>
                  </div>
                )}
              />{" "}
            </>
          </div>
        </section>
      </main>
    </>
  );
}

export default PatientList;

// import React from "react";

// function FileUpload() {
//   const [file, setFile] = React.useState("");
//   // function handleUpload(event) {
//   //   setFile(event.target.files[0]);
//   // }
//   console.log("file", URL.createObjectURL(file));
//   return (
//     <div id="upload-box">
//       <input type="file" onChange={(e) => setFile(e.target.files[0])} />
//       {file && <img src={URL.createObjectURL(file)} alt={file.name} />}
//     </div>
//   );
// }

// export default function App() {
//   return <FileUpload />;
// }
