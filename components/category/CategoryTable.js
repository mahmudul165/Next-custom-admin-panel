import Table from "rc-table";
import React, { useEffect, useState } from "react";
import Pagination from "react-js-pagination";
import useSWR from "swr";
import styled from "styled-components";
import useAuth from "/hook/useAuth";
import axios from "axios";
import Link from "next/link";
import { useQuery } from "react-query";
import { useCategoryQuery } from "../../hook/useApi";
import Loading from "../common/Loading";

const CategoryTable = () => {
  const { deleteData, Statustest } = useAuth();
  const { data, error, isError, isLoading } = useCategoryQuery();
  console.log("category service data ", data);
  //const { data } = category;
  //Pagination
  const [activePage, setActivePage] = useState(15);
  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };

  return (
    <>
      {data ? (
        <>
          <div className="min-h-screen bg-white-800 py-3">
            <div className="overflow-x-auto w-full">
              <table className="mx-auto max-w-5xl w-full whitespace-nowrap rounded-lg bg-white divide-y divide-gray-300 overflow-hidden">
                <thead className=" " style={{ backgroundColor: "#01a9ac" }}>
                  <tr className="border font-semibold text-white text-sm    text-center ">
                    <th className="font-semibold text-base px-2.5 py-2.5 border">
                      #
                    </th>
                    <th className="font-semibold text-base  px-2.5 py-2.5 border">
                      Service category name
                    </th>
                    <th className="font-semibold text-base px-2.5 py-2.5 border">
                      {" "}
                      Remarks
                    </th>
                    <th className="font-semibold text-base  px-2.5 py-2.5 border text-center   ">
                      Status
                    </th>
                    <th className="font-semibold text-base  px-2.5 py-2.5 border text-center ">
                      Operations
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {data.data ? (
                    data?.data?.map((data) => (
                      <>
                        {/* id
                      name
                      status
                      remarks */}
                        <tr className=" hover:bg-gray-200     border">
                          <td className="px-2.5 py-2.5 border text-center ">
                            {data.id}
                          </td>
                          <td className="px-2.5 py-2.5 border text-center">
                            {data.name}
                          </td>
                          <td className=" px-2.5 py-2.5 border text-center ">
                            {data.remarks}
                          </td>
                          <td className="px-2.5 py-2.5 border text-center ">
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
                          <td className="px-2.5 py-2.5 border text-center ">
                            <>
                              <Link href={`/services/category/edit/${data.id}`}>
                                <a className="text-purple-800 hover:underline">
                                  Edit
                                </a>
                              </Link>
                              <span> | </span>
                              <>
                                <button
                                  className="text-purple-800 hover:underline"
                                  onClick={() =>
                                    deleteData(
                                      `https://misiapi.lamptechs.com/api/v1/service/delete`,
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

export default CategoryTable;
