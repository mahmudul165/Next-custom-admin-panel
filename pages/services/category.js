import React from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import useAuth from "/hook/useAuth";
import Category from "../../components/category/Category";
// const schema = yup
//   .object()
//   .shape({
//     name: yup.string().required(),
//     // details: yup.string().required(),
//     remarks: yup.string().required(),
//     status: yup.string().required(),
//   })
//   .required();

function CategoryComponent() {
  // const { postData } = useAuth();
  // const { register, handleSubmit, error } = useForm({
  //   resolver: yupResolver(schema),
  // });

  return (
    <>
      {/* test case */}
      <Category />
    </>
  );
}

export default CategoryComponent;
