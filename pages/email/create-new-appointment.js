import React, { useState } from "react";
import EmailFrom from "../../components/email/EmailForm";

function CreateAppointment() {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <>
      <div className="my-2 p-3 mx-8  ">
        <EmailFrom className="m-auto" />
      </div>
    </>
  );
}

export default CreateAppointment;
