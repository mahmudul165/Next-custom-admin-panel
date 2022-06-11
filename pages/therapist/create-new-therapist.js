import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TherapistService from "/components/therapist-service/TherapistService";
function CreatePaitent() {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <>
      <TherapistService />
    </>
  );
}

export default CreatePaitent;
