import React, { useState } from "react";
import TherapistModal from "../therapist-service/TherapistModal";
const TherapistTitle = () => {
  const [submodal, setSubModal] = useState(false);
  return (
    <>
      <div className="mr-6">
        <h1 className="text-4xl font-semibold mb-2">Therapist Service</h1>
      </div>

      <div className="flex flex-wrap items-start justify-end -mb-3">
        <button
          className="inline-flex px-5 py-3 text-white bg-teal-500 hover:bg-teal-200 focus:bg-teal-300 rounded-md ml-6 mb-3"
          onClick={() => setSubModal(true)}
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
          Create new Sub Category
        </button>
        {/* <Modal modal={modal} setModal={setModal} /> */}
        <TherapistModal submodal={submodal} setSubModal={setSubModal} />
      </div>
    </>
  );
};

export default TherapistTitle;
