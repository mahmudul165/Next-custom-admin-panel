import React from "react";
import dynamic from "next/dynamic";
const PageComponentTitle = dynamic(() =>
  import("/components/category/PageComponentTitle.js")
);
const CategoryTable = dynamic(() =>
  import("/components/category/CategoryTable.js")
);

function CategoryService() {
  return (
    <>
      <main className="p-6  space-y-6">
        <PageComponentTitle
          title="Service category"
          buttonTitle="Create new category"
        />
        <section className="grid card  md:grid-cols-1 xl:grid-cols-1   ">
          <CategoryTable />
        </section>
      </main>
    </>
  );
}

export default CategoryService;
