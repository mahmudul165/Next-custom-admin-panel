// import React, { useEffect, useState } from "react";
// import { Component } from "react";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import * as yup from "yup";
// import { yupResolver } from "@hookform/resolvers/yup";
// import { useForm } from "react-hook-form";
// import Skeleton from "@mui/material/Skeleton";
// import Stack from "@mui/material/Stack";
// import TextField from "@mui/material/TextField";
// import Autocomplete from "@mui/material/Autocomplete";
// import { FiSend } from "react-icons/fi";
// import {
//   usePatientListQuery,
//   //usePatientQuery,
//   useTherapitListQuery,
//   useAllTicketDepartmentQuery,
// } from "../../hook/useApi";
// import { useRef } from "react";
// import emailjs from "@emailjs/browser";
// import useAuth from "/hook/useAuth";
// import { useQuery } from "react-query";
// import ResponsiveDialog from "../common/PostModal";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { ToastContainer } from "react-toastify";
// import Swal from "sweetalert2";
// import { Editor } from "react-draft-wysiwyg";
// import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
// import { EditorState } from "draft-js";

// const schema = yup
//   .object()
//   .shape({
//     // service_category_id
//     // service_subcategory_name
//     //  status
//     //  remarks
//     // service_category_id: yup.string().required(),
//     // name: yup.string().required(),
//     // details: yup.string().required(),
//     //remarks: yup.string().required(),
//     //status: yup.string().required(),
//   })
//   .required();

// const successToast = (message) => {
//   toast.success(`${message}`, {
//     position: toast.POSITION.TOP_RIGHT,
//     autoClose: true,
//   });
// };
// function TicketForm() {
//   const { postData, status, setStatus } = useAuth();
//   const [searchInput, setSearchInput] = useState("");
//   console.log("searchInput", searchInput);
//   const [startDate, setStartDate] = useState(new Date());
//   const { register, handleSubmit } = useForm({
//     resolver: yupResolver(schema),
//   });
//   const { data: patientList } = usePatientListQuery();

//   // debounce search input
//   const debounce = (fn, delay) => {
//     let timer;
//     return function(...args) {
//       clearTimeout(timer);
//       timer = setTimeout(() => fn(...args), delay);
//     };
//   };

//   const [singlepatient, setPatient] = useState("");
//   useEffect(() => {
//     const url = `https://misiapi.lamptechs.com/api/v1/patient/show?id=${searchInput}`;
//     console.log("url", url);
//     const fetchData = async () => {
//       try {
//         const response = await fetch(url, {
//           headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//         });
//         const json = await response.json();
//         // console.log(json);
//         setPatient(json?.data);
//       } catch (error) {
//         console.log("error", error);
//       }
//     };

//     fetchData();
//   }, [searchInput]);
//   //console.log("singlepatient data", singlepatient);
//   // email
//   const form = useRef();
//   const sendEmail = (e) => {
//     e.preventDefault();
//     emailjs
//       .sendForm(
//         "service_3f2wicn",
//         "template_8q3r0so",
//         form.current,
//         "Xhynuoqz_7DneLgjh"
//       )
//       .then(
//         (result) => {
//           console.log("result check", result.text);
//           // result.text === "OK" && successToast("Email send Successfully!");
//           result.text === "OK"
//             ? Swal.fire({
//                 title: "Successfully done!",
//                 text: `Email Send  Successfully`,
//                 icon: "success",
//                 timer: 2500,
//                 // button: "Aww yiss!",
//               })
//             : Swal.fire({
//                 title: "Error! Not save your data!!",
//                 text: `${result?.message}.`,
//                 icon: "error",
//                 timer: 3000,
//               });
//         },
//         (error) => {
//           console.log(error.text);
//         }
//       );
//   };
//   const [editorState, setEditorState] = useState(() =>
//     EditorState.createEmpty()
//   );
//   // const html = draftToHtml(convertToRaw(editorState.getCurrentContent()));
//   // console.log("first", html);
//   return (
//     <>
//       {/* create patient form */}
//       <ToastContainer
//         position="top-center"
//         autoClose={5000}
//         hideProgressBar={false}
//         newestOnTop={false}
//         closeOnClick
//         rtl={false}
//         pauseOnFocusLoss
//         draggable
//         pauseOnHover
//       />
//       {/* {status == true && <ResponsiveDialog title="save" />} */}
//       {/* <OperationModal modal={modal} setModal={setModal}>
//                       {<TicketForm className="m-auto" />}
//                     </OperationModal> */}
//       <form ref={form} onSubmit={sendEmail}>
//         <div className="p-2">
//           <div className=" card d-flex      justify-center ">
//             <h2
//               className="mt-3 text-center text-3xl font-extrabold  "
//               style={{ color: "#01a9ac" }}
//             >
//               Email send
//             </h2>
//             {/* first portion of the form */}

