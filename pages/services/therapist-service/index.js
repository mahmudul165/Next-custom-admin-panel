import React from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import useAuth from "/hook/useAuth";
import TherapistService from "/components/therapist-service/TherapistService";
const schema = yup
  .object()
  .shape({
    //     Category
    // Sub Category
    // Therapist Name
    // Therapist Details
    // Reamrks
    // Status
    // category: yup.string().required(),
    // subCategory: yup.string().required(),
    // therapistName: yup.string().required(),
    // details: yup.string().required(),
    // remark: yup.string().required(),
    // status: yup.string().required(),

    service_category_id: yup.string().required(),
    service_subcategory_id: yup.string().required(),
    name: yup.string().required(),
    // details: yup.string().required(),
    remarks: yup.string().required(),
    status: yup.string().required(),
  })
  .required();
function TherapistServiceCompo() {
  const { postData } = useAuth();
  const { register, handleSubmit, error } = useForm({
    resolver: yupResolver(schema),
  });
  return (
    <>
      <TherapistService />
    </>
  );
}

export default TherapistServiceCompo;
