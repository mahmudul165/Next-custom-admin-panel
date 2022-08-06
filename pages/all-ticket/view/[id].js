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
      setRemoteData(json);
    };
    fetchData();
  }, [pathId, singleTicket]);

  // const fetchSingleTicket = async () => {
  //   const response = await fetch(
  //     `https://misiapi.lamptechs.com/api/v1/ticket/show?id=${pathId}`,
  //     {
  //       headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  //     }
  //   );
  //   return await response.json();
  // };
  // const useSingleTicketQuery = () =>
  //   useQuery(["fetchSingleTicket"], fetchSingleTicket, {
  //     refetchOnMount: true,
  //     refetchOnWindowFocus: true,
  //     refetchInterval: 1000,
  //   });
  // const { data: singleTicket } = useSingleTicketQuery();

  return (
    <>
      {singleTicket?.data?.patient_info ? (
        <form
          className="w-10/12 m-auto p-10  first-line: "
          // onSubmit={handleSubmit(
          //   (d) =>
          //     postData(`https://misiapi.lamptechs.com/api/v1/ticket/update`, d)
          //   //console.log("ticket store data", d)
          // )}
        >
          <div className=" px-3">
            <div className=" card d-flex      justify-center ">
              <h2
                className="mt-3 text-center text-3xl font-extrabold  "
                style={{ color: "#01a9ac" }}
              >
                Ticket id: {singleTicket.data?.id}
              </h2>
              {/* first portion of the form */}
              <div className=" m-3 p-3 ">
                {/* Patient Id */}

                {singleTicket.data?.patient_info ? (
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
                          value={singleTicket.data?.patient_info?.source}
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
                          value={singleTicket.data?.patient_info?.area}
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
                          value={singleTicket.data?.patient_info.first_name}
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
                          value={singleTicket.data?.patient_info.last_name}
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
                          value={singleTicket.data?.patient_info.email}
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
                          value={singleTicket.data?.patient_info?.phone}
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
                          value={singleTicket.data?.patient_info?.city}
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
                          value={singleTicket.data?.patient_info?.country?.name}
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
                        value={singleTicket.data?.patient_info?.address}
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
                          value={singleTicket.data?.patient_info?.dob_number}
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
                          value={singleTicket.data?.patient_info?.bsn_number}
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
                          value={
                            singleTicket.data?.patient_info?.insurance_number
                          }
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
                          value={singleTicket.data?.patient_info?.date_of_birth}
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
                          value={
                            singleTicket.data?.patient_info?.marital_status
                          }
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
                          value={singleTicket.data?.patient_info?.occupation}
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
                          value={singleTicket.data?.patient_info?.state?.name}
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
                          value={
                            singleTicket.data?.patient_info?.blood_group?.name
                          }
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
                          value={singleTicket.data?.patient_info?.age}
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
                          value={
                            singleTicket.data?.patient_info?.emergency_contact
                          }
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
                        value={singleTicket.data?.patient_info?.medical_history}
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

                <div className="grid gap-4 grid-cols-2 my-2.5">
                  {/* Assign To therapist */}
                  <div className="col-start-1 relative   ">
                    <input
                      type="text"
                      id="therapist"
                      {...register("therapist")}
                      className="block px-2.5 pb-2 pt-2.5 py-2.5 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
                      placeholder="  "
                      value={`${singleTicket.data?.therapist_info?.first_name} ${singleTicket.data?.therapist_info?.last_name}`}
                    />
                    <label
                      htmlFor="therapist"
                      className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-teal-500 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                    >
                      Therapist name
                    </label>
                  </div>
                  {/* Pass Department  */}
                  <div className="col-start-2 relative   ">
                    <input
                      type="text"
                      id="Pass department"
                      {...register("Pass department")}
                      className="block px-2.5 pb-2 pt-2.5 py-2.5 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
                      placeholder="  "
                      value={singleTicket.data?.ticket_department_info?.name}
                    />
                    <label
                      htmlFor="Pass department"
                      className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-teal-500 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                    >
                      Pass department
                    </label>
                  </div>
                </div>
                <div className="grid gap-4 grid-cols-2 mt-2.5">
                  {/*call strike  */}
                  <div className="col-start-1 relative   ">
                    <input
                      type="text"
                      id="strike"
                      {...register("strike")}
                      className="block px-2.5 pb-2 pt-2.5 py-2.5 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
                      placeholder="  "
                      value={singleTicket.data?.strike}
                    />
                    <label
                      htmlFor="strike"
                      className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-teal-500 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                    >
                      strike
                    </label>
                  </div>
                  {/* remarks */}
                  <div className="col-start-2 relative   ">
                    <input
                      type="text"
                      id="remark"
                      {...register("remark")}
                      className="block px-2.5 pb-2 pt-2.5 py-2.5 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
                      placeholder="  "
                      value={singleTicket.data?.remarks}
                    />
                    <label
                      htmlFor="remark"
                      className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-teal-500 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                    >
                      remark
                    </label>
                  </div>
                </div>
                {/* strike History */}
                <div className="col-start-2 relative mt-3">
                  <input
                    type="text"
                    id="strike_history"
                    {...register("strike_history")}
                    className="block px-2.5 pb-2 pt-2.5 py-2.5 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
                    placeholder="  "
                    value={singleTicket.data?.strike_history}
                  />
                  <label
                    htmlFor="strike_history"
                    className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-teal-500 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                  >
                    Strike history
                  </label>
                </div>
                {/* ticket History */}
                <div className="col-start-2 relative mt-3">
                  <input
                    type="text"
                    id="ticket_history"
                    {...register("ticket_history")}
                    className="block px-2.5 pb-2 pt-2.5 py-2.5 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
                    placeholder="  "
                    value={singleTicket.data?.ticket_history}
                  />
                  <label
                    htmlFor="ticket_history"
                    className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-teal-500 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                  >
                    Strike history
                  </label>
                </div>
                {/*  language and status */}
                <div className="grid grid-cols-2 gap-4 my-2.5">
                  {/* status treatment*/}
                  <div className="  relative">
                    <input
                      type="text"
                      id="status"
                      {...register("status")}
                      className="block px-2.5 pb-2 pt-2.5 py-2.5 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
                      placeholder="  "
                      value={Statustest(singleTicket.data?.status)}
                    />

                    <label
                      htmlFor="status"
                      className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-teal-500 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                    >
                      Treatment status
                    </label>
                  </div>
                  {/* Language Select  */}
                  <div className="relative">
                    <input
                      type="text"
                      id="language"
                      {...register("language")}
                      className="block px-2.5 pb-2 pt-2.5 py-2.5 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
                      placeholder="  "
                      value={singleTicket.data?.language}
                    />
                    <label
                      htmlFor="ticket_history"
                      className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-teal-500 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                    >
                      Treatment Language
                    </label>
                  </div>
                </div>
                <div className=" flex justify-end">
                  <button
                    className="decoration-4 text-xl shadow mt-6   hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                    // type="submit"
                    style={{ backgroundColor: "#01a9ac" }}
                    onClick={() => router.push(`/all-ticket`)}
                  >
                    Go Back
                  </button>
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
