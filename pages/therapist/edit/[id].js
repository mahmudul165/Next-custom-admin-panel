import React, { useState } from "react";
//import DatePicker from "react-datepicker";
//import "react-datepicker/dist/react-datepicker.css";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import useAuth from "/hook/useAuth";
import { Skeleton, Stack } from "@mui/material";

import {
  useCountyListQuery,
  useBloodGroupQuery,
  useStateDataQuery,
  useTherapistTypeQuery,
} from "/hook/useApi";
import { ToastContainer } from "react-toastify/lib";
import { useRouter } from "next/router";
import { useQuery } from "react-query";

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
    //status: yup.string().required(),
  })
  .required();

function NewTherapistForm() {
  const { updateData } = useAuth();
  const { register, handleSubmit, error } = useForm({
    resolver: yupResolver(schema),
  });

  const { data: countryList } = useCountyListQuery();
  const { data: bloodGroup } = useBloodGroupQuery();
  const { data: stateData } = useStateDataQuery();
  const { data: therapistType } = useTherapistTypeQuery();
  const router = useRouter();
  const { id } = router.query;
  const fetchSingleTherapist = async () => {
    const response = await fetch(
      `https://misiapi.lamptechs.com/api/v1/therapist/show?id=${id}`,
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );
    return await response.json();
  };
  const useTherapistQuery = () =>
    useQuery(["fetchSingleTherapist"], fetchSingleTherapist);
  const { data: singleTherapist } = useTherapistQuery();
  console.log("edit single appointment data data", singleTherapist);
  //console.log("router is", router);
  //required field
  //const [id, setId] = React.useState();
  const [therapist_type_id, setTherapist] = React.useState();
  const [first_name, setFirst] = React.useState();
  const [last_name, setLast] = React.useState();
  const [email, setEmail] = React.useState();
  const [phone, setPhone] = React.useState();
  //const [password, setPassword] = React.useState();
  const [status, setStatus] = React.useState();
  const [ShowImage, setShowimage] = useState("");
  // const [picture, setPicture] = React.useState();
  // const [file_type, setFiletype] = React.useState();
  // not required field

  const [address, setAddress] = React.useState();
  const [country_id, setCountry] = React.useState();
  const [state_id, setState] = React.useState();
  const [blood_group_id, setBloodgroup] = React.useState();
  const [area, setArea] = React.useState();
  const [bsn_number, setBsnnumber] = React.useState();
  const [dob_number, setDobnumber] = React.useState();
  const [insurance_number, setInsurancenumber] = React.useState();
  const [language, setLanguage] = React.useState();
  const [age, setAge] = React.useState();
  const [gender, setGender] = React.useState();
  const [emergency_contact, setEmergencycontact] = React.useState();
  const [date_of_birth, setDob] = React.useState();
  // const [remarks, setRemarks] = React.useState();
  // const [marital_status, setMaritalstatus] = React.useState();
  // const [medical_history, setMedical] = React.useState();
  // const [Occupation, setOccupation] = React.useState();
  //const [city, setCity] = React.useState();
  // const [source, setSource] = React.useState();
  // const [alternet_phone, setAlternetphone] = React.useState();

  console.log(
    "from data",
    therapist_type_id,
    first_name,
    last_name,
    email,
    phone,
    address,
    country_id,
    state_id,
    blood_group_id,
    bsn_number,
    dob_number,
    insurance_number,
    language,
    gender,
    emergency_contact,
    date_of_birth,
    //id,
    // therapist_type_id,
    // first_name,
    // last_name,
    // email,
    // phone,
    //password,
    status
    //ShowImage,
    //address,
    //country_id
    // picture
  );
  // const [show, setShow] = React.useState();
  var loadFile = (e) => {
    if (e.target.files[0]) {
      setShowimage(URL.createObjectURL(e.target.files[0]));
      // setPicture(e.target.files[0]);
      console.log(URL.createObjectURL(e.target.files[0]));
    }
  };
  const handleSubmitForm = (e) => {
    e.preventDefault();
    let formData = new FormData();
    //required field
    //formData.append("id", id);
    formData.append("therapist_type_id", therapist_type_id);
    formData.append("first_name", first_name);
    formData.append("last_name", last_name);
    formData.append("email", email);
    formData.append("phone", phone);
    //formData.append("password", password);
    formData.append("status", status);
    //formData.append("picture", picture);
    //formData.append("file_type", file_type);

    // not required field
    formData.append("address", address);
    formData.append("state_id", state_id);
    formData.append("country_id", country_id);
    formData.append("blood_group_id", blood_group_id);
    formData.append("area", area);
    formData.append("bsn_number", bsn_number);
    formData.append("dob_number", dob_number);
    formData.append("insurance_number", insurance_number);
    formData.append("age", age);
    formData.append("gender", gender);
    formData.append("language", language);
    formData.append("emergency_contact", emergency_contact);
    formData.append("date_of_birth", date_of_birth);
    // formData.append("marital_status ", marital_status);
    //formData.append("medical_history", medical_history);
    //formData.append("occupation", Occupation);
    //formData.append("alternet_phone ", alternet_phone);

    // formData.append("remarks", remarks);

    // the image shoud be same {image,file direction}
    updateData(
      `https://misiapi.lamptechs.com/api/v1/therapist/update/${router.query?.id}`,
      formData
    );
  };
  return (
    <>
      {" "}
      <>
        <form
          className="w-full m-auto  p-1  "
          onSubmit={
            handleSubmitForm

            //   handleSubmit(
            //   (d) =>
            //   postData("https://misiapi.lamptechs.com/api/v1/therapist/store", d)
            // )
          }
        >
          {/* mx-4  px-12  */}
          <div className="container  rounded bg-white ">
            <div className="container mx-4  px-12    rounded bg-white ">
              <div className="grid    px-8 grid-cols-2 justify-center  gap-4  pl-3.5">
                <div className="flex justify-center items-center">
                  <h2
                    className="col-start-1  text-center text-3xl   font-extrabold    "
                    style={{ color: "#01a9ac" }}
                  >
                    Update new therapist
                    {/* id: {singleTicket.data?.id} */}
                  </h2>
                </div>
                {/* button download and save */}
                <div className="col-start-2 my-3 px-3 md:flex md:items-center justify-center ">
                  <div
                    className="inline-flex rounded-md shadow-sm"
                    role="group"
                  >
                    <button
                      onClick={() => router.push(`/therapist`)}
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
                <div className="col-md-5 ">
                  <div className="flex justify-center items-center w-full  ">
                    <label
                      htmlFor="picture"
                      style={{
                        height: "240px",
                        width: "240px",
                        borderRadius: "50%",
                      }}
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
                          {/* or drag and drop */}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {/* SVG, PNG, JPG or GIF (MAX. 500x500px) */}
                        </p>
                      </div>
                      <input
                        // id="picture"
                        // type="file"
                        // {...register("picture")}
                        className="hidden"
                        type="file"
                        name="picture"
                        id="picture"
                        // onChange={(e) => setPicture(e.target.files[0])}
                        onChange={loadFile}
                      />
                      {singleTherapist?.data?.upload_files.map((item) => (
                        // <option key={item.id} value={`${item?.id}`}>
                        //   {`${item?.name} `}
                        // </option>
                        <>
                          {/* {ShowImage
                            ? ShowImage
                            : item?.file_url ===
                              "https://misiapi.lamptechs.com/"
                            ? item?.file_url
                            : "https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"} */}

                          <img
                            className="absolute"
                            src={ShowImage ? ShowImage : item?.file_url}
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
                        </>
                      ))}
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
                    {/* <div className="relative my-2">
                      <input
                        type="text"
                        id="id"
                        name="id"
                        className="hidden  block px-2.5 pb-2 pt-2.5 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
                        placeholder="  "
                        defaultValue={singleTherapist?.data?.id}
                        //onChange={(e) => setId(e.target.value)}
                        //{...register("id")}
                      />

                      <label
                        htmlFor="id"
                        className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-teal-500 peer-focus:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-25 peer-focus:-translate-y-4 left-1"
                      ></label>
                    </div> */}

                    {/* Patient Source */}
                    {/* <div className="relative my-3">
                <select className="block px-2.5 pb-2 pt-2.5 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer">
                  <option selected>Select patient source</option>
                  <option value="male">ZD</option>
                  <option value="female">Own</option>
                  <option value="others">Others</option>
                </select>
                <label
                  htmlFor="floating_outlined"
                  className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-teal-500 peer-focus:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-25 peer-focus:-translate-y-4 left-1"
                >
                  Patient source
                </label>
              </div> */}

                    {/* therapist type */}
                    <div className="relative mt-2.5">
                      {therapistType?.data ? (
                        <div className="relative my-3">
                          <select
                            id="therapist_type_id"
                            name="therapist_type_id"
                            onChange={(e) => setTherapist(e.target.value)}
                            defaultValue={
                              singleTherapist?.data?.therapist_type?.id
                            }
                            className="block px-2.5 pb-2 pt-2.5 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
                          >
                            {/* <option selected>Select therapist type</option> */}
                            {therapistType.data?.map((item) => (
                              <option key={item.id} value={`${item?.id}`}>
                                {`${item?.name} `}
                              </option>
                            ))}
                          </select>
                          <label
                            htmlFor="therapist_type_id"
                            className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-teal-500 peer-focus:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-25 peer-focus:-translate-y-4 left-1"
                          >
                            Therapist type
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
                    {/* first Name  */}
                    <div className="relative mt-2.5">
                      <input
                        type="text"
                        id="first_name"
                        name="first_name"
                        onChange={(e) => setFirst(e.target.value)}
                        defaultValue={singleTherapist?.data?.first_name}
                        className="block px-2.5 pb-2 pt-2.5 py-2.5 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
                        placeholder="  "
                        required
                      />
                      <label
                        htmlFor="first_name"
                        className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-teal-500 peer-focus:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-25 peer-focus:-translate-y-4 left-1"
                      >
                        First Name
                      </label>
                    </div>
                    {/* last Name  */}
                    <div className="relative mt-2.5">
                      <input
                        type="text"
                        id="last_name"
                        // {...register("last_name")}
                        name="last_name"
                        defaultValue={singleTherapist?.data?.last_name}
                        onChange={(e) => setLast(e.target.value)}
                        className="block px-2.5 pb-2 pt-2.5 py-2.5 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
                        placeholder="  "
                        required
                      />
                      <label
                        htmlFor="last_name"
                        className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-teal-500 peer-focus:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-25 peer-focus:-translate-y-4 left-1"
                      >
                        Last Name
                      </label>
                    </div>
                    {/* email   */}
                    <div className="relative mt-2.5">
                      <input
                        type="text"
                        name="email"
                        defaultValue={singleTherapist?.data?.email}
                        onChange={(e) => setEmail(e.target.value)}
                        id="email"
                        //{...register("email")}
                        className="block px-2.5 pb-2 pt-2.5 py-2.5 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
                        placeholder="  "
                        required
                      />
                      <label
                        htmlFor="email"
                        className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-teal-500 peer-focus:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-25 peer-focus:-translate-y-4 left-1"
                      >
                        Email
                      </label>
                    </div>
                    {/* phone  */}
                    <div className="relative mt-2.5">
                      <input
                        type="text"
                        id="phone"
                        //{...register("phone")}
                        name="phone"
                        defaultValue={singleTherapist?.data?.phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="block px-2.5 pb-2 pt-2.5 py-2.5 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
                        placeholder="  "
                        required
                      />
                      <label
                        htmlFor="phone"
                        className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-teal-500 peer-focus:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-25 peer-focus:-translate-y-4 left-1"
                      >
                        Phone number
                      </label>
                    </div>
                    {/* Residential Address */}
                    <div className="relative mt-2.5">
                      <textarea
                        className="block px-2.5 pb-2 pt-2.5 py-2.5 w-full rows-4 text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
                        type="text"
                        id="address"
                        {...register("address")}
                        //{...register("phone")}
                        name="address"
                        defaultValue={singleTherapist?.data?.address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="  "
                      />
                      <label
                        htmlFor="inline-full-name"
                        className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-teal-500 peer-focus:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-25 peer-focus:-translate-y-4 left-1"
                      >
                        Residential address
                      </label>
                    </div>
                    {/* country */}
                    <div className="relative mt-2.5">
                      {countryList?.data ? (
                        <div className="relative my-3">
                          <select
                            id="country_id"
                            name="country_id"
                            defaultValue={singleTherapist?.data?.country?.id}
                            onChange={(e) => setCountry(e.target.value)}
                            // {...register("country_id")}
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
                            className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-teal-500 peer-focus:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-25 peer-focus:-translate-y-4 left-1"
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
                    <div className="relative mt-2.5">
                      {bloodGroup?.data ? (
                        <div className="relative my-3">
                          <select
                            id="blood_group_id"
                            name="blood_group_id"
                            defaultValue={
                              singleTherapist?.data?.blood_group?.id
                            }
                            onChange={(e) => setBloodgroup(e.target.value)}
                            required
                            // {...register("blood_group_id")}
                            className="block px-2.5 pb-2 pt-2.5 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
                          >
                            {bloodGroup.data?.map((item) => (
                              <option key={item.id} value={`${item?.id}`}>
                                {`${item?.name} `}
                              </option>
                            ))}
                          </select>
                          <label
                            htmlFor="blood_group_id"
                            className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-teal-500 peer-focus:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-25 peer-focus:-translate-y-4 left-1"
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
                    {/* State/City */}
                    <div className="relative mt-2.5">
                      {stateData?.data ? (
                        <div className="relative ">
                          <select
                            id="state_id"
                            name="state_id"
                            defaultValue={singleTherapist?.data?.state?.id}
                            onChange={(e) => setState(e.target.value)}
                            //{...register("state_id")}
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
                            className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-teal-500 peer-focus:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-25 peer-focus:-translate-y-4 left-1"
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
                  </table>
                  {/* end */}
                </div>
                <div className="col-md-5  border-l-2 mt-3">
                  <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
                    {/* area */}
                    <div className="relative mt-2.5">
                      <input
                        type="text"
                        id="area"
                        name="area"
                        onChange={(e) => setArea(e.target.value)}
                        //  {...register("area")}
                        className="block px-2.5 pb-2 pt-2.5 py-2.5 w-full rows-4 text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
                        placeholder="  "
                        // required
                      />
                      <label
                        htmlFor="area"
                        className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-teal-500 peer-focus:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-25 peer-focus:-translate-y-4 left-1"
                      >
                        Area
                      </label>
                    </div>
                    {/* DOB Number */}
                    <div className="relative mt-2.5">
                      <input
                        type="text"
                        id="dob_number"
                        name="dob_number"
                        defaultValue={singleTherapist?.data?.dob_number}
                        onChange={(e) => setDobnumber(e.target.value)}
                        // {...register("dob_number")}
                        className="block px-2.5 pb-2 pt-2.5 py-2.5 w-full rows-4 text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
                        placeholder="  "
                        required
                      />
                      <label
                        htmlFor="dob_number"
                        className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-teal-500 peer-focus:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-25 peer-focus:-translate-y-4 left-1"
                      >
                        DOB number
                      </label>
                    </div>
                    {/* BSN Number */}
                    <div className="relative mt-2.5">
                      <input
                        type="text"
                        id="bsn_number"
                        name="bsn_number"
                        defaultValue={singleTherapist?.data?.bsn_number}
                        onChange={(e) => setBsnnumber(e.target.value)}
                        //{...register("bsn_number")}
                        className="block px-2.5 pb-2 pt-2.5 py-2.5 w-full rows-4 text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
                        placeholder="  "
                        required
                      />
                      <label
                        htmlFor="bsn_number"
                        className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-teal-500 peer-focus:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-25 peer-focus:-translate-y-4 left-1"
                      >
                        BSN number
                      </label>
                    </div>
                    {/* insurance_number*/}
                    <div className="relative mt-2.5">
                      <input
                        type="text"
                        id="insurance_number"
                        name="insurance_number"
                        defaultValue={singleTherapist?.data?.insurance_number}
                        onChange={(e) => setInsurancenumber(e.target.value)}
                        //{...register("insurance_number")}
                        className="block px-2.5 pb-2 pt-2.5 py-2.5 w-full rows-4 text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
                        placeholder="  "
                        required
                      />
                      <label
                        htmlFor="insurance_number"
                        className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-teal-500 peer-focus:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-25 peer-focus:-translate-y-4 left-1"
                      >
                        Insurance number
                      </label>
                    </div>
                    {/* DATE OF birth */}
                    <div className="relative mt-2.5">
                      <input
                        type="date"
                        id="date_of_birth"
                        name="date_of_birth"
                        // defaultValue={singleTherapist?.data?.date_of_birth}
                        onChange={(e) => setDob(e.target.value)}
                        //{...register("date_of_birth")}
                        className="block px-2.5 pb-2 pt-2.5 py-2.5 w-full rows-4 text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
                        placeholder="  "
                        required
                      />
                      <label
                        htmlFor="date_of_birth"
                        className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-teal-500 peer-focus:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-25 peer-focus:-translate-y-4 left-1"
                      >
                        Date of birth
                      </label>
                    </div>
                    {/* gender  */}
                    <div className="relative mt-2.5">
                      <select
                        id="gender"
                        name="gender"
                        defaultValue={singleTherapist?.data?.gender}
                        onChange={(e) => setGender(e.target.value)}
                        // {...register("gender")}
                        className="block px-2.5 pb-2 pt-2.5 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
                      >
                        <option selected>Select gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Others">Others</option>
                      </select>
                      <label
                        htmlFor="gender"
                        className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-teal-500 peer-focus:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-25 peer-focus:-translate-y-4 left-1"
                      >
                        Gender
                      </label>
                    </div>

                    {/* Medical History */}
                    {/* <div className="relative my-3">
                <textarea
                  id="medical_history"
                  {...register("medical_history")}
                  className="block px-2.5 pb-2 pt-2.5 py-2.5 w-full rows-4 text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
                  type="text"
                  placeholder="  "
                />
                <label
                  htmlFor="textarea"
                  className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-teal-500 peer-focus:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-25 peer-focus:-translate-y-4 left-1"
                >
                  Medical history
                </label>
              </div> */}
                    {/* select file  and attach file  */}
                    {/* <div className="grid   grid-cols-2  gap-4 mt-2.5"> */}
                    {/* <div className="  relative  my-3">
                  <select
                    id="file_type"
                
                    className="block px-2.5 pb-2 pt-2.5 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
                  >
                    <option selected>Select file type</option>
                    <option value="male">Nid</option>
                    <option value="female">Passport</option>
                    <option value="others">Others</option>
                  </select>
                  <label
                    htmlFor="file_type"
                    className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-teal-500 peer-focus:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-25 peer-focus:-translate-y-4 left-1"
                  >
                    File Type
                  </label>
                </div> */}

                    {/*attach file  */}
                    {/* <div className=" relative my-3 ">
                  <input
                    className="block px-2.5 pb-2 pt-2.5 py-2.5 w-full rows-4 text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
                    placeholder="  "
                    required
                    type="file"
                    id="formFileMultiple"
                    multiple
                    {...register("formFileMultiple")}
                  />

                  <label
                    htmlFor="formFileMultiple"
                    className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-teal-500 peer-focus:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-25 peer-focus:-translate-y-4 left-1"
                  >
                    Attach file
                  </label>
                </div> */}

                    {/* </div> */}

                    {/* Emergency Number */}
                    <div className="   relative my-3">
                      <input
                        type="text"
                        id="emergency_contact"
                        name="emergency_contact"
                        defaultValue={singleTherapist?.data?.emergency_contact}
                        onChange={(e) => setEmergencycontact(e.target.value)}
                        //{...register("emergency_contact")}
                        className="block px-2.5 pb-2 pt-2.5 py-2.5 w-full rows-4 text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
                        placeholder="  "
                        required
                      />
                      <label
                        htmlFor="emergency_contact"
                        className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-teal-500 peer-focus:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-25 peer-focus:-translate-y-4 left-1"
                      >
                        Emergency contact
                      </label>
                    </div>
                    {/* language */}
                    <div id="language" className="relative my-3">
                      <select
                        id="language"
                        name="language"
                        defaultValue={singleTherapist?.data?.language}
                        onChange={(e) => setLanguage(e.target.value)}
                        //{...register("language")}
                        className="block px-2.5 pb-2 pt-2.5 py-2.5 w-full rows-4 text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
                      >
                        <option selected>Select Language</option>
                        <option value="Dutch">Dutch</option>
                        <option value="English">English</option>
                        <option value="Hindi">Hindi</option>
                        <option value="Others">Others</option>
                      </select>
                      <label
                        htmlFor="language"
                        className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-teal-500 peer-focus:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-25 peer-focus:-translate-y-4 left-1"
                      >
                        Language
                      </label>
                    </div>
                    {/* Age */}
                    <div className="relative my-3">
                      <input
                        type="text"
                        id="age"
                        name="age"
                        defaultValue={singleTherapist?.data?.age}
                        onChange={(e) => setAge(e.target.value)}
                        // {...register("age")}
                        className="block px-2.5 pb-2 pt-2.5 py-2.5 w-full rows-4 text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
                        placeholder="  "
                        //required
                      />
                      <label
                        htmlFor="age"
                        className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-teal-500 peer-focus:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-25 peer-focus:-translate-y-4 left-1"
                      >
                        Age
                      </label>
                    </div>
                    {/* status */}
                    <div className="relative my-3">
                      <select
                        id="status"
                        name="status"
                        defaultValue={singleTherapist?.data?.status}
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
                        // {...register("status")}
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
                        className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-teal-500 peer-focus:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-25 peer-focus:-translate-y-4 left-1"
                      >
                        Status
                      </label>
                    </div>
                    {/* select file  and attach file  */}

                    {/* select file type3 */}
                    {/* <div className="  relative   ">
                  <select
                    id="file_type"
                    {...register("file_type")}
                    className="block px-2.5 pb-2 pt-2.5 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
                  >
                    <option selected>Select file type</option>
                    <option value="NID">Nid</option>
                    <option value="Passport">Passport</option>
                    <option value="Others">Others</option>
                  </select>
                  <label
                    htmlFor="file_type"
                    className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-teal-500 peer-focus:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-25 peer-focus:-translate-y-4 left-1"
                  >
                    File Type
                  </label>
                </div> */}
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
                    <div className=" relative   ">
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
                        className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-teal-500 peer-focus:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-25 peer-focus:-translate-y-4 left-1"
                      >
                        Attach file
                      </label> */}
                    </div>

                    {/* password */}
                    {/* <div className="relative mt-2.5   ">
                      <input
                        type="text"
                        id="password"
                        name="password"
                        onChange={(e) => setPassword(e.target.value)}
                        // value="1"
                        // {...register("password")}
                        className="block px-2.5 pb-2 pt-2.5 py-2.5 w-full rows-4 text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
                        placeholder="••••••••"
                        required
                      />
                      <label
                        htmlFor="password"
                        className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-teal-500 peer-focus:text-gray-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-25 peer-focus:-translate-y-4 left-1"
                      >
                        Password
                      </label>
                    </div> */}
                    {/* button */}
                    <div className=" flex justify-end">
                      <button
                        className="decoration-4 text-xl shadow mt-3   hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
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
    </>
  );
}

export default NewTherapistForm;
