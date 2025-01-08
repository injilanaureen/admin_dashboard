import React, { useEffect, useState } from "react";

export default function ManageBankAccounts() {
  const [bank, setbank] = useState([]);
  const [showTable, setShowTable] = useState(true); // Toggle between table and add bank

  useEffect(() => {
    const mockbank = [
      {
        id: 1,
        bankname:'IndusInd bank',
        accountName:'account1',
        accountnumber: 1,
        accounttype:'saving',
        ifsc:'INDB0000344',
      },

      {
        id: 2,
        bankname:'ICICI bank',
        accountName:'account2',
        accountnumber: 2,
        accounttype:'current',
        ifsc:'ICIC0000345',
      },
      
      {
        id: 3,
        bankname:'HDFC bank',
        accountName:'account3',
        accountnumber: 3,
        accounttype:'savings',
        ifsc:'HDFCB0000346',
      }
    ];
    setbank(mockbank);
  }, []);

  return (
    <div className="p-6 flex flex-col gap-6 bg-gray-50">
      {/* Header Section */}
      <h2 className="text-3xl font-bold text-cyan-600 mb-6">Bank Management</h2>

      {/* Button Toggle */}
      <div className="flex  mb-6 p-4 rounded-lg">
        <button
          onClick={() => setShowTable(true)}
          className={`px-4 py-2 rounded-lg border-l-2 border-cyan-600 font-medium w-full sm:w-auto ${
            showTable
              ? "bg-primary-color shadow-lg ring-2 ring-cyan-500"
              : "bg-tertiary-color text-black hover:bg-primary-color hover:ring-cyan-700"
          } hover:opacity-90 transition duration-300`}
        >
          + List bank
        </button>
        <button
          onClick={() => setShowTable(false)}
          className={`px-4 py-2 rounded-lg border-r-2 border-cyan-600 font-medium w-full sm:w-auto ${
            !showTable
              ? "bg-primary-color shadow-lg ring-2 ring-cyan-500"
              : "bg-tertiary-color text-black hover:bg-primary-color hover:ring-cyan-700"
          } hover:opacity-90 transition duration-300`}
        >
          + Add bank
        </button>
      </div>

      {/* Conditional Rendering */}
      {showTable ? (
        <div>
          {/* bank Table */}
          <table className="min-w-full border-collapse border border-gray-200 text-sm text-gray-600">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-200 py-2 px-2">S. No</th>
                <th className="border border-gray-200 py-2 px-2">Bank name</th>
                <th className="border border-gray-200 py-2 px-2">Account Name</th>
                <th className="border border-gray-200 py-2 px-2">Account Number</th>
                <th className="border border-gray-200 py-2 px-2">Account Type	</th>
                <th className="border border-gray-200 py-2 px-2">IFSC/NEFT</th>
                <th className="border border-gray-200 py-2 px-2">Status</th>
                <th className="border border-gray-200 py-2 px-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {bank.length > 0 ? (
                bank.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="border border-gray-200 py-2 px-2 text-center">{item.id}</td>
                
                    <td className="border border-gray-200 py-2 px-2 text-center">
                      {item.bankname}
                    </td>
                    <td className="border border-gray-200 py-2 px-2 text-center">
                      {item.accountName}
                    </td>
                    <td className="border border-gray-200 py-2 px-2 text-center">
                      {item.accountnumber}
                    </td>
                    <td className="border border-gray-200 py-2 px-2 text-center">
                      {item.accounttype}
                    </td>
                    <td className="border border-gray-200 py-2 px-2 text-center">
                      {item.ifsc}
                    </td>
                    <td className="border border-gray-200 py-2 px-2 text-center">
                       Active                   
                        </td>
                    <td className="border border-gray-200 py-2 px-2 text-center">
                        Edit
                    </td>
              
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    className="border border-gray-200 py-3 px-4 text-center"
                    colSpan={8}
                  >
                    No banks available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      ) : (
        <div>
          {/* Add bank Section */}
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Add New bank</h3>
          <form className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-6">
              <label className="text-gray-700 font-medium mb-1 w-full sm:w-1/4">Bank Name</label>
              <input
                type="text"
                placeholder="Enter bank name"
                className="w-full sm:w-3/4 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-color"
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-6">
              <label className="block text-gray-700 font-medium mb-1 w-full sm:w-1/4"> Account Name</label>
              <input
                type="text"
                placeholder="Enter Account Name"
                className="w-full sm:w-3/4 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-color"
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-6">
              <label className="block text-gray-700 font-medium mb-1 w-full sm:w-1/4">Account Number/UPI Address</label>
              <input
                type="text"
                placeholder="Enter Account Number/UPI Address"
                className="w-full sm:w-3/4 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-color"
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-6">
              <label className="block text-gray-700 font-medium mb-1 w-full sm:w-1/4">IFSC/NEFT Code</label>
              <input
                type="text"
                placeholder="Enter IFSC/NEFT Code"
                className="w-full sm:w-3/4 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-color"
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-6">
              <label className="text-gray-700 font-medium mb-1 w-full sm:w-1/4">Branch Name</label>
              <textarea
                className="w-full sm:w-3/4 border border-gray-300 rounded-lg px-3 py-20 focus:outline-none focus:ring-2 focus:ring-primary-color"
                placeholder="Enter branch name"
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-6">
              <label className="text-gray-700 font-medium mb-1 w-full sm:w-1/4">Description</label>
              <textarea
                className="w-full sm:w-3/4 border border-gray-300 rounded-lg px-3 py-20 focus:outline-none focus:ring-2 focus:ring-primary-color"
                placeholder="Enter bank description"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-primary-color text-white bg-cyan-500 rounded-lg hover:opacity-90"
            >
              Save Account Details
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
