import React, { useEffect, useState } from "react";

export default function ManageCommission() {
  const [commissionData, setCommissionData] = useState([]);
  const [filter, setFilter] = useState("API Partner"); // Filter option: 'API Partner' or 'Free Package'

  useEffect(() => {
    // Simulate API call based on the selected filter
    const mockCommissionData = {
      "API Partner": [
        {
          commissionId: 1,
          operator: "Airtel",
          service: "Mobile Prepaid",
          activeAPI: 1,
          apiName: "EMANTOR API",
          commissionSurcharge: "0.00",
          isDisplay: false,
          isFlat: false,
          isSurcharge: false,
          date: "12/26/2024",
          status: "active",
        },
        {
          commissionId: 2,
          operator: "Jio",
          service: "Mobile Prepaid",
          activeAPI: 1,
          apiName: "Jio API",
          commissionSurcharge: "5.00",
          isDisplay: true,
          isFlat: true,
          isSurcharge: false,
          date: "12/28/2024",
          status: "inactive",
        },
      ],
      "Free Package": [
        {
          commissionId: 1,
          operator: "Airtel",
          service: "Mobile Prepaid",
          activeAPI: 1,
          apiName: "EMANTOR API",
          commissionSurcharge: "6.00",
          isDisplay: true,
          isFlat: false,
          isSurcharge: true,
          date: "12/20/2024",
          status: "active",
        },
        {
          commissionId: 2,
          operator: "Vi",
          service: "Mobile Prepaid",
          activeAPI: 1,
          apiName: "Vi API",
          commissionSurcharge: "3.50",
          isDisplay: false,
          isFlat: true,
          isSurcharge: true,
          date: "12/25/2024",
          status: "inactive",
        },
      ],
    };

    setCommissionData(mockCommissionData[filter]);
  }, [filter]);

  const handleCheckboxChange = (field, commissionId) => {
    setCommissionData((prev) =>
      prev.map((item) =>
        item.commissionId === commissionId
          ? { ...item, [field]: !item[field] }
          : item
      )
    );
  };

  return (
    <div className="p-6 flex flex-col gap-6 bg-gray-50">
      {/* Header Section */}
      <h2 className="text-3xl font-bold text-cyan-600 mb-6">Commission Management</h2>

      {/* Filter Dropdown */}
      <div className="mb-6">
        <label className="text-gray-700 font-medium mr-4">Filter by API Type:</label>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-color"
        >
          <option value="API Partner">API Partner</option>
          <option value="Free Package">Free Package</option>
        </select>
      </div>

      {/* Commission Table */}
      <div>
        <table className="min-w-full border-collapse border border-gray-200 text-sm text-gray-600">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-200 py-2 px-2">S. No</th>
              <th className="border border-gray-200 py-2 px-2">Operator Name</th>
              <th className="border border-gray-200 py-2 px-2">Service</th>
              <th className="border border-gray-200 py-2 px-2">Active API</th>
              <th className="border border-gray-200 py-2 px-2">API Name</th>
              <th className="border border-gray-200 py-2 px-2">Commission / Surcharge</th>
              <th className="border border-gray-200 py-2 px-2">Is Display</th>
              <th className="border border-gray-200 py-2 px-2">Is Flat</th>
              <th className="border border-gray-200 py-2 px-2">Is Surcharge</th>
              <th className="border border-gray-200 py-2 px-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {commissionData.length > 0 ? (
              commissionData.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="border border-gray-200 py-2 px-2 text-center">{item.commissionId}</td>
                  <td className="border border-gray-200 py-2 px-2 text-center">{item.operator}</td>
                  <td className="border border-gray-200 py-2 px-2 text-center">{item.service}</td>
                  <td className="border border-gray-200 py-2 px-2 text-center">{item.activeAPI}</td>
                  <td className="border border-gray-200 py-2 px-2 text-center">{item.apiName}</td>
                  <td className="border border-gray-200 py-2 px-2 text-center">{item.commissionSurcharge}</td>
                  <td className="border border-gray-200 py-2 px-2 text-center">
                    <input
                      type="checkbox"
                      checked={item.isDisplay}
                      onChange={() => handleCheckboxChange("isDisplay", item.commissionId)}
                    />
                  </td>
                  <td className="border border-gray-200 py-2 px-2 text-center">
                    <input
                      type="checkbox"
                      checked={item.isFlat}
                      onChange={() => handleCheckboxChange("isFlat", item.commissionId)}
                    />
                  </td>
                  <td className="border border-gray-200 py-2 px-2 text-center">
                    <input
                      type="checkbox"
                      checked={item.isSurcharge}
                      onChange={() => handleCheckboxChange("isSurcharge", item.commissionId)}
                    />
                  </td>
                  <td className="border border-gray-200 py-2 px-2 text-center">{item.status}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  className="border border-gray-200 py-3 px-4 text-center"
                  colSpan={10}
                >
                  No commission data available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
