import React, { useState ,useMemo, useEffect} from "react";
import { FileText, Download, Printer ,List} from "lucide-react";

import "tailwindcss/tailwind.css";




const PendingRecharges = () => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [data,setData]=useState([]);
  const [filters, setFilters] = useState({
    fromDate: "",
    toDate: "",
    filterText: "",
    api: "- Select API -",
    status: "PENDING", // Default status is "PENDING"
  });
  useEffect(
    () => {
      const mockData = [
        {
          SNo: 1,
          DateTime: "6/23/2024 5:45:54 PM",
          MemberInfo: "Emantor Test (AP755059)",
          Particulars: "Recharge",
          Number: "9876543210",
          Amount: 100.0,
          APIID: 3,
          TransID: "UPI24062305455426E2C",
          APITxnID: "PGPETXN6398067",
          APIMessage: "Transaction Pending",
          Status: "Pending",
        },
        {
          SNo: 2,
          DateTime: "6/23/2024 3:20:39 PM",
          MemberInfo: "Emantor Test (AP755059)",
          Particulars: "Recharge",
          Number: "9876543211",
          Amount: 200.0,
          APIID: 1,
          TransID: "UPI240623032039F8E4F",
          APITxnID: "PGPETXN9394975",
          APIMessage: "Transaction Pending",
          Status: "Pending",
        },
      ];
      
      setData(mockData); // Initialize data with mock data
      
    },[]
  )
  const filteredData = useMemo(() => {
    return data.filter(row => {
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
  }, [filters, data]);
  const handleRowClick = (index) => {
    if (selectedRows.includes(index)) {
      setSelectedRows(selectedRows.filter((row) => row !== index));
    } else {
      setSelectedRows([...selectedRows, index]);
    }
  };

  const handleCheckAll = (e) => {
    const isChecked = e.target.checked;
    setSelectedRows(isChecked ? data.map((_, index) => index) : []);
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
  const totalSuccess = data.filter((data) => data.Status === "Success").length;
  const totalPending = data.filter((data) => data.Status === "Pending").length;
  const totalFailure = data.filter((data) => data.Status === "Failure").length;

  
  return (
    <div className="bg-gray-100 p-4">
    <div className="text-3xl sm:text-2xl font-semibold mb-6 flex items-center space-x-2">
      <FileText className=" w-6 h-6" />
      <span>Reports</span>
    </div>
    <div className=" p-4 md:p-10 lg:p-2 bg-white">
      <h2 className=" flex items-center gap-2 text-xl md:text-3xl font-bold text-cyan-600 mb-4">
      <List className=" w-7 h-7" />
      List Pending Recharge
      </h2>

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
          <label className="block text-gray-700 font-medium mb-1">Status</label>
          <select
            name="status"
            id="ddlStatus"
            className="w-full border border-gray-800 p-2 rounded"
            value={filters.status}
            onChange={handleFilterChange}
            disabled // Disable the status filter
          >
            <option value="0">Select Status</option>
            <option value="SUCCESS">SUCCESS</option>
            <option value="PENDING">PENDING</option>
            <option value="FAILED">FAILED</option>
          </select>
        </div>
        <div className="col-span-1 sm:col-span-2 md:col-span-1 flex justify-start">
          <input
            type="submit"
            name="btnSearch"
            value="Search"
            id="btnSearch"
            className="bg-cyan-600 text-white px-4 py-2 rounded"
          />
        </div>
      </div>
       {/* Totals Section */}
       <div className="flex flex-col sm:flex-row justify-between items-center bg-white p-4 rounded-lg mb-4 shadow">
        <p className="text-green-600 font-bold">Success: {totalSuccess}</p>
        <p className="text-yellow-600 font-bold">Pending: {totalPending}</p>
        <p className="text-red-600 font-bold">Failure: {totalFailure}</p>
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
    <th className="p-3 text-xs sm:text-sm">#</th>
    <th className="p-3 text-xs sm:text-sm">DateTime</th>
    <th className="p-3 text-xs sm:text-sm">Member Info</th>
    <th className="p-3 text-xs sm:text-sm">Particulars</th>
    <th className="p-3 text-xs sm:text-sm">Number</th>
    <th className="p-3 text-xs sm:text-sm">Amount</th>
    <th className="p-3 text-xs sm:text-sm">APIID</th>
    <th className="p-3 text-xs sm:text-sm">TransID</th>
    <th className="p-3 text-xs sm:text-sm">APITxnID</th>
    <th className="p-3 text-xs sm:text-sm">API Message</th>
    <th className="p-3 text-xs sm:text-sm">Status</th>
    <th className="p-3 text-xs sm:text-sm">ForceUpdate</th>
  </tr>
</thead>

<tbody>
  {filteredData.map((row, index) => (
    <tr key={index}>
      <td className="p-3 text-xs sm:text-sm">{row.SNo}</td>
      <td className="p-3 text-xs sm:text-sm">{row.DateTime}</td>
      <td className="p-3 text-xs sm:text-sm">{row.MemberInfo}</td>
      <td className="p-3 text-xs sm:text-sm">{row.Particulars}</td>
      <td className="p-3 text-xs sm:text-sm">{row.Number}</td>
      <td className="p-3 text-xs sm:text-sm">{row.Amount}</td>
      <td className="p-3 text-xs sm:text-sm">{row.APIID}</td>
      <td className="p-3 text-xs sm:text-sm">{row.TransID}</td>
      <td className="p-3 text-xs sm:text-sm">{row.APITxnID}</td>
      <td className="p-3 text-xs sm:text-sm">{row.APIMessage}</td>
      <td className="p-3 text-xs sm:text-sm">{row.Status}</td>
      <td className="p-3 text-xs sm:text-sm">
        <button>Force Update</button>
      </td>
    </tr>
  ))}
</tbody>


      </table>
    </div>
    </div>
  );
};

export default PendingRecharges;
