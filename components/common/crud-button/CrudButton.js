import React from "react";
import useAuth from "/hook/useAuth";
import Link from "next/link";
import { MdMode, MdOutlineDelete, MdRemoveRedEye } from "react-icons/md";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import Tooltip from "@mui/material/Tooltip";
function CrudButton({ view, edit, deleteUrl }) {
  console.log("url is", view, edit, deleteUrl);
  const viewUrl = view?.view;
  const editUrl = edit?.edit;
  const deleteAction = deleteUrl?.deleteUrl;
  console.log("url is", deleteUrl);
  const { deleteData } = useAuth();
  return (
    <>
      {" "}
      <div
        style={{
          display: "flex",
          flexWrap: "nowrap",
          gap: "0.5rem",
        }}
      >
        <Link passHref to={`${view.view}`}>
          <Tooltip title="View">
            <button className="text-black  hover:underline border-solid border-2 border-gray-350      btn-info  ">
              <MdRemoveRedEye className="text-xl h-4.5 text-white " />
            </button>
          </Tooltip>
        </Link>
        <Link passHref to={`${edit?.edit}`}>
          <Tooltip title="Edit">
            <button className="text-black  hover:underline border-solid border-2 border-gray-350      btn-info  ">
              <MdRemoveRedEye className="text-xl h-4.5 text-white " />
            </button>
          </Tooltip>
        </Link>
        <Tooltip title="Delete">
          <button
            className="  hover:underline   border-solid border-2 border-gray-350     btn-danger"
            onClick={() => deleteData(deleteAction)}
          >
            <FaTrashAlt className="text-xl h-3" />
          </button>
        </Tooltip>
      </div>
    </>
  );
}

export default CrudButton;
