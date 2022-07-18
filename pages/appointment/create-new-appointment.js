import React, { useState } from "react";
import AppointmentForm from "../../components/appointment/AppointmentForm";

function CreateAppointment() {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <>
      <div className="my-2 p-3 mx-8  ">
        <AppointmentForm className="m-auto" />
      </div>
    </>
  );
}

export default CreateAppointment;
