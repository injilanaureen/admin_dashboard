import React, { useEffect, useState } from "react";

export default function UserTypes() {
  const [userType, setUserType] = useState([]);
  const [showTable, setShowTable] = useState(true); // Toggle between table and add user
  const [newEmployeeType, setNewEmployeeType] = useState(""); // For form input

  useEffect(() => {
    const mockuserTypes = [
      {
        typeId: 1,
        employeeType: "free",
        date: "12/26/2024",
        status: "employed",
      },
      {
        typeId: 2,
        employeeType: "paid",
        date: "02/28/2024",
        status: "unemployed",
      },
    ];
    setUserType(mockuserTypes);
  }, []);

  // Simulate saving data to the database
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!newEmployeeType.trim()) {
      alert("Employee type name cannot be empty!");
      return;
    }

    const newType = {
      typeId: userType.length + 1, // Simulating an auto-increment ID
      employeeType: newEmployeeType,
      date: new Date().toLocaleDateString(), // Current date
      status: "employed", // Default status
    };

    setUserType((prev) => [...prev, newType]);
    setNewEmployeeType(""); // Clear input field after submission
    alert("New employee type added successfully!");
  };

  // Handle resetting the form
  const handleReset = () => {
    setNewEmployeeType(""); // Clear the input field
  };

  return (
    <div className="p-6 flex flex-col gap-6 bg-gray-50">
      {/* Header Section */}
      <h2 className="text-3xl font-bold text-cyan-600 mb-6">Users Management</h2>

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
          + List Employee Type
        </button>
        <button
          onClick={() => setShowTable(false)}
          className={`px-4 py-2 rounded-lg border-r-2 border-cyan-600 font-medium w-full sm:w-auto ${
            !showTable
              ? "bg-primary-color shadow-lg ring-2 ring-cyan-500"
              : "bg-tertiary-color text-black hover:bg-primary-color hover:ring-cyan-700"
          } hover:opacity-90 transition duration-300`}
        >
          + Add Employee Type
        </button>
      </div>

      {/* Conditional Rendering */}
      {showTable ? (
        <div>
          {/* User Table */}
          <table className="min-w-full border-collapse border border-gray-200 text-sm text-gray-600">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-200 py-2 px-2">S. No</th>
                <th className="border border-gray-200 py-2 px-2">Employee Type Name</th>
                <th className="border border-gray-200 py-2 px-2">Date</th>
                <th className="border border-gray-200 py-2 px-2">Status</th>
                <th className="border border-gray-200 py-2 px-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {userType.length > 0 ? (
                userType.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="border border-gray-200 py-2 px-2 text-center">{item.typeId}</td>
                    <td className="border border-gray-200 py-2 px-2 text-center">{item.employeeType}</td>
                    <td className="border border-gray-200 py-2 px-2 text-center">{item.date}</td>
                    <td className="border border-gray-200 py-2 px-2 text-center">{item.status}</td>
                    <td className="border py-2 px-2 text-center">
                      <button className="px-2 py-1 bg-cyan-600 text-white rounded-md hover:bg-cyan-700">
                        Edit
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    className="border border-gray-200 py-3 px-4 text-center"
                    colSpan={8}
                  >
                    No users available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      ) : (
        <div>
          {/* Add User Section */}
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Add Employee Type</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-6">
              <label className="text-gray-700 font-medium mb-1 w-full sm:w-1/4">Employee Type Name</label>
              <input
                type="text"
                value={newEmployeeType}
                onChange={(e) => setNewEmployeeType(e.target.value)}
                placeholder="Enter employee type name"
                className="w-full sm:w-3/4 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-color"
              />
            </div>
            <div className="flex gap-2">
              <button
                type="submit"
                className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:opacity-90"
              >
                Submit
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:opacity-90"
              >
                Reset
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
