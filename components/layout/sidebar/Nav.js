// import {
//   ArrowNarrowLeftIcon,
//   ArrowNarrowRightIcon,
//   CollectionIcon,
//   DuplicateIcon,
//   FilmIcon,
//   ViewBoardsIcon,
//   TemplateIcon,
//   ArchiveIcon,
//   HiViewListIcon,
//   BadgeCheckIcon,
//   TicketIcon,
//   CursorClickIcon,
// } from "@heroicons/react/solid";
import { HiOutlineTicket, HiAdjustments, HiOutlineMenu } from "react-icons/hi";
import {
  MdOutlineDashboard,
  MdOutlineCategory,
  MdCategory,
  MdList,
} from "react-icons/md";

import { BiCategoryAlt } from "react-icons/bi";
import { RiPsychotherapyLine } from "react-icons/ri";
TbPhysotherapist;
import { TbPhysotherapist } from "react-icons/tb";
import React, { useEffect, useState } from "react";
import NavItem from "./NavItem";

const Nav = ({ sidebarOutsideClick }) => {
  //const [sidebarStatus, setSidebarStatus] = useState(true);
  const [subMenuToggleStatus, setSubMenuToggleStatus] = useState(false);

  // const sidebarClose = () => {
  //   setSidebarStatus(false);
  // };

  // const sidebarOpen = () => {
  //   setSidebarStatus(true);
  // };

  const subMenuToggle = () => {
    setSubMenuToggleStatus(!subMenuToggleStatus);
  };

  //if menu has chile menu then  use seperate array
  const childMenu = [
    {
      subMenuTitle: "Menu one",
      linkHref: "/services",
    },
    {
      subMenuTitle: "Menu Two",
      linkHref: "/services/category",
    },
    {
      subMenuTitle: "Menu Three",
      linkHref: "/",
    },
  ];

  // useEffect(() => {
  //   if (sidebarOutsideClick) {
  //     setSidebarStatus(false);
  //   }
  // }, [sidebarOutsideClick]);
  //console.log("sidebar Nav", sidebarOutsideClick)
  return (
    <>
      <nav className="flex flex-col mx-2 my-6 space-y-4 w-44">
        {/* <div className="inline-flex items-center justify-center ">
          {sidebarStatus ? (
            <ArrowNarrowLeftIcon
              className="inline-block h-12 cursor-pointer"
              onClick={sidebarClose}
            />
          ) : (
            <ArrowNarrowRightIcon
              className="inline-block h-5 cursor-pointer"
              onClick={sidebarOpen}
            />
          )}
        </div> */}

        {/* test start */}

        <NavItem
          hrefLink="/dashboard"
          // sidebarStatus={sidebarStatus}
          menuTitle="Dashboard"
          subMenu={false}
          subMenuArray={null}
        >
          <MdOutlineDashboard className="h-5" />
        </NavItem>
        <NavItem
          hrefLink="/services/category"
          // sidebarStatus={sidebarStatus}
          menuTitle="Category"
          subMenu={false}
          subMenuArray={null}
        >
          <MdCategory className=" h-6" />
        </NavItem>
        <NavItem
          hrefLink="/services/sub-category"
          // sidebarStatus={sidebarStatus}
          menuTitle="Sub-Category"
          subMenu={false}
          subMenuArray={null}
        >
          <BiCategoryAlt className=" h-6" />
        </NavItem>
        <NavItem
          hrefLink="/services/therapist-service"
          // sidebarStatus={sidebarStatus}
          menuTitle="Therapist-Service"
          subMenu={false}
          subMenuArray={null}
        >
          {" "}
          <RiPsychotherapyLine className=" h-6" />
        </NavItem>
        <NavItem
          hrefLink="/patient"
          // sidebarStatus={sidebarStatus}
          menuTitle="Patient list"
          subMenu={false}
          subMenuArray={null}
        >
          <MdList className=" h-6" />
        </NavItem>
        <NavItem
          hrefLink="/therapist"
          // sidebarStatus={sidebarStatus}
          menuTitle="Therapist list"
          subMenu={false}
          subMenuArray={null}
        >
          <TbPhysotherapist className=" h-6" />
        </NavItem>
        <NavItem
          hrefLink="/all-ticket"
          // sidebarStatus={sidebarStatus}
          menuTitle="All Ticket"
          subMenu={false}
          subMenuArray={null}
        >
          <HiOutlineTicket className=" h-6" />
        </NavItem>
        <NavItem
          hrefLink="/services/therapist-doctor"
          // sidebarStatus={sidebarStatus}
          menuTitle="Therapist-Doctor"
          subMenu={false}
          subMenuArray={null}
        >
          <HiAdjustments className=" h-6" />
        </NavItem>

        {/* test end */}

        {/* <NavItem
          hrefLink="/category"
         // sidebarStatus={sidebarStatus}
          menuTitle="Category"
          subMenu={false}
          subMenuArray={null}
        >
          <CollectionIcon className=" h-5" />
        </NavItem> */}

        {/* <NavItem
          hrefLink="/sub-category"
         // sidebarStatus={sidebarStatus}
          menuTitle="Sub-Category"
          subMenu={false}
          subMenuArray={null}
        >
          <DuplicateIcon className=" h-5" />
        </NavItem> */}

        {/* this menu has child Menu     */}
        <NavItem
          hrefLink="#"
          // sidebarStatus={sidebarStatus}
          menuTitle="Chiled Menu"
          subMenu={true}
          subMenuArray={childMenu}
        >
          <HiOutlineMenu className=" h-6" />
        </NavItem>
      </nav>
    </>
  );
};

export default Nav;
