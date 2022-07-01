import axios from "axios";
axios.defaults.withCredentials = true;
axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
import { useState, useEffect } from "react";
import { useQuery } from "react-query";
const useGlobal = () => {
  const axios = require("axios").default;
  const [categorydata, setCategory] = useState("");
  const [subservicedata, setSubservice] = useState("");
  const [therapistservicedata, setTherapistservice] = useState("");
  // set and get token
  const [token, setToken] = useState("");

  useEffect(() => {
    const items = localStorage.getItem("token");
    if (items) {
      setToken(items);
    }
  }, [token]);
  // global get data method
  // useEffect(() => {
  //   setCategory(categoryService);
  //   setSubservice(subService);
  //   setTherapistservice(therapistService);
  // }, [categoryService, subService, therapistService]);

  // global post method

  // const config = {
  //   headers: {
  //     "Access-Control-Allow-Origin": "*",
  //     "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
  //   },
  // };
  // let token = document
  //   .querySelector("meta[name=”csrf-token”]")
  //   .getAttribute("content");
  const postData = (url, data) => {
    axios
      .post(
        url,
        data,
        {
          headers: { Authorization: `Bearer ${token}` },
        },

        {
          withCredentials: true,
        }
      )
      .then((response) => {
        console.log("post data", response);
        alert("successfully added ");
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  // global delete data
  const deleteData = async (url, id) => {
    const deleteUrl = await `${url}/${id}`;
    const jwt = await token;
    console.log(`'deleteUrl:' ${deleteUrl},'token:' ${jwt}`);
    await axios
      .post(
        deleteUrl,
        {
          headers: { Authorization: `Bearer ${jwt}` },
        },
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        console.log(response);
        alert("data field deleted");
      })
      .catch(function (error) {
        console.log(error);
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
    token,
    deleteData,
    Statustest,
  };
};

export default useGlobal;
