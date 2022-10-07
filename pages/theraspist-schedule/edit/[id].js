import React from "react";
import { ToastContainer } from "react-toastify/lib";
import EditTherapistForm from "../../../components/therapist-List/EditTherapistForm";

function EditTherapist() {
  return (
    <div className="px-16">
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <EditTherapistForm className="m-auto  px-12" />
    </div>
  );
}

export default EditTherapist;
