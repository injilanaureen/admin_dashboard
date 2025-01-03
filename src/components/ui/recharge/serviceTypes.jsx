import React, { useEffect, useState } from "react";
import { FileText, Printer, Download, Cable } from "lucide-react";

export default function ManageServiceTypes() {
  const [showTable, setShowTable] = useState(true); // Toggle between table and add user
  const [newServiceType, setNewServiceType] = useState("");
  const [newPosition, setNewPosition] = useState("");
  const [newSectionType, setNewSectionType] = useState("");
  const [serviceTypeImage, setServiceTypeImage] = useState(null); // File input
  const [data, setData] = useState([]); // Data for mock table
  const [currentPage, setCurrentPage] = useState(1); // Pagination
  const itemsPerPage = 10;

  useEffect(() => {
    const mockData = [
      { sNo: 1, serviceTypeName: "Express Payout", position: 38, sectionType: "Financial Services", date: "6/22/2024 1:52:48 PM", status: "Active" },
      { sNo: 2, serviceTypeName: "Google Play Recharge", position: 36, sectionType: "Recharge & Bill Payments", date: "8/20/2021 6:40:34 PM", status: "Active" },
      { sNo: 3, serviceTypeName: "LPG Cylinder", position: 32, sectionType: "Recharge & Bill Payments", date: "4/5/2021 4:17:15 PM", status: "Active" },
      { sNo: 4, serviceTypeName: "Loan Repayment", position: 31, sectionType: "Recharge & Bill Payments", date: "4/5/2021 4:17:15 PM", status: "Active" },
      { sNo: 5, serviceTypeName: "Collections", position: 30, sectionType: "Citizen Services", date: "2/11/2021 5:46:28 PM", status: "Active" },
      { sNo: 6, serviceTypeName: "FASTag", position: 25, sectionType: "Recharge & Bill Payments", date: "12/23/2019 10:28:39 AM", status: "Active" },
      { sNo: 7, serviceTypeName: "Broadband", position: 7, sectionType: "Recharge & Bill Payments", date: "9/27/2019 1:54:02 PM", status: "Active" },
      { sNo: 8, serviceTypeName: "Water", position: 11, sectionType: "Recharge & Bill Payments", date: "9/27/2019 1:53:36 PM", status: "Active" },
      { sNo: 9, serviceTypeName: "Datacard Postpaid", position: 5, sectionType: "Recharge & Bill Payments", date: "9/27/2019 1:53:18 PM", status: "Active" },
      { sNo: 10, serviceTypeName: "Other Services", position: 12, sectionType: "Citizen Services", date: "9/27/2019 1:52:48 PM", status: "Active" },
      { sNo: 11, serviceTypeName: "Insurance", position: 10, sectionType: "Recharge & Bill Payments", date: "9/27/2019 1:51:51 PM", status: "Active" },
      { sNo: 12, serviceTypeName: "Piped GAS", position: 9, sectionType: "Recharge & Bill Payments", date: "9/27/2019 1:51:34 PM", status: "Active" },
      { sNo: 13, serviceTypeName: "Electricity", position: 8, sectionType: "Recharge & Bill Payments", date: "9/27/2019 1:51:12 PM", status: "Active" },
      { sNo: 14, serviceTypeName: "Landline", position: 6, sectionType: "Recharge & Bill Payments", date: "9/27/2019 1:50:56 PM", status: "Active" },
      { sNo: 15, serviceTypeName: "Datacard Prepaid", position: 4, sectionType: "Recharge & Bill Payments", date: "9/27/2019 1:50:27 PM", status: "Active" },
      { sNo: 16, serviceTypeName: "DTH", position: 3, sectionType: "Recharge & Bill Payments", date: "9/27/2019 1:50:08 PM", status: "Active" },
      { sNo: 17, serviceTypeName: "Mobile Postpaid", position: 2, sectionType: "Recharge & Bill Payments", date: "9/27/2019 1:48:09 PM", status: "Active" },
      { sNo: 18, serviceTypeName: "Mobile Prepaid", position: 1, sectionType: "Recharge & Bill Payments", date: "9/27/2019 1:46:53 PM", status: "Active" },
    ];
    setData(mockData);
  }, []);

  const handleExport = (type) => {
    console.log(`Exporting as ${type}`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!newServiceType.trim() || !newPosition.trim() || !newSectionType.trim()) {
      alert("Please fill all the required fields marked with *");
      return;
    }

    if (!serviceTypeImage) {
      alert("Please upload a service type image.");
      return;
    }

    const newEntry = {
      sNo: data.length + 1,
      serviceTypeName: newServiceType,
      position: newPosition,
      sectionType: newSectionType,
      date: new Date().toLocaleString(),
      status: "Active",
    };

    setData((prev) => [...prev, newEntry]);
    setNewServiceType("");
    setNewPosition("");
    setNewSectionType("");
    setServiceTypeImage(null);
    alert("New service type added successfully!");
  };

  const handleReset = () => {
    setNewServiceType("");
    setNewPosition("");
    setNewSectionType("");
    setServiceTypeImage(null);
  };

  const currentData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(data.length / itemsPerPage);

  return (
    <div className="m-10">
      <div className="text-xl sm:text-2xl font-semibold mb-4 flex items-center space-x-2">
        <Cable className="w-6 h-6" />
        <span>Recharge System</span>
      </div>

      <div className="p-3 flex flex-col gap-6 bg-white">
        <div className="flex items-start sm:w-1/4 w-full mb-6 rounded-lg">
          <button
            onClick={() => setShowTable(true)}
            className={`px-4 py-2 border-l-2 border-cyan-600 font-medium w-full sm:w-auto ${
              showTable
                ? "bg-primary-color shadow-lg ring-2 ring-cyan-500"
                : "bg-tertiary-color text-black hover:bg-primary-color hover:ring-cyan-700"
            } hover:opacity-90 transition duration-300`}
          >
            + List Service Type
          </button>
          <button
            onClick={() => setShowTable(false)}
            className={`px-4 py-2 border-r-2 border-cyan-600 font-medium w-full sm:w-auto ${
              !showTable
                ? "bg-primary-color shadow-lg ring-2 ring-cyan-500"
                : "bg-tertiary-color text-black hover:bg-primary-color hover:ring-cyan-700"
            } hover:opacity-90 transition duration-300`}
          >
            + Add Service Type
          </button>
        </div>

         {/* Export Buttons */}
         <div className="p-4 flex flex-col md:flex-row justify-between items-center border-b">
          <div className="flex items-center space-x-4">
            <span>Total Record(s): {data.length}</span>
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

        {showTable ? (
          <div>
            <table className="min-w-full border-collapse border border-gray-200 text-sm text-gray-600">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border border-gray-200 py-2 px-2">S. No</th>
                  <th className="border border-gray-200 py-2 px-2">Service Type Name</th>
                  <th className="border border-gray-200 py-2 px-2">Position</th>
                  <th className="border border-gray-200 py-2 px-2">Section Type</th>
                  <th className="border border-gray-200 py-2 px-2">Date</th>
                  <th className="border border-gray-200 py-2 px-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {currentData.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="border border-gray-200 py-2 px-2 text-center">{item.sNo}</td>
                    <td className="border border-gray-200 py-2 px-2 text-center">{item.serviceTypeName}</td>
                    <td className="border border-gray-200 py-2 px-2 text-center">{item.position}</td>
                    <td className="border border-gray-200 py-2 px-2 text-center">{item.sectionType}</td>
                    <td className="border border-gray-200 py-2 px-2 text-center">{item.date}</td>
                    <td className="border border-gray-200 py-2 px-2 text-center">{item.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-4 flex justify-between items-center">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-cyan-600 text-white rounded-md"
              >
                Previous
              </button>
              <span>
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-cyan-600 text-white rounded-md"
              >
                Next
              </button>
            </div>
          </div>
        ) : (
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4 pl-2">Add Service Type</h3>
            <form onSubmit={handleSubmit} className="space-y-4 p-4">
              <div className="flex flex-col items-start gap-3">
                <label className="text-gray-700 font-medium mb-1">
                  Service Type Name <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  value={newServiceType}
                  onChange={(e) => setNewServiceType(e.target.value)}
                  placeholder="Enter service type name"
                  className="w-full sm:w-3/4 border border-gray-300 rounded-lg px-3 py-2"
                />

                <label className="text-gray-700 font-medium mb-1">
                  Position <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  value={newPosition}
                  onChange={(e) => setNewPosition(e.target.value)}
                  placeholder="Enter position"
                  className="w-full sm:w-3/4 border border-gray-300 rounded-lg px-3 py-2"
                />

                <label className="text-gray-700 font-medium mb-1">
                  Section Type <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  value={newSectionType}
                  onChange={(e) => setNewSectionType(e.target.value)}
                  placeholder="Enter section type"
                  className="w-full sm:w-3/4 border border-gray-300 rounded-lg px-3 py-2"
                />

                <label className="text-gray-700 font-medium mb-1">
                  Service Type Image
                </label>
                <input
                  type="file"
                  onChange={(e) => setServiceTypeImage(e.target.files[0])}
                  className="w-full sm:w-3/4 border border-gray-300 rounded-lg px-3 py-2"
                />
              </div>
              <div className="flex gap-2">
                <button type="submit" className="px-4 py-2 bg-cyan-600 text-white rounded-lg">
                  Submit
                </button>
                <button type="button" onClick={handleReset} className="px-4 py-2 bg-red-600 text-white rounded-lg">
                  Reset
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
