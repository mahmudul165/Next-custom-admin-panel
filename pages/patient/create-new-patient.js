import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import PatientService from "/components/CreatePatient/PatientService";
function CreatePaitent() {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <>
      <PatientService />
    </>
  );
}

export default CreatePaitent;
