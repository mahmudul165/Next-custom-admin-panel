import React, { useEffect, useMemo, useState } from "react";
import MaterialReactTable from "material-react-table";
import useAuth from "/hook/useAuth";
import Link from "next/link";
import { useTherapitListQuery } from "../../hook/useApi";
//import PagePatientComponentTitle from "../../components/all-ticket/PageTicketComponentTitle";
import dynamic from "next/dynamic";
import { MdMode, MdOutlineDelete, MdRemoveRedEye } from "react-icons/md";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { Tooltip } from "@mui/material";
import OperationModal from "../../components/common/OperationModal";
import TicketForm from "../../components/admin/AdminForm";
import ResponsiveDialog from "../../components/common/DeleteModal";
const GroupComponent = dynamic(() =>
  import("../../components/group/GroupComponent.js")
);
const Loading = dynamic(() => import("/components/common/Loading"));

function AllTicketList() {
  const [modal, setModal] = useState(false);
  const {
    status,
    deleteData,
    Statustest,
    token,
    apiRootUrl,
    apiEndpoint,
  } = useAuth();
  console.log("all ticket status", status);
  const { data, error, isError } = useTherapitListQuery();
  //console.log("All ticket data  from  ", data);

  const [remoteData, setRemoteData] = useState([]);
  //const [ticketid, setTicketid] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const response = await fetch(
        //`${apiRootUrl}${apiEndpoint?.ticket?.list}`,
        "https://misiapi.lamptechs.com/api/v1/groups",
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
        name: `${userData.name}`,
        // email: `${userData.description}`,

        // therapist_id: `${userData?.therapist_info?.id}`,
        // department_name: `${userData.department?.name}`,
        department_description: userData.description,
      })) ?? [],
    [remoteData, token]
  );

  const columns = useMemo(
    () => [
      {
        header: "Group id",
        id: "id",

        //   muiTableHeadCellProps: {
        //     sx: {
        //       display: "none",
        //     },
        //   },
      },
      {
        header: "Name",
        id: "name",
      },

      // {
      //   header: "Therapist_id",
      //   id: "therapist_id",
      // },

      {
        header: "Description",
        id: "department_description",
      },
    ],
    []
  );

  return (
    <>
      <main className="p-6  space-y-6">
        <GroupComponent title="Group list" buttonTitle="Create new" />
        <section className="grid card  md:grid-cols-1 xl:grid-cols-1   ">
          <div className="p-4">
            {remoteData ? (
              <MaterialReactTable
                enablePinning
                enableColumnOrdering
                enableRowOrdering
                // enableRowVirtualization
                // virtualizerProps={{ enableSmoothScroll: true }}
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
                  //  align: "center",
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
                    <Link passHref href={`group/view/${row.original.id}`}>
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
                    <Link passHref href={`group/edit/${row.original.id}`}>
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
                            //`https://misiapi.lamptechs.com/api/v1/ticket/delete/${row?.original?.id}`
                            `https://misiapi.lamptechs.com/api/v1/groups/delete/${row?.original?.id}`

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
