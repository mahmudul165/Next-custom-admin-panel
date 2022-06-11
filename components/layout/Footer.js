import React from "react";

const Footer = () => {
  return (
    <div className="text-center bg-gray-600 h-auto py-1 text-yellow-50   absolute w-full bottom-0 z-10">
      <span className="">
        {new Date().getFullYear()} @ copy & Lamp Techs :)
      </span>
    </div>
  );
};

export default Footer;
