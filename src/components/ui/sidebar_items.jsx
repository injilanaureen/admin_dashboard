import React, { useState } from "react";
import { NavLink } from "react-router-dom";

export default function Sidebar_items({ title, image, children, isClicked, bgColor }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col w-full">
      {/* Header Section */}
      <div
        className="flex justify-between items-center px-3 hover:scale-110 hover:bg-slate-50 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <div className="flex gap-2 items-center">
          {/* Image */}
          {image && (
            <img src={image} alt="icon" className="size-4 md:size-5 lg:size-6" />
          )}
          {/* Title (only when sidebar is expanded) */}
          {isClicked && (
            <span className={`text-black text-xs md:text-sm lg:text-sm ${bgColor}`}>
              {title}
            </span>
          )}
        </div>
        {/* Toggle Arrow (only when sidebar is expanded) */}
        {isClicked && (
          <img
            className="size-1 md:size-2 lg:size-3"
            src={isOpen ? "/images/down_arrow.svg" : "/images/left_arrow.svg"}
            alt="toggle arrow"
          />
        )}
      </div>

      {/* Dropdown Content with Sliding Transition */}
      <div
        className={`bg-slate-50 overflow-hidden transition-all duration-2000 ease-in-out ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        {isClicked && children && (
          <ul className="flex flex-col gap-2 mt-2">
            {children.map((child, index) => (
              <div
                key={child.route || index} // Prefer unique 'route' as the key
                className="flex flex-col gap-2 pl-4"
              >
                {/* Child Image */}
                <div className="flex gap-2 items-center justify-start">
                  <img
                    src={child.image && child.image}
                    alt="child icon"
                    className="h-4 w-4"
                  />
                  {/* Child Title */}
                  <NavLink
                    to={child.route}
                    className={({ isActive }) =>
                      `text-sm ${
                        isActive ? "text-gray-800 font-semibold" : "text-gray-600"
                      } hover:text-gray-800`
                    }
                  >
                    {child.title}
                  </NavLink>
                </div>

                {/* Sub-children (if any) */}
                {child.children && child.children.length > 0 && (
                  <div className="ml-6">
                    <ul>
                      {child.children.map((subChild, subIndex) => (
                        <li
                          key={subChild.route || subIndex}
                          className="flex gap-2 items-center justify-start pl-4"
                        >
                          {/* Sub-Child Image */}
                          <img
                            src={child.image}
                            alt="sub-child icon"
                            className="h-3 w-3"
                          />
                          {/* Sub-Child Title */}
                          <NavLink
                            to={subChild.route}
                            className={({ isActive }) =>
                              `text-xs ${
                                isActive ? "text-gray-800 font-semibold" : "text-gray-600"
                              } hover:text-gray-800`
                            }
                          >
                            {subChild.title}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
