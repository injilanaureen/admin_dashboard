import React, { useState } from 'react';
import { Wallet, List, FileText, Printer, File, Download } from 'lucide-react';

const AllWalletTransactions = () => {
  const [filters, setFilters] = useState({
    fromDate: '',
    toDate: '',
    filterText: '',
    status: '0', // Default status is 0 (All)
    pageSize: '10',
  });

  // Mock data with the required fields
  const mockData = [
    {
      id: 1,
      source: 'API Partner',
      dateTime: '2025-01-01 12:00:00',
      memberInfo: 'Member 001',
      transactionType: 'Credit',
      narration: 'Deposit',
      factor: 1.2,
      openingBal: 200.00,
      credit: 500.00,
      debit: 0.00,
      closingBal: 700.00,
      remark: 'Deposit credited to account',
    },
    {
      id: 2,
      source: 'API Partner',
      dateTime: '2025-01-02 14:30:00',
      memberInfo: 'Member 002',
      transactionType: 'Debit',
      narration: 'Withdrawal',
      factor: 1.0,
      openingBal: 700.00,
      credit: 0.00,
      debit: 300.00,
      closingBal: 400.00,
      remark: 'Amount withdrawn from account',
    },
    // Add more mock data as needed
  ];

  // Filter mock data based on the selected status (Credit or Debit)
  const filteredData = mockData.filter((transaction) => {
    if (filters.status === '1') {
      return transaction.transactionType === 'Credit';
    } else if (filters.status === '2') {
      return transaction.transactionType === 'Debit';
    }
    return true; // When status is '0', show all transactions
  });

  // Calculate total Credit and Debit amounts from the filtered data
  const totalCredit = filteredData.reduce((sum, transaction) => sum + transaction.credit, 0);
  const totalDebit = filteredData.reduce((sum, transaction) => sum + transaction.debit, 0);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSearch = () => {
    console.log('Searching with filters:', filters);
  };

  const handleExport = (type) => {
    console.log(`Exporting as ${type}`);
  };

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
      </div>
  
      <div className="flex flex-col md:flex-row lg:flex-row justify-between my-5 ">
        <div className="flex items-center space-x-4 mb-3 lg:mb-0 ">
          <span className="text-xs sm:text-base">Total Record(s): {filteredData.length}</span>
          <span className="text-xs sm:text-base">|</span>
          <button onClick={() => handleExport('excel')} className="text-green-600 text-xs sm:text-base" >
            <FileText className="w-6 h-6" />
          </button>
          <span className="text-xs sm:text-base">|</span>
          <button onClick={() => handleExport('word')} className="text-blue-600 text-xs sm:text-base">
            <Download className="w-6 h-6" />
          </button>
          <span className="text-xs sm:text-base">|</span>
          <button onClick={() => handleExport('pdf')} className="text-red-600 text-xs sm:text-base">
            <Printer className="w-6 h-6" />
          </button>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm sm:text-lg">Page Size:</span>
          <select
            name="pageSize"
            className="border rounded p-2 text-sm sm:text-base"
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
            {filteredData.length > 0 ? (
              filteredData.map((row, index) => (
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
    </div>
  );
  
};

export default AllWalletTransactions;
