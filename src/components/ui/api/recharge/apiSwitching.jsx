import React, { useState, useEffect } from "react";
import { FileText, Download, Printer, Pencil, List } from "lucide-react";

const APISwitching = () => {
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

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



  return (
    <div className="bg-gray-100 p-4">
      <div className="text-3xl sm:text-2xl font-semibold mb-6 flex items-center space-x-2">
        <FileText className=" w-6 h-6" />
        <span>Recharge API</span>
      </div>
      <div className=" p-4 md:p-10 lg:p-2 bg-white">
        <div className="flex sm:w-1/4 w-full items-center mb-6 rounded-lg ">
        <Pencil className=" w-6 h-6" />
                  <button
            onClick={() => setShowTable(false)}
            className={`px-4 py-2  font-medium w-full sm:w-auto ${
              !showTable ? "bg-gray-100 shadow-lg " : "bg-tertiary-color text-black"
            } hover:opacity-90 transition duration-300`}
          >
            API Switching
          </button>
        </div>
        
          <form onSubmit={handleSubmit} className="border border-gray-300 p-4 rounded">
            <h3 className="text-lg font-semibold mb-4">{isEditing ? "Edit API" : "Add API"}</h3>
            <div className="mb-4">
              <label htmlFor="apiName" className="block mb-1">From API</label>
              <input
                type="text"
                id="apiName"
                name="apiName"
                value={formData.apiName}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="singleSmsUrl" className="block mb-1">To API</label>
              <input
                type="text"
                id="singleSmsUrl"
                name="singleSmsUrl"
                value={formData.singleSmsUrl}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2"
                required
              />
            </div>
           
            {/* Add other fields similarly... */}
            <div className="flex justify-end">
              <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                {isEditing ? "Update" : "Submit"}
              </button>
            </div>
          </form>
   
      </div>
    </div>
  );
};

export default APISwitching;
