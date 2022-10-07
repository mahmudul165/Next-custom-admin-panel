import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Pdf from "react-to-pdf";

import {
  usePatientListQuery,
  //usePatientQuery,
  useTherapitListQuery,
  useAllTicketDepartmentQuery,
} from "/hook/useApi.js";
import Loading from "/components/common/Loading.js";
const schema = yup
  .object()
  .shape({
    // service_category_id
    // service_subcategory_name
    //  status
    //  remarks
    // service_category_id: yup.string().required(),
    // name: yup.string().required(),
    // details: yup.string().required(),
    //remarks: yup.string().required(),
    //status: yup.string().required(),
  })
  .required();
import useAuth from "/hook/useAuth";
import { useQuery } from "react-query";
import { useRouter } from "next/router";
// import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
// const styles = StyleSheet.create({
//   page: {
//     flexDirection: "row",
//     backgroundColor: "#E4E4E4",
//   },
//   section: {
//     margin: 10,
//     padding: 10,
//     flexGrow: 1,
//   },
// });
function EditTicket() {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const { postData, updateData, Statustest, token } = useAuth();
  const [pathId, setId] = useState("");
  const [singleTherapist, setRemoteData] = useState({});
  //console.log("single ticket data  from  ", singleTherapist);
  const [startDate, setStartDate] = useState(new Date());
  const { register, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });
  const { data: patientList } = usePatientListQuery();
  const { data: therapistList } = useTherapitListQuery();
  const { data: ticketDepartment } = useAllTicketDepartmentQuery();

  // const { data: singleTherapist.data?.patient_info } = usePatientQuery(searchInput);
  //const { data, error, isError } = useTherapitListQuery();
  //console.log("All ticket data  from  ", data);

  //console.log("patient list from ticket from", patientList);
  //console.log(" single patient list from ticket from", singleTherapist.data?.patient_info);
  //console.log("therapy list  from ticket from", therapistList);
  //console.log("ticket department list  from ticket from", ticketDepartment);

  // get  single patient data
  const router = useRouter();
  const ref = React.createRef();
  //const { id } = router.query;

  console.log("single ticket id", typeof id);
  // localStorage.setItem("lastId", router.query?.id);
  router.query?.id && localStorage.setItem("lastId", router.query?.id);
  useEffect(() => {
    setId(router.query?.id || localStorage.getItem("lastId"));
  }, [pathId]);

  useEffect(() => {
    setId(router.query?.id);
    const fetchData = async () => {
      const response = await fetch(
        `https://misiapi.lamptechs.com/api/v1/show?id=${pathId}`,

        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const json = await response.json();
      setRemoteData(json.data);
    };
    fetchData();
  }, [pathId, singleTherapist]);
  console.log("single patient id", singleTherapist);

  // const fetchsinglePatient = async () => {
  //   const response = await fetch(
  //     `https://misiapi.lamptechs.com/api/v1/ticket/show?id=${pathId}`,
  //     {
  //       headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  //     }
  //   );
  //   return await response.json();
  // };
  // const usesinglePatientQuery = () =>
  //   useQuery(["fetchSingleTicket"], fetchSingleTicket, {
  //     refetchOnMount: true,
  //     refetchOnWindowFocus: true,
  //     refetchInterval: 1000,
  //   });
  // const { data: singleTicket } = useSingleTicketQuery();

  return (
    <>
      {singleTherapist ? (
        <div className="container   mx-4  px-12  rounded bg-white mt-5 mb-5 ">
          <div className="container   mx-4  p-12  rounded bg-white mt-5 mb-5 ">
            <div className="grid  gap-4 mt-2.5">
              <h2
                className="col-start-1  text-center text-3xl   font-extrabold   "
                style={{ color: "#01a9ac" }}
              >
                Therapist Schedule
                {/* id: {singleTicket.data?.id} */}
              </h2>
              {/* button download and save */}
              <div className="col-start-2 my-3 px-3 md:flex md:items-center justify-end ">
                <div className="inline-flex rounded-md shadow-sm" role="group">
                  <button
                    onClick={() => router.push(`/therapist`)}
                    style={{ backgroundColor: "#01a9ac" }}
                    type="button"
                    className="inline-flex items-center py-2 px-4 text-sm font-medium text-gray-900 bg-transparent rounded-l-lg border border-gray-900 hover:bg-gray-900 hover:text-teal-500 focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-teal-500 dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700 shadow   "
                  >
                    <svg
                      aria-hidden="true"
                      className="mr-2 w-4 h-4 fill-current"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Go back
                  </button>
                  <Pdf targetRef={ref} filename="therapist.pdf">
                    {({ toPdf }) => (
                      <button
                        onClick={toPdf}
                        style={{ backgroundColor: "#01a9ac" }}
                        type="button"
                        className="inline-flex items-center py-2 px-4 text-sm font-medium text-gray-900 bg-transparent rounded-l-lg border border-gray-900 hover:bg-gray-900 hover:text-teal-500 focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-teal-500 dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700 shadow  "
                      >
                        <svg
                          aria-hidden="true"
                          className="mr-2 w-4 h-4 fill-current"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M2 9.5A3.5 3.5 0 005.5 13H9v2.586l-1.293-1.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 15.586V13h2.5a4.5 4.5 0 10-.616-8.958 4.002 4.002 0 10-7.753 1.977A3.5 3.5 0 002 9.5zm9 3.5H9V8a1 1 0 012 0v5z"
                            clipRule="evenodd"
                          />
                        </svg>
                        Downloads
                      </button>
                    )}
                  </Pdf>
                </div>
              </div>
            </div>

            {/* end button */}
            <div
              //style={{ width: 500, height: 500, background: "blue" }}
              ref={ref}
              className="   row container    border-t-2"
            >
              <div className=" col-md-4    ">
                <div className="d-flex flex-column align-items-center text-center px-3">
                  <img
                    className="rounded-circle mt-3"
                    width="180px"
                    src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
                  />
                  <span className="font-weight-bold text-xl">{`${singleTherapist?.first_name} ${singleTherapist?.last_name}`}</span>
                  <span className="mt-2 text-teal-500 font-medium">{`${singleTherapist?.email}`}</span>
                  <span> </span>
                </div>
                {/* start */}
                <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
                  <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      {/* <th scope="col" className="py-3 fs-5 fw-bolder">
                    Pre intake beoordeling (PiB)
                  </th> */}
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
                      <th
                        scope="row"
                        className="whitespace-normal px-2 py-2.5 font-medium text-gray-900 dark:text-white"
                      >
                        Phone:
                      </th>
                      <td className="px-2 py-2.5">{`${singleTherapist?.phone}`}</td>
                    </tr>
                    <tr className="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
                      <th
                        scope="row"
                        className="whitespace-normal px-2 py-2.5 font-medium text-gray-900 dark:text-white"
                      >
                        Alternative Phone:
                      </th>
                      <td className="px-2 py-2.5">{`${singleTherapist?.emergency_contact}`}</td>
                    </tr>
                    <tr className="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
                      <th
                        scope="row"
                        className="whitespace-normal px-2 py-2.5 font-medium text-gray-900 dark:text-white"
                      >
                        Country:
                      </th>
                      <td className="px-2 py-2.5">{`${singleTherapist.country?.name}`}</td>
                    </tr>
                    <tr className="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
                      <th
                        scope="row"
                        className="whitespace-normal px-2 py-2.5 font-medium text-gray-900 dark:text-white"
                      >
                        Nationality:
                      </th>
                      <td className="px-2 py-2.5">{`${singleTherapist.country?.name}`}</td>
                    </tr>
                    <tr className="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
                      <th
                        scope="row"
                        className="whitespace-normal px-2 py-2.5 font-medium text-gray-900 dark:text-white"
                      >
                        Resident Address:
                      </th>
                      <td className="px-2 py-2.5">{`${singleTherapist.country?.name}`}</td>
                    </tr>
                    <tr className="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
                      <th
                        scope="row"
                        className="whitespace-normal px-2 py-2.5 font-medium text-gray-900 dark:text-white"
                      >
                        State:
                      </th>
                      <td className="px-2 py-2.5">
                        {" "}
                        {`${singleTherapist.state?.name}`}
                      </td>
                    </tr>
                    <tr className="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
                      <th
                        scope="row"
                        className="whitespace-normal px-2 py-2.5 font-medium text-gray-900 dark:text-white"
                      >
                        Area:
                      </th>
                      <td className="px-2 py-2.5">{`${singleTherapist?.address}`}</td>
                    </tr>

                    <tr className="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
                      <th
                        scope="row"
                        className="whitespace-normal px-2 py-2.5 font-medium text-gray-900 dark:text-white"
                      >
                        Date of birth:
                      </th>
                      <td className="px-2 py-2.5">{`${singleTherapist?.date_of_birth}`}</td>
                    </tr>
                    <tr className="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
                      <th
                        scope="row"
                        className="whitespace-normal px-2 py-2.5 font-medium text-gray-900 dark:text-white"
                      >
                        Blood group:
                      </th>
                      <td className="px-2 py-2.5">{`${singleTherapist.blood_group?.name}`}</td>
                    </tr>
                    <tr className="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
                      <th
                        scope="row"
                        className="whitespace-normal px-2 py-2.5 font-medium text-gray-900 dark:text-white"
                      >
                        Language:
                      </th>
                      <td className="px-2 py-2.5">{`${singleTherapist?.language}`}</td>
                    </tr>
                    <tr className="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
                      <th
                        scope="row"
                        className="whitespace-normal px-2 py-2.5 font-medium text-gray-900 dark:text-white"
                      >
                        DOB number:
                      </th>
                      <td className="px-2 py-2.5">{`${singleTherapist?.dob_number}`}</td>
                    </tr>
                    <tr className="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
                      <th
                        scope="row"
                        className="whitespace-normal px-2 py-2.5 font-medium text-gray-900 dark:text-white"
                      >
                        BNS number:
                      </th>
                      <td className="px-2 py-2.5">{`${singleTherapist?.bsn_number}`}</td>
                    </tr>
                    <tr className="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
                      <th
                        scope="row"
                        className="whitespace-normal px-2 py-2.5 font-medium text-gray-900 dark:text-white"
                      >
                        Insurance number:
                      </th>
                      <td className="px-2 py-2.5">{`${singleTherapist?.insurance_number}`}</td>
                    </tr>
                  </tbody>
                </table>
                {/* <div className="p-3 py-5">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 className="text-right">Profile Settings</h4>
              </div>
              <div className="row mt-2">
                <div className="col-md-6">
                  <label className="labels">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="first name"
                    defaultValue
                  />
                </div>
                <div className="col-md-6">
                  <label className="labels">Surname</label>
                  <input
                    type="text"
                    className="form-control"
                    defaultValue
                    placeholder="surname"
                  />
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-md-12">
                  <label className="labels">Mobile Number</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="enter phone number"
                    defaultValue
                  />
                </div>
                <div className="col-md-12">
                  <label className="labels">Address Line 1</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="enter address line 1"
                    defaultValue
                  />
                </div>
                <div className="col-md-12">
                  <label className="labels">Address Line 2</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="enter address line 2"
                    defaultValue
                  />
                </div>
                <div className="col-md-12">
                  <label className="labels">Postcode</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="enter address line 2"
                    defaultValue
                  />
                </div>
                <div className="col-md-12">
                  <label className="labels">State</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="enter address line 2"
                    defaultValue
                  />
                </div>
                <div className="col-md-12">
                  <label className="labels">Area</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="enter address line 2"
                    defaultValue
                  />
                </div>
                <div className="col-md-12">
                  <label className="labels">Email ID</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="enter email id"
                    defaultValue
                  />
                </div>
                <div className="col-md-12">
                  <label className="labels">Education</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="education"
                    defaultValue
                  />
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-md-6">
                  <label className="labels">Country</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="country"
                    defaultValue
                  />
                </div>
                <div className="col-md-6">
                  <label className="labels">State/Region</label>
                  <input
                    type="text"
                    className="form-control"
                    defaultValue
                    placeholder="state"
                  />
                </div>
              </div>
              <div className="mt-5 text-center">
                <button
                  className="btn btn-primary profile-button"
                  type="button"
                >
                  Save Profile
                </button>
              </div>
            </div> */}
                {/* end */}
              </div>
              <div className="col-md-5  border-l-2">
                <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
                  <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      {/* <th scope="col" className="py-3 fs-5 fw-bolder">
                    Pre intake beoordeling (PiB)
                  </th> */}
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="  bg-white dark:border-gray-700 dark:bg-gray-800">
                      <th
                        scope="row"
                        className="whitespace-normal px-2 py-2.5 font-medium text-gray-900 dark:text-white"
                      >
                        File type:
                      </th>
                      <td className="px-2 py-2.5">
                        {/* {`${singleTherapist?.upload_files[0]?.file_name}`} */}
                      </td>
                    </tr>
                    <tr className="  bg-white dark:border-gray-700 dark:bg-gray-800">
                      <th
                        scope="row"
                        className="whitespace-normal px-2 py-2.5 font-medium text-gray-900 dark:text-white"
                      >
                        Therapist type:
                      </th>
                      <td className="px-2 py-2.5">{`${singleTherapist.therapist_type?.name}`}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              {/* <div className="col-md-4">
            <div className="p-3 py-5">
              <div className="d-flex justify-content-between align-items-center experience">
                <span>Edit Experience</span>
                <span className="border px-3 p-1 add-experience">
                  <i className="fa fa-plus" />
                  &nbsp;Experience
                </span>
              </div>
              <br />
              <div className="col-md-12">
                <label className="labels">Experience in Designing</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="experience"
                  defaultValue
                />
              </div>{" "}
              <br />
              <div className="col-md-12">
                <label className="labels">Additional Details</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="additional details"
                  defaultValue
                />
              </div>
            </div>
          </div> */}
            </div>
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}

export default EditTicket;
