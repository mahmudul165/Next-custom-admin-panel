import React, { useState } from "react";

import TherapistModal from "../therapist-service/TherapistModal";

const PageSubComponentTitle = ({ title, titleDescription, buttonTitle }) => {
  const [submodal, setSubModal] = useState(false);

  return (
    <div className="grid grid-cols-2 card  py-3 px-3 border-b-1 bg-gray-100">
      <div className="mr-2">
        <p className="text-xl  ">{title}</p>
        <p className="text-gray-600 ml-0.5">{titleDescription}</p>
      </div>
      <div className="flex flex-wrap items-start justify-end -mb-3">
        <button
          className="inline-flex px-2 py-2 text-white   hover:bg-teal-300 focus:bg-teal-400  ml-6 mb-3"
          onClick={() => setSubModal(true)}
          style={{ backgroundColor: "#01a9ac" }}
        >
          {buttonTitle}
        </button>
        <TherapistModal submodal={submodal} setSubModal={setSubModal} />
      </div>
    </div>
  );
};

export default PageSubComponentTitle;
