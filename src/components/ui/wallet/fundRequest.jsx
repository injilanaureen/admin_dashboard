import React, { useState, useEffect, useMemo } from 'react';
import { FileText, Download, Printer, Logs } from "lucide-react";

const MemberFundRequest = () => {
  const [filters, setFilters] = useState({
    fromDate: '',
    toDate: '',
    filterText: '',
    status: '0',
    pageSize: '10'
  });
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const mockData = Array.from({ length: 100 }, (_, i) => ({
      sNo: i + 1,
      memberId: `MID${1000 + i}`,
      memberName: `Member ${i + 1}`,
      toBank: `Bank ${i % 5 + 1}`,
      amount: (i + 1) * 100,
      transactionId: `TXN${i + 1}`,
      status: ['Approved', 'Pending', 'Rejected'][i % 3],
      requestDate: new Date(Date.now() - i * 86400000).toISOString().split('T')[0],
      action: 'View Details'
    }));
    setData(mockData);
    setFilteredData(mockData);
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSearch = () => {
    const { fromDate, toDate, filterText, status } = filters;
    const filtered = data.filter((item) => {
      const matchesDate =
        (!fromDate || new Date(item.requestDate) >= new Date(fromDate)) &&
        (!toDate || new Date(item.requestDate) <= new Date(toDate));
      const matchesText =
        !filterText ||
        item.memberName.toLowerCase().includes(filterText.toLowerCase()) ||
        item.memberId.toLowerCase().includes(filterText.toLowerCase());
      const matchesStatus = status === '0' || item.status === status;

      return matchesDate && matchesText && matchesStatus;
    });
    setFilteredData(filtered);
  };

  const handleExport = (type) => {
    console.log(`Exporting as ${type}`);
  };

  const paginatedData = useMemo(() => {
    const pageSize = parseInt(filters.pageSize, 10);
    return filteredData.slice(0, pageSize);
  }, [filteredData, filters.pageSize]);

  return (
    <div className="bg-white p-4">
      <div className="flex gap-2 mb-5 text-2xl items-center">
        <Logs className="w-6 h-6" />
        <h2>Members Fund Request</h2>
      </div>
  
      <div className="flex flex-wrap gap-4 mb-4">
        <div className="flex flex-col sm:flex-row items-center gap-2 w-full sm:w-auto">
          <span className="text-lg">From Date:</span>
          <input
            type="date"
            name="fromDate"
            className="border rounded p-2 w-full sm:w-40"
            value={filters.fromDate}
            onChange={handleFilterChange}
          />
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-2 w-full sm:w-auto">
          <span className="text-lg">To Date:</span>
          <input
            type="date"
            name="toDate"
            className="border rounded p-2 w-full sm:w-40"
            value={filters.toDate}
            onChange={handleFilterChange}
          />
        </div>
        <input
          type="text"
          name="filterText"
          className="border rounded p-2 w-full sm:w-60"
          placeholder="Search Text"
          value={filters.filterText}
          onChange={handleFilterChange}
        />
        <div className="flex flex-col sm:flex-row items-center gap-2 w-full sm:w-auto">
          <select
            name="status"
            className="border rounded p-2 w-full sm:w-40"
            value={filters.status}
            onChange={handleFilterChange}
          >
            <option value="0">- Select Status -</option>
            <option value="Approved">Approved</option>
            <option value="Pending">Pending</option>
            <option value="Rejected">Rejected</option>
          </select>
          <button
            onClick={handleSearch}
            className="bg-cyan-600 text-white p-2 rounded hover:bg-blue-700 w-full sm:w-auto"
          >
            Search
          </button>
        </div>
      </div>
  
      <div className="border rounded">
        <div className="p-4 flex flex-col md:flex-row justify-between items-center border-b">
          <div className="flex items-center space-x-4">
            <span>Total Record(s): {filteredData.length}</span>
            <button onClick={() => handleExport('excel')} className="text-green-600">
              <FileText className="w-6 h-6" />
            </button>
            <button onClick={() => handleExport('word')} className="text-blue-600">
              <Download className="w-6 h-6" />
            </button>
            <button onClick={() => handleExport('pdf')} className="text-red-600">
              <Printer className="w-6 h-6" />
            </button>
          </div>
          <div className="flex items-center mt-4 md:mt-0">
            <span className="mr-2">Page Size:</span>
            <select
              name="pageSize"
              className="border rounded p-1 w-full sm:w-32"
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
  
        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-50">
                <th className="p-3 text-left text-sm">S. No</th>
                <th className="p-3 text-left text-sm">MemberID</th>
                <th className="p-3 text-left text-sm">MemberName</th>
                <th className="p-3 text-left text-sm">To Bank</th>
                <th className="p-3 text-left text-sm">Amount</th>
                <th className="p-3 text-left text-sm">TransactionID / ChequeNo</th>
                <th className="p-3 text-left text-sm">Status</th>
                <th className="p-3 text-left text-sm">Request Date</th>
                <th className="p-3 text-left text-sm">Action</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.length > 0 ? (
                paginatedData.map((row, index) => (
                  <tr key={index} className="border-t text-sm">
                    <td className="p-3">{row.sNo}</td>
                    <td className="p-3">{row.memberId}</td>
                    <td className="p-3">{row.memberName}</td>
                    <td className="p-3">{row.toBank}</td>
                    <td className="p-3">{row.amount}</td>
                    <td className="p-3">{row.transactionId}</td>
                    <td className="p-3">{row.status}</td>
                    <td className="p-3">{row.requestDate}</td>
                    <td className="p-3">{row.action}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" className="p-3 text-center text-gray-500">
                    No Record Found!
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

export default MemberFundRequest;