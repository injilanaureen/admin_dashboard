import React, { useState, useMemo } from "react";
import { FileText, Download, Printer,List } from "lucide-react";

const mockData = [
  {
    SNo: 1,
    MemberInfo: "Emantor Test (AP755059)",
    PayeeUPIAddress: "test@upi",
    Amount: 100.0,
    Provider: "UPI INTENT (Collection)",
    APIID: 3,
    TransID: "UPI24062305455426E2C",
    APITxnID: "PGPETXN6398067",
    Status: "SUCCESS",
    APICommission: 5.0,
    APISurcharge: 2.0,
    UplineCommission: 1.0,
    EndUserCommission: 1.5,
    Surcharge: 1.0,
    Profit: 10.5,
    Date: "2024-06-23",
    ServiceType: "30",
  },
  {
    SNo: 2,
    MemberInfo: "Emantor Test (AP755059)",
    PayeeUPIAddress: "test2@upi",
    Amount: 200.0,
    Provider: "UPI INTENT (Collection)",
    APIID: 1,
    TransID: "UPI240623032039F8E4F",
    APITxnID: "PGPETXN9394975",
    Status: "PENDING",
    APICommission: 0.0,
    APISurcharge: 0.0,
    UplineCommission: 0.0,
    EndUserCommission: 0.0,
    Surcharge: 0.0,
    Profit: 0.0,
    Date: "2024-06-23",
    ServiceType: "1",
  },
];

const serviceTypes = [
  { value: "1", label: "Mobile Prepaid" },
  { value: "2", label: "Mobile Postpaid" },
  { value: "3", label: "DTH" },
  { value: "4", label: "Datacard Prepaid" },
  { value: "5", label: "Landline" },
  { value: "6", label: "Electricity" },
  { value: "7", label: "Piped GAS" },
  { value: "8", label: "Insurance" },
  { value: "9", label: "Other Services" },
  { value: "30", label: "Collections" },
  { value: "38", label: "Express Payout" },
];

const MyProfit = () => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [filters, setFilters] = useState({
    fromDate: "",
    toDate: "",
    filterText: "",
    api: "- Select API -",
    serviceType: "- Select Service Type Name -",
    operator: "- Select Operator Name -",
    status: "SUCCESS",
    pageSize: "10"
  });

  // Filter data based on all filters
  const filteredData = useMemo(() => {
    return mockData.filter(row => {
      // Status filter
      if (filters.status && row.Status !== filters.status) {
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
    setSelectedRows(isChecked ? filteredData.map((_, index) => index) : []);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: value
    }));
  };

  const handleSearch = () => {
    // Additional search logic if needed
    console.log("Searching with filters:", filters);
  };

  const handleExport = (type) => {
    console.log(`Exporting as ${type}`, filteredData);
    // Implement export functionality
  };

  // Get paginated data
  const paginatedData = useMemo(() => {
    const pageSize = parseInt(filters.pageSize);
    return filteredData.slice(0, pageSize);
  }, [filteredData, filters.pageSize]);

  return (
    <div className="bg-gray-100 p-4">
    <div className="text-3xl sm:text-2xl font-semibold mb-6 flex items-center space-x-2">
      <FileText className=" w-6 h-6" />
      <span>Reports</span>
    </div>
    <div className=" p-4 md:p-10 lg:p-2 bg-white">
      <h2 className=" flex items-center gap-2 text-xl md:text-3xl font-bold text-cyan-600 mb-4">
      <List className=" w-7 h-7" />
      List Recharge Profit
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 bg-white p-6 rounded-lg mb-4 shadow">
  
        <div>
          <label className="block text-gray-700 font-medium mb-1">Date From</label>
          <input
            name="fromDate"
            type="date"
            className="w-full border border-gray-300 p-2 rounded"
            value={filters.fromDate}
            onChange={handleFilterChange}
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-1">Date To</label>
          <input
            name="toDate"
            type="date"
            className="w-full border border-gray-300 p-2 rounded"
            value={filters.toDate}
            onChange={handleFilterChange}
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-1">Service Type</label>
          <select
            name="serviceType"
            className="w-full border border-gray-300 p-2 rounded"
            value={filters.serviceType}
            onChange={handleFilterChange}
          >
            <option value="- Select Service Type Name -">- Select Service Type Name -</option>
            {serviceTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-1">Operator</label>
          <select
            name="operator"
            className="w-full border border-gray-300 p-2 rounded"
            value={filters.operator}
            onChange={handleFilterChange}
          >
            <option value="- Select Operator Name -">- Select Operator Name -</option>
          </select>
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-1">Member ID</label>
          <input
            name="filterText"
            type="text"
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
            className="w-full border border-gray-300 p-2 rounded"
            value={filters.api}
            onChange={handleFilterChange}
          >
            <option value="- Select API -">- Select API -</option>
            <option value="3">Pgpe API</option>
            <option value="1">EMANTOR API</option>
          </select>
        </div>
        <div CL>
          <label className="block text-gray-700 font-medium mb-1">Status</label>
          <select
            name="status"
 className="w-full border border-gray-300 p-2 rounded bg-gray-200 cursor-not-allowed"
            value={filters.status}
            onChange={handleFilterChange}
            disabled
          >
            <option value="SUCCESS">SUCCESS</option>
            <option value="PENDING">PENDING</option>
            <option value="FAILED">FAILED</option>
          </select>
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-1">&nbsp;</label>
          <button
            onClick={handleSearch}
            className="w-full bg-cyan-600 text-white p-2 rounded hover:bg-blue-700"
          >
            Search
          </button>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow mb-4">
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

        <div className="overflow-x-auto">
          <table className="table-auto w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-3 text-xs sm:text-sm">S.No</th>
                <th className="p-3 text-xs sm:text-sm">
                  <input
                    type="checkbox"
                    onClick={handleCheckAll}
                    className="cursor-pointer"
                  />
                </th>
                <th className="p-3 text-xs sm:text-sm">Member Info</th>
                <th className="p-3 text-xs sm:text-sm">Payee UPI Address</th>
                <th className="p-3 text-xs sm:text-sm">Amount</th>
                <th className="p-3 text-xs sm:text-sm">TxnID</th>
                <th className="p-3 text-xs sm:text-sm">API Commission</th>
                <th className="p-3 text-xs sm:text-sm">API Surcharge</th>
                <th className="p-3 text-xs sm:text-sm">Upline Commission</th>
                <th className="p-3 text-xs sm:text-sm">End User Commission</th>
                <th className="p-3 text-xs sm:text-sm">Surcharge</th>
                <th className="p-3 text-xs sm:text-sm">Profit</th>
                <th className="p-3 text-xs sm:text-sm">Date</th>
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
                    <td className="p-3 text-xs sm:text-sm">{row.TransID}</td>
                    <td className="p-3 text-xs sm:text-sm">{row.APICommission}</td>
                    <td className="p-3 text-xs sm:text-sm">{row.APISurcharge}</td>
                    <td className="p-3 text-xs sm:text-sm">{row.UplineCommission}</td>
                    <td className="p-3 text-xs sm:text-sm">{row.EndUserCommission}</td>
                    <td className="p-3 text-xs sm:text-sm">{row.Surcharge}</td>
                    <td className="p-3 text-xs sm:text-sm">{row.Profit}</td>
                    <td className="p-3 text-xs sm:text-sm">{row.Date}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="13" className="text-center text-gray-500 p-3">
                    No Records Found!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    </div>
  );
};

export default MyProfit;