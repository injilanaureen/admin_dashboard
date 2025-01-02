import React, { useState } from "react";
import { FileText, Download, Printer } from "lucide-react";

import "tailwindcss/tailwind.css";

const mockData = [
  { Source: "API", DateTime: "2024-12-30 12:34:56", MemberInfo: "John Doe", Particulars: "Transaction Info", RemitterNumber: "1234567890", Amount: 100, Status: "Reported", ServiceType: "Mobile Prepaid", TransID: "T123", OperatorRef: "O123" },
  { Source: "Mobile", DateTime: "2024-12-30 13:45:00", MemberInfo: "Jane Smith", Particulars: "Transaction Info", RemitterNumber: "0987654321", Amount: 50, Status: "Processed", ServiceType: "DTH", TransID: "T124", OperatorRef: "O124" },
  { Source: "API", DateTime: "2024-12-30 15:30:00", MemberInfo: "Mike Johnson", Particulars: "Transaction Info", RemitterNumber: "4561237890", Amount: 75, Status: "Resolved", ServiceType: "Electricity", TransID: "T125", OperatorRef: "O125" },
];

const rowsPerPage = 5;

const UpiDisputeTransactions = () => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    dateFrom: "",
    dateTo: "",
    memberId: "",
    disputeStatus: "Reported", // Default to "Reported"
    serviceType: "",
  });
  const [filteredData, setFilteredData] = useState(mockData.filter((item) => item.Status === "Reported"));

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };
  const handleExport = (type) => {
    console.log(`Exporting as ${type}`, filteredData);
    // Implement export functionality
  };

  

  const handleFilter = () => {
    const { dateFrom, dateTo, memberId, disputeStatus, serviceType } = filters;

    const filtered = mockData.filter((item) => {
      const isDateInRange =
        (!dateFrom || new Date(item.DateTime) >= new Date(dateFrom)) &&
        (!dateTo || new Date(item.DateTime) <= new Date(dateTo));
      const isMemberMatched = !memberId || item.MemberInfo.includes(memberId);
      const isStatusMatched = item.Status === disputeStatus;
      const isServiceTypeMatched = !serviceType || item.ServiceType === serviceType;

      return isDateInRange && isMemberMatched && isStatusMatched && isServiceTypeMatched;
    });

    setFilteredData(filtered);
    setCurrentPage(1);
  };

  const handleRowClick = (index) => {
    if (selectedRows.includes(index)) {
      setSelectedRows(selectedRows.filter((row) => row !== index));
    } else {
      setSelectedRows([...selectedRows, index]);
    }
  };

  const handlePageChange = (direction) => {
    if (direction === "next" && currentPage < Math.ceil(filteredData.length / rowsPerPage)) {
      setCurrentPage(currentPage + 1);
    } else if (direction === "prev" && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const paginatedData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  return (
    <div className="p-6 md:p-10 m-4 bg-gray-100">
      <h2 className="text-3xl font-bold text-cyan-600 mb-4">Dispute Transactions</h2>

      {/* Filters Section */}
      <h3 className="text-xl font-bold text-black mb-4">⁜ Dispute Transactions</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 bg-white p-6 rounded-lg mb-4 shadow">
  <div>
    <label className="block text-gray-700 font-medium mb-1">Date From</label>
    <input
      type="date"
      name="dateFrom"
      value={filters.dateFrom}
      onChange={handleFilterChange}
      className="w-full border border-gray-300 p-2 rounded"
    />
  </div>
  <div>
    <label className="block text-gray-700 font-medium mb-1">Date To</label>
    <input
      type="date"
      name="dateTo"
      value={filters.dateTo}
      onChange={handleFilterChange}
      className="w-full border border-gray-300 p-2 rounded"
    />
  </div>
  <div>
    <label className="block text-gray-700 font-medium mb-1">Member ID</label>
    <input
      type="text"
      name="memberId"
      value={filters.memberId}
      onChange={handleFilterChange}
      placeholder="Enter Member ID"
      className="w-full border border-gray-300 p-2 rounded"
    />
  </div>
  <div>
    <label className="block text-gray-700 font-medium mb-1">Dispute Status</label>
    <select
      name="disputeStatus"
      value={filters.disputeStatus}
      onChange={handleFilterChange}
      className="w-full border border-gray-300 p-2 rounded"
    >
      <option value="Reported">Reported</option>
      <option value="Processed">Processed</option>
      <option value="Resolved">Resolved</option>
    </select>
  </div>
  <div>
    <label className="block text-gray-700 font-medium mb-1">Service Type</label>
    <select
      name="serviceType"
      value={filters.serviceType}
      onChange={handleFilterChange}
      className="w-full border border-gray-300 p-2 rounded"
    >
      <option value="">- Select Service Type Name -</option>
      <option value="Mobile Prepaid">Mobile Prepaid</option>
      <option value="Mobile Postpaid">Mobile Postpaid</option>
      <option value="DTH">DTH</option>
      <option value="Datacard Prepaid">Datacard Prepaid</option>
      <option value="Landline">Landline</option>
      <option value="Electricity">Electricity</option>
      <option value="Piped GAS">Piped GAS</option>
      <option value="Insurance">Insurance</option>
      <option value="Other Services">Other Services</option>
      <option value="Datacard Postpaid">Datacard Postpaid</option>
      <option value="Water">Water</option>
      <option value="Broadband">Broadband</option>
      <option value="FASTag">FASTag</option>
      <option value="Collections">Collections</option>
      <option value="Loan Repayment">Loan Repayment</option>
      <option value="LPG Cylinder">LPG Cylinder</option>
      <option value="Google Play Recharge">Google Play Recharge</option>
      <option value="Express Payout">Express Payout</option>
    </select>
  </div>
  <div>
    <label className="block text-gray-700 font-medium mb-1">API</label>
    <select
      name="api"
      id="ddlAPI"
      className="w-full border border-gray-300 p-2 rounded"
      value={filters.api}
      onChange={handleFilterChange}
    >
      <option value="- Select API -">- Select API -</option>
      <option value="3">Pgpe API</option>
      <option value="1">EMANTOR API</option>
    </select>
  </div>
  <div className="col-span-1 sm:col-span-2 md:col-span-1 flex justify-start">
    <button
      onClick={handleFilter}
      className="bg-cyan-600 text-white px-4 py-1 rounded"
    >
      Apply Filters
    </button>
  </div>
</div>
<div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-4">
            <span>Total Records: {filteredData.length}</span>
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
    {/* Table Section */}
<div className="bg-white rounded-lg shadow overflow-x-auto">

  <table className="table-auto w-full text-left">
    <thead>
      <tr className="bg-gray-200">
        <th className="p-3 text-sm sm:text-base">S.No</th>
        <th className="p-3 text-sm sm:text-base">Member Info</th>
        <th className="p-3 text-sm sm:text-base">Remitter Number</th>
        <th className="p-3 text-sm sm:text-base">Amount</th>
        <th className="p-3 text-sm sm:text-base">TransID</th>
        <th className="p-3 text-sm sm:text-base">Operator Ref</th>
        <th className="p-3 text-sm sm:text-base text-yellow-600">Dispute Status</th>
        <th className="p-3 text-sm sm:text-base">Request DateTime</th>
      </tr>
    </thead>
    <tbody>
      {paginatedData.length > 0 ? (
        paginatedData.map((row, index) => (
          <tr
            key={index}
            className={`cursor-pointer ${selectedRows.includes(index) ? "bg-blue-100" : ""}`}
            onClick={() => handleRowClick(index)}
          >
            <td className="p-3 text-sm sm:text-base">{index + 1}</td>
            <td className="p-3 text-sm sm:text-base">{row.MemberInfo}</td>
            <td className="p-3 text-sm sm:text-base">{row.RemitterNumber}</td>
            <td className="p-3 text-sm sm:text-base">{row.Amount}</td>
            <td className="p-3 text-sm sm:text-base">{row.TransID}</td>
            <td className="p-3 text-sm sm:text-base">{row.OperatorRef}</td>
            <td className="p-3 text-sm sm:text-base text-yellow-600">{row.Status}</td>
            <td className="p-3 text-sm sm:text-base">{row.DateTime}</td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan="8" className="p-3 text-center text-gray-500">
            No record found!
          </td>
        </tr>
      )}
    </tbody>
  </table>
</div>


      {/* Pagination Section */}
      <div className="flex justify-between items-center mt-4  sm:flex-row">
        <button
          className="bg-gray-300 px-4 py-2 rounded"
          disabled={currentPage === 1}
          onClick={() => handlePageChange("prev")}
        >
          Previous
        </button>
        <p>
          Page {currentPage} of {Math.ceil(filteredData.length / rowsPerPage)}
        </p>
        <button
          className="bg-gray-300 px-4 py-2 rounded"
          disabled={currentPage === Math.ceil(filteredData.length / rowsPerPage)}
          onClick={() => handlePageChange("next")}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default UpiDisputeTransactions;
