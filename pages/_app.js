// import "../styles/globals.css";

// function MyApp({ Component, pageProps }) {
//   return <Component {...pageProps} />;
// }

// export default MyApp;

import { SessionProvider } from "next-auth/react";
import "../styles/globals.css";
import Head from "next/head";
import Script from "next/script";

import Meta from "/components/seo/Meta";
// import Header from "../component/layout/Header";
// import Footer from "../component/layout/Footer";

import AuthProvider from "/contexts/AuthProvider";
import { AnimatePresence } from "framer-motion";
import Layout from "/components/layout/Layout";

// react query startup
import { QueryClient, QueryClientProvider } from "react-query";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const queryClient = new QueryClient();
  if (Component.getLayout) {
    return Component.getLayout(<Component {...pageProps} />);
  }
  return (
    <>
      <Head>
        {/* <meta name="viewport" content="width=device-width, initial-scale=1" /> */}
        <Meta />
      </Head>
      {/* font awesome   */}
      <Script
        src="https://kit.fontawesome.com/61a6132c09.js"
        crossOrigin="anonymous"
      ></Script>
      {/* Bootstrap Bundle with Popper   */}
      <Script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p"
        crossOrigin="anonymous"
      />
      {/* testadmin */}
      <Script src="http://maps.google.com/maps/api/js?sensor=true"></Script>
      <Script
        type="text/javascript"
        src="https://demo.dashboardpack.com/architectui-html-free/assets/scripts/main.js"
      />

      <SessionProvider session={session}>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <Layout>
              <AnimatePresence exitBeforeEnter>
                <Component {...pageProps} />
              </AnimatePresence>
            </Layout>
          </AuthProvider>
        </QueryClientProvider>
      </SessionProvider>
    </>
  );
}
export default MyApp;
