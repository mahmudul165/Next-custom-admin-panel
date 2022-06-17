// import React, { useState } from "react";
// import PatientService from "/components/CreatePatient/PatientService";
// function CreatePaitent() {
//   const [startDate, setStartDate] = useState(new Date());
//   return (
//     <>
//       <PatientService />
//     </>
//   );
// }

// export default CreatePaitent;
import React, { useState } from "react";
import PaitentForm from "../../components/CreatePatient/PatientForm";

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
