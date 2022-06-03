import React, { useRef } from "react";
import OutsideClick from "../../utils/outsideClick";
import Logo from "./sidebar/logo";
import Nav from "./sidebar/Nav";
import SettingButton from "./sidebar/SettingButton";

const Sidebar = ({ mobileNavsidebar }) => {
  const sidebarRef = useRef(null);
  const sidebarOutsideClick = OutsideClick(sidebarRef);

  //console.log("sidebar Ref", sidebarRef)
  //console.log("sidebar Ref sidebarOutsideClick", sidebarOutsideClick)
  return (
    <aside
      className={`${
        mobileNavsidebar ? "block" : "hidden"
      } sm:flex sm:flex-col z-50`}
      ref={sidebarRef}
    >
      <Logo />
      {/* bg-gray-800 */}
      <div className="flex-grow flex flex-col justify-between text-gray-500  bg-white">
        <Nav sidebarOutsideClick={sidebarOutsideClick} />
        <SettingButton />
      </div>
    </aside>
  );
};

export default Sidebar;
