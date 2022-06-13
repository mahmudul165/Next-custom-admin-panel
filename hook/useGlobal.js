import axios from "axios";
import { useState, useEffect } from "react";
import { useQuery } from "react-query";
const useGlobal = () => {
  const [categorydata, setCategory] = useState([]);
  const [subservicedata, setSubservice] = useState([]);
  const [therapistservicedata, setTherapistservice] = useState([]);
  // global get data method
  async function fetchCategoryService() {
    const { data } = await axios.get(
      "https://misiapi.lamptechs.com/api/service"
    );
    return data;
  }
  async function fetchSubService() {
    const { data } = await axios.get(
      "https://misiapi.lamptechs.com/api/subservice"
    );
    return data;
  }
  async function fetchTherapistService() {
    const { data } = await axios.get(
      "https://misiapi.lamptechs.com/api/therapistService"
    );
    return data;
  }
  const { data: categoryService } = useQuery(
    "categoryService",
    fetchCategoryService
  );

  const { data: subService } = useQuery("subService", fetchSubService);
  const { data: therapistService } = useQuery(
    "therapistService",
    fetchTherapistService
  );
  useEffect(() => {
    setCategory(categoryService);
    setSubservice(subService);
    setTherapistservice(therapistService);
  }, [categoryService, subService, therapistService]);
  // console.log(
  //   "my data of 3 api is",
  //   categorydata,
  //   subservicedata,
  //   therapistservicedata
  // );
  // global post method
  const postData = (url, data) => {
    axios.post(url, data).then((response) => {
      console.log(response);
      alert("successfully added ");
    });
  };
  // global delete data
  const deleteData = (url, id) => {
    axios.post(`${url}/${id}`).then((response) => {
      console.log(response);
      alert("data field deleted  ");
    });
  };

  // status
  const Statustest = (status) => {
    if (status == "A") {
      return "Active";
    } else if (status == "I") {
      return "Inactive";
    } else if (status == "P") {
      return "Pending";
    } else if (status == "C") {
      return "Cancelled";
    } else if (status == "D") {
      return "Deleted";
    } else {
      return " ";
    }
  };
  return {
    categorydata,
    subservicedata,
    therapistservicedata,
    fetchCategoryService,
    fetchSubService,
    fetchTherapistService,
    postData,
    deleteData,
    Statustest,
  };
};

export default useGlobal;
