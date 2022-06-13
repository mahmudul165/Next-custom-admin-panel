import Card from "../components/dashboard/Card";
import Dashboard from "../components/dashboard/Dashboard";
import Layout from "../components/layout/Layout";
import Meta from "/components/seo/Meta";
export default function Index() {
  return (
    <>
      <Meta
        title="misi"
        keywords="misi"
        description="misi"
        image="test purpose"
      />
      {/* inside of container */}
      <main className="p-6 sm:p-10 space-y-6">
        <section className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
          <Card
            name="Create New Patient"
            number="6"
            bgColor="bg-gradient-to-r from-blue-500 via-blue-450 to-gray-600"
          />
          <Card
            name="Create New Tickets"
            number="6"
            bgColor="bg-gradient-to-r from-cyan-500 to-blue-500"
          />
          <Card
            name="All Tickets"
            number="6"
            bgColor="bg-gradient-to-b from-green-300 via-teal-500 to-teal-500"
          />
          <Card
            name="All Patients"
            number="6"
            bgColor="bg-gradient-to-r from-pink-400 via-pink-300 to-pink-100"
          />
        </section>
        <section className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
          <Card
            name="Missing-Info Lists"
            number="6"
            bgColor="bg-gradient-to-r from-indigo-500 via-purple-400 to-pink-400"
          />
          <Card
            name="Screener Group"
            number="6"
            bgColor="bg-gradient-to-b from-sky-400 to-sky-200"
          />
          <Card
            name="Waiting for 'YES' Approval"
            number="6"
            bgColor="bg-gradient-to-r from-indigo-300 to-purple-400"
          />
          <Card
            name="Waiting for 'NO' Approval"
            number="6"
            bgColor="bg-gradient-to-r from-cyan-200 to-cyan-400"
          />
        </section>
        <section className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
          <Card
            name="Appointment Group"
            number="6"
            bgColor="bg-gradient-to-r from-blue-500 via-blue-450 to-gray-600"
          />
          <Card
            name="PiT Group(Specialist)"
            number="6"
            bgColor="bg-gradient-to-r from-cyan-500 to-blue-500"
          />
          <Card
            name="PiB Group(Moderate)"
            number="6"
            bgColor="bg-gradient-to-b from-green-300 via-teal-500 to-teal-500"
          />
          <Card
            name="Heraanmelding"
            number="6"
            bgColor="bg-gradient-to-r from-pink-400 via-pink-300 to-pink-100"
          />
        </section>
        <section className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
          <Card
            name="Service Category"
            number="6"
            bgColor="bg-gradient-to-r from-indigo-500 via-purple-400 to-pink-400"
          />
          <Card
            name="Accounts"
            number="6"
            bgColor="bg-gradient-to-b from-sky-400 to-sky-200"
          />
          {/* <Card
              name="PiB Group"
              number="6"
              bgColor="bg-gradient-to-r from-indigo-300 to-purple-400"
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
