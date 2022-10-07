import React, { useEffect, useMemo, useState } from "react";
import MaterialReactTable from "material-react-table";
import useAuth from "/hook/useAuth";
import Link from "next/link";
//import { useTherapitListQuery } from "../../hook/useApi";
//import PagePatientComponentTitle from "../../components/all-ticket/PageTicketComponentTitle";
import dynamic from "next/dynamic";
import { CSVLink } from "react-csv";
import { Tooltip } from "@mui/material";
import { FaTrashAlt } from "react-icons/fa";
import axios from "axios";
import Swal from "sweetalert2";
const EmailComponent = dynamic(() =>
  import("/components/email/EmailComponent.js")
);
const Loading = dynamic(() => import("/components/common/Loading.js"));

function AllTicketList() {
  const { deleteData, Statustest, token, apiRootUrl, apiEndpoint } = useAuth();
  const Swal = require("sweetalert2");
  //const { data, error, isError } = useTherapitListQuery();
  //console.log("All ticket data  from  ", data);

  const [remoteData, setRemoteData] = useState([]);
  // const [templete, setTemplete] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  // const getData = async (data) => {
  //   const info = await JSON.parse(data);
  //   console.log(info?.to_email);
  //   // const info = await data?.json();
  //   return await info?.to_email;
  // };
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const response = await fetch(
        `https://api.emailjs.com/api/v1.1/history?user_id=Xhynuoqz_7DneLgjh&accessToken=2QX27_HEoyBqeNWRnmXi9&page=1&count=500`,
        // "https://misiapi.lamptechs.com/api/v1/appointment",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const myData = await response.json();
      setRemoteData(myData?.rows);
      setIsLoading(false);
    };
    fetchData();

    // getData();
  }, [remoteData, token]);

  const getData = async (data) => {
    const info = await JSON.parse(data);
    console.log(info);
    // const info = await data?.json();
    return await info?.to_email;
  };
  //  let checkData = remoteData[0].template_params.split(",")[7];
  //   console.log(checkData );
  //  console.log(checkData.split(':')[1]);
  const parsedData = useMemo(
    () =>
      remoteData?.map((userData) => ({
        // temData: userData?.template_params,
        //console.log('remoteData', remoteData);
        id: `${userData.id}`,
        date: userData.created_at,
        user_ip: userData.template_params
          ?.split(",")[4]
          ?.split(":")[1]
          ?.split('"')[1],
        from_email: userData.template_params
          ?.split(",")[6]
          ?.split(":")[1]
          ?.split('"')[1],
        email: userData.template_params
          ?.split(",")[7]
          ?.split(":")[1]
          ?.split('"')[1],
        to_subject: userData.template_params
          ?.split(",")[8]
          ?.split(":")[1]
          ?.split('"')[1],
        message: userData.template_params
          ?.split(",")[9]
          ?.split(":")[1]
          ?.split('"')[1],
        therapist_id: `${userData?.therapist_info?.id}`,
        device: userData.template_params
          ?.split(",")[0]
          ?.split(":")[1]
          ?.split('"')[1],
        status: userData?.result === 1 ? "Ok" : "Error",
        //ticket_history: userData.ticket_history,
      })) ?? [],
    [remoteData, token]
  );

  const columns = useMemo(
    () => [
      // {
      //   header: "Id",
      //   id: "id",
      //   // muiTableHeadCellProps: {
      //   //   sx: {
      //   //     display: "none",
      //   //   },
      //   // },
      // },

      {
        header: "Date & time",
        id: "date",
        // muiTableHeadCellProps: {
        //   sx: {
        //     display: "none",
        //   },
        // },
      },

      {
        header: "User ip",
        id: "user_ip",
      },
      {
        header: "From email",
        id: "from_email",
      },
      {
        header: "To email",
        id: "email",
      },
      {
        header: "Subject",
        id: "to_subject",
      },
      {
        header: "Message",
        id: "message",
      },
      {
        header: "Use device",
        id: "device",
      },
      {
        header: "Result",
        id: "status",
      },
    ],
    []
  );

  const deleteEmail = (url) => {
    console.log(`deleteUrl:${url}  token:${token}`);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      confirmButton: true,
      confirmButtonText: "Yes, delete it!",
      confirmButtonColor: "#3085d6",
      showCancelButton: true,
      cancelButtonColor: "#d33",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(
            url,
            {}
            // {
            //   headers: { Authorization: `Bearer ${token}` },
            // },
            // {
            //   withCredentials: true,
            // }
          )
          .then((response) => {
            if (response.status === 200) {
              swal.fire({
                title: "Deleted!",
                text: `Your have been deleted successfully.`,
                icon: "success",
                timer: 3000,
                // "Deleted!",
                // "Your has been deleted successfully.",
                // "success"
              });
            } else {
              Swal.fire({
                title: "Error!! Failed to delete data",
                text: `${response?.text} ${response?.status} ${response?.message}. ${response.response?.data?.message}`,
                icon: "error",
                timer: 3000,
              });
            }
          });
      }
    });
  };
  return (
    <>
      <main className="p-6  space-y-6">
        <EmailComponent title="Email" buttonTitle="Send email" />

        <section className="grid card  md:grid-cols-1 xl:grid-cols-1   ">
          <div className="p-4">
            {remoteData ? (
              <>
                {remoteData?.length && (
                  <div className="flex items-end justify-end">
                    <CSVLink
                      filename="email.csv"
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
                    // sorting: [{ from_email: "from_email", desc: true }],
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
                      <Tooltip title="Delete">
                        <button
                          className="  hover:underline border-solid border-2 border-gray-350 p-1.5  hover:border-indigo-500 "
                          onClick={() =>
                            deleteEmail(
                              //`https://misiapi.lamptechs.com/api/v1/ticket/delete/${row?.original?.id}`
                              `https://api.emailjs.com/api/v1.1/history/${row?.original?.id}/?accessToken=2QX27_HEoyBqeNWRnmXi9&user_id=Xhynuoqz_7DneLgjh`

                              //console.log("id delete", `${row?.original?.id}`)
                            )
                          }
                        >
                          <FaTrashAlt className="text-xl h-4 text-gray-900" />
                        </button>
                      </Tooltip>
                    </div>
                  )}
                  // renderRowActions={({ row }) => (
                  //   <div
                  //     style={{
                  //       display: "flex",
                  //       flexWrap: "nowrap",
                  //       gap: "0.5rem",
                  //     }}
                  //   >
                  //     {/* <Link
                  //       passHref
                  //       href={`appointment/edit/${row.original.id}`}
                  //     >
                  //       <button
                  //         className="text-purple-800 hover:underline"
                  //         // onClick={() => {
                  //         //   console.log("View Profile", row.original.id);
                  //         // }}
                  //       >
                  //         Edit
                  //       </button>
                  //     </Link> */}
                  //     {/* <button
                  //       className="text-purple-800 hover:underline"
                  //       onClick={() =>
                  //         deleteData(
                  //           `https://misiapi.lamptechs.com/api/v1/appointment/delete/${row?.original?.id}`
                  //           //`${apiRootUrl}${apiEndpoint?.appointment?.delete}/${row?.original?.id}`
                  //         )
                  //       }
                  //     >
                  //       Delete
                  //     </button> */}
                  //   </div>
                  // )}
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

export default AllTicketList;
