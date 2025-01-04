import React, { useState, useEffect } from "react";
import { Cable } from "lucide-react";

const ListAllTickets = () => {
  const [showTable, setShowTable] = useState(true); // Toggle between table and form
  const [data, setData] = useState([]); // Mock data
  const [formData, setFormData] = useState(null); // Data for the ticket being edited

  useEffect(() => {
    // Initialize mock data
    setData([
      {
        sNo: 1,
        ticketID: "TKT001",
        memberID: "MEM001",
        priority: "High",
        department: "Support",
        subject: "Login Issue",
        solutionTime: "2 hours",
        date: "01/01/2025 10:00 AM",
        status: "Active",
      },
      {
        sNo: 2,
        ticketID: "TKT002",
        memberID: "MEM002",
        priority: "Low",
        department: "Sales",
        subject: "Pricing Query",
        solutionTime: "4 hours",
        date: "01/02/2025 11:00 AM",
        status: "Inactive",
      },
    ]);
  }, []);

  const handleEdit = (row) => {
    setFormData(row); // Set the row data in the form
    setShowTable(false); // Show the form
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Update the data array with edited values
    setData((prevData) =>
      prevData.map((row) => (row.sNo === formData.sNo ? { ...formData } : row))
    );

    alert("Ticket updated successfully!");
    setFormData(null);
    setShowTable(true);
  };

  return (
    <div className="bg-gray-100 p-4">
      <div className="text-3xl sm:text-2xl font-semibold mb-6 flex items-center space-x-2">
        <Cable className="text-blue-600 w-6 h-6" />
        <span>Help & Support</span>
      </div>

      {showTable ? (
        <div className="bg-white p-6 border border-gray-300 rounded">
          <h2 className="text-xl font-bold text-cyan-600 mb-4">List All Tickets</h2>
          <div className="overflow-x-auto">
            <table className="w-full border text-sm">
              <thead>
                <tr className="bg-gray-50 border-b">
                  <th className="p-3 text-left border-gray-300">S. No</th>
                  <th className="p-3 text-left border-gray-300">Ticket ID</th>
                  <th className="p-3 text-left border-gray-300">Member ID</th>
                  <th className="p-3 text-left border-gray-300">Priority</th>
                  <th className="p-3 text-left border-gray-300">Department</th>
                  <th className="p-3 text-left border-gray-300">Subject</th>
                  <th className="p-3 text-left border-gray-300">Solution Time</th>
                  <th className="p-3 text-left border-gray-300">Date</th>
                  <th className="p-3 text-left border-gray-300">Status</th>
                  <th className="p-3 text-left border-gray-300">Action</th>
                </tr>
              </thead>
              <tbody>
                {data.length > 0 ? (
                  data.map((row, index) => (
                    <tr key={index} className="border-t border-gray-300">
                      <td className="p-3 border-gray-300">{row.sNo}</td>
                      <td className="p-3 border-gray-300">{row.ticketID}</td>
                      <td className="p-3 border-gray-300">{row.memberID}</td>
                      <td className="p-3 border-gray-300">{row.priority}</td>
                      <td className="p-3 border-gray-300">{row.department}</td>
                      <td className="p-3 border-gray-300">{row.subject}</td>
                      <td className="p-3 border-gray-300">{row.solutionTime}</td>
                      <td className="p-3 border-gray-300">{row.date}</td>
                      <td className="p-3 border-gray-300">{row.status}</td>
                      <td className="p-3 border-gray-300">
                        <button
                          onClick={() => handleEdit(row)}
                          className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-700"
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="10" className="p-3 text-center text-gray-500">
                      No Record Found!
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="bg-white p-6 border border-gray-300 rounded">
          <h2 className="text-xl font-bold text-cyan-600 mb-4">Edit Ticket</h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block font-semibold">Ticket ID</label>
                <input
                  type="text"
                  name="ticketID"
                  value={formData.ticketID}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded p-2"
                />
              </div>
              <div>
                <label className="block font-semibold">Member ID</label>
                <input
                  type="text"
                  name="memberID"
                  value={formData.memberID}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded p-2"
                />
              </div>
              <div>
                <label className="block font-semibold">Priority</label>
                <input
                  type="text"
                  name="priority"
                  value={formData.priority}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded p-2"
                />
              </div>
              <div>
                <label className="block font-semibold">Department</label>
                <input
                  type="text"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded p-2"
                />
              </div>
              <div>
                <label className="block font-semibold">Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded p-2"
                />
              </div>
              <div>
                <label className="block font-semibold">Solution Time</label>
                <input
                  type="text"
                  name="solutionTime"
                  value={formData.solutionTime}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded p-2"
                />
              </div>
              <div>
                <label className="block font-semibold">Date</label>
                <input
                  type="text"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded p-2"
                />
              </div>
              <div>
                <label className="block font-semibold">Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded p-2"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>
            <div className="mt-4 flex space-x-2">
              <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded">
                Update
              </button>
              <button
                type="button"
                onClick={() => {
                  setFormData(null);
                  setShowTable(true);
                }}
                className="px-4 py-2 bg-gray-300 text-black rounded"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ListAllTickets;
