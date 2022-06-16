import React, { useState } from "react";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
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
function PaitentForm() {
  const [startDate, setStartDate] = useState(new Date());

  const { register, handleSubmit, error } = useForm({
    resolver: yupResolver(schema),
  });

  return (
    <>
      <form
        className="w-10/12 m-auto   first-line: "
        onSubmit={handleSubmit((d) => console.log("form data", d))}
        type="submit"
      >
        <div className=" px-3">
          <div className=" card d-flex      justify-center ">
            <h2
              className="mt-3 text-center text-3xl font-extrabold  "
              style={{ color: "#01a9ac" }}
            >
              Create new patient
            </h2>
            {/*form */}
            <div className=" m-3 p-3 ">
              <div className="flex justify-center items-center w-full  ">
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
                    {...register("dropzone-file")}
                    className="hidden"
                  />
                </label>
              </div>
              {/* Patient Source */}
              <div className="relative my-2">
                {/* <input
                  type="text"
                  id="floating_outlined"
                  className="block px-2.5 pb-2 pt-2.5 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
                  placeholder="  "
                  required
                /> */}
                <select
                  className="block px-2.5 pb-2 pt-2.5 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
                  // className="form-select appearance-none
                  //   block
                  //   px-2.5
                  //   py-2
                  //   pb-2
                  //   w-full
                  //   text-base
                  //   font-normal
                  //   text-gray-700
                  //   bg-white bg-clip-padding bg-no-repeat
                  //   border border-solid border-gray-300
                  //   rounded
                  //   transition
                  //   ease-in-out
                  //   m-0
                  //  focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  //             aria-label="Default select example"
                  id="patient_source"
                  {...register("patient_source")}
                >
                  <option selected>Select patient source</option>
                  <option value="male">ZD</option>
                  <option value="female">Own</option>
                  <option value="others">Others</option>
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
                    id="firstname"
                    {...register("firstname")}
                    className="block px-2.5 pb-2 pt-2.5 py-2.5 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
                    placeholder="  "
                    required
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
                    required
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
                    required
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
                    type="tel"
                    id="phone"
                    {...register("phone")}
                    className="block px-2.5 pb-2 pt-2.5 py-2.5 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
                    placeholder="  "
                    required
                  />
                  <label
                    htmlFor="phone"
                    className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-teal-500 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                  >
                    Phone number
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
              {/* state  and nationality */}
              <div className="grid  gap-4 mt-2.5">
                {/* State/City */}
                <div className="col-start-1 relative  ">
                  <input
                    type="text"
                    id="state_city"
                    {...register("state_city")}
                    className="block px-2.5 pb-2 pt-2.5 py-2.5 w-full rows-4 text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
                    placeholder="  "
                    required
                  />
                  <label
                    htmlFor="state_city"
                    className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-teal-500 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                  >
                    State/City
                  </label>
                </div>
                {/* Nationality */}
                <div className="col-start-2  relative  ">
                  <input
                    type="text"
                    id="nationality"
                    {...register("nationality")}
                    className="block px-2.5 pb-2 pt-2.5 py-2.5 w-full rows-4 text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
                    placeholder="  "
                    required
                  />
                  <label
                    htmlFor="nationality"
                    className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-teal-500 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                  >
                    Nationality
                  </label>
                </div>
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
                    required
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
                    required
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
                    id="Insurance"
                    {...register("Insurance")}
                    className="block px-2.5 pb-2 pt-2.5 py-2.5 w-full rows-4 text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
                    placeholder="  "
                    required
                  />
                  <label
                    htmlFor="Insurance"
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
                    required
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
                <div className="  relative  ">
                  <select
                    id="marital-status"
                    {...register("marital-status")}
                    className="block px-2.5 pb-2 pt-2.5 py-2.5 w-full rows-4 text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
                  >
                    <option selected>Select status</option>
                    <option value="">Single</option>
                    <option value="">Married</option>
                    <option value="">Divorced</option>
                    <option value="">Engaged</option>
                  </select>
                  <label
                    htmlFor="marital-status"
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
                    required
                  />
                  <label
                    htmlFor="Occupation"
                    className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-teal-500 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                  >
                    Occupation
                  </label>
                </div>
              </div>
              {/* sex and blood */}
              <div className="grid gap-4 grid-cols-2 mt-2.5">
                {/* sex  */}
                <div className=" relative   ">
                  <select
                    id="sex"
                    {...register("sex")}
                    className="block px-2.5 pb-2 pt-2.5 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
                  >
                    <option selected>Select sex</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="others">Others</option>
                  </select>
                  <label
                    htmlFor="Sex"
                    className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-teal-500 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                  >
                    Sex
                  </label>
                </div>
                {/* blood  */}
                <div className=" relative   ">
                  {" "}
                  <select
                    id="blood"
                    {...register("blood")}
                    className="block px-2.5 pb-2 pt-2.5 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
                  >
                    <option selected>Select blood group</option>
                    <option value="a+">A+</option>
                    <option value="a-">A-</option>
                    <option value="b+">B+</option>
                    <option value="b-">B-</option>
                    <option value="ab+">AB+</option>
                    <option value="o+">O+</option>
                    <option value="o-">O-</option>
                  </select>
                  <label
                    htmlFor="floating_outlined"
                    className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-teal-500 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                  >
                    Blood group
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
                  htmlFor="textarea"
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
                {/*attach file  */}
                <div className=" relative   ">
                  <input
                    className="block px-2.5 pb-2 pt-2.5 py-2.5 w-full rows-4 text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
                    placeholder="  "
                    required
                    type="file"
                    multiple
                    id="formFileMultiple"
                    {...register("formFileMultiple")}
                  />

                  <label
                    htmlFor="formFileMultiple"
                    className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-teal-500 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                  >
                    Attach file
                  </label>
                </div>
              </div>
              {/* emergency contract and remarks */}
              <div className="grid  gap-4 my-2.5">
                {/* Emergency Number */}
                <div className="col-start-1  relative  ">
                  <input
                    type="tel"
                    id="emergency_number"
                    {...register("emergency_number")}
                    className="block px-2.5 pb-2 pt-2.5 py-2.5 w-full rows-4 text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
                    placeholder="  "
                    required
                  />
                  <label
                    htmlFor="emergency_number"
                    className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-teal-500 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                  >
                    Emergency contact
                  </label>
                </div>
                {/* Remarks */}
                <div className="col-start-2  relative  ">
                  <input
                    type="number"
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
