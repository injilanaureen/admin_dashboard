import React, { useState } from "react";

export default function Packages() {
  const [showTable, setShowTable] = useState(true);

  return (
    <div className="p-4 sm:p-6 bg-gray-50 flex flex-col gap-4">
      {/* Header Section */}
      <h2 className="text-2xl sm:text-3xl font-bold text-cyan-600">Package Management</h2>

      {/* Toggle Buttons */}
      <div className="flex gap-2 sm:gap-4">
        <button
          onClick={() => setShowTable(true)}
          className={`px-4 py-2 text-sm sm:text-base font-medium rounded-lg transition duration-300 ${
            showTable
              ? "bg-primary-color shadow-lg ring-2 ring-cyan-500"
              : "bg-tertiary-color hover:bg-primary-color hover:ring-cyan-700"
          }`}
        >
          List Packages
        </button>
        <button
          onClick={() => setShowTable(false)}
          className={`px-4 py-2 text-sm sm:text-base font-medium rounded-lg transition duration-300 ${
            !showTable
              ? "bg-primary-color shadow-lg ring-2 ring-cyan-500"
              : "bg-tertiary-color hover:bg-primary-color hover:ring-cyan-700"
          }`}
        >
          Add Package
        </button>
      </div>

      {/* Conditional Rendering */}
      {showTable ? (
        <div className="overflow-x-auto">
          {/* Package List Table */}
          <table className="w-full border border-gray-200 text-sm text-gray-600">
            <thead className="bg-gray-100">
              <tr>
                <th className="border py-2 px-2 text-left">S. No</th>
                <th className="border py-2 px-2 text-left">Package Name</th>
                <th className="border py-2 px-2 text-left">Price</th>
                <th className="border py-2 px-2 text-left">Duration</th>
                <th className="border py-2 px-2 text-left">Date Added</th>
                <th className="border py-2 px-2 text-left">Status</th>
                <th className="border py-2 px-2 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {/* Example row */}
              <tr className="hover:bg-gray-50">
                <td className="border py-2 px-2">1</td>
                <td className="border py-2 px-2">Basic Plan</td>
                <td className="border py-2 px-2">$49</td>
                <td className="border py-2 px-2">1 Month</td>
                <td className="border py-2 px-2">2024-12-30</td>
                <td className="border py-2 px-2">Active</td>
                <td className="border py-2 px-2">
                  <button className="px-2 py-1 bg-cyan-600 text-white rounded-md hover:bg-cyan-700">
                    Edit
                  </button>
                </td>
              </tr>
              {/* Add more rows dynamically */}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="bg-white p-4 rounded-lg shadow-lg">
          {/* Add Package Form */}
          <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">
            Add New Package
          </h3>
          <form className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
              <label className="text-gray-700 font-medium sm:w-32">Package Name</label>
              <input
                type="text"
                placeholder="Enter package name"
                className="flex-grow border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-color"
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
              <label className="text-gray-700 font-medium sm:w-32">Price</label>
              <input
                type="number"
                placeholder="Enter price"
                className="flex-grow border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-color"
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
              <label className="text-gray-700 font-medium sm:w-32">Duration</label>
              <input
                type="text"
                placeholder="Enter duration"
                className="flex-grow border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-color"
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
              <label className="text-gray-700 font-medium sm:w-32">Date</label>
              <input
                type="date"
                className="flex-grow border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-color"
              />
            </div>
            <button
              type="submit"
              className="w-full sm:w-auto px-4 py-2 bg-cyan-600 text-white rounded-md hover:opacity-90"
            >
              Save Package
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
