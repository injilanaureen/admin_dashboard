import React, { useState } from "react";
import "tailwindcss/tailwind.css";
import { List,FileText } from "lucide-react";

// Mock UPI Transaction Data
const mockData = [
  { MemberInfo: "John Doe", Amount: 100, Provider: "Airtel", APIID: "API123", TxnID: "T123", APITxnID: "API-T123", OperatorRef: "O123", APIMessage: "Success", Status: "Success", Source: "UPI", DateTime: "2024-12-30 12:34:56" },
  { MemberInfo: "Jane Smith",  Amount: 50, Provider: "Jio", APIID: "API124", TxnID: "T124", APITxnID: "API-T124", OperatorRef: "O124", APIMessage: "Pending", Status: "Pending", Source: "UPI", DateTime: "2024-12-30 13:45:00" },
  { MemberInfo: "Mike Johnson",  Amount: 75, Provider: "Vodafone", APIID: "API125", TxnID: "T125", APITxnID: "API-T125", OperatorRef: "O125", APIMessage: "Failed", Status: "Failed", Source: "UPI", DateTime: "2024-12-30 15:30:00" },
];

const rowsPerPage = 5;

const RechargeTransactions = () => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    dateFrom: "",
    dateTo: "",
    memberId: "",
    status: "",
    serviceType: "", // Updated service type dropdown options
  });
  const [filteredData, setFilteredData] = useState(mockData);

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  // Filter the data based on selected filters
  const handleFilter = () => {
    const { dateFrom, dateTo, memberId, status, serviceType } = filters;

    const filtered = mockData.filter((item) => {
      const isDateInRange =
        (!dateFrom || new Date(item.DateTime) >= new Date(dateFrom)) &&
        (!dateTo || new Date(item.DateTime) <= new Date(dateTo));
      const isMemberMatched = !memberId || item.MemberInfo.includes(memberId);
      const isStatusMatched = !status || item.Status === status;
      const isServiceTypeMatched = !serviceType || item.Provider.includes(serviceType);

      return isDateInRange && isMemberMatched && isStatusMatched && isServiceTypeMatched;
    });

    setFilteredData(filtered);
    setCurrentPage(1); // Reset to first page after filter
  };

  // Handle row selection
  const handleRowClick = (index) => {
    if (selectedRows.includes(index)) {
      setSelectedRows(selectedRows.filter((row) => row !== index));
    } else {
      setSelectedRows([...selectedRows, index]);
    }
  };

  // Handle page change (pagination)
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
    <div className="bg-gray-100 p-4">
    <div className="text-3xl sm:text-2xl font-semibold mb-6 flex items-center space-x-2">
      <FileText className=" w-6 h-6" />
      <span>Reports</span>
    </div>
    <div className=" p-4 md:p-10 lg:p-2 bg-white">
      <h2 className=" flex items-center gap-2 text-xl md:text-3xl font-bold text-cyan-600 mb-4">
      <List className=" w-7 h-7" />
      List All Transactions      </h2>
 
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 bg-white p-6 rounded-lg mb-4 shadow">
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
            <option value="">All Statuses</option>
            <option value="Success">Success</option>
            <option value="Pending">Pending</option>
            <option value="Failed">Failed</option>
          </select>
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-1">Service Type</label>
          <select
            name="serviceType"
            value={filters.serviceType}
            onChange={handleFilterChange}
            className="w-full border border-gray-300 p-2 rounded"
          >
            <option value="">- Select Service Type Name -</option>
            <option value="Mobile Prepaid">Mobile Prepaid</option>
            <option value="Mobile Postpaid">Mobile Postpaid</option>
            <option value="DTH">DTH</option>
            <option value="Datacard Prepaid">Datacard Prepaid</option>
            <option value="Landline">Landline</option>
            <option value="Electricity">Electricity</option>
            <option value="Piped GAS">Piped GAS</option>
            <option value="Insurance">Insurance</option>
            <option value="Other Services">Other Services</option>
            <option value="Datacard Postpaid">Datacard Postpaid</option>
            <option value="Water">Water</option>
            <option value="Broadband">Broadband</option>
            <option value="FASTag">FASTag</option>
            <option value="Collections">Collections</option>
            <option value="Loan Repayment">Loan Repayment</option>
            <option value="LPG Cylinder">LPG Cylinder</option>
            <option value="Google Play Recharge">Google Play Recharge</option>
            <option value="Express Payout">Express Payout</option>
          </select>
        </div>
        <div className="col-span-1 sm:col-span-2 md:col-span-1 flex justify-start">
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
              <th className="p-3 text-sm sm:text-base">S.No</th>
              <th className="p-3 text-sm sm:text-base">Member Info</th>
              <th className="p-3 text-sm sm:text-base">Amount</th>
              <th className="p-3 text-sm sm:text-base">Provider</th>
              <th className="p-3 text-sm sm:text-base">APIID</th>
              <th className="p-3 text-sm sm:text-base">TxnID</th>
              <th className="p-3 text-sm sm:text-base">APITxnID</th>
              <th className="p-3 text-sm sm:text-base">Operator Ref</th>
              <th className="p-3 text-sm sm:text-base">API Message</th>
              <th className="p-3 text-sm sm:text-base text-yellow-600">Status</th>
              <th className="p-3 text-sm sm:text-base">Source</th>
              <th className="p-3 text-sm sm:text-base">Request DateTime</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.length > 0 ? (
              paginatedData.map((row, index) => (
                <tr
                  key={index}
                  className={`cursor-pointer ${selectedRows.includes(index) ? "bg-blue-100" : ""}`}
                  onClick={() => handleRowClick(index)}
                >
                  <td className="p-3 text-sm sm:text-base">{index + 1}</td>
                  <td className="p-3 text-sm sm:text-base">{row.MemberInfo}</td>
                  <td className="p-3 text-sm sm:text-base">{row.Amount}</td>
                  <td className="p-3 text-sm sm:text-base">{row.Provider}</td>
                  <td className="p-3 text-sm sm:text-base">{row.APIID}</td>
                  <td className="p-3 text-sm sm:text-base">{row.TxnID}</td>
                  <td className="p-3 text-sm sm:text-base">{row.APITxnID}</td>
                  <td className="p-3 text-sm sm:text-base">{row.OperatorRef}</td>
                  <td className="p-3 text-sm sm:text-base">{row.APIMessage}</td>
                  <td className="p-3 text-sm sm:text-base text-yellow-600">{row.Status}</td>
                  <td className="p-3 text-sm sm:text-base">{row.Source}</td>
                  <td className="p-3 text-sm sm:text-base">{row.DateTime}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="13" className="p-3 text-center text-gray-500">
                  No record found!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Section */}
      <div className="flex justify-between items-center mt-4 sm:flex-row">
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
    </div>
  );
};

export default RechargeTransactions;
