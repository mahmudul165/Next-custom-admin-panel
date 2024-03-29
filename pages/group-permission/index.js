import React, { useEffect, useMemo, useState } from "react";
import MaterialReactTable from "material-react-table";
import useAuth from "/hook/useAuth";
import Link from "next/link";
import { useTherapitListQuery } from "../../hook/useApi";
//import PagePatientComponentTitle from "../../components/all-ticket/PageTicketComponentTitle";
import dynamic from "next/dynamic";
import OperationModal from "../../components/common/OperationModal";
import PermissionForm from "../../components/group-permission/PermissionForm";
import ResponsiveDialog from "../../components/common/DeleteModal";

const PermissionComponent = dynamic(() =>
  import("../../components/group-permission/PermissionComponent.js")
);
const Loading = dynamic(() => import("/components/common/Loading"));

function AllTicketList() {
  const [modal, setModal] = useState(false);
  const { status, deleteData, Statustest, token, apiRootUrl, apiEndpoint } =
    useAuth();
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
        `${apiRootUrl}${apiEndpoint?.ticket?.list}`,
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
        insurance_number: `${userData.patient_info?.insurance_number}`,
        // therapist_id: `${userData?.therapist_info?.id}`,
        therapist_name: `${userData.therapist_info?.first_name} ${userData.therapist_info?.last_name}`,
        ticket_department: userData?.ticket_department_info?.name,
        source: `${userData.patient_info?.source}`,

        location: userData.location,
        status: `${Statustest(userData.status)}`,
        language: userData.language,
        remarks: userData?.remarks,
        strike: userData.strike,
        strike_history: userData.strike_history,
        ticket_history: userData.ticket_history,
        date: userData.date,
      })) ?? [],
    [remoteData, token]
  );

  const columns = useMemo(
    () => [
      {
        header: "Ticket id",
        id: "id",

        //   muiTableHeadCellProps: {
        //     sx: {
        //       display: "none",
        //     },
        //   },
      },
      {
        header: "Patient id",
        id: "patient_info",
      },
      {
        header: "Patient name",
        id: "patient_name",
      },
      {
        header: "Patient insurance",
        id: "insurance_number",
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
        header: "Own",
        id: "source",
      },
      {
        header: "Location",
        id: "location",
      },

      {
        header: "Language treatment",
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
        header: "Tickets history",
        id: "ticket_history",
      },

      {
        header: "Date",
        id: "date",
      },
      {
        header: "Status treatment",
        id: "status",
      },
    ],
    []
  );

  return (
    <>
      <main className="p-6  space-y-6">
        <PermissionComponent title="Group List" buttonTitle="Create new" />
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
                    <Link passHref href={`group-permission/permission`}>
                      <button
                        className="text-purple-800 hover:underline"
                        // onClick={() => {
                        //   console.log("View Profile", row.original.id);
                        // }}
                      >
                        Permission
                      </button>
                    </Link>
                    <ResponsiveDialog
                      title="Delete"
                      deleteFunction={() =>
                        deleteData(
                          //`https://misiapi.lamptechs.com/api/v1/ticket/delete/${row?.original?.id}`
                          `${apiRootUrl}${apiEndpoint?.ticket?.delete}/${row?.original?.id}`
                        )
                      }
                    />
                    {/* <button
                      className="text-purple-800 hover:underline"
                      onClick={() => {
                        deleteData(
                          //`https://misiapi.lamptechs.com/api/v1/ticket/delete/${row?.original?.id}`
                          `${apiRootUrl}${apiEndpoint?.ticket?.delete}/${row?.original?.id}`
                        );
                        status == true && setModal(true);
                      }}
                    >
                      Delete
                    </button> */}

                    {/* <OperationModal modal={modal} setModal={setModal}>
                      {<TicketForm className="m-auto" />}
                    </OperationModal> */}
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
