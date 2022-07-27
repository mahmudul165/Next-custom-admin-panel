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
    console.log(`postData:${url}  data: ${data.patient_id} `);
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
  const headers = {
    "Content-Type": "application/json",
    //Authorization: "JWT fefege...",
    Authorization: `Bearer ${token}`,
  };
  const deleteData = (url) => {
    console.log(`deleteUrl:${url}  token:${token}`);
    axios
      .post(
        url,
        {},

        {
          headers: { Authorization: `Bearer ${token}` },
        },

        {
          withCredentials: true,
        }
        // {
        //   headers: headers,
        // },

        // {
        //   withCredentials: true,
        // }
      )
      .then((response) => {
        console.log(response);
        alert("data field deleted");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // global update data

  const updateData = (url) => {
    console.log(`updateData:${url}    token:${token}`);
    axios
      .post(
        url,
        {},
        {
          headers: headers,
        },

        {
          withCredentials: true,
        }
      )
      .then((response) => {
        console.log(response);
        alert("data field updated");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // function deleteData(url) {
  //   console.log(
  //     `deleteUrl:${url}     token:Bearer ${localStorage.getItem("token")}`
  //   );
  //   fetch(
  //     url,

  //     {
  //       Method: "POST",
  //       Headers: {
  //         "Access-Control-Allow-Origin": "*",
  //         "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
  //         Accept: "application.json",
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${localStorage.getItem("token")}`,
  //       },
  //       // Body: body,
  //       Cache: "default",
  //     },

  //     {
  //       withCredentials: true,
  //     }
  //   )
  //     .then(() => {
  //       console.log("deleteData succesfully");
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //     });
  // }

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

  // apiPath Url
  const apiRootUrl = "https://misiapi.lamptechs.com";
  const apiEndpoint = {
    patientLogin: {
      list: "/api/v1/patient/login",
      login: "/api/v1/patient/login",
    },
    therapistLogin: {
      list: "/api/v1/therapist/login",
      login: "/api/v1/therapist/login",
    },
    adminLogin: {
      list: "/api/v1/admin/login",
      login: "/api/v1/admin/login",
    },
    service: {
      list: "/api/v1/service",
      create: "/api/v1/service/store",
      delete: "/api/v1/service/delete",
      edit: "",
    },
    subservice: {
      list: "/api/v1/subservice",
      create: "/api/v1/subservice/store",
      delete: "/api/v1/service/delete",
      edit: "",
    },
    therapist: {
      list: "/api/v1/therapist",
      create: "/api/v1/therapist/store",
      delete: "/api/v1/therapist/delete",
      edit: "",
    },
    therapistService: {
      list: "/api/v1/therapistService",
      create: "/api/v1/therapistService/store",
      delete: "/api/v1/therapistService/delete",
      edit: "",
    },

    therapist_type: {
      list: "/api/v1/therapist_type",
      create: "/api/v1/therapist_type/store",
      delete: "/api/v1/therapist_type/delete",
      edit: "",
    },

    patient: {
      list: "/api/v1/patient",
      create: "/api/v1/patient/store",
      delete: "/api/v1/patient/delete",
      edit: "",
    },

    ticket: {
      list: "/api/v1/ticket",
      create: "/api/v1/ticket/store",
      delete: "/api/v1/ticket/delete",
      edit: "/api/v1/ticket/update",
    },
    therapist_degree: {
      list: "/api/v1/therapist_degree",
      create: "/api/v1/therapist_degree/store",
      delete: "api/v1/therapist_degree/delete",
      edit: "",
    },
    appointment: {
      list: "/api/v1/appointment",
      create: "/api/v1/appointment/store",
      delete: "/api/v1/appointment/delete",
      edit: "",
    },
    blood_group: {
      list: "/api/v1/blood_group",
      create: "/api/v1/blood_group/store",
      delete: "/api/v1/blood_group/delete",
      edit: "",
    },
    ticket_department: {
      list: "/api/v1/ticket_department",
      create: "/api/v1/ticket_department/store",
      delete: "/api/v1/ticket_department/delete",
      edit: "",
    },
    state: {
      list: "/api/v1/state",
      create: "/api/v1/state/store",
      delete: "/api/v1/state/delete",
      edit: "",
    },

    occupation: {
      list: "/api/v1/occupation",
      create: "/api/v1/occupation/store",
      delete: "/api/v1/occupation/delete",
      edit: "",
    },
  };

  return {
    headers,
    categorydata,
    setCategory,
    subservicedata,
    setSubservice,
    therapistservicedata,
    setTherapistservice,
    postData,
    token,
    apiRootUrl,
    apiEndpoint,
    //logout,
    deleteData,
    updateData,
    Statustest,
  };
};

export default useGlobal;
