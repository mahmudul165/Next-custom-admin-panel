// import "../styles/globals.css";

// function MyApp({ Component, pageProps }) {
//   return <Component {...pageProps} />;
// }

// export default MyApp;

import { SessionProvider } from "next-auth/react";
import "../styles/globals.css";
import Head from "next/head";
import Script from "next/script";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "react-query";
import Meta from "/components/seo/Meta";
// import Header from "../component/layout/Header";
// import Footer from "../component/layout/Footer";

import AuthProvider from "/contexts/AuthProvider";
import { AnimatePresence } from "framer-motion";
import Layout from "/components/layout/Layout";
import { useEffect, useState } from "react";
import Router, { useRouter } from "next/router";
import PrivateRoute from "../contexts/PrivateRoute";
function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  //const [token, setToken] = useState("");
  //const [removetoken, setremoveToken] = useState("");
  //const token = localStorage.getItem("token");
  // const token = async () => {
  //   const token = await localStorage.getItem("token");
  //   return await token;
  // };
  // useEffect(() => {
  //   setToken(localStorage.getItem("token"));
  //    setter
  //    localStorage.setItem('myData', data);
  //     getter
  //    localStorage.getItem('myData');
  //     const token = localStorage.getItem("token");
  //     remove
  //   setremoveToken(localStorage.removeItem("token"));
  //   localStorage.removeItem('myData');
  //    remove all
  //    localStorage.clear();
  // }, []);
  //console.log("my token", token());
  const queryClient = new QueryClient();
  if (Component.getLayout) {
    return Component.getLayout(<Component {...pageProps} />);
  }

  const LoginRedirect = () => {
    const router = useRouter();
    useEffect(() => {
      if (localStorage.getItem("token") == null) {
        return router.push("/account/login");
      } else {
        return router.push("/");
      }
    }, []);
  };

  return (
    <>
      <Head>
        {/* <meta name="viewport" content="width=device-width, initial-scale=1" /> */}
        <Meta />
      </Head>
      {/* jquery */}
      {/* <Script type="text/javascript" src="/static/script.js"></Script>
      <Script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></Script> */}
      {/* bootstrap 4 */}
      {/* <script
        src="https://code.jquery.com/jquery-3.2.1.slim.min.js"
        integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN"
        crossorigin="anonymous"
      ></script>
      <script
        src="https://cdn.jsdelivr.net/npm/popper.js@1.12.9/dist/umd/popper.min.js"
        integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q"
        crossorigin="anonymous"
      ></script>
      <script
        src="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/js/bootstrap.min.js"
        integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl"
        crossorigin="anonymous"
      ></script> */}
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
      {/* <Script src="http://maps.google.com/maps/api/js?sensor=true"></Script>
      <Script
        type="text/javascript"
        src="https://demo.dashboardpack.com/architectui-html-free/assets/scripts/main.js"
      /> */}

      <SessionProvider session={session}>
        <QueryClientProvider client={queryClient}>
          {/* <PrivateRoute> */}
          <AuthProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </AuthProvider>
          {/* </PrivateRoute> */}
        </QueryClientProvider>
      </SessionProvider>
    </>
  );
}
export default MyApp;

{
  /* https://stackoverflow.com/questions/64662486/how-do-you-deal-with-public-and-private-routes-in-a-nextjs-app
https://gist.github.com/alieslamifard/dd81ce85e20dc47c57ed6825ff153288
https://medium.com/@eslamifard.ali/how-to-simply-create-a-private-route-in-next-js-38cab204a99c */
}
