import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import useAuth from "/hook/useAuth";

//import DatePicker from "react-multi-date-picker";

const schema = yup
  .object()
  .shape({
    // service_category_id
    // service_subcategory_name
    //  status
    //  remarks
    // service_category_id: yup.string().required(),
    //name: yup.string().required(),
    // details: yup.string().required(),
    //remarks: yup.string().required(),
    // status: yup.string().required(),
  })
  .required();

//  mui design
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { Skeleton, Stack } from "@mui/material";

import {
  useCountyListQuery,
  useBloodGroupQuery,
  useStateDataQuery,
  useOccupationQuery,
} from "/hook/useApi";

import Loading from "/components/common/Loading.js";
import { useRouter } from "next/router";
import Image from "next/image";
import { useQuery } from "react-query";
function PaitentForm({ title, data }) {
  const { updateData } = useAuth();
  const { data: countryList } = useCountyListQuery();
  const { data: bloodGroup } = useBloodGroupQuery();
  const { data: stateData } = useStateDataQuery();
  const { data: occupation } = useOccupationQuery();
  const router = useRouter();
  const fetchSinglePatient = async () => {
    const response = await fetch(
      `https://misiapi.lamptechs.com/api/v1/patient/show?id=${router?.query?.id}`,
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );
    return await response.json();
  };
  const usePatientQuery = () =>
    useQuery(["fetchSinglePatient"], fetchSinglePatient);
  const { data: singlePatient } = usePatientQuery();
  //console.log("edit single patient data data", singlePatient);

  const { register, handleSubmit, error, control } = useForm({
    resolver: yupResolver(schema),
  });

  const [submittedDate, setSubmittedDate] = useState();
  //console.log("edit data from patientlist", data);

  //  mui data
  const documents = [
    { title: "Nid" },
    { title: "Driving" },
    { title: "Others" },
  ];

  //required field
  // const [id, setId] = React.useState();
  const [first_name, setFirst] = React.useState();
  const [last_name, setLast] = React.useState();
  const [email, setEmail] = React.useState();
  const [phone, setPhone] = React.useState();
  //const [password, setPassword] = React.useState();
  const [status, setStatus] = React.useState();
  const [file_type, setFiletype] = React.useState();
  const [ShowImage, setShowimage] = useState("");
  const [picture, setPicture] = React.useState();
  // not required field
  const [source, setSource] = React.useState();
  const [alternet_phone, setAlternetphone] = React.useState();
  const [address, setAddress] = React.useState();
  const [state_id, setState] = React.useState();
  const [country_id, setCountry] = React.useState();
  const [blood_group_id, setBloodgroup] = React.useState();
  //const [city, setCity] = React.useState();
  const [area, setArea] = React.useState();
  const [bsn_number, setBsnnumber] = React.useState();
  const [dob_number, setDobnumber] = React.useState();
  const [insurance_number, setInsurancenumber] = React.useState();
  const [age, setAge] = React.useState();
  const [gender, setGender] = React.useState();
  const [marital_status, setMaritalstatus] = React.useState();
  const [medical_history, setMedical] = React.useState();
  const [Occupation, setOccupation] = React.useState();
  const [emergency_contact, setEmergencycontact] = React.useState();
  const [date_of_birth, setDob] = React.useState();
  const [remarks, setRemarks] = React.useState();

  console.log(
    "from data",
    status,
    first_name,
    last_name,
    email,
    phone,
    file_type,
    // picture,
    source,
    alternet_phone,
    address,
    state_id,
    country_id,
    blood_group_id,
    area,
    bsn_number,
    dob_number,
    insurance_number,
    age,
    gender,
    marital_status,
    medical_history,
    Occupation,
    emergency_contact,
    date_of_birth,
    remarks
  );
  const [show, setShow] = React.useState();
  var loadFile = (e) => {
    if (e.target.files[0]) {
      setShowimage(URL.createObjectURL(e.target.files[0]));
      setPicture(e.target.files[0]);
      // console.log(URL.createObjectURL(e.target.files[0]));
    }
  };
  const handleSubmitForm = (e) => {
    e.preventDefault();
    let formData = new FormData();
    //required field
    //formData.append("id", id);
    formData.append("first_name", first_name);
    formData.append("last_name", last_name);
    formData.append("email", email);
    formData.append("phone", phone);
    //formData.append("password", password);
    formData.append("status", status);
    formData.append("file_type", file_type);
    formData.append("picture", picture);
    // not required field
    formData.append("address", address);
    formData.append("source", source);
    formData.append("country_id", country_id);
    formData.append("state_id", state_id);
    formData.append("country_id", country_id);
    formData.append("blood_group_id", blood_group_id);
    formData.append("area", area);
    //formData.append("city ", city);
    formData.append("bsn_number", bsn_number);
    formData.append("dob_number", dob_number);
    formData.append("insurance_number", insurance_number);
    formData.append("age", age);
    formData.append("gender", gender);
    formData.append("marital_status ", marital_status);
    formData.append("medical_history", medical_history);
    formData.append("occupation", Occupation);
    formData.append("alternet_phone ", alternet_phone);
    formData.append("emergency_contact", emergency_contact);
    formData.append("date_of_birth", date_of_birth);
    formData.append("remarks", remarks);

    // the image shoud be same {image,file direction}
    updateData(
      `https://misiapi.lamptechs.com/api/v1/patient/update/${router?.query?.id}`,
      formData,
      singlePatient?.data
    );
  };
  return (
    <>
      {/* create patient form */}

      <form
        className="w-10/12 m-auto   first-line: "
        type="submit"
        // onSubmit={handleSubmitForm}
        onSubmit={handleSubmit(
          (d) =>
            updateData(
              `https://misiapi.lamptechs.com/api/v1/patient/update/${router?.query?.id}`,
              d
            )
          // console.log("edit patient store data", d)
        )}
      >
        {/* mx-4  px-12  */}
        <div className="container     rounded bg-white mt-5 mb-5 ">
          <div className="container    rounded bg-white mt-5 mb-5 ">
            <div className="grid    px-8 grid-cols-2 justify-center  gap-4 mt-2.5 pl-3.5">
              <div className="flex justify-center items-center">
                <h2
                  className="col-start-1  text-center text-3xl   font-extrabold    "
                  style={{ color: "#01a9ac" }}
                >
                  Update patient info
                  {/* id: {singleTicket.data?.id} */}
                </h2>
              </div>
              {/* button download and save */}
              <div className="col-start-2 my-3 px-3 md:flex md:items-center justify-center ">
                <div className="inline-flex rounded-md shadow-sm" role="group">
                  <button
                    onClick={() => router.push(`/patient`)}
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
            <div className="flex items-center justify-center row container   border-t-2 ">
              <div className="col-md-5 mt-3">
                <div className="flex justify-center items-center w-full  ">
                  <label
                    style={{
                      height: "240px",
                      width: "240px",
                      borderRadius: "50%",
                    }}
                    htmlFor="picture"
                    className="relative flex flex-col justify-center items-center w-full h-40 bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
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
                        </span>
                        {/* or drag and drop */}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {/* SVG, PNG, JPG or GIF (MAX. 500x500px) */}
                      </p>
                    </div>
                    <input
                      id="picture"
                      {...register("picture")}
                      className="hidden"
                      type="file"
                      name="picture"
                      // onChange={(e) => setPicture(e.target.files[0])}
                      onChange={loadFile}
                    />

                    <img
                      className="absolute"
                      src={
                        ShowImage ? ShowImage : singlePatient?.data?.image_url
                      }
                      // className={classes.image}
                      style={{
                        backgroundImage: "cover",
                        backgroundPosition: "center",
                        height: "260px",
                        width: "230px",
                        borderRadius: "50%",
                      }}
                      id="output"
                      alt="test"
                    />

                    {/* <div className={"image-container"}>
                      <Image
                        src={
                          ShowImage
                            ? ShowImage
                            : "https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
                        }
                        layout="fill"
                        className={"image"}
                        sizes="(min-width: 75em) 33vw,
              (min-width: 48em) 50vw,
              100vw"
                      />
                    </div> */}
                  </label>
                </div>
                <div className="d-flex flex-column align-items-center text-center px-3  ">
                  {/* <img
                    className="rounded-circle mt-3"
                    width="180px"
                    src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
                  /> */}
                  {/* <span className="font-weight-bold text-xl">mahmud hasan</span>
                  <span className="mb-2 text-teal-500 font-medium">
                    mahmudul hasan
                  </span> */}
                </div>
                {/* start */}
                <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
                  <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400"></thead>
                  <tbody>
                    <tr>
                      {/* <th scope="col" className="py-3 fs-5 fw-bolder">
                       Pre intake beoordeling (PiB)
                     </th> */}
                    </tr>
                    {/* Patient id*/}
                    {/* <div className="relative  my-3">
                      <input
                        type="text"
                        name="id"
                        id="id"
                        onChange={(e) => setId(e.target.value)}
                        className="hidden block px-2.5 pb-2 pt-2.5 w-full text-sm text-gray-900 bg-transparent rounded-full border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
                        placeholder="  "
                        // {...register("id")}
                      />

                      <label
                        htmlFor="id"
                        className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-gray-500 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-25 peer-focus:-translate-y-4 left-1"
                      >
                        Patient Id
                      </label>
                    </div> */}
                    {/* Patient Source */}
                    <div className="relative  my-3">
                      <select
                        className="block px-2.5 pb-2 pt-2.5 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
                        // id="source"

                        type="text"
                        name="source"
                        id="source"
                        {...register("source")}
                        onChange={(e) => setSource(e.target.value)}
                        defaultValue={singlePatient?.data?.source}
                      >
                        <option value="ZD">ZD</option>
                        <option value="Own">Own</option>
                        <option value="Others">Others</option>
                      </select>
                      <label
                        htmlFor="floating_outlined"
                        className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-gray-500 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-25 peer-focus:-translate-y-4 left-1"
                      >
                        Patient source
                      </label>
                    </div>
                    {/* first Name  */}
                    <div className="relative  my-3  ">
                      <input
                        // type="text"
                        // id="first_name"

                        type="text"
                        id="first_name"
                        {...register("first_name")}
                        name="first_name"
                        onChange={(e) => setFirst(e.target.value)}
                        className="block px-2.5 pb-2 pt-2.5 py-2.5 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
                        placeholder="  "
                        required
                        defaultValue={singlePatient?.data?.first_name}
                      />
                      <label
                        htmlFor="first_name"
                        className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-gray-500 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-25 peer-focus:-translate-y-4 left-1"
                      >
                        First Name
                      </label>
                    </div>
                    {/* last Name  */}
                    <div className="relative  my-3    ">
                      <input
                        // type="text"
                        // id="last_name"

                        type="text"
                        id="last_name"
                        {...register("last_name")}
                        name="last_name"
                        defaultValue={singlePatient?.data?.last_name}
                        onChange={(e) => setLast(e.target.value)}
                        className="block px-2.5 pb-2 pt-2.5 py-2.5 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
                        placeholder="  "
                        required
                      />
                      <label
                        htmlFor="last_name"
                        className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-gray-500 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-25 peer-focus:-translate-y-4 left-1"
                      >
                        Last Name
                      </label>
                    </div>
                    {/* email   */}
                    <div className="relative  my-3   ">
                      <input
                        // type="text"
                        // id="email"

                        type="email"
                        name="email"
                        id="email"
                        {...register("email")}
                        defaultValue={singlePatient?.data?.email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="block px-2.5 pb-2 pt-2.5 py-2.5 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
                        placeholder="  "
                        required
                      />
                      <label
                        htmlFor="email"
                        className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-gray-500 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-25 peer-focus:-translate-y-4 left-1"
                      >
                        Email
                      </label>
                    </div>
                    {/* phone  */}
                    <div className="relative  my-3   ">
                      <input
                        type="tel"
                        // id="phone"

                        name="phone"
                        id="phone"
                        {...register("phone")}
                        defaultValue={singlePatient?.data?.phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="block px-2.5 pb-2 pt-2.5 py-2.5 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
                        placeholder="  "
                        required
                      />
                      <label
                        htmlFor="phone"
                        className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-gray-500 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-25 peer-focus:-translate-y-4 left-1"
                      >
                        Phone number
                      </label>
                    </div>
                    {/*alternative  phone  */}
                    <div className="relative  my-3">
                      <input
                        type="text"
                        name="alternet_phone"
                        id="alternet_phone"
                        {...register("alternet_phone")}
                        defaultValue={singlePatient?.data?.alternet_phone}
                        onChange={(e) => setAlternetphone(e.target.value)}
                        // type="text"
                        // id="alternet_phone"

                        className="block px-2.5 pb-2 pt-2.5 py-2.5 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
                        placeholder="  "
                        required
                      />
                      <label
                        htmlFor="alternet_phone"
                        className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-gray-500 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-25 peer-focus:-translate-y-4 left-1"
                      >
                        Alternet phone
                      </label>
                    </div>
                    {/* Residential Address */}
                    <div className="relative  my-3">
                      <textarea
                        className="block px-2.5 pb-2 pt-2.5 py-2.5 w-full rows-4 text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
                        id="address"
                        {...register("address")}
                        type="text"
                        //placeholder="  "
                        name="address"
                        defaultValue={singlePatient?.data?.address}
                        onChange={(e) => setAddress(e.target.value)}
                      />
                      <label
                        htmlFor="inline-full-name"
                        className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-gray-500 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-25 peer-focus:-translate-y-4 left-1"
                      >
                        Residential address
                      </label>
                    </div>
                    {/* country */}
                    <div className="relative  my-3">
                      {countryList?.data ? (
                        <div className="relative ">
                          <select
                            id="country_id"
                            type="text"
                            name="country_id"
                            defaultValue={singlePatient?.data?.country?.id}
                            onChange={(e) => setCountry(e.target.value)}
                            {...register("country_id")}
                            className="block px-2.5 pb-2 pt-2.5 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
                          >
                            {countryList.data?.map((item) => (
                              <option key={item.id} value={`${item?.id}`}>
                                {`${item?.name} `}
                              </option>
                            ))}
                          </select>
                          <label
                            htmlFor="country_id"
                            className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-gray-500 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-25 peer-focus:-translate-y-4 left-1"
                          >
                            Country
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
                    {/* blood  */}
                    <div className="relative  my-3">
                      {bloodGroup?.data ? (
                        <div className="relative ">
                          <select
                            id="blood_group_id"
                            placeholder="Please select your blood group."
                            name="blood_group_id"
                            {...register("blood_group_id")}
                            defaultValue={singlePatient?.data?.blood_group?.id}
                            onChange={(e) => setBloodgroup(e.target.value)}
                            className="block px-2.5 pb-2 pt-2.5 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
                            required
                          >
                            {/* <option selected>Blood group</option> */}
                            {bloodGroup.data?.map((item) => (
                              <option key={item.id} value={`${item?.id}`}>
                                {`${item?.name} `}
                              </option>
                            ))}
                          </select>
                          <label
                            htmlFor="blood_group_id"
                            className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-gray-500 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-25 peer-focus:-translate-y-4 left-1"
                          >
                            Blood group
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
                    {/* insurance_number_number*/}
                    <div className="relative  my-3">
                      <input
                        id="insurance_number"
                        name="insurance_number"
                        defaultValue={singlePatient?.data?.insurance_number}
                        onChange={(e) => setInsurancenumber(e.target.value)}
                        {...register("insurance_number")}
                        className="block px-2.5 pb-2 pt-2.5 py-2.5 w-full rows-4 text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
                        placeholder="  "
                        required
                      />
                      <label
                        htmlFor="insurance_number"
                        className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-gray-500 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-25 peer-focus:-translate-y-4 left-1"
                      >
                        insurance number
                      </label>
                    </div>
                    {/* DATE OF birth */}
                    <div className="relative  my-3">
                      <input
                        type="date"
                        id="date_of_birth"
                        name="date_of_birth"
                        defaultValue={singlePatient?.data?.date_of_birth}
                        onChange={(e) => setDob(e.target.value)}
                        {...register("date_of_birth")}
                        className="block px-2.5 pb-2 pt-2.5 py-2.5 w-full rows-4 text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
                        placeholder="  "
                        required
                      />

                      <label
                        htmlFor="date_of_birth"
                        className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-gray-500 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-25 peer-focus:-translate-y-4 left-1"
                      >
                        Date of birth
                      </label>
                    </div>
                    {/* Marital status*/}
                    <div className="relative  my-3">
                      <select
                        id="marital_status"
                        type="date"
                        name="marital_status"
                        defaultValue={singlePatient?.data?.marital_status}
                        onChange={(e) => setMaritalstatus(e.target.value)}
                        {...register("marital_status")}
                        className="block px-2.5 pb-2 pt-2.5 py-2.5 w-full rows-4 text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
                      >
                        <option selected>Select status</option>
                        <option value="Single">Single</option>
                        <option value="Married">Married</option>
                        <option value="Divorced">Divorced</option>
                        <option value="Engaged">Engaged</option>
                      </select>
                      <label
                        htmlFor="marital_status"
                        className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-gray-500 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-25 peer-focus:-translate-y-4 left-1"
                      >
                        Marital status
                      </label>
                    </div>

                    {/* <tr className="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
                         <th
                           scope="row"
                           className="whitespace-normal px-3 py-2.5 font-medium text-gray-900 dark:text-white"
                         >
                           BNS number:
                         </th>
                         <td className="px-3 py-2.5">
                           {`${singlePatient?.bsn_number}`}
                         </td>
                       </tr> */}
                  </tbody>
                </table>
                {/* end */}
              </div>
              <div className="col-md-5  border-l-2 mt-3">
                <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
                  {/* occupation */}
                  {occupation?.data ? (
                    <div className="relative  my-3">
                      <select
                        id="occupation"
                        name="occupation"
                        defaultValue={singlePatient?.data?.occupation}
                        onChange={(e) => setOccupation(e.target.value)}
                        {...register("occupation")}
                        className="block px-2.5 pb-2 pt-2.5 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
                      >
                        {/* <option selected>select occupation</option> */}
                        {occupation.data?.map((item) => (
                          <option key={item.id} value={`${item?.id}`}>
                            {`${item?.name} `}
                          </option>
                        ))}
                      </select>
                      <label
                        htmlFor="occupation"
                        className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-gray-500 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-25 peer-focus:-translate-y-4 left-1"
                      >
                        Occupation
                      </label>
                    </div>
                  ) : (
                    <>
                      <Stack spacing={1}>
                        <Skeleton animation="wave" height={40} />
                      </Stack>
                    </>
                  )}

                  {/* sex  */}
                  <div className="relative  my-3 ">
                    <select
                      id="gender"
                      type="text"
                      name="gender"
                      defaultValue={singlePatient?.data?.gender}
                      onChange={(e) => setGender(e.target.value)}
                      {...register("gender")}
                      className="block px-2.5 pb-2 pt-2.5 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Others">Others</option>
                    </select>
                    <label
                      htmlFor="gender"
                      className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-gray-500 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-25 peer-focus:-translate-y-4 left-1"
                    >
                      Sex
                    </label>
                  </div>
                  {/* Medical History */}
                  <div className="relative  my-3">
                    {/* <input
                     type="text-area"
                     id="floating_outlined"
                     className="block px-2.5 pb-2 pt-2.5 py-2.5 w-full rows-4 text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
                     placeholder="  "
                     required
                   />  */}
                    <textarea
                      className="h-36 block px-2.5 pb-2 pt-2.5 py-2.5 w-full rows-4 text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
                      id="medical_history"
                      {...register("medical_history")}
                      type="text"
                      placeholder="  "
                      defaultValue={singlePatient?.data?.medical_history}
                      name="medical_history"
                      onChange={(e) => setMedical(e.target.value)}
                    />
                    <label
                      htmlFor="medical_history"
                      className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-gray-500 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-25 peer-focus:-translate-y-4 left-1"
                    >
                      Medical history
                    </label>
                  </div>

                  {/* Emergency Number */}
                  <div className="relative  my-3">
                    <input
                      type="text"
                      id="emergency_contact"
                      placeholder="  "
                      name="medical_history"
                      onChange={(e) => setEmergencycontact(e.target.value)}
                      {...register("emergency_contact")}
                      className="block px-2.5 pb-2 pt-2.5 py-2.5 w-full rows-4 text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
                      //  required
                    />
                    <label
                      htmlFor="emergency_contact"
                      className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-gray-500 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-25 peer-focus:-translate-y-4 left-1"
                    >
                      Emergency contact
                    </label>
                  </div>
                  {/* Remarks */}
                  <div className="relative  my-3">
                    <input
                      type="text"
                      id="remarks"
                      name="remarks"
                      onChange={(e) => setRemarks(e.target.value)}
                      {...register("remarks")}
                      className="block px-2.5 pb-2 pt-2.5 py-2.5 w-full rows-4 text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
                      placeholder="  "
                    />
                    <label
                      htmlFor="remarks"
                      className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-gray-500 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-25 peer-focus:-translate-y-4 left-1"
                    >
                      Remarks
                    </label>
                  </div>
                  {/* Age */}
                  <div className="relative  my-3">
                    <input
                      type="text"
                      id="age"
                      name="age"
                      onChange={(e) => setAge(e.target.value)}
                      {...register("age")}
                      className="block px-2.5 pb-2 pt-2.5 py-2.5 w-full rows-4 text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
                      placeholder="  "
                      // required
                    />
                    <label
                      htmlFor="age"
                      className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-gray-500 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-25 peer-focus:-translate-y-4 left-1"
                    >
                      Age
                    </label>
                  </div>
                  {/* status */}
                  <div className="relative  my-3">
                    <select
                      name="status"
                      id="status"
                      {...register("status")}
                      defaultValue={singlePatient?.data?.status}
                      onChange={(e) => setStatus(e.target.value)}
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
                      required
                    >
                      {/* <option selected>status</option> */}
                      <option value="1">Active</option>
                      <option value="2">Inactive</option>
                      <option value="3">Pending</option>
                      <option value="4">Cancelled</option>
                      <option value="5">Deleted</option>
                    </select>
                    <label
                      htmlFor="remarks"
                      className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-gray-500 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-25 peer-focus:-translate-y-4 left-1"
                    >
                      Status
                    </label>
                  </div>
                  {/* State/City */}
                  <div className="relative  my-3">
                    {stateData?.data ? (
                      <div className="relative ">
                        <select
                          id="state_id"
                          {...register("state_id")}
                          type="text"
                          name="state_id"
                          defaultValue={singlePatient?.data?.state?.id}
                          onChange={(e) => setState(e.target.value)}
                          // {...register("state_id")}
                          className="block px-2.5 pb-2 pt-2.5 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
                        >
                          {stateData.data?.map((item) => (
                            <option key={item.id} value={`${item?.id}`}>
                              {`${item?.name} `}
                            </option>
                          ))}
                        </select>
                        <label
                          htmlFor="state_id"
                          className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-gray-500 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-25 peer-focus:-translate-y-4 left-1"
                        >
                          city/state
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
                  {/* area */}
                  <div className="relative  my-3">
                    <input
                      type="text"
                      id="area"
                      name="area"
                      onChange={(e) => setArea(e.target.value)}
                      {...register("area")}
                      className="block px-2.5 pb-2 pt-2.5 py-2.5 w-full rows-4 text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
                      placeholder="  "
                      required
                    />
                    <label
                      htmlFor="area"
                      className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-gray-500 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-25 peer-focus:-translate-y-4 left-1"
                    >
                      Area
                    </label>
                  </div>
                  {/* DOB Number */}
                  <div className="relative  my-3">
                    <input
                      type="text"
                      id="dob_number"
                      name="dob_number"
                      onChange={(e) => setDobnumber(e.target.value)}
                      {...register("dob_number")}
                      className="block px-2.5 pb-2 pt-2.5 py-2.5 w-full rows-4 text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
                      placeholder="  "
                      required
                    />
                    <label
                      htmlFor="dob_number"
                      className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-gray-500 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-25 peer-focus:-translate-y-4 left-1"
                    >
                      DOB number
                    </label>
                  </div>
                  {/* BSN Number */}
                  <div className="relative  my-3">
                    <input
                      type="text"
                      id="bsn_number"
                      name="bsn_number"
                      onChange={(e) => setBsnnumber(e.target.value)}
                      {...register("bsn_number")}
                      className="block px-2.5 pb-2 pt-2.5 py-2.5 w-full rows-4 text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
                      placeholder="  "
                      required
                    />
                    <label
                      htmlFor="bsn_number"
                      className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-gray-500 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-25 peer-focus:-translate-y-4 left-1"
                    >
                      BSN number
                    </label>
                  </div>
                  {/* password */}
                  {/* <div className="relative  mt-3">
                    <input
                      type="text"
                      name="password"
                      id="password"
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      // value="1"
                      // {...register("password")}
                      className="block px-2.5 pb-2 pt-2.5 py-2.5 w-full rows-4 text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
                      placeholder="••••••••"
                    />
                    <label
                      htmlFor="password"
                      className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-gray-500 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-25 peer-focus:-translate-y-4 left-1"
                    >
                      Password
                    </label>
                  </div> */}
                  {/* select file type3 */}
                  <div className="relative  my-3">
                    <select
                      id="file_type"
                      {...register("file_type")}
                      type="text"
                      defaultValue={singlePatient?.data?.file_type}
                      name="file_type"
                      onChange={(e) => setFiletype(e.target.value)}
                      required
                      className="block px-2.5 pb-2 pt-2.5 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
                    >
                      <option value="NID">Nid</option>
                      <option value="Driving">Driving</option>
                      <option value="Others">Others</option>
                    </select>
                    <label
                      htmlFor="file_type"
                      className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-gray-500 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-25 peer-focus:-translate-y-4 left-1"
                    >
                      File Type
                    </label>
                  </div>
                  {/* <Autocomplete
                         multiple
                         limitTags={2}
                         id="file_type"
                         options={documents}
                         getOptionLabel={(option) => option.title}
                         defaultValue={[documents[0], documents[1]]}
                         //  {...register("file_type")}
                         renderInput={(params) => (
                           <TextField
                             {...params}
                             label="File Type"
                             placeholder="Select file type"
                             size="small"
                           />
                         )}
                          
                       /> */}
                  {/*attach file  */}
                  <div className="relative  mt-3">
                    <input
                      className="block px-2.5 pb-2 pt-2.5 py-2.5 w-full rows-4 text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
                      placeholder="  "
                      type="file"
                      multiple
                      id="file"
                      // onClick={(e) => setPicture(e.target.value)}
                      // {...register("file")}
                    />

                    {/* <label
                           htmlFor="file"
                           className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-gray-500 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-25 peer-focus:-translate-y-4 left-1"
                         >
                           Attach file
                         </label> */}
                  </div>
                  {/* button */}
                  <div className=" flex justify-end">
                    <button
                      className="decoration-4 text-xl shadow mt-6   hover:bg-tea-300 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                      type="submit"
                      style={{ backgroundColor: "#01a9ac" }}
                    >
                      Save
                    </button>
                  </div>
                </table>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

export default PaitentForm;
