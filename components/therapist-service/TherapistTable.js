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
import Loading from "../common/Loading";

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

          <div className="min-h-screen  py-2">
            <div className="overflow-x-auto w-full">
              <table className="mx-auto  w-full whitespace-nowrap  bg-slate-100 divide-y divide-gray-100 overflow-hidden">
                <thead
                  className="   border "
                  style={{ backgroundColor: "#0184ac" }}
                >
                  <tr className="border  text-gray-100 text-sm    text-center ">
                    <th className=" font text-base  px-1.5   py-2  border">
                      #
                    </th>
                    <th className="  text-base  px-1.5   py-2  border">
                      Therapist Service
                    </th>
                    <th className="  text-base  px-1.5   py-2  border">
                      Service Category
                    </th>
                    <th className="  text-base  px-1.5   py-2  border">
                      Service Subcategory
                    </th>

                    <th className="  text-base  px-1.5   py-2 border">
                      Remarks
                    </th>
                    <th className="text-base  px-1.5   py-2  border">Status</th>
                    <th className="text-base  px-1.5   py-2   border">
                      Operations
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {data.data ? (
                    data.data?.map((data) => (
                      <>
                        <tr className=" hover:bg-gray-200   border ">
                          <td className="px-3   py-2    border text-center">
                            {data.id}
                          </td>
                          <td className="px-3    py-2    border text-center">
                            {data.name}
                          </td>
                          <td className="px-3    py-2    border text-center">
                            {/* {category ? (
                              category
                                .filter((i) => i.id == data.service_category_id)
                                .map((item) => <>{item.name}</>)
                            ) : (
                              <></>
                            )} */}
                          </td>
                          <td className="px-3    py-2   border text-center">
                            {/* {data.service_subcategory_name} */}
                            {/* {subcategory ? (
                              subcategory
                                .filter(
                                  (i) => i.id == data.service_sub_category_id
                                )
                                .map((item) => <>{item.name}</>)
                            ) : (
                              <></>
                            )} */}
                          </td>
                          <td className=" px-3    py-2    border text-center">
                            {data.remarks}
                          </td>
                          <td className="px-3    py-2    border text-center  ">
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
                                  onClick={() =>
                                    deleteData(
                                      `https://misiapi.lamptechs.com/api/v1/therapistService/delete`,
                                      data.id
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
        <>
          <Loading />
        </>
      )}
    </>
  );
};

export default SubCategoryTable;
