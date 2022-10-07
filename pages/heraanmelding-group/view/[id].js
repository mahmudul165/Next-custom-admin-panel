import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Pdf from "react-to-pdf";
import {
  usePatientListQuery,
  //usePatientQuery,
  useTherapitListQuery,
  useAllTicketDepartmentQuery,
} from "/hook/useApi.js";
import Loading from "/components/common/Loading.js";
const schema = yup
  .object()
  .shape({
    // service_category_id
    // service_subcategory_name
    //  status
    //  remarks
    // service_category_id: yup.string().required(),
    // name: yup.string().required(),
    // details: yup.string().required(),
    //remarks: yup.string().required(),
    //status: yup.string().required(),
  })
  .required();
import useAuth from "/hook/useAuth";
import { useQuery } from "react-query";
import { useRouter } from "next/router";

function EditTicket() {
  const { postData, updateData, Statustest, token } = useAuth();
  const [pathId, setId] = useState("");
  const [singleTicket, setRemoteData] = useState({});
  //console.log("single ticket data  from  ", singleTicket);
  const [startDate, setStartDate] = useState(new Date());
  const { register, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });
  const { data: patientList } = usePatientListQuery();
  const { data: therapistList } = useTherapitListQuery();
  const { data: ticketDepartment } = useAllTicketDepartmentQuery();

  // const { data: singleTicket.data?.patient_info } = usePatientQuery(searchInput);
  //const { data, error, isError } = useTherapitListQuery();
  //console.log("All ticket data  from  ", data);

  //console.log("patient list from ticket from", patientList);
  //console.log(" single patient list from ticket from", singleTicket.data?.patient_info);
  //console.log("therapy list  from ticket from", therapistList);
  //console.log("ticket department list  from ticket from", ticketDepartment);

  // get  single patient data
  const router = useRouter();
  const ref = React.createRef();
  //const { id } = router.query;

  console.log("single ticket id", typeof id);
  // localStorage.setItem("lastId", router.query?.id);
  router.query?.id && localStorage.setItem("lastId", router.query?.id);
  useEffect(() => {
    setId(router.query?.id || localStorage.getItem("lastId"));
  }, [pathId]);

  useEffect(() => {
    setId(router.query?.id);
    const fetchData = async () => {
      const response = await fetch(
        `https://misiapi.lamptechs.com/api/v1/ticket/show?id=${pathId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const json = await response.json();
      setRemoteData(json.data);
    };
    fetchData();
  }, [pathId, singleTicket]);
  console.log("single ticket id", singleTicket);

  // const fetchsingleTicket = async () => {
  //   const response = await fetch(
  //     `https://misiapi.lamptechs.com/api/v1/ticket/show?id=${pathId}`,
  //     {
  //       headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  //     }
  //   );
  //   return await response.json();
  // };
  // const usesingleTicketQuery = () =>
  //   useQuery(["fetchSingleTicket"], fetchSingleTicket, {
  //     refetchOnMount: true,
  //     refetchOnWindowFocus: true,
  //     refetchInterval: 1000,
  //   });
  // const { data: singleTicket } = useSingleTicketQuery();

  return (
    <>
      {singleTicket ? (
        <>
          {/* <div className="container   mx-4     rounded bg-white mt-5 mb-5 "> */}
          {/* <div className=" container  mx-4  px-12  rounded bg-white mt-5 mb-5 "> */}
          <div className="grid  gap-4 mt-2.5 items-center">
            <h2
              className="col-start-1  text-center text-3xl   font-extrabold   "
              style={{ color: "#01a9ac" }}
            >
              Ticket details
              {/* id: {singleTicket.data?.id} */}
            </h2>
            {/* button download and save */}
            <div className="col-start-2 my-3 px-3 md:flex md:items-center justify-end ">
              <div className="inline-flex rounded-md shadow-sm" role="group">
                <button
                  onClick={() => router.push(`/heraanmelding-group`)}
                  style={{ backgroundColor: "#01a9ac" }}
                  type="button"
                  className="inline-flex items-center py-2 px-4 text-sm font-medium text-gray-900 bg-transparent rounded-l-lg border border-gray-900 hover:bg-gray-900 hover:text-teal-500 focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-teal-500 dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700 shadow   "
                >
                  <svg
                    aria-hidden="true"
                    className="mr-2 w-4 h-4 fill-current"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Go back
                </button>
                <Pdf targetRef={ref} filename="ticket.pdf">
                  {({ toPdf }) => (
                    <button
                      onClick={toPdf}
                      style={{ backgroundColor: "#01a9ac" }}
                      type="button"
                      className="inline-flex items-center py-2 px-4 text-sm font-medium text-gray-900 bg-transparent rounded-l-lg border border-gray-900 hover:bg-gray-900 hover:text-teal-500 focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-teal-500 dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700 shadow  "
                    >
                      <svg
                        aria-hidden="true"
                        className="mr-2 w-4 h-4 fill-current"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M2 9.5A3.5 3.5 0 005.5 13H9v2.586l-1.293-1.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 15.586V13h2.5a4.5 4.5 0 10-.616-8.958 4.002 4.002 0 10-7.753 1.977A3.5 3.5 0 002 9.5zm9 3.5H9V8a1 1 0 012 0v5z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Downloads
                    </button>
                  )}
                </Pdf>
              </div>
            </div>
          </div>
          {/* end button */}
          <div ref={ref} className="row container px-48 py-12   border-t-2">
            <div className=" col-md-6   ">
              <div className="d-flex flex-column align-items-center text-center px-3 ">
                <img
                  className="rounded-circle mt-3"
                  width="180px"
                  // src="/admin/roman.png"
                  //src="https://arshi365.lamptechs.com/public/upload/1653487302.png"
                  src={`${singleTicket?.patient_info?.image_url}`}
                  // src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
                />
                <span className="font-weight-bold text-xl">{`${singleTicket?.patient_info?.first_name} ${singleTicket?.patient_info?.last_name}`}</span>
                <span className="mt-2 text-teal-500 font-medium">{`${singleTicket.patient_info?.email}`}</span>
                <span> </span>
              </div>
              {/* start */}
              <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
                <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    {/* <th scope="col" className="py-3 fs-5 fw-bolder">
                    Pre intake beoordeling (PiB)
                  </th> */}
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
                    <th
                      scope="row"
                      className="whitespace-normal px-2 py-2 font-medium text-gray-900 dark:text-white"
                    >
                      Patient source:
                    </th>
                    <td className="px-2 py-2">{`${singleTicket?.patient_info?.source}`}</td>
                  </tr>
                  <tr className=" border-b bg-white dark:border-gray-700 dark:bg-gray-800">
                    <th
                      scope="row"
                      className="whitespace-normal px-2 py-2 font-medium text-gray-900 dark:text-white"
                    >
                      Assign therapist:
                    </th>
                    <td className="px-2 py-2">
                      {`${singleTicket?.therapist_info?.first_name} ${singleTicket?.therapist_info?.last_name}`}
                    </td>
                  </tr>
                  <tr className="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
                    <th
                      scope="row"
                      className="whitespace-normal px-2 py-2 font-medium text-gray-900 dark:text-white"
                    >
                      Pass department:
                    </th>
                    <td className="px-2 py-2">
                      {`${singleTicket?.ticket_department_info?.name}`}
                    </td>
                  </tr>
                  <tr className="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
                    <th
                      scope="row"
                      className="whitespace-normal px-2 py-2 font-medium text-gray-900 dark:text-white"
                    >
                      Assign to:
                    </th>
                    <td className="px-2 py-2">{`${singleTicket?.therapist_info?.first_name} ${singleTicket?.therapist_info?.last_name}`}</td>
                  </tr>
                  <tr className="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
                    <th
                      scope="row"
                      className="whitespace-normal px-2 py-2 font-medium text-gray-900 dark:text-white"
                    >
                      Phone:
                    </th>
                    <td className="px-2 py-2">{`${singleTicket?.patient_info?.phone}`}</td>
                  </tr>
                  <tr className="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
                    <th
                      scope="row"
                      className="whitespace-normal px-2 py-2 font-medium text-gray-900 dark:text-white"
                    >
                      Alternative Phone:
                    </th>
                    <td className="px-2 py-2">{`${singleTicket?.patient_info?.alternet_phone}`}</td>
                  </tr>
                  <tr className="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
                    <th
                      scope="row"
                      className="whitespace-normal px-2 py-2 font-medium text-gray-900 dark:text-white"
                    >
                      Country:
                    </th>
                    <td className="px-2 py-2">{`${singleTicket?.patient_info?.country?.name}`}</td>
                  </tr>
                  <tr className="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
                    <th
                      scope="row"
                      className="whitespace-normal px-2 py-2 font-medium text-gray-900 dark:text-white"
                    >
                      Nationality:
                    </th>
                    <td className="px-2 py-2">{`${singleTicket.patient_info?.country?.name}`}</td>
                  </tr>
                  <tr className="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
                    <th
                      scope="row"
                      className="whitespace-normal px-2 py-2 font-medium text-gray-900 dark:text-white"
                    >
                      Resident Address:
                    </th>
                    <td className="px-2 py-2">{`${singleTicket.patient_info?.address}`}</td>
                  </tr>
                  <tr className="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
                    <th
                      scope="row"
                      className="whitespace-normal px-2 py-2 font-medium text-gray-900 dark:text-white"
                    >
                      State:
                    </th>
                    <td className="px-2 py-2">
                      {" "}
                      {`${singleTicket.patient_info?.state?.name}`}
                    </td>
                  </tr>
                  <tr className="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
                    <th
                      scope="row"
                      className="whitespace-normal px-2 py-2 font-medium text-gray-900 dark:text-white"
                    >
                      Area:
                    </th>
                    <td className="px-2 py-2">{`${singleTicket?.patient_info?.area}`}</td>
                  </tr>
                  <tr className="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
                    <th
                      scope="row"
                      className="whitespace-normal px-2 py-2 font-medium text-gray-900 dark:text-white"
                    >
                      Marital status:
                    </th>
                    <td className="px-2 py-2">{`${singleTicket?.patient_info?.marital_status}`}</td>
                  </tr>
                  <tr className="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
                    <th
                      scope="row"
                      className="whitespace-normal px-2 py-2 font-medium text-gray-900 dark:text-white"
                    >
                      Occupation:
                    </th>
                    <td className="px-2 py-2">{`${singleTicket?.patient_info?.occupation}`}</td>
                  </tr>
                  <tr className="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
                    <th
                      scope="row"
                      className="whitespace-normal px-2 py-2 font-medium text-gray-900 dark:text-white"
                    >
                      Date of birth:
                    </th>
                    <td className="px-2 py-2">{`${singleTicket?.patient_info?.date_of_birth}`}</td>
                  </tr>
                  <tr className="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
                    <th
                      scope="row"
                      className="whitespace-normal px-2 py-2 font-medium text-gray-900 dark:text-white"
                    >
                      Blood group:
                    </th>
                    <td className="px-2 py-2">{`${singleTicket.patient_info?.blood_group?.name}`}</td>
                  </tr>
                  <tr className="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
                    <th
                      scope="row"
                      className="whitespace-normal px-2 py-2 font-medium text-gray-900 dark:text-white"
                    >
                      Age:
                    </th>
                    <td className="px-2 py-2">{`${singleTicket?.patient_info?.age}`}</td>
                  </tr>
                  <tr className="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
                    <th
                      scope="row"
                      className="whitespace-normal px-2 py-2 font-medium text-gray-900 dark:text-white"
                    >
                      DOB number:
                    </th>
                    <td className="px-2 py-2">{`${singleTicket?.patient_info?.dob_number}`}</td>
                  </tr>
                  <tr className="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
                    <th
                      scope="row"
                      className="whitespace-normal px-2 py-2 font-medium text-gray-900 dark:text-white"
                    >
                      BNS number:
                    </th>
                    <td className="px-2 py-2">{`${singleTicket?.patient_info?.bsn_number}`}</td>
                  </tr>
                  <tr className=" border-b bg-white dark:border-gray-700 dark:bg-gray-800">
                    <th
                      scope="row"
                      className="whitespace-normal px-2 py-2 font-medium text-gray-900 dark:text-white"
                    >
                      Status treatment:
                    </th>
                    <td className="px-2 py-2">
                      {`${Statustest(singleTicket?.status)}`}
                    </td>
                  </tr>
                  <tr className=" border-b bg-white dark:border-gray-700 dark:bg-gray-800">
                    <th
                      scope="row"
                      className="whitespace-normal px-2 py-2 font-medium text-gray-900 dark:text-white"
                    >
                      Strike history:
                    </th>
                    <td className="px-2 py-2">{`${singleTicket?.strike_history}`}</td>
                  </tr>{" "}
                  <tr className="  bg-white dark:border-gray-700 dark:bg-gray-800">
                    <th
                      scope="row"
                      className="whitespace-normal px-2 py-2 font-medium text-gray-900 dark:text-white"
                    >
                      Treatment language:
                    </th>
                    <td className="px-2 py-2">{`${singleTicket?.language}`}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="col-md-6  border-l-2">
              <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
                <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    {/* <th scope="col" className="py-3 fs-5 fw-bolder">
                    Pre intake beoordeling (PiB)
                  </th> */}
                  </tr>
                </thead>
                <tbody>
                  <tr className="  bg-white dark:border-gray-700 dark:bg-gray-800">
                    <th
                      scope="row"
                      className="whitespace-normal px-2 py-2 font-medium text-gray-900 dark:text-white"
                    >
                      Mono/Multi ZD:
                    </th>
                    <td className="px-2 py-2">{`${singleTicket?.mono_multi_zd}`}</td>
                  </tr>
                  <tr className="  bg-white dark:border-gray-700 dark:bg-gray-800">
                    <th
                      scope="row"
                      className="whitespace-normal px-2 py-2 font-medium text-gray-900 dark:text-white"
                    >
                      Mono/Multi screening:
                    </th>
                    <td className="px-2 py-2">{`${singleTicket?.mono_multi_screeing}`}</td>
                  </tr>
                  <tr className="  bg-white dark:border-gray-700 dark:bg-gray-800">
                    <th
                      scope="row"
                      className="whitespace-normal px-2 py-2 font-medium text-gray-900 dark:text-white"
                    >
                      Intakes/therapist:
                    </th>
                    <td className="px-2 py-2">{`${singleTicket?.intakes_therapist}`}</td>
                  </tr>
                  <tr className="  bg-white dark:border-gray-700 dark:bg-gray-800">
                    <th
                      scope="row"
                      className="whitespace-normal px-2 py-2 font-medium text-gray-900 dark:text-white"
                    >
                      Tresonit nummer:
                    </th>
                    <td className="px-2 py-2">{`${singleTicket?.tresonit_nummer}`}</td>
                  </tr>
                  <tr className="  bg-white dark:border-gray-700 dark:bg-gray-800">
                    <th
                      scope="row"
                      className="whitespace-normal px-2 py-2 font-medium text-gray-900 dark:text-white"
                    >
                      Datum intake:
                    </th>
                    <td className="px-2 py-2">{`${singleTicket?.datum_intake}`}</td>
                  </tr>
                  <tr className="  bg-white dark:border-gray-700 dark:bg-gray-800">
                    <th
                      scope="row"
                      className="whitespace-normal px-2 py-2 font-medium text-gray-900 dark:text-white"
                    >
                      Datum intake 2:
                    </th>
                    <td className="px-2 py-2">{`${singleTicket?.datum_intake_2}`}</td>
                  </tr>
                  <tr className="  bg-white dark:border-gray-700 dark:bg-gray-800">
                    <th
                      scope="row"
                      className="whitespace-normal px-2 py-2 font-medium text-gray-900 dark:text-white"
                    >
                      ND account:
                    </th>
                    <td className="px-2 py-2">{`${singleTicket?.nd_account}`}</td>
                  </tr>
                  <tr className="  bg-white dark:border-gray-700 dark:bg-gray-800">
                    <th
                      scope="row"
                      className="whitespace-normal px-2 py-2 font-medium text-gray-900 dark:text-white"
                    >
                      AvC/AlfmVm/SBG:
                    </th>
                    <td className="px-2 py-2">{`${singleTicket?.avc_alfmvm_sbg}`}</td>
                  </tr>
                  <tr className="  bg-white dark:border-gray-700 dark:bg-gray-800">
                    <th
                      scope="row"
                      className="whitespace-normal px-2 py-2 font-medium text-gray-900 dark:text-white"
                    >
                      HoNOS+:
                    </th>
                    <td className="px-2 py-2">{`${singleTicket?.honos}`}</td>
                  </tr>
                  <tr className="  bg-white dark:border-gray-700 dark:bg-gray-800">
                    <th
                      scope="row"
                      className="whitespace-normal px-2 py-2 font-medium text-gray-900 dark:text-white"
                    >
                      Berha intake:
                    </th>
                    <td className="px-2 py-2">{`${singleTicket?.berha_intake}`}</td>
                  </tr>
                  <tr className="  bg-white dark:border-gray-700 dark:bg-gray-800">
                    <th
                      scope="row"
                      className="whitespace-normal px-2 py-2 font-medium text-gray-900 dark:text-white"
                    >
                      ROM start:
                    </th>
                    <td className="px-2 py-2">{`${singleTicket?.rom_start}`}</td>
                  </tr>
                  <tr className="  bg-white dark:border-gray-700 dark:bg-gray-800">
                    <th
                      scope="row"
                      className="whitespace-normal px-2 py-2 font-medium text-gray-900 dark:text-white"
                    >
                      ROM eind:
                    </th>
                    <td className="px-2 py-2">{`${singleTicket?.rom_eind}`}</td>
                  </tr>
                  <tr className="  bg-white dark:border-gray-700 dark:bg-gray-800">
                    <th
                      scope="row"
                      className="whitespace-normal px-2 py-2 font-medium text-gray-900 dark:text-white"
                    >
                      Berha eind:
                    </th>
                    <td className="px-2 py-2">{`${singleTicket?.berha_eind}`}</td>
                  </tr>
                  <tr className="  bg-white dark:border-gray-700 dark:bg-gray-800">
                    <th
                      scope="row"
                      className="whitespace-normal px-2 py-2 font-medium text-gray-900 dark:text-white"
                    >
                      VTCB date:
                    </th>
                    <td className="px-2 py-2">{`${singleTicket?.vtcb_date}`}</td>
                  </tr>
                  <tr className="  bg-white dark:border-gray-700 dark:bg-gray-800">
                    <th
                      scope="row"
                      className="whitespace-normal px-2 py-2 font-medium text-gray-900 dark:text-white"
                    >
                      Closure:
                    </th>
                    <td className="px-2 py-2">{`${singleTicket?.closure}`}</td>
                  </tr>
                  <tr className="  bg-white dark:border-gray-700 dark:bg-gray-800">
                    <th
                      scope="row"
                      className="whitespace-normal px-2 py-2 font-medium text-gray-900 dark:text-white"
                    >
                      Remarks:
                    </th>
                    <td className="px-2 py-2">{`${singleTicket?.remarks}`}</td>
                  </tr>
                  <tr className="border-b   bg-white dark:border-gray-700 dark:bg-gray-800">
                    <th
                      scope="row"
                      className="whitespace-normal px-2 py-2 font-medium text-gray-900 dark:text-white"
                    >
                      Aanm-intake 1 (dagentussen):
                    </th>
                    <td className="px-2 py-2">{`${singleTicket?.language}`}</td>
                  </tr>
                  <tr className="   bg-white dark:border-gray-700 dark:bg-gray-800">
                    <th
                      scope="row"
                      className="whitespace-normal px-2 py-2 font-medium text-gray-900 dark:text-white"
                    >
                      Medical history:
                    </th>
                  </tr>
                  <tr className="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
                    <td className="px-2 py-2">
                      {`${singleTicket?.patient_info?.medical_history}`}
                    </td>
                  </tr>
                  <tr className="    bg-white dark:border-gray-700 dark:bg-gray-800">
                    <th
                      scope="row"
                      className="whitespace-normal px-2 py-2 font-medium text-gray-900 dark:text-white"
                    >
                      Ticket history:
                    </th>
                  </tr>
                  <tr className="border-b  bg-white dark:border-gray-700 dark:bg-gray-800">
                    <td className="px-2 py-2">
                      {`${singleTicket?.ticket_history}`}
                    </td>
                  </tr>
                  {/* ticket log */}
                  {/* <tr className="   bg-white dark:border-gray-700 dark:bg-gray-800">
                      <th
                        scope="row"
                        className="whitespace-normal px-2 py-2 font-medium text-gray-900 dark:text-white"
                      >
                        Ticket history log:
                      </th>
                      
                    </tr> */}
                </tbody>
                {/* ticket log in */}
                {/* <thead className="bg-teal-500 rounded-lg  ">
                    <tr className="  text-white text-left ">
                      <th className="font-semibold text-sm px-1">User</th>
                      <th className="font-semibold text-sm  px-1">
                        Department
                      </th>
                      <th className="font-semibold text-sm  text-center px-1">
                        Status
                      </th>
                      <th className="font-semibold text-sm  text-center px-1">
                        Date & time
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <td className="px-1.5 py-2">
                        <div className="flex items-center space-x-3">
                          <div>
                            <p> Mira Rodeo </p>
                            <p className="text-gray-500 text-sm font-semibold tracking-wide">
                              {" "}
                              mirarodeo23@mail.com{" "}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-1.5 py-2">
                        <p className>Screener group</p>
                      </td>
                      <td className="px-1.5 py-2 text-center">
                        {" "}
                        <span className="text-white text-sm w-1/3 pb-1 bg-green-600 font-semibold px-2 rounded-full">
                          {" "}
                          Active{" "}
                        </span>{" "}
                      </td>
                      <td className="px-1.5 py-2 text-center">
                        09/10/2022,6:30 PM
                      </td>
                    </tr>
                    <tr>
                      <td className="px-1.5 py-2">
                        <div className="flex items-center space-x-3">
                          <div>
                            <p> Mira Rodeo </p>
                            <p className="text-gray-500 text-sm font-semibold tracking-wide">
                              {" "}
                              mirarodeo23@mail.com{" "}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-1.5 py-2">
                        <p className>Screener group</p>
                      </td>
                      <td className="px-1.5 py-2 text-center">
                        {" "}
                        <span className="text-white text-sm w-1/3 pb-1 bg-green-600 font-semibold px-2 rounded-full">
                          {" "}
                          Active{" "}
                        </span>{" "}
                      </td>
                      <td className="px-1.5 py-2 text-center">
                        {" "}
                        09/05/2022,8:30 PM
                      </td>
                    </tr>
                  </tbody>{" "} */}
                {/* ticket log end */}
              </table>
            </div>
            {/* activity log start */}
            <div className=" w-full mt-3">
              <table className="mx-auto   w-full whitespace-nowrap rounded-lg bg-white divide-y divide-gray-300 overflow-hidden">
                <thead className="bg-gray-400">
                  <tr className="text-white text-left">
                    <th className="font-semibold text-sm uppercase px-3 py-2">
                      User{" "}
                    </th>
                    <th className="font-semibold text-sm uppercase px-3 py-2">
                      {" "}
                      Department{" "}
                    </th>
                    <th className="font-semibold text-sm uppercase px-3 py-2 text-center">
                      {" "}
                      status{" "}
                    </th>
                    <th className="font-semibold text-sm uppercase px-3 py-2 text-center">
                      {" "}
                      date &amp; time{" "}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-4 py-3">
                      <div className="flex items-center space-x-3">
                        <div className="inline-flex w-10 h-10">
                          {" "}
                          <img
                            className="w-10 h-10 object-cover rounded-full"
                            alt="User avatar"
                            src="https://static.remove.bg/remove-bg-web/37843dee2531e43723b012aa78be4b91cc211fef/assets/start_remove-c851bdf8d3127a24e2d137a55b1b427378cd17385b01aec6e59d5d4b5f39d2ec.png"
                          />{" "}
                        </div>
                        <div>
                          <p> Mira Rodeo </p>
                          <p className="text-gray-500 text-sm font-semibold tracking-wide">
                            {" "}
                            mirarodeo23@mail.com{" "}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <p className> Appointment group </p>
                      <p className="text-gray-500 text-sm font-semibold tracking-wide">
                        {" "}
                        Development{" "}
                      </p>
                    </td>
                    <td className="px-4 py-3 text-center">
                      {" "}
                      <span className="text-white text-sm w-1/3 pb-1 bg-green-600 font-semibold px-2 rounded-full">
                        {" "}
                        Active{" "}
                      </span>{" "}
                    </td>
                    <td className="px-4 py-3 text-center">
                      {" "}
                      09/10/2022,6:30 PM{" "}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3">
                      <div className="flex items-center space-x-3">
                        <div className="inline-flex w-10 h-10">
                          {" "}
                          <img
                            className="w-10 h-10 object-cover rounded-full"
                            alt="User avatar"
                            src="https://static.remove.bg/remove-bg-web/37843dee2531e43723b012aa78be4b91cc211fef/assets/start_remove-c851bdf8d3127a24e2d137a55b1b427378cd17385b01aec6e59d5d4b5f39d2ec.png"
                          />{" "}
                        </div>
                        <div>
                          <p> Mira Rodeo </p>
                          <p className="text-gray-500 text-sm font-semibold tracking-wide">
                            {" "}
                            mirarodeo23@mail.com{" "}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className> Screener group </p>
                      <p className="text-gray-500 text-sm font-semibold tracking-wide">
                        {" "}
                        Development{" "}
                      </p>
                    </td>
                    <td className="px-4 py-3 text-center">
                      {" "}
                      <span className="text-white text-sm w-1/3 pb-1 bg-green-600 font-semibold px-2 rounded-full">
                        {" "}
                        Active{" "}
                      </span>{" "}
                    </td>
                    <td className="px-4 py-3 text-center">
                      09/05/2022,8:30 PM{" "}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </>
      ) : (
        <Loading />
      )}
    </>
  );
}

export default EditTicket;
