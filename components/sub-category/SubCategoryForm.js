import React from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import useAuth from "/hook/useAuth";
import { useQuery } from "react-query";
import { useCategoryQuery, useSubCategoryQuery } from "../../hook/useApi";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
const schema = yup
  .object()
  .shape({
    // service_category_id: yup.string().required(),
    // name: yup.string().required(),
    // status: yup.string().required(),
  })
  .required();

function SubCategoryForm() {
  const { postData, categorydata, setCategory } = useAuth();
  const { data } = useSubCategoryQuery();
  //console.log("my categorydata data  is", data);
  const { register, handleSubmit, error } = useForm({
    resolver: yupResolver(schema),
  });
  return (
    <>
      <form
        className="w-full max-w-sm my-3 p-2   m-auto"
        onSubmit={handleSubmit((d) =>
          postData("https://misiapi.lamptechs.com/api/v1/subservice/store", d)
        )}
        type="submit"
      >
        <h2 className="my-6 text-center text-3xl font-extrabold text-teal-500">
          Subcategory
        </h2>

        {/* Service Categorey List */}
        {data?.data ? (
          <div className="relative my-3">
            <select
              id="service_category_id"
              {...register("service_category_id")}
              className="block px-2.5 pb-2 pt-2.5 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
            >
              <option>Select service category</option>
              {data.data?.map((item) => (
                <option key={item.id} value={`${item.service_category?.id}`}>
                  {item.service_category?.name}
                </option>
              ))}
            </select>
            <label
              htmlFor="service_category"
              className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-teal-500 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
            >
              Service category
            </label>
          </div>
        ) : (
          <>
            <Stack spacing={1}>
              <Skeleton height={40} />
            </Stack>
          </>
        )}

        {/* SubCategory Name */}
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
            Subcategory name
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
          />
          <label
            htmlFor="remarks"
            className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-teal-500 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
          >
            Remarks
          </label>
        </div>

        {/* Status */}
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

        <div className="md:flex md:items-center">
          <div className="md:w-1/3"></div>
          <div className="md:w-2/3">
            <button
              className="shadow   hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
              type="submit"
              style={{ backgroundColor: "#01a9ac" }}
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </>
  );
}

export default SubCategoryForm;
