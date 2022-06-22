import React from "react";
//import PageComponentTitle from "../common/PageComponentTitle";
//import CategoryTable from "./CategoryTable";
import dynamic from "next/dynamic";
const PageComponentTitle = dynamic(() =>
  import("../common/PageComponentTitle")
);
const CategoryTable = dynamic(() => import("./CategoryTable"));
const Category = () => {
  return (
    <main className="p-6  space-y-6">
      <PageComponentTitle
        title="Service category"
        buttonTitle="Create new category"
      />

      <section className="grid card px-3 pt-3 md:grid-cols-1 xl:grid-cols-1 gap-6 gap-y-4">
        <CategoryTable />
      </section>
    </main>
  );
};

export default Category;
