import Table from "rc-table";
import React, { useState } from "react";
import Pagination from "react-js-pagination";
import useSWR from "swr";

const CategoryTable = () => {
  //const [first, setfirst] = useState(second)
  const { data, error } = useSWR(
    "https://misiapi.lamptechs.com/api/service",
    { fetcher: async (url) => await fetch(url).then((res) => res.json()) }
    // { fetcher: async (url) => await axios.get(url).then((res) => res.data) }
  );
  console.log("first,", data);
  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
      width: 400,
      className: "text-white bg-gray-800 p-2 border-r-2 border-b-2",
      rowClassName: "bg-black-ripon",
    },
    {
      title: "Category Name",
      dataIndex: "service_category_name",
      key: "service_category_name",
      width: 400,
      className: "text-white bg-gray-600 p-2 border-r-2 border-b-2",
    },
    {
      title: "Remarks",
      dataIndex: "remarks",
      key: "remarks",
      width: 400,
      className: "text-white bg-gray-800 p-2 border-r-2 border-b-2",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
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

  // {
  //   "id": 2,
  //   "service_category_name": "service 2 updated",

  //   "remarks": "Checking update",
  //   "status": "A",
  //   "create_by": "1",
  //   "create_date": "2022-05-31 10:45:30",
  //   "modified_by": "1",
  //   "modified_date": "2022-05-31 10:46:49"
  //   },

  // const data = [
  //   { id: "01", name: "Jack", remarks: "my category 1", status: "Active" },
  //   { id: "02", name: "Rose", remarks: "my category 2", status: "Inactive" },
  // ];

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
        <>
          <h1>empty</h1>
        </>
      )}
    </>
  );
};

export default CategoryTable;
