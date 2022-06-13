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
        // <a href="#">View</a> |
        <>
          <a href="#">Edit</a> | <a href="#">Delete</a>
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

export default PatientTable;
