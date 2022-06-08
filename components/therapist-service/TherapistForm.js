import React from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import useAuth from "/hook/useAuth";
const schema = yup
  .object()
  .shape({
    // service_category_id
    // service_subcategory_name
    //  status
    //  remarks
    service_category_id: yup.string().required(),
    name: yup.string().required(),
    // details: yup.string().required(),
    remarks: yup.string().required(),
    status: yup.string().required(),
  })
  .required();

function SubCategoryForm() {
  const { postData } = useAuth();
  const { register, handleSubmit, error } = useForm({
    resolver: yupResolver(schema),
  });
  return (
    <form
      className="w-full max-w-sm my-3 p-2   m-auto   "
      onSubmit={handleSubmit((d) =>
        postData("https://misiapi.lamptechs.com/api/therapistService/store", d)
      )}
      type="submit"
    >
      <h2 className="my-6 text-center text-3xl font-extrabold text-teal-500">
        Therapist service
      </h2>
      {/* Service Categorey List */}
      <div className="relative my-3">
        {/* <input
                type="text"
                id="floating_outlined"
                className="block px-2.5 pb-2 pt-2.5 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
                placeholder="  "
                required
              /> */}
        <select
          id="service_category_id"
          {...register("service_category_id")}
          className="block px-2.5 pb-2 pt-2.5 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
        >
          <option selected>Select service category</option>
          <option value="1">Category 1</option>
          <option value="2">Category 2</option>
        </select>
        <label
          htmlFor="service_category"
          className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-teal-500 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
        >
          Service category
        </label>
      </div>
      {/* <div className="md:flex md:items-center mb-6">
      <div className="md:w-1/3">
        <label
          className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
          htmlFor="inline-full-name"
        >
          Category
        </label>
      </div>
      <div className="md:w-2/3">
        <select
          id="service_category_id"
          {...register("service_category_id")}
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
        >
          <option value="1" selected>
            Category 1
          </option>
          <option value="2">Category 2</option>
        </select>
      </div>
    </div> */}

      {/* Service Sub Categorey List */}
      <div className="relative my-3">
        {/* <input
                type="text"
                id="floating_outlined"
                className="block px-2.5 pb-2 pt-2.5 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
                placeholder="  "
                required
              /> */}
        <select
          id="service_subcategory_id"
          {...register("service_subcategory_id")}
          className="block px-2.5 pb-2 pt-2.5 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
        >
          <option selected>Select service sub-category</option>
          <option value="1">Subcategory 1</option>
          <option value="2">SubCategory 2</option>
        </select>
        <label
          htmlFor="service_subcategory_id"
          className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-teal-500 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
        >
          Service subcategory
        </label>
      </div>

      {/* <div className="md:flex md:items-center mb-6">
      <div className="md:w-1/3">
        <label
          className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
          htmlFor="inline-full-name"
        >
          Sub Category
        </label>
      </div>
      <div className="md:w-2/3">
        <select
          id="service_subcategory_id"
          {...register("service_subcategory_id")}
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
        >
          <option selected>Select Sub Category</option>
          <option value="1">Sub Category 1</option>
          <option value="2">Sub Category 2</option>
        </select>
      </div>
    </div> */}

      {/* Therapist Name */}
      <div className="relative my-3">
        <input
          {...register("name")}
          type="text"
          id="name"
          className="block px-2.5 pb-2 pt-2.5 py-2.5 w-full rows-4 text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
          placeholder="  "
          required
        />
        <label
          htmlFor="name"
          className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-teal-500 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
        >
          Therapist name
        </label>
      </div>

      {/* <div className="md:flex md:items-center mb-6">
      <div className="md:w-1/3">
        <label
          className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
          htmlFor="inline-full-name"
        >
          Therapist Name
        </label>
      </div>
      <div className="md:w-2/3">
        <input
          {...register("name")}
          className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
          id="name"
          type="text"
          placeholder="Jane Doe"
        />
      </div>
    </div> */}
      {/* details */}
      <div className="relative my-3">
        {/* <input
                  type="text-area"
                  id="floating_outlined"
                  className="block px-2.5 pb-2 pt-2.5 py-2.5 w-full rows-4 text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
                  placeholder="  "
                  required
                /> */}
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
      </div>
      {/* Remarks */}
      <div className="relative my-3">
        <input
          {...register("remarks")}
          type="text"
          id="remarks"
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

      {/* Status */}
      <div className="relative my-3">
        {/* <input
                type="text"
                id="floating_outlined"
                className="block px-2.5 pb-2 pt-2.5 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
                placeholder="  "
                required
              /> */}
        <select
          id="status"
          {...register("status")}
          className="block px-2.5 pb-2 pt-2.5 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
        >
          <option selected>Select status</option>
          <option value="A">Active</option>
          <option value="I">Inactive</option>
        </select>
        <label
          htmlFor="status"
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
          {...register("status")}
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
        >
          <option selected>Select status</option>
          <option value="A">Active</option>
          <option value="I">Inactive</option>
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
        </div>
      </div>
    </form>
  );
}

export default SubCategoryForm;