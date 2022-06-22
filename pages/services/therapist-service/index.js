import React from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
const PageTherapistComponentTitle = dynamic(() =>
  import("/components/therapist-service/PageTherapistComponentTitle")
);
const TherapistTable = dynamic(() =>
  import("/components/therapist-service/TherapistTable")
);
function TherapistService() {
  return (
    <>
      <main className="p-6  space-y-6">
        <PageTherapistComponentTitle
          title="Therapist service"
          buttonTitle="Create new therapist service"
        />
        <section className="grid card  md:grid-cols-1 xl:grid-cols-1   ">
          <TherapistTable />
        </section>
      </main>
    </>
  );
}

export default TherapistService;
