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
function EditTicket() {
  const { postData } = useAuth();
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
  const [value, setValue] = React.useState();
  const [inputValue, setInputValue] = React.useState("");

  return (
    <>
      <form
        className="w-10/12 m-auto p-10  first-line: "
        onSubmit={handleSubmit((d) =>
          //postData("https://misiapi.lamptechs.com/api/v1/ticket/store", d)
          console.log("ticket store data", d)
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
              {/* Patient Id */}
              <div className="grid gap-4  mt-2.5">
                <div className="relative">
                  {patientList?.data ? (
                    <Stack>
                      <Autocomplete
                        onChange={(event, value) => {
                          //setSearchInput(value);
                          // debounce(setSearchInput(value), 500);
                        }}
                        // onChange={(event, value) => setMovie(value)}
                        size="small"
                        freeSolo
                        // id="free-solo-2-demo"
                        disableClearable
                        options={patientList?.data.map(
                          (patient) =>
                            `${patient.id} ${patient.first_name} ${patient.last_name}`
                        )}
                        renderInput={(params) => (
                          <TextField
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
              </div>
              {/* Assign To therapist and pass department */}
              <div className="grid gap-4 grid-cols-2 mt-2.5">
                {/* Assign To therapist */}

                {/* <div className="grid gap-4  mt-2.5">
                  <div className="relative">
                    {patientList?.data ? (
                      <Stack>
                        <Autocomplete
                          value={value}
                          onChange={(event, newValue) => {
                            setValue(newValue);
                          }}
                          inputValue={inputValue}
                          onInputChange={(event, newInputValue) => {
                            setInputValue(newInputValue);
                          }}
                          size="small"
                          freeSolo
                          // id="free-solo-2-demo"
                          disableClearable
                          options={therapistList?.data.map(
                            (therapist) =>
                              `${therapist.id} ${therapist.first_name} ${therapist.last_name}`
                          )}
                          renderInput={(params) => (
                            <TextField
                              id="therapist_id"
                              {...register("therapist_id")}
                              {...params}
                              label="Search therapist"
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
                <div className="relative">
                  {therapistList?.data ? (
                    <div className="relative my-3">
                      <select
                        id="therapist_id"
                        {...register("therapist_id")}
                        className="block px-2.5 pb-2 pt-2.5 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
                      >
                        <option selected>Assign to therapist</option>
                        {therapistList.data?.map((item) => (
                          <option key={item.id} value={`${item?.id}`}>
                            {`${item?.first_name} ${item?.last_name}`}
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
                <div className="relative">
                  {ticketDepartment?.data ? (
                    <div className="relative my-3">
                      <select
                        id="ticket_department_id"
                        {...register("ticket_department_id")}
                        className="block px-2.5 pb-2 pt-2.5 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
                      >
                        <option selected>Select department</option>
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
              </div>{" "}
              {/* call strike  and remarks*/}
              <div className="grid gap-4 grid-cols-2 mt-2.5">
                {/* call strike  */}
                <div className="relative">
                  <select
                    id="strike"
                    {...register("strike")}
                    className="block px-2.5 pb-2 pt-2.5 py-2.5 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
                  >
                    <option selected>Select Call Strike </option>
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
                {/* remarks  */}
                <div className="col-start-2  relative  ">
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
              </div>
              {/* strike History */}
              <div className="relative  mt-2.5">
                <textarea
                  className="block px-2.5 pb-2 pt-2.5 py-2.5 w-full rows-4 text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
                  id="strike_history"
                  {...register("strike_history")}
                  type="text"
                  placeholder="  "
                />
                <label
                  htmlFor="textarea"
                  className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-teal-500 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                >
                  Strike history
                </label>
              </div>
              {/*  status and Language */}
              <div className="grid grid-cols-2 gap-4 my-2.5">
                {/* status */}
                <div className="  relative">
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
                    className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-teal-500 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                  >
                    Status
                  </label>
                </div>
                {/* Language    */}
                <div className="relative">
                  <select
                    id="language"
                    {...register("language")}
                    className="block px-2.5 pb-2 pt-2.5 py-2.5 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
                  >
                    <option selected>Select Language</option>
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

export default EditTicket;

// useDebounce onchange react
// patient form separation
// search api 'singlePatient'
// 'singlePatient?.data' ? then show data a from :another blank form
