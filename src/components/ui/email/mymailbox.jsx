import React, { useState, useRef, useEffect } from "react";
import { Outlet, NavLink, useLocation, useNavigate } from "react-router-dom";

const MyMailbox = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [maxHeight, setMaxHeight] = useState("0px"); // To control max-height dynamically
  const contentRef = useRef(null); // Reference to the content div
  const location = useLocation();
  const navigate = useNavigate();

  const handleButtonClick = () => {
    if (location.pathname === "/mailbox/compose") {
      navigate("/mailbox/inbox");
    } else {
      navigate("/mailbox/compose");
    }
  };

  useEffect(() => {
    if (contentRef.current) {
      setMaxHeight(isCollapsed ? "0px" : `${contentRef.current.scrollHeight}px`);
    }
  }, [isCollapsed]);

  return (
    <div className="mailbox-layout mx-20 my-10">
      {/* Header with Button */}
      <div className="flex">
        <div className="w-1/4 flex-shrink-0">
          <div className="mb-4">
            <h2 className="text-cyan-600 font-bold text-2xl mb-2">Mailbox</h2>
            <button
              className="px-4 py-1 bg-rose-400 rounded-md w-96 text-white font-semibold text-xl shadow-md hover:bg-rose-500 transition-all duration-300"
              onClick={handleButtonClick}
            >
              {location.pathname === "/mailbox/compose" ? "Back to Inbox" : "Compose"}
            </button>
          </div>
          <div className="flex flex-col m-4 bg-white p-2">
            <div>
              <div className="flex justify-between items-center border-b-2  pb-2">
                <h2 className="text-base font-bold">Folders</h2>
                <button
                  className="text-lg font-bold cursor-pointer"
                  onClick={() => setIsCollapsed(!isCollapsed)}
                  aria-label="Toggle Shortcuts"
                >
                  {isCollapsed ? "+" : "-"}
                </button>
              </div>
              <nav
                ref={contentRef}
                className="flex flex-col transition-max-height duration-500 ease-in-out overflow-hidden"
                style={{ maxHeight }}
              >
                <NavLink
                  className="p-2 border-b-2 border-gray-300 hover:bg-gray-100"
                  to="inbox"
                >
                  Inbox
                </NavLink>
                <NavLink
                  className="p-2 border-b-2 border-gray-300 hover:bg-gray-100"
                  to="draft"
                >
                  Drafts
                </NavLink>
                <NavLink
                  className="p-2 border-b-2 border-gray-300 hover:bg-gray-100"
                  to="sent"
                >
                  Sent
                </NavLink>
                <NavLink
                  className="p-2 border-b-2 border-gray-300 hover:bg-gray-100"
                  to="trash"
                >
                  Trash
                </NavLink>
              </nav>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="w-3/4">
          <div className="relative">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyMailbox;
