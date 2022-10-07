import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import AppointmentForm from "/components/appointment/AppointmentForm";
import useSWR from "swr";
import { useQuery } from "react-query";
import axios from "axios";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { ToastContainer } from "react-toastify/lib";
import Loading from "/components/common/Loading";
import { Autocomplete, Skeleton, Stack, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import {
  usePatientListQuery,
  //usePatientQuery,
  useTherapitListQuery,
  useAllTicketDepartmentQuery,
} from "/hook/useApi.js";
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
import { useTherapistScheduleQuery } from "../../../hook/useApi";
function Edit() {
  const router = useRouter();
  const { id } = router.query;
  const { postData, updateData, Statustest } = useAuth();
  const { register, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });

  //console.log("router params id", id);
  //const [data, setdata] = useState();
  // const { data, error } = useSWR(
  //   `https://misiapi.lamptechs.com/api/v1/patient/show/${id}`,
  //   {
  //     fetcher: async (url) => await fetch(url).then((res) => res.json()),
  //   }
  // );
  // get  single appointment data
  const fetchSingleAppointment = async () => {
    const response = await fetch(
      `https://misiapi.lamptechs.com/api/v1/appointment/show?id=${id}`,
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );
    return await response.json();
  };
  const useAppointmentQuery = () =>
    useQuery(["fetchSingleAppointment"], fetchSingleAppointment);
  const { data: singleAppointment } = useAppointmentQuery();
  console.log("edit single appointment data data", singleAppointment);
  const { data: patientList } = usePatientListQuery();
  const { data: therapistList } = useTherapitListQuery();
  const { data: ticketDepartment } = useAllTicketDepartmentQuery();
  const { data: therapistSchedule } = useTherapistScheduleQuery();

  // const { data: singlePatient } = usePatientQuery(searchInput);
  //const { data, error, isError } = useTherapitListQuery();
  //console.log("All ticket data  from  ", data);

  console.log("patient list from ticket from", therapistSchedule);
  //console.log(" single patient list from ticket from", singlePatient);
  //console.log("therapy list  from ticket from", therapistList);
  //console.log("ticket department list  from ticket from", ticketDepartment);
  // search input catch
  const handleSearchChange = (e) => {
    setSearchInput(e.target.value);
  };

  const debounce = (fn, delay) => {
    let timer;
    return function(...args) {
      clearTimeout(timer);
      timer = setTimeout(() => fn(...args), delay);
    };
  };

  // const [singlepatient, setPatient] = useState("");
  // useEffect(() => {
  //   const url = `https://misiapi.lamptechs.com/api/v1/patient/show/${searchInput}`;
  //   console.log("url", url);
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch(url, {
  //         headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  //       });
  //       const json = await response.json();
  //       // console.log(json);
  //       setPatient(json?.data);
  //     } catch (error) {
  //       console.log("error", error);
  //     }
  //   };

  //   fetchData();
  // }, [searchInput]);
  return (
    <>
      {singleAppointment ? (
        <form
          className="w-10/12 m-auto p-10  first-line: "
          onSubmit={handleSubmit(
            (d) =>
              updateData(
                `https://misiapi.lamptechs.com/api/v1/appointment/update/${id}`,
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
                  Update appointment details Info
                  {/* id: {singleAppointment.data?.id} */}
                </h2>
                {/* button download and save */}
                <div className="col-start-2 my-3 px-3 md:flex md:items-center justify-end mr-16">
                  <div
                    className="inline-flex rounded-md shadow-sm"
                    role="group"
                  >
                    <button
                      onClick={() => router.push(`/appointment`)}
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
                      src={`${singleAppointment?.patient_info?.image_url}`}
                      // src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
                    />
                    <span className="font-weight-bold text-xl">{`${singleAppointment?.patient_info?.first_name} ${singleAppointment?.patient_info?.last_name}`}</span>
                    <span className="mt-2 text-teal-500 font-medium">{`${singleAppointment.patient_info?.email}`}</span>
                    <span> </span>
                  </div> */}
                  {/* start */}
                  <>
                    <div className="d-flex flex-column align-items-center text-center px-3  ">
                      <img
                        className="rounded-circle mt-3"
                        width="180px"
                        //src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
                        //src={`${singlepatient?.image_url}`}
                        src={`${
                          singleAppointment?.data?.patient_info?.image_url !==
                          "https://misiapi.lamptechs.com/"
                            ? singleAppointment?.data?.patient_info?.image_url
                            : "https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
                        }`}
                      />
                      <span className="font-weight-bold text-xl">
                        {`${singleAppointment?.data?.patient_info?.first_name} ${singleAppointment?.data?.patient_info?.last_name}`}
                      </span>
                      <span className="text-lg mb-2 text-teal-500 font-medium">
                        {`${singleAppointment?.data?.patient_info?.email}`}
                      </span>
                      <span> </span>
                    </div>
                    {/* appointment Id */}
                    <div className="grid gap-4  mt-2.5">
                      <div className="relative">
                        <input
                          type="text"
                          id="id"
                          {...register("id")}
                          className="hidden block px-2.5 pb-2 pt-2.5 py-2.5 w-full rows-4 text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
                          value={singleAppointment?.data?.id}
                          required
                        />
                        <label
                          htmlFor="id"
                          className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-teal-500 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                        >
                          {/* {`${singleAppointment?.data?.id}`} */}
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
                              value={singleAppointment?.data?.patient_info?.id}
                              required
                            />
                            {/* {`${singleAppointment?.data?.patient_info?.source}`} */}
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
                            {`${singleAppointment?.data?.patient_info?.source}`}
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
                            {`${singleAppointment?.data?.patient_info?.phone}`}
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
                            {`${singleAppointment?.data?.patient_info?.alternet_phone}`}
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
                            {`${singleAppointment?.data?.patient_info?.country?.name}`}
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
                            {`${singleAppointment?.data?.patient_info?.country?.name}`}
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
                            {`${singleAppointment?.data?.patient_info?.state?.name}`}
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
                            {`${singleAppointment?.data?.patient_info?.area}`}
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
                            {`${singleAppointment?.data?.patient_info?.marital_status}`}
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
                            {`${singleAppointment?.data?.patient_info?.occupation}`}
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
                            {`${singleAppointment?.data?.patient_info?.date_of_birth}`}
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
                            {`${singleAppointment?.data?.patient_info?.blood_group?.name}`}
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
                            {`${singleAppointment?.data?.patient_info?.age}`}
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
                            {`${singleAppointment?.data?.patient_info?.dob_number}`}
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
                            {/* {`${singleAppointment?.data?.patient_info?.bsn_number}`} */}
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
                            {/* {`${singleAppointment?.data?.patient_info?.bsn_number}`} */}
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
                            {`${singleAppointment?.data?.patient_info?.bsn_number}`}
                          </td>
                        </tr>
                        <tr>
                          <p className="whitespace-normal px-3 py-2.5 font-bold text-black dark:text-white">
                            {`${singleAppointment?.data?.patient_info?.medical_history}`}
                          </p>
                        </tr>
                      </tbody>
                    </table>
                    {/* start */}
                  </>
                </div>
                {/* column 2 */}
                <div className="col-md-6  border-l-2">
                  {/* Patient Id  */}
                  <div className="relative mt-2.5">
                    {patientList?.data ? (
                      <div className="relative my-3">
                        <select
                          id="patient_id"
                          {...register("patient_id")}
                          defaultValue={
                            singleAppointment?.data?.patient_info?.id
                          }
                          className="block px-2.5 pb-2 pt-2.5 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
                        >
                          {/* {`${singleTicket?.data?.therapist_info?.id} ${singleTicket?.data?.therapist_info?.first_name} ${singleTicket?.data?.therapist_info?.last_name}`} */}
                          {/* <option
                            selected Value={singleTicket?.data?.therapist_info?.id}
                          >{`${singleTicket?.data?.therapist_info?.id} ${singleTicket?.data?.therapist_info?.first_name} ${singleTicket?.data?.therapist_info?.last_name}`}</option> */}
                          {patientList.data?.map((item) => (
                            <option key={item.id} value={`${item?.id}`}>
                              {`${item?.id} ${item?.first_name} ${item?.last_name}`}
                            </option>
                          ))}
                        </select>
                        <label
                          htmlFor="patient_id"
                          className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-teal-500 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                        >
                          Patient Id
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
                  {/*   therapist id  */}
                  <div className="relative">
                    {therapistList?.data ? (
                      <div className="relative ">
                        <select
                          id="therapist_id"
                          {...register("therapist_id")}
                          defaultValue={
                            singleAppointment?.data?.therapist_info?.id
                          }
                          className="block px-2.5 pb-2 pt-2.5 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
                        >
                          {therapistList.data?.map((item) => (
                            <option key={item.id} value={`${item?.id}`}>
                              {`${item?.first_name} ${item?.last_name}`}
                            </option>
                          ))}
                        </select>
                        <label
                          htmlFor="therapist_id"
                          className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-teal-500 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                        >
                          Select therapist
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

                  {/* therapist schedule */}
                  <div className="grid gap-4 grid-cols-2 mt-2.5">
                    {/* therapist schedule */}
                    <div className="relative">
                      {therapistSchedule?.data ? (
                        <div className="relative  ">
                          <select
                            id="therapist_schedule_id"
                            {...register("therapist_schedule_id")}
                            defaultValue={
                              singleAppointment?.data?.therapist_schedule?.id
                            }
                            className="block px-2.5 pb-2 pt-2.5 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
                          >
                            {therapistSchedule.data?.map((item) => (
                              <option key={item.id} value={`${item?.id}`}>
                                {`${item?.schedule_day}`}
                              </option>
                            ))}
                          </select>
                          <label
                            htmlFor="therapist_schedule_id"
                            className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-teal-500 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                          >
                            Therapist schedule
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
                    {/* appointment_number */}
                    <div className="col-start-2  relative   ">
                      <input
                        type="text"
                        id="number"
                        required
                        {...register("number")}
                        defaultValue={singleAppointment?.data?.number}
                        className="block px-2.5 pb-2 pt-2.5 py-2.5 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
                        placeholder="  "
                        //  value={singlepatient.last_name}
                      />
                      <label
                        htmlFor="number"
                        className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-teal-500 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                      >
                        Appointment Number
                      </label>
                    </div>
                  </div>
                  {/* Appointment history */}
                  <div className="relative  mt-2.5">
                    <textarea
                      className="h-28 block px-2.5 pb-2 pt-2.5 py-2.5 w-full rows-4 text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
                      id="appointment_history"
                      defaultValue={singleAppointment?.data?.history}
                      {...register("appointment_history")}
                      type="text"
                      placeholder="  "
                    />
                    <label
                      htmlFor="textarea"
                      className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-teal-500 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                    >
                      Appointment history
                    </label>
                  </div>
                  {/*appointment date and time */}
                  <div className="grid gap-4 grid-cols-2 mt-2.5">
                    {/* date  */}
                    <div className="relative   ">
                      <input
                        type="date"
                        id="appointment_date"
                        defaultValue={singleAppointment?.data?.date}
                        {...register("appointment_date")}
                        className="block px-2.5 pb-2 pt-2.5 py-2.5 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
                        placeholder="  "
                      />
                      <label
                        htmlFor="appointment_date"
                        className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-teal-500 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                      >
                        Appointment date
                      </label>
                    </div>
                    {/* appointment_time  */}
                    <div className="relative   ">
                      <input
                        type="text"
                        id="time"
                        defaultValue={singleAppointment?.data?.time}
                        {...register("time")}
                        required
                        className="block px-2.5 pb-2 pt-2.5 py-2.5 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
                        placeholder="  "
                        //value={singlepatient.last_name}
                      />
                      <label
                        htmlFor="time"
                        className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-teal-500 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                      >
                        Appointment time
                      </label>
                    </div>
                  </div>
                  {/*appointment fee and appointment language */}
                  <div className="grid grid-cols-2  gap-4 mt-2.5">
                    {/* appointment_fee  */}
                    <div className="col-span-1 relative   ">
                      <input
                        type="text"
                        id="fee"
                        defaultValue={singleAppointment?.data?.fee}
                        {...register("fee")}
                        required
                        className="block px-2.5 pb-2 pt-2.5 py-2.5 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
                        placeholder="  "
                      />
                      <label
                        htmlFor="fee"
                        className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-teal-500 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                      >
                        Appointment fee
                      </label>
                    </div>
                    {/* appointment_language  */}
                    {/* Language Select  */}
                    <div className="col-span-1  relative">
                      <select
                        id="language"
                        {...register("language")}
                        defaultValue={singleAppointment?.data?.language}
                        required
                        className="block px-2.5 pb-2 pt-2.5 py-2.5 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
                      >
                        {/* <option selected>Select Language</option> */}
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
                  </div>
                  {/*therapist_comment */}
                  <div className="  relative  mt-2.5">
                    <textarea
                      className="h-28 block px-2.5 pb-2 pt-2.5 py-2.5 w-full rows-4 text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
                      id="therapist_comment"
                      {...register("therapist_comment")}
                      defaultValue={singleAppointment?.data?.therapist_comment}
                      type="text"
                      placeholder="  "
                    />
                    <label
                      htmlFor="textarea"
                      className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-teal-500 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                    >
                      Therapist comment
                    </label>
                  </div>
                  {/* remarks and status */}
                  <div className="grid   grid-cols-2  gap-4 mt-2.5">
                    {/* remarks */}
                    <div className="col-start-1  relative   ">
                      <input
                        type="text"
                        id="remarks"
                        {...register("remarks")}
                        className="block px-2.5 pb-2 pt-2.5 py-2.5 w-full rows-4 text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
                        placeholder="  "
                        defaultValue={singleAppointment?.data?.remarks}
                        required
                      />
                      <label
                        htmlFor="remarks"
                        className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-teal-500 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                      >
                        Remarks
                      </label>
                    </div>

                    {/* status */}
                    <div className="col-start-2  relative">
                      <select
                        id="status"
                        className="form-select appearance-none
block
w-full
px-3
py-1.5
text-base
font-normal
text-gray-700
bg-white bg-clip-padding bg-no-repeat
border border-solid border-gray-300
rounded
transition
ease-in-out
m-0
focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        aria-label="Default select example"
                        {...register("status")}
                        defaultValue={singleAppointment?.data?.status}
                        required
                      >
                        {/* <option selected>status</option> */}
                        <option value="1" selected>
                          Active
                        </option>
                        <option value="2">Inactive</option>
                        <option value="3">Pending</option>
                        <option value="4">Cancelled</option>
                        <option value="5">Deleted</option>
                      </select>
                      <label
                        htmlFor="remarks"
                        className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-teal-500 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                      >
                        Status
                      </label>
                    </div>
                  </div>
                  {/* appointment_type */}
                  <div className="  relative  my-3 ">
                    <select
                      className="block px-2.5 pb-2 pt-2.5 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
                      id="type"
                      {...register("type")}
                      defaultValue={singleAppointment?.data?.type}
                      // required
                    >
                      {/* <option selected>Select appointment type</option> */}
                      <option value="Online">Online</option>
                      <option value="Physical">Physical</option>
                    </select>
                    <label
                      htmlFor="type"
                      className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-teal-500 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                    >
                      Appointment type
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

export default Edit;
