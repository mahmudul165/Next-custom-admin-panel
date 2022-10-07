import React from "react";
import dynamic from "next/dynamic";
const NewTicketForm = dynamic(() =>
  import("../../components/all-ticket/NewTicketForm.js")
);
function CreateNewTicket() {
  return (
    <div className="p-8">
      <NewTicketForm />
    </div>
  );
}

export default CreateNewTicket;
