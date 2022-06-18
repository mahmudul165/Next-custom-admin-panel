import React from "react";
import PageSubComponentTitle from "../common/PageSubComponentTitle";
import SubCategoryTable from "./SubCategoryTable";

const SubCategory = () => {
  return (
    <main className="p-6  space-y-6">
      <PageSubComponentTitle
        title="Sub category"
        buttonTitle="Create new sub-category"
      />

      <section className="grid card px-3 pt-3 md:grid-cols-1 xl:grid-cols-1 gap-6 gap-y-4">
        <SubCategoryTable />
      </section>
    </main>
  );
};

export default SubCategory;
