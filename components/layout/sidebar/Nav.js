import { HiOutlineTicket, HiAdjustments, HiOutlineMenu } from "react-icons/hi";
import {
  MdOutlineDashboard,
  MdOutlineCategory,
  MdCategory,
  MdList,
  MdAssignmentTurnedIn,
} from "react-icons/md";

//Patient List
import { GiPerson } from "react-icons/gi";
//Therapist
import { RiMentalHealthLine } from "react-icons/ri";
//All Tikcets
import { IoTicketSharp } from "react-icons/io5";
//Appointment Group
import { MdOutlineScreenShare } from "react-icons/md";

import { CgScreen } from "react-icons/cg";
import { MdAppRegistration } from "react-icons/md";
import { FcApprove } from "react-icons/fc";
import { FcDisapprove } from "react-icons/fc";
import { CgNotes } from "react-icons/cg";
import { BsFillQuestionOctagonFill } from "react-icons/bs";
import { BiCategoryAlt } from "react-icons/bi";
import { RiPsychotherapyLine } from "react-icons/ri";
import { SiTodoist } from "react-icons/si";
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
      linkHref: "/services/testtable",
    },
    {
      subMenuTitle: "List two",
      linkHref: "/services/category",
    },
    // {
    //   subMenuTitle: "Menu Three",
    //   linkHref: "/",
    // },
  ];

  // useEffect(() => {
  //   if (sidebarOutsideClick) {
  //     setSidebarStatus(false);
  //   }
  // }, [sidebarOutsideClick]);
  //console.log("sidebar Nav", sidebarOutsideClick)
  return (
    <>
      {/* SideNavebar */}
      <nav className="flex flex-col mx-1 my-6 space-y-2 w-44">
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
          hrefLink="/patient"
          // sidebarStatus={sidebarStatus}
          menuTitle="Patient List"
          subMenu={false}
          subMenuArray={null}
        >
          <GiPerson className=" h-6" />
        </NavItem>
        <NavItem
          hrefLink="/therapist"
          // sidebarStatus={sidebarStatus}
          menuTitle="Therapist List"
          subMenu={false}
          subMenuArray={null}
        >
          <RiMentalHealthLine className=" h-6" />
        </NavItem>
        <NavItem
          hrefLink="/all-ticket"
          // sidebarStatus={sidebarStatus}
          menuTitle="All Tickets"
          subMenu={false}
          subMenuArray={null}
        >
          <IoTicketSharp className=" h-6" />
        </NavItem>
        <NavItem
          hrefLink="/appointment-group"
          // sidebarStatus={sidebarStatus}
          menuTitle="Appointment Group"
          subMenu={false}
          subMenuArray={null}
        >
          <MdOutlineScreenShare className=" h-6" />
        </NavItem>
        <NavItem
          hrefLink="/screener-group"
          // sidebarStatus={sidebarStatus}
          menuTitle="Screener Group"
          subMenu={false}
          subMenuArray={null}
        >
          <CgScreen className=" h-6" />
        </NavItem>
        <NavItem
          hrefLink="/heraanmelding-group"
          // sidebarStatus={sidebarStatus}
          menuTitle="Heraanmelding Group"
          subMenu={false}
          subMenuArray={null}
        >
          <MdAppRegistration className=" h-6" />
        </NavItem>
        <NavItem
          hrefLink="/yes-approval"
          // sidebarStatus={sidebarStatus}
          menuTitle="Waiting for 'YES' Approval"
          subMenu={false}
          subMenuArray={null}
        >
          <FcApprove className=" h-6" />
        </NavItem>
        <NavItem
          hrefLink="/no-approval"
          // sidebarStatus={sidebarStatus}
          menuTitle="Waiting for 'NO' Approval"
          subMenu={false}
          subMenuArray={null}
        >
          <FcDisapprove className=" h-6" />
        </NavItem>
        <NavItem
          hrefLink="/pib-group"
          // sidebarStatus={sidebarStatus}
          menuTitle="PiB Group"
          subMenu={false}
          subMenuArray={null}
        >
          <CgNotes className=" h-6" />
        </NavItem>
        <NavItem
          hrefLink="/pit-group"
          // sidebarStatus={sidebarStatus}
          menuTitle="PiT Group"
          subMenu={false}
          subMenuArray={null}
        >
          <CgNotes className=" h-6" />
        </NavItem>
        <NavItem
          hrefLink="/missing-info-list"
          // sidebarStatus={sidebarStatus}
          menuTitle="Missing-Info List"
          subMenu={false}
          subMenuArray={null}
        >
          <MdList className=" h-6" />
        </NavItem>
        <NavItem
          hrefLink="/zd-patient"
          // sidebarStatus={sidebarStatus}
          menuTitle="ZD Patient List"
          subMenu={false}
          subMenuArray={null}
        >
          <GiPerson className=" h-6" />
        </NavItem>

        <NavItem
          hrefLink="/appointment"
          // sidebarStatus={sidebarStatus}
          menuTitle="Appointment"
          subMenu={false}
          subMenuArray={null}
        >
          <MdAssignmentTurnedIn className=" h-6" />
        </NavItem>
        <NavItem
          hrefLink="/services/category"
          // sidebarStatus={sidebarStatus}
          menuTitle="Service Category"
          subMenu={false}
          subMenuArray={null}
        >
          <MdCategory className=" h-6" />
        </NavItem>
        <NavItem
          hrefLink="/services/sub-category"
          // sidebarStatus={sidebarStatus}
          menuTitle="Service Sub Category"
          subMenu={false}
          subMenuArray={null}
        >
          <BiCategoryAlt className=" h-6" />
        </NavItem>
        <NavItem
          hrefLink="/services/therapist-service"
          // sidebarStatus={sidebarStatus}
          menuTitle="Therapist Service"
          subMenu={false}
          subMenuArray={null}
        >
          {" "}
          <RiPsychotherapyLine className=" h-6" />
        </NavItem>

        {/* <NavItem
          hrefLink="/services/therapist-doctor"
          // sidebarStatus={sidebarStatus}
          menuTitle="Therapist/Doctor"
          subMenu={false}
          subMenuArray={null}
        >
          <HiAdjustments className=" h-6" />
        </NavItem> */}

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
          menuTitle="Schedule"
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
