import React from "react";
import PageTherapistComponentTitle from "../therapist-service/PageTherapistComponentTitle";
import TherapistTable from "../therapist-service/TherapistTable";

const SubCategory = () => {
  return (
    <main className="p-3  space-y-2">
      <PageTherapistComponentTitle
        title="Therapist Service List"
        buttonTitle="Create New"
      />

      <section className="grid card px-2 pt-2 md:grid-cols-1 xl:grid-cols-1 gap-2 gap-y-2">
        <TherapistTable />
      </section>
    </main>
  );
};

export default SubCategory;
