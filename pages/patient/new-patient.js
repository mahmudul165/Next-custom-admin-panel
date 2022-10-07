import React, { useState } from "react";
import dynamic from "next/dynamic";
const PaitentForm = dynamic(() =>
  import("../../components/CreatePatient/PatientNewForm.js")
);

function CreatePaitent() {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <>
      <div className="my-2 p-3">
        <PaitentForm />
      </div>
    </>
  );
}

export default CreatePaitent;
