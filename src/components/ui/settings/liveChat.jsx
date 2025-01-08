import React, { useEffect, useState } from "react";

export default function ManageLiveChat() {
  const [chat, setchat] = useState([]);
  const [showTable, setShowTable] = useState(true); // Toggle between table and add chat

  useEffect(() => {
    const mockchat = [
      {
        id: 1,
        chatname: "Add chat",
        default: "chats",
        date: "12/26/2024",
        status: "done",
        action: "implemented",
      },
      {
        id: 2,
        chatname: "chat2",
        default: "Image chats",
        date: "02/28/2024",
        status: "pending",
        action: "in progress",
      },
    ];
    setchat(mockchat);
  }, []);

  return (
    <div className="p-6 flex flex-col gap-6 bg-gray-50">
      {/* Header Section */}
      <h2 className="text-3xl font-bold text-cyan-600 mb-6">chat Management</h2>

      {/* Button Toggle */}
      <div className="flex justify-between sm:w-1/4 w-full bg-slate-100 mb-6 p-4 rounded-lg">
        <button
          onClick={() => setShowTable(true)}
          className={`px-4 py-2 rounded-lg border-l-2 border-cyan-600 font-medium w-full sm:w-auto ${
            showTable
              ? "bg-primary-color shadow-lg ring-2 ring-cyan-500"
              : "bg-tertiary-color text-black hover:bg-primary-color hover:ring-cyan-700"
          } hover:opacity-90 transition duration-300`}
        >
          + List Chat Account
        </button>
        <button
          onClick={() => setShowTable(false)}
          className={`px-4 py-2 rounded-lg border-r-2 border-cyan-600 font-medium w-full sm:w-auto ${
            !showTable
              ? "bg-primary-color shadow-lg ring-2 ring-cyan-500"
              : "bg-tertiary-color text-black hover:bg-primary-color hover:ring-cyan-700"
          } hover:opacity-90 transition duration-300`}
        >
          + Add Chat Account
        </button>
      </div>

      {/* Conditional Rendering */}
      {showTable ? (
        <div>
          {/* chat Table */}
          <table className="min-w-full border-collapse border border-gray-200 text-sm text-gray-600">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-200 py-2 px-2">S. No</th>
                <th className="border border-gray-200 py-2 px-2">Chat Name</th>
                <th className="border border-gray-200 py-2 px-2">Default</th>
                <th className="border border-gray-200 py-2 px-2">Date</th>
                <th className="border border-gray-200 py-2 px-2">Status</th>
                <th className="border border-gray-200 py-2 px-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {chat.length > 0 ? (
                chat.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="border border-gray-200 py-2 px-2 text-center">{item.id}</td>
                   
                    <td className="border border-gray-200 py-2 px-2 text-center">
                      {item.chatname}
                    </td>
                    <td className="border border-gray-200 py-2 px-2 text-center">
                      {item.default}
                    </td>
                    <td className="border border-gray-200 py-2 px-2 text-center">
                      {item.date}
                    </td>
                    <td className="border border-gray-200 py-2 px-2 text-center">
                      {item.status}
                    </td>
                    <td className="border border-gray-200 py-2 px-2 text-center">
                      {item.action}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    className="border border-gray-200 py-3 px-4 text-center"
                    colSpan={8}
                  >
                    No chats available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      ) : (
        <div>
          {/* Add chat Section */}

          <h3 className="text-xl font-semibold text-gray-800 mb-4">Add New Chat</h3>
          <form className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-6">
              <label className="text-gray-700 font-medium mb-1 w-full sm:w-1/4">Chat Name</label>
              <input
                type="text"
                placeholder="Enter chat name"
                className="w-full sm:w-3/4 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-color"
              />
            </div>
        
           
            <div className="flex flex-col sm:flex-row gap-6">
              <label className="text-gray-700 font-medium mb-1 w-full sm:w-1/4">Chat Description</label>
              <textarea
                className="w-full sm:w-3/4 border border-gray-300 rounded-lg px-3 py-20 focus:outline-none focus:ring-2 focus:ring-primary-color"
                placeholder="Enter chat description"
              />
            </div>

            <button
              type="submit"
              className="px-4 py-2 bg-primary-color text-white rounded-lg hover:opacity-90"
            >
              Save chat
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
