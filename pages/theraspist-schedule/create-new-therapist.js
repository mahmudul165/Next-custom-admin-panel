import React, { useState } from "react";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
//import OperationModal from "../../components/common/OperationModal";
//import TherapistListService from "../../components/therapist-List/TherapistListService";
import ThForm from "../../components/therapist-List/Thform";
function CreatePaitent() {
  const [modal, setModal] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  return (
    <>
      <div className="p-3 my-2">
        <ThForm />
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
