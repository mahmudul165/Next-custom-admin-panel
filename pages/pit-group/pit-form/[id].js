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
function CreatePit() {
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
  const useSingleTicketQuery = () =>
    useQuery(["fetchSingleTicket"], fetchSingleTicket);

  const { data: singleTicket } = useSingleTicketQuery();
  console.log("  singleTicket data", singleTicket);

  return (
    <>
      {" "}
      <form
        className="w-10/12 m-auto p-12  first-line: "
        onSubmit={
          handleSubmit()
          //   (d) =>
          //     postData("https://misiapi.lamptechs.com/api/v1/ticket/store", d)
          //console.log("ticket store data", d)
        }
      >
        <div className=" px-3 ">
          <div className="card d-flex justify-center ">
            <h2
              className="mt-3 text-center text-3xl font-extrabold  "
              style={{ color: "#01a9ac" }}
            >
              PIT formula
            </h2>
            {/* table */}
            <div className=" mx-3 px-3 ">
              {/* <div className="grid gap-4  mt-2.5">
                <div className="relative   px-6">
                  {patientList?.data ? (
                    <Stack>
                      <Autocomplete
                        onChange={(event, value) => {
                          //setSearchInput(value);
                          debounce(setSearchInput(value), 500);
                        }}
                        // onChange={(event, value) => setMovie(value)}
                        size="small"
                        freeSolo
                        // id="free-solo-2-demo"
                        disableClearable
                        options={patientList?.data.map((patient) => patient.id)}
                        // getOptionLabel={(option) => option?.id}
                        renderInput={(params) => (
                          <TextField
                            // onChange={handleSearchChange}
                            // onChange={debounce(handleSearchChange, 500)}
                            id="patient_id"
                            {...register("patient_id")}
                            {...params}
                            label="Search patient id"
                            InputProps={{
                              ...params.InputProps,
                              type: "search",
                            }}
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
              </div> */}
              {singleTicket?.data ? (
                <>
                  <div className="relative overflow-x-auto shadow-md sm:rounded-lg card m-4 p-4 shadow-lg">
                    <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
                      <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                          <th scope="col" className="py-3 fs-5 fw-bolder">
                            Pre intake beoordeling (PIT)
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
                          <th
                            scope="row"
                            className="whitespace-normal px-2 py-4 font-medium text-gray-900 dark:text-white"
                          >
                            Name PiB-er:
                          </th>
                          <td className="px-6 py-4">
                            <input
                              // {...register("name")}
                              type="text"
                              id="name"
                              className="block px-2.5 pb-2 pt-2.5 py-2.5 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
                              placeholder="  "
                              required
                            />
                            <label
                              htmlFor="name"
                              className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-teal-500 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                            ></label>
                          </td>
                        </tr>
                        <tr className="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
                          <th
                            scope="row"
                            className="whitespace-normal px-2 py-4 font-medium text-gray-900 dark:text-white"
                          >
                            Patient name:
                          </th>
                          <td className="px-6 py-4">{`${singleTicket.data?.patient_info?.first_name} ${singleTicket.data?.patient_info?.last_name} `}</td>
                        </tr>
                        <tr className="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
                          <th
                            scope="row"
                            className="whitespace-normal px-2 py-4 font-medium text-gray-900 dark:text-white"
                          >
                            Patient Code:
                          </th>
                          <td className="px-6 py-4">{`${singleTicket.data?.patient_info?.id}`}</td>
                        </tr>
                        {/* <tr className="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
                    <th
                      scope="row"
                      className="whitespace-normal px-2 py-4 font-medium text-gray-900 dark:text-white"
                    >
                      Patient email:
                    </th>
                    <td className="px-6 py-4">{`${patient_info.email}`}</td>
                  </tr> */}
                        <tr className="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
                          <th
                            scope="row"
                            className="whitespace-normal px-2 py-4 font-medium text-gray-900 dark:text-white"
                          >
                            Type of Legitimation:
                          </th>
                          <td className="px-6 py-4">
                            <input
                              // {...register("name")}
                              type="text"
                              id="name"
                              className="block px-2.5 pb-2 pt-2.5 py-2.5 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
                              placeholder="  "
                              required
                            />
                            <label
                              htmlFor="name"
                              className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-teal-500 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                            ></label>
                          </td>
                        </tr>
                        <tr className="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
                          <th
                            scope="row"
                            className="whitespace-normal px-2 py-4 font-medium text-gray-900 dark:text-white"
                          >
                            Document number:
                          </th>
                          <td className="px-6 py-4">
                            <input
                              // {...register("name")}
                              type="text"
                              id="name"
                              className="block px-2.5 pb-2 pt-2.5 py-2.5 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
                              placeholder="  "
                              required
                            />
                            <label
                              htmlFor="name"
                              className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-teal-500 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                            ></label>
                          </td>
                        </tr>
                        <tr className="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
                          <th
                            scope="row"
                            className="whitespace-normal px-2 py-4 font-medium text-gray-900 dark:text-white"
                          >
                            Identification expiration date:
                          </th>
                          <td className="px-6 py-4">
                            <input
                              // {...register("name")}
                              type="date"
                              id="name"
                              className="block px-2.5 pb-2 pt-2.5 py-2.5 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
                              placeholder="  "
                              required
                            />
                            <label
                              htmlFor="name"
                              className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-teal-500 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                            ></label>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </>
              ) : (
                <>{/* <Loading /> */}</>
              )}
            </div>
          </div>
          {/* question table */}
          <div className=" card d-flex justify-center ">
            {/* table */}
            <div className=" mx-3 px-3 ">
              <div className="relative overflow-x-auto shadow-md sm:rounded-lg  m-4 p-4 shadow-lg">
                <h6 className="fs-6 fw-bold mb-3">Rage form:</h6>
                <small className="break-all">
                  We have reviewed your referral letter and have additional
                  questions that we want to ask you in order to be able to make
                  a good choice whether we can offer you the right treatment.
                  The conversation will last about 15 minutes. After this we
                  will call you back with a few (2-3 days). If we do not have
                  the right care for you, we will explain why that is the case
                  and if possible, advise another institution. We are a
                  diagnostic and psychotherapeutic center and do not provide
                  medication during treatment. If necessary/useful, the doctor
                  will give you medication during your treatment with us.
                </small>
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                  {/* <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
              <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400"> */}

                  <table className="mt-4 mx-auto max-w-5xl w-full whitespace-nowrap rounded-lg bg-white  divide-gray-300 overflow-hidden">
                    <thead
                      className="  "
                      style={{ backgroundColor: "#01a9ac" }}
                    >
                      {" "}
                      <tr>
                        <th scope="col" className="text-white px-6 py-3">
                          To ask
                        </th>
                        <th
                          scope="col"
                          className="text-center text-white px-6 py-3"
                        >
                          <p> Serious</p>
                          <small>(Scale 0-10)</small>
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      <tr className="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
                        <th
                          scope="row"
                          className="whitespace-normal px-2 py-4 font-medium text-gray-900 dark:text-white"
                        >
                          1.What do you think is going on with you? What are the
                          current complaints? What bothers you the most?
                        </th>
                        <td className="px-6 py-4">
                          {" "}
                          <div className="relative   ">
                            <input
                              // {...register("name")}
                              type="text"
                              id="name"
                              className="block px-2.5 pb-2 pt-2.5 py-2.5 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
                              placeholder="  "
                              required
                            />
                            <label
                              htmlFor="name"
                              className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-teal-500 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                            ></label>
                          </div>
                        </td>
                      </tr>
                      <tr className="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
                        <th
                          scope="row"
                          className="whitespace-normal px-2 py-4 font-medium text-gray-900 dark:text-white"
                        >
                          2.What would you like to get rid of?
                        </th>
                        <td className="px-6 py-4">
                          {" "}
                          <div className="relative   ">
                            <input
                              // {...register("name")}
                              type="text"
                              id="name"
                              className="block px-2.5 pb-2 pt-2.5 py-2.5 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
                              placeholder="  "
                              required
                            />
                            <label
                              htmlFor="name"
                              className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-teal-500 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                            ></label>
                          </div>
                        </td>
                      </tr>
                      <tr className="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
                        <th
                          scope="row"
                          className="whitespace-normal px-2 py-4 font-medium text-gray-900 dark:text-white"
                        >
                          3.Have you had treatment before (where, when and
                          what)?
                        </th>
                        <td className="px-6 py-4">
                          {" "}
                          <div className="relative   ">
                            <input
                              // {...register("name")}
                              type="text"
                              id="name"
                              className="block px-2.5 pb-2 pt-2.5 py-2.5 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
                              placeholder="  "
                              required
                            />
                            <label
                              htmlFor="name"
                              className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-teal-500 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                            ></label>
                          </div>
                        </td>
                      </tr>
                      <tr className="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
                        <th
                          scope="row"
                          className="whitespace-normal px-2 py-4 font-medium text-gray-900 dark:text-white"
                        >
                          4.Would you also like medication for this do you
                          think? What medication are you currently taking?
                        </th>
                        <td className="px-6 py-4">
                          {" "}
                          <div className="relative   ">
                            <input
                              // {...register("name")}
                              type="text"
                              id="name"
                              className="block px-2.5 pb-2 pt-2.5 py-2.5 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
                              placeholder="  "
                              required
                            />
                            <label
                              htmlFor="name"
                              className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-teal-500 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                            ></label>
                          </div>
                        </td>
                      </tr>
                      <tr className="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
                        <th
                          scope="row"
                          className="whitespace-normal px-2 py-4 font-medium text-gray-900 dark:text-white"
                        >
                          5.Are you able to contribute to your treatment (if you
                          are in treatment, can you work on the assignments you
                          receive between sessions)?
                        </th>
                        <td className="px-6 py-4">
                          {" "}
                          <div className="relative   ">
                            <input
                              // {...register("name")}
                              type="text"
                              id="name"
                              className="block px-2.5 pb-2 pt-2.5 py-2.5 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
                              placeholder="  "
                              required
                            />
                            <label
                              htmlFor="name"
                              className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-teal-500 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                            ></label>
                          </div>
                        </td>
                      </tr>
                      <tr className="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
                        <th
                          scope="row"
                          className="whitespace-normal px-2 py-4 font-medium text-gray-900 dark:text-white"
                        >
                          6.Do you suffer from addiction?
                        </th>
                        <td className="px-6 py-4">
                          {" "}
                          <div className="relative   ">
                            <input
                              // {...register("name")}
                              type="text"
                              id="name"
                              className="block px-2.5 pb-2 pt-2.5 py-2.5 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
                              placeholder="  "
                              required
                            />
                            <label
                              htmlFor="name"
                              className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-teal-500 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                            ></label>
                          </div>
                        </td>
                      </tr>
                      <tr className="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
                        <th
                          scope="row"
                          className="whitespace-normal px-2 py-4 font-medium text-gray-900 dark:text-white"
                        >
                          7.Do you ever see or hear things that others would not
                          see or hear?
                        </th>
                        <td className="px-6 py-4">
                          {" "}
                          <div className="relative   ">
                            <input
                              // {...register("name")}
                              type="text"
                              id="name"
                              className="block px-2.5 pb-2 pt-2.5 py-2.5 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
                              placeholder="  "
                              required
                            />
                            <label
                              htmlFor="name"
                              className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-teal-500 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                            ></label>
                          </div>
                        </td>
                      </tr>
                      <tr className="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
                        <th
                          scope="row"
                          className="whitespace-normal px-2 py-4 font-medium text-gray-900 dark:text-white"
                        >
                          8.How is your home/work/study situation?
                        </th>
                        <td className="px-6 py-4">
                          {" "}
                          <div className="relative   ">
                            <input
                              // {...register("name")}
                              type="text"
                              id="name"
                              className="block px-2.5 pb-2 pt-2.5 py-2.5 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
                              placeholder="  "
                              required
                            />
                            <label
                              htmlFor="name"
                              className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-teal-500 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                            ></label>
                          </div>
                        </td>
                      </tr>{" "}
                      <tr className="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
                        <th
                          scope="row"
                          className="whitespace-normal px-2 py-4 font-medium text-gray-900 dark:text-white"
                        >
                          9.Have you ever thought life is no longer necessary
                          for me? If yes, ask about suicidal thoughts.
                        </th>
                        <td className="px-6 py-4">
                          {" "}
                          <div className="relative   ">
                            <input
                              // {...register("name")}
                              type="text"
                              id="name"
                              className="block px-2.5 pb-2 pt-2.5 py-2.5 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
                              placeholder="  "
                              required
                            />
                            <label
                              htmlFor="name"
                              className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-teal-500 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                            ></label>
                          </div>
                        </td>
                      </tr>
                      <tr className="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
                        <th
                          scope="row"
                          className="whitespace-normal px-2 py-4 font-medium text-gray-900 dark:text-white"
                        >
                          10.Do you ever damage yourself?
                        </th>
                        <td className="px-6 py-4">
                          {" "}
                          <div className="relative   ">
                            <input
                              // {...register("name")}
                              type="text"
                              id="name"
                              className="block px-2.5 pb-2 pt-2.5 py-2.5 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
                              placeholder="  "
                              required
                            />
                            <label
                              htmlFor="name"
                              className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-teal-500 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                            ></label>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                {/* save submit button */}
                <div className="my-3 px-3 md:flex md:items-center justify-end ">
                  {/* <div className="md:w-1/2"> */}
                  <button
                    className="shadow   hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                    type="submit"
                    style={{ backgroundColor: "#01a9ac" }}
                  >
                    Save
                  </button>
                  {/* className="my-6 text-center text-3xl font-extrabold bg-teal-500"  */}
                  {/* </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

export default CreatePit;

// useDebounce onchange react
// patient form separation
// search api 'singlePatient'
// 'singlePatient?.data' ? then show data a from :another blank form
