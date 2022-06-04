import Table from "rc-table";
import React, { useState } from "react";
import Pagination from "react-js-pagination";
import useSWR from "swr";

const SubCategoryTable = () => {
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
      width: 400,
      className: "text-white bg-gray-800 p-2 border-r-2 border-b-2",
      rowClassName: "bg-black-ripon",
    },
    {
      title: "Therapist_name",
      dataIndex: "therapist_service_name",
      key: "therapist_service_name",
      width: 400,
      className: "text-white bg-gray-800 p-2 border-r-2 border-b-2",
      rowClassName: "bg-black-ripon",
    },
    {
      title: "Category_Id",
      dataIndex: "service_category_id",
      key: "service_category_id",
      width: 400,
      className: "text-white bg-gray-600 p-2 border-r-2 border-b-2",
    },
    {
      title: "Sub_Category_Id",
      dataIndex: "service_subcategory_id",
      key: "service_subcategory_id",
      width: 400,
      className: "text-white bg-gray-800 p-2 border-r-2 border-b-2",
      rowClassName: "bg-black-ripon",
    },

    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 400,
      className: "text-white bg-gray-800 p-2 border-r-2 border-b-2",
    },
    {
      title: "Remarks",
      dataIndex: "remarks",
      key: "remarks",
      width: 400,
      className: "text-white bg-gray-800 p-2 border-r-2 border-b-2",
    },

    {
      title: "Operations",
      dataIndex: "",
      key: "operations",
      className: "text-white bg-gray-600 p-2 border-b-2",
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
          <Table
            columns={columns}
            data={data}
            rowKey="id"
            className="bg-purple-700 p-4 w-full text-center rc-table-custom font-semibold "
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
        <h1>table empty</h1>
      )}
    </>
  );
};

export default SubCategoryTable;
