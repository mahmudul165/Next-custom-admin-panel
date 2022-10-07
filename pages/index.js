import Link from "next/link";
import React, { useEffect, useState } from "react";
import "react-pure-modal/dist/react-pure-modal.min.css";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import useAuth from "/hook/useGlobal";
import axios from "axios";
import Router, { useRouter } from "next/router";
import { AuthContext } from "../contexts/auth-context";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { TextField } from "@mui/material";
const schema = yup
  .object()
  .shape({
    //name: yup.string().required(),
  })
  .required();

function Login() {
  const { postData, successToast, token, status } = useAuth();
  const router = useRouter();
  const Swal = require("sweetalert2");
  // const LoginRedirect = () => {
  //   const router = useRouter();
  //   useEffect(() => {
  //     if (localStorage.getItem("token") == null) {
  //       router.push("/account/login");
  //     } else {
  //       router.push("/dashboard");
  //     }
  //   }, []);
  // };

  //   function logout() {
  //     // remove user from local storage, publish null to user subscribers and redirect to login page
  //     localStorage.removeItem('user');
  //     userSubject.next(null);
  //     Router.push('/login');
  // }

  // function logout() {
  //     localStorage.removeItem('user');
  //     userSubject.next(null);
  //     Router.push('/login');
  // }
  const testData = async (url, data) => {
    await axios
      .post(url, data)
      .then((response) => {
        const token = response.data?.access_token;
        console.log("response post data", response.data?.status);
        console.log("response token", token);
        localStorage.setItem("token", token);
        response?.status === 200
          ? Swal.fire({
              title: "Success!",
              text: `${response.data?.message}`,
              icon: "success",
              timer: 2500,
            }).then((result) => {
              localStorage.getItem("token") !== null &&
                (response?.status === 200
                  ? router.push("/dashboard")
                  : router.push("/account/login"));
            })
          : Swal.fire({
              title: `Error!!!`,
              text: `${response?.message}. ${response.response?.data?.message}`,
              icon: "error",
              timer: 3000,
            });
      })
      .catch((error) => {
        if (error.response) {
          Swal.fire({
            title: "Error!",
            text: `you are failed to delete data.`,
            icon: "error",
            timer: 3000,
          });
        }
      });
  };
  const theme = createTheme({
    components: {
      MuiFormLabel: {
        styleOverrides: {
          asterisk: { color: "red" },
        },
      },
    },
  });

  //   axios.post('https://misiapi.lamptechs.com/api/v1/admin/login',data,{ headers: { Authorization:localStorage.getItem('jwtToken') } })
  //   .then(response=> console.log(response))
  //   .catch(error => console.log(error));
  // };

  //   await axios.post(APIbase + '/login', {
  //     username: username, password: password
  //  }).then(res=>{
  //      const token = res.data.token;
  //      localStorage.setItem('token', token);
  //  }).catch(err => {
  //      console.log(err);
  //   });

  // const token = localStorage.getItem('token');
  //       const headers = { Authorization: `Bearer ${token}`};
  //       const detailResult= await axios.get(API.base + API.details, {
  //       headers:headers});

  //   function logout() {
  //     // remove user from local storage, publish null to user subscribers and redirect to login page
  //     localStorage.removeItem('user');
  //     userSubject.next(null);
  //     Router.push('/login');
  // }

  //   function login(username, password) {
  //     return fetchWrapper.post(`${baseUrl}/authenticate`, { username, password })
  //         .then(user => {
  //             localStorage.setItem('user', JSON.stringify(user));
  //             return user;
  //         });
  // }

  // function logout() {
  //     localStorage.removeItem('user');
  //     userSubject.next(null);
  //     Router.push('/login');
  // }

  const authContext = React.useContext(AuthContext);
  console.log("authcontext is", authContext);

  React.useEffect(() => {
    authContext?.isUserAuthenticated()
      ? router.push("/dashboard")
      : router.push("/account/login");
  }, []);

  //const accessToken =async()=> await  localStorage.getItem("token");

  // If there is no access token we redirect to "/" page.
  // useEffect(async() => {
  //       if (token === '') {
  //         return await router.push("/account/login");
  //       } else {
  //         return await router.push("/dashboard");
  //       }
  //     }, []);

  const { register, handleSubmit, error } = useForm({
    resolver: yupResolver(schema),
  });
  return (
    <>
      {/* <div className="  card p-3  ">
        <h2 className="text-3xl  font-extrabold p-3 text-gray-500">
          MISI Admin Login
        </h2>
      </div> */}
      <div className=" flex items-center justify-center    sm:px-6 lg:px-8 m-3  lg:mt-12">
        {/* <div className="divide-y divide-slate-200 bg-light"></div> */}
        <div className="lg:w-3/5     w-full space-y-8 border border-gray-600 px-2 card shadow-inner py-4 lg:mt-12 rounded-lg">
          <div className="divide-y divide-slate-200  ">
            <h2 className="mt-6 text-center text-2xl font-extrabold text-gray-600 ">
              MISI Admin Login
            </h2>
          </div>
          <div>
            {/* h-12 w-auto */}

            <img
              className="mx-auto  h-32"
              src="/admin/MiSi High Res.png"
              alt="Workflow"
            />
            {/* <h2 className="mt-6 text-center text-2xl font-extrabold text-gray-900">
              Login to your account
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">Or</p> */}
          </div>
          <ThemeProvider theme={theme}>
            <form
              className="lg:px-8 mt-8 space-y-4 pb-2"
              //method="POST"
              onSubmit={handleSubmit(
                (data) =>
                  testData(
                    "https://misiapi.lamptechs.com/api/v1/admin/login",
                    //"http://192.168.97.2:8000/api/v1/admin/login",

                    data
                  )
                // postData(

                // )
                //console.log("login ", data)
              )}
              type="submit"
              // action="https://misiapi.lamptechs.com/api/v1/admin/login"
              // action="http://localhost:3000/account/login"
            >
              {/* <div className="relative"> */}
              {/* <input
                type="text"
                id="email"
                className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
                placeholder="  "
                required
                {...register("email")}
              />
              <label
                htmlFor="email"
                className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-gray-500 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-25 peer-focus:-translate-y-4 left-1"
              >
                Your email
              </label> */}
              <div className="col-start-1 relative my-3  ">
                <input
                  type="text"
                  className="block px-2.5 pb-6 pt-2.5 py-2.5 w-full rows-4 text-sm text-gray-900 bg-transparent rounded-lg border-1 focus:border-2  border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-indigo-500/100  peer"
                  placeholder="  "
                  id="email"
                  required
                  {...register("email")}
                />
                <label
                  htmlFor="email"
                  className="absolute hover:text-gray-900 text-base text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:border-cyan-50 peer-focus:text-indigo-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-25 peer-focus:-translate-y-4 left-1"
                >
                  Email Address
                </label>
              </div>
              <div className="col-start-1 relative my-3  ">
                <input
                  type="password"
                  className="block px-2.5 pb-6 pt-2.5 py-2.5 w-full rows-4 text-sm text-gray-900 bg-transparent rounded-lg border-1 focus:border-2  border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-indigo-500/100  peer"
                  placeholder="  "
                  id="password"
                  required
                  {...register("password")}
                />
                <label
                  htmlFor="password"
                  className="absolute hover:text-gray-900 text-base text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:border-cyan-50 peer-focus:text-indigo-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-25 peer-focus:-translate-y-4 left-1"
                >
                  Password
                </label>
              </div>

              {/* <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                {...register("email")}
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              /> */}
              {/* </div> */}
              {/* <div className="relative"> */}
              {/* <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                {...register("password")}
              /> */}
              {/* <input
                type="password"
                id="password"
                className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
                placeholder="••••••••"
                required
                {...register("password")}
              />
              <label
                htmlFor="password"
                className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-gray-500 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-25 peer-focus:-translate-y-4 left-1"
              >
                Your password
              </label> */}
              {/* </div> */}
              {/* <div className="grid gap-4 grid-cols-2 items-center">
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
                <div className="flex items-start" >
                  <a
                    href="#"
                    className="ml-auto text-sm text-blue-700 hover:underline dark:text-blue-500"
                  >
                    Recovery Password?
                  </a>
                </div>
              </div> */}
              {/* <Link href={`/`}> */}
              <button
                type="submit"
                className="text-xl .font-extrabold w-full text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Login
              </button>
              {/* </Link> */}
              {/* <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
              New to Misi?
              <Link href="/account/signup">
                <a className="text-blue-700 hover:underline dark:text-blue-500 ms-1">
                  Sign up now.
                </a>
              </Link>
            </div> */}
            </form>
          </ThemeProvider>
        </div>
      </div>
    </>
  );
}
export default Login;
Login.getLayout = function PageLayout(page) {
  return <>{page}</>;
};

// https://dev.to/shubhamverma/implement-protected-routes-in-nextjs-37ml
