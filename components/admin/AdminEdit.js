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
  useGroupInfo,
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
function TicketForm() {
  const { postData, status, setStatus } = useAuth();
  const [searchInput, setSearchInput] = useState("");
  console.log("searchInput", searchInput);
  const [startDate, setStartDate] = useState(new Date());
  const { register, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });
  const { data: patientList } = usePatientListQuery();
  const { data: groupList } = useGroupInfo();
  const { data: therapistList } = useTherapitListQuery();
  const { data: ticketDepartment } = useAllTicketDepartmentQuery();
  // const { data: singlePatient } = usePatientQuery(searchInput);
  //const { data, error, isError } = useTherapitListQuery();
  console.log("group list ", groupList?.data);

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
  //console.log("singlepatient data", singlepatient);

  return (
    <>
      {/* {status == true && <ResponsiveDialog title="save" />} */}
      {/* <OperationModal modal={modal} setModal={setModal}>
                      {<TicketForm className="m-auto" />}
                    </OperationModal> */}
      <form
        className="w-11/12 m-auto   first-line: "
        onSubmit={handleSubmit(
          (d) => postData("https://misiapi.lamptechs.com/api/v1/admin/store", d)

          //console.log("ticket store data", d)
        )}
      >
        <div className=" px-2">
          <div className=" card d-flex      justify-center ">
            <h2
              className="mt-3 text-center text-3xl font-extrabold  "
              style={{ color: "#01a9ac" }}
            >
              Create User
            </h2>
            {/* first portion of the form */}
            <div className=" m-3 p-3 ">
              {/* name */}
              <div className="grid  gap-4 mt-3">
                {/* first Name  */}
                <div className="col-start-1 relative   ">
                  <input
                    type="text"
                    id="name"
                    {...register("name")}
                    className="block px-2.5 pb-2 pt-2.5 py-2.5 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
                    placeholder="  "
                    value={singlepatient.first_name}
                  />
                  <label
                    htmlFor="name"
                    className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-teal-500 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                  >
                    Name
                  </label>
                </div>
                {/* last Name  */}
                {/* <div className="col-start-2  relative   ">
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
                </div> */}
              </div>
              {/* email  and phone  */}
              <div className="grid  gap-4 mt-3">
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
              </div>
              {/*Address*/}
              {/* <div className="relative  mt-3">
                <textarea
                  className="block px-2.5 pb-2 pt-2.5 py-2.5 w-full rows-4 text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
                  id="address"
                  {...register("address")}
                  type="text"
                  placeholder="  "
                />
                <label
                  htmlFor="textarea"
                  className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-teal-500 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                >
                  Address
                </label>
              </div> */}
              {/*Biography */}
              <div className="relative  mt-3">
                <textarea
                  className="h-28 block px-2.5 pb-2 pt-2.5 py-2.5 w-full rows-4 text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
                  id="bio"
                  {...register("bio")}
                  type="text"
                  placeholder="  "
                />
                <label
                  htmlFor="bio"
                  className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-teal-500 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                >
                  Biography
                </label>
              </div>
              {/*  image and group-access */}
              <div className="grid grid-cols-2 gap-4 my-3">
                {/*attach file  */}
                <div className=" relative   ">
                  <input
                    className="block px-2.5 pb-2 pt-2.5 py-2.5 w-full rows-4 text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
                    placeholder="  "
                    type="file"
                    // multiple
                    id="file"
                    // onClick={(e) => setPicture(e.target.value)}
                    //  {...register("file")}
                  />

                  <label
                    htmlFor="file"
                    className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-teal-500 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                  >
                    Attach image
                  </label>
                </div>
                {/* group-access  */}
                <div className="relative    ">
                  {groupList?.data ? (
                    <div className="relative   ">
                      <select
                        id="group_id"
                        {...register("group_id")}
                        className="block px-2.5 pb-2 pt-2.5 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
                      >
                        <option selected>Select group</option>
                        {groupList?.data?.map((item) => (
                          <option key={item.id} value={`${item?.id}`}>
                            {`${item?.name}`}
                          </option>
                        ))}
                      </select>
                      <label
                        htmlFor="group_id"
                        className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-teal-500 peer-focus:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-25 peer-focus:-translate-y-4 left-1"
                      >
                        Group access
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
                {/* <div className="relative">
                  <select
                    id="group-access"
                    {...register("group-access")}
                    className="block px-2.5 pb-2 pt-2.5 py-2.5 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
                  >
                    Group PiT Group(Specialist) PiB Group(Moderate)
                    Heraanmelding
                    <option selected>Select group</option>
                    <option value="English">Screener Group </option>
                    <option value="Dutch">Waiting for YES Approval </option>
                    <option value="Dutch"> Waiting for NO Approval</option>
                    <option value="Dutch">Appointment</option>
                    <option value="Dutch">PiT Group(Specialist) </option>
                    <option value="Dutch">PiB Group(Moderate) </option>
                    <option value="Dutch">Heraanmelding</option>
                  </select>
                  <label
                    htmlFor="group-access"
                    className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-teal-500 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                  >
                    Group access
                  </label>
                </div> */}
              </div>
              <div className="grid  gap-4 grid-cols-2">
                {/* status */}
                <div className="  relative  ">
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
                    Status
                  </label>
                </div>
                {/* password */}
                <div className="relative     ">
                  <input
                    type="text"
                    id="password"
                    // value="1"
                    {...register("password")}
                    className="block px-2.5 pb-2 pt-2.5 py-2.5 w-full rows-4 text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
                    placeholder="••••••••"
                  />
                  <label
                    htmlFor="password"
                    className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-teal-500 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                  >
                    Password
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
