// import React from "react";

// function PatientProfile() {
//   return <></>;
// }

// export default PatientProfile;

// import React from "react";

// function FileUpload() {
//   const [file, setFile] = React.useState("");
//   function handleUpload(event) {
//     setFile(event.target.files[0]);
//   }
//   console.log("file", URL.createObjectURL(file));
//   return (
//     <div id="upload-box">
//       <input type="file" onChange={(e) => setFile(e.target.files[0])} />
//       {file && <img src={URL?.createObjectURL(file)} alt={file.name} />}
//     </div>
//   );
// }

// export default function App() {
//   return <FileUpload />;
// }

// import React from "react";
// import { useForm } from "react-hook-form";

// function App() {
//   const { register, handleSubmit } = useForm();

//   const onSubmit = async (data) => {
//     const formData = new FormData();
//     formData.append("file", data.file[0]);

//     const res = await fetch("http://localhost:5000/upload-file", {
//       method: "POST",
//       body: formData,
//     }).then((res) => res.json());
//     alert(JSON.stringify(`${res.message}, status: ${res.status}`));
//   };

//   return (
//     <div className="App">
//       <form onSubmit={handleSubmit(onSubmit)}>
//         <input type="file" {...register("file")} />
//         <input type="submit" />
//       </form>
//     </div>
//   );
// }

// export default App;

