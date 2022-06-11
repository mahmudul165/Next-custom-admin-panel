import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/solid";
import React, { useEffect, useRef, useState } from "react";
import OutsideClick from "../../../utils/outsideClick";

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
      className="inline-flex items-center p-2 hover:bg-teal-500  focus:bg-teal-400 rounded-lg relative"
      onClick={userMenuhandle}
      ref={buttonRef}
    >
      <span className="sr-only">User Menu</span>
      <div className="hidden md:flex md:flex-col md:items-end md:leading-tight">
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
        <div className="absolute right-0 sm:-bottom-16 bg-slate-700 px-2 py-1 space-x-2 text-white w-full -bottom-28">
          <a className="block hover:bg-teal-500 hover:text-black">
            user Profile
          </a>
          <a className="block hover:bg-teal-500 hover:text-black">
            user setting
          </a>
        </div>
      )}

      {userMenuStatus ? (
        <ChevronDownIcon className="hidden sm:block h-6 w-6 text-gray-300" />
      ) : (
        <ChevronUpIcon className="hidden sm:block h-6 w-6 text-gray-300" />
      )}
    </button>
  );
};

export default UserMenu;
