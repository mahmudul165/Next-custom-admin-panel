//import Card from "../components/dashboard/Card";
import Dashboard from "../components/dashboard/Dashboard";
import Layout from "../components/layout/Layout";
import Meta from "/components/seo/Meta";
import dynamic from "next/dynamic";
import { AuthContext } from "../contexts/auth-context";
import { useRouter } from "next/router";
import React from "react";
const Card = dynamic(() => import("../components/dashboard/Card"));
export default function Index() {
  const router = useRouter();
  const authContext = React.useContext(AuthContext);
  React.useEffect(() => {
    authContext?.isUserAuthenticated()
      ? router.push("/")
      : router.push("/account/login");
  }, []);
  return (
    <>
      <Meta
        title="misi"
        keywords="misi"
        description="misi"
        image="test purpose"
      />
      {/* inside of container */}

      <main className="p-6  space-y-6">
        <section className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
          <Card
            name="Create New Patient"
            number="6"
            bgColor="bg-gradient-to-r from-violet-300 to-violet-400 "
          />
          <Card
            name="Create New Tickets"
            number="55"
            bgColor="bg-gradient-to-l from-cyan-500 to-cyan-400"
          />
          <Card
            name="All Tickets"
            number="6"
            bgColor="bg-gradient-to-l from-purple-500   to-purple-400"
          />
          <Card
            name="All Patients"
            number="65"
            bgColor="bg-gradient-to-l from-pink-500   to-pink-400"
          />
        </section>
        <section className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
          <Card
            name="Missing-Info Lists"
            number="129"
            bgColor="bg-gradient-to-b from-indigo-500  to-indigo-400  "
          />
          <Card
            name="Screener Group"
            number="19"
            bgColor="bg-gradient-to-b from-sky-500 to-sky-400"
          />
          <Card
            name="Waiting for 'YES' Approval"
            number="30"
            bgColor="bg-gradient-to-r from-green-500  to-green-400"
          />
          <Card
            name="Waiting for 'NO' Approval"
            number="60"
            bgColor="bg-gradient-to-b from-cyan-500 to-cyan-400"
          />
        </section>
        <section className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
          <Card
            name="Appointment Group"
            number="72"
            bgColor="bg-gradient-to-l from-violet-500 to-violet-400"
          />
          <Card
            name="PiT Group(Specialist)"
            number="280"
            bgColor="bg-gradient-to-l from-cyan-500 to-cyan-400"
          />
          <Card
            name="PiB Group(Moderate)"
            number="250"
            bgColor="bg-gradient-to-l from-purple-500   to-purple-400"
          />
          <Card
            name="Heraanmelding"
            number="350"
            bgColor="bg-gradient-to-l from-pink-500   to-pink-400"
          />
        </section>

        <section className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
          <Card
            name="Service Category"
            number="3500"
            bgColor="bg-gradient-to-b from-indigo-500  to-indigo-400"
          />
          <Card
            name="Accounts"
            number="4500"
            bgColor="bg-gradient-to-b from-sky-500 to-sky-400"
          />

          {/* <Card
              name="PiB Group"
              number="400"
              bgColor="bg-gradient-to-r from-indigo-500 via-purple-400 to-pink-400"
            />
            <Card
              name="Heraanmelding"
              number="6"
              bgColor="bg-gradient-to-r from-cyan-200 to-cyan-400"
            /> */}
        </section>
      </main>
    </>
  );
}
{
  /* <Layout title='Home Layout'>
<Dashboard />
</Layout> */
}

// https://github.com/flatlogic/sofia-react-template
// https://github.com/themesberg/volt-react-dashboard
// https://github.com/DesignRevision/shards-dashboard-react