import React, { useState } from "react";
import DatePicker from "react-datepicker";
//import "react-datepicker/dist/react-datepicker.css";
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
} from "../../hook/useApi";
//import { DropzoneArea } from "material-ui-dropzone";
function PaitentForm({ title, data }) {
  const { postData } = useAuth();
  const [startDate, setStartDate] = useState(new Date());
  const [avater, setAvater] = React.useState(null);
  const [selectedFile, setSelectedFile] = useState();
  //const [file, setFile] = React.useState("");
  const [picture, setPicture] = useState("");
  //console.log("picture upload", picture);
  //const formData = new FormData();
  // formData.append("image", avater);
  // console.log("image upload", avater);
  const { data: countryList } = useCountyListQuery();
  const { data: bloodGroup } = useBloodGroupQuery();
  const { data: stateData } = useStateDataQuery();
  const { data: occupation } = useOccupationQuery();
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

  // const handleCalendarOpen = () => console.log("Calendar opened");
  // const changeHandler = (event) => {
  //   setSelectedFile(event.target.files[0]);
  //   // setIsSelected(true);
  // };
  const uploadPicture = (e) => {
    e.preventDefault();
    let formData = new FormData();
    // the image shoud be same {image,file direction}
    formData.append("image", e.target.image.files[0]);
    //  console.log("file name", e.target.files[0]);
    setSelectedFile(formData);
  };
  // const onSubmit = (e) => {
  //   // e.preventDefault();
  //   let formData = new FormData();
  //   // the image shoud be same {image,file direction}
  //   formData.append("image", e.target?.image?.files[0]);
  //   // formData.append("key", `${"b0dc26bb96f8354ddda579bf02d8d178"}`);
  //   setSelectedFile(formData);
  //   console.log("img ", selectedFile);
  //   postData("https://misiapi.lamptechs.com/api/v1/patient/store", d);
  // };
  return (
    <>
      {/* create patient form */}
      <form
        className="w-10/12 m-auto   first-line: "
        type="submit"
        onSubmit={handleSubmit(
          // onSubmit
          (d) =>
            postData("https://misiapi.lamptechs.com/api/v1/patient/store", d)
          //console.log("post data patient ", d)
        )}
      >
        {/* postData("https://misiapi.lamptechs.com/api/v1/patient/store", d)  console.log("data patient", d)*/}
        <div className=" px-3">
          <div className=" card d-flex      justify-center ">
            <h2
              className="mt-3 text-center text-3xl font-extrabold  "
              style={{ color: "#01a9ac" }}
            >
              Create new patient
            </h2>
            {/*form */}
            <div className=" my-5 p-3 ">
              <input
                id="image"
                type="file"
                name="image"
                value={selectedFile}
                onChange={uploadPicture}
                {...register("image")}
              />
              {/* <div className="flex justify-center items-center w-full  ">
                <label
                  htmlFor="image"
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
                    id="image"
                    type="file"
                    name="image"
                    value={selectedFile}
                    className=" "
                    // onChange={(e) => setAvater(e.target?.files)}
                    onChange={uploadPicture}
                    // onChange={(e) => console.log("Files:", e.target.files[0])}
                    //uploadPicture
                    // {...register(`${image}`)}
                    {...register("image")}
                  />
                </label>
              </div> */}
              {/* Patient id*/}
              <div className="relative my-2">
                <input
                  type="text"
                  id="id"
                  value="0"
                  className="hidden block px-2.5 pb-2 pt-2.5 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
                  placeholder="  "
                  {...register("id")}
                />

                <label
                  htmlFor="id"
                  className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-teal-500 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                >
                  Patient Id
                </label>
              </div>
              {/* Patient Source */}
              <div className="relative my-2">
                <select
                  className="block px-2.5 pb-2 pt-2.5 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
                  id="source"
                  {...register("source")}
                >
                  <option selected>Select patient source</option>
                  <option value="ZD">ZD</option>
                  <option value="Own">Own</option>
                  <option value="Others">Others</option>
                </select>
                <label
                  htmlFor="floating_outlined"
                  className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-teal-500 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                >
                  Patient source
                </label>
              </div>
              {/* name */}
              <div className="grid  gap-4 mt-2.5">
                {/* first Name  */}
                <div className="col-start-1 relative   ">
                  <input
                    type="text"
                    id="first_name"
                    {...register("first_name")}
                    className="block px-2.5 pb-2 pt-2.5 py-2.5 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
                    // required
                  />
                  <label
                    htmlFor="first_name"
                    className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-teal-500 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                  >
                    First Name
                  </label>
                </div>
                {/* last Name  */}
                <div className="col-start-2  relative   ">
                  <input
                    type="text"
                    id="last_name"
                    {...register("last_name")}
                    className="block px-2.5 pb-2 pt-2.5 py-2.5 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
                    placeholder="  "
                    // required
                  />
                  <label
                    htmlFor="last_name"
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
                    type="text"
                    id="email"
                    {...register("email")}
                    className="block px-2.5 pb-2 pt-2.5 py-2.5 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
                    placeholder="  "
                    //required
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
                    //required
                  />
                  <label
                    htmlFor="phone"
                    className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-teal-500 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                  >
                    Phone number
                  </label>
                </div>
              </div>
              <div className="grid  gap-4 my-2.5">
                {/*alternative  phone  */}
                <div className="  relative   ">
                  <input
                    type="text"
                    id="alternet_phone"
                    {...register("alternet_phone")}
                    className="block px-2.5 pb-2 pt-2.5 py-2.5 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
                    placeholder="  "
                    // required
                  />
                  <label
                    htmlFor="alternet_phone"
                    className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-teal-500 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                  >
                    Alternet phone
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
                />
                <label
                  htmlFor="inline-full-name"
                  className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-teal-500 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                >
                  Residential address
                </label>
              </div>
              {/* country  and blood  */}
              <div className="grid grid-cols-2  gap-4 mt-2.5">
                {/* country */}

                <div className="col-start-1 relative">
                  {countryList?.data ? (
                    <div className="relative my-3">
                      <select
                        id="country_id"
                        {...register("country_id")}
                        className="block px-2.5 pb-2 pt-2.5 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
                      >
                        <option selected>Country</option>
                        {countryList.data?.map((item) => (
                          <option key={item.id} value={`${item?.id}`}>
                            {`${item?.name} `}
                          </option>
                        ))}
                      </select>
                      <label
                        htmlFor="country_id"
                        className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-teal-500 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
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
                <div className="col-start-2 relative">
                  {bloodGroup?.data ? (
                    <div className="relative my-3">
                      <select
                        id="blood_group_id"
                        {...register("blood_group_id")}
                        className="block px-2.5 pb-2 pt-2.5 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
                      >
                        <option selected>Blood group</option>
                        {bloodGroup.data?.map((item) => (
                          <option key={item.id} value={`${item?.id}`}>
                            {`${item?.name} `}
                          </option>
                        ))}
                      </select>
                      <label
                        htmlFor="blood_group_id"
                        className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-teal-500 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
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
              </div>
              {/* state  and area */}
              <div className="grid   grid-cols-2  gap-4 mt-2.5">
                {/* State/City */}
                <div className="col-start-1 relative">
                  {stateData?.data ? (
                    <div className="relative ">
                      <select
                        id="state_id"
                        {...register("state_id")}
                        className="block px-2.5 pb-2 pt-2.5 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
                      >
                        <option selected> Select city/state</option>
                        {stateData.data?.map((item) => (
                          <option key={item.id} value={`${item?.id}`}>
                            {`${item?.name} `}
                          </option>
                        ))}
                      </select>
                      <label
                        htmlFor="state_id"
                        className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-teal-500 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
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
                <div className="col-start-2  relative  ">
                  <input
                    type="text"
                    id="area"
                    {...register("area")}
                    className="block px-2.5 pb-2 pt-2.5 py-2.5 w-full rows-4 text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
                    placeholder="  "
                    // required
                  />
                  <label
                    htmlFor="area"
                    className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-teal-500 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                  >
                    Area
                  </label>
                </div>
              </div>
              {/* Dob and BNS */}
              <div className="grid  gap-4 mt-2.5">
                {/* DOB Number */}
                <div className="col-start-1 relative  ">
                  <input
                    type="text"
                    id="dob_number"
                    {...register("dob_number")}
                    className="block px-2.5 pb-2 pt-2.5 py-2.5 w-full rows-4 text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
                    placeholder="  "
                    //required
                  />
                  <label
                    htmlFor="dob_number"
                    className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-teal-500 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                  >
                    DOB number
                  </label>
                </div>
                {/* BSN Number */}
                <div className="col-start-2 relative  ">
                  <input
                    type="text"
                    id="bsn_number"
                    {...register("bsn_number")}
                    className="block px-2.5 pb-2 pt-2.5 py-2.5 w-full rows-4 text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
                    placeholder="  "
                    //required
                  />
                  <label
                    htmlFor="bsn_number"
                    className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-teal-500 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                  >
                    BSN number
                  </label>
                </div>
              </div>
              {/* insurance_number insurance_number_number_number AND DATE OF BIRTH */}
              <div className="grid grid-cols-2 gap-4 mt-2.5">
                {/* insurance_number_number*/}
                <div className="col-start-1 relative  ">
                  <input
                    type="text"
                    id="insurance_number "
                    {...register("insurance_number")}
                    className="block px-2.5 pb-2 pt-2.5 py-2.5 w-full rows-4 text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
                    placeholder="  "
                    //required
                  />
                  <label
                    htmlFor="insurance_number"
                    className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-teal-500 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                  >
                    insurance number
                  </label>
                </div>
                {/* DATE OF birth */}
                <div className="col-start-2 relative  ">
                  <input
                    type="date"
                    id="date_of_birth"
                    {...register("date_of_birth")}
                    className="block px-2.5 pb-2 pt-2.5 py-2.5 w-full rows-4 text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
                    placeholder="  "
                    //required
                  />

                  <label
                    htmlFor="date_of_birth"
                    className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-teal-500 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                  >
                    Date of birth
                  </label>
                </div>
              </div>
              {/* Marital status and occupation */}
              <div className="grid   grid-cols-2  gap-4 mt-2.5">
                {/* Marital status*/}
                <div className="  relative  ">
                  <select
                    id="marital_status"
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
                    className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-teal-500 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                  >
                    Marital status
                  </label>
                </div>
                {/* occupation */}
                {occupation?.data ? (
                  <div className="relative  ">
                    <select
                      id="occupation"
                      {...register("occupation")}
                      className="block px-2.5 pb-2 pt-2.5 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
                    >
                      <option selected>select occupation</option>
                      {occupation.data?.map((item) => (
                        <option key={item.id} value={`${item?.id}`}>
                          {`${item?.name} `}
                        </option>
                      ))}
                    </select>
                    <label
                      htmlFor="occupation"
                      className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-teal-500 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
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
              </div>
              {/* sex and blood */}
              <div className="grid gap-4 grid-cols-1 mt-2.5">
                {/* sex  */}
                <div className=" relative   ">
                  <select
                    id="gender"
                    {...register("gender")}
                    className="block px-2.5 pb-2 pt-2.5 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
                  >
                    <option selected>Select sex</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Others">Others</option>
                  </select>
                  <label
                    htmlFor="gender"
                    className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-teal-500 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                  >
                    Sex
                  </label>
                </div>
              </div>

              {/* Medical History */}
              <div className="relative  mt-2.5">
                {/* <input
                  type="text-area"
                  id="floating_outlined"
                  className="block px-2.5 pb-2 pt-2.5 py-2.5 w-full rows-4 text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
                  placeholder="  "
                  required
                />  */}
                <textarea
                  className="block px-2.5 pb-2 pt-2.5 py-2.5 w-full rows-4 text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
                  id="medical_history"
                  {...register("medical_history")}
                  type="text"
                  placeholder="  "
                />
                <label
                  htmlFor="medical_history"
                  className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-teal-500 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                >
                  Medical history
                </label>
              </div>
              {/* select file  and attach file  */}
              <div className="grid   grid-cols-2  gap-4 mt-2.5">
                {/* select file type3 */}
                <div className="  relative   ">
                  <select
                    id="file_type"
                    {...register("file_type")}
                    required
                    className="block px-2.5 pb-2 pt-2.5 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
                  >
                    <option selected>Select file type</option>
                    <option value="NID">Nid</option>
                    <option value="Driving">Driving</option>
                    <option value="Others">Others</option>
                  </select>
                  <label
                    htmlFor="file_type"
                    className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-teal-500 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
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
                <div className=" relative   ">
                  <input
                    className="block px-2.5 pb-2 pt-2.5 py-2.5 w-full rows-4 text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
                    placeholder="  "
                    type="file"
                    multiple
                    id="file"
                    onClick={(e) => setPicture(e.target.value)}
                    {...register("file")}
                  />

                  {/* <label
                        htmlFor="file"
                        className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-teal-500 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                      >
                        Attach file
                      </label> */}
                </div>
              </div>
              {/* emergency contract and remarks */}
              <div className="grid  gap-4 my-2.5">
                {/* Emergency Number */}
                <div className="col-start-1  relative  ">
                  <input
                    type="text"
                    id="emergency_contact"
                    {...register("emergency_contact")}
                    className="block px-2.5 pb-2 pt-2.5 py-2.5 w-full rows-4 text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
                    placeholder="  "
                    //  required
                  />
                  <label
                    htmlFor="emergency_contact"
                    className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-teal-500 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                  >
                    Emergency contact
                  </label>
                </div>
                {/* Remarks */}
                <div className="col-start-2  relative  ">
                  <input
                    type="text"
                    id="remarks"
                    {...register("remarks")}
                    className="block px-2.5 pb-2 pt-2.5 py-2.5 w-full rows-4 text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
                    placeholder="  "
                  />
                  <label
                    htmlFor="remarks"
                    className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-teal-500 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                  >
                    Remarks
                  </label>
                </div>
              </div>
              {/* age and status */}
              <div className="grid   grid-cols-2  gap-4 mt-2.5">
                {/* Age */}
                <div className="col-start-1  relative   ">
                  <input
                    type="text"
                    id="age"
                    {...register("age")}
                    className="block px-2.5 pb-2 pt-2.5 py-2.5 w-full rows-4 text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
                    placeholder="  "
                    // required
                  />
                  <label
                    htmlFor="age"
                    className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-teal-500 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                  >
                    Age
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
              {/* password */}
              <div className="relative my-2   ">
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
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

export default PaitentForm;

// test

// import React, { useState } from "react";

// function FileUploadPage() {
//   const [selectedFile, setSelectedFile] = useState();
//   // const [isFilePicked, setIsFilePicked] = useState(false);

//   const changeHandler = (event) => {
//     setSelectedFile(event.target.files[0]);
//     // setIsSelected(true);
//   };
//   const handleSubmission = () => {
//     const formData = new FormData();

//     formData.append("File", selectedFile);
//     console.log("img is", selectedFile);

//     fetch(
//       "https://freeimage.host/api/1/upload?key=6d207e02198a847aa98d0a2a901485a5",
//       {
//         method: "POST",
//         body: formData,
//         Headers: {
//           "Access-Control-Allow-Origin": "*",
//           "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
//           Accept: "application.json",
//           "Content-Type": "application/json",
//           // Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       }
//     )
//       .then((response) => response.json())
//       .then((result) => {
//         console.log("Success:", result);
//       })
//       .catch((error) => {
//         console.error("Error:", error);
//       });
//   };

//   return (
//     <div>
//       <input type="file" name="file" onChange={changeHandler} />
//       {/* {isSelected ? (
//         <div>
//           <p>Filename: {selectedFile.name}</p>
//           <p>Filetype: {selectedFile.type}</p>
//           <p>Size in bytes: {selectedFile.size}</p>
//           <p>
//             lastModifiedDate:{" "}
//             {selectedFile.lastModifiedDate.toLocaleDateString()}
//           </p>
//         </div>
//       ) : (
//         <p>Select a file to show details</p>
//       )} */}
//       <div>
//         <button onClick={handleSubmission}>Submit</button>
//       </div>
//     </div>
//   );
// }
// export default FileUploadPage;
