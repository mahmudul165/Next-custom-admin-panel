/* eslint-disable @next/next/link-passhref */
/* eslint-disable react/jsx-key */
import Link from "next/link";
import React, { useEffect, useState } from "react";

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
          className="inline-flex items-center justify-start px-3 py-2.5 hover:text-gray-400 hover:bg-stone-200 focus:text-gray-400 focus:bg-gray-700 rounded-lg   cursor-pointer relative group"
          onClick={subMenuToggle}
        >
          {children}
          <span className={`${!sidebarStatus ? "text-sm  ml-2" : "sr-only"}`}>
            {menuTitle}
          </span>
          {/* <span
            className={`${
              !sidebarStatus ? "hidden" : "hidden group-hover:block"
            } absolute left-0 -bottom-5 bg-emerald-300 text-white   text-xs`}
          >
            {menuTitle}
          </span> */}
        </span>
      </Link>

      {/* Chile Menu */}
      {subMenu && (
        <ul
          className={`${
            subMenuToggleStatus ? "" : "hidden"
          } text-dark space-y-2 ml-7`}
        >
          {subMenuArray.map((subMenu, index) => (
            <Link href={subMenu.linkHref} key={index}>
              <li
                className="cursor-pointer active:text-orange-400 hover:text-purple-500"
                key={index}
              >
                {subMenu.subMenuTitle}
              </li>
            </Link>
          ))}
        </ul>
      )}
    </>
  );
};

export default NavItem;
