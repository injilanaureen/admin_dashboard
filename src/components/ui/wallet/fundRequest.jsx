import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { FileText, Download, Printer, Logs } from "lucide-react";

const MemberFundRequest = () => {
  const [filters, setFilters] = useState({
    fromDate: "",
    toDate: "",
    filterText: "",
    status: "0",
    pageSize: "10",
  });
  const [data, setData] = useState([]); // Full data
  const [displayedData, setDisplayedData] = useState([]); // Data currently displayed
  const [page, setPage] = useState(1); // Current page
  const [hasMore, setHasMore] = useState(true); // If more data is available

  useEffect(() => {
    // Mock data generation
    const mockData = Array.from({ length: 1000 }, (_, i) => ({
      sNo: i + 1,
      memberId: `MID${1000 + i}`,
      memberName: `Member ${i + 1}`,
      toBank: `Bank ${i % 5 + 1}`,
      amount: (i + 1) * 100,
      transactionId: `TXN${i + 1}`,
      status: ["Approved", "Pending", "Rejected"][i % 3],
      requestDate: new Date(Date.now() - i * 86400000)
        .toISOString()
        .split("T")[0],
      action: "View Details",
    }));
    setData(mockData);
    setDisplayedData(mockData.slice(0, 20)); // Load initial 20 records
  }, []);

  const loadMoreData = () => {
    // Simulate loading more data
    const newData = data.slice(page * 20, (page + 1) * 20);
    if (newData.length === 0) {
      setHasMore(false); // No more data to load
      return;
    }
    setDisplayedData((prev) => [...prev, ...newData]);
    setPage((prev) => prev + 1);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
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
      const matchesStatus = status === "0" || item.status === status;

      return matchesDate && matchesText && matchesStatus;
    });

    setDisplayedData(filtered.slice(0, 20)); // Reset to first page of filtered data
    setPage(1);
    setHasMore(filtered.length > 20); // Check if more data is available
  };

  const handleExport = (type) => {
    console.log(`Exporting as ${type}`);
  };

  return (
    <div className="bg-white p-4">
      <div className="flex gap-2 mb-5 text-2xl items-center">
        <Logs className="w-6 h-6" />
        <h2>Members Fund Request</h2>
      </div>

      {/* Filters */}
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

      {/* Table */}
      <div className="border rounded">
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

        {/* Infinite Scroll Table */}
        <InfiniteScroll
          dataLength={displayedData.length}
          next={loadMoreData}
          hasMore={hasMore}
          loader={<h4 className="text-center">Loading more records...</h4>}
          endMessage={<p className="text-center">No more records available.</p>}
        >
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
                {displayedData.map((row, index) => (
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
                ))}
              </tbody>
            </table>
          </div>
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default MemberFundRequest;
