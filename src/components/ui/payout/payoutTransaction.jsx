import React, { useState } from "react";
import "tailwindcss/tailwind.css";

const mockData = [
  { Source: "API", DateTime: "2024-12-30 12:34:56", MemberInfo: "John Doe", Particulars: "Transaction Info", RemitterNumber: "1234567890", Amount: 100, APIID: "API123", TxnID: "TXN001", Status: "Success", APITxnID: "API-TXN001", OperatorRef: "OP001", APIMessage: "Transaction Successful", CustomerNumber: "9876543210", ReceiverInfo: "Receiver Name" },
  { Source: "Mobile", DateTime: "2024-12-30 13:45:00", MemberInfo: "Jane Smith", Particulars: "Transaction Info", RemitterNumber: "0987654321", Amount: 50, APIID: "API124", TxnID: "TXN002", Status: "Pending", APITxnID: "API-TXN002", OperatorRef: "OP002", APIMessage: "Transaction Pending", CustomerNumber: "1234567890", ReceiverInfo: "Receiver Name" },
  { Source: "API", DateTime: "2024-12-30 15:30:00", MemberInfo: "Mike Johnson", Particulars: "Transaction Info", RemitterNumber: "4561237890", Amount: 75, APIID: "API125", TxnID: "TXN003", Status: "Failure", APITxnID: "API-TXN003", OperatorRef: "OP003", APIMessage: "Transaction Failed", CustomerNumber: "4567891230", ReceiverInfo: "Receiver Name" },
];

const rowsPerPage = 5;

const PayoutTransactions = () => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    dateFrom: "",
    dateTo: "",
    memberId: "",
    status: "",
    api: "",
  });
  const [filteredData, setFilteredData] = useState(mockData);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleFilter = () => {
    const { dateFrom, dateTo, memberId, status, api } = filters;

    const filtered = mockData.filter((item) => {
      const isDateInRange =
        (!dateFrom || new Date(item.DateTime) >= new Date(dateFrom)) &&
        (!dateTo || new Date(item.DateTime) <= new Date(dateTo));
      const isMemberMatched = !memberId || item.MemberInfo.includes(memberId);
      const isStatusMatched = !status || item.Status === status;
      const isApiMatched = !api || item.APIID === api;

      return isDateInRange && isMemberMatched && isStatusMatched && isApiMatched;
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

  const totalSuccess = filteredData.filter((data) => data.Status === "Success").length;
  const totalPending = filteredData.filter((data) => data.Status === "Pending").length;
  const totalFailure = filteredData.filter((data) => data.Status === "Failure").length;

  return (
    <div className="p-6 sm:p-10 m-4 bg-gray-100">
      <h2 className="text-2xl sm:text-3xl font-bold text-cyan-600 mb-4">
        Payout Transactions
      </h2>
  
      {/* Filters Section */}
      <h3 className="text-lg sm:text-xl font-bold text-black mb-4">
        ⁜ All Payout Transactions
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 bg-white p-4 sm:p-6 rounded-lg mb-4 shadow">
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
          <label className="block text-gray-700 font-medium mb-1">Status</label>
          <select
            name="status"
            value={filters.status}
            onChange={handleFilterChange}
            className="w-full border border-gray-300 p-2 rounded"
          >
            <option value="">- All Status -</option>
            <option value="Success">Success</option>
            <option value="Pending">Pending</option>
            <option value="Failure">Failure</option>
          </select>
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-1">API</label>
          <select
            name="api"
            value={filters.api}
            onChange={handleFilterChange}
            className="w-full border border-gray-300 p-2 rounded"
          >
            <option value="">- Select API -</option>
            <option value="API123">API123</option>
            <option value="API124">API124</option>
            <option value="API125">API125</option>
          </select>
        </div>
        <div className="col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-1 flex justify-start">
          <button
            onClick={handleFilter}
            className="bg-cyan-600 text-white px-4 py-2 rounded w-full sm:w-auto"
          >
            Apply Filters
          </button>
        </div>
      </div>
  
      {/* Totals Section */}
      <div className="flex flex-col sm:flex-row justify-between items-center bg-white p-4 rounded-lg mb-4 shadow">
        <p className="text-green-600 font-bold">Success: {totalSuccess}</p>
        <p className="text-yellow-600 font-bold">Pending: {totalPending}</p>
        <p className="text-red-600 font-bold">Failure: {totalFailure}</p>
      </div>
  
      {/* Table Section */}
      {/* Table Section */}
<div className="bg-white rounded-lg shadow overflow-x-auto">
  <table className="table-auto w-full text-left text-sm">
    <thead>
      <tr className="bg-gray-200">
        <th className="p-2 sm:p-3">Source</th>
        <th className="p-2 sm:p-3">DateTime</th>
        <th className="p-2 sm:p-3">Member Info</th>
        <th className="p-2 sm:p-3">Particulars</th>
        <th className="p-2 sm:p-3">Remitter Number</th>
        <th className="p-2 sm:p-3">Amount</th>
        <th className="p-2 sm:p-3">Status</th>
      </tr>
    </thead>
    <tbody>
      {paginatedData.length > 0 ? (
        paginatedData.map((row, index) => (
          <tr
            key={index}
            className={`cursor-pointer ${
              selectedRows.includes(index) ? "bg-blue-100" : ""
            }`}
            onClick={() => handleRowClick(index)}
          >
            <td className="p-2 sm:p-3">{row.Source}</td>
            <td className="p-2 sm:p-3">{row.DateTime}</td>
            <td className="p-2 sm:p-3">{row.MemberInfo}</td>
            <td className="p-2 sm:p-3">{row.Particulars}</td>
            <td className="p-2 sm:p-3">{row.RemitterNumber}</td>
            <td className="p-2 sm:p-3">{row.Amount}</td>
            <td
              className={`p-2 sm:p-3 ${
                row.Status === "Success"
                  ? "text-green-600"
                  : row.Status === "Pending"
                  ? "text-yellow-600"
                  : "text-red-600"
              }`}
            >
              {row.Status}
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan="7" className="p-3 text-center text-gray-500">
            No record found!
          </td>
        </tr>
      )}
    </tbody>
  </table>
</div>

  
      {/* Pagination Section */}
      <div className="flex flex-col sm:flex-row justify-between items-center mt-4 space-y-4 sm:space-y-0">
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

export default PayoutTransactions;
