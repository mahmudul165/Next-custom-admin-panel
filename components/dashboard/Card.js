import React from "react";
import Link from "next/link";
function Card({ name, number, bgColor, path }) {
  console.log("first bg", bgColor);
  return (
    <>
      {bgColor ? (
        <Link passHref href={`${path ? path : "/dashboard"}`}>
          <div
            className={`  items-center   grid grid-cols-1 divide-y  shadow rounded-lg ${bgColor}`}
          >
            {/* <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-purple-600 bg-purple-100 rounded-full mr-6">
        <svg
          aria-hidden="true"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="h-6 w-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
      </div> */}

            <div className="p-3">
              <span className="block text-lg font-bold text-white py-1">
                {number}
              </span>
              <span className="block text-white   text-base  font-normal">
                {name}
              </span>
            </div>
            <div className="p-2.5  ">
              <span className="block text-slate-800  text-base font-normal text-center">
                {name}
              </span>
            </div>
          </div>
        </Link>
      ) : (
        <>empty</>
      )}
    </>
  );
}

export default Card;
