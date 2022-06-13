/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import "react-pure-modal/dist/react-pure-modal.min.css";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import useAuth from "/hook/useAuth";

const schema = yup
  .object()
  .shape({
    name: yup.string().required(),
    // details: yup.string().required(),
    //remarks: yup.string().required(),
    // remarks: yup.string().required(),
    status: yup.string().required(),
  })
  .required();
const CategoryForm = ({ modal, setModal }) => {
  const { postData } = useAuth();
  const { register, handleSubmit, error } = useForm({
    resolver: yupResolver(schema),
  });

  return (
    <>
      <form
        className="w-full     m-auto max-w-sm my-3 p-2 bg-white border-0   "
        onSubmit={handleSubmit((d) =>
          postData("https://misiapi.lamptechs.com/api/service/store", d)
        )}
        type="submit"
      >
        {" "}
        <h2 className="my-6 text-center text-3xl font-extrabold text-teal-500">
          Category
        </h2>
        {/* Name  */}
        <div className="relative  my-3">
          <input
            {...register("name")}
            type="text"
            id="name"
            className="block px-2.5 pb-2 pt-2.5 py-2.5 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
            placeholder="  "
            required
          />
          <label
            htmlFor="name"
            className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-teal-500 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
          >
            Category Name
          </label>
        </div>
        {/* details */}
        {/* <div className="relative  my-3">
          <input
            type="text"
            id="details"
            className="block px-2.5 pb-2 pt-2.5 py-2.5 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
            placeholder="  "
          />
          <label
            htmlFor="details"
            className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-teal-500 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
          >
            Details
          </label>
        </div> */}
        {/* details */}
        {/* <div className="relative my-3">
         
          <textarea
            className="block px-2.5 pb-2 pt-2.5 py-2.5 w-full rows-4 text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
            id="inline-full-name"
            type="text"
            placeholder="  "
          />
          <label
            htmlFor="inline-full-name"
            className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-teal-500 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
          >
            details
          </label>
        </div> */}
        {/* Remarks */}
        <div className="relative  my-3">
          <input
            {...register("remarks")}
            type="text"
            id="remarks"
            className="block px-2.5 pb-2 pt-2.5 py-2.5 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
            placeholder="  "
          />
          <label
            htmlFor="remarks"
            className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-teal-500 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
          >
            Remarks
          </label>
        </div>
        {/* <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label
              className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
              htmlFor="inline-full-name"
            >
              Reamrks
            </label>
          </div>
          <div className="md:w-2/3">
            <input
              {...register("remarks")}
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              id="inline-full-name"
              type="text"
              placeholder="Jane Doe"
            />
          </div>
        </div> */}
        {/* status */}
        <div className="relative  my-3">
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
            <option value="A" selected>
              Active
            </option>
            <option value="Inactive">Inactive</option>
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
        {/* <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label
              className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
              htmlFor="inline-full-name"
            >
              Status
            </label>
          </div>
          <div className="md:w-2/3">
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
              <option selected>status</option>
              <option value="A" selected>
                active
              </option>
              <option value="I">inactive</option>
            </select>
          </div>
        </div> */}
        <div className="md:flex md:items-center">
          <div className="md:w-1/3"></div>
          <div className="md:w-2/3">
            <button
              className="shadow bg-teal-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
              type="submit"
            >
              Save
            </button>
            {/* className="my-6 text-center text-3xl font-extrabold bg-teal-500"  */}
          </div>
        </div>
      </form>
    </>
  );
};

export default CategoryForm;
