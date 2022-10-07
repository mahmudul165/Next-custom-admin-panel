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
const PageTherapistScheduleComponentTitle = dynamic(() =>
  import(
    "/components/therapist-schedule/PageTherapistScheduleComponentTitle.js"
  )
);

import React, { useEffect, useMemo, useState } from "react";
import MaterialReactTable from "material-react-table";
import useAuth from "/hook/useAuth";
import Link from "next/link";
import { CSVLink } from "react-csv";
import { ToastContainer } from "react-toastify";
import { MdMode, MdOutlineDelete, MdRemoveRedEye } from "react-icons/md";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { Tooltip } from "@mui/material";
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
        "https://misiapi.lamptechs.com/api/v1/therapist_schedule",
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
        therapist: userData.therapist,
        schedule_day: userData.schedule_day,
        start_date: userData.start_date,
        end_date: userData.end_date,
        start_time: userData.start_time,
        end_time: userData.end_time,
        consulting_time: userData.consulting_time,
        remarks: userData.remarks,
        status: `${Statustest(userData.status)}`,

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
        header: "Schedule id",
        id: "id",
        // muiTableHeadCellProps: {
        //   sx: {
        //     display: "none",
        //   },
        // },
      },
      {
        header: "Therapist",
        id: "therapist",
      },
      {
        header: "Schedule day",
        id: "schedule_day",
      },
      {
        header: "Start date",
        id: "start_date",
      },
      {
        header: "End date",
        id: "end_date",
      },

      {
        header: "Consulting time",
        id: "consulting_time",
      },
      {
        header: "Remarks",
        id: "remarks",
      },

      {
        header: "Status",
        id: "status",
      },
      // {
      //   header: "State",
      //   id: "state",
      // },
      // {
      //   header: "Country",
      //   id: "country",
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
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <main className="p-6  space-y-6">
        <PageTherapistScheduleComponentTitle
          title="Therapist schedule"
          buttonTitle="Create new schedule"
        />

        <section className="grid card  md:grid-cols-1 xl:grid-cols-1   ">
          <div className="p-4">
            {/* start download */}

            {remoteData?.length && (
              <div className="flex items-end justify-end">
                <CSVLink
                  filename="therapist_schedule.csv"
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
            {/* end download */}
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
                sorting: [{ id: "id", desc: true }],
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
                  <Link
                    passHref
                    href={`therapist_schedule/view/${row.original.id}`}
                  >
                    <Tooltip title="View">
                      <button
                        className="text-black  hover:underline border-solid border-2 border-gray-350      btn-info  "
                        // onClick={() => {
                        //   console.log("View Profile", row.original.id);
                        // }}
                      >
                        <MdRemoveRedEye className="text-xl h-4.5 text-white " />
                      </button>
                    </Tooltip>
                  </Link>
                  <Link
                    passHref
                    href={`therapist_schedule/edit/${row.original.id}`}
                  >
                    <Tooltip title="Edit">
                      <button
                        className=" hover:underline border-solid border-2 border-gray-350      btn-success"
                        // onClick={() => {
                        //   console.log("View Profile", row.original.id);
                        // }}
                      >
                        <FaEdit className="text-xl h-3 " />
                      </button>
                    </Tooltip>
                  </Link>
                  <Tooltip title="Delete">
                    <button
                      className="  hover:underline   border-solid border-2 border-gray-350     btn-danger"
                      onClick={() =>
                        deleteData(
                          `https://misiapi.lamptechs.com/api/v1/therapist_schedule/delete/${row?.original?.id}`
                          //console.log("id delete", `${row?.original?.id}`)
                        )
                      }
                    >
                      <FaTrashAlt className="text-xl h-3" />
                    </button>
                  </Tooltip>
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
