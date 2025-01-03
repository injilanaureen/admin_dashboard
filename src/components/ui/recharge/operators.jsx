import React, { useState } from "react";
import { Wallet, List, FileText, Printer, File, Download, Cable } from "lucide-react";

const ManageOperators = () => {
  const [showTable, setShowTable] = useState(true); // Toggle between table and add user
    const [data, setData] = useState([]); // Data for mock table
      const [selectedRows, setSelectedRows] = useState([]);
      const [currentPage, setCurrentPage] = useState(1);
    
  
  const [formData, setFormData] = useState({
    serviceTypeName: '',
    operatorName: '',
    smsApiCode: '',
    operatorImage: null,
    isSpecialOrSTV: 'NO',
    isUnderBBPS: 'NO',
    isBillFetchAvailable: 'NO',
    billingModel: 'P2P',
    minAmount: 0.0,
    maxAmount: 0.0,
    partialPay: 'YES',
    tds: 'YES',
    hsnSacCode: '',
    accountDisplay: '',
    accountDisplayDescription: '',
    helpPreview: null,
    remark: '',
    optionalParameter: '',
  });

  const mockData = [
    {
      id: 1,
      operatorName: "UPI INTENT",
      smsApiCode: "UPIINTENT",
      serviceName: "Collections",
      operatorStatus: "UP",
      date: "6/22/2024 2:02:04 PM",
      status: "Active",
    },
    {
      id: 2,
      operatorName: "Payout",
      smsApiCode: "PPGPE",
      serviceName: "Express Payout",
      operatorStatus: "UP",
      date: "6/22/2024 2:00:11 PM",
      status: "Active",
    },
    {
      id: 3,
      operatorName: "Credit Card Bill Payment > 25K to 50K",
      smsApiCode: "WTCCBP2",
      serviceName: "Wallet Transfer",
      operatorStatus: "UP",
      date: "6/22/2024 1:59:11 PM",
      status: "Active",
    },
    {
      id: 4,
      operatorName: "AePS Bio Auth Fee",
      smsApiCode: "ABAF2",
      serviceName: "AePS(2)",
      operatorStatus: "UP",
      date: "6/22/2024 1:59:11 PM",
      status: "Active",
    },
    {
      id: 5,
      operatorName: "AePS Bio Auth Fee",
      smsApiCode: "ABAF",
      serviceName: "AePS(1)",
      operatorStatus: "UP",
      date: "6/22/2024 1:59:11 PM",
      status: "Active",
    },
    {
      id: 6,
      operatorName: "Aadhaar Demographic Verification",
      smsApiCode: "VADG",
      serviceName: "Identity & Verification",
      operatorStatus: "UP",
      date: "6/22/2024 1:59:11 PM",
      status: "Active",
    },
    {
      id: 7,
      operatorName: "UPI (VPA) > 5K to 25K",
      smsApiCode: "WTUPI2",
      serviceName: "Wallet Transfer",
      operatorStatus: "UP",
      date: "6/22/2024 1:59:11 PM",
      status: "Active",
    },
    {
      id: 8,
      operatorName: "Airtel Money",
      smsApiCode: "ATM",
      serviceName: "Mobile Prepaid",
      operatorStatus: "UP",
      date: "6/22/2024 1:59:11 PM",
      status: "Active",
    },
    {
      id: 9,
      operatorName: "Mini Statement",
      smsApiCode: "MAS",
      serviceName: "AePS(1)",
      operatorStatus: "UP",
      date: "6/22/2024 1:59:11 PM",
      status: "Active",
    },
    {
      id: 10,
      operatorName: "Department of Power - Arunachal Pradesh (Prepaid)",
      smsApiCode: "ARPDOPP",
      serviceName: "Electricity",
      operatorStatus: "UP",
      date: "6/22/2024 1:59:11 PM",
      status: "Active",
    },
  ];
  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === 'file') {
      setFormData({ ...formData, [name]: files[0] });
    } else if (type === 'checkbox') {
      setFormData({ ...formData, [name]: checked ? 'YES' : 'NO' });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // Add API call or further processing here
  };
  
  const handleExport = (type) => {
    console.log(`Exporting as ${type}`);
  }; const [filters, setFilters] = useState({
    filterText: "",

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

  return (
    <div className="bg-white p-4">
      {/* Wallet System Heading */}
      <div className="text-xl sm:text-2xl font-semibold mb-4 flex items-center space-x-2">
        <Cable className="text-blue-600 w-6 h-6" />
        <span>Recharge System</span>
      </div>
      <div className="flex items-start sm:w-1/4 w-full mb-6 rounded-lg">
        <button
          onClick={() => setShowTable(true)}
          className={`px-4 py-2 border-l-2 border-cyan-600 font-medium w-full sm:w-auto ${
            showTable
              ? "bg-primary-color shadow-lg ring-2 ring-cyan-500"
              : "bg-tertiary-color text-black hover:bg-primary-color hover:ring-cyan-700"
          } hover:opacity-90 transition duration-300`}
        >
          + List Operator
        </button>
        <button
          onClick={() => setShowTable(false)}
          className={`px-4 py-2 border-r-2 border-cyan-600 font-medium w-full sm:w-auto ${
            !showTable
              ? "bg-primary-color shadow-lg ring-2 ring-cyan-500"
              : "bg-tertiary-color text-black hover:bg-primary-color hover:ring-cyan-700"
          } hover:opacity-90 transition duration-300`}
        >
          + Add Operator
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 bg-white p-6 rounded-lg mb-4 shadow">
       
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
        <div>
        <label className="block text-gray-700 font-medium mb-1">Search Text</label>

    <input
      type="text"
      name="filterText"
      className="border rounded p-2 w-60"
      placeholder="Search Text"
      value={filters.filterText}
      onChange={handleFilterChange}
    />
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
       {/* Export Buttons */}
               <div className="p-4 flex flex-col md:flex-row justify-between items-center border-b">
                <div className="flex items-center space-x-4">
                  <span>Total Record(s): {mockData.length}</span>
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

      {/* Transaction Data Table */}
      {showTable ? (
        <div className="overflow-x-auto">
          <table className="w-full border text-xs sm:text-sm">
            <thead>
              <tr className="bg-gray-50">
                <th className="p-3 text-left">S. No</th>
                <th className="p-3 text-left">Operator Name</th>
                <th className="p-3 text-left">SMS/API Operator Code</th>
                <th className="p-3 text-left">Service Name</th>
                <th className="p-3 text-left">Operator Status</th>
                <th className="p-3 text-left">Date</th>
                <th className="p-3 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {mockData.length > 0 ? (
                mockData.map((row, index) => (
                  <tr key={index} className="border-t">
                    <td className="p-3">{index + 1}</td>
                    <td className="p-3">{row.operatorName}</td>
                    <td className="p-3">{row.smsApiCode}</td>
                    <td className="p-3">{row.serviceName}</td>
                    <td className="p-3">{row.operatorStatus}</td>
                    <td className="p-3">{row.date}</td>
                    <td className="p-3">{row.status}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="p-3 text-center text-gray-500">
                    No Record Found!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="p-6 bg-white rounded shadow-md">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Add Service Type</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 px-4 py-2 text-left">Field Name</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Input</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-4 py-2">Service Type Name <span className="text-red-600">*</span></td>
                <td className="border border-gray-300 px-4 py-2">
                  <select
                    name="serviceTypeName"
                    value={formData.serviceTypeName}
                    onChange={handleChange}
                    className="block w-full border rounded px-3 py-2"
                  >
                    <option value="">- Select Service Type Name -</option>
                    <option selected value="- All Service -">- All Service -</option>
                    <option value="38">Express Payout</option>
                    {/* Add other options here */}
                  </select>
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">Operator Name <span className="text-red-600">*</span></td>
                <td className="border border-gray-300 px-4 py-2">
                  <input
                    type="text"
                    name="operatorName"
                    value={formData.operatorName}
                    onChange={handleChange}
                    className="block w-full border rounded px-3 py-2"
                  />
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">SMS/API Operator Code <span className="text-red-600">*</span></td>
                <td className="border border-gray-300 px-4 py-2">
                  <input
                    type="text"
                    name="smsApiCode"
                    value={formData.smsApiCode}
                    onChange={handleChange}
                    className="block w-full border rounded px-3 py-2"
                  />
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">Operator Image</td>
                <td className="border border-gray-300 px-4 py-2">
                  <input
                    type="file"
                    name="operatorImage"
                    onChange={handleChange}
                    className="block w-full border rounded px-3 py-2"
                  />
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">Is Special or STV</td>
                <td className="border border-gray-300 px-4 py-2">
                  <div>
                    <label className="mr-4">
                      <input
                        type="radio"
                        name="isSpecialOrSTV"
                        value="NO"
                        checked={formData.isSpecialOrSTV === "NO"}
                        onChange={handleChange}
                      /> NO
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="isSpecialOrSTV"
                        value="YES"
                        checked={formData.isSpecialOrSTV === "YES"}
                        onChange={handleChange}
                      /> YES
                    </label>
                  </div>
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">Is Under BBPS</td>
                <td className="border border-gray-300 px-4 py-2">
                  <div>
                    <label className="mr-4">
                      <input
                        type="radio"
                        name="isUnderBBPS"
                        value="NO"
                        checked={formData.isUnderBBPS === "NO"}
                        onChange={handleChange}
                      /> NO
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="isUnderBBPS"
                        value="YES"
                        checked={formData.isUnderBBPS === "YES"}
                        onChange={handleChange}
                      /> YES
                    </label>
                  </div>
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">Is Bill Fetch Available</td>
                <td className="border border-gray-300 px-4 py-2">
                  <div>
                    <label className="mr-4">
                      <input
                        type="radio"
                        name="isBillFetchAvailable"
                        value="NO"
                        checked={formData.isBillFetchAvailable === "NO"}
                        onChange={handleChange}
                      /> NO
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="isBillFetchAvailable"
                        value="YES"
                        checked={formData.isBillFetchAvailable === "YES"}
                        onChange={handleChange}
                      /> YES
                    </label>
                  </div>
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">Billing Model</td>
                <td className="border border-gray-300 px-4 py-2">
                  <select
                    name="billingModel"
                    value={formData.billingModel}
                    onChange={handleChange}
                    className="block w-full border rounded px-3 py-2"
                  >
                    <option value="Principle to Principle(P2P)">Principle to Principle(P2P)</option>
                    {/* Add other options here */}
                  </select>
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">Minimum Amount</td>
                <td className="border border-gray-300 px-4 py-2">
                  <input
                    type="number"
                    name="minAmount"
                    value={formData.minAmount}
                    onChange={handleChange}
                    className="block w-full border rounded px-3 py-2"
                  />
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">Maximum Amount</td>
                <td className="border border-gray-300 px-4 py-2">
                  <input
                    type="number"
                    name="maxAmount"
                    value={formData.maxAmount}
                    onChange={handleChange}
                    className="block w-full border rounded px-3 py-2"
                  />
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">Partial Pay</td>
                <td className="border border-gray-300 px-4 py-2">
                  <div>
                    <label className="mr-4">
                      <input
                        type="radio"
                        name="partialPay"
                        value="YES"
                        checked={formData.partialPay === "YES"}
                        onChange={handleChange}
                      /> YES
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="partialPay"
                        value="NO"
                        checked={formData.partialPay === "NO"}
                        onChange={handleChange}
                      /> NO
                    </label>
                  </div>
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">TDS</td>
                <td className="border border-gray-300 px-4 py-2">
                  <div>
                    <label className="mr-4">
                      <input
                        type="radio"
                        name="tds"
                        value="YES"
                        checked={formData.tds === "YES"}
                        onChange={handleChange}
                      /> YES
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="tds"
                        value="NO"
                        checked={formData.tds === "NO"}
                        onChange={handleChange}
                      /> NO
                    </label>
                  </div>
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">HSN/SAC Code</td>
                <td className="border border-gray-300 px-4 py-2">
                  <input
                    type="text"
                    name="hsnSacCode"
                    value={formData.hsnSacCode}
                    onChange={handleChange}
                    className="block w-full border rounded px-3 py-2"
                  />
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">Account Display</td>
                <td className="border border-gray-300 px-4 py-2">
                  <input
                    type="text"
                    name="accountDisplay"
                    value={formData.accountDisplay}
                    onChange={handleChange}
                    className="block w-full border rounded px-3 py-2"
                  />
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">Account Display Description</td>
                <td className="border border-gray-300 px-4 py-2">
                  <textarea
                    name="accountDisplayDescription"
                    value={formData.accountDisplayDescription}
                    onChange={handleChange}
                    className="block w-full border rounded px-3 py-2"
                  />
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">Help Preview</td>
                <td className="border border-gray-300 px-4 py-2">
                  <input
                    type="file"
                    name="helpPreview"
                    onChange={handleChange}
                    className="block w-full border rounded px-3 py-2"
                  />
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">Remark/Note</td>
                <td className="border border-gray-300 px-4 py-2">
                  <textarea
                    name="remark"
                    value={formData.remark}
                    onChange={handleChange}
                    className="block w-full border rounded px-3 py-2"
                  />
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">Optional Parameter (API)</td>
                <td className="border border-gray-300 px-4 py-2">
                  <input
                    type="text"
                    name="optionalParameter"
                    value={formData.optionalParameter}
                    onChange={handleChange}
                    className="block w-full border rounded px-3 py-2"
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <div className="mt-4">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
      
      )}
    </div>
  );
};

export default ManageOperators;
 