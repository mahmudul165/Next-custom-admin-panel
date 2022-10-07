import { Router, useRouter } from "next/router";
import { useEffect, useState } from "react";
const PrivateRoute = ({ Component }) => {
  const router = useRouter();
  const [getData, setGetdata] = useState();
  useEffect(() => {
    fetch("https://misiapi.lamptechs.com/api/v1/admin/login")
      .then((response) => response.json())
      .then((data) => setGetdata(data));
  }, [getData]);
  console.log("Auth get data", getData?.status);
  const Auth = () => {
    // If user is not logged in, return login component
    if (getData?.status !== "true") {
      // Router.push("/account/login");
      return router.push("/account/login");
    }
    // If user is logged in, return original component
    //
    else {
      return router.push("/dashboard");
      //   return <Component {...pageProps} />;
      // return <> {children} </>;
    }
  };
  getData && Auth();

  // Copy getInitial props so it will run as well
  //   if (Component.getInitialProps) {
  //     Auth.getInitialProps = Component.getInitialProps;
  //   }

  return Auth;
};

export default PrivateRoute;
