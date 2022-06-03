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

function SubCategory() {
  const { postData } = useAuth();
  const { register, handleSubmit, error } = useForm({
    resolver: yupResolver(schema),
  });
  return (
    <form
      className="w-full max-w-sm my-3 p-2 card m-auto"
      onSubmit={handleSubmit((d) =>
        postData("https://misiapi.lamptechs.com/api/subservice/store", d)
      )}
      type="submit"
    >
      <div className="md:flex md:items-center mb-6">
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
            <option selected>Select Category</option>
            <option value="1">Category 1</option>
            <option value="2">Category 2</option>
          </select>
        </div>
      </div>
      <div className="md:flex md:items-center mb-6">
        <div className="md:w-1/3">
          <label
            className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
            htmlFor="inline-full-name"
          >
            Sub Category Name
          </label>
        </div>
        <div className="md:w-2/3">
          <input
            {...register("name")}
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            id="inline-full-name"
            type="text"
            placeholder="Jane Doe"
          />
        </div>
      </div>
      {/* <div className="md:flex md:items-center mb-6">
        <div className="md:w-1/3">
          <label
            className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
            htmlFor="inline-full-name"
          >
            Sub Category Details
          </label>
        </div>
        <div className="md:w-2/3">
          <textarea
            {...register("details")}
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-6 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            id="inline-full-name"
            type="text"
            placeholder="Jane Doe"
          ></textarea>
        </div>
      </div> */}
      <div className="md:flex md:items-center mb-6">
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
      </div>
      <div className="md:flex md:items-center mb-6">
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
            <option selected>status</option>
            <option value="A">Active</option>
            <option value="I">Inactive</option>
          </select>
        </div>
      </div>

      <div className="md:flex md:items-center">
        <div className="md:w-1/3"></div>
        <div className="md:w-2/3">
          <button
            className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
            type="submit"
          >
            Save
          </button>
        </div>
      </div>
    </form>
  );
}

export default SubCategory;
