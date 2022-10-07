/* eslint-disable react/display-name */
// HOC/withAuth.jsx
import { useRouter } from "next/router";
import { useEffect } from "react";
const withAuth = (WrappedComponent) => {
  return (props) => {
    // checks whether we are on client / browser or server.
    if (typeof window !== "undefined") {
      const router = useRouter();
      const accessToken = async () => await localStorage.getItem("token");

      // If there is no access token we redirect to "/" page.
      useEffect(async () => {
        if (accessToken == null) {
          return await router.push("/account/login");
        } else {
          return await router.push("/dashboard");
        }
      }, []);

      // !accessToken?Router.replace("/"):null
      //   if (!accessToken) {
      //     Router.replace("/");
      //     return null;
      //   }

      // If this is an accessToken we just render the component that was passed with all its props

      return <WrappedComponent {...props} />;
    }

    // If we are on server, return null
    return null;
  };
};

export default withAuth;
