import React, { useEffect, useMemo, useState } from "react";
import MaterialReactTable from "material-react-table";
import useAuth from "/hook/useAuth";
import Link from "next/link";
import { useTherapitListQuery } from "../../hook/useApi";
//import PagePatientComponentTitle from "../../components/all-ticket/PageTicketComponentTitle";
import dynamic from "next/dynamic";
import { CSVLink } from "react-csv";
import { MdMode, MdOutlineDelete, MdRemoveRedEye } from "react-icons/md";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { Tooltip } from "@mui/material";
import { ToastContainer } from "react-toastify";
import View from "../../components/common/crud-button/View";
import Edit from "../../components/common/crud-button/Edit";
import Assigned from "../../components/common/crud-button/Assigned";
import Cancel from "../../components/common/crud-button/Cancel";
import Delete from "../../components/common/crud-button/Delete";
const TicketComponent = dynamic(() =>
  import("../../components/no-approval/TicketComponent")
);
const Loading = dynamic(() => import("/components/common/Loading"));

function AllTicketList() {
  const {
    deleteData,
    Statustest,
    token,
    group_id,
    name,
    apiRootUrl,
    apiEndpoint,
  } = useAuth();
  console.log("  ", name, group_id);
  const { data, error, isError } = useTherapitListQuery();
  //console.log("All ticket data  from  ", data);
  console.log("local data  ", group_id, name);
  const [remoteData, setRemoteData] = useState([]);
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
      setRemoteData(
        json.data.filter((item) => {
          return (
            item?.ticket_status !== "Cancelled" &&
            (item?.department?.name !== "Waiting for 'NO' Approval"
              ? item?.ticket_department_info?.name ===
                "Waiting for 'NO' Approval"
              : item?.department?.name === "Waiting for 'NO' Approval")
          );
        })
      );
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
        assign_to_user: `${
          !userData?.assign_to_user ? "Not Assigned" : userData?.assign_to_user
        }`,

        ticket_department: `${
          !userData?.department?.name
            ? userData?.ticket_department_info?.name
            : userData?.department?.name
        }`,
        assign_to_user_status: !userData.assign_to_user_status
          ? "Open"
          : userData.assign_to_user_status,

        patient_info: `${userData.patient_info?.id}`,
        patient_name: `${userData.patient_info?.first_name} ${userData.patient_info?.last_name}`,
        // therapist_id: `${userData?.therapist_info?.id}`,
        therapist_name: `${userData.therapist_info?.first_name} ${userData.therapist_info?.last_name}`,
        //ticket_department: userData?.ticket_department_info?.name,
        location: userData.location,
        status: `${Statustest(userData.status)}`,
        language: userData.language,
        remarks: userData?.remarks,
        strike: userData.strike,
        strike_history: userData.strike_history,
        ticket_history: userData.ticket_history,
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
      })) ?? [],
    [remoteData]
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
      // {
      //   header: "Department",
      //   id: "ticket_department",
      // },
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
        <TicketComponent
          title="Waiting for 'NO' Approval"
          buttonTitle="Create new ticket"
        />

        <section className="grid card  md:grid-cols-1 xl:grid-cols-1   ">
          <div className="p-4">
            {remoteData ? (
              <>
                {remoteData?.length && (
                  <div className="flex items-end justify-end">
                    <CSVLink
                      filename="no-approval-group.csv"
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
                      style={{
                        display: "flex",
                        flexWrap: "nowrap",
                        gap: "0.5rem",
                      }}
                    >
                      {/* <Link
                        passHref
                        href={`no-approval/view/${row.original.id}`}
                      >
                        <Tooltip title="View">
                          <button className="text-black  hover:underline border-solid border-2 border-gray-350      btn-info  ">
                            <MdRemoveRedEye className="text-xl h-4.5 text-white " />
                          </button>
                        </Tooltip>
                      </Link>
                      <Link
                        passHref
                        href={`no-approval/edit/${row.original.id}`}
                      >
                        <Tooltip title="Edit">
                          <button className=" hover:underline border-solid border-2 border-gray-350      btn-success">
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
                              `${apiRootUrl}${apiEndpoint?.ticket?.delete}/${row?.original?.id}`
                            )
                          }
                        >
                          <FaTrashAlt className="text-xl h-3" />
                        </button>
                      </Tooltip> */}
                      <View url={`/no-approval/view/${row.original.id}`} />
                      <Edit url={`/no-approval/edit/${row.original.id}`} />
                      <Assigned
                        url={`https://misiapi.lamptechs.com/api/v1/ticket/assignedupdate`}
                        data={{
                          id: `${row?.original?.id}`,
                        }}
                      ></Assigned>
                      <Cancel
                        url={`https://misiapi.lamptechs.com/api/v1/ticket/ticketstatus`}
                        data={{
                          id: `${row?.original?.id}`,
                          ticket_status: "Cancelled",
                        }}
                      />
                      <Delete
                        url={`https://misiapi.lamptechs.com/api/v1/ticket/delete/${row?.original?.id}`}
                      />
                    </div>
                  )}
                />{" "}
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
