import React, { useState, useEffect,useMemo } from "react";
import { FileText, Download, Printer, Pencil, List } from "lucide-react";

const ChangeAPIPackage = () => {
   const [data, setData] = useState([]); // Mock data
   const [filters, setFilters] = useState({
     pageSize: "10",
     api: "- Select API -",
     serviceType: "- Select Service Type Name -",
   });
 
   useEffect(() => {
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
   }, []);
 
   const filteredData = useMemo(() => {
     return data.filter(row => {
       // API filter
       if (filters.api !== "- Select API -" && row.APIID.toString() !== filters.api) {
         return false;
       }
 
       // Service Type filter
       if (filters.serviceType !== "- Select Service Type Name -" && row.ServiceType !== filters.serviceType) {
         return false;
       }
 
       return true;
     });
   }, [filters, data]);
 
   const handleFilterChange = (e) => {
     const { name, value } = e.target;
     setFilters({ ...filters, [name]: value });
   };
 
   const CheckAll = (source) => {
     const checkboxes = document.querySelectorAll('input[type="checkbox"]');
     checkboxes.forEach((checkbox) => {
       checkbox.checked = source.checked;
     });
   };
 
   return (
     <div className="bg-gray-100 p-4">
       <div className="text-3xl sm:text-2xl font-semibold mb-6 flex items-center space-x-2">
         <FileText className="w-6 h-6" />
         <span>Recharge API</span>
       </div>
       <div className="p-4 md:p-10 lg:p-2 bg-white">
         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 bg-white p-6 rounded-lg mb-4 shadow">
           {/* Filter inputs */}
           <div>
             <label htmlFor="api">Choose API:</label>
             <select
               name="api"
               id="api"
               className="border border-gray-300 rounded p-2"
               value={filters.api}
               onChange={handleFilterChange}
             >
               <option value="- Select API -">- Select API -</option>
               <option value="3">Pgpe API</option>
               <option value="1">EMANTOR API</option>
             </select>
           </div>
           <div>
             <label htmlFor="serviceType">Service Type:</label>
             <select
               name="serviceType"
               id="serviceType"
               className="border border-gray-300 rounded p-2"
               value={filters.serviceType}
               onChange={handleFilterChange}
             >
               <option value="- Select Service Type Name -">- Select Service Type Name -</option>
               <option value="Mobile Prepaid">Mobile Prepaid</option>
               <option value="Mobile Postpaid">Mobile Postpaid</option>
               <option value="DTH">DTH</option>
               <option value="LPG Cylinder">LPG Cylinder</option>
               <option value="Electricity">Electricity</option>
               <option value="Broadband">Broadband</option>
             </select>
           </div>
         </div>
 
         <div>
           <div className="flex justify-between items-center mb-4">
             <div className="flex items-center space-x-4">
               <span>Total Records: {filteredData.length}</span>
               <div className="flex space-x-2">
                 <button onClick={() => console.log("Exporting to Excel")} className="p-2 hover:bg-gray-100 rounded" title="Export to Excel">
                   <FileText className="w-5 h-5 text-green-600" />
                 </button>
                 <button onClick={() => console.log("Exporting to PDF")} className="p-2 hover:bg-gray-100 rounded" title="Export to PDF">
                   <Download className="w-5 h-5 text-red-600" />
                 </button>
                 <button onClick={() => console.log("Printing")} className="p-2 hover:bg-gray-100 rounded" title="Print">
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
 
           <table className="table table-bordered table-condensed footable footable-loaded default" cellspacing="0" rules="all" border="1">
             <thead>
               <tr>
                 <th data-class="expand">S. No</th>
                 <th>
                   <input id="chkIsDisplayAll" type="checkbox" onClick={(e) => CheckAll(e.target)} />
                   All
                 </th>
                 <th>Operator Name</th>
                 <th data-hide="phone">Service Type Name</th>
               </tr>
             </thead>
             <tbody>
               {filteredData.map((row) => (
                 <tr key={row.SNo}>
                   <td className="expand">{row.SNo}</td>
                   <td>
                     <input type="checkbox" />
                   </td>
                   <td>{row.MemberInfo}</td>
                   <td>{row.Particulars}</td>
                 </tr>
               ))}
             </tbody>
           </table>
         </div>
       </div>
       </div>
 
   );
 };

export default ChangeAPIPackage;
