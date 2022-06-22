import React, { useEffect, useState } from "react";
import PureModal from "react-pure-modal";
import "react-pure-modal/dist/react-pure-modal.min.css";
import CategoryForm from "../category/CategoryForm";

const Modal = ({ modal, setModal }) => {
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
    if (!modal) {
      setSelectedImage();
    }
  }, [modal]);

  return (
    <>
      <PureModal
        isOpen={modal}
        width="800px"
        onClose={() => {
          setModal(false);
          return true;
        }}
      >
        <CategoryForm />
      </PureModal>
    </>
  );
};

export default Modal;
