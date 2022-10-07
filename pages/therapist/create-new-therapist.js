import dynamic from "next/dynamic";
import React, { useState } from "react";
const NewTherapistForm = dynamic(() =>
  import("../../components/therapist-List/NewTherapistForm")
);

// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
//import OperationModal from "../../components/common/OperationModal";
//import TherapistListService from "../../components/therapist-List/TherapistListService";
//import ThForm from "../../components/therapist-List/NewTherapistForm";
function CreatePaitent() {
  const [modal, setModal] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  return (
    <>
      <div className="p-3 my-2">
        {/* <ThForm /> */}
        <NewTherapistForm />
        {/* <a href="#" onClick={() => setModal(true)}>
          edit
        </a>
        <OperationModal modal={modal} setModal={setModal}>
          {<Thform />}
        </OperationModal> */}
      </div>
    </>
  );
}

export default CreatePaitent;
