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
  useTherapitListQuery,
} from "../../hook/useApi";
import { ToastContainer } from "react-toastify/lib";

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
function TherapistScheduleForm() {
  const [picture, setPicture] = useState("");
  const { postData } = useAuth();
  const [startDate, setStartDate] = useState(new Date());
  const { register, handleSubmit, error } = useForm({
    resolver: yupResolver(schema),
  });
  const { data: countryList } = useCountyListQuery();
  const { data: bloodGroup } = useBloodGroupQuery();
  const { data: stateData } = useStateDataQuery();
  const { data: therapistType } = useTherapistTypeQuery();
  const { data: therapistList } = useTherapitListQuery();
  // console.log("therapist list", therapistList?.data);
  return (
    <>
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
      <form
        className="w-full m-auto  p-1  "
        onSubmit={handleSubmit((d) =>
          // postData(
          //   "https://misiapi.lamptechs.com/api/v1/therapist_schedule/store",
          //   d
          // )

          console.log("create therapist  schedule form data", d)
        )}
      >
        <div className=" px-6">
          <div className=" card d-flex    m-3 p-3  justify-center ">
            <h2 className="mt-3 text-center text-3xl font-extrabold text-teal-500">
              Create therapist schedule
            </h2>
            {/*   form */}
            <div className=" m-3 p-3 ">
              {/* therapist id*/}
              <div className="relative  my-2.5">
                {therapistList?.data ? (
                  <div className="relative  ">
                    <select
                      id="therapist_id"
                      {...register("therapist_id")}
                      className="block px-2.5 pb-2 pt-2.5 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
                    >
                      <option selected>Assign to therapist</option>
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
              {/* from and to date */}
              <div className="grid   grid-cols-2  gap-4 mt-2.5">
                {/* from date  */}
                <div className=" relative  ">
                  <input
                    type="date"
                    id="start_date"
                    {...register("start_date")}
                    className="block px-2.5 pb-2 pt-2.5 py-2.5 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
                    placeholder="  "
                    required
                  />
                  <label
                    htmlFor="start_date"
                    className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-teal-500 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                  >
                    From date
                  </label>
                </div>
                {/* end date  */}
                <div className=" relative   ">
                  <input
                    type="date"
                    id="end_date"
                    {...register("end_date")}
                    className="block px-2.5 pb-2 pt-2.5 py-2.5 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
                    placeholder="  "
                    required
                  />
                  <label
                    htmlFor="end_date"
                    className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-teal-500 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                  >
                    To date
                  </label>
                </div>
              </div>
              {/* start time and end time */}
              <div className="grid   grid-cols-2  gap-4 mt-2.5">
                {/* start time  */}
                <div className=" relative  ">
                  <input
                    type="text"
                    id="start_time"
                    {...register("start_time")}
                    className="block px-2.5 pb-2 pt-2.5 py-2.5 w-full rows-4 text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
                    placeholder="  "
                    required
                  />
                  <label
                    htmlFor="start_time"
                    className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-teal-500 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                  >
                    Starting time
                  </label>
                </div>
                {/* end time*/}
                <div className=" relative  ">
                  <input
                    type="text"
                    id="end_time"
                    {...register("end_time")}
                    className="block px-2.5 pb-2 pt-2.5 py-2.5 w-full rows-4 text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
                    placeholder="  "
                    required
                  />
                  <label
                    htmlFor="end_time"
                    className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-teal-500 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                  >
                    Ending time
                  </label>
                </div>
              </div>
              {/* duration time  */}
              <div className="grid     gap-4 mt-2.5">
                <div className="relative ">
                  <select
                    id="consulting_time"
                    {...register("consulting_time")}
                    className="block px-2.5 pb-2 pt-2.5 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
                  >
                    <option selected>Select interval time</option>
                    <option value="30">30 minutes</option>
                    <option value="60">60 minutes</option>
                    <option value="1">1 hour</option>
                  </select>
                  <label
                    htmlFor="consulting_time"
                    className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-teal-500 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                  >
                    Duration time
                  </label>
                </div>
              </div>
              {/* remarks and status */}
              <div className="grid   grid-cols-2  gap-4 mt-2.5">
                {/*remarks*/}
                <div className="col-start-1  relative   ">
                  <input
                    type="text"
                    id="remarks"
                    {...register("remarks")}
                    className="block px-2.5 pb-2 pt-2.5 py-2.5 w-full rows-4 text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
                    placeholder="  "
                    required
                  />
                  <label
                    htmlFor="remarks"
                    className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-teal-500 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                  >
                    Remarks
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
              {/*holiday set  */}
              <div className="grid   grid-cols-1  gap-4 mt-2.5">
                <div className="relative  ">
                  <div>
                    <h3 className="mb-2 font-semibold text-gray-900 dark:text-white">
                      Holiday set
                    </h3>
                    <ul className="w-full text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                      <li className="w-full rounded-t-lg border-b border-gray-200 dark:border-gray-600">
                        <div className="flex items-center pl-3">
                          <input
                            id="scheduleday"
                            value="Monday"
                            type="checkbox"
                            {...register("schedule_day")}
                            className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                          />
                          <label
                            htmlFor="scheduleday"
                            className="py-2  ml-2 w-full text-sm font-medium text-gray-900 dark:text-gray-300"
                          >
                            Monday
                          </label>
                        </div>
                      </li>
                      <li className="w-full rounded-t-lg border-b border-gray-200 dark:border-gray-600">
                        <div className="flex items-center pl-3">
                          <input
                            id="scheduleday"
                            {...register("schedule_day")}
                            type="checkbox"
                            value="Tuesday"
                            className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                          />
                          <label
                            htmlFor="scheduleday"
                            className="py-2  ml-2 w-full text-sm font-medium text-gray-900 dark:text-gray-300"
                          >
                            Tuesday
                          </label>
                        </div>
                      </li>
                      <li className="w-full rounded-t-lg border-b border-gray-200 dark:border-gray-600">
                        <div className="flex items-center pl-3">
                          <input
                            id="scheduleday"
                            {...register("schedule_day")}
                            type="checkbox"
                            value="Wednesday"
                            className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                          />
                          <label
                            htmlFor="scheduleday"
                            className="py-2  ml-2 w-full text-sm font-medium text-gray-900 dark:text-gray-300"
                          >
                            Wednesday
                          </label>
                        </div>
                      </li>
                      <li className="w-full rounded-t-lg border-b border-gray-200 dark:border-gray-600">
                        <div className="flex items-center pl-3">
                          <input
                            id="scheduleday"
                            {...register("schedule_day")}
                            type="checkbox"
                            value="Thursday"
                            className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                          />
                          <label
                            htmlFor="scheduleday"
                            className="py-2  ml-2 w-full text-sm font-medium text-gray-900 dark:text-gray-300"
                          >
                            Thursday
                          </label>
                        </div>
                      </li>
                      <li className="w-full rounded-t-lg border-b border-gray-200 dark:border-gray-600">
                        <div className="flex items-center pl-3">
                          <input
                            id="scheduleday"
                            {...register("schedule_day")}
                            type="checkbox"
                            value="Friday"
                            className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                          />
                          <label
                            htmlFor="scheduleday"
                            className="py-2  ml-2 w-full text-sm font-medium text-gray-900 dark:text-gray-300"
                          >
                            Friday
                          </label>
                        </div>
                      </li>
                      <li className="w-full rounded-t-lg border-b border-gray-200 dark:border-gray-600">
                        <div className="flex items-center pl-3">
                          <input
                            id="scheduleday"
                            {...register("schedule_day")}
                            type="checkbox"
                            value="Saturday"
                            className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                          />
                          <label
                            htmlFor="scheduleday"
                            className="py-2  ml-2 w-full text-sm font-medium text-gray-900 dark:text-gray-300"
                          >
                            Saturday
                          </label>
                        </div>
                      </li>
                      <li className="w-full rounded-t-lg border-b border-gray-200 dark:border-gray-600">
                        <div className="flex items-center pl-3">
                          <input
                            id="scheduleday"
                            {...register("schedule_day")}
                            type="checkbox"
                            value="Sunday"
                            className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                          />
                          <label
                            htmlFor="scheduleday"
                            className="py-2  ml-2 w-full text-sm font-medium text-gray-900 dark:text-gray-300"
                          >
                            Sunday
                          </label>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              {/*  Holiday set */}
              {/* <div className="mb-3">
                <label htmlFor="influencerGender" className="form-label">
                  Holiday set
                </label>
                <div className="d-flex  ">
                  <div className="me-2 ">
                    <input
                      type="radio"
                      className="btn-check"
                      name="gender"
                      id="any"
                      value="any"
                      autoComplete="off"
                      onClick={() => alert("any")}
                    />
                    <label className="btn btn-outline-primary  " htmlFor="any">
                      Any
                    </label>
                  </div>
                  <div className="me-2 ">
                    <input
                      type="radio"
                      className="btn-check"
                      name="gender"
                      id="male"
                      value="male"
                      autoComplete="off"
                      onClick={() => alert("male")}
                    />
                    <label className="btn btn-outline-primary  " htmlFor="male">
                      Male
                    </label>
                  </div>
                  <div className=" me-2">
                    <input
                      type="radio"
                      className="btn-check"
                      name="gender"
                      id="female"
                      value="female"
                      autoComplete="off"
                      onClick={() => alert("female")}
                    />
                    <label className="btn btn-outline-primary" htmlFor="female">
                      Female
                    </label>
                  </div>
                  <div className="  ">
                    <input
                      type="radio"
                      className="btn-check"
                      name="gender"
                      id="others"
                      autoComplete="off"
                      value="others"
                      onClick={() => alert("others")}
                    />
                    <label className="btn btn-outline-primary" htmlFor="others">
                      Others
                    </label>
                  </div>
                </div>
              </div> */}
              {/* button */}
              <div className=" flex justify-end">
                <button
                  className="decoration-4 text-xl shadow mt-6   hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                  type="submit"
                  style={{ backgroundColor: "#01a9ac" }}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

export default TherapistScheduleForm;
