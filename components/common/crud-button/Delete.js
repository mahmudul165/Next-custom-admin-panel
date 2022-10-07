import React from "react";
import useAuth from "/hook/useAuth";
import Link from "next/link";
import { MdMode, MdOutlineDelete, MdRemoveRedEye } from "react-icons/md";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import Tooltip from "@mui/material/Tooltip";
function Delete(url) {
  //console.log("url is", url.url);
  const deleteUrl = url?.url;
  //console.log("url is", deleteUrl);
  const { deleteData } = useAuth();
  return (
    <>
      <Tooltip title="Delete">
        <button
          className="  hover:underline   border-solid border-2 border-gray-350     btn-danger"
          onClick={() => deleteData(deleteUrl)}
        >
          <FaTrashAlt className="text-xl h-3" />
        </button>
      </Tooltip>
    </>
  );
}

export default Delete;
