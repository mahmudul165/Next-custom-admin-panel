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
import Pdf from "react-to-pdf";
function EditPatient() {
  const { postData, updateData, Statustest, token } = useAuth();
  const [pathId, setId] = useState("");
  const [singlePatient, setRemoteData] = useState({});
  //console.log("single ticket data  from  ", singlePatient);
  const [startDate, setStartDate] = useState(new Date());
  const { register, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });
  const { data: patientList } = usePatientListQuery();
  const { data: therapistList } = useTherapitListQuery();
  const { data: ticketDepartment } = useAllTicketDepartmentQuery();

  // const { data: singlePatient.data?.patient_info } = usePatientQuery(searchInput);
  //const { data, error, isError } = useTherapitListQuery();
  //console.log("All ticket data  from  ", data);

  //console.log("patient list from ticket from", patientList);
  //console.log(" single patient list from ticket from", singlePatient.data?.patient_info);
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
        ` https://misiapi.lamptechs.com/api/v1/patient/show?id=${pathId}`,

        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const json = await response.json();
      setRemoteData(json.data);
    };
    fetchData();
  }, [pathId, singlePatient]);
  console.log("single patient id", singlePatient);

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
      {singlePatient ? (
        <div className="container   mx-4  px-12  rounded bg-white mt-5 mb-5 ">
          <div className="container  mx-4  p-12  rounded bg-white mt-5 mb-5 ">
            <div className="grid  gap-4 mt-2.5 items-center">
              <h2
                className="col-start-1  text-center text-3xl   font-extrabold   "
                style={{ color: "#01a9ac" }}
              >
                Group details
                {/* id: {singleTicket.data?.id} */}
              </h2>
              {/* button download and save */}
              <div className="col-start-2 my-3 px-3 md:flex md:items-center justify-end ">
                <div className="inline-flex rounded-md shadow-sm" role="group">
                  <button
                    onClick={() => router.push(`/group`)}
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
                  {/* <Pdf targetRef={ref} filename="patient.pdf">
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
                  </Pdf> */}
                </div>
              </div>
            </div>
            {/* end button */}
            <div ref={ref} className="row container    border-t-2">
              <div className="col-md-4">
                {/* start */}
                <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400 ">
                  {/* <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400"></thead> */}
                  <tbody>
                    <tr className="border-b bg-white dark:border-gray-700 dark:bg-gray-800  card">
                      <th
                        scope="row"
                        className="whitespace-normal px-3 py-2.5 font-bold text-black dark:text-white"
                      >
                        Name:
                      </th>
                      <td className="px-3 py-2.5">{`${singlePatient?.name}`}</td>
                    </tr>
                  </tbody>
                </table>
                {/* end */}
              </div>
              <div className="col-md-4  border-l-2">
                <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
                  {/* <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400"></thead> */}
                  <tbody>
                    {/* <tr className="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
                      <th
                        scope="row"
                        className="whitespace-normal px-3 py-2.5 font-bold text-black dark:text-white"
                      >
                        File type:
                      </th>
                      <td className="px-3 py-2.5">
                        
                       
                      </td>
                    </tr> */}
                    <tr className="border-b bg-white dark:border-gray-700 dark:bg-gray-800 card">
                      <th
                        scope="row"
                        className="whitespace-normal px-3 py-2.5 font-bold text-black dark:text-white"
                      >
                        Description:
                      </th>
                      <td className="px-3 py-2.5">{`${singlePatient?.description}`}</td>
                    </tr>
                    {/* <tr className="  bg-white dark:border-gray-700 dark:bg-gray-800">
                      <th
                        scope="row"
                        className="whitespace-normal px-3 py-2.5 font-bold text-black dark:text-white"
                      >
                        Medical history:
                      </th>
                    </tr>
                    <tr className="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
                      <td className="px-3 py-2.5">
                        {`${singlePatient?.medical_history}`}
                      </td>
                    </tr> */}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}

export default EditPatient;
