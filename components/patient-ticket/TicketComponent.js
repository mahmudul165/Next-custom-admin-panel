import React, { useState } from "react";
//import OperationModal from "../common/OperationModal";
import dynamic from "next/dynamic";
import TicketForm from "./TicketForm";
import OperationModal from "../common/OperationModal";
import Link from "next/link";
//const OperationModal = dynamic(() => import("../common/OperationModal"));
const TicketComponentTitle = ({ title, titleDescription, buttonTitle }) => {
  const [modal, setModal] = useState(false);

  return (
    <>
      <div
        className="grid grid-cols-3 card  rounded-lg py-3 px-2 border-b-2    border-slate-200 bg-light"
        // style={{ backgroundColor: "#ddd" }}
      >
        <div className="col-span-2">
          <h1 className="text-4xl font-semibold mb-2">{title}</h1>
          <h2 className="text-gray-600 ml-0.5">{titleDescription}</h2>
        </div>
        {/* <div className="flex flex-wrap items-start justify-end -mb-3">
          <Link passHref href={`/all-ticket/create-new-ticket`}>
            <button
              className="inline-flex px-2 py-2 text-white   hover:bg-teal-300 focus:bg-teal-400 rounded-md ml-6 mb-3"
              onClick={() => setModal(true)}
              style={{ backgroundColor: "#01a9ac" }}
            >
              <svg
                aria-hidden="true"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="flex-shrink-0 h-6 w-6 text-white -ml-1 mr-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              {buttonTitle}
            </button>
          </Link>
          
        </div> */}
      </div>
    </>
  );
};

export default TicketComponentTitle;
