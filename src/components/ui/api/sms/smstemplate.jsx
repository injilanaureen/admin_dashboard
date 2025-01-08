import React, { useState, useEffect } from "react";
import { FileText, Download, Printer, Pencil, List } from "lucide-react";

const ManageTemplate = () => {
  const [showTable, setShowTable] = useState(true);
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({
    sNo: null,
    templateType: "",
    dltTradeName: "",
    telemarketerID: "",
    telemarketerName: "",
    date: new Date().toLocaleString(),
    status: "Inactive",
  });
  const [isEditing, setIsEditing] = useState(false);
    const [filters, setFilters] = useState({ pageSize: "10" });
  

  useEffect(() => {
    setData([
      {
        sNo: 1,
        templateType: "Agent Alert - Failed DMT",
        dltTradeName: "NIL",
        telemarketerID: "",
        telemarketerName: "",
        date: "3/6/2024 6:04:30 PM",
        status: "Inactive",
      },
      {
        sNo: 2,
        templateType: "Agent Alert - Pending DMT",
        dltTradeName: "NIL",
        telemarketerID: "",
        telemarketerName: "",
        date: "3/6/2024 6:04:30 PM",
        status: "Inactive",
      },
      {
        sNo: 3,
        templateType: "Agent Alert - Success DMT",
        dltTradeName: "NIL",
        telemarketerID: "",
        telemarketerName: "",
        date: "3/6/2024 6:04:30 PM",
        status: "Inactive",
      },
    ]);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleExport = (format) => {
    // Implement export logic based on the selected format (Excel, PDF, or Print)
    alert(`Exporting as ${format}`);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.templateType.trim()) {
      alert("Please fill in the required fields.");
      return;
    }
      const handleExport = (format) => {
    // Implement export logic based on the selected format (Excel, PDF, or Print)
    alert(`Exporting as ${format}`);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

    if (isEditing) {
      setData((prevData) =>
        prevData.map((row) =>
          row.sNo === formData.sNo
            ? { ...row, ...formData }
            : row
        )
      );
      alert("Template updated successfully!");
    } else {
      const newEntry = {
        ...formData,
        sNo: data.length + 1,
        date: new Date().toLocaleString(),
      };
      setData((prevData) => [...prevData, newEntry]);
      alert("New template added successfully!");
    }

    setFormData({
      sNo: null,
      templateType: "",
      dltTradeName: "",
      telemarketerID: "",
      telemarketerName: "",
      date: new Date().toLocaleString(),
      status: "Inactive",
    });
    setIsEditing(false);
    setShowTable(true);
  };

  const handleEdit = (row) => {
    setFormData(row);
    setIsEditing(true);
    setShowTable(false);
  };

  return (
    <div className="bg-gray-100 p-4">
      <div className="text-3xl sm:text-2xl font-semibold mb-6 flex items-center space-x-2">
        <FileText className="w-6 h-6" />
        <span>Manage Templates</span>
      </div>
      <div className="p-4 bg-white">
        <div className="flex items-center mb-6 space-x-4">
          <button
            onClick={() => setShowTable(true)}
            className={`flex items-center px-4 py-2 font-medium space-x-2 ${
              showTable ? "bg-gray-100 shadow-lg" : ""
            }`}
          >
            <List className="w-5 h-5" />
            <span>List Templates</span>
          </button>
          <button
            onClick={() => setShowTable(false)}
            className={`flex items-center px-4 py-2 font-medium space-x-2 ${
              !showTable ? "bg-gray-100 shadow-lg" : ""
            }`}
          >
            <Pencil className="w-5 h-5" />
            <span>Add Template</span>
          </button>
        </div>
  
        {showTable ? (
          <div>
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center space-x-4">
                <span>Total Records: {data.length}</span>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleExport("excel")}
                    className="p-2 hover:bg-gray-100 rounded"
                    title="Export to Excel"
                  >
                    <FileText className="w-5 h-5 text-green-600" />
                  </button>
                  <button
                    onClick={() => handleExport("pdf")}
                    className="p-2 hover:bg-gray-100 rounded"
                    title="Export to PDF"
                  >
                    <Download className="w-5 h-5 text-red-600" />
                  </button>
                  <button
                    onClick={() => handleExport("print")}
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
                  <th className="border border-gray-300 px-4 py-2">Template Type</th>
                  <th className="border border-gray-300 px-4 py-2">DLT Trade Name</th>
                  <th className="border border-gray-300 px-4 py-2">Telemarketer ID</th>
                  <th className="border border-gray-300 px-4 py-2">Telemarketer Name</th>
                  <th className="border border-gray-300 px-4 py-2">Date</th>
                  <th className="border border-gray-300 px-4 py-2">Status</th>
                  <th className="border border-gray-300 px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {data.length > 0 ? (
                  data.map((row) => (
                    <tr key={row.sNo}>
                      <td className="border border-gray-300 px-4 py-2 text-center">
                        {row.sNo}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {row.templateType}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {row.dltTradeName}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {row.telemarketerID}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {row.telemarketerName}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {row.date}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {row.status}
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-center">
                        <button
                          onClick={() => handleEdit(row)}
                          className="flex items-center px-2 py-1 bg-green-500 text-white rounded"
                        >
                          <Pencil className="h-4 w-4 mr-1" /> Edit
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="text-center py-4 text-gray-500">
                      No records available.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="border border-gray-300 p-4 rounded">
            <h3 className="text-lg font-semibold mb-4">
              {isEditing ? "Edit Template" : "Add Template"}
            </h3>
            <div className="mb-4">
              <label htmlFor="templateType" className="block mb-1">
                Template Type *
              </label>
              <input
                type="text"
                id="templateType"
                name="templateType"
                value={formData.templateType}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="dltTradeName" className="block mb-1">
                DLT Trade Name
              </label>
              <input
                type="text"
                id="dltTradeName"
                name="dltTradeName"
                value={formData.dltTradeName}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="telemarketerID" className="block mb-1">
                Telemarketer ID
              </label>
              <input
                type="text"
                id="telemarketerID"
                name="telemarketerID"
                value={formData.telemarketerID}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="telemarketerName" className="block mb-1">
                Telemarketer Name
              </label>
              <input
                type="text"
                id="telemarketerName"
                name="telemarketerName"
                value={formData.telemarketerName}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="status" className="block mb-1">
                Status
              </label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2"
              >
                <option value="Inactive">Inactive</option>
                <option value="Active">Active</option>
              </select>
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              {isEditing ? "Update Template" : "Add Template"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}  

export default ManageTemplate;
