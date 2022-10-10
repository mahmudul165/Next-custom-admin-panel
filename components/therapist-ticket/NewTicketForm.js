import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Loading from "../common/Loading";
import {
  usePatientListQuery,
  //usePatientQuery,
  useTherapitListQuery,
  useAllTicketDepartmentQuery,
} from "../../hook/useApi";
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
import ResponsiveDialog from "../common/PostModal";
import { ToastContainer } from "react-toastify";
function NewTicketForm() {
  const { postData, status, setStatus } = useAuth();
  const [searchInput, setSearchInput] = useState("");
  console.log("searchInput", searchInput);
  const [startDate, setStartDate] = useState(new Date());
  const { register, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });
  const { data: patientList } = usePatientListQuery();
  const { data: therapistList } = useTherapitListQuery();
  const { data: ticketDepartment } = useAllTicketDepartmentQuery();
  const router = useRouter();
  // const { data: singlePatient } = usePatientQuery(searchInput);
  //const { data, error, isError } = useTherapitListQuery();
  //console.log("All ticket data  from  ", data);

  //console.log("patient list from ticket from", patientList);
  //console.log(" single patient list from ticket from", singlePatient);
  //console.log("therapy list  from ticket from", therapistList);
  //console.log("ticket department list  from ticket from", ticketDepartment);
  // search

  // search input catch
  // const handleSearchChange = (e) => {
  //   setSearchInput(e.target.value);
  // };

  // debounce search input
  const debounce = (fn, delay) => {
    let timer;
    return function(...args) {
      clearTimeout(timer);
      timer = setTimeout(() => fn(...args), delay);
    };
  };

  const [singlepatient, setPatient] = useState("");
  useEffect(() => {
    const url = `https://misiapi.lamptechs.com/api/v1/patient/show?id=${searchInput}`;
    console.log("url", url);
    const fetchData = async () => {
      try {
        const response = await fetch(url, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        const json = await response.json();
        // console.log(json);
        setPatient(json?.data);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchData();
  }, [searchInput]);
  console.log("singlepatient data", singlepatient);

  return (
    <>
      {/* create patient form */}
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
      {/* {status == true && <ResponsiveDialog title="save" />} */}
      {/* <OperationModal modal={modal} setModal={setModal}>
                      {<TicketForm className="m-auto" />}
                    </OperationModal> */}
      <form
        className="w-10/12 m-auto   first-line: "
        onSubmit={handleSubmit(
          (d) =>
            postData("https://misiapi.lamptechs.com/api/v1/ticket/store", d)

          // console.log("ticket store data", d)
        )}
      >
        <div className="container   mx-4  px-12  rounded bg-white mt-3 mb-5 ">
          <div className=" container  mx-4  px-12  rounded bg-white mt-3 mb-5 ">
            <div className="grid    px-8 grid-cols-2 justify-center  gap-4 mt-2.5 pl-3.5">
              <div className="flex justify-center items-center">
                <h2
                  className="col-start-1  text-center text-3xl   font-extrabold    "
                  style={{ color: "#01a9ac" }}
                >
                  Create new Ticket
                  {/* id: {singleTicket.data?.id} */}
                </h2>
              </div>
              {/* button download and save */}
              <div className="col-start-2 my-3 px-3 md:flex md:items-center justify-center ">
                <div className="inline-flex rounded-md shadow-sm" role="group">
                  <button
                    onClick={() => router.push(`/all-ticket`)}
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
                </div>
              </div>
            </div>
            {/* end button */}
            <div className="row container    border-t-2">
              <div className=" col-md-6    ">
                {/* Patient Id */}
                <div className="grid gap-4  mt-2.5">
                  <div className="relative">
                    {patientList?.data ? (
                      <Stack>
                        <Autocomplete
                          onChange={(event, value) => {
                            // value.split('-', 1).[0]
                            debounce(setSearchInput(value), 500);
                          }}
                          disablePortal
                          id="combo-box-demo"
                          //  options={patientList?.data.map((patient) => patient.id)}
                          options={patientList?.data.map(
                            (patient) =>
                              `${patient.id}-${patient.first_name} ${patient.last_name} - ${patient.phone}`
                          )}
                          size="small"
                          renderInput={(params) => (
                            <TextField
                              id="patient_id"
                              {...register("patient_id")}
                              required
                              {...params}
                              label="Search patient"
                            />
                          )}
                        />
                      </Stack>
                    ) : (
                      <>
                        <Stack spacing={1}>
                          <Skeleton animation="wave" height={40} />
                        </Stack>
                      </>
                    )}
                  </div>
                </div>
                {singlepatient ? (
                  <>
                    <div className="d-flex flex-column align-items-center text-center px-3  ">
                      <img
                        className="rounded-circle mt-3"
                        width="180px"
                        //src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
                        //src={`${singlepatient?.image_url}`}
                        src={`${
                          singlepatient?.image_url !==
                          "https://misiapi.lamptechs.com/"
                            ? singlepatient?.image_url
                            : "https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
                        }`}
                      />
                      <span className="font-weight-bold text-xl">
                        {`${singlepatient?.first_name} ${singlepatient?.last_name}`}
                      </span>
                      <span className="text-lg mb-2 text-teal-500 font-medium">
                        {`${singlepatient?.email}`}
                      </span>
                      <span> </span>
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
                            Patient source:
                          </th>
                          <td className="px-3 py-2.5">
                            {`${singlepatient?.source}`}
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
                            {`${singlepatient?.phone}`}
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
                            {`${singlepatient?.alternet_phone}`}
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
                            {`${singlepatient?.country?.name}`}
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
                            {`${singlepatient.country?.name}`}
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
                            {`${singlepatient.state?.name}`}
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
                            {`${singlepatient?.area}`}
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
                            {`${singlepatient?.marital_status}`}
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
                            {`${singlepatient?.occupation}`}
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
                            {`${singlepatient?.date_of_birth}`}
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
                            {`${singlepatient.blood_group?.name}`}
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
                            {`${singlepatient?.age}`}
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
                            {`${singlepatient?.dob_number}`}
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
                            {/* {`${singlepatient?.bsn_number}`} */}
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
                            {/* {`${singlepatient?.bsn_number}`} */}
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
                            {`${singlepatient?.bsn_number}`}
                          </td>
                        </tr>
                        <tr>
                          <p className="whitespace-normal px-3 py-2.5 font-bold text-black dark:text-white">
                            {`${singlepatient?.medical_history}`}
                          </p>
                        </tr>
                      </tbody>
                    </table>
                    {/* start */}
                  </>
                ) : (
                  <></>
                )}
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
                    {/* Assign To therapist */}
                    <div className="relative my-3  ">
                      {therapistList?.data ? (
                        <div className="relative my-3  ">
                          <select
                            id="therapist_id"
                            {...register("therapist_id")}
                            className="block px-2.5 pb-2 pt-2.5 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
                          >
                            <option selected>Assign to therapist</option>
                            {therapistList.data?.map((item) => (
                              <option key={item.id} value={`${item?.id}`}>
                                {`${item?.id} ${item?.first_name} ${item?.last_name}`}
                              </option>
                            ))}
                          </select>
                          <label
                            htmlFor="therapist_id"
                            className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-teal-500 peer-focus:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-25 peer-focus:-translate-y-4 left-1"
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
                    <div className="relative my-3  ">
                      {ticketDepartment?.data ? (
                        <div className="relative my-3  ">
                          <select
                            id="ticket_department_id"
                            {...register("ticket_department_id")}
                            className="block px-2.5 pb-2 pt-2.5 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
                          >
                            <option selected>Select department</option>
                            {ticketDepartment.data?.map((item) => (
                              <option key={item.id} value={`${item?.id}`}>
                                {`${item?.name}`}
                              </option>
                            ))}
                          </select>
                          <label
                            htmlFor="ticket_department_id"
                            className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-teal-500 peer-focus:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-25 peer-focus:-translate-y-4 left-1"
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

                    {/* start new field */}
                    {/*  Mono/Multi ZD*/}
                    <div className="col-start-1 relative my-3  ">
                      <input
                        type="text"
                        id="mono_multi_zd"
                        {...register("mono_multi_zd")}
                        className="block px-2.5 pb-2 pt-2.5 py-2.5 w-full rows-4 text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
                        placeholder="  "
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
                        placeholder="  "
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
                        {...register("intakes_therapist")}
                        className="block px-2.5 pb-2 pt-2.5 py-2.5 w-full rows-4 text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
                        placeholder="  "
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
                        placeholder="  "
                      />
                      <label
                        htmlFor="tresonit_nummer"
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
                        placeholder="  "
                      />

                      <label
                        htmlFor="datum_intake"
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
                        placeholder="  "
                      />
                      <label
                        htmlFor="datum_intake_2"
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
                        placeholder="  "
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
                        placeholder="  "
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
                        placeholder="  "
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
                        placeholder="  "
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
                        placeholder="  "
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
                        placeholder="  "
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
                        placeholder="  "
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
                        placeholder="  "
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
                        {...register("closure")}
                        className="block px-2.5 pb-2 pt-2.5 py-2.5 w-full rows-4 text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
                        placeholder="  "
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
                        placeholder="  "
                      />
                      <label
                        htmlFor="aanm_intake_1"
                        className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-teal-500 peer-focus:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-25 peer-focus:-translate-y-4 left-1"
                      >
                        Aanm-intake 1 (dagentussen)
                      </label>
                    </div>
                    {/* end new field */}

                    {/*call strike  */}
                    <div className="col-start-1 relative my-3">
                      <select
                        id="strike"
                        name="strike"
                        {...register("strike")}
                        className="block px-2.5 pb-2 pt-2.5 py-2.5 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
                      >
                        <option selected>Select Call Strike </option>
                        <option value="Call Strike 1">Call Strike 1</option>
                        <option value="Call Strike 2">Call Strike 2</option>
                        <option value="Call Strike 3">Call Strike 3</option>
                      </select>
                      <label
                        htmlFor="strike"
                        className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-teal-500 peer-focus:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-25 peer-focus:-translate-y-4 left-1"
                      >
                        Call Strike
                      </label>
                    </div>
                    {/* remarks */}
                    <div className="col-start-2  relative my-3  ">
                      <input
                        type="text"
                        id="remarks"
                        {...register("remarks")}
                        className="block px-2.5 pb-2 pt-2.5 py-2.5 w-full rows-4 text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
                        placeholder="  "
                        required
                      />
                      <label
                        htmlFor="remarks"
                        className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-teal-500 peer-focus:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-25 peer-focus:-translate-y-4 left-1"
                      >
                        Remarks
                      </label>
                    </div>

                    {/* strike History */}
                    <div className="relative my-3  mt-2.5">
                      <textarea
                        className="h-28 block px-2.5 pb-2 pt-2.5 py-2.5 w-full rows-4 text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
                        id="strike_history"
                        {...register("strike_history")}
                        type="text"
                        placeholder="  "
                      />
                      <label
                        htmlFor="strike_history"
                        className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-teal-500 peer-focus:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-25 peer-focus:-translate-y-4 left-1"
                      >
                        Strike history
                      </label>
                    </div>
                    {/* ticket History */}
                    <div className="  relative my-3  mt-2.5">
                      <textarea
                        className="h-28 block px-2.5 pb-2 pt-2.5 py-2.5 w-full rows-4 text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
                        id="ticket_history"
                        {...register("ticket_history")}
                        type="text"
                        placeholder="  "
                      />
                      <label
                        htmlFor="ticket_history"
                        className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-teal-500 peer-focus:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-25 peer-focus:-translate-y-4 left-1"
                      >
                        Ticket history
                      </label>
                    </div>
                    {/* comment */}
                    <div className="  relative my-3  mt-2.5">
                      <textarea
                        className="h-28 block px-2.5 pb-2 pt-2.5 py-2.5 w-full rows-4 text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
                        id="comment"
                        {...register("comment")}
                        type="text"
                        placeholder="  "
                      />
                      <label
                        htmlFor="comment"
                        className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-teal-500 peer-focus:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-25 peer-focus:-translate-y-4 left-1"
                      >
                        Comment
                      </label>
                    </div>
                    {/* status treatment*/}
                    <div className="  relative my-3">
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
                        htmlFor="status"
                        className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-teal-500 peer-focus:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-25 peer-focus:-translate-y-4 left-1"
                      >
                        Status treatment
                      </label>
                    </div>
                    {/* Language Select  */}
                    <div className="relative my-3">
                      <select
                        id="language"
                        {...register("language")}
                        className="block px-2.5 pb-2 pt-2.5 py-2.5 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
                      >
                        <option selected>Select Language</option>
                        <option value="English">English</option>
                        <option value="Dutch">Dutch</option>
                      </select>
                      <label
                        htmlFor="language"
                        className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-teal-500 peer-focus:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-25 peer-focus:-translate-y-4 left-1"
                      >
                        Language treatment
                      </label>
                    </div>
                    <div className=" flex justify-end">
                      <button
                        className="decoration-4 text-xl shadow     hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                        type="submit"
                        style={{ backgroundColor: "#01a9ac" }}
                      >
                        Save
                      </button>
                    </div>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

export default NewTicketForm;
