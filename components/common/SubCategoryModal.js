/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import PureModal from "react-pure-modal";
import "react-pure-modal/dist/react-pure-modal.min.css";
import SubCategoryForm from "../sub-category/SubCategoryForm";
const SubCategoryModal = ({ submodal, setSubModal }) => {
  return (
    <>
      <PureModal
        //header={<div className="bg-purple-600 p-2 font-bold text-lg text-center text-white">Category</div>}
        isOpen={submodal}
        width="800px"
        onClose={() => {
          setSubModal(false);
          return true;
        }}
      >
        <SubCategoryForm />
      </PureModal>
      ;
    </>
  );
};

export default SubCategoryModal;
