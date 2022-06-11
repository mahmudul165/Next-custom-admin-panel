import Table from "rc-table";
import React, { useState } from "react";
import Pagination from "react-js-pagination";
import useSWR from "swr";
import styled from "styled-components";
const CategoryTable = () => {
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
  //const [first, setfirst] = useState(second)
  const { data, error } = useSWR(
    "https://misiapi.lamptechs.com/api/service",
    { fetcher: async (url) => await fetch(url).then((res) => res.json()) }
    // { fetcher: async (url) => await axios.get(url).then((res) => res.data) }
  );
  console.log("first,", data);
  const columns = [
    {
      title: "#",
      dataIndex: "id",
      key: "id",
      width: 80,
      className: "  p-2 border-r-2 border-b-2",
      rowClassName: "bg-black-ripon",
    },
    {
      title: "Category Name",
      dataIndex: "service_category_name",
      key: "service_category_name",
      width: 400,
      className: "    p-2 border-r-2 border-b-2",
    },
    {
      title: "Remarks",
      dataIndex: "remarks",
      key: "remarks",
      width: 400,
      className: "  p-2 border-r-2 border-b-2",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 400,
      className: "      p-2 border-r-2 border-b-2",
    },
    {
      title: "Operations",
      dataIndex: "",
      key: "operations",
      className: "  p-2 border-b-2",
      render: () => (
        <>
          <a href="#">View</a> | <a href="#">Edit</a> | <a href="#">Delete</a>
        </>
      ),
    },
  ];

  //Pagination
  const [activePage, setActivePage] = useState(15);
  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };

  return (
    <>
      {data ? (
        <>
          {" "}
          <Table
            columns={columns}
            data={data}
            rowKey="id"
            components={components}
            className="table rounded-lg p-4 w-full text-center rc-table-custom font-semibold border-collapse border border-slate-400 "
          />
          <Pagination
            activePage={activePage}
            itemsCountPerPage={10}
            totalItemsCount={450}
            pageRangeDisplayed={5}
            onChange={handlePageChange}
            nextPageText={"Next"}
            prevPageText={"Prev"}
            firstPageText={"First"}
            lastPageText={"Last"}
            innerClass="js-ul"
            itemClass="js-li"
            linkClass="page-link"
          />
        </>
      ) : (
        <>
          <div className="flex justify-center items-center">
            <div
              className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full"
              role="status"
            >
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default CategoryTable;
