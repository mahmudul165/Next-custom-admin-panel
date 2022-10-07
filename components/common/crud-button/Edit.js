import React from "react";
import useAuth from "/hook/useAuth";
import Link from "next/link";
import { MdMode, MdOutlineDelete, MdRemoveRedEye } from "react-icons/md";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import Tooltip from "@mui/material/Tooltip";
function Edit({ url }) {
  const editUrl = url;
  //console.log("editUrl url is", `${editUrl}`);

  return (
    <>
      <Link passHref href={`${editUrl}`}>
        <Tooltip title="Edit">
          <button className=" hover:underline border-solid border-2 border-gray-350      btn-success">
            <FaEdit className="text-xl h-3 " />
          </button>
        </Tooltip>
      </Link>
    </>
  );
}

export default Edit;
