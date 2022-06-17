import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/solid";
import React, { useEffect, useRef, useState } from "react";
import OutsideClick from "../../../utils/outsideClick";
import { CgProfile } from "react-icons/cg";
import { AiOutlineSetting, AiOutlineLogout } from "react-icons/ai";
const UserMenu = () => {
  const [userMenuStatus, setUserMenuStatus] = useState(false);
  const buttonRef = useRef(null);
  const buttonOutsideClick = OutsideClick(buttonRef);

  const userMenuhandle = () => {
    setUserMenuStatus(!userMenuStatus);
  };

  useEffect(() => {
    if (buttonOutsideClick) {
      setUserMenuStatus(false);
    }
  }, [buttonOutsideClick]);

  //console.log("userbutton", buttonOutsideClick)
  return (
    <button
      className="inline-flex items-center p-2      rounded-lg relative"
      onClick={userMenuhandle}
      ref={buttonRef}
    >
      <span className="sr-only">User Menu</span>
      <div className="  hidden     md:flex md:flex-col md:items-end md:leading-tight">
        <span className="font-semibold text-white">Mahmud Hasan</span>
        <span className="text-sm text-slate-300">Developer</span>
      </div>
      <span className="h-12 w-12 ml-2 sm:ml-3 mr-2 bg-gray-100 rounded-full overflow-hidden">
        <img
          src="/admin/Group 4887.png"
          alt="user profile photo"
          className="h-full w-full object-cover"
        />
      </span>

      {userMenuStatus && (
        <div className="    grid justify-items-start   -mb-12 rounded-lg absolute p-1   sm:-bottom-12  bg-white       text-gray-600    font-medium   w-full -bottom-16">
          <div className="   inline-flex items-center justify-start px-0.5  py-1     rounded-lg   cursor-pointer relative group">
            <span className="text-base">
              <CgProfile />
            </span>
            <span className="text-sm ml-1">
              <a className="block rounded-lg  ">My profile</a>
            </span>
          </div>
          <div className="   inline-flex items-center justify-start px-0.5 py-1 my-1    rounded-lg   cursor-pointer relative group">
            <span className=" text-base">
              <AiOutlineSetting />
            </span>
            <span className="text-sm ml-1">
              <a className="block rounded-lg  ">Setting</a>
            </span>
          </div>
          <div className="   inline-flex items-center justify-start px-0.5 py-1    rounded-lg   cursor-pointer relative group">
            <span className=" text-base">
              <AiOutlineLogout />
            </span>
            <span className="text-sm ml-1">
              <a className="block rounded-lg  ">Logout</a>
            </span>
          </div>
        </div>
      )}

      {userMenuStatus ? (
        <ChevronDownIcon
          className="hidden sm:block h-
         w-6 text-slate-50"
        />
      ) : (
        <ChevronUpIcon className="hidden sm:block h-6 w-12 text-slate-50" />
      )}
    </button>
  );
};

export default UserMenu;
