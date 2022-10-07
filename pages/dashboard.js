import React, { useEffect, useState } from "react";
import Link from "next/link";
//import Card from "../components/dashboard/Card";
import dynamic from "next/dynamic";
import useAuth from "/hook/useAuth";
import { AuthContext } from "../contexts/auth-context";
import { useRouter } from "next/router";
import {
  useAllTicketQuery,
  useLoginQuery,
  usePatientListQuery,
  useAllAppointmentQuery,
} from "../hook/useApi";
//import WithAuth from "../components/common/WithAuth";

const Card = dynamic(() => import("../components/dashboard/Card"));

function Dashboard() {
  // const router = useRouter();
  // const authContext = React.useContext(AuthContext);
  // React.useEffect(() => {
  //   authContext?.isUserAuthenticated()
  //     ? router.push("/")
  //     : router.push("/account/login");
  // }, []);

  //const { data: loginData } = useLoginQuery();
  //console.log("test login data", loginData);
  const { data: allPatient } = usePatientListQuery();
  const { data: ticket } = useAllTicketQuery();
  const { data: appointment } = useAllAppointmentQuery();
  console.log("test appointment data", appointment);
  const {
    deleteData,
    Statustest,
    token,
    apiRootUrl,
    apiEndpoint,
    status,
    postData,
    assignData,
    group_id,
    assign_to_user,
    email,
    patientId,
    department,
  } = useAuth();
  const allTicket = ticket?.data?.filter(
    (item) => item?.ticket_status !== "Cancelled"
  );
  const zdPatient = allPatient?.data?.filter(
    (patient) => patient.source === "ZD"
  );
  // console.log("zdPatient result", zdPatient?.length);
  // console.log("all ticket number", ticket?.data);
  // console.log("all patient data", allPatient?.data);

  const Accounts = ticket?.data?.filter(
    (item) => item?.ticket_department_info?.name === "Accounts"
  );
  // console.log("Accounts", Accounts?.length);

  const ScreenerGroup = ticket?.data?.filter(
    (item) => item?.ticket_department_info?.name === "Screener Group"
  );
  //console.log("screenerGroup", ScreenerGroup?.length);

  const PiBGroupModerate = ticket?.data?.filter(
    (item) => item?.ticket_department_info?.name === "PiB Group(Moderate)"
  );
  // console.log("PiBGroupModerate", PiBGroupModerate?.length);
  const PiBGroupSpecialist = ticket?.data?.filter(
    (item) => item?.ticket_department_info?.name === "PiT Group(Specialist)"
  );
  //console.log("PiBGroupSpecialist", PiBGroupSpecialist?.length);

  const Heraanmelding = ticket?.data?.filter(
    (item) => item?.ticket_department_info?.name === "Heraanmelding"
  );
  // console.log("Heraanmelding", Heraanmelding?.length);

  const AppointmentGroup = ticket?.data?.filter(
    (item) => item?.ticket_department_info?.name === "Appointment Group"
  );
  //console.log("AppointmentGroup", AppointmentGroup?.length);

  const yesApprovalGroup = ticket?.data?.filter(
    (item) =>
      item?.ticket_department_info?.name === "Waiting for 'YES' Approval"
  );
  // console.log("yesApprovalGroup", yesApprovalGroup?.length);

  const noApprovalGroup = ticket?.data?.filter(
    (item) => item?.ticket_department_info?.name === "Waiting for 'NO' Approval"
  );
  const cancelTicket = ticket?.data?.filter(
    (item) => item?.ticket_status === "Cancelled"
  );
  const cancelAppointment = appointment?.data?.filter(
    (item) => item?.appointment_cancel_status === "Cancelled"
  );
  const allAppointment = appointment?.data?.filter(
    (item) => item?.appointment_cancel_status !== "Cancelled"
  );
  //console.log("patientTicket", patientTicket);
  //console.log("patientTicket", ticket?.data);
  const patientTicket = ticket?.data?.filter(
    (item) => item?.patient_info?.id == patientId
  );
  //console.log("patientTicket", patientTicket);
  const patientCancelTicket = ticket?.data?.filter(
    (item) =>
      item?.ticket_status === "Cancelled" && item?.patient_info?.id == patientId
  );
  // console.log("patientCancelTicket", patientCancelTicket);

  const patientAppointment = appointment?.data?.filter(
    (item) => item?.patient_info?.id == patientId
  );
  console.log("patientAppointment", patientAppointment);
  const patientCancelAppointment = appointment?.data?.filter(
    (item) =>
      item?.appointment_cancel_status === "Cancelled" &&
      item?.patient_info?.id == patientId
  );
  console.log("patientCancelAppointment", patientCancelAppointment);
  // missing info group
  const missingInfoGroup = allPatient?.data?.filter(
    (item) =>
      item?.emergency_contact === null ||
      item?.age === null ||
      item?.city === null ||
      item?.occupation === null
  );
  // console.log("missingInfoGroup", missingInfoGroup?.length);
  return (
    <>
      {/* inside of container */}
      <main className="p-6  space-y-6">
        <section className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
          {(department === "Screener Group" ||
            department === "Super Admin") && (
            <>
              <Card
                name="Create New Patient"
                path="/patient/create-new-patient"
                //number=" 3"
                bgColor="bg-gradient-to-r from-violet-300 to-violet-400 "
              />
              <Card
                name="Create New Tickets"
                path="/all-ticket/create-new-ticket"
                // number=" 3"
                bgColor="bg-gradient-to-l from-cyan-500 to-cyan-400"
              />
              <Card
                name="Create New Therapist"
                path="/therapist/create-new-therapist"
                //number="3 "
                bgColor="bg-gradient-to-r from-green-500  to-green-400"
              />
              <Card
                name="Create New Appointment"
                path="/appointment"
                //number="3 "
                bgColor="bg-gradient-to-l from-pink-500   to-pink-400"
              />
            </>
          )}
          {patientId && (
            <>
              <Card
                name="Patient Ticket"
                number={patientTicket?.length}
                path="/patient-ticket"
                bgColor="bg-gradient-to-l from-purple-500   to-purple-400"
              />
              <Card
                name="Cancel Ticket"
                number={patientCancelTicket?.length}
                //number="5"
                path="/patient-cancel-ticket"
                bgColor="bg-gradient-to-l from-purple-500   to-purple-400"
              />
              <Card
                name="Patient Appointment"
                number={patientAppointment?.length}
                path="/patient-appointment"
                bgColor="bg-gradient-to-l from-pink-500   to-pink-400"
              />

              <Card
                name="Cancel Appointment"
                number={patientCancelAppointment?.length}
                path="/patient-cancel-appointment"
                bgColor="bg-gradient-to-r from-green-500  to-green-400"
              />
              <Card
                name="Appointment Reschedule"
                // number={patientAppointment?.length}
                // path="/patient-appointment"
                bgColor="bg-gradient-to-b from-cyan-500 to-cyan-400"
              />
            </>
          )}
          {patientId && (
            <>
              <Card
                name="Therapist Ticket"
                number={patientTicket?.length}
                path="/therapist-ticket"
                bgColor="bg-gradient-to-r from-green-500  to-green-400"
              />
              <Card
                name="Cancel Ticket"
                number={patientCancelTicket?.length}
                //number="5"
                path="/therapist-cancel-ticket"
                bgColor="bg-gradient-to-b from-sky-500 to-sky-400"
              />
              <Card
                name="Therapist Appointment"
                number={patientAppointment?.length}
                path="/therapist-appointment"
                bgColor="bg-gradient-to-l from-pink-500   to-pink-400"
              />

              <Card
                name="Cancel Appointment"
                number={patientCancelAppointment?.length}
                path="/therapist-cancel-appointment"
                bgColor="bg-gradient-to-b from-sky-500 to-sky-400"
              />
              <Card
                name="Create new schedule"
                // number={patientAppointment?.length}
                path="/therapist-schedule"
                bgColor="bg-gradient-to-l from-purple-500   to-purple-400"
              />
            </>
          )}
          {(department === "PiT Group(Specialist)" ||
            department === "PiB Group(Moderate)" ||
            department === "Heraanmelding" ||
            department === "Screener Group" ||
            department === "Super Admin") && (
            <>
              <Card
                name="All Tickets"
                number={allTicket?.length}
                path="/all-ticket"
                bgColor="bg-gradient-to-l from-purple-500   to-purple-400"
              />
              <Card
                name="Cancel Tickets"
                number={cancelTicket?.length}
                //number="5"
                path="/cancel-ticket"
                bgColor="bg-gradient-to-l from-purple-500   to-purple-400"
              />
              <Card
                name="All Patients"
                number={allPatient?.data?.length}
                path="/patient"
                bgColor="bg-gradient-to-l from-pink-500   to-pink-400"
              />
            </>
          )}
          {/* </section> */}
          {/* <section className="grid md:grid-cols-2 xl:grid-cols-4 gap-6"> */}
          {(department === "Screener Group" ||
            department === "Super Admin") && (
            <>
              <Card
                name="Missing-Info List"
                number={missingInfoGroup?.length}
                path="/missing-info-list"
                bgColor="bg-gradient-to-b from-indigo-500  to-indigo-400  "
              />
              <Card
                name="Screener Group"
                path="/screener-group"
                number={ScreenerGroup?.length}
                bgColor="bg-gradient-to-b from-sky-500 to-sky-400"
              />
            </>
          )}
          {(department === "PiT Group(Specialist)" ||
            department === "PiB Group(Moderate)" ||
            department === "Heraanmelding" ||
            department === "Super Admin") && (
            <>
              <Card
                name="Waiting for 'YES' Approval"
                path="/yes-approval"
                number={yesApprovalGroup?.length}
                bgColor="bg-gradient-to-r from-green-500  to-green-400"
              />
              <Card
                name="Waiting for 'NO' Approval"
                path="/no-approval"
                number={noApprovalGroup?.length}
                bgColor="bg-gradient-to-b from-cyan-500 to-cyan-400"
              />
            </>
          )}
          {/* </section> */}
          {/* <section className="grid md:grid-cols-2 xl:grid-cols-4 gap-6"> */}
          {department === "Super Admin" && (
            <>
              <Card
                name="Appointment Group"
                number={AppointmentGroup?.length}
                path="/appointment-group"
                bgColor="bg-gradient-to-l from-violet-500 to-violet-400"
              />
              <Card
                name="Appointment"
                number={allAppointment?.length}
                //number="3"
                path="/appointment"
                //bgColor="bg-gradient-to-l from-violet-500 to-violet-400"
                bgColor="bg-gradient-to-l from-cyan-500 to-cyan-400"
              />
              <Card
                name="Cancel Appointment"
                number={cancelAppointment?.length}
                // number="3"
                path="/cancel-appointment"
                bgColor="bg-gradient-to-b from-sky-500 to-sky-400"
              />
            </>
          )}
          {(department === "PiT Group(Specialist)" ||
            department === "Super Admin") && (
            <Card
              name="PiT Group(Specialist)"
              path="/pit-group"
              number={PiBGroupSpecialist?.length}
              bgColor="bg-gradient-to-l from-cyan-500 to-cyan-400"
            />
          )}
          {(department === "PiB Group(Moderate)" ||
            department === "Super Admin") && (
            <Card
              name="PiB Group(Moderate)"
              path="/pib-group"
              number={PiBGroupModerate?.length}
              bgColor="bg-gradient-to-l from-purple-500   to-purple-400"
            />
          )}
          {(department === "Heraanmelding" || department === "Super Admin") && (
            <Card
              name="Heraanmelding"
              path="/heraanmelding-group"
              number={Heraanmelding?.length}
              bgColor="bg-gradient-to-l from-pink-500   to-pink-400"
            />
          )}
          {/* </section> */}
          {/* <Card
            name="Service Category"
            number="3500"
            bgColor="bg-gradient-to-b from-indigo-500  to-indigo-400"
          />
          <Card
            name="Accounts"
            number={Accounts?.length}
            bgColor="bg-gradient-to-b from-sky-500 to-sky-400"
          />
          <Card
            name="Following up"
            number="100"
            bgColor="bg-gradient-to-r from-green-500  to-green-400"
          /> */}
          <Card
            name="ZD patient"
            path="/zd-patient"
            number={zdPatient?.length}
            bgColor="bg-gradient-to-b from-cyan-500 to-cyan-400"
          />
        </section>
      </main>
    </>
  );
}

export default Dashboard;
//export default WithAuth(Dashboard);
