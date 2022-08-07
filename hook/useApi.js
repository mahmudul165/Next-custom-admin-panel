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

// all patient data
const fetchPatientList = async () => {
  const response = await fetch("https://misiapi.lamptechs.com/api/v1/patient", {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
  return await response.json();
};

export const usePatientListQuery = () =>
  useQuery(["patientList"], fetchPatientList, {
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    refetchInterval: 10000,
  });

// get  All ticket  data
const fetchAllTicket = async () => {
  const response = await fetch("https://misiapi.lamptechs.com/api/v1/ticket", {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });

  return await response.json();
};
export const useAllTicketQuery = () =>
  useQuery(["allticket"], fetchAllTicket, {
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    refetchInterval: 9000,
  });

// get therapist list  data
const fetchTherapitList = async () => {
  const response = await fetch(
    "https://misiapi.lamptechs.com/api/v1/therapist",
    {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    }
  );
  return await response.json();
};
export const useTherapitListQuery = () =>
  useQuery(["therapistList"], fetchTherapitList, {});

//ticket dipartment
const fetchAllTicketDepartment = async () => {
  const response = await fetch(
    "https://misiapi.lamptechs.com/api/v1/ticket_department",
    {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    }
  );

  return await response.json();
};
export const useAllTicketDepartmentQuery = () =>
  useQuery(["allDepartment"], fetchAllTicketDepartment, {
    // refetchOnMount: true,
    //refetchOnWindowFocus: true,
  });
// get  single ticket data
const fetchSingleTicket = async (id) => {
  const response = await fetch(
    `https://misiapi.lamptechs.com/api/v1/ticket/show?id=${id}`,

    {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    }
  );

  return await response.json();
};
export const useSingleTicket = (id) =>
  useQuery(["singleTicket"], fetchSingleTicket(id));

// get  single patient data
const fetchPatient = async (id) => {
  const response = await fetch(
    `https://misiapi.lamptechs.com/api/v1/patient/show/${id}`,
    {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    }
  );

  return await response.json();
};
export const usePatientQuery = (id) =>
  useQuery(["singlepatient"], fetchPatient(id));

// get  country data
const fetchCountyList = async () => {
  const response = await fetch(`https://misiapi.lamptechs.com/api/v1/country`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });

  return await response.json();
};
export const useCountyListQuery = () => useQuery(["country"], fetchCountyList);
// get  blood data
const fetchBloodGroup = async () => {
  const response = await fetch(
    `https://misiapi.lamptechs.com/api/v1/blood_group`,
    {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    }
  );

  return await response.json();
};
export const useBloodGroupQuery = () =>
  useQuery(["bloodGfroup"], fetchBloodGroup);

// therapist schedule
const fetchTherapistSchedule = async () => {
  const response = await fetch(
    `https://misiapi.lamptechs.com/api/v1/therapist_schedule`,
    {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    }
  );

  return await response.json();
};
export const useTherapistScheduleQuery = () =>
  useQuery(["therapistSchedule"], fetchTherapistSchedule);

// get  state data
const fetchState = async () => {
  const response = await fetch(`https://misiapi.lamptechs.com/api/v1/state`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });

  return await response.json();
};
export const useStateDataQuery = () => useQuery(["state"], fetchState);

// get  occupation data
const fetchOccupation = async () => {
  const response = await fetch(
    `https://misiapi.lamptechs.com/api/v1/occupation`,
    {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    }
  );

  return await response.json();
};
export const useOccupationQuery = () =>
  useQuery(["fetchOccupation"], fetchOccupation);

// therapist type
const fetchTypeTherapist = async () => {
  const response = await fetch(
    `https://misiapi.lamptechs.com/api/v1/therapist_type`,
    {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    }
  );

  return await response.json();
};
export const useTherapistTypeQuery = () =>
  useQuery(["therapistType"], fetchTypeTherapist);

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
