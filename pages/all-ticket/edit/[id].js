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
  //const [singleTicket, setRemoteData] = useState({});
  //console.log("single ticket data  from  ", singleTicket);
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

  //const { id } = router.query;

  console.log("single ticket id", typeof id);
  // localStorage.setItem("lastId", router.query?.id);
  router.query?.id && localStorage.setItem("lastId", router.query?.id);
  useEffect(() => {
    setId(router.query?.id || localStorage.getItem("lastId"));
  }, [pathId]);

  const fetchSingleTicket = async () => {
    const response = await fetch(
      `https://misiapi.lamptechs.com/api/v1/ticket/show?id=${pathId}`,
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );
    return await response.json();
  };
  const useSingleTicketQuery = () =>
    useQuery(["fetchSingleTicket"], fetchSingleTicket, {
      refetchOnMount: true,
      refetchOnWindowFocus: true,
      refetchInterval: 1000,
    });
  const { data: singleTicket } = useSingleTicketQuery();

  return (
    <>
      {singleTicket?.data ? (
        <form
          className="w-10/12 m-auto p-10  first-line: "
          onSubmit={handleSubmit(
            (d) =>
              postData(`https://misiapi.lamptechs.com/api/v1/ticket/update`, d)
            //console.log("ticket store data", d)
          )}
        >
          <div className="px-3">
            <div className=" card d-flex      justify-center ">
              <h2
                className="mt-3 text-center text-3xl font-extrabold  "
                style={{ color: "#01a9ac" }}
              >
                Edit ticket details
              </h2>
              {/*  form */}
              <div className=" m-3 p-3 ">
                {/* ticket Id */}
                <div className="grid gap-4  mt-2.5">
                  <div className="relative">
                    <input
                      type="text"
                      id="id"
                      {...register("id")}
                      className="hidden block px-2.5 pb-2 pt-2.5 py-2.5 w-full rows-4 text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
                      placeholder="  "
                      value={singleTicket?.data?.id}
                      required
                    />
                    <label
                      htmlFor="id"
                      className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-teal-500 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                    >
                      {/* {`${singleTicket?.data?.id}`} */}
                    </label>
                  </div>
                </div>
                {/* Patient Id */}
                <div className="grid gap-4  mt-2.5">
                  <div className="relative">
                    <input
                      type="text"
                      id="patient_id"
                      {...register("patient_id")}
                      className="block px-2.5 pb-2 pt-2.5 py-2.5 w-full rows-4 text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
                      placeholder="  "
                      value={singleTicket?.data?.patient_info?.id}
                      required
                    />
                    <label
                      htmlFor="patient_id"
                      className="absolute text-xl text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-teal-500 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                    >
                      {`${singleTicket?.data?.patient_info?.first_name} ${singleTicket?.data?.patient_info?.last_name}`}
                    </label>
                  </div>
                </div>
                {/* Assign To therapist and pass department */}
                <div className="grid gap-4 grid-cols-2 mt-2.5">
                  {/* Assign To therapist */}
                  <div className="col-start-1  relative ">
                    {therapistList?.data ? (
                      <div className="relative my-3">
                        <select
                          id="therapist_id"
                          {...register("therapist_id")}
                          className="block px-2.5 pb-2 pt-2.5 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
                        >
                          <option
                            selected
                          >{`${singleTicket?.data?.therapist_info?.id} ${singleTicket?.data?.therapist_info?.first_name} ${singleTicket?.data?.therapist_info?.last_name}`}</option>
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
                  <div className="col-start-2 relative ">
                    {ticketDepartment?.data ? (
                      <div className="relative my-3">
                        <select
                          id="ticket_department_id"
                          {...register("ticket_department_id")}
                          className="block px-2.5 pb-2 pt-2.5 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
                        >
                          <option selected>
                            {singleTicket?.data?.ticket_department_info?.name}
                          </option>
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
                {/* call strike  and location*/}
                <div className="grid gap-4 grid-cols-2 mt-2.5">
                  {/* call strike  */}
                  {/*call strike  */}
                  <div className="col-start-1 relative">
                    <select
                      id="strike"
                      {...register("strike")}
                      className="block px-2.5 pb-2 pt-2.5 py-2.5 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
                    >
                      <option selected>{singleTicket?.data?.strike} </option>
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

                  {/* <div className="col-start-1  relative  ">
                    <input
                      type="text"
                      id="strike"
                      {...register("strike")}
                      className="block px-2.5 pb-2 pt-2.5 py-2.5 w-full rows-4 text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
                      placeholder={singleTicket?.data?.strike}
                      required
                    />
                    <label
                      htmlFor="strike"
                      className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-teal-500 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                    ></label>
                  </div> */}
                  {/* location  */}
                  <div className="col-start-2  relative  ">
                    <input
                      type="text"
                      id="location"
                      {...register("location")}
                      className="block px-2.5 pb-2 pt-2.5 py-2.5 w-full rows-4 text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
                      placeholder={singleTicket?.data?.location}
                      //required
                    />
                    <label
                      htmlFor="location"
                      className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-teal-500 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                    >
                      Location
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
                    placeholder={singleTicket?.data?.strike_history}
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
                    placeholder={singleTicket?.data?.ticket_history}
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
                  {/* status */}
                  <div className="  relative">
                    <select
                      id="status"
                      className="block px-2.5 pb-2 pt-2.5 py-2.5 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
                      aria-label="Default select example"
                      {...register("status")}
                    >
                      <option selected>
                        {Statustest(singleTicket?.data?.status)}
                      </option>
                      <option value="1">Active</option>
                      <option value="2">Inactive</option>
                      <option value="3">Pending</option>
                      <option value="4">Cancelled</option>
                      <option value="5">Deleted</option>
                    </select>
                    <label
                      htmlFor="status"
                      className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-teal-500 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                    >
                      Status
                    </label>
                  </div>
                  {/* Language Select  */}
                  <div className="relative">
                    <select
                      id="language"
                      {...register("language")}
                      className="block px-2.5 pb-2 pt-2.5 py-2.5 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
                    >
                      <option selected>{singleTicket?.data?.language}</option>
                      <option value="English">English</option>
                      <option value="Dutch">Dutch</option>
                    </select>
                    <label
                      htmlFor="language"
                      className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-teal-500 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                    >
                      Language
                    </label>
                  </div>
                </div>
                {/* remarks */}
                <div className="relative my-2.5 ">
                  <input
                    type="text"
                    id="remarks"
                    {...register("remarks")}
                    className="block px-2.5 pb-2 pt-2.5 py-2.5 w-full rows-4 text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
                    placeholder={singleTicket?.data?.remarks}
                    // required
                  />
                  <label
                    htmlFor="remarks"
                    className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-teal-500 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                  >
                    Remarks
                  </label>
                </div>

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
                <div className=" flex justify-end">
                  <button
                    className="decoration-4 text-xl shadow mt-6   hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                    type="submit"
                    style={{ backgroundColor: "#01a9ac" }}
                  >
                    Update
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

// useDebounce onchange react
// patient form separation
// search api 'singlePatient'
// 'singlePatient?.data' ? then show data a from :another blank form
