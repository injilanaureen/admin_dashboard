import React, { useState } from "react";
import { Wallet, List, FileText, Printer, File, Download } from "lucide-react";

const AllWalletTransactions = () => {
  const [filters, setFilters] = useState({
    fromDate: "",
    toDate: "",
    filterText: "",
    status: "0", // Default status is 0 (All)
    pageSize: "10",
  });

  // Mock data with the required fields
  const mockData = [
    {
      id: 1,
      source: "API Partner",
      dateTime: "2025-01-01 12:00:00",
      memberInfo: "Member 001",
      transactionType: "Credit",
      narration: "Deposit",
      factor: 1.2,
      openingBal: 200.0,
      credit: 500.0,
      debit: 0.0,
      closingBal: 700.0,
      remark: "Deposit credited to account",
    },
    {
      id: 2,
      source: "API Partner",
      dateTime: "2025-01-02 14:30:00",
      memberInfo: "Member 002",
      transactionType: "Debit",
      narration: "Withdrawal",
      factor: 1.0,
      openingBal: 700.0,
      credit: 0.0,
      debit: 300.0,
      closingBal: 400.0,
      remark: "Amount withdrawn from account",
    },
  ];

  const [filteredTransactions, setFilteredTransactions] = useState(mockData);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSearch = () => {
    const { fromDate, toDate, filterText, status } = filters;

    const filteredData = mockData.filter((transaction) => {
      const transactionDate = new Date(transaction.dateTime);
      const from = fromDate ? new Date(fromDate) : null;
      const to = toDate ? new Date(toDate) : null;

      const matchesDateRange =
        (!from || transactionDate >= from) &&
        (!to || transactionDate <= to);

      const matchesText =
        !filterText ||
        transaction.memberInfo
          .toLowerCase()
          .includes(filterText.toLowerCase());

      const matchesStatus =
        status === "0" ||
        (status === "1" && transaction.transactionType === "Credit") ||
        (status === "2" && transaction.transactionType === "Debit");

      return matchesDateRange && matchesText && matchesStatus;
    });

    setFilteredTransactions(filteredData);
  };

  const handleExport = (type) => {
    console.log(`Exporting as ${type}`);
  };

  const totalCredit = filteredTransactions.reduce(
    (sum, transaction) => sum + transaction.credit,
    0
  );
  const totalDebit = filteredTransactions.reduce(
    (sum, transaction) => sum + transaction.debit,
    0
  );

  return (
    <div className="bg-white p-4">
      {/* Wallet System Heading */}
      <div className="text-xl sm:text-2xl font-semibold mb-4 flex items-center space-x-2">
        <Wallet className="text-blue-600 w-6 h-6" />
        <span>Wallet System</span>
      </div>

      {/* Filters Section */}
      <div className="border rounded p-4 mb-5">
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm sm:text-lg">From Date:</span>
            <input
              type="date"
              name="fromDate"
              className="border rounded p-2 text-sm sm:text-base"
              value={filters.fromDate}
              onChange={handleFilterChange}
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm sm:text-lg">To Date:</span>
            <input
              type="date"
              name="toDate"
              className="border rounded p-2 text-sm sm:text-base"
              value={filters.toDate}
              onChange={handleFilterChange}
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm sm:text-lg">Filter Text:</span>
            <input
              type="text"
              name="filterText"
              className="border rounded p-2 text-sm sm:text-base"
              value={filters.filterText}
              onChange={handleFilterChange}
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm sm:text-lg">Status:</span>
            <select
              name="status"
              className="border rounded p-2 text-sm sm:text-base"
              value={filters.status}
              onChange={handleFilterChange}
            >
              <option value="0">All</option>
              <option value="1">Credit</option>
              <option value="2">Debit</option>
            </select>
          </div>
        </div>
        <button
          className="mt-4 bg-cyan-600 text-white p-2 rounded"
          onClick={handleSearch}
        >
          Apply Filters
        </button>
      </div>

      {/* Total Credit and Debit Section */}
      <div className="flex flex-col md:flex-row lg:flex-row items-center mb-4">
        <div className="bg-green-200 w-full sm:w-1/2 p-2 text-center text-xs sm:text-sm">
          Total Credit Amt: <strong>{totalCredit.toFixed(2)}</strong>
        </div>
        <div className="bg-red-200 w-full sm:w-1/2 p-2 text-center text-xs sm:text-sm">
          Total Debit Amt: <strong>{totalDebit.toFixed(2)}</strong>
        </div>
      </div>

      {/* Transaction Data Table */}
      <div className="overflow-x-auto">
        <table className="w-full border text-xs sm:text-sm">
          <thead>
            <tr className="bg-gray-50">
              <th className="p-3 text-left">S. No</th>
              <th className="p-3 text-left">Source</th>
              <th className="p-3 text-left">DateTime</th>
              <th className="p-3 text-left">Member Info</th>
              <th className="p-3 text-left">Transaction Type</th>
              <th className="p-3 text-left">Narration</th>
              <th className="p-3 text-left">Factor</th>
              <th className="p-3 text-left">Opening Balance</th>
              <th className="p-3 text-left">Credit</th>
              <th className="p-3 text-left">Debit</th>
              <th className="p-3 text-left">Closing Balance</th>
              <th className="p-3 text-left">Remark</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.length > 0 ? (
              filteredTransactions.map((row, index) => (
                <tr key={index} className="border-t">
                  <td className="p-3">{index + 1}</td>
                  <td className="p-3">{row.source}</td>
                  <td className="p-3">{row.dateTime}</td>
                  <td className="p-3">{row.memberInfo}</td>
                  <td className="p-3">{row.transactionType}</td>
                  <td className="p-3">{row.narration}</td>
                  <td className="p-3">{row.factor}</td>
                  <td className="p-3">{row.openingBal.toFixed(2)}</td>
                  <td className="p-3">{row.credit.toFixed(2)}</td>
                  <td className="p-3">{row.debit.toFixed(2)}</td>
                  <td className="p-3">{row.closingBal.toFixed(2)}</td>
                  <td className="p-3">{row.remark}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="12" className="p-3 text-center text-gray-500">
                  No Record Found!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Export Buttons */}
      <div className="flex justify-end mt-4">
        <button onClick={() => handleExport("excel")} className="text-green-600">
          <FileText className="w-6 h-6" />
        </button>
        <button onClick={() => handleExport("word")} className="text-blue-600 mx-2">
          <Download className="w-6 h-6" />
        </button>
        <button onClick={() => handleExport("pdf")} className="text-red-600">
          <Printer className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default AllWalletTransactions;
