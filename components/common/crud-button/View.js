import React from "react";
import useAuth from "/hook/useAuth";
import Link from "next/link";
import { MdMode, MdOutlineDelete, MdRemoveRedEye } from "react-icons/md";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import Tooltip from "@mui/material/Tooltip";
function View({ url }) {
  const viewUrl = url;
  //console.log("url is", viewUrl);

  return (
    <>
      <Link passHref href={`${viewUrl}`}>
        <Tooltip title="View">
          <button
            className="text-black  hover:underline border-solid border-2 border-gray-350      btn-info"
            // onClick={() => {
            //   console.log("View Profile", row.original.id);
            // }}
          >
            <MdRemoveRedEye className="text-xl h-4.5 text-white " />
          </button>
        </Tooltip>
      </Link>
    </>
  );
}

export default View;
