import React from "react";
import useAuth from "/hook/useAuth";
import {
  fetchCategoryService,
  fetchSubService,
  useCategoryQuery,
  useSubCategoryQuery,
} from "../../hook/useApi";
import { useQuery } from "react-query";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import Loading from "../common/Loading";

const schema = yup
  .object()
  .shape({
    // service_category_id
    // service_subcategory_name
    //  status
    //  remarks
    //service_category_id: yup.string().required(),
    //name: yup.string().required(),
    // details: yup.string().required(),
    //remarks: yup.string().required(),
    //status: yup.string().required(),
  })
  .required();

function TherapistForm() {
  const { postData } = useAuth();
  const { register, handleSubmit, error } = useForm({
    resolver: yupResolver(schema),
  });

  const { data: categoryService } = useCategoryQuery();
  const { data: subService } = useSubCategoryQuery();

  return (
    <form
      className="w-full max-w-sm my-3 p-2   m-auto   "
      onSubmit={handleSubmit((d) =>
        postData(
          "https://misiapi.lamptechs.com/api/v1/therapistService/store",
          d
        )
      )}
      type="submit"
    >
      <h2 className="my-6 text-center text-3xl font-extrabold text-teal-500">
        Therapist service
      </h2>
      {/* Service Categorey List */}

      {categoryService ? (
        <div className="relative my-3">
          <select
            id="service_category_id"
            {...register("service_category_id")}
            className="block px-2.5 pb-2 pt-2.5 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
          >
            <option>Select service category</option>
            {categoryService.data?.map((item) => (
              <option key={item.id} value={`${item.id}`}>
                {item.name}
              </option>
            ))}
          </select>
          <label
            htmlFor="service_category_id"
            className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-teal-500 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
          >
            Service category
          </label>
        </div>
      ) : (
        <>
          <Loading />
        </>
      )}

      {/* Service Sub Categorey List */}
      {subService ? (
        <div className="relative my-3">
          <select
            id="service_sub_category_id"
            {...register("service_sub_category_id")}
            className="block px-2.5 pb-2 pt-2.5 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
          >
            <option selected>Select service sub-category</option>
            {subService.data?.map((item) => (
              <option key={item.id} value={`${item.id}`}>
                {item.name}
              </option>
            ))}
          </select>
          <label
            htmlFor="service_sub_category_id"
            className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-teal-500 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
          >
            Service subcategory
          </label>
        </div>
      ) : (
        <>
          <div className="text-center mt-2">
            <svg
              role="status"
              className="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-teal-500"
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
        </>
      )}

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
  );
}

export default TherapistForm;
