import React, { useState } from "react";
import "tailwindcss/tailwind.css";

const mockData = [
  { Source: "API", DateTime: "2024-12-30 12:34:56", MemberInfo: "John Doe", Particulars: "Transaction Info", RemitterNumber: "1234567890", Amount: 100, Status: "Pending" },
  { Source: "Mobile", DateTime: "2024-12-30 13:45:00", MemberInfo: "Jane Smith", Particulars: "Transaction Info", RemitterNumber: "0987654321", Amount: 50, Status: "Pending" },
  { Source: "API", DateTime: "2024-12-30 15:30:00", MemberInfo: "Mike Johnson", Particulars: "Transaction Info", RemitterNumber: "4561237890", Amount: 75, Status: "Failure" },
];

const rowsPerPage = 5;

const PayoutPendingTransactions = () => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    dateFrom: "",
    dateTo: "",
    memberId: "",
    status: "Pending", // Default to "Pending"
  });
  const [filteredData, setFilteredData] = useState(mockData.filter((item) => item.Status === "Pending"));

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleFilter = () => {
    const { dateFrom, dateTo, memberId, status } = filters;

    const filtered = mockData.filter((item) => {
      const isDateInRange =
        (!dateFrom || new Date(item.DateTime) >= new Date(dateFrom)) &&
        (!dateTo || new Date(item.DateTime) <= new Date(dateTo));
      const isMemberMatched = !memberId || item.MemberInfo.includes(memberId);

      // Always filter for Pending status
      const isStatusMatched = item.Status === "Pending";

      return isDateInRange && isMemberMatched && isStatusMatched;
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
    <div className="p-4 md:p-10 bg-gray-100">
      <h2 className="text-xl md:text-3xl font-bold text-cyan-600 mb-4">Pending Transactions</h2>

      {/* Filters Section */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4 bg-white p-6 rounded-lg mb-4 shadow">
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
            disabled
            className="w-full border border-gray-300 p-2 rounded bg-gray-200 cursor-not-allowed"
          >
            <option value="Pending">Pending</option>
          </select>
        </div>
        <div className="col-span-1 md:col-span-4 flex justify-start">
          <button
            onClick={handleFilter}
            className="bg-cyan-600 text-white px-4 py-2 rounded"
          >
            Apply Filters
          </button>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="table-auto w-full text-left">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-3 text-xs md:text-sm">Source</th>
              <th className="p-3 text-xs md:text-sm">DateTime</th>
              <th className="p-3 text-xs md:text-sm">Member Info</th>
              <th className="p-3 text-xs md:text-sm">Particulars</th>
              <th className="p-3 text-xs md:text-sm">Remitter Number</th>
              <th className="p-3 text-xs md:text-sm">Amount</th>
              <th className="p-3 text-xs md:text-sm">Status</th>
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
                  <td className="p-3 text-xs md:text-sm">{row.Source}</td>
                  <td className="p-3 text-xs md:text-sm">{row.DateTime}</td>
                  <td className="p-3 text-xs md:text-sm">{row.MemberInfo}</td>
                  <td className="p-3 text-xs md:text-sm">{row.Particulars}</td>
                  <td className="p-3 text-xs md:text-sm">{row.RemitterNumber}</td>
                  <td className="p-3 text-xs md:text-sm">{row.Amount}</td>
                  <td className="p-3 text-xs md:text-sm text-yellow-600">{row.Status}</td>
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
      <div className="flex flex-col md:flex-row justify-between items-center mt-4 gap-2">
        <button
          className="bg-gray-300 px-4 py-2 rounded"
          disabled={currentPage === 1}
          onClick={() => handlePageChange("prev")}
        >
          Previous
        </button>
        <p className="text-sm md:text-base">
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

export default PayoutPendingTransactions;
