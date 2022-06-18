import Table from "rc-table";
import React, { useState } from "react";
import Pagination from "react-js-pagination";
import useSWR from "swr";
import styled from "styled-components";
import OperationModal from "../common/OperationModal";
import Thform from "./Thform";
import Link from "next/link";
import useAuth from "/hook/useAuth";
// react query
import { useQuery } from "react-query";
import {
  useCategoryQuery,
  useSubCategoryQuery,
  useTherapistServiceQuery,
} from "../../hook/useApi";

const SubCategoryTable = () => {
  const { deleteData, Statustest } = useAuth();
  const [modal, setModal] = useState(false);

  const { isLoading, isFetching, status, data, error } =
    useTherapistServiceQuery();
  //console.log("result", data);
  const { data: category } = useCategoryQuery();
  const { data: subcategory } = useSubCategoryQuery();

  //Pagination
  const [activePage, setActivePage] = useState(10);
  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };

  return (
    <>
      {data ? (
        <>
          {console.log(data.length)}

          <div className="min-h-screen bg-white-800 py-3">
            <div className="overflow-x-auto w-full">
              <table className="mx-auto max-w-4xl w-full whitespace-nowrap rounded-lg bg-white divide-y divide-gray-300 overflow-hidden">
                <thead
                  className="   border "
                  style={{ backgroundColor: "#01a9ac" }}
                >
                  <tr className="border font-semibold text-white text-sm    text-center ">
                    <th className=" font-semibold text-base  px-2.5   py-2.5   border">
                      #
                    </th>
                    <th className=" font-semibold text-base  px-2.5   py-2.5   border">
                      Therapist service name
                    </th>
                    <th className=" font-semibold text-base  px-2.5   py-2.5   border">
                      Service category name
                    </th>
                    <th className=" font-semibold text-base  px-2.5   py-2.5   border">
                      Service subcategory name
                    </th>

                    <th className=" font-semibold text-base  px-2.5   py-2.5   border">
                      Remarks
                    </th>
                    <th className=" font-semibold text-base  px-2.5   py-2.5   border">
                      Status
                    </th>
                    <th className=" font-semibold text-base  px-2.5   py-2.5   border">
                      Operations
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {data ? (
                    data.map((data) => (
                      <>
                        <tr className=" hover:bg-gray-200   border ">
                          <td className="px-2   py-2    border text-center">
                            {data.id}
                          </td>
                          <td className="px-2    py-2    border text-center">
                            {data.name}
                          </td>
                          <td className="px-2    py-2    border text-center">
                            {/* {data.service_subcategory_name} */}
                            {category ? (
                              category
                                .filter((i) => i.id == data.service_category_id)
                                .map((item) => <>{item.name}</>)
                            ) : (
                              <></>
                            )}
                          </td>
                          <td className="px-2    py-2   border text-center">
                            {/* {data.service_subcategory_name} */}
                            {subcategory ? (
                              subcategory
                                .filter(
                                  (i) => i.id == data.service_sub_category_id
                                )
                                .map((item) => <>{item.name}</>)
                            ) : (
                              <></>
                            )}
                          </td>
                          <td className=" px-2    py-2    border text-center">
                            {data.remarks}
                          </td>
                          <td className="px-2    py-2    border text-center  ">
                            {Statustest(data.status) && (
                              <>
                                {Statustest(data.status) === "Canceled" ||
                                Statustest(data.status) === "Deleted" ? (
                                  <span className="text-white text-sm w-1/3 pb-1 bg-red-500 font-semibold px-2 rounded-full">
                                    {Statustest(data.status)}
                                  </span>
                                ) : (
                                  <span className="text-white text-sm w-1/3 pb-1 bg-green-600 font-semibold px-2 rounded-full">
                                    {Statustest(data.status)}
                                  </span>
                                )}
                              </>
                            )}
                          </td>
                          <td className="px-2    py-2    border text-center  ">
                            <>
                              <Link href="#">
                                <a className="text-purple-800 hover:underline">
                                  Edit
                                </a>
                              </Link>
                              <span>| </span>
                              <>
                                <button
                                  className="text-purple-800 hover:underline"
                                  // onClick={() =>
                                  //   axios.post(
                                  //     `https://misiapi.lamptechs.com/api/v1/service/delete/${data.id}`
                                  //   )
                                  // }
                                  onClick={() =>
                                    deleteData(
                                      `https://misiapi.lamptechs.com/api/v1/therapistService/delete`,
                                      data.therapist_id
                                    )
                                  }
                                >
                                  Delete
                                </button>
                              </>
                            </>
                          </td>
                        </tr>
                      </>
                    ))
                  ) : (
                    <> </>
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
    </>
  );
};

export default SubCategoryTable;
