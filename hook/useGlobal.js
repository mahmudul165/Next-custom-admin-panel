import axios from "axios";
import { useState, useEffect } from "react";

const useGlobal = () => {
  // global post method
  const postData = (url, data) => {
    axios.post(url, data).then((response) => {
      console.log(response);
      alert("you are completed category field");
    });
  };

  const deleteData = (url, id) => {
    axios.post(`${url}/${id}`).then((response) => {
      console.log(response);
      //misiapi.lamptechs.com/api/service/delete/
      https: alert("data field deleted  ");
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
    postData,
    deleteData,
    Statustest,
  };
};

export default useGlobal;
