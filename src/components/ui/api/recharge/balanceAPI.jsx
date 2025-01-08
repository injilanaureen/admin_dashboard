import React, { useState, useEffect } from "react";
import { FileText, Download, Printer, Pencil, List } from "lucide-react";

const AddAPIBalance = () => {
  const [showTable, setShowTable] = useState(true); // Toggle between table and form
  const [data, setData] = useState([]); // Mock data

  const [formData, setFormData] = useState({
    sNo: null,
    apiName: "",
    APIID: "",
    operatorCode: "",
    circleCode: "GET",
    date: new Date().toLocaleString(),
    status: "Active",
  });

  const [isEditing, setIsEditing] = useState(false); // Track editing state
  const [filters, setFilters] = useState({ pageSize: "10" });

  useEffect(() => {
    // Mock data loading
    setData([
      {
        sNo: 1,
        apiName: "Emantor API",
        APIID: 	3,
        operatorCode: "operator",
        circleCode: "circle",
        date: "4/12/2021 12:13:06 AM",
        status: "Active",
      },
    ]);
  }, []);


  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.apiName.trim()) {
      alert("Please fill in the required fields.");
      return;
    }

    if (isEditing) {
      // Update existing row
      setData((prevData) =>
        prevData.map((row) =>
          row.sNo === formData.sNo ? { ...row, apiName: formData.apiName, status: formData.status } : row
        )
      );
      alert("API updated successfully!");
    } else {
      // Add new row
      const newEntry = {
        sNo: data.length + 1,
        apiName: formData.apiName,
        method: formData.method,
        isDefault: formData.isDefault,
        totalSingleSms: formData.totalSingleSms,
        totalBulkSms: formData.totalBulkSms,
        isdCode: formData.isdCode,
        bulkSeparator: formData.bulkSeparator,
        date: new Date().toLocaleString(),
        status: formData.status,
      };
      setData((prevData) => [...prevData, newEntry]);
      alert("New API added successfully!");
    }

    setFormData({
        sNo: "",
        apiName: "",
        APIID: 	"",
        operatorCode: "",
        circleCode: "",
        date: "",
        status: "Active",
      date: new Date().toLocaleString(),
    });
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
    <div className="bg-gray-100 p-4">
      <div className="text-3xl sm:text-2xl font-semibold mb-6 flex items-center space-x-2">
        <FileText className=" w-6 h-6" />
        <span>Recharge API </span>
      </div>
      <div className=" p-4 md:p-10 lg:p-2 bg-white">
        <div className="flex sm:w-1/4 w-full items-center mb-6 rounded-lg ">
          <List className="size-8" />
          <button
            onClick={() => setShowTable(true)}
            className={`px-4 py-2  font-medium w-full sm:w-auto ${
              showTable ? "bg-gray-100 shadow-lg" : "text-black hover:bg-primary-color"
            } hover:opacity-90 transition duration-300`}
          >
            List API Balance
          </button>
          
        </div>
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
                  <th className="border border-gray-300 px-4 py-2">API Name</th>
                  <th className="border border-gray-300 px-4 py-2">APIID</th>
                  <th className="border border-gray-300 px-4 py-2">Operator Code</th>
                  <th className="border border-gray-300 px-4 py-2">Circle Code</th>
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
                      <td className="border border-gray-300 px-4 py-2 text-center">{row.apiName}</td>
                      <td className="border border-gray-300 px-4 py-2 text-center">{row.APIID}</td>
                      <td className="border border-gray-300 px-4 py-2 text-center">{row.operatorCode}</td>
                      <td className="border border-gray-300 px-4 py-2 text-center">{row.circleCode}</td>
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
                    <td colSpan="11" className="text-center py-4 text-gray-500">
                      No records available.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
    
      </div>
    </div>
  );
};

export default AddAPIBalance;
