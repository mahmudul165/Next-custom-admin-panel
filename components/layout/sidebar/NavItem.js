/* eslint-disable @next/next/link-passhref */
/* eslint-disable react/jsx-key */
import Link from "next/link";
import React, { useEffect, useState } from "react";

import { MdExpandMore } from "react-icons/md";
const NavItem = ({
  sidebarStatus,
  menuTitle,
  subMenu,
  subMenuArray,
  hrefLink,
  children,
}) => {
  const [subMenuToggleStatus, setSubMenuToggleStatus] = useState(false);
  const subMenuToggle = () => {
    setSubMenuToggleStatus(!subMenuToggleStatus);
  };

  useEffect(() => {
    if (!sidebarStatus) {
      setSubMenuToggleStatus(false);
    }
  }, [sidebarStatus]);
  //console.log('submenu', sidebarStatus)
  return (
    <>
      <Link href={hrefLink}>
        <span
          className="   inline-flex items-center justify-start px-3 py-2.5 hover:text-teal-500 hover:bg-stone-200 focus:text-gray-400 focus:bg-gray-700 rounded-lg   cursor-pointer relative group"
          onClick={subMenuToggle}
        >
          <span className="text-lg"> {children}</span>
          <span className={`${!sidebarStatus ? "text-base ml-1" : "sr-only"}`}>
            {menuTitle}
          </span>

          {/* <span
            className={`${
              !sidebarStatus ? "hidden" : "hidden group-hover:block"
            } absolute left-0 -bottom-5 bg-emerald-300 text-white   text-xs`}
          >
            {menuTitle}
             
          </span> */}
          {subMenu && (
            <span className="ml-1 text-2xl font-extrabold">
              <MdExpandMore />
            </span>
          )}
        </span>
      </Link>

      {/* Chile Menu */}
      {subMenu && (
        <ul
          className={`${
            subMenuToggleStatus ? "" : "hidden"
          } text-base space-y-2 ml-7`}
        >
          {subMenuArray.map((subMenu, index) => (
            <Link href={subMenu.linkHref} key={index}>
              <li
                className="cursor-pointer active:text-violet-700 hover:text-purple-500"
                key={index}
              >
                {subMenu.subMenuTitle}
              </li>
            </Link>
          ))}
        </ul>
      )}

      {/* test sub menu */}

      {/* <button
        type="button"
        className="flex items-center p-2 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
        aria-controls="dropdown-example"
        data-collapse-toggle="dropdown-example"
      >
        <svg
          className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z"
            clip-rule="evenodd"
          ></path>
        </svg>
        <span
          className="flex-1 ml-3 text-left whitespace-nowrap"
          sidebar-toggle-item
        >
          E-commerce
        </span>
        <svg
          sidebar-toggle-item
          className="w-6 h-6"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clip-rule="evenodd"
          ></path>
        </svg>
      </button> */}
      <ul id="dropdown-example" className="hidden py-2 space-y-2">
        <li>
          <a
            href="#"
            className="flex items-center p-2 pl-11 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
          >
            Products
          </a>
        </li>
        <li>
          <a
            href="#"
            className="flex items-center p-2 pl-11 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
          >
            Billing
          </a>
        </li>
        <li>
          <a
            href="#"
            className="flex items-center p-2 pl-11 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
          >
            Invoice
          </a>
        </li>
      </ul>
    </>
  );
};

export default NavItem;
