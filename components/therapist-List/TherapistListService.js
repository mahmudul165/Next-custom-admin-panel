//import PageTherapistComponentTitle from "../therapist-List/PageTherapistComponentTitle";
//import TherapistTable from "../therapist-List/TherapistTable";
import React from "react";
import dynamic from "next/dynamic";
const PageTherapistComponentTitle = dynamic(() =>
  import("../therapist-List/PageTherapistComponentTitle")
);
const TherapistTable = dynamic(() =>
  import("../therapist-List/TherapistTable")
);

const SubCategory = () => {
  return (
    <main className="p-6  space-y-6">
      <PageTherapistComponentTitle
        title="Therapist list"
        buttonTitle="Create new therapist"
      />

      <section className="grid card px-3 pt-3 md:grid-cols-1 xl:grid-cols-1 gap-6 gap-y-4">
        <TherapistTable />
      </section>
    </main>
  );
};

export default SubCategory;
