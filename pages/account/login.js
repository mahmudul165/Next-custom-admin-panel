import Link from "next/link";
import React, { useEffect, useState } from "react";
import "react-pure-modal/dist/react-pure-modal.min.css";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import useAuth from "../../hook/useGlobal";
import axios from "axios";

const schema = yup
  .object()
  .shape({
    //name: yup.string().required(),
  })
  .required();

function Login() {
  const { postData } = useAuth();
  const testData = async (url, data) => {
    await axios.post(url, data).then((response) => {
      const token = response.data?.access_token;
      localStorage.setItem("token", token);
      console.log("response post data", response);
      alert("successfully added ");
    });
  };

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

  const { register, handleSubmit, error } = useForm({
    resolver: yupResolver(schema),
  });
  return (
    <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          {/* h-12 w-auto */}
          <img
            className="mx-auto  h-32"
            src="/admin/MiSi High Res.png"
            alt="Workflow"
          />
          <h2 className="mt-6 text-center text-2xl font-extrabold text-gray-900">
            Login to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">Or</p>
        </div>
        <form
          className="mt-8 space-y-6"
          //method="POST"
          onSubmit={handleSubmit(
            (data) =>
              testData(
                "https://misiapi.lamptechs.com/api/v1/admin/login",

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
          <div className="relative">
            <input
              type="text"
              id="email"
              className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
              placeholder="  "
              required
              {...register("email")}
            />
            <label
              htmlFor="email"
              className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-teal-500 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
            >
              Your email
            </label>
          </div>
          <div className="relative">
            <input
              type="text"
              id="password"
              className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-500 peer"
              placeholder="••••••••"
              required
              {...register("password")}
            />
            <label
              htmlFor="password"
              className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-800 px-2 peer-focus:px-2 peer-focus:text-teal-500 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
            >
              Your password
            </label>
          </div>
          <div className="flex items-start">
            <a
              href="#"
              className="ml-auto text-sm text-blue-700 hover:underline dark:text-blue-500"
            >
              Recovery Password?
            </a>
          </div>
          {/* <Link href={`/`}> */}
          <button
            type="submit"
            className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Login to your account
          </button>
          {/* </Link> */}
          <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
            New to Misi?
            <Link href="/account/signup">
              <a className="text-blue-700 hover:underline dark:text-blue-500 ms-1">
                Sign up now.
              </a>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
export default Login;
Login.getLayout = function PageLayout(page) {
  return <>{page}</>;
};
