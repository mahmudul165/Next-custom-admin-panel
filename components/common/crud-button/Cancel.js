import React from "react";
import useAuth from "/hook/useAuth";
import Link from "next/link";
import { MdMode, MdOutlineDelete, MdRemoveRedEye } from "react-icons/md";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { ImCancelCircle } from "react-icons/im";
import Tooltip from "@mui/material/Tooltip";
function Cancel({ url, data }) {
  //console.log("url is", url.url);
  const Url = url;
  const userData = data;
  //console.log("userData is", Url, userData);
  const { cancelData } = useAuth();
  return (
    <>
      <Tooltip title="Cancel">
        <button
          className="text-danger  hover:underline   border-solid border-2 border-gray-350     btn-warning"
          onClick={() => cancelData(Url, userData)}
        >
          <ImCancelCircle className="text-2xl h-4" />
        </button>
      </Tooltip>
    </>
  );
}

export default Cancel;
