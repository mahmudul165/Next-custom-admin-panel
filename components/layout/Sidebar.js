import React, { useRef } from "react";
import OutsideClick from "../../utils/outsideClick";
import Logo from "/components/layout/sidebar/Logo";
import Nav from "/components/layout/sidebar/Nav";
import SettingButton from "/components/layout/sidebar/SettingButton";

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
      <div className="flex-grow flex flex-col justify-between bg-gray-600  text-white">
        <Nav sidebarOutsideClick={sidebarOutsideClick} />
        {/* <SettingButton /> */}
      </div>
    </aside>
  );
};

export default Sidebar;
