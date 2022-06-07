import {
  ArrowNarrowLeftIcon,
  ArrowNarrowRightIcon,
  CollectionIcon,
  DuplicateIcon,
  FilmIcon,
  ViewBoardsIcon,
  TemplateIcon,
  ArchiveIcon,
  AdjustmentsIcon,
  BadgeCheckIcon,
  TicketIcon,
} from "@heroicons/react/solid";
import React, { useEffect, useState } from "react";
import NavItem from "./NavItem";

const Nav = ({ sidebarOutsideClick }) => {
  const [sidebarStatus, setSidebarStatus] = useState(false);
  const [subMenuToggleStatus, setSubMenuToggleStatus] = useState(false);

  const sidebarClose = () => {
    setSidebarStatus(false);
  };

  const sidebarOpen = () => {
    setSidebarStatus(true);
  };

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

  useEffect(() => {
    if (sidebarOutsideClick) {
      setSidebarStatus(false);
    }
  }, [sidebarOutsideClick]);
  //console.log("sidebar Nav", sidebarOutsideClick)
  return (
    <>
      <nav className="flex flex-col mx-4 my-6 space-y-4">
        <div className="inline-flex items-center justify-center ">
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
        </div>
        {/* test start */}

        <NavItem
          hrefLink="/dashboard"
          sidebarStatus={sidebarStatus}
          menuTitle="Dashboard"
          subMenu={false}
          subMenuArray={null}
        >
          <ViewBoardsIcon className=" h-5" />
        </NavItem>
        <NavItem
          hrefLink="/services/category"
          sidebarStatus={sidebarStatus}
          menuTitle="Category"
          subMenu={false}
          subMenuArray={null}
        >
          <CollectionIcon className=" h-5" />
        </NavItem>
        <NavItem
          hrefLink="/services/sub-category"
          sidebarStatus={sidebarStatus}
          menuTitle="Sub-Category"
          subMenu={false}
          subMenuArray={null}
        >
          <DuplicateIcon className=" h-5" />
        </NavItem>
        <NavItem
          hrefLink="/services/therapist-service"
          sidebarStatus={sidebarStatus}
          menuTitle="Therapist-Service"
          subMenu={false}
          subMenuArray={null}
        >
          {" "}
          <ArchiveIcon className=" h-5" />
        </NavItem>
        <NavItem
          hrefLink="/create-new-patient"
          sidebarStatus={sidebarStatus}
          menuTitle="Patient List"
          subMenu={false}
          subMenuArray={null}
        >
          <BadgeCheckIcon className=" h-5" />
        </NavItem>
        <NavItem
          hrefLink="/all-ticket"
          sidebarStatus={sidebarStatus}
          menuTitle="All Ticket"
          subMenu={false}
          subMenuArray={null}
        >
          <TicketIcon className=" h-5" />
        </NavItem>
        <NavItem
          hrefLink="/services/therapist-doctor"
          sidebarStatus={sidebarStatus}
          menuTitle="Therapist-Doctor"
          subMenu={false}
          subMenuArray={null}
        >
          <AdjustmentsIcon className=" h-5" />
        </NavItem>

        {/* test end */}

        {/* <NavItem
          hrefLink="/category"
          sidebarStatus={sidebarStatus}
          menuTitle="Category"
          subMenu={false}
          subMenuArray={null}
        >
          <CollectionIcon className=" h-5" />
        </NavItem> */}

        {/* <NavItem
          hrefLink="/sub-category"
          sidebarStatus={sidebarStatus}
          menuTitle="Sub-Category"
          subMenu={false}
          subMenuArray={null}
        >
          <DuplicateIcon className=" h-5" />
        </NavItem> */}

        {/* this menu has child Menu     */}
        <NavItem
          hrefLink="#"
          sidebarStatus={sidebarStatus}
          menuTitle="Chiled Menu"
          subMenu={true}
          subMenuArray={childMenu}
        >
          <FilmIcon className=" h-5" />
        </NavItem>
      </nav>
    </>
  );
};

export default Nav;
