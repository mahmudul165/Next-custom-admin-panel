/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import PureModal from "react-pure-modal";
import "react-pure-modal/dist/react-pure-modal.min.css";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import useAuth from "/hook/useAuth";
import CategoryForm from "../category/CategoryForm";
import SubCategoryForm from "../sub-category/SubCategoryForm";

const SubCategoryModal = ({ Submodal, setSubModal }) => {
  const { postData } = useAuth();

  const [selectedImage, setSelectedImage] = useState();

  const imageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files);
    }
  };

  const removeSelectedImage = () => {
    setSelectedImage();
  };

  useEffect(() => {
    if (!Submodal) {
      setSelectedImage();
    }
  }, [Submodal]);
  //console.log('modal modal', modal)
  return (
    <>
      <PureModal
        //header={<div className="bg-purple-600 p-2 font-bold text-lg text-center text-white">Category</div>}
        isOpen={Submodal}
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
