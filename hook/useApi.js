import { useQuery } from "react-query";
import axios from "axios";
// get category service data
const fetchCategoryService = async () => {
  const response = await fetch("https://misiapi.lamptechs.com/api/v1/service");
  return await response.json();
};
export const useCategoryQuery = () =>
  useQuery(["category"], fetchCategoryService, {
    // refetchOnMount: false,
    // refetchOnWindowFocus: false,
  });
// get   service sub-category data
const fetchSubService = async () => {
  const response = await fetch(
    "https://misiapi.lamptechs.com/api/v1/subservice"
  );
  return await response.json();
};
export const useSubCategoryQuery = () =>
  useQuery(["subcategory"], fetchSubService);

// get  service therapist data
const fetchTherapistService = async () => {
  const response = await fetch(
    "https://misiapi.lamptechs.com/api/v1/therapistService"
  );
  return await response.json();
};
export const useTherapistServiceQuery = () =>
  useQuery(["therapistService"], fetchTherapistService);

// get  patient list  data
const fetchPatientList = async () => {
  const response = await fetch("https://misiapi.lamptechs.com/api/v1/patient");
  return await response.json();
};
export const usePatientListQuery = () =>
  useQuery(["patientList"], fetchPatientList);

// get  All ticket  data
const fetchAllTicket = async () => {
  const response = await fetch("https://misiapi.lamptechs.com/api/v1/patient");
  return await response.json();
};
export const useAllTicketQuery = () => useQuery(["allticket"], fetchAllTicket);

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
