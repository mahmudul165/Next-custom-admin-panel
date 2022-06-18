import axios from "axios";
import { useState, useEffect } from "react";
import { useQuery } from "react-query";
const useGlobal = () => {
  const [categorydata, setCategory] = useState("");
  const [subservicedata, setSubservice] = useState("");
  const [therapistservicedata, setTherapistservice] = useState("");
  // global get data method
  // useEffect(() => {
  //   setCategory(categoryService);
  //   setSubservice(subService);
  //   setTherapistservice(therapistService);
  // }, [categoryService, subService, therapistService]);

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
  // const Statustest = (status) => {
  //   if (status == "A") {
  //     return " Active";
  //   } else if (status == "I") {
  //     return "Inactive";
  //   } else if (status == "P") {
  //     return "Pending";
  //   } else if (status == "C") {
  //     return "Canceled";
  //   } else if (status == "D") {
  //     return "Deleted";
  //   } else {
  //     return " ";
  //   }
  // };
  const Statustest = (status) => {
    if (status == "1") {
      return " Active";
    } else if (status == "2") {
      return "Inactive";
    } else if (status == "3") {
      return "Pending";
    } else if (status == "4") {
      return "Canceled";
    } else if (status == "5") {
      return "Deleted";
    } else {
      return " ";
    }
  };
  return {
    categorydata,
    setCategory,
    subservicedata,
    setSubservice,
    therapistservicedata,
    setTherapistservice,
    postData,
    deleteData,
    Statustest,
  };
};

export default useGlobal;
