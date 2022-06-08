import React from "react";
import PagePatientComponentTitle from "../CreatePatient/PagePatientComponentTitle";
import PatientTable from "./PatientTable";

const SubCategory = () => {
  return (
    <main className="p-6 sm:p-10 space-y-6">
      <div className="flex flex-col space-y-6 md:space-y-0 md:flex-row justify-between">
        <PagePatientComponentTitle
          title="All Patient List"
          buttonTitle="Create new  Patient"
        />
      </div>

      <section className="grid md:grid-cols-1 xl:grid-cols-1 gap-6">
        <div className="flex-grow items-center p-8 bg-white shadow rounded-lg">
          <PatientTable />
        </div>
      </section>
    </main>
  );
};

export default SubCategory;
