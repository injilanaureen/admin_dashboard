import React, { useState, useRef, useEffect } from "react";
import { Outlet, NavLink, useLocation, useNavigate } from "react-router-dom";

const MyMailbox = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [maxHeight, setMaxHeight] = useState("0px");
  const contentRef = useRef(null);
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
    <div className="mailbox-layout mx-4 my-6 md:mx-8 lg:mx-20">
      {/* Header with Button */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar */}
        <div className="lg:w-1/4 flex-shrink-0">
          <div className="mb-4">
            <h2 className="text-cyan-600 font-bold text-2xl mb-4 text-center lg:text-left">
              Mailbox
            </h2>
            <button
              className="px-4 py-2 bg-rose-400 rounded-md w-full lg:w-96 text-white font-semibold text-lg shadow-md hover:bg-rose-500 transition-all duration-300"
              onClick={handleButtonClick}
            >
              {location.pathname === "/mailbox/compose" ? "Back to Inbox" : "Compose"}
            </button>
          </div>
          <div className="bg-white p-4 rounded-md shadow">
            <div>
              <div className="flex justify-between items-center border-b pb-2">
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
                  className="p-2 border-b border-gray-300 hover:bg-gray-100"
                  to="inbox"
                >
                  Inbox
                </NavLink>
                <NavLink
                  className="p-2 border-b border-gray-300 hover:bg-gray-100"
                  to="draft"
                >
                  Drafts
                </NavLink>
                <NavLink
                  className="p-2 border-b border-gray-300 hover:bg-gray-100"
                  to="sent"
                >
                  Sent
                </NavLink>
                <NavLink
                  className="p-2 border-b border-gray-300 hover:bg-gray-100"
                  to="trash"
                >
                  Trash
                </NavLink>
              </nav>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:w-3/4 w-full">
          <div className="relative bg-white p-4 rounded-md shadow">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyMailbox;
