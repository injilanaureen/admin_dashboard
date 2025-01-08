

import React, { useState, useEffect } from "react";
import axios from "axios";
import { FileText, Download, Printer } from "lucide-react";

const ManageCities= () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({ pageSize: 10, country: "IN", state: "" });
  const [states, setStates] = useState([]); // State options for selected country
  const [cities, setCities] = useState([]); // City options for selected state

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
    setCurrentPage(1);  // Reset to the first page whenever filters change
  };

  const handleExport = (format) => {
    // Implement export logic based on the selected format (Excel, PDF, or Print)
    alert(`Exporting as ${format}`);
  };

  // Fetch States based on selected country
  useEffect(() => {
    const fetchStates = async () => {
      try {
        const country = filters.country;
        const response = await axios.get(`https://api.countrystatecity.in/v1/countries/${country}/states`, {
          headers: { 'X-CSCAPI-KEY': 'NHhvOEcyWk50N2Vna3VFTE00bFp3MjFKR0ZEOUhkZlg4RTk1MlJlaA==' }
        });
        setStates(response.data);
      } catch (error) {
        console.error('Error fetching states:', error);
      }
    };

    if (filters.country) {
      fetchStates();
    }
  }, [filters.country]);

  // Fetch Cities based on selected state
  useEffect(() => {
    const fetchCities = async () => {
      if (filters.state) {
        try {
          const response = await axios.get(`https://api.countrystatecity.in/v1/countries/${filters.country}/states/${filters.state}/cities`, {
            headers: { 'X-CSCAPI-KEY': 'NHhvOEcyWk50N2Vna3VFTE00bFp3MjFKR0ZEOUhkZlg4RTk1MlJlaA==' }
          });
          setCities(response.data);
        } catch (error) {
          console.error('Error fetching cities:', error);
        }
      }
    };

    fetchCities();
  }, [filters.state, filters.country]);

  // Calculate the sliced data based on the current page and page size
  const startIndex = (currentPage - 1) * filters.pageSize;
  const slicedData = cities.slice(startIndex, startIndex + filters.pageSize);

  return (
    <div className="m-10">
      <h1 className="text-2xl font-bold mb-6">Manage Cities</h1>
      <div className="flex justify-between items-center mb-4 bg-gray-100 p-3">
        <div className="flex items-center space-x-4">
          <span>Total Records: {cities.length}</span>
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

      <div className="border rounded p-4 mb-5">
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          {/* Country Filter */}
          <div className="flex items-center gap-2">
            <span className="text-sm sm:text-lg">Country:</span>
            <select
              name="country"
              className="border rounded p-2 text-sm sm:text-base"
              value={filters.country}
              onChange={handleFilterChange}
            >
              <option value="IN">India</option>
              <option value="NP">Nepal</option>
              <option value="BD">Bangladesh</option>
            </select>
          </div>

          {/* States Filter */}
          <div className="flex items-center gap-2">
            <span className="text-sm sm:text-lg">States:</span>
            <select
              name="state"
              className="border rounded p-2 text-sm sm:text-base"
              value={filters.state}
              onChange={handleFilterChange}
            >
              <option value="">Select State</option>
              {states.map((state) => (
                <option key={state.iso2} value={state.iso2}>
                  {state.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <button
          className="mt-4 bg-cyan-600 text-white p-2 rounded"
          onClick={() => {}}
        >
          Apply Filters
        </button>
      </div>

      {!cities || cities.length === 0 ? (
        <h4>Loading data...</h4>
      ) : (
        <table className="w-full border-separate border-spacing-1 border border-slate-400 table-auto">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-3 text-xs sm:text-sm border border-slate-300">S.No</th>
              <th className="p-3 text-xs sm:text-sm border border-slate-300">City Name</th>
            </tr>
          </thead>

          <tbody>
            {slicedData.map((city, index) => (
              <tr key={city.name}>
                <td className="text-center border border-slate-300">{startIndex + index + 1}</td>
                <td className="text-center border border-slate-300">{city.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ManageCities;
