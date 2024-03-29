// import React, { useState } from "react";
// //import PatientModal from "./PatientModal";
// import dynamic from "next/dynamic";
// const PatientModal = dynamic(() => import("./PatientModal"));
// const PagePatientComponentTitle = ({
//   title,
//   titleDescription,
//   buttonTitle,
// }) => {
//   const [submodal, setSubModal] = useState(false);

//   return (
//     <div className="grid grid-cols-3 card  rounded-lg py-3 px-2 border-b-2 border-slate-200">
//       <div className="col-span-2">
//         <h1 className="text-4xl font-semibold mb-2">{title}</h1>
//         <h2
//           className="text-gray-600 ml-0.5"
//           style={{ backgroundColor: "#01a9ac" }}
//         ></h2>
//       </div>
//       <div className="flex flex-wrap   justify-end items-end  -mb-3">
//         <button
//           className="inline-flex px-2 py-2 text-white  hover:bg-teal-300 focus:bg-teal-400 rounded-md ml-6 mb-3"
//           onClick={() => setSubModal(true)}
//           style={{ backgroundColor: "#01a9ac" }}
//         >
//           <svg
//             aria-hidden="true"
//             fill="none"
//             viewBox="0 0 24 24"
//             stroke="currentColor"
//             className="flex-shrink-0 h-6 w-6 text-white -ml-1 mr-2"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={2}
//               d="M12 6v6m0 0v6m0-6h6m-6 0H6"
//             />
//           </svg>
//           {buttonTitle}
//         </button>
//         <PatientModal submodal={submodal} setSubModal={setSubModal} />
//       </div>
//     </div>
//   );
// };

// export default PagePatientComponentTitle;

import React, { useState } from "react";
//import OperationModal from "../common/OperationModal";
import dynamic from "next/dynamic";
import PatientForm from "./PatientForm";
import OperationModal from "../common/OperationModal";
import Link from "next/link";
//const OperationModal = dynamic(() => import("../common/OperationModal"));
const PatientComponent = ({ title, titleDescription, buttonTitle }) => {
  const [modal, setModal] = useState(false);

  return (
    <>
      <div className="grid grid-cols-3 card  rounded-lg py-3 px-2 border-b-2 border-slate-200">
        <div className="col-span-2">
          <h1 className="text-4xl font-semibold mb-2">{title}</h1>
          <h2 className="text-gray-600 ml-0.5">{titleDescription}</h2>
        </div>
        <div className="flex flex-wrap items-start justify-end -mb-3">
          <Link passHref href={`/patient/create-new-patient`}>
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
          {/* <OperationModal modal={modal} setModal={setModal}>
            {<PatientForm className="m-auto" />}
          </OperationModal> */}
        </div>
      </div>
    </>
  );
};

export default PatientComponent;
