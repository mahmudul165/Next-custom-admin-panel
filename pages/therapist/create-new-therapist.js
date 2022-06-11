import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import OperationModal from "../../components/common/OperationModal";
import Thform from "../../components/therapist-service/Thform";
import TherapistService from "../../components/therapist-service/TherapistService";
function CreatePaitent() {
  const [modal, setModal] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  return (
    <>
      <>
        <TherapistService />
        {/* <a href="#" onClick={() => setModal(true)}>
          edit
        </a>
        <OperationModal modal={modal} setModal={setModal}>
          {<Thform />}
        </OperationModal> */}
      </>
    </>
  );
}

export default CreatePaitent;