//             <div className=" m-3 p-3 ">
//               {/* Patient Id */}
//               {/* <div className="grid gap-4  mt-2.5">
//                 <div className="relative">
//                   {patientList?.data ? (
//                     <Stack>
//                       <Autocomplete
//                         onChange={(event, value) => {
//                           // value.split('-', 1).[0]
//                           debounce(setSearchInput(value), 500);
//                         }}
//                         disablePortal
//                         id="combo-box-demo"
//                         type="email"
//                         name="to_email"
//                         //  options={patientList?.data.map((patient) => patient.id)}
//                         options={patientList?.data.map(
//                           (patient) => `${patient.email}`
//                         )}
//                         size="small"
//                         renderInput={(params) => (
//                           <TextField
//                             id="patient_id"
//                             {...register("patient_id")}
//                             required
//                             {...params}
//                             label="To"
//                           />
//                         )}
//                       />
//                     </Stack>
//                   ) : (
//                     <>
//                       <Stack spacing={1}>
//                         <Skeleton animation="wave" height={40} />
//                       </Stack>
//                     </>
//                   )}
//                 </div>
//               </div> */}
//               {/* from email  */}
//               <div className="grid  gap-4 mt-2.5">
//                 <div className="hidden  col-start-1 relative   ">
//                   <input
//                     type="email"
//                     id="user_email"
//                     //{...register("firstname")}
//                     className="   block px-2.5 pb-2 pt-2.5 py-2.5 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
//                     placeholder="  "
//                     value="mahmudul.4918@gmail.com"
//                     name="user_email"
//                   />
//                   <label
//                     htmlFor="user_email"
//                     className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-teal-500 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
//                   >
//                     From
//                   </label>
//                 </div>{" "}
//               </div>
//               {/* to email  */}
//               <div className="grid  gap-4 mt-2.5">
//                 <div className="  col-start-1 relative   ">
//                   <input
//                     type="email"
//                     id="to_email"
//                     name="to_email"
//                     //{...register("firstname")}
//                     className="  block px-2.5 pb-2 pt-2.5 py-2.5 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
//                     placeholder="  "

//                     //value="mahmudul.4918@gmail.com"
//                   />
//                   <label
//                     htmlFor="to_email"
//                     className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-teal-500 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
//                   >
//                     To
//                   </label>
//                 </div>{" "}
//               </div>
//               {/*  subject */}
//               <div className="grid  gap-4 mt-2.5">
//                 <div className="col-start-1 relative   ">
//                   <input
//                     type="to_subject"
//                     id="to_subject"
//                     name="to_subject"
//                     //{...register("firstname")}
//                     className="block px-2.5 pb-2 pt-2.5 py-2.5 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
//                   />
//                   <label
//                     htmlFor="Subject"
//                     className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-teal-500 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
//                   >
//                     Subject
//                   </label>
//                 </div>{" "}
//               </div>
//               {/* message */}
//               <Editor
//                 className="wrapper-class  editor-class toolbar-class block px-2.5 pb-2 pt-2.5 py-2.5 w-full rows-4 text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer   no-resize appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 h-48 resize-none"
//                 editorState={editorState}
//                 toolbarClassName="toolbarClassName"
//                 wrapperClassName="wrapperClassName"
//                 editorClassName="editorClassName"
//                 onEditorStateChange={setEditorState}
//                 type="my_html"
//                 id="my_html"
//                 name="my_html"
//                 // {...register("to_message")}
//                 // type="text"
//                 placeholder="  "
//                 style={{ width: "300px" }}
//                 // onEditorStateChange={onEditorStateChange}
//               />

//               {/* <div className="relative  mt-2.5">
//                 <textarea
//                   className="block px-2.5 pb-2 pt-2.5 py-2.5 w-full rows-4 text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer   no-resize appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 h-48 resize-none"
//                   id="to_message"
//                   // {...register("to_message")}
//                   type="text"
//                   placeholder="  "
//                   name="message"
//                 />
//                 <label
//                   htmlFor="textarea"
//                   className="absolute text-base text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-teal-500 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
//                 >
//                   Please write your Message
//                 </label>
//               </div> */}
//               <div className=" flex justify-end">
//                 <button
//                   className="decoration-4 text-xl shadow mt-6   hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
//                   type="submit"
//                   value="Send"
//                   style={{ backgroundColor: "#01a9ac" }}
//                 >
//                   <div className="flex items-center justify-center">
//                     <FiSend className="h-6 mr-2" /> <span>Send</span>
//                   </div>
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </form>
//     </>
//   );
// }

// export default TicketForm;

