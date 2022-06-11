import React, { useState } from "react";
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
