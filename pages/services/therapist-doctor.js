import React from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
//import { MDBDataTable } from "mdbreact";
import { useCategoryQuery, useSubCategoryQuery } from "../../hook/useApi";
// import "@fortawesome/fontawesome-free/css/all.min.css";
// import "bootstrap-css-only/css/bootstrap.min.css";
// import "mdbreact/dist/css/mdb.css";
const schema = yup
  .object()
  .shape({
    category: yup.string().required(),
    subCategory: yup.string().required(),
    details: yup.string().required(),
    remark: yup.string().required(),
    status: yup.string().required(),
  })
  .required();
function TherapistDoctor() {
  const { data: categoryData } = useSubCategoryQuery();
  console.log("category service data ", categoryData);

  const data = {
    columns: [
      {
        label: "#",
        field: "id",
        sort: "asc",
        width: 300,
      },

      {
        label: "First Name",
        field: "name",
        sort: "asc",
        width: 300,
      },

      {
        label: "Last Name",
        field: "name",
        sort: "asc",
        width: 300,
      },
      {
        label: "Phone Number",
        field: "name",
        sort: "asc",
        width: 300,
      },
      {
        label: "Email Address",
        field: "name",
        sort: "asc",
        width: 300,
      },
      {
        label: "Residential Address",
        field: "name",
        sort: "asc",
        width: 300,
      },
      {
        label: "State/City",
        field: "name",
        sort: "asc",
        width: 300,
      },
      {
        label: "Nationality",
        field: "name",
        sort: "asc",
        width: 300,
      },
      {
        label: "Language",
        field: "name",
        sort: "asc",
        width: 300,
      },
      {
        label: "BSN Number",
        field: "name",
        sort: "asc",
        width: 300,
      },
      {
        label: "DOB Number",
        field: "name",
        sort: "asc",
        width: 300,
      },
      {
        label: "Insurance Number",
        field: "name",
        sort: "asc",
        width: 300,
      },
      {
        label: "Emergency Contacts",
        field: "name",
        sort: "asc",
        width: 300,
      },
      {
        label: "Age",
        field: "name",
        sort: "asc",
        width: 300,
      },
      // Sex	Therapist Type	Date of Birth	Blood Group	File Upload	Remarks	Status	Operations
      {
        label: "Remarks",
        field: "remarks",
        sort: "asc",
        width: 300,
      },
      {
        label: "Status",
        field: "status",
        sort: "asc",
        width: 300,
      },
      {
        label: "Date",
        field: "created_at",
        sort: "asc",
        width: 300,
      },
      {
        label: "Remarks",
        field: "remarks",
        sort: "asc",
        width: 300,
      },
      {
        label: "Status",
        field: "status",
        sort: "asc",
        width: 300,
      },
      {
        label: "Date",
        field: "created_at",
        sort: "asc",
        width: 300,
      },
      {
        label: "Remarks",
        field: "remarks",
        sort: "asc",
        width: 300,
      },
      {
        label: "Status",
        field: "status",
        sort: "asc",
        width: 300,
      },
      {
        label: "Date",
        field: "created_at",
        sort: "asc",
        width: 300,
      },
      {
        label: "Remarks",
        field: "remarks",
        sort: "asc",
        width: 300,
      },
      {
        label: "Status",
        field: "status",
        sort: "asc",
        width: 300,
      },
      {
        label: "Date",
        field: "created_at",
        sort: "asc",
        width: 300,
      },
      {
        label: "Operation",
        field: "Operation",
        sort: "asc",
        width: 300,
      },
    ],
    rows: categoryData,
  };

  return (
    <>
      {/* <form className="  m-auto   mx-4 my-4 w-full max-w-sm">
        <div className="card mt-5 p-2">
          <div className="  md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label
                className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                htmlFor="inline-full-name"
              >
                Category
              </label>
            </div>
            <div className="md:w-2/3">
              <select
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
              >
                <option selected>Select Category</option>
                <option value="1">Category 1</option>
                <option value="2">Category 2</option>
              </select>
            </div>
          </div>

          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label
                className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                htmlFor="inline-full-name"
              >
                Sub category
              </label>
            </div>
            <div className="md:w-2/3">
              <select
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
              >
                <option selected>Select Sub Category</option>
                <option value="1">Sub Category 1</option>
                <option value="2">Sub Category 2</option>
              </select>
            </div>
          </div>

          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label
                className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                htmlFor="inline-full-name"
              >
                Therapist Name
              </label>
            </div>
            <div className="md:w-2/3">
              <input
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                id="inline-full-name"
                type="text"
                placeholder="Jane Doe"
              />
            </div>
          </div>
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label
                className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                htmlFor="inline-full-name"
              >
                Therapist Details
              </label>
            </div>
            <div className="md:w-2/3">
              <textarea
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-6 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                id="inline-full-name"
                type="text"
                placeholder="Jane Doe"
              ></textarea>
            </div>
          </div>
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label
                className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                htmlFor="inline-full-name"
              >
                Reamrks
              </label>
            </div>
            <div className="md:w-2/3">
              <input
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                id="inline-full-name"
                type="text"
                placeholder="Jane Doe"
              />
            </div>
          </div>
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label
                className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                htmlFor="inline-full-name"
              >
                Status
              </label>
            </div>
            <div className="md:w-2/3">
              <select
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
              >
                <option selected>Select Status</option>
                <option value="A">Active</option>
                <option value="I">Inactive</option>
                <option value="D">D</option>
                <option value="P">P</option>
                <option value="C">C</option>
              </select>
            </div>
          </div>

          <div className="md:flex md:items-center">
            <div className="md:w-1/3"></div>
            <div className="md:w-2/3">
              <button
                className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                type="button"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </form> */}

      {/* mbd react table */}
      {/* <div className="card p-3 m-2">
        <div className=" ">
          <div className="m-3 p-3  ">
            <MDBDataTable
              entriesLabel="Show data"
              responsive
              responsiveSm
              responsiveMd
              responsiveLg
              responsiveXl
              bordered
              small
              data={data}
              entriesOptions={[5, 20, 25]}
              entries={5}
              pagesAmount={4}
              theadColor="bg-[#01a9ac] py-2 text-white font-bold  "
              pagingTop
              searchTopp
              searchBottom={false}
            />
          </div>{" "}
        </div>{" "}
      </div> */}
    </>
  );
}

export default TherapistDoctor;
