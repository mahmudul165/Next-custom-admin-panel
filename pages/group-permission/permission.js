import React from "react";
import { TiTick, TiDelete } from "react-icons/ti";
function permission() {
  return (
    <>
      {" "}
      <form
        className="w-10/12 m-auto   first-line: "
        // onSubmit={handleSubmit(
        //   (d) =>
        //     postData("https://misiapi.lamptechs.com/api/v1/ticket/store", d)

        //   //console.log("ticket store data", d)
        // )}
      >
        <div className="">
          <div className=" card d-flex      justify-center ">
            {/* <h2
              className="mt-3 text-center text-3xl font-extrabold  "
              style={{ color: "#01a9ac" }}
            >
              Permission Access for Author
            </h2> */}
            {/* first portion of the form */}
            <div className=" m-3 p-3 ">
              {/*  Closure AND Aanm-intake 1 (dagentussen) */}
              <div className="grid grid-cols-2  gap-4 mt-2.5">
                {/* Closure*/}
                <div
                  className="col-start-1 relative text-center text-3xl font-extrabold  "
                  style={{ color: "#01a9ac" }}
                >
                  {/* <h2
                    className="mt-3 text-center text-3xl font-extrabold  "
                    style={{ color: "#01a9ac" }}
                  > */}
                  Permission Access for Author
                  {/* </h2> */}
                </div>
                {/* Aanm-intake 1 (dagentussen) */}
                <div className="col-start-2 relative  ">
                  <div
                    className="inline-flex rounded-md shadow-sm"
                    role="group"
                  >
                    <button
                      type="button"
                      className="inline-flex items-center py-2 px-4 text-sm font-medium text-gray-900 bg-white rounded-l-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
                    >
                      {/* <svg
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
                        ></path>
                      </svg> */}
                      <TiTick className="text-2xl" />
                      Check All
                    </button>
                    <button
                      type="button"
                      className="inline-flex items-center py-2 px-4 text-sm font-medium text-gray-900 bg-white border-t border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
                    >
                      {/* <svg
                        aria-hidden="true"
                        className="mr-2 w-4 h-4 fill-current"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z"></path>
                      </svg> */}
                      <TiDelete className="text-2xl" />
                      Uncheck All
                    </button>
                    <button
                      type="button"
                      className="inline-flex items-center py-2 px-4 text-sm font-medium text-gray-900 bg-white rounded-r-md border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
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
                          d="M2 9.5A3.5 3.5 0 005.5 13H9v2.586l-1.293-1.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 15.586V13h2.5a4.5 4.5 0 10-.616-8.958 4.002 4.002 0 10-7.753 1.977A3.5 3.5 0 002 9.5zm9 3.5H9V8a1 1 0 012 0v5z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      Save Permission
                    </button>
                  </div>
                </div>
              </div>
              {/* 2nd part */}
              <div className="grid grid-cols-3  gap-4 mt-6">
                {/* admin */}
                <div className="col-start-1 relative px-2 my-2 ">
                  <h3 className="mt-8 mb-4 text-xl font-semibold text-gray-900 dark:text-white">
                    Admin
                  </h3>
                  <ul className="w-48 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                    <li className="w-full rounded-t-lg border-b border-gray-200 dark:border-gray-600">
                      <div className="flex items-center pl-3">
                        <input
                          id="vue-checkbox"
                          type="checkbox"
                          value=""
                          className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                        />
                        <label
                          htmlFor="vue-checkbox"
                          className="py-3 ml-2 w-full text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          Create Table Show
                        </label>
                      </div>
                    </li>
                    <li className="w-full rounded-t-lg border-b border-gray-200 dark:border-gray-600">
                      <div className="flex items-center pl-3">
                        <input
                          id="react-checkbox"
                          type="checkbox"
                          value=""
                          className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                        />
                        <label
                          htmlFor="react-checkbox"
                          className="py-3 ml-2 w-full text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          Create Admin
                        </label>
                      </div>
                    </li>
                    <li className="w-full rounded-t-lg border-b border-gray-200 dark:border-gray-600">
                      <div className="flex items-center pl-3">
                        <input
                          id="angular-checkbox"
                          type="checkbox"
                          value=""
                          className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                        />
                        <label
                          htmlFor="angular-checkbox"
                          className="py-3 ml-2 w-full text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          Admin Delete
                        </label>
                      </div>
                    </li>
                  </ul>
                </div>
                {/* Screener Group  */}
                <div className="col-start-2 relative px-2 my-2 ">
                  <h3 className="mt-8 mb-4 text-xl font-semibold text-gray-900 dark:text-white">
                    Screener Group
                  </h3>
                  <ul className="w-48 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                    <li className="w-full rounded-t-lg border-b border-gray-200 dark:border-gray-600">
                      <div className="flex items-center pl-3">
                        <input
                          id="vue-checkbox"
                          type="checkbox"
                          value=""
                          className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                        />
                        <label
                          htmlFor="vue-checkbox"
                          className="py-3 ml-2 w-full text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          Create Table Show
                        </label>
                      </div>
                    </li>
                    <li className="w-full rounded-t-lg border-b border-gray-200 dark:border-gray-600">
                      <div className="flex items-center pl-3">
                        <input
                          id="react-checkbox"
                          type="checkbox"
                          value=""
                          className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                        />
                        <label
                          htmlFor="react-checkbox"
                          className="py-3 ml-2 w-full text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          Create Admin
                        </label>
                      </div>
                    </li>
                    <li className="w-full rounded-t-lg border-b border-gray-200 dark:border-gray-600">
                      <div className="flex items-center pl-3">
                        <input
                          id="angular-checkbox"
                          type="checkbox"
                          value=""
                          className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                        />
                        <label
                          htmlFor="angular-checkbox"
                          className="py-3 ml-2 w-full text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          Admin Delete
                        </label>
                      </div>
                    </li>
                  </ul>
                </div>
                {/* Waiting for 'YES' Approval  */}
                <div className="col-start-3 relative px-2 my-2 ">
                  <h3 className="mt-8 mb-4 text-xl font-semibold text-gray-900 dark:text-white">
                    Waiting for YES Approval
                  </h3>
                  <ul className="w-48 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                    <li className="w-full rounded-t-lg border-b border-gray-200 dark:border-gray-600">
                      <div className="flex items-center pl-3">
                        <input
                          id="vue-checkbox"
                          type="checkbox"
                          value=""
                          className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                        />
                        <label
                          htmlFor="vue-checkbox"
                          className="py-3 ml-2 w-full text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          Create Table Show
                        </label>
                      </div>
                    </li>
                    <li className="w-full rounded-t-lg border-b border-gray-200 dark:border-gray-600">
                      <div className="flex items-center pl-3">
                        <input
                          id="react-checkbox"
                          type="checkbox"
                          value=""
                          className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                        />
                        <label
                          htmlFor="react-checkbox"
                          className="py-3 ml-2 w-full text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          Create Admin
                        </label>
                      </div>
                    </li>
                    <li className="w-full rounded-t-lg border-b border-gray-200 dark:border-gray-600">
                      <div className="flex items-center pl-3">
                        <input
                          id="angular-checkbox"
                          type="checkbox"
                          value=""
                          className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                        />
                        <label
                          htmlFor="angular-checkbox"
                          className="py-3 ml-2 w-full text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          Admin Delete
                        </label>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="grid grid-cols-3  gap-4 mt-6">
                {/*Appointment Group   */}
                <div className="col-start-1 relative px-2 my-2 ">
                  <h3 className="mt-8 mb-4 text-xl font-semibold text-gray-900 dark:text-white">
                    Appointment Group
                  </h3>
                  <ul className="w-48 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                    <li className="w-full rounded-t-lg border-b border-gray-200 dark:border-gray-600">
                      <div className="flex items-center pl-3">
                        <input
                          id="vue-checkbox"
                          type="checkbox"
                          value=""
                          className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                        />
                        <label
                          htmlFor="vue-checkbox"
                          className="py-3 ml-2 w-full text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          Create Table Show
                        </label>
                      </div>
                    </li>
                    <li className="w-full rounded-t-lg border-b border-gray-200 dark:border-gray-600">
                      <div className="flex items-center pl-3">
                        <input
                          id="react-checkbox"
                          type="checkbox"
                          value=""
                          className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                        />
                        <label
                          htmlFor="react-checkbox"
                          className="py-3 ml-2 w-full text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          Create Admin
                        </label>
                      </div>
                    </li>
                    <li className="w-full rounded-t-lg border-b border-gray-200 dark:border-gray-600">
                      <div className="flex items-center pl-3">
                        <input
                          id="angular-checkbox"
                          type="checkbox"
                          value=""
                          className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                        />
                        <label
                          htmlFor="angular-checkbox"
                          className="py-3 ml-2 w-full text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          Admin Delete
                        </label>
                      </div>
                    </li>
                  </ul>
                </div>
                {/*PiT Group(Specialist)    */}
                <div className="col-start-2 relative px-2 my-2 ">
                  <h3 className="mt-8 mb-4 text-xl font-semibold text-gray-900 dark:text-white">
                    PiT Group(Specialist)
                  </h3>
                  <ul className="w-48 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                    <li className="w-full rounded-t-lg border-b border-gray-200 dark:border-gray-600">
                      <div className="flex items-center pl-3">
                        <input
                          id="vue-checkbox"
                          type="checkbox"
                          value=""
                          className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                        />
                        <label
                          htmlFor="vue-checkbox"
                          className="py-3 ml-2 w-full text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          Create Table Show
                        </label>
                      </div>
                    </li>
                    <li className="w-full rounded-t-lg border-b border-gray-200 dark:border-gray-600">
                      <div className="flex items-center pl-3">
                        <input
                          id="react-checkbox"
                          type="checkbox"
                          value=""
                          className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                        />
                        <label
                          htmlFor="react-checkbox"
                          className="py-3 ml-2 w-full text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          Create Admin
                        </label>
                      </div>
                    </li>
                    <li className="w-full rounded-t-lg border-b border-gray-200 dark:border-gray-600">
                      <div className="flex items-center pl-3">
                        <input
                          id="angular-checkbox"
                          type="checkbox"
                          value=""
                          className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                        />
                        <label
                          htmlFor="angular-checkbox"
                          className="py-3 ml-2 w-full text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          Admin Delete
                        </label>
                      </div>
                    </li>
                  </ul>
                </div>
                {/* PiB Group(Moderate)  */}
                <div className="col-start-3 relative px-2 my-2 ">
                  <h3 className="mt-8 mb-4 text-xl font-semibold text-gray-900 dark:text-white">
                    PiB Group(Moderate)
                  </h3>
                  <ul className="w-48 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                    <li className="w-full rounded-t-lg border-b border-gray-200 dark:border-gray-600">
                      <div className="flex items-center pl-3">
                        <input
                          id="vue-checkbox"
                          type="checkbox"
                          value=""
                          className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                        />
                        <label
                          htmlFor="vue-checkbox"
                          className="py-3 ml-2 w-full text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          Create Table Show
                        </label>
                      </div>
                    </li>
                    <li className="w-full rounded-t-lg border-b border-gray-200 dark:border-gray-600">
                      <div className="flex items-center pl-3">
                        <input
                          id="react-checkbox"
                          type="checkbox"
                          value=""
                          className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                        />
                        <label
                          htmlFor="react-checkbox"
                          className="py-3 ml-2 w-full text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          Create Admin
                        </label>
                      </div>
                    </li>
                    <li className="w-full rounded-t-lg border-b border-gray-200 dark:border-gray-600">
                      <div className="flex items-center pl-3">
                        <input
                          id="angular-checkbox"
                          type="checkbox"
                          value=""
                          className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                        />
                        <label
                          htmlFor="angular-checkbox"
                          className="py-3 ml-2 w-full text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          Admin Delete
                        </label>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="grid grid-cols-3  gap-4 mt-6">
                {/*Waiting for 'NO' Approval  */}
                <div className="col-start-1 relative px-2 my-2 ">
                  <h3 className="mt-8 mb-4 text-xl font-semibold text-gray-900 dark:text-white">
                    Waiting for NO Approval
                  </h3>
                  <ul className="w-48 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                    <li className="w-full rounded-t-lg border-b border-gray-200 dark:border-gray-600">
                      <div className="flex items-center pl-3">
                        <input
                          id="vue-checkbox"
                          type="checkbox"
                          value=""
                          className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                        />
                        <label
                          htmlFor="vue-checkbox"
                          className="py-3 ml-2 w-full text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          Create Table Show
                        </label>
                      </div>
                    </li>
                    <li className="w-full rounded-t-lg border-b border-gray-200 dark:border-gray-600">
                      <div className="flex items-center pl-3">
                        <input
                          id="react-checkbox"
                          type="checkbox"
                          value=""
                          className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                        />
                        <label
                          htmlFor="react-checkbox"
                          className="py-3 ml-2 w-full text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          Create Admin
                        </label>
                      </div>
                    </li>
                    <li className="w-full rounded-t-lg border-b border-gray-200 dark:border-gray-600">
                      <div className="flex items-center pl-3">
                        <input
                          id="angular-checkbox"
                          type="checkbox"
                          value=""
                          className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                        />
                        <label
                          htmlFor="angular-checkbox"
                          className="py-3 ml-2 w-full text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          Admin Delete
                        </label>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              {/* end new field  */}
              {/* <div className=" flex justify-end">
                <button
                  className="decoration-4 text-xl shadow mt-6   hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                  type="submit"
                  style={{ backgroundColor: "#01a9ac" }}
                >
                  Save
                </button>
              </div> */}
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

export default permission;
