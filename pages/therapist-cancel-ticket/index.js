import React, { useEffect, useMemo, useState } from "react";
import MaterialReactTable from "material-react-table";
import { CSVLink, CSVDownload } from "react-csv";
import useAuth from "/hook/useAuth";
import Link from "next/link";
import dynamic from "next/dynamic";
import { MdMode, MdOutlineDelete, MdRemoveRedEye } from "react-icons/md";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { FaUserAlt } from "react-icons/fa";
import { ImCancelCircle } from "react-icons/im";
import Tooltip from "@mui/material/Tooltip";
//import PagePatientComponentTitle from "../../components/all-ticket/PageTicketComponentTitle";
//import OperationModal from "../../components/common/OperationModal";
//import TicketForm from "../../components/all-ticket/TicketForm";

import { useTherapitListQuery } from "../../hook/useApi";
import ResponsiveDialog from "../../components/common/DeleteModal";
import ResponsiveDialogAssigned from "../../components/common/AssignedTicketModal";

import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Delete from "../../components/common/crud-button/Delete";
import Assigned from "../../components/common/crud-button/Assigned";
import Cancel from "../../components/common/crud-button/Cancel";

const TicketComponent = dynamic(() =>
  import("../../components/cancel-ticket/TicketComponent")
);
const Loading = dynamic(() => import("/components/common/Loading"));
const ref = React.createRef();
function AllTicketList() {
  const [modal, setModal] = useState(false);
  const {
    status,
    postData,
    assignData,
    deleteData,
    Statustest,
    token,
    group_id,
    assign_to_user,
    email,
    name,
    patientId,
    therapistId,
    department,
    apiRootUrl,
    apiEndpoint,
  } = useAuth();
  const [remoteData, setRemoteData] = useState([]);
  //const [ticketid, setTicketid] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  console.log("all ticket status", status);
  const { data, error, isError } = useTherapitListQuery();
  console.log(
    "check local stroge data ",
    //token,
    group_id,
    assign_to_user,
    email,
    department
  );

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
          (item) =>
            item?.ticket_status === "Cancelled" &&
            item?.therapist_info?.id == therapistId
        )
      );
      setIsLoading(false);
    };
    fetchData();
  }, [remoteData, token]);

  const parsedData = useMemo(
    () =>
      remoteData.map((userData) => ({
        id: `${userData.id}`,
        // assign_to_user: userData?.admin_name?.department?.name,
        //{userData?.admin_name?.name}
        //  assign_to_user: `${userData?.admin_name?.name} ${userData?.department?.name}`,
        assign_to_user: `${
          !userData?.assign_to_user ? "Not Assigned" : userData?.assign_to_user
        }`,
        //assign_to_user: userData?.created_by?.department?.name,
        ticket_department: `${
          !userData?.department?.name
            ? userData?.ticket_department_info?.name
            : userData?.department?.name
        }`,
        assign_to_user_status: userData.assign_to_user_status,
        patient_info: `${userData.patient_info?.id}`,
        patient_name: `${userData.patient_info?.first_name} ${userData.patient_info?.last_name}`,
        insurance_number: `${userData.patient_info?.insurance_number}`,
        // therapist_id: `${userData?.therapist_info?.id}`,
        therapist_name: `${userData.therapist_info?.first_name} ${userData.therapist_info?.last_name}`,

        source: `${userData.patient_info?.source}`,
        location: userData.patient_info?.area,
        status: `${Statustest(userData.status)}`,
        language: userData.language,
        remarks: userData?.remarks,
        strike: userData.strike,
        strike_history: userData.strike_history,
        ticket_history: userData.ticket_history,
        comment: userData.comment,
        date: userData.date,
        mono_multi_zd: userData.mono_multi_zd,
        mono_multi_screeing: userData.mono_multi_screeing,
        intakes_therapist: userData.intakes_therapist,
        tresonit_nummer: userData.tresonit_nummer,
        datum_intake: userData.datum_intake,
        datum_intake_2: userData.datum_intake_2,
        nd_account: userData.nd_account,
        avc_alfmvm_sbg: userData.avc_alfmvm_sbg,
        honos: userData.honos,
        berha_intake: userData.berha_intake,
        rom_start: userData.rom_start,
        rom_eind: userData.rom_eind,
        berha_eind: userData.berha_eind,
        vtcb_date: userData.vtcb_date,
        closure: userData.closure,
        aanm_intake_1: userData.aanm_intake_1,

        //user_department: userData.user_department,
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
        header: "Assigned user",
        id: "assign_to_user",
      },
      {
        header: "User status",
        id: "assign_to_user_status",
      },
      {
        header: "Department",
        id: "ticket_department",
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
        header: "Mono/Multi ZD",
        id: "mono_multi_zd",
      },
      {
        header: "Mono/Multi screening",
        id: "mono_multi_screeing",
      },
      {
        header: "Intakes/therapist",
        id: "intakes_therapist",
      },
      {
        header: "Tresonit nummer",
        id: "tresonit_nummer",
      },
      {
        header: "Datum intake",
        id: "datum_intake",
      },
      {
        header: "Datum intake 2",
        id: "datum_intake_2",
      },
      {
        header: "ND account",
        id: "nd_account",
      },
      {
        header: "AvC/AlfmVm/SBG",
        id: "avc_alfmvm_sbg",
      },
      {
        header: "HoNOS+",
        id: "honos",
      },
      {
        header: "Berha intake",
        id: "berha_intake",
      },
      {
        header: "ROM start",
        id: "rom_start",
      },
      {
        header: "ROM eind",
        id: "rom_eind",
      },
      {
        header: "Berha eind",
        id: "berha_eind",
      },
      {
        header: "VTCB date",
        id: "vtcb_date",
      },
      {
        header: "Closure",
        id: "closure",
      },
      {
        header: "Aanm-intake 1",
        id: "aanm_intake_1",
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
        header: "Comment",
        id: "comment",
      },

      {
        header: "Date",
        id: "date",
      },
      {
        header: "Status treatment",
        id: "status",
      },

      // {
      //   header: "User department",
      //   id: "user_department",
      // },
    ],
    []
  );

  return (
    <>
      <main className="p-6  space-y-6">
        <TicketComponent title="Cancel ticket" />
        <section className="grid card  md:grid-cols-1 xl:grid-cols-1   ">
          <div className="p-4">
            {/* <Pdf targetRef={ref} filename="code-example.pdf">
              {({ toPdf }) => <button onClick={toPdf}>Generate Pdf</button>}
            </Pdf> */}

            {remoteData ? (
              <>
                {remoteData?.length && (
                  <div className="flex items-end justify-end">
                    <CSVLink
                      filename="all-ticket.csv"
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
                  //ref={ref}
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
                  //initialState={{ sorting: [{ id: 'id', desc: true }] }}
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
                    // <>
                    //   <CrudButton
                    //     view={`/all-ticket/view/${row.original.id}`}
                    //     edit={`/all-ticket/edit/${row.original.id}`}
                    //     deleteUrl={`https://misiapi.lamptechs.com/api/v1/ticket/delete/${row?.original?.id}`}
                    //   />
                    <div
                      style={{
                        display: "flex",
                        flexWrap: "nowrap",
                        gap: "0.5rem",
                      }}
                    >
                      {" "}
                      <Link
                        passHref
                        href={`all-ticket/view/${row.original.id}`}
                      >
                        <Tooltip title="View">
                          <button
                            className="text-black  hover:underline border-solid border-2 border-gray-350      btn-info"
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
                        href={`all-ticket/edit/${row.original.id}`}
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
                      {/* <Link
                        passHref
                        href={`all-ticket/assigned_user/${row.original.id}`}
                      >
                        <Tooltip title="Assigned User">
                          <button
                            className=" hover:underline border-solid border-2 border-gray-350      btn-info"
                            // onClick={() => {
                            //   console.log("View Profile", row.original.id);
                            // }}
                          >
                            <FaEdit className="text-xl h-3 " />
                          </button>
                        </Tooltip>
                      </Link> */}
                      <Tooltip title="Assigned Yourself">
                        <button
                          onClick={async () =>
                            await assignData(
                              "https://misiapi.lamptechs.com/api/v1/ticket/assignedupdate",
                              await {
                                id: `${row?.original?.id}`,
                                assign_to_user_status: "Hold",
                                assign_to_user: name,
                                group_id: group_id,
                              }
                            )
                          }
                          className="  hover:underline   border-solid border-3 border-purple-600     btn-transparent"
                        >
                          <FaUserAlt className="text-xl h-3" />
                        </button>
                      </Tooltip>
                      <Tooltip title="Cancel">
                        <button
                          className="text-danger  hover:underline   border-solid border-2 border-gray-350     btn-warning"
                          onClick={async () =>
                            await assignData(
                              "https://misiapi.lamptechs.com/api/v1/ticket/ticketstatus",
                              await {
                                id: `${row?.original?.id}`,
                                ticket_status: "Cancelled",
                              }
                            )
                          }
                        >
                          <ImCancelCircle className="text-2xl h-4" />
                        </button>
                      </Tooltip>
                      <Delete
                        url={`https://misiapi.lamptechs.com/api/v1/ticket/delete/${row?.original?.id}`}
                      />
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

export default AllTicketList;
