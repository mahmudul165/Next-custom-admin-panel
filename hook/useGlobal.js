import axios from "axios";
import { Router } from "next/router";
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

  // function logout() {
  //   axios
  //     .post("https://misiapi.lamptechs.com/api/v1/admin/logout", {
  //       headers: { Authorization: `Bearer ${token}` },
  //     })
  //     .then((response) => {
  //       console.log("logout response", response);
  //       alert("successfully added ");
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  //   //misiapi.lamptechs.com/api/v1/admin/logout
  //   //userSubject.next(null);
  //   //localStorage.removeItem("token");
  //   //Router.push("/account/login");
  // }
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

  // Add a 401 response interceptor
  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response.status === 401) {
        //place your reentry code
      }
      return error;
    }
  );
  // global delete data
  // const deleteData = async (url, token) => {
  //   console.log(`deleteUrl:${url}     token:${token}`);
  //   await axios
  //     .post(
  //       url,
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${token}`,
  //         },
  //       },

  //       {
  //         withCredentials: true,
  //       }
  //     )
  //     .then((response) => {
  //       console.log(response);
  //       alert("data field deleted");
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  // };

  function deleteData(url) {
    console.log(
      `deleteUrl:${url}     token:Bearer ${localStorage.getItem("token")}`
    );
    fetch(
      url,

      {
        Method: "POST",
        Headers: {
          Accept: "application.json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        // Body: body,
        Cache: "default",
      },

      // {
      //   headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      // },
      // {
      //   headers: { Authorization: `Bearer ${token}` },
      // },
      {
        withCredentials: true,
      }
    )
      .then(() => {
        console.log("deleteData succesfully");
      })
      .catch((err) => {
        console.error(err);
      });
  }

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
    //logout,
    deleteData,
    Statustest,
  };
};

export default useGlobal;
