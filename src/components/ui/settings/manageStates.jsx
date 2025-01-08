import React, { useEffect, useState } from "react";
import { FileText, Download, Printer } from "lucide-react";
import axios from "axios";

var config = {
  method: 'get',
  url: 'https://api.countrystatecity.in/v1/states',
  headers: {
    'X-CSCAPI-KEY': 'NHhvOEcyWk50N2Vna3VFTE00bFp3MjFKR0ZEOUhkZlg4RTk1MlJlaA=='
  }
};


const ManageCountries = () => {
  const [data, setData] = useState([]);  // Assume data is fetched from a database or API
  const [states, setStates] = useState([]);
  const [filters, setFilters] = useState({ pageSize: 10 });
  const [currentPage, setCurrentPage] = useState(1);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
    setCurrentPage(1);  // Reset to the first page whenever filters change
  };

  const handleExport = (format) => {
    // Implement export logic based on the selected format (Excel, PDF, or Print)
    alert(`Exporting as ${format}`);
  };
  useEffect(()=>{
    const fetchStates = async () => {
      try {
        // 
        const response = await axios.get(config.url, {headers: config.headers});
        console.log(response.data)
        setStates(response.data)
      }
      catch (error) {
        // console.error('Error fetching country:', error.message);
      }
    }
    fetchStates()
  },[])

  // Calculate the sliced data based on the current page and page size
  const startIndex = (currentPage - 1) * filters.pageSize;
  const slicedData = states.slice(startIndex, startIndex + filters.pageSize);

  return (
    <div className="m-10">
      <h1 className="text-2xl font-bold mb-6">Manage States</h1>
      <div className="flex justify-between items-center mb-4 bg-gray-100 p-3">
        <div className="flex items-center space-x-4">
          <span>Total Records: {states.length}</span>
          <div className="flex space-x-2">
            <button
              onClick={() => handleExport("excel")}
              className="p-2 hover:bg-gray-100 rounded"
              title="Export to Excel"
            >
              <FileText className="w-5 h-5 text-green-600" />
            </button>
            <button
              onClick={() => handleExport("pdf")}
              className="p-2 hover:bg-gray-100 rounded"
              title="Export to PDF"
            >
              <Download className="w-5 h-5 text-red-600" />
            </button>
            <button
              onClick={() => handleExport("print")}
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

      {!states || states.length === 0 ? (
        <h4>Loading data...</h4>
      ) : (
        <table className="w-full border-separate border-spacing-1 border border-slate-400 table-auto">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-3 text-xs sm:text-sm border border-slate-300">S.No</th>
              <th className="p-3 text-xs sm:text-sm border border-slate-300">State Name</th>
              <th className="p-3 text-xs sm:text-sm border border-slate-300">Country Name</th>
              <th className="p-3 text-xs sm:text-sm border border-slate-300">Status</th>
              <th className="p-3 text-xs sm:text-sm border border-slate-300">Action</th>
            </tr>
          </thead>

          <tbody>
            {slicedData.map((state, index) => (
              <tr key={state.id}>
                <td className="text-center border border-slate-300 ">{startIndex + index + 1}</td>
                <td className="text-center border border-slate-300">{state.name}</td>
                <td className="text-center border border-slate-300">{state.country_code}</td>
                <td className="text-center border border-slate-300">Active</td>
                <td className="text-center border border-slate-300">Edit</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ManageCountries;
