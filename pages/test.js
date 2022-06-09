import React, { useState } from "react";
import OperationModal from "../components/common/OperationModal";
import CategoryForm from "/components/category/CategoryForm";

const Test = () => {
  const [modal, setModal] = useState(false);
  return (
    <>
      <div className="flex flex-wrap items-start justify-end -mb-3">
        <button
          className="inline-flex px-5 py-3 text-white bg-teal-500 hover:bg-teal-300 focus:bg-teal-400 rounded-md ml-6 mb-3"
          onClick={() => setModal(true)}
        >
          edit
        </button>
        <OperationModal modal={modal} setModal={setModal}>
          i test you
          {<CategoryForm />}
        </OperationModal>
      </div>
    </>
  );
};

export default Test;
