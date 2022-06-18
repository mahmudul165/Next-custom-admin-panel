import React from "react";
import PageTherapistComponentTitle from "../therapist-service/PageTherapistComponentTitle";
import TherapistTable from "../therapist-service/TherapistTable";

const SubCategory = () => {
  return (
    <main className="p-6  space-y-6">
      <PageTherapistComponentTitle
        title="Therapist service"
        buttonTitle="Create new therapist service"
      />

      <section className="grid card px-3 pt-3 md:grid-cols-1 xl:grid-cols-1 gap-6 gap-y-4">
        <TherapistTable />
      </section>
    </main>
  );
};

export default SubCategory;
