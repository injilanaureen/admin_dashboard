import React, { useState } from "react";
import { FileText, Download, Printer,Pencil } from "lucide-react";

const ManageDepartments = () => {
  const [showTable, setShowTable] = useState(true); // Toggle between table and form
  const [data, setData] = useState([
    { sNo: 1, departmentName: "Support", date: "11/13/2016 10:57:35 AM", status: "Active" },
    { sNo: 2, departmentName: "Sales", date: "01/22/2017 09:45:22 AM", status: "Inactive" },
  ]); // Mock data

  const [formData, setFormData] = useState({
    sNo: null,
    departmentName: "",
    date: new Date().toLocaleString(),
    status: "Active",
  });

  const [isEditing, setIsEditing] = useState(false); // Track editing state
  const [filters, setFilters] = useState({ pageSize: "10" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.departmentName.trim()) {
      alert("Please fill in the required fields.");
      return;
    }

    if (isEditing) {
      // Update existing row
      setData((prevData) =>
        prevData.map((row) =>
          row.sNo === formData.sNo ? { ...row, departmentName: formData.departmentName, status: formData.status } : row
        )
      );
      alert("Department updated successfully!");
    } else {
      // Add new row
      const newEntry = {
        sNo: data.length + 1,
        departmentName: formData.departmentName,
        date: new Date().toLocaleString(),
        status: formData.status,
      };
      setData((prevData) => [...prevData, newEntry]);
      alert("New department added successfully!");
    }

    setFormData({ sNo: null, departmentName: "", date: new Date().toLocaleString(), status: "Active" });
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
    <div className="bg-white p-4 m-10">
        <h2 className="text-3xl font-bold text-cyan-600 mb-6">Help & Support</h2>
      {/* Button Toggle */}
<div className="flex sm:w-1/4 w-full mb-6 p-4 rounded-lg">
  <button
    onClick={() => setShowTable(true)}
    className={`px-4 py-2 rounded-lg border-l-2 border-cyan-600 font-medium w-full sm:w-auto ${
      showTable
        ? "bg-primary-color shadow-lg ring-2 ring-cyan-500"
        : "bg-tertiary-color text-black hover:bg-primary-color hover:ring-cyan-700"
    } hover:opacity-90 transition duration-300`}
  >
    + List Department 
  </button>
  <button
    onClick={() => setShowTable(false)}
    className={`px-4 py-2 rounded-lg border-r-2 border-cyan-600 font-medium w-full sm:w-auto ${
      !showTable
        ? "bg-primary-color shadow-lg ring-2 ring-cyan-500"
        : "bg-tertiary-color text-black hover:bg-primary-color hover:ring-cyan-700"
    } hover:opacity-90 transition duration-300`}
  >
    + Add Department
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
                <th className="border border-gray-300 px-4 py-2">Department Name</th>
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
                    <td className="border border-gray-300 px-4 py-2 text-center">{row.departmentName}</td>
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
          <h3 className="text-lg font-semibold mb-4">{isEditing ? "Edit Department" : "Add Department"}</h3>
          <div className="mb-4">
            <label htmlFor="departmentName" className="block mb-1">Department Name *</label>
            <input
              type="text"
              id="departmentName"
              name="departmentName"
              value={formData.departmentName}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="status" className="block mb-1">Status</label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
          <div className="flex justify-end">
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              {isEditing ? "Update" : "Submit"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ManageDepartments;
