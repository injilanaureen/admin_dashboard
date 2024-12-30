import React, { useEffect, useState } from "react";

export default function ManageWebMenus() {
  const [menus, setMenus] = useState([]);
  const [showTable, setShowTable] = useState(true); // Toggle between table and add menu

  useEffect(() => {
    const mockMenus = [
      {
        id: 1,
        menuName: "Home",
        menuLevel: "Top Level",
        menuUrl: "/home",
        menuId: "home1",
        parentId: "root",
        position: "1",
        date: "12/26/2024",
        status: "active",
        action: "edit",
      },
      {
        id: 2,
        menuName: "About Us",
        menuLevel: "Second Level",
        menuUrl: "/about",
        menuId: "about1",
        parentId: "home1",
        position: "2",
        date: "12/27/2024",
        status: "inactive",
        action: "edit",
      },
    ];
    setMenus(mockMenus);
  }, []);

  return (
    <div className="p-6 bg-gray-50">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-cyan-600">Menu Management</h2>
        <div className="flex gap-4 bg-slate-100">
          <button
            onClick={() => setShowTable(true)}
            className={`px-4 py-2 rounded-lg border-r-2 border-cyan-600 font-medium ${
              showTable ? "bg-primary-color" : "bg-tertiary-color"
            } hover:opacity-90`}
          >
            + List Menu
          </button>
          <button
            onClick={() => setShowTable(false)}
            className={`px-4 py-2 rounded-lg border-r-2 border-cyan-600 text-black font-medium ${
              !showTable ? "bg-primary-color" : "bg-tertiary-color"
            } hover:opacity-90`}
          >
            + Add menu
          </button>
        </div>
      </div>

      {/* Conditional Rendering */}
      {showTable ? (
        <div>
          {/* Menu Table */}
          <table className="min-w-full border-collapse border border-gray-200 text-sm text-gray-600">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-200 py-2 px-2">S. No</th>
                <th className="border border-gray-200 py-2 px-2">Menu Name</th>
                <th className="border border-gray-200 py-2 px-2">Menu Level</th>
                <th className="border border-gray-200 py-2 px-2">Menu URL</th>
                <th className="border border-gray-200 py-2 px-2">Menu ID</th>
                <th className="border border-gray-200 py-2 px-2">Parent ID</th>
                <th className="border border-gray-200 py-2 px-2">Position</th>
                <th className="border border-gray-200 py-2 px-2">Date</th>
                <th className="border border-gray-200 py-2 px-2">Status</th>
                <th className="border border-gray-200 py-2 px-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {menus.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="border border-gray-200 py-2 px-2 text-center">{item.id}</td>
                  <td className="border border-gray-200 py-2 px-2 text-center">{item.menuName}</td>
                  <td className="border border-gray-200 py-2 px-2 text-center">{item.menuLevel}</td>
                  <td className="border border-gray-200 py-2 px-2 text-center">{item.menuUrl}</td>
                  <td className="border border-gray-200 py-2 px-2 text-center">{item.menuId}</td>
                  <td className="border border-gray-200 py-2 px-2 text-center">{item.parentId}</td>
                  <td className="border border-gray-200 py-2 px-2 text-center">{item.position}</td>
                  <td className="border border-gray-200 py-2 px-2 text-center">{item.date}</td>
                  <td className="border border-gray-200 py-2 px-2 text-center">{item.status}</td>
                  <td className="border border-gray-200 py-2 px-2 text-center">{item.action}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div>
          {/* Add Menu Section */}
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Add New Menu</h3>
          <form className="space-y-4">
            <div className="flex gap-6">
              <label className="text-gray-700 font-medium w-24">Menu Name</label>
              <input
                type="text"
                placeholder="Enter menu name"
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              />
            </div>
            <div className="flex gap-6">
              <label className="text-gray-700 font-medium w-24">Menu URL</label>
              <input
                type="text"
                placeholder="Enter menu URL"
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              />
            </div>
            <div className="flex gap-6">
              <label className="text-gray-700 font-medium w-24">Position</label>
              <input
                type="number"
                placeholder="Enter position"
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              />
            </div>
            <div className="flex gap-6">
              <label className="text-gray-700 font-medium w-24">Date</label>
              <input
                type="date"
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              />
            </div>
            <div className="flex gap-6">
              <label className="b text-gray-700 font-medium mb-1 w-24">Menu Description</label>
              <input
                type="textarea "
                className="w-full border border-gray-300 rounded-lg px-3 py-20 focus:outline-none focus:ring-2 focus:ring-primary-color"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-primary-color text-white rounded-lg hover:opacity-90"
            >
              Save Menu
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
