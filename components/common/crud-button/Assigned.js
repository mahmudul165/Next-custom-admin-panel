import React from "react";
import useAuth from "/hook/useAuth";
import Link from "next/link";
import { MdMode, MdOutlineDelete, MdRemoveRedEye } from "react-icons/md";
//import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { FaEdit, FaUserAlt } from "react-icons/fa";
import Tooltip from "@mui/material/Tooltip";
function Assigned({ url, data }) {
  //console.log("url is", url.url);
  const Url = url;

  const { assignData, name, group_id } = useAuth();
  const userData = data;
  const d = {
    assign_to_user_status: "Hold",
    assign_to_user: name,
    group_id: group_id,
  };
  const uData = { ...data, ...d };
  console.log("uData", uData);
  return (
    <>
      <Tooltip title="Assigned Yourself">
        <button
          className="  hover:underline   border-solid border-3 border-purple-600     btn-transparent"
          onClick={() => assignData(Url, uData)}
        >
          <FaUserAlt className="text-xl h-3" />
        </button>
      </Tooltip>
    </>
  );
}

export default Assigned;
