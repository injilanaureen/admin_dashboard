import React, { useState } from "react";

export default function Packages() {
  const [showTable, setShowTable] = useState(true); // State for toggling

  return (
    <div className="p-6 flex flex-col gap-1 bg-gray-50">
      {/* Header Section */}
      <h2 className="text-3xl font-bold text-cyan-600 mb-6">Package Management</h2>
      <div className="flex justify-between bg-slate-100 mb-4 w-1/6">
        {/* Toggle Buttons */}
        <button
          onClick={() => setShowTable(true)}
          className={`px-4 py-2 rounded-lg border-l-2 border-cyan-600 font-medium ${
            showTable
              ? "bg-primary-color shadow-lg ring-2 ring-cyan-500"
              : "bg-tertiary-color text-black hover:bg-primary-color hover:ring-cyan-700"
          } hover:opacity-90 transition duration-300`}
        >
          + List Packages
        </button>
        <button
          onClick={() => setShowTable(false)}
          className={`px-4 py-2 rounded-lg border-r-2 border-cyan-600 font-medium ${
            !showTable
              ? "bg-primary-color shadow-lg ring-2 ring-cyan-500"
              : "bg-tertiary-color text-black hover:bg-primary-color hover:ring-cyan-700"
          } hover:opacity-90 transition duration-300`}
        >
          + Add Package
        </button>
      </div>

      {/* Conditional Rendering */}
      {showTable ? (
        <div>
          {/* Package List Table */}
          <table className="min-w-full border-collapse border border-gray-200 text-sm text-gray-600">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-200 py-2 px-2">S. No</th>
                <th className="border border-gray-200 py-2 px-2">Package Name</th>
                <th className="border border-gray-200 py-2 px-2">Price</th>
                <th className="border border-gray-200 py-2 px-2">Duration</th>
                <th className="border border-gray-200 py-2 px-2">Date Added</th>
                <th className="border border-gray-200 py-2 px-2">Status</th>
                <th className="border border-gray-200 py-2 px-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {/* Example row */}
              <tr className="hover:bg-gray-50">
                <td className="border border-gray-200 py-2 px-2 text-center">1</td>
                <td className="border border-gray-200 py-2 px-2 text-center">Basic Plan</td>
                <td className="border border-gray-200 py-2 px-2 text-center">$49</td>
                <td className="border border-gray-200 py-2 px-2 text-center">1 Month</td>
                <td className="border border-gray-200 py-2 px-2 text-center">2024-12-30</td>
                <td className="border border-gray-200 py-2 px-2 text-center">Active</td>
                <td className="border border-gray-200 py-2 px-2 text-center">
                  <button className="px-2 py-1 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700">
                    Edit
                  </button>
                </td>
              </tr>
              {/* Add more rows dynamically as needed */}
            </tbody>
          </table>
        </div>
      ) : (
        <div>
          {/* Add Package Form */}
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Add New Package</h3>
          <form className="space-y-4">
            <div className="flex gap-6">
              <label className="text-gray-700 font-medium mb-1 w-24">Package Name</label>
              <input
                type="text"
                placeholder="Enter package name"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-color"
              />
            </div>
            <div className="flex gap-6">
              <label className="block text-gray-700 font-medium mb-1 w-24">Price</label>
              <input
                type="text"
                placeholder="Enter price"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-color"
              />
            </div>
            <div className="flex gap-6">
              <label className="block text-gray-700 font-medium mb-1 w-24">Duration</label>
              <input
                type="text"
                placeholder="Enter duration"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-color"
              />
            </div>
            <div className="flex gap-6">
              <label className="block text-gray-700 font-medium mb-1 w-24">Date</label>
              <input
                type="date"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-color"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-primary-color text-white rounded-lg hover:opacity-90"
            >
              Save Package
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
