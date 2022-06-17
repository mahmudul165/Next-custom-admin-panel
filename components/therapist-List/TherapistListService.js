import React from "react";
import PageTherapistComponentTitle from "../therapist-List/PageTherapistComponentTitle";
import TherapistTable from "../therapist-List/TherapistTable";

const SubCategory = () => {
  return (
    <main className="p-6  space-y-6">
      <div className="flex flex-col space-y-6 md:space-y-0 md:flex-row justify-between">
        <PageTherapistComponentTitle
          title="Therapist list"
          buttonTitle="Create new therapist"
        />
      </div>

      <section className="grid md:grid-cols-1 xl:grid-cols-1 gap-6">
        <div className="flex-grow items-center p-8 bg-white shadow rounded-lg">
          <TherapistTable />
        </div>
      </section>
    </main>
  );
};

export default SubCategory;
