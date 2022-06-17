/* eslint-disable @next/next/link-passhref */
/* eslint-disable react/jsx-key */
import Link from "next/link";
import React, { useEffect, useState } from "react";

import { MdExpandMore, MdArrowForwardIos } from "react-icons/md";
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
          className="   inline-flex items-center justify-start px-2 py-1  hover:text-teal-500 hover:bg-stone-200 focus:text-gray-400 focus:bg-gray-700 rounded-lg   cursor-pointer relative group"
          onClick={subMenuToggle}
        >
          <span className="text-lg"> {children}</span>
          <span className={`${!sidebarStatus ? "text-sm ml-2" : "sr-only"}`}>
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
          } text-sm space-y-2 ml-7  `}
        >
          {subMenuArray.map((subMenu, index) => (
            <>
              <Link href={subMenu.linkHref} key={index}>
                <li
                  className="cursor-pointer active:text-violet-700 hover:text-purple-500"
                  key={index}
                >
                  <div className="flex  ">
                    <MdArrowForwardIos />
                    <span className="ml-2"> {subMenu.subMenuTitle}</span>
                  </div>
                </li>
              </Link>
            </>
          ))}
        </ul>
      )}
    </>
  );
};

export default NavItem;
