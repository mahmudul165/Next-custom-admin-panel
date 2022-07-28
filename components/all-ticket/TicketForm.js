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
function TicketForm() {
  const { postData } = useAuth();
  const [searchInput, setSearchInput] = useState("");
  console.log("searchInput", searchInput);
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
  // search

  // search input catch
  // const handleSearchChange = (e) => {
  //   setSearchInput(e.target.value);
  // };

  // debounce search input
  const debounce = (fn, delay) => {
    let timer;
    return function (...args) {
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
  //console.log("singlepatient data", singlepatient);
  return (
    <>
      <form
        className="w-10/12 m-auto   first-line: "
        onSubmit={handleSubmit(
          (d) =>
            postData("https://misiapi.lamptechs.com/api/v1/ticket/store", d)
          //console.log("ticket store data", d)
        )}
      >
        <div className=" px-3">
          <div className=" card d-flex      justify-center ">
            <h2
              className="mt-3 text-center text-3xl font-extrabold  "
              style={{ color: "#01a9ac" }}
            >
              Create new ticket
            </h2>
            {/* first portion of the form */}
            <div className=" m-3 p-3 ">
              {/* Picture */}
              {/* <div className="relative  ">
            <input
              type="file"
              id="floating_outlined"
              className="block px-2.5 pb-2 pt-2.5 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
              placeholder="  "
              required
            />
            <label
              htmlFor="floating_outlined"
              className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-teal-500 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
            >
              Picture
            </label>
          </div> */}
              {/* profile patient */}
              {/* <div className="flex justify-center items-center w-full  ">
                <label
                  htmlFor="dropzone-file"
                  className="flex flex-col justify-center items-center w-full h-40 bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                >
                  <div className="flex flex-col justify-center items-center pt-5 pb-6">
                    <svg
                      className="mb-3 w-10 h-10 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round "
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      ></path>
                    </svg>
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-semibold">
                        Click to upload Picture
                      </span>{" "}
                      or drag and drop
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      SVG, PNG, JPG or GIF (MAX. 500x500px)
                    </p>
                  </div>
                  <input
                    id="dropzone-file"
                    type="file"
                    className="hidden"
                    {...register("dropzone-file")}
                  />
                </label>
              </div> */}
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
                            label="Search patient id"
                          />
                        )}
                      />
                      {/* 
<Autocomplete
 onChange={(event, value) => {
                          
                          debounce(
                            setSearchInput(
                              value 
                            ),
                            500
                          );
                        }}
      disablePortal
      id="combo-box-demo"
     options={patientList?.data.map((patient) => patient.id)}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField 
                            id="patient_id"
                            {...register("patient_id")}
                            required
                            {...params}
                            label="Search patient id"
                            InputProps={{
                              ...params.InputProps,
                              type: "search",
                            }}
                          />}
    /> */}
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
                  {/* patient source  and language  */}
                  <div className="grid  gap-4 mt-2.5">
                    {/* patient_source   */}
                    <div className="col-start-1 relative   ">
                      <input
                        type="text"
                        id="patient_source"
                        {...register("patient_source")}
                        className="block px-2.5 pb-2 pt-2.5 py-2.5 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
                        placeholder="  "
                        value={singlepatient?.source}
                      />
                      <label
                        htmlFor="patient_source"
                        className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-teal-500 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                      >
                        Patient source
                      </label>
                    </div>
                    {/* area  */}
                    <div className="col-start-2  relative   ">
                      <input
                        type="text"
                        id="area"
                        {...register("area")}
                        className="block px-2.5 pb-2 pt-2.5 py-2.5 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
                        placeholder="  "
                        value={singlepatient?.area}
                      />
                      <label
                        htmlFor="area"
                        className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-teal-500 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                      >
                        Area
                      </label>
                    </div>
                  </div>
                  {/* name */}
                  <div className="grid  gap-4 mt-2.5">
                    {/* first Name  */}
                    <div className="col-start-1 relative   ">
                      <input
                        type="text"
                        id="firstname"
                        {...register("firstname")}
                        className="block px-2.5 pb-2 pt-2.5 py-2.5 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
                        placeholder="  "
                        value={singlepatient.first_name}
                      />
                      <label
                        htmlFor="firstname"
                        className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-teal-500 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                      >
                        First Name
                      </label>
                    </div>
                    {/* last Name  */}
                    <div className="col-start-2  relative   ">
                      <input
                        type="text"
                        id="lastname"
                        {...register("lastname")}
                        className="block px-2.5 pb-2 pt-2.5 py-2.5 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
                        placeholder="  "
                        value={singlepatient.last_name}
                      />
                      <label
                        htmlFor="lastname"
                        className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-teal-500 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                      >
                        Last Name
                      </label>
                    </div>
                  </div>
                  {/* email  and phone  */}
                  <div className="grid  gap-4 mt-2.5">
                    {/* email   */}
                    <div className="col-start-1 relative   ">
                      <input
                        type="email"
                        id="email"
                        {...register("email")}
                        className="block px-2.5 pb-2 pt-2.5 py-2.5 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
                        placeholder="  "
                        value={singlepatient.email}
                      />
                      <label
                        htmlFor="email"
                        className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-teal-500 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                      >
                        Email
                      </label>
                    </div>
                    {/* phone  */}
                    <div className="col-start-2  relative   ">
                      <input
                        type="text"
                        id="phone"
                        {...register("phone")}
                        className="block px-2.5 pb-2 pt-2.5 py-2.5 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
                        placeholder="  "
                        value={singlepatient?.phone}
                      />
                      <label
                        htmlFor="phone"
                        className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-teal-500 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                      >
                        Phone number
                      </label>
                    </div>
                  </div>
                  {/* state  and nationality */}
                  <div className="grid  gap-4 mt-2.5">
                    {/* State/City */}
                    <div className="col-start-1 relative  ">
                      <input
                        type="text"
                        id="location"
                        {...register("location")}
                        className="block px-2.5 pb-2 pt-2.5 py-2.5 w-full rows-4 text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
                        placeholder="  "
                        //required
                        value={singlepatient?.city}
                      />
                      <label
                        htmlFor="location"
                        className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-teal-500 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                      >
                        State/City
                      </label>
                    </div>
                    {/* Nationality */}
                    <div className="col-start-2  relative  ">
                      <input
                        type="text"
                        id="country_id"
                        {...register("country_id")}
                        className="block px-2.5 pb-2 pt-2.5 py-2.5 w-full rows-4 text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
                        placeholder="   "
                        value={singlepatient?.country?.name}
                      />
                      <label
                        htmlFor="country_id"
                        className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-teal-500 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                      >
                        Nationality
                      </label>
                    </div>
                  </div>
                  {/* Residential Address */}
                  <div className="relative mt-2.5">
                    <textarea
                      className="block px-2.5 pb-2 pt-2.5 py-2.5 w-full rows-4 text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
                      id="address"
                      {...register("address")}
                      type="text"
                      placeholder="  "
                      value={singlepatient?.address}
                    />
                    <label
                      htmlFor="inline-full-name"
                      className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-teal-500 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                    >
                      Residential address
                    </label>
                  </div>
                  {/* Dob and BNS */}
                  <div className="grid  gap-4 mt-2.5">
                    {/* DOB Number */}
                    <div className="col-start-1 relative  ">
                      <input
                        type="text"
                        id="DOB_Number"
                        {...register("DOB_Number")}
                        className="block px-2.5 pb-2 pt-2.5 py-2.5 w-full rows-4 text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
                        placeholder="  "
                        value={singlepatient?.dob_number}
                      />
                      <label
                        htmlFor="DOB_Number"
                        className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-teal-500 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                      >
                        DOB number
                      </label>
                    </div>
                    {/* BSN Number */}
                    <div className="col-start-2 relative  ">
                      <input
                        type="text"
                        id="BSN_Number"
                        {...register("BSN_Number")}
                        className="block px-2.5 pb-2 pt-2.5 py-2.5 w-full rows-4 text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
                        placeholder="  "
                        value={singlepatient?.bsn_number}
                      />
                      <label
                        htmlFor="BSN_Number"
                        className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-teal-500 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                      >
                        BSN number
                      </label>
                    </div>
                  </div>
                  {/* INSURANCE AND DATE OF BIRTH */}
                  <div className="grid  gap-4 mt-2.5">
                    {/* INSURANCE*/}
                    <div className="col-start-1 relative  ">
                      <input
                        type="text"
                        id="insurance"
                        {...register("insurance")}
                        className="block px-2.5 pb-2 pt-2.5 py-2.5 w-full rows-4 text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
                        placeholder="  "
                        value={singlepatient?.insurance_number}
                      />
                      <label
                        htmlFor="insurance"
                        className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-teal-500 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                      >
                        Insurance number
                      </label>
                    </div>
                    {/* DATE OF birth */}
                    <div className="col-start-2 relative  ">
                      <input
                        id="date-of-birth"
                        {...register("date-of-birth")}
                        className="block px-2.5 pb-2 pt-2.5 py-2.5 w-full rows-4 text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
                        placeholder="  "
                        value={singlepatient?.date_of_birth}
                      />
                      <label
                        htmlFor="date-of-birth"
                        className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-teal-500 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                      >
                        Date of birth
                      </label>
                    </div>
                  </div>
                  {/* Marital status and occupation */}
                  <div className="grid   grid-cols-2  gap-4 mt-2.5">
                    {/* Marital status*/}
                    <div className=" relative   ">
                      <input
                        type="text"
                        id="marital_status"
                        {...register("marital_status")}
                        className="block px-2.5 pb-2 pt-2.5 py-2.5 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
                        placeholder="  "
                        value={singlepatient?.marital_status}
                      />
                      <label
                        htmlFor="marital_status"
                        className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-teal-500 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                      >
                        Marital status
                      </label>
                    </div>
                    {/* occupation */}
                    <div className="  relative  ">
                      <input
                        type="text"
                        id="Occupation"
                        {...register("Occupation")}
                        className="block px-2.5 pb-2 pt-2.5 py-2.5 w-full rows-4 text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
                        placeholder="  "
                        value={singlepatient?.occupation}
                      />
                      <label
                        htmlFor="Occupation"
                        className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-teal-500 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                      >
                        Occupation
                      </label>
                    </div>
                  </div>
                  {/* state and blood */}
                  <div className="grid gap-4 grid-cols-2 mt-2.5">
                    {/* state*/}
                    <div className=" relative   ">
                      <input
                        type="text"
                        id="state"
                        {...register("state")}
                        className="block px-2.5 pb-2 pt-2.5 py-2.5 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
                        placeholder="  "
                        value={singlepatient?.state?.name}
                      />
                      <label
                        htmlFor="state"
                        className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-teal-500 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                      >
                        State
                      </label>
                    </div>
                    {/* blood  */}
                    <div className=" relative   ">
                      <input
                        type="text"
                        id="blood_group"
                        {...register("blood_group")}
                        className="block px-2.5 pb-2 pt-2.5 py-2.5 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
                        placeholder="  "
                        value={singlepatient?.blood_group?.name}
                      />
                      <label
                        htmlFor="blood_group"
                        className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-teal-500 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                      >
                        Blood group
                      </label>
                    </div>
                  </div>
                  {/* age AND emergency_contact */}
                  <div className="grid  gap-4 mt-2.5">
                    {/* age*/}
                    <div className="col-start-1 relative  ">
                      <input
                        type="text"
                        id="age"
                        {...register("age")}
                        className="block px-2.5 pb-2 pt-2.5 py-2.5 w-full rows-4 text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
                        placeholder="  "
                        value={singlepatient?.age}
                      />
                      <label
                        htmlFor="age"
                        className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-teal-500 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                      >
                        Age
                      </label>
                    </div>
                    {/* emergency_contact */}
                    <div className="col-start-2 relative  ">
                      <input
                        id="emergency_contact"
                        {...register("emergency_contact")}
                        className="block px-2.5 pb-2 pt-2.5 py-2.5 w-full rows-4 text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
                        placeholder="  "
                        value={singlepatient?.emergency_contact}
                      />
                      <label
                        htmlFor="emergency_contact"
                        className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-teal-500 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                      >
                        Emergency contact
                      </label>
                    </div>
                  </div>
                  {/* Medical History */}
                  <div className="relative  mt-2.5">
                    <textarea
                      className="block px-2.5 pb-2 pt-2.5 py-2.5 w-full rows-4 text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
                      id="medical_history"
                      {...register("medical_history")}
                      type="text"
                      placeholder="  "
                      value={singlepatient?.medical_history}
                    />
                    <label
                      htmlFor="textarea"
                      className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-teal-500 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                    >
                      Medical history
                    </label>
                  </div>
                </>
              ) : (
                <></>
              )}
              {/* select file  and attach file  */}
              {/* <div className="grid   grid-cols-2  gap-4 mt-2.5">                
                <div className="  relative   ">
                  <select
                    id="file-type"
                    {...register("file-type")}
                    className="block px-2.5 pb-2 pt-2.5 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
                  >
                    <option selected>Select file type</option>
                    <option value="male">Nid</option>
                    <option value="female">Passport</option>
                    <option value="others">Others</option>
                  </select>
                  <label
                    htmlFor="file-type"
                    className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-teal-500 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                  >
                    File Type
                  </label>
                </div>
              
                <div className=" relative   ">
                  <input
                    className="block px-2.5 pb-2 pt-2.5 py-2.5 w-full rows-4 text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
                    placeholder="  "
                    required
                    type="file"
                    id="formFileMultiple"
                    {...register("formFileMultiple")}
                    multiple
                  />

                  <label
                    htmlFor="formFileMultiple"
                    className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-teal-500 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                  >
                    Attach file
                  </label>
                </div>
              </div> */}
              <div className="grid gap-4 grid-cols-2 my-2.5">
                {/* Assign To therapist */}
                <div className="relative">
                  {therapistList?.data ? (
                    <div className="relative  ">
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
                <div className="relative">
                  {ticketDepartment?.data ? (
                    <div className="relative  ">
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
              </div>
              {/* start new field */}
              {/*  Mono/Multi ZD ANDMono/Multi screening */}
              <div className="grid  gap-4 mt-2.5">
                {/*  Mono/Multi ZD*/}
                <div className="col-start-1 relative  ">
                  <input
                    type="text"
                    id="mono-zd"
                    // {...register("mono-zde")}
                    className="block px-2.5 pb-2 pt-2.5 py-2.5 w-full rows-4 text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
                    placeholder="  "
                  />
                  <label
                    htmlFor="mono-zd"
                    className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-teal-500 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                  >
                    Mono/Multi ZD
                  </label>
                </div>
                {/*  Mono/Multi screening */}
                <div className="col-start-2 relative  ">
                  <input
                    id="mono-screening"
                    // {...register("mono-screening")}
                    className="block px-2.5 pb-2 pt-2.5 py-2.5 w-full rows-4 text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
                    placeholder="  "
                  />
                  <label
                    htmlFor="mono-screening"
                    className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-teal-500 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                  >
                    Mono/Multi screening
                  </label>
                </div>
              </div>
              {/*  Intakes/therapist AND tresonit nummer */}
              <div className="grid  gap-4 mt-2.5">
                {/* Intakes/therapist*/}
                <div className="col-start-1 relative  ">
                  <input
                    type="text"
                    id="intakes"
                    // {...register("intakes")}
                    className="block px-2.5 pb-2 pt-2.5 py-2.5 w-full rows-4 text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
                    placeholder="  "
                  />
                  <label
                    htmlFor="intakes"
                    className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-teal-500 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                  >
                    Intakes/therapist
                  </label>
                </div>
                {/*  Tresonit nummer  */}
                <div className="col-start-2 relative  ">
                  <input
                    id="tresonit-nummer"
                    // {...register("tresonit-nummer")}
                    className="block px-2.5 pb-2 pt-2.5 py-2.5 w-full rows-4 text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
                    placeholder="  "
                  />
                  <label
                    htmlFor="tresonit-nummer"
                    className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-teal-500 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                  >
                    Tresonit nummer
                  </label>
                </div>
              </div>
              {/*  Datum intake AND Datum intake 2 */}
              <div className="grid  gap-4 mt-2.5">
                {/* Datum intake*/}
                <div className="col-start-1 relative  ">
                  <input
                    type="text"
                    id="datum-intake"
                    // {...register("datum-intake")}
                    className="block px-2.5 pb-2 pt-2.5 py-2.5 w-full rows-4 text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
                    placeholder="  "
                  />
                  <label
                    htmlFor="datum-intake"
                    className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-teal-500 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                  >
                    Datum intake
                  </label>
                </div>
                {/*  Datum intake 2  */}
                <div className="col-start-2 relative  ">
                  <input
                    id="datum-intake-2"
                    // {...register("datum-intake-2")}
                    className="block px-2.5 pb-2 pt-2.5 py-2.5 w-full rows-4 text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
                    placeholder="  "
                  />
                  <label
                    htmlFor="datum-intake-2"
                    className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-teal-500 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                  >
                    Datum intake 2
                  </label>
                </div>
              </div>
              {/*  ND account AND AvC/AlfmVm/SBG */}
              <div className="grid  gap-4 mt-2.5">
                {/* ND account*/}
                <div className="col-start-1 relative  ">
                  <input
                    type="text"
                    id="nd-account"
                    // {...register("nd-account")}
                    className="block px-2.5 pb-2 pt-2.5 py-2.5 w-full rows-4 text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
                    placeholder="  "
                  />
                  <label
                    htmlFor="nd-account"
                    className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-teal-500 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                  >
                    ND account
                  </label>
                </div>
                {/*  AvC/AlfmVm/SBG  */}
                <div className="col-start-2 relative  ">
                  <input
                    id="AvC/AlfmVm/SBG"
                    // {...register("AvC/AlfmVm/SBG")}
                    className="block px-2.5 pb-2 pt-2.5 py-2.5 w-full rows-4 text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
                    placeholder="  "
                  />
                  <label
                    htmlFor="AvC/AlfmVm/SBG"
                    className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-teal-500 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                  >
                    AvC/AlfmVm/SBG
                  </label>
                </div>
              </div>
              {/*  HoNOS+ AND Berha intake */}
              <div className="grid  gap-4 mt-2.5">
                {/* HoNOS+*/}
                <div className="col-start-1 relative  ">
                  <input
                    type="text"
                    id="HoNOS+"
                    // {...register("HoNOS+")}
                    className="block px-2.5 pb-2 pt-2.5 py-2.5 w-full rows-4 text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
                    placeholder="  "
                  />
                  <label
                    htmlFor="HoNOS+"
                    className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-teal-500 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                  >
                    HoNOS+
                  </label>
                </div>
                {/*  Berha intake  */}
                <div className="col-start-2 relative  ">
                  <input
                    id="Berha intake"
                    // {...register("Berha intake")}
                    className="block px-2.5 pb-2 pt-2.5 py-2.5 w-full rows-4 text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
                    placeholder="  "
                  />
                  <label
                    htmlFor="Berha intake"
                    className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-teal-500 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                  >
                    Berha intake
                  </label>
                </div>
              </div>
              {/*  ROM start AND ROM eind */}
              <div className="grid  gap-4 mt-2.5">
                {/*  ROM start*/}
                <div className="col-start-1 relative  ">
                  <input
                    type="date"
                    id="ROM start"
                    // {...register("ROM start")}
                    className="block px-2.5 pb-2 pt-2.5 py-2.5 w-full rows-4 text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
                    placeholder="  "
                  />
                  <label
                    htmlFor="ROM start"
                    className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-teal-500 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                  >
                    ROM start
                  </label>
                </div>
                {/*  ROM eind */}
                <div className="col-start-2 relative  ">
                  <input
                    type="date"
                    id="ROM eind"
                    // {...register("ROM eind")}
                    className="block px-2.5 pb-2 pt-2.5 py-2.5 w-full rows-4 text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
                    placeholder="  "
                  />
                  <label
                    htmlFor="ROM eind"
                    className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-teal-500 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                  >
                    ROM eind
                  </label>
                </div>
              </div>
              {/*  Berha eind AND VTCB date */}
              <div className="grid  gap-4 mt-2.5">
                {/* Berha eind*/}
                <div className="col-start-1 relative  ">
                  <input
                    type="date"
                    id="Berha eind"
                    // {...register("Berha eind")}
                    className="block px-2.5 pb-2 pt-2.5 py-2.5 w-full rows-4 text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
                    placeholder="  "
                  />
                  <label
                    htmlFor="Berha eind"
                    className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-teal-500 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                  >
                    Berha eind
                  </label>
                </div>
                {/*  VTCB date */}
                <div className="col-start-2 relative  ">
                  <input
                    type="date"
                    id="VTCB date"
                    // {...register("VTCB date")}
                    className="block px-2.5 pb-2 pt-2.5 py-2.5 w-full rows-4 text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
                    placeholder="  "
                  />
                  <label
                    htmlFor="VTCB date"
                    className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-teal-500 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                  >
                    VTCB date
                  </label>
                </div>
              </div>
              {/*  Closure AND Aanm-intake 1 (dagentussen) */}
              <div className="grid grid-cols-2  gap-4 mt-2.5">
                {/* Closure*/}
                <div className="col-start-1 relative  ">
                  <input
                    type="date"
                    id="Closure"
                    // {...register("Closure")}
                    className="block px-2.5 pb-2 pt-2.5 py-2.5 w-full rows-4 text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
                    placeholder="  "
                  />
                  <label
                    htmlFor="Closure"
                    className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-teal-500 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                  >
                    Closure
                  </label>
                </div>
                {/* Aanm-intake 1 (dagentussen) */}
                <div className="col-start-2 relative  ">
                  <input
                    //type="date"
                    id="Aanm-intake 1 (dagentussen)"
                    // {...register("Aanm-intake 1 (dagentussen)")}
                    className="block px-2.5 pb-2 pt-2.5 py-2.5 w-full rows-4 text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
                    placeholder="  "
                  />
                  <label
                    htmlFor="Aanm-intake 1 (dagentussen)"
                    className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-teal-500 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                  >
                    Aanm-intake 1 (dagentussen)
                  </label>
                </div>
              </div>
              {/* end new field  */}
              <div className="grid gap-4 grid-cols-2 mt-2.5">
                {/*call strike  */}
                <div className="col-start-1 relative">
                  <select
                    id="strike"
                    {...register("strike")}
                    className="block px-2.5 pb-2 pt-2.5 py-2.5 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
                  >
                    <option selected>Select Call Strike </option>
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
                {/* remarks */}
                <div className="col-start-2  relative  ">
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
                    className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-teal-500 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                  >
                    Remarks
                  </label>
                </div>
              </div>
              {/* strike History */}
              <div className="relative  mt-2.5">
                <textarea
                  className="block px-2.5 pb-2 pt-2.5 py-2.5 w-full rows-4 text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
                  id="strike_history"
                  {...register("strike_history")}
                  type="text"
                  placeholder="  "
                />
                <label
                  htmlFor="textarea"
                  className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-teal-500 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                >
                  Strike history
                </label>
              </div>
              {/* ticket History */}
              <div className="relative  mt-2.5">
                <textarea
                  className="block px-2.5 pb-2 pt-2.5 py-2.5 w-full rows-4 text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
                  id="strike_history"
                  {...register("ticket_history")}
                  type="text"
                  placeholder="  "
                />
                <label
                  htmlFor="textarea"
                  className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-teal-500 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                >
                  Ticket history
                </label>
              </div>
              {/*  language and status */}
              <div className="grid grid-cols-2 gap-4 my-2.5">
                {/* status treatment*/}
                <div className="  relative">
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
                    className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-teal-500 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                  >
                    Status treatment
                  </label>
                </div>
                {/* Language Select  */}
                <div className="relative">
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
                    className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-teal-500 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                  >
                    Language treatment
                  </label>
                </div>
              </div>
              <div className=" flex justify-end">
                <button
                  className="decoration-4 text-xl shadow mt-6   hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                  type="submit"
                  style={{ backgroundColor: "#01a9ac" }}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

export default TicketForm;

// useDebounce onchange react
// patient form separation
// search api 'singlePatient'
// 'singlePatient?.data' ? then show data a from :another blank form
