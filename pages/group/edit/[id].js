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
  useGroupInfo,
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
  const { data: groupList } = useGroupInfo();
  const router = useRouter();
  const RoutId = router?.query?.id;
  console.log("router id", RoutId);
  const fetchSingleGroupUser = async () => {
    const response = await fetch(
      `https://misiapi.lamptechs.com/api/v1/group/show?id=${RoutId}`,
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );
    return await response.json();
  };
  const useGroupUserQuery = () =>
    useQuery(["fetchSingleGroupUser"], fetchSingleGroupUser);
  const { data: singleGroupUser } = useGroupUserQuery();
  console.log("sigle group user", singleGroupUser);

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
  // const [first_name, setFirst] = React.useState();
  // const [last_name, setLast] = React.useState();
  // const [email, setEmail] = React.useState();
  // const [phone, setPhone] = React.useState();
  // //const [password, setPassword] = React.useState();
  // const [status, setStatus] = React.useState();
  // const [file_type, setFiletype] = React.useState();
  // const [ShowImage, setShowimage] = useState("");
  // const [picture, setPicture] = React.useState();
  // // not required field
  // const [source, setSource] = React.useState();
  // const [alternet_phone, setAlternetphone] = React.useState();
  // const [address, setAddress] = React.useState();
  // const [state_id, setState] = React.useState();
  // const [country_id, setCountry] = React.useState();
  // const [blood_group_id, setBloodgroup] = React.useState();
  // //const [city, setCity] = React.useState();
  // const [area, setArea] = React.useState();
  // const [bsn_number, setBsnnumber] = React.useState();
  // const [dob_number, setDobnumber] = React.useState();
  // const [insurance_number, setInsurancenumber] = React.useState();
  // const [age, setAge] = React.useState();
  // const [gender, setGender] = React.useState();
  // const [marital_status, setMaritalstatus] = React.useState();
  // const [medical_history, setMedical] = React.useState();
  // const [Occupation, setOccupation] = React.useState();
  // const [emergency_contact, setEmergencycontact] = React.useState();
  // const [date_of_birth, setDob] = React.useState();
  // const [remarks, setRemarks] = React.useState();

  // console.log(
  //   "from data",
  //   status,
  //   first_name,
  //   last_name,
  //   email,
  //   phone,
  //   file_type,
  //   // picture,
  //   source,
  //   alternet_phone,
  //   address,
  //   state_id,
  //   country_id,
  //   blood_group_id,
  //   area,
  //   bsn_number,
  //   dob_number,
  //   insurance_number,
  //   age,
  //   gender,
  //   marital_status,
  //   medical_history,
  //   Occupation,
  //   emergency_contact,
  //   date_of_birth,
  //   remarks
  // );
  // const [show, setShow] = React.useState();
  // var loadFile = (e) => {
  //   if (e.target.files[0]) {
  //     setShowimage(URL.createObjectURL(e.target.files[0]));
  //     setPicture(e.target.files[0]);
  //     // console.log(URL.createObjectURL(e.target.files[0]));
  //   }
  // };
  // const handleSubmitForm = (e) => {
  //   e.preventDefault();
  //   let formData = new FormData();
  //   //required field
  //   //formData.append("id", id);
  //   formData.append("first_name", first_name);
  //   formData.append("last_name", last_name);
  //   formData.append("email", email);
  //   formData.append("phone", phone);
  //   //formData.append("password", password);
  //   formData.append("status", status);
  //   formData.append("file_type", file_type);
  //   formData.append("picture", picture);
  //   // not required field
  //   formData.append("address", address);
  //   formData.append("source", source);
  //   formData.append("country_id", country_id);
  //   formData.append("state_id", state_id);
  //   formData.append("country_id", country_id);
  //   formData.append("blood_group_id", blood_group_id);
  //   formData.append("area", area);
  //   //formData.append("city ", city);
  //   formData.append("bsn_number", bsn_number);
  //   formData.append("dob_number", dob_number);
  //   formData.append("insurance_number", insurance_number);
  //   formData.append("age", age);
  //   formData.append("gender", gender);
  //   formData.append("marital_status ", marital_status);
  //   formData.append("medical_history", medical_history);
  //   formData.append("occupation", Occupation);
  //   formData.append("alternet_phone ", alternet_phone);
  //   formData.append("emergency_contact", emergency_contact);
  //   formData.append("date_of_birth", date_of_birth);
  //   formData.append("remarks", remarks);

  //   // the image shoud be same {image,file direction}
  //   updateData(
  //     `https://misiapi.lamptechs.com/api/v1/admin/update/${router?.query?.id}`,
  //     formData
  //   );
  // };
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
              `https://misiapi.lamptechs.com/api/v1/groups/update/${RoutId}`,
              d
            )
          // console.log("ticket store data", d)
        )}
        // onSubmit={handleSubmit(
        //   (d) =>
        //     updateData(
        //       `https://misiapi.lamptechs.com/api/v1/admin/update/${RoutId}`,
        //       d
        //     )

        //   // console.log("ticket store data", d)
        // )}
      >
        {/* mx-4  px-12  */}
        <div className="container     rounded bg-white mt-5 mb-5 ">
          <div className="container    rounded bg-white mt-5 mb-5 ">
            <div className="grid    px-8 grid-cols-2 justify-center  gap-4 mt-2.5 pl-3.5">
              <div className="flex justify-center items-center">
                <h2
                  className="col-start-1  text-center text-2xl   font-extrabold    "
                  style={{ color: "#01a9ac" }}
                >
                  Update group info
                  {/* id: {singleTicket.data?.id} */}
                </h2>
              </div>
              {/* button download and save */}
              <div className="col-start-2 my-3 px-3 md:flex md:items-center justify-center ">
                <div className="inline-flex rounded-md shadow-sm" role="group">
                  <button
                    onClick={() => router.push(`/group`)}
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
            {/* edit form start */}
            <div className=" px-2">
              <div className=" card d-flex      justify-center ">
                {/* first portion of the form */}
                <div className=" mx-3 p-3 ">
                  {/* name */}
                  <div className="grid  gap-4 mt-3">
                    {/* first Name  */}
                    <div className="col-start-1 relative   ">
                      <input
                        id="name"
                        {...register("name")}
                        type="text"
                        className="block px-2.5 pb-2 pt-2.5 py-2.5 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
                        defaultValue={singleGroupUser?.data?.name}
                        required
                      />
                      <label
                        htmlFor="name"
                        className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-teal-500 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                      >
                        Name
                      </label>
                    </div>
                  </div>
                  {/*description */}
                  <div className="relative  mt-3">
                    <textarea
                      className="h-28 block px-2.5 pb-2 pt-2.5 py-2.5 w-full rows-4 text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
                      id="description"
                      {...register("description")}
                      type="text"
                      defaultValue={singleGroupUser?.data?.description}
                    />
                    <label
                      htmlFor="description"
                      className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-teal-500 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                    >
                      Description
                    </label>
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
          </div>
        </div>
      </form>
    </>
  );
}

export default PaitentForm;
