import { useQuery } from "react-query";
import axios from "axios";
import useAuth from "/hook/useAuth";

// set and get token

// get category service data
const fetchCategoryService = async () => {
  const response = await fetch("https://misiapi.lamptechs.com/api/v1/service", {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
  return await response.json();
};
export const useCategoryQuery = () =>
  useQuery(
    ["category"],
    fetchCategoryService,

    {
      // refetchOnMount: false,
      // refetchOnWindowFocus: false,
    }
  );
// get   service sub-category data
const fetchSubService = async () => {
  console.log("test tok", token);
  // get category service data
  const response = await fetch(
    "https://misiapi.lamptechs.com/api/v1/subservice",
    {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    }
  );
  return await response.json();
};
export const useSubCategoryQuery = () =>
  useQuery(["subcategory"], fetchSubService, {
    // refetchOnMount: false,
    // refetchOnWindowFocus: false,
  });

// get  service therapist data
const fetchTherapistService = async () => {
  const response = await fetch(
    "https://misiapi.lamptechs.com/api/v1/therapistService",
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return await response.json();
};
export const useTherapistServiceQuery = () =>
  useQuery(["therapistService"], fetchTherapistService, {
    // refetchOnMount: false,
    // refetchOnWindowFocus: false,
  });

// get  patient list  data

//const withoutCommasToken = token.replace(/'/g);
//console.log(withoutCommasToken);
//const headers = { Authorization: `Bearer ${token}` };
// console.log("headers", headers);
// const api = 'your api';
// const token = JSON.parse(sessionStorage.getItem('data'));
// const token = user.data.id; /*take only token and save in token variable*/
//const token = await localStorage.getItem("token");
// axios.get(https://misiapi.lamptechs.com/api/v1/patient" , { headers: {"Authorization" : `Bearer ${token}`} })
// .then(res => {
// console.log(res.data);
// .catch((error) => {
//   console.log(error)
// });
const fetchPatientList = async () => {
  const token = await localStorage.getItem("token");
  // const headers = await { Authorization: `${localStorage.getItem("token")}` };
  console.log("token.....", token);
  const response = await axios.get(
    "https://misiapi.lamptechs.com/api/v1/patient",
    {
      //headers: headers,
      // Authorization: `${localStorage.getItem("token")}`,
      //const token = localStorage.getItem("token"),
      // headers: { Authorization: token },
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return await response.json();
};

export const usePatientListQuery = () =>
  useQuery(["patientList"], fetchPatientList, {
    // refetchOnMount: false,
    // refetchOnWindowFocus: false,
  });

// get therapist list  data
const fetchTherapitList = async () => {
  const response = await fetch(
    "  https://misiapi.lamptechs.com/api/v1/therapist"
  );
  return await response.json();
};
export const useTherapitListQuery = () =>
  useQuery(["therapistList"], fetchTherapitList, {
    // refetchOnMount: false,
    // refetchOnWindowFocus: false,
  });

// get  All ticket  data
const fetchAllTicket = async () => {
  const response = await fetch("https://misiapi.lamptechs.com/api/v1/patient");
  return await response.json();
};
export const useAllTicketQuery = () =>
  useQuery(["allticket"], fetchAllTicket, {
    // refetchOnMount: false,
    // refetchOnWindowFocus: false,
  });

// global get data method
// async function fetchCategoryService() {
//   const { data } = await axios.get("https://misiapi.lamptechs.com/api/v1/service");
//   return data;
// }
// async function fetchSubService() {
//   const { data } = await axios.get(
//     "https://misiapi.lamptechs.com/api/v1/subservice"
//   );
//   return data;
// }
// async function fetchTherapistService() {
//   const { data } = await axios.get(
//     "https://misiapi.lamptechs.com/api/v1/therapistService"
//   );
//   return data;
// }
// const { data: categoryService } = useQuery(
//   "categoryService",
//   fetchCategoryService
// );

// const { data: subService } = useQuery("subService", fetchSubService);
// const { data: therapistService } = useQuery(
//   "therapistService",
//   fetchTherapistService
// );
// useEffect(() => {
//   setCategory(categoryService);
//   setSubservice(subService);
//   setTherapistservice(therapistService);
// }, [categoryService, subService, therapistService]);

// export const categoryServiceData = () => {
//   return useQuery("categoryServiceData", fetchCategoryService());
// };

// export const subCategoryServiceData = () => {
//   return useQuery("subCategoryServiceData", fetchSubService());
// };
// export const therapistServiceData = () => {
//   return useQuery("therapistServiceData", fetchTherapistService());
// };