// // useDebounce onchange react
// // patient form separation
// // search api 'singlePatient'
// // 'singlePatient?.data' ? then show data a from :another blank form

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
import { FiSend } from "react-icons/fi";
import {
  usePatientListQuery,
  //usePatientQuery,
  useTherapitListQuery,
  useAllTicketDepartmentQuery,
} from "../../hook/useApi";
import { useRef } from "react";
import emailjs from "@emailjs/browser";
import useAuth from "/hook/useAuth";
import { useQuery } from "react-query";
import ResponsiveDialog from "../common/PostModal";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Swal from "sweetalert2";

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

const successToast = (message) => {
  toast.success(`${message}`, {
    position: toast.POSITION.TOP_RIGHT,
    autoClose: true,
  });
};
function TicketForm() {
  const { postData, status, setStatus } = useAuth();
  const [searchInput, setSearchInput] = useState("");
  console.log("searchInput", searchInput);
  const [startDate, setStartDate] = useState(new Date());
  const { register, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });
  const { data: patientList } = usePatientListQuery();

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
  // email
  const form = useRef();
  const sendEmail = (e) => {
    e.preventDefault();
    emailjs
      .sendForm(
        "service_3f2wicn",
        "template_8q3r0so",
        form.current,
        "Xhynuoqz_7DneLgjh"
      )
      .then(
        (result) => {
          console.log("result check", result.text);
          // result.text === "OK" && successToast("Email send Successfully!");
          result.text === "OK"
            ? Swal.fire({
                title: "Successfully done!",
                text: `Email Send  Successfully`,
                icon: "success",
                timer: 2500,
                // button: "Aww yiss!",
              })
            : Swal.fire({
                title: "Error! Not save your data!!",
                text: `${result?.message}.`,
                icon: "error",
                timer: 3000,
              });
        },
        (error) => {
          console.log(error.text);
        }
      );
  };
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
      <form ref={form} onSubmit={sendEmail}>
        <div className="p-2">
          <div className=" card d-flex      justify-center ">
            <h2
              className="mt-3 text-center text-3xl font-extrabold  "
              style={{ color: "#01a9ac" }}
            >
              Email send
            </h2>
            {/* first portion of the form */}

            <div className=" m-3 p-3 ">
              {/* Patient Id */}
              {/* <div className="grid gap-4  mt-2.5">
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
                        type="email"
                        name="to_email"
                        //  options={patientList?.data.map((patient) => patient.id)}
                        options={patientList?.data.map(
                          (patient) => `${patient.email}`
                        )}
                        size="small"
                        renderInput={(params) => (
                          <TextField
                            id="patient_id"
                            {...register("patient_id")}
                            required
                            {...params}
                            label="To"
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

              {/* from email  */}
              <div className="grid  gap-4 mt-2.5">
                <div className="hidden  col-start-1 relative   ">
                  <input
                    type="email"
                    id="user_email"
                    //{...register("firstname")}
                    className="   block px-2.5 pb-2 pt-2.5 py-2.5 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
                    placeholder="  "
                    value="mahmudul.4918@gmail.com"
                    name="user_email"
                  />
                  <label
                    htmlFor="user_email"
                    className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-teal-500 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                  >
                    From
                  </label>
                </div>{" "}
              </div>
              {/* to email  */}
              <div className="grid  gap-4 mt-2.5">
                <div className="  col-start-1 relative   ">
                  <input
                    type="email"
                    id="to_email"
                    //{...register("firstname")}
                    className="  block px-2.5 pb-2 pt-2.5 py-2.5 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
                    placeholder="  "
                    name="to_email"
                    //value="mahmudul.4918@gmail.com"
                  />
                  <label
                    htmlFor="to_email"
                    className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-teal-500 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                  >
                    To
                  </label>
                </div>{" "}
              </div>
              {/*  subject */}
              <div className="grid  gap-4 mt-2.5">
                <div className="col-start-1 relative   ">
                  <input
                    type="to_subject"
                    id="to_subject"
                    //{...register("firstname")}
                    className="block px-2.5 pb-2 pt-2.5 py-2.5 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
                    name="to_subject"
                  />
                  <label
                    htmlFor="Subject"
                    className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-teal-500 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                  >
                    Subject
                  </label>
                </div>{" "}
              </div>
              {/* message */}
              <div className="relative  mt-2.5">
                <textarea
                  className="block px-2.5 pb-2 pt-2.5 py-2.5 w-full rows-4 text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer   no-resize appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 h-48 resize-none"
                  id="to_message"
                  // {...register("to_message")}
                  type="text"
                  placeholder="  "
                  name="message"
                />
                <label
                  htmlFor="textarea"
                  className="absolute text-base text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-teal-500 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                >
                  Please write your Message
                </label>
              </div>

              <div className=" flex justify-end">
                <button
                  className="decoration-4 text-xl shadow mt-6   hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                  type="submit"
                  value="Send"
                  style={{ backgroundColor: "#01a9ac" }}
                >
                  <div className="flex items-center justify-center">
                    <FiSend className="h-6 mr-2" /> <span>Send</span>
                  </div>
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
