import React from "react";
//import PageTicketComponentTitle from "../all-ticket/PageTicketComponentTitle";
//import TicketTable from "./TicketTable";
import dynamic from "next/dynamic";
const PageTicketComponentTitle = dynamic(() =>
  import("../all-ticket/PageTicketComponentTitle")
);
const TicketTable = dynamic(() => import("./TicketTable"));
const SubCategory = () => {
  return (
    <main className="p-6  space-y-6">
      <PageTicketComponentTitle
        title="All ticket"
        buttonTitle="Create new ticket"
      />

      <section className="grid card px-3 pt-3 md:grid-cols-1 xl:grid-cols-1 gap-6 gap-y-4">
        <TicketTable />
      </section>
    </main>
  );
};

export default SubCategory;
