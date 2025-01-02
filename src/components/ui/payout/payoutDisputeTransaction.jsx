import React, { useState } from "react";
import "tailwindcss/tailwind.css";

// Mock Dispute Transaction Data
const mockData = [
  { 
    SNo: 1, 
    MemberInfo: "John Doe", 
    PayeeUPIAddress: "john@upi", 
    Amount: 100, 
    Provider: "Mobile Prepaid", 
    TransID: "T123", 
    APITxnID: "API123", 
    OperatorRef: "O123", 
    DisputeStatus: "Reported", 
    RequestDateTime: "2024-12-30 12:34:56"
  },
  { 
    SNo: 2, 
    MemberInfo: "Jane Smith", 
    PayeeUPIAddress: "jane@upi", 
    Amount: 50, 
    Provider: "DTH", 
    TransID: "T124", 
    APITxnID: "API124", 
    OperatorRef: "O124", 
    DisputeStatus: "Resolved", 
    RequestDateTime: "2024-12-30 13:45:00"
  },
  { 
    SNo: 3, 
    MemberInfo: "Mike Johnson", 
    PayeeUPIAddress: "mike@upi", 
    Amount: 75, 
    Provider: "Electricity", 
    TransID: "T125", 
    APITxnID: "API125", 
    OperatorRef: "O125", 
    DisputeStatus: "Reported", 
    RequestDateTime: "2024-12-30 15:30:00"
  },
];

const rowsPerPage = 5;

const DisputeTransactions = () => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    disputeStatus: "Reported", // Default to "Reported"
  });
  const [filteredData, setFilteredData] = useState(mockData.filter((item) => item.DisputeStatus === "Reported"));

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleFilter = () => {
    const { disputeStatus } = filters;

    const filtered = mockData.filter((item) => item.DisputeStatus === disputeStatus);
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
      <div className="mb-6">
        <label htmlFor="disputeStatus" className="mr-2">Dispute Status:</label>
        <select
          id="disputeStatus"
          name="disputeStatus"
          value={filters.disputeStatus}
          onChange={handleFilterChange}
          className="p-2 border rounded"
        >
          <option value="Reported">Reported</option>
          <option value="Resolved">Resolved</option>
          <option value="Pending">Pending</option>
        </select>
        <button
          onClick={handleFilter}
          className="ml-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Filter
        </button>
      </div>

      {/* Table Section */}
      <table className="min-w-full table-auto bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="px-4 py-2 border-b text-left">S.No</th>
            <th className="px-4 py-2 border-b text-left">Member Info</th>
            <th className="px-4 py-2 border-b text-left">Payee UPI Address</th>
            <th className="px-4 py-2 border-b text-left">Amount</th>
            <th className="px-4 py-2 border-b text-left">Provider</th>
            <th className="px-4 py-2 border-b text-left">TransID</th>
            <th className="px-4 py-2 border-b text-left">APITxnID</th>
            <th className="px-4 py-2 border-b text-left">OperatorRef</th>
            <th className="px-4 py-2 border-b text-left">Dispute Status</th>
            <th className="px-4 py-2 border-b text-left">Request DateTime</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((item, index) => (
            <tr
              key={item.TransID}
              className={`cursor-pointer ${selectedRows.includes(index) ? "bg-gray-200" : ""}`}
              onClick={() => handleRowClick(index)}
            >
              <td className="px-4 py-2 border-b">{item.SNo}</td>
              <td className="px-4 py-2 border-b">{item.MemberInfo}</td>
              <td className="px-4 py-2 border-b">{item.PayeeUPIAddress}</td>
              <td className="px-4 py-2 border-b">{item.Amount}</td>
              <td className="px-4 py-2 border-b">{item.Provider}</td>
              <td className="px-4 py-2 border-b">{item.TransID}</td>
              <td className="px-4 py-2 border-b">{item.APITxnID}</td>
              <td className="px-4 py-2 border-b">{item.OperatorRef}</td>
              <td className="px-4 py-2 border-b">{item.DisputeStatus}</td>
              <td className="px-4 py-2 border-b">{item.RequestDateTime}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Section */}
      <div className="mt-4">
        <button
          onClick={() => handlePageChange("prev")}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-300 rounded"
        >
          Previous
        </button>
        <span className="mx-4">{`Page ${currentPage} of ${Math.ceil(filteredData.length / rowsPerPage)}`}</span>
        <button
          onClick={() => handlePageChange("next")}
          disabled={currentPage === Math.ceil(filteredData.length / rowsPerPage)}
          className="px-4 py-2 bg-gray-300 rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default DisputeTransactions;
