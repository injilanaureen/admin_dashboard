import React, { useState } from "react";
import { Wallet, List, FileText, Printer, File, Download, Cable } from "lucide-react";

const ManageCircles = () => {
  const [showTable, setShowTable] = useState(true); // Toggle between table and add user
  const [data, setData] = useState([]); // Data for mock table
  const [selectedRows, setSelectedRows] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const [formData, setFormData] = useState({
    circleName: "",
    smsApiCode: "",
    date: new Date().toLocaleString(),
    status: "Active",
  });

  // Mock data
  const mockData = [
    { sNo: 1, circleName: "West Bengal", smsApiCode: "23", date: "11/12/2016 4:08:23 PM", circleStatus: "Active", status: "Active" },
    { sNo: 2, circleName: "Uttar Pradesh (W)", smsApiCode: "22", date: "9/4/2016 11:31:30 AM", circleStatus: "Active", status: "Active" },
    { sNo: 3, circleName: "Uttar Pradesh (E)", smsApiCode: "21", date: "9/4/2016 11:31:09 AM", circleStatus: "Active", status: "Active" },
    { sNo: 4, circleName: "Tamil Nadu", smsApiCode: "20", date: "9/4/2016 11:30:47 AM", circleStatus: "Active", status: "Active" },
    { sNo: 5, circleName: "Rajasthan", smsApiCode: "19", date: "9/4/2016 11:30:23 AM", circleStatus: "Active", status: "Active" },
    { sNo: 6, circleName: "Punjab", smsApiCode: "18", date: "9/4/2016 11:29:59 AM", circleStatus: "Active", status: "Active" },
    { sNo: 7, circleName: "Orissa", smsApiCode: "17", date: "9/4/2016 11:29:28 AM", circleStatus: "Active", status: "Active" },
    { sNo: 8, circleName: "North East", smsApiCode: "16", date: "9/4/2016 11:29:03 AM", circleStatus: "Active", status: "Active" },
    { sNo: 9, circleName: "All India", smsApiCode: "0", date: "9/4/2016 11:28:41 AM", circleStatus: "Active", status: "Active" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { circleName, smsApiCode } = formData;

    if (!circleName.trim() || !smsApiCode.trim()) {
      alert("Please fill all the required fields marked with *");
      return;
    }

    const newEntry = {
      sNo: data.length + 1,
      circleName,
      smsApiCode,
      date: new Date().toLocaleString(),
      circleStatus: "Active",
      status: "Active",
    };

    setData((prev) => [...prev, newEntry]);
    setFormData({ circleName: "", smsApiCode: "" });
    alert("New circle added successfully!");
  };

  const handleReset = () => {
    setFormData({ circleName: "", smsApiCode: "" });
  };

  const handleExport = (type) => {
    console.log(`Exporting as ${type}`);
  };

  // Handle row selection
  const handleRowClick = (index) => {
    if (selectedRows.includes(index)) {
      setSelectedRows(selectedRows.filter((row) => row !== index));
    } else {
      setSelectedRows([...selectedRows, index]);
    }
  };

  return (
    <div className="bg-white p-4">
      {/* Wallet System Heading */}
      <div className="text-xl sm:text-2xl font-semibold mb-4 flex items-center space-x-2">
        <Cable className="text-blue-600 w-6 h-6" />
        <span>Recharge System</span>
      </div>
      <div className="flex items-start sm:w-1/4 w-full mb-6 rounded-lg">
        <button
          onClick={() => setShowTable(true)}
          className={`px-4 py-2 border-l-2 border-cyan-600 font-medium w-full sm:w-auto ${
            showTable ? "bg-primary-color shadow-lg ring-2 ring-cyan-500" : "bg-tertiary-color text-black hover:bg-primary-color hover:ring-cyan-700"
          } hover:opacity-90 transition duration-300`}
        >
          + List circle
        </button>
        <button
          onClick={() => setShowTable(false)}
          className={`px-4 py-2 border-r-2 border-cyan-600 font-medium w-full sm:w-auto ${
            !showTable ? "bg-primary-color shadow-lg ring-2 ring-cyan-500" : "bg-tertiary-color text-black hover:bg-primary-color hover:ring-cyan-700"
          } hover:opacity-90 transition duration-300`}
        >
          + Add circle
        </button>
      </div>

      {/* Export Buttons */}
      <div className="p-4 flex flex-col md:flex-row justify-between items-center border-b">
        <div className="flex items-center space-x-4">
          <span>Total Record(s): {mockData.length}</span>
          <button onClick={() => handleExport("excel")} className="text-green-600">
            <FileText className="w-6 h-6" />
          </button>
          <button onClick={() => handleExport("word")} className="text-blue-600">
            <Download className="w-6 h-6" />
          </button>
          <button onClick={() => handleExport("pdf")} className="text-red-600">
            <Printer className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Transaction Data Table */}
      {showTable ? (
        <div className="overflow-x-auto">
          <table className="w-full border text-xs sm:text-sm">
            <thead>
              <tr className="bg-gray-50">
                <th className="p-3 text-left  border-gray-300">S. No</th>
                <th className="p-3 text-left">Circle Name</th>
                <th className="p-3 text-left">SMS/API Circle Code</th>
                <th className="p-3 text-left">Date</th>
                <th className="p-3 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {mockData.length > 0 ? (
                mockData.map((row, index) => (
                  <tr key={index} className="border-t  border-gray-300">
                    <td className="p-3  border-gray-300">{row.sNo}</td>
                    <td className="p-3  border-gray-300" >{row.circleName}</td>
                    <td className="p-3  border-gray-300">{row.smsApiCode}</td>
                    <td className="p-3  border-gray-300">{row.date}</td>
                    <td className="p-3  border-gray-300">{row.status}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="p-3 text-center text-gray-500">
                    No Record Found!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="p-6 bg-white rounded shadow-md">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Add Circle</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-300 px-4 py-2 text-left">Field Name</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Input</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">
                    Circle Name <span className="text-red-600">*</span>
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <input
                      type="text"
                      name="circleName"
                      value={formData.circleName}
                      onChange={handleChange}
                      className="block w-full border rounded px-3 py-2"
                    />
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">
                    Circle Code <span className="text-red-600">*</span>
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <input
                      type="text"
                      name="smsApiCode"
                      value={formData.smsApiCode}
                      onChange={handleChange}
                      className="block w-full border rounded px-3 py-2"
                    />
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">Date</td>
                  <td className="border border-gray-300 px-4 py-2">{formData.date}</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">Status</td>
                  <td className="border border-gray-300 px-4 py-2">{formData.status}</td>
                </tr>
              </tbody>
            </table>
            <div className="flex justify-end space-x-4">
              <button
                type="submit"
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700"
              >
                Submit
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700"
              >
                Reset
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ManageCircles;
