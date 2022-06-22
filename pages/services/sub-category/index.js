import React from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
const PageSubComponentTitle = dynamic(() =>
  import("/components/sub-category/PageSubComponentTitle")
);
const SubCategoryTable = dynamic(() =>
  import("/components/sub-category/SubCategoryTable")
);
function SubCategoryService() {
  return (
    <>
      <main className="p-6  space-y-6">
        <PageSubComponentTitle
          title="Sub category"
          buttonTitle="Create new sub-category"
        />
        <section className="grid card  md:grid-cols-1 xl:grid-cols-1   ">
          <SubCategoryTable />
        </section>
      </main>
    </>
  );
}

export default SubCategoryService;
