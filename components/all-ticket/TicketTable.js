import Table from "rc-table";
import React, { useState } from "react";
import Pagination from "react-js-pagination";

import useSWR from "swr";
import styled from "styled-components";

const PatientTable = () => {
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
  //   "id": 1,
  // "service_subcategory_name": "service 2 updated",
  // "status": "A",
  // "remarks": "Checking update",
  // "service_category_id": "1"
  const { data, error } = useSWR(
    "https://misiapi.lamptechs.com/api/therapistService",
    { fetcher: async (url) => await fetch(url).then((res) => res.json()) }
    // { fetcher: async (url) => await axios.get(url).then((res) => res.data) }
  );

  //   id
  //   therapist_service_name
  //  status
  //  remarks
  //  service_category_id
  //  service_subcategory_id
  const columns = [
    {
      title: "Therapist_Id",
      dataIndex: "id",
      key: "id",
      width: 80,
      className: "    p-2 border-r-2 border-b-2",
      rowClassName: "bg-black-ripon",
    },
    {
      title: "Therapist_name",
      dataIndex: "therapist_service_name",
      key: "therapist_service_name",
      width: 400,
      className: "    p-2 border-r-2 border-b-2",
      rowClassName: "bg-black-ripon",
    },
    {
      title: "Category_Id",
      dataIndex: "service_category_id",
      key: "service_category_id",
      width: 400,
      className: "   p-2 border-r-2 border-b-2",
    },
    {
      title: "Sub_Category_Id",
      dataIndex: "service_subcategory_id",
      key: "service_subcategory_id",
      width: 400,
      className: "    p-2 border-r-2 border-b-2",
      rowClassName: "bg-black-ripon",
    },

    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 400,
      className: "    p-2 border-r-2 border-b-2",
    },
    {
      title: "Remarks",
      dataIndex: "remarks",
      key: "remarks",
      width: 400,
      className: "    p-2 border-r-2 border-b-2",
    },

    {
      title: "Operations",
      dataIndex: "",
      key: "operations",
      className: "   p-2 border-b-2",
      render: () => (
        <>
          <a href="#">View</a> | <a href="#">Edit</a> | <a href="#">Delete</a>
        </>
      ),
    },
  ];

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
            totalItemsCount={data.length}
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
        <h1>table empty</h1>
      )}
    </>
  );
};

export default PatientTable;
