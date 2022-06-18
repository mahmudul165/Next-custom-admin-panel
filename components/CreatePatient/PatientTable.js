import Table from "rc-table";
import React, { useEffect, useState } from "react";
import Pagination from "react-js-pagination";
import useSWR from "swr";
import styled from "styled-components";
import OperationModal from "../common/OperationModal";
import PaitentForm from "./PatientForm";
import Link from "next/link";
import useAuth from "/hook/useAuth";
import axios from "axios";
import { patientList } from "../../hook/useApi";
import { useQuery } from "react-query";

const PatientTable = () => {
  const { deleteData, Statustest } = useAuth();
  //   Catch Search input
  const [searchInput, setInput] = useState([]);
  const [statusSearch, setStatus] = useState([]);
  // const handleSearchChange = (e) => {
  //   e.preventDefault();
  //   setInput(e.target.value.toLowerCase());
  //   console.log(searchInput);
  // };
  const [results, setResults] = useState([]);
  // console.log("results", results);
  // console.log("Search input value ", searchInput);
  // console.log("Search status value ", statusSearch);

  //const { handleSearchChange, searchInput } = useAuth();
  useEffect(() => {
    const urls = [
      // "https://arshi365.lamptechs.com/api/admin/products",
      // "https://arshi365.lamptechs.com/api/admin/todaysDeal",
      "https://misiapi.lamptechs.com/api/patient",
    ];

    Promise.all(
      urls.map((url) =>
        fetch(url)
          .then((response) => response.json())
          .then((data) => setResults(data))
          .catch((error) => console.log("There was a problem!", error))
      ),
      []
    );
  }, []);

  const [modal, setModal] = useState(false);
  const BodyRow = styled.tr`
    & th {
      color: rgb(148 163 184);
      background: rgb(20 184 166);
    }
    & td {
      color: rgb(15 23 42);
      transition: all 0.3s;
    }
    &:hover td {
      background: rgb(20 184 166);
      color: white;
      transform: scale(1.01);
    }
  `;

  const components = {
    body: {
      row: BodyRow,
    },
  };
  //   "id": 1,
  // "service_subcategory_name": "service 2 updated",
  // "status": "A",
  // "remarks": "Checking update",
  // "service_category_id": "1"
  // const { data, error } = useSWR(
  //   "https://misiapi.lamptechs.com/api/v1/therapistService",
  //   { fetcher: async (url) => await fetch(url).then((res) => res.json()) }
  //    { fetcher: async (url) => await axios.get(url).then((res) => res.data) }
  // );

  const { data, error, isError, isLoading } = useQuery("posts", patientList);

  //Pagination
  const [activePage, setActivePage] = useState(10);
  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };

  return (
    <section className="p-4">
      <>
        <div className="flex justify-between     ">
          {/*ticket search */}

          {/* <div className="flex  ">
            <div className="mb-3 xl:w-72">
              <div className="input-group relative flex flex-wrap items-stretch w-full mb-4">
                <input
                  type="text"
                  className="form-control relative flex-auto min-w-0 block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  placeholder="Ticket id "
                  aria-label="Search"
                  aria-describedby="button-addon2"
                />
                <button
                  className="btn inline-block px-6 py-2.5 bg-teal-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700  focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out flex items-center"
                  type="button"
                  id="button-addon2"
                >
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fas"
                    data-icon="search"
                    className="w-4"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                  >
                    <path
                      fill="currentColor"
                      d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>
          </div> */}
          {/*patient id search */}
          <div className="  flex  ">
            <div className="  xl:w-72">
              <div className="input-group relative flex flex-wrap items-stretch w-full  ">
                <input
                  type="search"
                  className="form-control relative flex-auto min-w-0 block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  placeholder="patient id"
                  aria-label="Search"
                  aria-describedby="button-addon2"
                  onChange={(e) => setInput(e.target.value)}
                />
                <button
                  className="btn inline-block px-6 py-2.5   text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700  focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out flex items-center"
                  type="button"
                  id="button-addon2"
                  style={{ backgroundColor: "#01a9ac" }}
                >
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fas"
                    data-icon="search"
                    className="w-4"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                  >
                    <path
                      fill="currentColor"
                      d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
          {/* status */}
          <div className="relative w-64  ">
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
              onChange={(e) => setStatus(e.target.value)}
            >
              {/* <option selected>status</option> */}
              <option value="A" selected>
                Active
              </option>
              <option value="I">Inactive</option>
              <option value="P">Pending</option>
              <option value="C">Cancelled</option>
              <option value="D">Deleted</option>
            </select>
            <label
              htmlFor="remarks"
              className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-teal-500 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
            >
              Status
            </label>
          </div>
        </div>
      </>
      {results ? (
        <>
          <div className="min-h-screen bg-white-800 py-3">
            <div className="overflow-x-auto w-full">
              <table className="mx-auto max-w-4xl w-full whitespace-nowrap rounded-lg bg-white divide-y divide-gray-300 overflow-hidden">
                <thead
                  className="  border"
                  style={{ backgroundColor: "#01a9ac" }}
                >
                  <tr className="border font-semibold text-white text-sm    text-center  ">
                    <th className=" font-semibold text-base px-2.5 py-2.5 border">
                      #
                    </th>
                    <th className=" font-semibold text-base px-2.5 py-2.5 border">
                      First Name
                    </th>
                    <th className=" font-semibold text-base px-2.5 py-2.5 border">
                      Last Name
                    </th>
                    <th className=" font-semibold text-base px-2.5 py-2.5 border">
                      Email Address
                    </th>
                    <th className=" font-semibold text-base px-2.5 py-2.5 border">
                      Phone Number
                    </th>
                    <th className=" font-semibold text-base px-2.5 py-2.5 border">
                      Residential Address
                    </th>
                    <th className=" font-semibold text-base px-2.5 py-2.5 border">
                      State/City
                    </th>
                    <th className=" font-semibold text-base px-2.5 py-2.5 border">
                      Nationality
                    </th>
                    <th className=" font-semibold text-base px-2.5 py-2.5 border">
                      Age
                    </th>
                    <th className=" font-semibold text-base px-2.5 py-2.5 border">
                      Marital status
                    </th>
                    <th className=" font-semibold text-base px-2.5 py-2.5 border">
                      Date of Birth
                    </th>
                    <th className=" font-semibold text-base px-2.5 py-2.5 border">
                      Occupation
                    </th>
                    <th className=" font-semibold text-base px-2.5 py-2.5 border">
                      Emergency Contacts
                    </th>
                    <th className=" font-semibold text-base px-2.5 py-2.5 border">
                      BSN Number
                    </th>
                    <th className=" font-semibold text-base px-2.5 py-2.5 border">
                      DOB Number
                    </th>
                    <th className=" font-semibold text-base px-2.5 py-2.5 border">
                      Insurance Number
                    </th>
                    <th className=" font-semibold text-base px-2.5 py-2.5 border">
                      Sex
                    </th>
                    <th className=" font-semibold text-base px-2.5 py-2.5 border">
                      Medical History
                    </th>
                    <th className=" font-semibold text-base px-2.5 py-2.5 border">
                      Blood Group
                    </th>
                    <th className=" font-semibold text-base px-2.5 py-2.5 border">
                      File Upload
                    </th>
                    <th className=" font-semibold text-base px-2.5 py-2.5 border">
                      {" "}
                      Remarks
                    </th>
                    <th className=" font-semibold text-base px-2.5 py-2.5 border">
                      {" "}
                      Status
                    </th>
                    <th className=" font-semibold text-base px-2.5 py-2.5 border">
                      Operations
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {searchInput.length < 1 && statusSearch.length < 1 ? (
                    <>
                      {results.map((data, index) => {
                        return (
                          <>
                            <tr className=" hover:bg-gray-100  hover:text-sm   border">
                              <td className="border px-2 py-2 text-center ">
                                {data.id}
                              </td>
                              <td className="border px-2 py-2 text-center ">
                                {data.patient_first_name}
                              </td>
                              <td className="border px-2 py-2 text-center ">
                                {data.patient_last_name}
                              </td>
                              <td className="border px-2 py-2 text-center ">
                                {data.patient_email}
                              </td>
                              <td className="border px-2 py-2 text-center ">
                                {data.patient_phone}
                              </td>
                              <td className="border px-2 py-2 text-center ">
                                {data.patient_address}
                              </td>
                              <td className="border px-2 py-2 text-center ">
                                {data.patient_city}
                              </td>
                              <td className="border px-2 py-2 text-center ">
                                {data.patient_country}
                              </td>
                              <td className="border px-2 py-2 text-center ">
                                {data.age}
                              </td>
                              <td className="border px-2 py-2 text-center ">
                                {data.marital_status}
                              </td>
                              <td className="border px-2 py-2 text-center ">
                                {data.date_of_birth}
                              </td>
                              <td className="border px-2 py-2 text-center ">
                                {data.occupation}
                              </td>
                              <td className="border px-2 py-2 text-center ">
                                {data.emergency_contact}
                              </td>
                              <td className="border px-2 py-2 text-center ">
                                {data.bsn_number}
                              </td>
                              <td className="border px-2 py-2 text-center ">
                                {data.dob_number}
                              </td>
                              <td className="border px-2 py-2 text-center ">
                                {data.insurance_number}
                              </td>
                              <td className="border px-2 py-2 text-center ">
                                {data.sex}
                              </td>
                              <td className="border px-2 py-2 text-center ">
                                {data.medical_history}
                              </td>
                              <td className="border px-2 py-2 text-center ">
                                {data.blood_group}
                              </td>
                              <td className="border px-2 py-2 text-center ">
                                {data.patient_picture_name}
                              </td>
                              <td className="border px-2 py-2 text-center   ">
                                {data.admin_remarks}
                              </td>
                              <td className="border px-2 py-2 text-center   ">
                                <span className="text-white text-sm w-1/3 pb-1 bg-green-600 font-semibold px-2 rounded-full">
                                  {/* {data.status == "A" ? "Active" : "inactive"} */}
                                  {/* {Statustest(data.status)} */}
                                  {data.status}
                                </span>
                              </td>
                              <td className="border px-2 py-2 text-center   ">
                                <>
                                  <Link href={`/patient/edit/${data.id}`}>
                                    <a className="text-purple-800 hover:underline">
                                      Edit
                                    </a>
                                  </Link>
                                  <span> | </span>
                                  <>
                                    <a
                                      href=""
                                      className="text-purple-800 hover:underline"

                                      // onClick={() =>
                                      //   deleteData(
                                      //     `https://misiapi.lamptechs.com/api/v1/service/delete`,
                                      //     data.id
                                      //   )
                                      // }
                                    >
                                      Delete
                                    </a>
                                  </>
                                </>
                              </td>
                            </tr>
                          </>
                        );
                      })}
                    </>
                  ) : (
                    <>
                      {results
                        .filter(
                          (i) =>
                            i.id == searchInput || i.status === statusSearch
                        )
                        .map((data, index) => {
                          return (
                            <>
                              <tr className="  hover:bg-gray-200   border">
                                <td className="border px-2 py-2 text-center ">
                                  {data.id}
                                </td>
                                <td className="border px-2 py-2 text-center ">
                                  {data.patient_first_name}
                                </td>
                                <td className="border px-2 py-2 text-center ">
                                  {data.patient_last_name}
                                </td>
                                <td className="border px-2 py-2 text-center ">
                                  {data.patient_email}
                                </td>
                                <td className="border px-2 py-2 text-center ">
                                  {data.patient_phone}
                                </td>
                                <td className="border px-2 py-2 text-center ">
                                  {data.patient_address}
                                </td>
                                <td className="border px-2 py-2 text-center ">
                                  {data.patient_city}
                                </td>
                                <td className="border px-2 py-2 text-center ">
                                  {data.patient_country}
                                </td>
                                <td className="border px-2 py-2 text-center ">
                                  {data.age}
                                </td>
                                <td className="border px-2 py-2 text-center ">
                                  {data.marital_status}
                                </td>
                                <td className="border px-2 py-2 text-center ">
                                  {data.date_of_birth}
                                </td>
                                <td className="border px-2 py-2 text-center ">
                                  {data.occupation}
                                </td>
                                <td className="border px-2 py-2 text-center ">
                                  {data.emergency_contact}
                                </td>
                                <td className="border px-2 py-2 text-center ">
                                  {data.bsn_number}
                                </td>
                                <td className="border px-2 py-2 text-center ">
                                  {data.dob_number}
                                </td>
                                <td className="border px-2 py-2 text-center ">
                                  {data.insurance_number}
                                </td>
                                <td className="border px-2 py-2 text-center ">
                                  {data.sex}
                                </td>
                                <td className="border px-2 py-2 text-center ">
                                  {data.medical_history}
                                </td>
                                <td className="border px-2 py-2 text-center ">
                                  {data.blood_group}
                                </td>
                                <td className="border px-2 py-2 text-center ">
                                  {data.patient_picture_name}
                                </td>
                                <td className="border px-2 py-2 text-center   ">
                                  {data.admin_remarks}
                                </td>
                                <td className="border px-2 py-2 text-center   ">
                                  <span className="text-white text-sm w-1/3 pb-1 bg-green-600 font-semibold px-2 rounded-full">
                                    {/* {data.status == "A" ? "Active" : "inactive"} */}
                                    {Statustest(data.status)}
                                  </span>
                                </td>
                                <td className="border px-2 py-2 text-center   ">
                                  <>
                                    <Link href={`/patient/edit/${data.id}`}>
                                      <a className="text-purple-800 hover:underline">
                                        dddEdit
                                      </a>
                                    </Link>
                                    <span> | </span>
                                    <>
                                      <a
                                        href=""
                                        className="text-purple-800 hover:underline"

                                        // onClick={() =>
                                        //   deleteData(
                                        //     `https://misiapi.lamptechs.com/api/v1/service/delete`,
                                        //     data.id
                                        //   )
                                        // }
                                      >
                                        Delete
                                      </a>
                                    </>
                                  </>
                                </td>
                              </tr>
                            </>
                          );
                        })}
                    </>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      ) : (
        <div className="text-center">
          <svg
            role="status"
            className="inline w-20 h-20 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-teal-500"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
        </div>
      )}
    </section>
  );
};

export default PatientTable;
