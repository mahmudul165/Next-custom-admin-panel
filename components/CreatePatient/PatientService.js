import React from "react";
//import PagePatientComponentTitle from "../CreatePatient/PagePatientComponentTitle";
//import PatientTable from "./PatientTable";
import dynamic from "next/dynamic";
const PagePatientComponentTitle = dynamic(() =>
  import("../CreatePatient/PagePatientComponentTitle")
);
const PatientTable = dynamic(() => import("./PatientTable"));
const SubCategory = () => {
  return (
    <main className="p-6  space-y-6  ">
      <>
        <PagePatientComponentTitle
          title="All patient list"
          buttonTitle="Create new  Patient"
        />
      </>
      <section className="grid card px-3 pt-3 md:grid-cols-1 xl:grid-cols-1 gap-6 gap-y-4">
        <PatientTable />
      </section>
    </main>
  );
};

export default SubCategory;
