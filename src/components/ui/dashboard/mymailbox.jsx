import React,{useState} from "react";
import { Outlet, Link } from "react-router-dom";

const MyMailbox = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);
  
  return (
    <div className="mailbox-layout">
        <h2>Mailbox</h2>
     <div className="flex gap-6">
          <div className="sidebar">    
            <div className="flex flex-col">
            <div className="flex justify-between items-center border-b-2 pb-2">
        <h2 className="text-base font-bold">folders</h2>
        <button
          className="text-lg font-bold cursor-pointer"
          onClick={() => setIsCollapsed(!isCollapsed)}
          aria-label="Toggle Shortcuts"
        >
          {isCollapsed ? "+" : "-"}
        </button>
      </div>
            <nav className="flex flex-col">
              <Link className="p-4 border-b-2 border-cyan-400" to="inbox">Inbox</Link>
              <Link className="p-4 border-b-2 border-cyan-400" to="drafts">Drafts</Link>
              <Link className="p-4 border-b-2 border-cyan-400" to="sent">Sent</Link>
              <Link className="p-4 border-b-2 border-cyan-400" to="trash">Trash</Link>
              <Link className="p-4 border-b-2 border-cyan-400" to="compose">Compose</Link>
            </nav>
            </div>
           </div>
      <div className="main-content">
        <Outlet />
      </div>
        </div>
    </div>
  );
};

export default MyMailbox;
