import React from "react";
import { NavLink } from "react-router-dom";

export default function Sidebar_items({
  title,
  image,
  children,
  isClicked,
  isOpenChildren,
  setIsOpenChildren,
}) {
  const toggleChildren = () => {
    setIsOpenChildren((prevState) => {
      // If children are currently open, close them; otherwise, open only this one
      return !prevState;
    });
  };

  return (
    <div className="flex flex-col w-full">
      {/* Header Section */}
      <div
        className="flex justify-between items-center px-3 hover:scale-110 hover:bg-slate-50 cursor-pointer"
        onClick={toggleChildren}
        aria-expanded={isOpenChildren}
      >
        <div className="flex gap-2 items-center ">
          {/* Image */}
          {image && <img src={image} alt="icon" className="size-4 md:size-5 lg:size-6" />}
          {/* Title */}
          {isClicked && <span className="text-black text-xs md:text-sm lg:text-sm">{title}</span>}
        </div>
        {/* Toggle Arrow */}
        {isClicked && (
          <img
            className="size-1 md:size-2 lg:size-3"
            src={isOpenChildren ? "/images/down_arrow.svg" : "/images/left_arrow.svg"}
            alt="toggle arrow"
          />
        )}
      </div>

      {/* Dropdown Content */}
      <div
        className={`bg-slate-50 overflow-hidden transition-all duration-300 ease-in-out ${
          isOpenChildren ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        {isClicked && children && (
          <ul className="flex flex-col gap-2 mt-2">
            {children.map((child, index) => (
              <li key={index} className="pl-4">
                <NavLink
                  to={child.route}
                  className={({ isActive }) =>
                    `text-sm ${isActive ? "text-gray-800 font-semibold" : "text-gray-600"}`
                  }
                >
                  {child.title}
                </NavLink>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
