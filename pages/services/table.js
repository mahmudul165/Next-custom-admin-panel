// import * as React from "react";
// import { DataGrid } from "@mui/x-data-grid";

// const columns = [
//   { field: "id", headerName: "ID", width: 120 },
//   { field: "firstName", headerName: "First name", width: 130 },
//   { field: "lastName", headerName: "Last name", width: 130 },
//   { field: "id", headerName: "ID", width: 120 },
//   { field: "firstName", headerName: "First name", width: 130 },
//   { field: "lastName", headerName: "Last name", width: 130 },
//   { field: "id", headerName: "ID", width: 120 },
//   { field: "firstName", headerName: "First name", width: 130 },
//   { field: "lastName", headerName: "Last name", width: 130 },
//   { field: "id", headerName: "ID", width: 120 },
//   { field: "firstName", headerName: "First name", width: 130 },
//   { field: "lastName", headerName: "Last name", width: 130 },
//   { field: "id", headerName: "ID", width: 120 },
//   { field: "firstName", headerName: "First name", width: 130 },
//   { field: "lastName", headerName: "Last name", width: 130 },

//   {
//     field: "age",
//     headerName: "Age",
//     type: "number",
//     width: 90,
//   },
//   {
//     field: "fullName",
//     headerName: "Full name",
//     description: "This column has a value getter and is not sortable.",
//     sortable: false,
//     width: 160,
//     valueGetter: (params) =>
//       `${params.row.firstName || ""} ${params.row.lastName || ""}`,
//   },
//   {
//     field: "Operation",
//     headerName: "Operation",
//     type: "number",
//     width: 90,

//   },
// ];

// const rows = [
//   { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
//   { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
//   { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
//   { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
//   { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
//   { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
//   { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
//   { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
//   { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
//   { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
//   { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
//   { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
// ];

// export default function DataTable() {
//   return (
//     <div style={{ height: 400, width: "100%" }}>
//       <DataGrid
//         className="p-3 m-3"
//         rows={rows}
//         columns={columns}
//         pageSize={5}
//         rowsPerPageOptions={[5]}
//       />
//     </div>
//   );
// }
// import MaterialTable from "material-table";
// import React from "react";

// function BasicSearch() {
//   const { useState } = React;
//   const [selectedRow, setSelectedRow] = useState(null);
//   return (
//     <div style={{ overflowX: "auto" }}>
//       <div className=" overflow-x-auto p-3 m-3">
//         <MaterialTable
//           title="Therapist List"
//           columns={[
//             {
//               title: "Avatar",
//               field: "imageUrl",
//               render: (rowData) => (
//                 <img
//                   src={rowData.imageUrl}
//                   style={{ width: 40, borderRadius: "50%" }}
//                 />
//               ),
//             },
//             { title: "Name", field: "name" },
//             { title: "Surname", field: "surname" },
//             { title: "Birth Year", field: "birthYear", type: "numeric" },
//             {
//               title: "Birth Place",
//               field: "birthCity",
//               lookup: { 34: "İstanbul", 63: "Şanlıurfa" },
//             },
//             // start test
//             { title: "Name", field: "name" },
//             { title: "Surname", field: "surname" },
//             { title: "Birth Year", field: "birthYear", type: "numeric" },
//             {
//               title: "Birth Place",
//               field: "birthCity",
//               lookup: { 34: "İstanbul", 63: "Şanlıurfa" },
//             },
//             // end test
//             // start test
//             { title: "Name", field: "name" },
//             { title: "Surname", field: "surname" },
//             { title: "Birth Year", field: "birthYear", type: "numeric" },
//             {
//               title: "Birth Place",
//               field: "birthCity",
//               lookup: { 34: "İstanbul", 63: "Şanlıurfa" },
//             },
//             // end test
//             // start test
//             { title: "Name", field: "name" },
//             { title: "Surname", field: "surname" },
//             { title: "Birth Year", field: "birthYear", type: "numeric" },
//             {
//               title: "Birth Place",
//               field: "birthCity",
//               lookup: { 34: "İstanbul", 63: "Şanlıurfa" },
//             },
//             // end test
//           ]}
//           data={[
//             {
//               name: "Mehmet",
//               surname: "Baran",
//               birthYear: 1987,
//               birthCity: 63,
//               imageUrl:
//                 "https://avatars0.githubusercontent.com/u/7895451?s=460&v=4",
//             },
//             {
//               name: "Zerya Betül",
//               surname: "Baran",
//               birthYear: 2017,
//               birthCity: 34,
//               imageUrl:
//                 "https://avatars0.githubusercontent.com/u/7895451?s=460&v=4",
//             },
//             {
//               name: "sadi",
//               surname: "fee",
//               birthYear: 2012,
//               birthCity: 64,
//               imageUrl:
//                 "https://avatars0.githubusercontent.com/u/7895451?s=460&v=4",
//             },
//             {
//               name: "hakim",
//               surname: "Baran",
//               birthYear: 2017,
//               birthCity: 12,
//             },
//             {
//               name: "Zerya Betül",
//               surname: "Baran",
//               birthYear: 2017,
//               birthCity: 3,
//               imageUrl:
//                 "https://avatars0.githubusercontent.com/u/7895451?s=460&v=4",
//             },
//             {
//               name: "mahmud",
//               surname: "Baran",
//               birthYear: 2017,
//               birthCity: 4,
//             },
//             {
//               name: "kabir",
//               surname: "Baran",
//               birthYear: 2017,
//               birthCity: 34,
//               imageUrl:
//                 "https://avatars0.githubusercontent.com/u/7895451?s=460&v=4",
//             },
//             {
//               name: "taihan",
//               surname: "Baran",
//               birthYear: 2017,
//               birthCity: 34,
//             },
//             {
//               name: "fuad",
//               surname: "Baran",
//               birthYear: 2017,
//               birthCity: 34,
//             },
//             {
//               name: "hasan",
//               surname: "Baran",
//               birthYear: 2017,
//               birthCity: 34,
//             },
//           ]}
//           onRowMouse={(evt, selectedRow) =>
//             setSelectedRow(selectedRow.tableData.id)
//           }
//           options={{
//             search: true,
//             sorting: true,
//             screenX: true,
//             searchFieldAlignment: "left",
//             showTitle: false,
//             maxBodyHeight: 400,
//             //maxBodyWeight: 400,

//             //thirdSortClick: false,
//             headerStyle: {
//               backgroundColor: "#01a9ac",
//               color: "#FFFF",
//               // fontFamily: "bold",
//               // fontSize: "50",
//               position: "sticky",
//               top: "0",
//             },
//             rowStyle: (rowData) => ({
//               backgroundColor:
//                 selectedRow === rowData.tableData.id ? "#EEE" : "#FFF",
//             }),
//           }}
//         />
//       </div>
//     </div>
//   );
// }
// export default BasicSearch;
// important link
// https://rsuitejs.com/components/calendar/
//https://material-react-table-storybook-qn2ngr0qg-kevinvandy.vercel.app/
// npm install material-table@1.69.3 --save
