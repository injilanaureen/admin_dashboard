import React, { useState, useRef, useEffect } from "react";

const QuickShortcuts = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [maxHeight, setMaxHeight] = useState("0px"); // To control max-height dynamically
  const contentRef = useRef(null); // Reference to the content div

  const shortcuts = [
    { title: "All Members", icon: "👤" },
    { title: "Packages/Scheme", icon: "📦" },
    { title: "Profile Setting", icon: "⚙️" },
    { title: "E-Wallet Ledger", icon: "💳" },
    { title: "UPI Collection", icon: "📥" },
    { title: "Payout Report", icon: "📊" },
  ];

  // Update maxHeight dynamically when the state changes
  useEffect(() => {
    if (contentRef.current) {
      setMaxHeight(isCollapsed ? "0px" : `${contentRef.current.scrollHeight}px`);
    }
  }, [isCollapsed]);

  return (

    <div className="p-4 bg-white rounded-lg shadow-md">
      {/* Header Section with Collapse Button */}
      <div className="flex justify-between items-center border-b-2 pb-2">
        <h2 className="text-base font-bold">Quick Shortcuts</h2>
        <button
          className="text-lg font-bold cursor-pointer"
          onClick={() => setIsCollapsed(!isCollapsed)}
          aria-label="Toggle Shortcuts"
        >
          {isCollapsed ? "+" : "-"}
        </button>
      </div>

      {/* Shortcuts Grid with Smooth Collapsible Content */}
      <div
        className="transition-[max-height] duration-1000 ease-in-out overflow-hidden"
        style={{ maxHeight }}
        ref={contentRef} // Attach the ref for dynamic height calculation
      >
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 gap-4 pt-4">
          {shortcuts.map((shortcut, index) => (
           <a href=""> <div
              key={index}
              className="flex flex-col items-center p-3 bg-orange-50 rounded-lg shadow hover:bg-tertiary-color transition duration-300"
            >
              <div className="text-3xl">{shortcut.icon}</div>
              <span className="mt-2 text-center text-sm md:text-base text-indigo-950">
                {shortcut.title}
              </span>
            </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuickShortcuts;
