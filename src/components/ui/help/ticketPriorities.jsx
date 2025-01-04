import React, { useState } from "react";
import { FileText, Download,Cable, Printer,Pencil } from "lucide-react";

const ManageTicketPriorities = () => {
  const [showTable, setShowTable] = useState(true); // Toggle between table and form
  const [data, setData] = useState([
    { sNo: 1, priorityName: "Support", time:"12 hours", date: "11/13/2016 10:57:35 AM", status: "Active" },
    { sNo: 2, priorityName: "Sales",time:"72 hours",date: "01/22/2017 09:45:22 AM", status: "Inactive" },
  ]); // Mock data

  const [formData, setFormData] = useState({
    sNo: null,
    priorityName: "",
    time: "8 hours",
    date: new Date().toLocaleString(),
    status: "Active", // Default status is "Active"
  });
  

  const [isEditing, setIsEditing] = useState(false); // Track editing state
  const [filters, setFilters] = useState({ pageSize: "10" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    if (!formData.priorityName.trim()) {
      alert("Please fill in the required fields.");
      return;
    }
  
    if (isEditing) {
      setData((prevData) =>
        prevData.map((row) =>
          row.sNo === formData.sNo
            ? { ...row, priorityName: formData.priorityName, time: formData.time, status: row.status }
            : row
        )
      );
      alert("Priority updated successfully!");
    } else {
      const newEntry = {
        sNo: data.length + 1,
        priorityName: formData.priorityName,
        time: formData.time, // Ensure time is included here
        date: new Date().toLocaleString(),
        status: "Active",
      };
      setData((prevData) => [...prevData, newEntry]);
      alert("New priority added successfully!");
    }
  
    setFormData({ sNo: null, priorityName: "", time: "", date: new Date().toLocaleString(), status: "Active" });
    setIsEditing(false);
    setShowTable(true);
  };
  
  
  
  
  const handleEdit = (row) => {
    setFormData(row);
    setIsEditing(true);
    setShowTable(false);
  };

  const handleExport = (format) => {
    // Implement export logic based on the selected format (Excel, PDF, or Print)
    alert(`Exporting as ${format}`);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  return (
    <div className="bg-grey-100 p-2">
  
    <div className="text-3xl sm:text-2xl font-semibold m-10 flex items-center space-x-2">
        <Cable className="text-blue-600 w-6 h-6" />
        <span>Help & Support</span>
      </div>
    <div className="bg-white p-4 m-10">
       

      {/* Button Toggle */}
<div className="flex sm:w-1/4 w-full mb-6 pb-1 ">
  <button
    onClick={() => setShowTable(true)}
    className={`px-4 py-2  border-l-2 border-cyan-600 font-medium w-full sm:w-auto ${
      showTable
        ? "bg-primary-color shadow-lg ring-2 ring-cyan-500"
        : "bg-tertiary-color text-black hover:bg-primary-color hover:ring-cyan-700"
    } hover:opacity-90 transition duration-300`}
  >
    + List priority 
  </button>
  <button
    onClick={() => setShowTable(false)}
    className={`px-4 py-2  border-r-2 border-cyan-600 font-medium w-full sm:w-auto ${
      !showTable
        ? "bg-primary-color shadow-lg ring-2 ring-cyan-500"
        : "bg-tertiary-color text-black hover:bg-primary-color hover:ring-cyan-700"
    } hover:opacity-90 transition duration-300`}
  >
    + Add priority
  </button>
</div>



      {showTable ? (
        <div>
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center space-x-4">
              <span>Total Records: {data.length}</span>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleExport('excel')}
                  className="p-2 hover:bg-gray-100 rounded"
                  title="Export to Excel"
                >
                  <FileText className="w-5 h-5 text-green-600" />
                </button>
                <button
                  onClick={() => handleExport('pdf')}
                  className="p-2 hover:bg-gray-100 rounded"
                  title="Export to PDF"
                >
                  <Download className="w-5 h-5 text-red-600" />
                </button>
                <button
                  onClick={() => handleExport('print')}
                  className="p-2 hover:bg-gray-100 rounded"
                  title="Print"
                >
                  <Printer className="w-5 h-5 text-blue-600" />
                </button>
              </div>
            </div>
            <div className="flex items-center">
              <span className="mr-2">Page Size:</span>
              <select
                name="pageSize"
                className="border border-gray-300 rounded p-1"
                value={filters.pageSize}
                onChange={handleFilterChange}
              >
                <option value="10">10</option>
                <option value="50">50</option>
                <option value="100">100</option>
                <option value="200">200</option>
                <option value="500">500</option>
                <option value="1000">1000</option>
              </select>
            </div>
          </div>
          <table className="w-full border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-300 px-4 py-2">S. No</th>
                <th className="border border-gray-300 px-4 py-2">Priority Name</th>
                <th className="border border-gray-300 px-4 py-2">Solution Time</th>
                <th className="border border-gray-300 px-4 py-2">Date</th>
                <th className="border border-gray-300 px-4 py-2">Status</th>
                <th className="border border-gray-300 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.length > 0 ? (
                data.map((row) => (
                  <tr key={row.sNo}>
                    <td className="border border-gray-300 px-4 py-2 text-center">{row.sNo}</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">{row.priorityName}</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">{row.time}</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">{row.date}</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">{row.status}</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">
                      <button
                        onClick={() => handleEdit(row)}
                        className="flex items-center px-2 py-1 bg-green-500 text-center text-white rounded hover:bg-green-600"
                      >
                        <Pencil className="h-4 w-4 mr-1" /> Edit
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-4 text-gray-500">
                    No records available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="border border-gray-300 p-4 rounded">
          <h3 className="text-lg font-semibold mb-4">{isEditing ? "Edit priority" : "Add priority"}</h3>
          <div className="mb-4">
            <label htmlFor="priorityName" className="block mb-1">priority Name *</label>
            <input
              type="text"
              id="priorityName"
              name="priorityName"
              value={formData.priorityName}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            />
          </div>
          <div className="mb-4">
  <label htmlFor="time" className="block mb-1">Solution Time</label>
  <select
    id="time"
    name="time"
    value={formData.time}
    onChange={handleChange}
    className="w-full border border-gray-300 rounded px-3 py-2"
  >
    <option value="8 Hours">8 Hours</option>
    <option value="24 Hours">24 Hours</option>
    <option value="72 Hours">72 Hours</option>
  </select>
</div>

          <div className="flex justify-end">
            <button type="submit" className="px-4 py-2 bg-cyan-700 text-white rounded hover:bg-cyan-800">
              {isEditing ? "Update" : "Submit"}
            </button>
          </div>
        </form>
      )}
    </div>
    </div>
  );
};

export default ManageTicketPriorities;
