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
import dynamic from "next/dynamic";
const Loading = dynamic(() => import("/components/common/Loading"));
import {
  usePatientListQuery,
  //usePatientQuery,
  useTherapitListQuery,
  useAllTicketDepartmentQuery,
  usePibQuestion,
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
function PibFormFormula() {
  const { postData } = useAuth();
  const [searchInput, setSearchInput] = useState("");
  console.log("search paitent id from ticket from", searchInput);
  const [startDate, setStartDate] = useState(new Date());
  const { register, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });
  const { data: patientList } = usePatientListQuery();
  const { data: therapistList } = useTherapitListQuery();
  const { data: ticketDepartment } = useAllTicketDepartmentQuery();
  const { data: pibQuestion } = usePibQuestion();
  const handleSearchChange = (e) => {
    setSearchInput(e.target.value);
  };

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

  return (
    <>
      <form
        className="w-10/12 m-auto p-12  first-line: "
        onSubmit={handleSubmit((d) =>
          //postData("https://misiapi.lamptechs.com/api/v1/ticket/store", d)
          console.log("pit store data", d)
        )}
      >
        <div className=" px-3 ">
          <div className="card d-flex justify-center ">
            <h2
              className="mt-3 text-center text-3xl font-extrabold  "
              style={{ color: "#01a9ac" }}
            >
              PIT formula
            </h2>
            {/* table */}
            <div className=" mx-3 px-3 ">
              <div className="grid gap-4  mt-2.5">
                <div className="relative   px-6">
                  {patientList?.data ? (
                    <Stack>
                      <Autocomplete
                        onChange={(event, value) => {
                          //setSearchInput(value);
                          debounce(setSearchInput(value), 500);
                        }}
                        // onChange={(event, value) => setMovie(value)}
                        size="small"
                        freeSolo
                        // id="free-solo-2-demo"
                        disableClearable
                        //options={patientList?.data.map((patient) => patient.id)}
                        options={patientList?.data.map(
                          (patient) =>
                            `${patient?.id}-${patient?.first_name} ${patient?.last_name} - ${patient?.phone}`
                        )}
                        // getOptionLabel={(option) => option?.id}
                        renderInput={(params) => (
                          <TextField
                            // onChange={handleSearchChange}
                            // onChange={debounce(handleSearchChange, 500)}
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
              {singlepatient ? (
                <>
                  <div className="relative overflow-x-auto shadow-md sm:rounded-lg card m-4 p-4 shadow-lg">
                    <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
                      <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                          <th scope="col" className="py-3 fs-5 fw-bolder">
                            Pre intake beoordeling (PIT)
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
                          <th
                            scope="row"
                            className="whitespace-normal px-2 py-4 font-medium text-gray-900 dark:text-white"
                          >
                            Name Pit-er:
                          </th>
                          <td className="px-6 py-4">data will coming</td>
                        </tr>
                        <tr className="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
                          <th
                            scope="row"
                            className="whitespace-normal px-2 py-4 font-medium text-gray-900 dark:text-white"
                          >
                            Patient name:
                          </th>
                          <td className="px-6 py-4">{`${singlepatient.first_name} ${singlepatient.last_name} `}</td>
                        </tr>
                        <tr className="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
                          <th
                            scope="row"
                            className="whitespace-normal px-2 py-4 font-medium text-gray-900 dark:text-white"
                          >
                            Patient Code:
                          </th>
                          <td className="px-6 py-4">{`${singlepatient.id}`}</td>
                        </tr>
                        {/* <tr className="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
                          <th
                            scope="row"
                            className="whitespace-normal px-2 py-4 font-medium text-gray-900 dark:text-white"
                          >
                            Patient email:
                          </th>
                          <td className="px-6 py-4">{`${singlepatient.email}`}</td>
                        </tr> */}
                        <tr className="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
                          <th
                            scope="row"
                            className="whitespace-normal px-2 py-4 font-medium text-gray-900 dark:text-white"
                          >
                            Type of Legitimation:
                          </th>
                          <td className="px-6 py-4">White</td>
                        </tr>
                        <tr className="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
                          <th
                            scope="row"
                            className="whitespace-normal px-2 py-4 font-medium text-gray-900 dark:text-white"
                          >
                            Document number:
                          </th>
                          <td className="px-6 py-4">White</td>
                        </tr>
                        <tr className="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
                          <th
                            scope="row"
                            className="whitespace-normal px-2 py-4 font-medium text-gray-900 dark:text-white"
                          >
                            Identification expiration date:
                          </th>
                          <td className="px-6 py-4">White</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </>
              ) : (
                <>{/* <Loading /> */}</>
              )}
            </div>
          </div>
          {/* question table */}
          <div className=" card d-flex justify-center ">
            {/* table */}
            <div className=" mx-3 px-3 ">
              <div className="relative overflow-x-auto shadow-md sm:rounded-lg  m-4 p-4 shadow-lg">
                <h6 className="fs-6 fw-bold mb-3">Rage form:</h6>
                <small className="break-all">
                  We have reviewed your referral letter and have additional
                  questions that we want to ask you in order to be able to make
                  a good choice whether we can offer you the right treatment.
                  The conversation will last about 15 minutes. After this we
                  will call you back with a few (2-3 days). If we do not have
                  the right care for you, we will explain why that is the case
                  and if possible, advise another institution. We are a
                  diagnostic and psychotherapeutic center and do not provide
                  medication during treatment. If necessary/useful, the doctor
                  will give you medication during your treatment with us.
                </small>
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                  {/* <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
                    <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400"> */}

                  <table className="mt-4 mx-auto max-w-5xl w-full whitespace-nowrap rounded-lg bg-white  divide-gray-300 overflow-hidden">
                    <thead
                      className="  "
                      style={{ backgroundColor: "#01a9ac" }}
                    >
                      {" "}
                      <tr>
                        <th scope="col" className="text-white px-6 py-3">
                          To ask
                        </th>
                        <th
                          scope="col"
                          className="text-center text-white px-6 py-3"
                        >
                          <p> Serious</p>
                          <small>(Scale 0-10)</small>
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {pibQuestion?.data?.map((question) => (
                        <>
                          <tr className="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
                            <th
                              scope="row"
                              className="whitespace-normal px-2 py-4 font-medium text-gray-900 dark:text-white"
                            >
                              {question?.question}
                            </th>
                            <td className="px-6 py-4">
                              {" "}
                              <div className="relative   ">
                                <input
                                  // {...register("name")}
                                  type="text"
                                  id="name"
                                  className="block px-2.5 pb-2 pt-2.5 py-2.5 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
                                  placeholder="  "
                                  required
                                />
                                <label
                                  htmlFor="name"
                                  className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-teal-500 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                                ></label>
                              </div>
                            </td>
                          </tr>
                        </>
                      ))}
                    </tbody>
                  </table>
                </div>
                {/* save submit button */}
                <div className="my-3 px-3 md:flex md:items-center justify-end ">
                  {/* <div className="md:w-1/2"> */}
                  <button
                    className="shadow   hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                    type="submit"
                    style={{ backgroundColor: "#01a9ac" }}
                  >
                    Save
                  </button>
                  {/* className="my-6 text-center text-3xl font-extrabold bg-teal-500"  */}
                  {/* </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

export default PibFormFormula;

{
  /* <div id="language" className="relative my-3">
  <select
    id="language"
    {...register("language")}
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
    className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-teal-500 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
  >
    Language
  </label>
</div>; */
}
