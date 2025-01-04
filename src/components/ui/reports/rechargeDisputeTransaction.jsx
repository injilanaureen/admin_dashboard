import React, { useState ,useMemo} from "react";
import { FileText, Download, Printer ,List} from "lucide-react";

import "tailwindcss/tailwind.css";

const mockData = [
  {
    SNo: 1,
    MemberInfo: "Emantor Test (AP755059)",
    PayeeUPIAddress: "",
    Amount: 100.00,
    Provider: "UPI INTENT (Collection)",
    APIID: 3,
    TransID: "UPI24062305455426E2C",
    APITxnID: "PGPETXN6398067",
    disputeStatus: "Resolved",
    Date: "6/23/2024 5:45:54 PM",
  },
  {
    SNo: 2,
    MemberInfo: "Emantor Test (AP755059)",
    PayeeUPIAddress: "",
    Amount: 100.00,
    Provider: "UPI INTENT (Collection)",
    APIID: 3,
    TransID: "UPI240623032039F8E4F",
    APITxnID: "PGPETXN9394975",
    disputeStatus: "Reported",
    Date: "6/23/2024 3:20:39 PM",
  },
];

const DisputeSettlement = () => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [filters, setFilters] = useState({
    fromDate: "",
    toDate: "",
    filterText: "",
    api: "- Select API -",
    disputeStatus: "",
  });
  const filteredData = useMemo(() => {
    return mockData.filter(row => {
      // Status filter
      if (filters.status && row.disputeStatus !== filters.disputeStatus) {
        return false;
      }

      // Date range filter
      if (filters.fromDate && filters.toDate) {
        const rowDate = new Date(row.Date);
        const fromDate = new Date(filters.fromDate);
        const toDate = new Date(filters.toDate);
        if (rowDate < fromDate || rowDate > toDate) {
          return false;
        }
      }

      // API filter
      if (filters.api !== "- Select API -" && row.APIID.toString() !== filters.api) {
        return false;
      }

      // Service Type filter
      if (filters.serviceType !== "- Select Service Type Name -" && 
          row.ServiceType !== filters.serviceType) {
        return false;
      }

      // Text search filter
      if (filters.filterText) {
        const searchText = filters.filterText.toLowerCase();
        return (
          row.MemberInfo.toLowerCase().includes(searchText) ||
          row.PayeeUPIAddress.toLowerCase().includes(searchText) ||
          row.TransID.toLowerCase().includes(searchText)
        );
      }

      return true;
    });
  }, [filters, mockData]);
  const handleRowClick = (index) => {
    if (selectedRows.includes(index)) {
      setSelectedRows(selectedRows.filter((row) => row !== index));
    } else {
      setSelectedRows([...selectedRows, index]);
    }
  };

  const handleCheckAll = (e) => {
    const isChecked = e.target.checked;
    setSelectedRows(isChecked ? mockData.map((_, index) => index) : []);
  };
  const handleExport = (type) => {
    console.log(`Exporting as ${type}`, filteredData);
    // Implement export functionality
  };
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  return (
<div className="bg-gray-100 p-2 ml-10">
    <div className="text-3xl sm:text-2xl font-semibold mb-6 flex items-center space-x-2">
      <FileText className=" w-6 h-6" />
      <span>Reports</span>
    </div>
    <div className=" p-4 md:p-10 lg:p-2 bg-white">
      <h3 className=" flex items-center gap-2 text-xl md:text-xl font-bold text-cyan-600 mb-4">
      <List className=" w-7 h-7" />
      List All Dispute Transactions
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 bg-white p-6 rounded-lg mb-4 shadow">
        <div>
          <label className="block text-gray-700 font-medium mb-1">Date From</label>
          <input
            name="fromDate"
            type="text"
            id="txtFromDate"
            className="w-full border border-gray-300 p-2 rounded"
            placeholder="Date From"
            value={filters.fromDate}
            onChange={handleFilterChange}
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-1">Date To</label>
          <input
            name="toDate"
            type="text"
            id="txtToDate"
            className="w-full border border-gray-300 p-2 rounded"
            placeholder="Date To"
            value={filters.toDate}
            onChange={handleFilterChange}
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-1">Member ID</label>
          <input
            name="filterText"
            type="text"
            id="txtFilter"
            className="w-full border border-gray-300 p-2 rounded"
            placeholder="MemberID, UPIID, TxnID"
            value={filters.filterText}
            onChange={handleFilterChange}
          />
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
        <div className=" flex justify-start">
          <input
            type="submit"
            name="btnSearch"
            value="Search"
            id="btnSearch"
            className="bg-cyan-600 text-white px-4 rounded"
          />
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
      <table className="table-auto w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-3 text-xs sm:text-sm">S.No</th>
            <th className="p-3 text-xs sm:text-sm">
              <input
                type="checkbox"
                id="chkRowAll"
                onClick={handleCheckAll}
                className="cursor-pointer"
              />
            </th>
            <th className="p-3 text-xs sm:text-sm">Member Info</th>
            <th className="p-3 text-xs sm:text-sm">Payee UPI Address</th>
            <th className="p-3 text-xs sm:text-sm">Amount</th>
            <th className="p-3 text-xs sm:text-sm">Provider</th>
            <th className="p-3 text-xs sm:text-sm">APIID</th>
            <th className="p-3 text-xs sm:text-sm">TransID</th>
            <th className="p-3 text-xs sm:text-sm">APITxnID</th>
            <th className="p-3 text-xs sm:text-sm">Status</th>
            <th className="p-3 text-xs sm:text-sm">Date</th>
            <th className="p-3 text-xs sm:text-sm">ForceUpdate</th>
          </tr>
        </thead>
        <tbody>
          {mockData.map((row, index) => (
            <tr
              key={index}
              className={`cursor-pointer ${
                selectedRows.includes(index) ? "bg-blue-100" : ""
              }`}
              onClick={() => handleRowClick(index)}
            >
              <td className="p-3 text-xs sm:text-sm">{row.SNo}</td>
              <td className="p-3 text-xs sm:text-sm">
                <input
                  type="checkbox"
                  checked={selectedRows.includes(index)}
                  onChange={() => handleRowClick(index)}
                  className="cursor-pointer"
                />
              </td>
              <td className="p-3 text-xs sm:text-sm">{row.MemberInfo}</td>
              <td className="p-3 text-xs sm:text-sm">{row.PayeeUPIAddress}</td>
              <td className="p-3 text-xs sm:text-sm">{row.Amount}</td>
              <td className="p-3 text-xs sm:text-sm">{row.Provider}</td>
              <td className="p-3 text-xs sm:text-sm">{row.APIID}</td>
              <td className="p-3 text-xs sm:text-sm">{row.TransID}</td>
              <td className="p-3 text-xs sm:text-sm">{row.APITxnID}</td>
              <td className="p-3 text-xs sm:text-sm text-yellow-600">
                {row.Status}
              </td>
              <td className="p-3 text-xs sm:text-sm">{row.Date}</td>
              <td className="p-3 text-xs sm:text-sm">
                <div className="flex gap-2">
                  <button
                    className="bg-green-500 text-white text-xs px-3 py-1 rounded"
                    onClick={() => alert("Force Success clicked")}
                  >
                    Success
                  </button>
                  <button
                    className="bg-red-500 text-white text-xs px-3 py-1 rounded"
                    onClick={() => alert("Force Fail clicked")}
                  >
                    Fail
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
};

export default DisputeSettlement;
