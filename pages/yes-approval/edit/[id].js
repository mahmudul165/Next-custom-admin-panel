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
import { ToastContainer } from "react-toastify/lib";
import axios from "axios";

function EditTicket() {
  const { postData, updateData, Statustest } = useAuth();

  const [startDate, setStartDate] = useState(new Date());
  const { register, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });
  const { data: patientList } = usePatientListQuery();
  const { data: therapistList } = useTherapitListQuery();
  const { data: ticketDepartment } = useAllTicketDepartmentQuery();

  // const { data: singlePatient } = usePatientQuery(searchInput);
  //const { data, error, isError } = useTherapitListQuery();
  //console.log("All ticket data  from  ", data);

  //console.log("patient list from ticket from", patientList);
  //console.log(" single patient list from ticket from", singlePatient);
  //console.log("therapy list  from ticket from", therapistList);
  //console.log("ticket department list  from ticket from", ticketDepartment);

  // get  single patient data
  const router = useRouter();
  const { id } = router.query;
  console.log("single ticket id", typeof id);

  const fetchSingleTicket = async () => {
    const response = await fetch(
      `https://misiapi.lamptechs.com/api/v1/ticket/show?id=${id}`,
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );
    return await response.json();
  };
  // const cancelToken = axios.cancelToken;
  // const source = cancelToken.source();
  // const fetchSingleTicket = async () => {
  //   axios
  //     .get(`https://misiapi.lamptechs.com/api/v1/ticket/show?id=${id}`, {
  //       cancelToken: source.token, //create cancel token
  //     })
  //     .then((response) => {
  //       console.log(response.data);
  //     })
  //     .catch((thrown) => {
  //       if (axios.isCancel(thrown)) {
  //         console.log("Request cancelled", thrown.message);
  //       } else {
  //         //handle the error
  //       }
  //     });
  //   //Cancel the request
  //   source.cancel("Request cancelled by the user");
  //   return await response.json();
  // };

  const useSingleTicketQuery = () =>
    useQuery(["fetchSingleTicket"], fetchSingleTicket);
  const { data: singleTicket } = useSingleTicketQuery();
  console.log("edit  singleTicket data", singleTicket);

  const [value, setValue] = React.useState();
  const [inputValue, setInputValue] = React.useState("");
  const SuccessData = {
    title: "Success",
    type: "success",
    text: "Your work has been saved.",
    footer: "",
  };
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
      {singleTicket ? (
        <form
          className="w-10/12 m-auto p-10  first-line: "
          onSubmit={handleSubmit(
            (d) =>
              updateData(
                `https://misiapi.lamptechs.com/api/v1/ticket/update`,
                d
              )
            // console.log("ticket store data", d)
          )}
        >
          <div className="px-3">
            <div className=" card d-flex      justify-center  ">
              {/* edit header part */}
              <div className="grid    mt-2.5 items-center justify-between  ">
                <h2
                  className="col-start-1  text-center text-3xl   font-extrabold  ml-16  "
                  style={{ color: "#01a9ac" }}
                >
                  Update ticket details Info
                  {/* id: {singleTicket.data?.id} */}
                </h2>
                {/* button download and save */}
                <div className="col-start-2 my-3 px-3 md:flex md:items-center justify-end mr-16">
                  <div
                    className="inline-flex rounded-md shadow-sm"
                    role="group"
                  >
                    <button
                      onClick={() => router.push(`/yes-approval`)}
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
                    {/* <Pdf targetRef={ref} filename="ticket.pdf">
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
                    </Pdf> */}
                  </div>
                </div>
              </div>
              {/*  form */}
              <div className="row m-3 p-3 ">
                {/* column 1 */}
                <div className=" col-md-6    ">
                  {/* <div className="d-flex flex-column align-items-center text-center px-3 ">
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
                  </div> */}
                  {/* start */}
                  <>
                    <div className="d-flex flex-column align-items-center text-center px-3  ">
                      <img
                        className="rounded-circle mt-3  "
                        style={{ width: "180px" }}
                        //src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
                        //src={`${singlepatient?.image_url}`}
                        src={`${
                          singleTicket?.data?.patient_info?.image_url !==
                          "https://misiapi.lamptechs.com/"
                            ? singleTicket?.data?.patient_info?.image_url
                            : "https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
                        }`}
                      />
                      <span className="font-weight-bold text-xl">
                        {`${singleTicket?.data?.patient_info?.first_name} ${singleTicket?.data?.patient_info?.last_name}`}
                      </span>
                      <span className="text-lg mb-2 text-teal-500 font-medium">
                        {`${singleTicket?.data?.patient_info?.email}`}
                      </span>
                      <span> </span>
                    </div>
                    {/* ticket Id */}
                    <div className="grid gap-4  mt-2.5">
                      <div className="relative">
                        <input
                          type="text"
                          id="id"
                          {...register("id")}
                          className="hidden block px-2.5 pb-2 pt-2.5 py-2.5 w-full rows-4 text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
                          value={singleTicket?.data?.id}
                          required
                        />
                        <label
                          htmlFor="id"
                          className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-teal-500 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                        >
                          {/* {`${singleTicket?.data?.id}`} */}
                        </label>
                      </div>
                    </div>
                    {/* start */}

                    <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400 mt-3">
                      <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400"></thead>
                      <tbody>
                        <tr className="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
                          <th
                            scope="row"
                            className="whitespace-normal px-3 py-2.5 font-bold text-black dark:text-white"
                          >
                            Patient Id:
                          </th>
                          <td className="px-3 py-2.5">
                            <input
                              type="text"
                              id="patient_id"
                              {...register("patient_id")}
                              className=""
                              placeholder="  "
                              value={singleTicket?.data?.patient_info?.id}
                              required
                            />
                            {/* {`${singleTicket?.data?.patient_info?.source}`} */}
                          </td>
                        </tr>
                        <tr className="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
                          <th
                            scope="row"
                            className="whitespace-normal px-3 py-2.5 font-bold text-black dark:text-white"
                          >
                            Patient source:
                          </th>
                          <td className="px-3 py-2.5">
                            {`${singleTicket?.data?.patient_info?.source}`}
                          </td>
                        </tr>
                        <tr>
                          {/* <th scope="col" className="py-3 fs-5 fw-bolder">
                    Pre intake beoordeling (PiB)
                  </th> */}
                        </tr>
                        <tr className="border-b bg-white dark:border-gray-700 dark:bg-gray-800 my-3">
                          <th
                            scope="row"
                            className="whitespace-normal px-3 py-2.5 font-bold text-black dark:text-white"
                          >
                            Phone number:
                          </th>
                          <td className="px-3 py-2.5">
                            {`${singleTicket?.data?.patient_info?.phone}`}
                          </td>
                        </tr>
                        <tr className="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
                          <th
                            scope="row"
                            className="whitespace-normal px-3 py-2.5 font-bold text-black dark:text-white"
                          >
                            Alternative Phone:
                          </th>
                          <td className="px-3 py-2.5">
                            {`${singleTicket?.data?.patient_info?.alternet_phone}`}
                          </td>
                        </tr>
                        <tr className="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
                          <th
                            scope="row"
                            className="whitespace-normal px-3 py-2.5 font-bold text-black dark:text-white"
                          >
                            Nationality:
                          </th>
                          <td className="px-3 py-2.5">
                            {`${singleTicket?.data?.patient_info?.country?.name}`}
                          </td>
                        </tr>

                        <tr className="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
                          <th
                            scope="row"
                            className="whitespace-normal px-3 py-2.5 font-bold text-black dark:text-white"
                          >
                            Resident Address:
                          </th>
                          <td className="px-3 py-2.5">
                            {`${singleTicket?.data?.patient_info?.country?.name}`}
                          </td>
                        </tr>
                        <tr className="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
                          <th
                            scope="row"
                            className="whitespace-normal px-3 py-2.5 font-bold text-black dark:text-white"
                          >
                            State:
                          </th>
                          <td className="px-3 py-2.5">
                            {" "}
                            {`${singleTicket?.data?.patient_info?.state?.name}`}
                          </td>
                        </tr>
                        <tr className="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
                          <th
                            scope="row"
                            className="whitespace-normal px-3 py-2.5 font-bold text-black dark:text-white"
                          >
                            Area:
                          </th>
                          <td className="px-3 py-2.5">
                            {`${singleTicket?.data?.patient_info?.area}`}
                          </td>
                        </tr>
                        <tr className="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
                          <th
                            scope="row"
                            className="whitespace-normal px-3 py-2.5 font-bold text-black dark:text-white"
                          >
                            Marital status:
                          </th>
                          <td className="px-3 py-2.5">
                            {`${singleTicket?.data?.patient_info?.marital_status}`}
                          </td>
                        </tr>
                        <tr className="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
                          <th
                            scope="row"
                            className="whitespace-normal px-3 py-2.5 font-bold text-black dark:text-white"
                          >
                            Occupation:
                          </th>
                          <td className="px-3 py-2.5">
                            {`${singleTicket?.data?.patient_info?.occupation}`}
                          </td>
                        </tr>
                        <tr className="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
                          <th
                            scope="row"
                            className="whitespace-normal px-3 py-2.5 font-bold text-black dark:text-white"
                          >
                            Date of birth:
                          </th>
                          <td className="px-3 py-2.5">
                            {`${singleTicket?.data?.patient_info?.date_of_birth}`}
                          </td>
                        </tr>
                        <tr className="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
                          <th
                            scope="row"
                            className="whitespace-normal px-3 py-2.5 font-bold text-black dark:text-white"
                          >
                            Blood group:
                          </th>
                          <td className="px-3 py-2.5">
                            {`${singleTicket?.data?.patient_info?.blood_group?.name}`}
                          </td>
                        </tr>
                        <tr className="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
                          <th
                            scope="row"
                            className="whitespace-normal px-3 py-2.5 font-bold text-black dark:text-white"
                          >
                            Age:
                          </th>
                          <td className="px-3 py-2.5">
                            {`${singleTicket?.data?.patient_info?.age}`}
                          </td>
                        </tr>
                        <tr className="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
                          <th
                            scope="row"
                            className="whitespace-normal px-3 py-2.5 font-bold text-black dark:text-white"
                          >
                            DOB number:
                          </th>
                          <td className="px-3 py-2.5">
                            {`${singleTicket?.data?.patient_info?.dob_number}`}
                          </td>
                        </tr>
                        <tr className="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
                          <th
                            scope="row"
                            className="whitespace-normal px-3 py-2.5 font-bold text-black dark:text-white"
                          >
                            BNS number:
                          </th>
                          <td className="px-3 py-2.5">
                            {/* {`${singleTicket?.data?.patient_info?.bsn_number}`} */}
                          </td>
                        </tr>
                        {/* Insurance number */}
                        <tr className="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
                          <th
                            scope="row"
                            className="whitespace-normal px-3 py-2.5 font-bold text-black dark:text-white"
                          >
                            Insurance number:
                          </th>
                          <td className="px-3 py-2.5">
                            {/* {`${singleTicket?.data?.patient_info?.bsn_number}`} */}
                          </td>
                        </tr>
                        {/* Insurance number */}
                        <tr className="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
                          <th
                            scope="row"
                            className="whitespace-normal px-3 py-2.5 font-bold text-black dark:text-white"
                          >
                            Medical history:
                          </th>
                          <td className="px-3 py-2.5">
                            {`${singleTicket?.data?.patient_info?.bsn_number}`}
                          </td>
                        </tr>
                        <tr>
                          <p className="whitespace-normal px-3 py-2.5 font-bold text-black dark:text-white">
                            {`${singleTicket?.data?.patient_info?.medical_history}`}
                          </p>
                        </tr>
                      </tbody>
                    </table>
                    {/* start */}
                  </>
                </div>
                {/* column 2 */}
                <div className="col-md-6  border-l-2">
                  {/* Assign To therapist */}
                  <div className="relative mt-2.5">
                    {/* {therapistList?.data && (
                      <Autocomplete
                        disablePortal
                        // {`${singleTicket?.data?.therapist_info?.id} ${singleTicket?.data?.therapist_info?.first_name} ${singleTicket?.data?.therapist_info?.last_name}`}
                        // defaultValue={`${singleTicket?.data?.therapist_info?.id}`}
                        getOptionLabel={(option) => option.title}
                        options={therapistList?.data.map(
                          (therapist) => `${therapist.id}`
                          // `${therapist.id}-${therapist.first_name} ${therapist.last_name} - ${therapist.phone}`
                        )}
                        sx={{ width: 300 }}
                        renderInput={(params) => (
                          <TextField {...params} label="Assign to therapist" />
                        )}
                        id="therapist_id"
                        {...register("therapist_id")}
                      />
                    )} */}
                    {therapistList?.data ? (
                      <div className="relative my-3">
                        <select
                          id="therapist_id"
                          {...register("therapist_id")}
                          defaultValue={singleTicket?.data?.therapist_info?.id}
                          className="block px-2.5 pb-2 pt-2.5 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
                        >
                          {/* {`${singleTicket?.data?.therapist_info?.id} ${singleTicket?.data?.therapist_info?.first_name} ${singleTicket?.data?.therapist_info?.last_name}`} */}
                          {/* <option
                            selected Value={singleTicket?.data?.therapist_info?.id}
                          >{`${singleTicket?.data?.therapist_info?.id} ${singleTicket?.data?.therapist_info?.first_name} ${singleTicket?.data?.therapist_info?.last_name}`}</option> */}
                          {therapistList.data?.map((item) => (
                            <option key={item.id} value={`${item?.id}`}>
                              {`${item?.id} ${item?.first_name} ${item?.last_name}`}
                            </option>
                          ))}
                        </select>
                        <label
                          htmlFor="therapist_id"
                          className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-teal-500 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                        >
                          Assign to therapist
                        </label>
                      </div>
                    ) : (
                      <>
                        <Stack spacing={1}>
                          <Skeleton animation="wave" height={40} />
                        </Stack>
                      </>
                    )}
                  </div>
                  {/* Pass Department  */}
                  <div className="relative  mt-2.5">
                    {ticketDepartment?.data ? (
                      <div className="relative my-3">
                        <select
                          defaultValue={
                            singleTicket?.data?.ticket_department_info?.id
                          }
                          id="ticket_department_id"
                          {...register("ticket_department_id")}
                          className="block px-2.5 pb-2 pt-2.5 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
                        >
                          {/* <option selected Value={singleTicket?.data?.ticket_department_info?.id} >
                            {singleTicket?.data?.ticket_department_info?.name}
                          </option> */}
                          {ticketDepartment.data?.map((item) => (
                            <option key={item.id} value={`${item?.id}`}>
                              {`${item?.name}`}
                            </option>
                          ))}
                        </select>
                        <label
                          htmlFor="ticket_department_id"
                          className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-teal-500 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                        >
                          Pass to department
                        </label>
                      </div>
                    ) : (
                      <>
                        <Stack spacing={1}>
                          <Skeleton animation="wave" height={40} />
                        </Stack>
                      </>
                    )}
                  </div>
                  {/*call strike  */}
                  <div className="relative mt-2.5">
                    <select
                      id="strike"
                      name="strike"
                      defaultValue={singleTicket?.data?.strike}
                      {...register("strike")}
                      className="block px-2.5 pb-2 pt-2.5 py-2.5 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
                    >
                      {/* <option selected>{singleTicket?.data?.strike} </option> */}
                      <option value="Call Strike 1">Call Strike 1</option>
                      <option value="Call Strike 2">Call Strike 2</option>
                      <option value="Call Strike 3">Call Strike 3</option>
                    </select>
                    <label
                      htmlFor="floating_outlined"
                      className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-teal-500 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                    >
                      Call Strike
                    </label>
                  </div>
                  {/* location  */}
                  <div className="relative   mt-2.5">
                    <input
                      type="text"
                      id="location"
                      {...register("location")}
                      className="block px-2.5 pb-2 pt-2.5 py-2.5 w-full rows-4 text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
                      defaultValue={singleTicket?.data?.location}
                      //required
                    />
                    <label
                      htmlFor="location"
                      className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-teal-500 peer-focus:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-25 peer-focus:-translate-y-4 left-1"
                    >
                      Location
                    </label>
                  </div>
                  {/* strike History */}
                  <div className="relative  mt-2.5">
                    <textarea
                      className="h-28 block px-2.5 pb-2 pt-2.5 py-2.5 w-full rows-4 text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
                      id="strike_history"
                      {...register("strike_history")}
                      type="text"
                      defaultValue={singleTicket?.data?.strike_history}
                    />
                    <label
                      htmlFor="strike_history"
                      className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-teal-500 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                    >
                      Strike history
                    </label>
                  </div>
                  {/* ticket History */}
                  <div className="relative  mt-2.5">
                    {/* <Input type="text" value={selectedUser.name} onChange={onChange} name="name" placeholder="Enter user" required></Input> */}
                    <textarea
                      className="h-28 block px-2.5 pb-2 pt-2.5 py-2.5 w-full rows-4 text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
                      id="ticket_history"
                      {...register("ticket_history")}
                      type="text"
                      // value={`${singleTicket?.data?.ticket_history}`}
                      // onChange={onChange}
                      name="ticket_history"
                      defaultValue={singleTicket?.data?.ticket_history}
                    />
                    <label
                      htmlFor="ticket_history"
                      className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-teal-500 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                    >
                      Ticket history
                    </label>
                  </div>
                  {/* start new field */}
                  {/*  Mono/Multi ZD*/}
                  <div className="col-start-1 relative my-3  ">
                    <input
                      type="text"
                      id="mono_multi_zd"
                      name="mono_multi_zd"
                      {...register("mono_multi_zd")}
                      className="block px-2.5 pb-2 pt-2.5 py-2.5 w-full rows-4 text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
                      defaultValue={singleTicket?.data?.mono_multi_zd}
                    />
                    <label
                      htmlFor="mono_multi_zd"
                      className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-teal-500 peer-focus:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-25 peer-focus:-translate-y-4 left-1"
                    >
                      Mono/Multi ZD
                    </label>
                  </div>
                  {/*  Mono/Multi screening */}
                  <div className="col-start-2 relative my-3  ">
                    <input
                      id="mono_multi_screeing"
                      {...register("mono_multi_screeing")}
                      className="block px-2.5 pb-2 pt-2.5 py-2.5 w-full rows-4 text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
                      defaultValue={singleTicket?.data?.mono_multi_screeing}
                    />
                    <label
                      htmlFor="mono_multi_screeing"
                      className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-teal-500 peer-focus:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-25 peer-focus:-translate-y-4 left-1"
                    >
                      Mono/Multi screening
                    </label>
                  </div>
                  {/* Intakes/therapist*/}
                  <div className="col-start-1 relative my-3  ">
                    <input
                      type="text"
                      id="intakes_therapist"
                      name="intakes_therapist"
                      {...register("intakes_therapist")}
                      className="block px-2.5 pb-2 pt-2.5 py-2.5 w-full rows-4 text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
                      defaultValue={singleTicket?.data?.intakes_therapist}
                      //value={singleTicket?.data?.intakes_therapist}
                    />
                    <label
                      htmlFor="intakes_therapist"
                      className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-teal-500 peer-focus:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-25 peer-focus:-translate-y-4 left-1"
                    >
                      Intakes/therapist
                    </label>
                  </div>
                  {/*  Tresonit nummer  */}
                  <div className="col-start-2 relative my-3  ">
                    <input
                      id="tresonit_nummer"
                      {...register("tresonit_nummer")}
                      className="block px-2.5 pb-2 pt-2.5 py-2.5 w-full rows-4 text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
                      defaultValue={singleTicket?.data?.tresonit_nummer}
                    />
                    <label
                      htmlFor="tresonit-nummer"
                      className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-teal-500 peer-focus:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-25 peer-focus:-translate-y-4 left-1"
                    >
                      Tresonit nummer
                    </label>
                  </div>
                  {/* Datum intake*/}
                  <div className="col-start-1 relative my-3  ">
                    <input
                      type="text"
                      id="datum_intake"
                      {...register("datum_intake")}
                      className="block px-2.5 pb-2 pt-2.5 py-2.5 w-full rows-4 text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
                      defaultValue={singleTicket?.data?.datum_intake}
                    />

                    <label
                      htmlFor="datum-intake"
                      className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-teal-500 peer-focus:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-25 peer-focus:-translate-y-4 left-1"
                    >
                      Datum intake
                    </label>
                  </div>
                  {/*  Datum intake 2  */}
                  <div className="col-start-2 relative my-3  ">
                    <input
                      id="datum_intake_2"
                      {...register("datum_intake_2")}
                      className="block px-2.5 pb-2 pt-2.5 py-2.5 w-full rows-4 text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
                      defaultValue={singleTicket?.data?.datum_intake}
                    />
                    <label
                      htmlFor="datum-intake-2"
                      className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-teal-500 peer-focus:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-25 peer-focus:-translate-y-4 left-1"
                    >
                      Datum intake 2
                    </label>
                  </div>
                  {/* ND account*/}
                  <div className="col-start-1 relative my-3  ">
                    <input
                      type="text"
                      id="nd_account"
                      {...register("nd_account")}
                      className="block px-2.5 pb-2 pt-2.5 py-2.5 w-full rows-4 text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
                      defaultValue={singleTicket?.data?.nd_account}
                    />
                    <label
                      htmlFor="nd_account"
                      className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-teal-500 peer-focus:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-25 peer-focus:-translate-y-4 left-1"
                    >
                      ND account
                    </label>
                  </div>
                  {/*  AvC/AlfmVm/SBG  */}
                  <div className="col-start-2 relative my-3  ">
                    <input
                      id="avc_alfmvm_sbg"
                      {...register("avc_alfmvm_sbg")}
                      className="block px-2.5 pb-2 pt-2.5 py-2.5 w-full rows-4 text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
                      defaultValue={singleTicket?.data?.avc_alfmvm_sbg}
                    />

                    <label
                      htmlFor="avc_alfmvm_sbg"
                      className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-teal-500 peer-focus:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-25 peer-focus:-translate-y-4 left-1"
                    >
                      AvC/AlfmVm/SBG
                    </label>
                  </div>
                  {/* HoNOS+*/}
                  <div className="col-start-1 relative my-3  ">
                    <input
                      type="text"
                      id="honos"
                      {...register("honos")}
                      className="block px-2.5 pb-2 pt-2.5 py-2.5 w-full rows-4 text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
                      defaultValue={singleTicket?.data?.honos}
                    />
                    <label
                      htmlFor="honos"
                      className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-teal-500 peer-focus:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-25 peer-focus:-translate-y-4 left-1"
                    >
                      HoNOS+
                    </label>
                  </div>
                  {/*  Berha intake  */}
                  <div className="col-start-2 relative my-3  ">
                    <input
                      id="berha_intake"
                      {...register("berha_intake")}
                      className="block px-2.5 pb-2 pt-2.5 py-2.5 w-full rows-4 text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
                      defaultValue={singleTicket?.data?.berha_intake}
                    />
                    <label
                      htmlFor="berha_intake"
                      className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-teal-500 peer-focus:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-25 peer-focus:-translate-y-4 left-1"
                    >
                      Berha intake
                    </label>
                  </div>
                  {/*  ROM start*/}
                  <div className="col-start-1 relative my-3  ">
                    <input
                      type="date"
                      id="rom_start"
                      {...register("rom_start")}
                      className="block px-2.5 pb-2 pt-2.5 py-2.5 w-full rows-4 text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
                      defaultValue={singleTicket?.data?.rom_start}
                    />
                    <label
                      htmlFor="rom_start"
                      className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-teal-500 peer-focus:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-25 peer-focus:-translate-y-4 left-1"
                    >
                      ROM start
                    </label>
                  </div>
                  {/*  ROM eind */}
                  <div className="col-start-2 relative my-3  ">
                    <input
                      type="date"
                      id="rom_eind"
                      {...register("rom_eind")}
                      className="block px-2.5 pb-2 pt-2.5 py-2.5 w-full rows-4 text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
                      defaultValue={singleTicket?.data?.rom_eind}
                    />
                    <label
                      htmlFor="rom_eind"
                      className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-teal-500 peer-focus:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-25 peer-focus:-translate-y-4 left-1"
                    >
                      ROM eind
                    </label>
                  </div>
                  {/* Berha eind*/}
                  <div className="col-start-1 relative my-3  ">
                    <input
                      type="date"
                      id="berha_eind"
                      {...register("berha_eind")}
                      className="block px-2.5 pb-2 pt-2.5 py-2.5 w-full rows-4 text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
                      defaultValue={singleTicket?.data?.berha_eind}
                    />

                    <label
                      htmlFor="berha_eind"
                      className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-teal-500 peer-focus:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-25 peer-focus:-translate-y-4 left-1"
                    >
                      Berha eind
                    </label>
                  </div>
                  {/*  VTCB date */}
                  <div className="col-start-2 relative my-3  ">
                    <input
                      type="date"
                      id="vtcb_date"
                      {...register("vtcb_date")}
                      className="block px-2.5 pb-2 pt-2.5 py-2.5 w-full rows-4 text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
                      defaultValue={singleTicket?.data?.vtcb_date}
                    />
                    <label
                      htmlFor="vtcb_date"
                      className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-teal-500 peer-focus:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-25 peer-focus:-translate-y-4 left-1"
                    >
                      VTCB date
                    </label>
                  </div>
                  {/* Closure*/}
                  <div className="col-start-1 relative my-3  ">
                    <input
                      type="date"
                      id="closure"
                      name="closure"
                      {...register("closure")}
                      className="block px-2.5 pb-2 pt-2.5 py-2.5 w-full rows-4 text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
                      defaultValue={singleTicket?.data?.closure}
                    />
                    <label
                      htmlFor="closure"
                      className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-teal-500 peer-focus:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-25 peer-focus:-translate-y-4 left-1"
                    >
                      Closure
                    </label>
                  </div>
                  {/* Aanm-intake 1 (dagentussen) */}
                  <div className="col-start-2 relative my-3  ">
                    <input
                      type="date"
                      id="aanm_intake_1"
                      {...register("aanm_intake_1")}
                      className="block px-2.5 pb-2 pt-2.5 py-2.5 w-full rows-4 text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
                      defaultValue={singleTicket?.data?.aanm_intake_1}
                    />
                    <label
                      htmlFor="aanm_intake_1"
                      className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-teal-500 peer-focus:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-25 peer-focus:-translate-y-4 left-1"
                    >
                      Aanm-intake 1 (dagentussen)
                    </label>
                  </div>
                  {/* end new field */}
                  {/* status */}
                  <div className="relative mt-2.5">
                    <select
                      id="status"
                      defaultValue={singleTicket?.data?.status}
                      className="block px-2.5 pb-2 pt-2.5 py-2.5 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
                      aria-label="Default select example"
                      {...register("status")}
                    >
                      {/* <option selected>
                        {Statustest(singleTicket?.data?.status)}                       
                      </option> */}
                      <option value="1">Active</option>
                      <option value="2">Inactive</option>
                      <option value="3">Pending</option>
                      <option value="4">Cancelled</option>
                      <option value="5">Deleted</option>
                    </select>
                    <label
                      htmlFor="status"
                      className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-teal-500 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                    >
                      Status
                    </label>
                  </div>
                  {/* Language Select  */}
                  <div className="relative mt-2.5">
                    <select
                      id="language"
                      defaultValue={singleTicket?.data?.language}
                      {...register("language")}
                      className="block px-2.5 pb-2 pt-2.5 py-2.5 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
                    >
                      {/* <option selected>{singleTicket?.data?.language}</option> */}
                      <option value="English">English</option>
                      <option value="Dutch">Dutch</option>
                    </select>
                    <label
                      htmlFor="language"
                      className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-teal-500 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                    >
                      Language
                    </label>
                  </div>

                  {/* remarks */}
                  <div className="relative my-2.5 ">
                    <input
                      type="text"
                      id="remarks"
                      {...register("remarks")}
                      className="block px-2.5 pb-2 pt-2.5 py-2.5 w-full rows-4 text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
                      defaultValue={singleTicket?.data?.remarks}
                      // required
                    />
                    <label
                      htmlFor="remarks"
                      className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-teal-500 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                    >
                      Remarks
                    </label>
                  </div>
                  <div className=" flex justify-end">
                    <button
                      className="decoration-4 text-xl shadow mt-6   hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                      type="submit"
                      style={{ backgroundColor: "#01a9ac" }}
                    >
                      Update
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      ) : (
        <Loading />
      )}
    </>
  );
}

export default EditTicket;

// useDebounce onchange react
// patient form separation
// search api 'singlePatient'
// 'singlePatient?.data' ? then show data a from :another blank form
