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

  return {
    postData,
  };
};

export default useGlobal;
