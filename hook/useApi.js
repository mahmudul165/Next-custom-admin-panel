import { useQuery } from "react-query";
import axios from "axios";

export const fetchCategoryService = async () => {
  const { data } = await axios.get("https://misiapi.lamptechs.com/api/service");
  return data;
};
export const fetchSubService = async () => {
  const { data } = await axios.get(
    "https://misiapi.lamptechs.com/api/subservice"
  );
  return data;
};
export const fetchTherapistService = async () => {
  const { data } = await axios.get(
    "https://misiapi.lamptechs.com/api/therapistService"
  );
  return data;
};

// export const categoryServiceData = () => {
//   return useQuery("categoryServiceData", fetchCategoryService());
// };

// export const subCategoryServiceData = () => {
//   return useQuery("subCategoryServiceData", fetchSubService());
// };
// export const therapistServiceData = () => {
//   return useQuery("therapistServiceData", fetchTherapistService());
// };
