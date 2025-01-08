import React, { useState, useEffect } from "react";

export default function ManageNoticeBoard() {
  const [filters, setFilters] = useState({
    name: "",
    email: "",
    type: "",
    fromDate: "",
    toDate: "",
  });
  const [pageSize, setPageSize] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [showAddnoticeForm, setShowAddnoticeForm] = useState(false);
  const [notice, setnotice] = useState([]);
  const [filterednotices, setFilterednotices] = useState([]);

  useEffect(() => {
    const mocknotices = [
        {
          No: 1,
          backgroundImage: "https://www.example.com/image1.jpg",
          heading: "Emantor Test",
          modalPopupSize: "Large",
          packageName: "Premium Plan",
          memberTypeName: "All Members",
          date: "2024-06-03",
          isDefault: "Yes",
          status: "Active",
          action: "Edit",
        },
        {
          No: 2,
          backgroundImage: "https://www.example.com/image2.jpg",
          heading: "NIKATBY ADMIN",
          modalPopupSize: "Medium",
          packageName: "Basic Plan",
          memberTypeName: "Specific Members",
          date: "2024-06-03",
          isDefault: "No",
          status: "Active",
          action: "Edit",
        },
        // Add more notices for testing
      ];
      
      setnotice(mocknotices);
      setFilterednotices(mocknotices);
      
  }, []);

  const handleFilter = () => {
    let filtered = notice;
    if (filters.name) {
      filtered = filtered.filter((m) =>
        m.noticeName.toLowerCase().includes(filters.name.toLowerCase())
      );
    }
    if (filters.email) {
      filtered = filtered.filter((m) =>
        m.email.toLowerCase().includes(filters.email.toLowerCase())
      );
    }
    if (filters.type) {
      filtered = filtered.filter((m) =>
        m.ownerId.toLowerCase().includes(filters.type.toLowerCase())
      );
    }
    if (filters.fromDate) {
      filtered = filtered.filter(
        (m) => new Date(m.joiningDate) >= new Date(filters.fromDate)
      );
    }
    if (filters.toDate) {
      filtered = filtered.filter(
        (m) => new Date(m.joiningDate) <= new Date(filters.toDate)
      );
    }
    setFilterednotices(filtered);
  };

  const handlePageChange = (page) => setCurrentPage(page);

  const paginatednotices = filterednotices.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const activeCount = notice.filter((m) => m.status === "Active").length;
  const inactiveCount = notice.length - activeCount;

  return (
    <div className="p-6 flex flex-col gap-4 bg-gray-50">
      <h2 className="text-3xl font-bold text-cyan-600 mb-4">Notice Board Management</h2>

      {/* Button to toggle between list and add notice form */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setShowAddnoticeForm(false)}
          className={`px-4 py-2 rounded-lg border-l-2 border-cyan-600 font-medium ${
            !showAddnoticeForm
              ? "bg-primary-color shadow-lg ring-2 ring-cyan-500"
              : "bg-tertiary-color text-black hover:bg-primary-color hover:ring-cyan-700"
          }`}
        >
          + List notice
        </button>
        <button
          onClick={() => setShowAddnoticeForm(true)}
          className={`px-4 py-2 rounded-lg border-r-2 border-cyan-600 font-medium ${
            showAddnoticeForm
              ? "bg-primary-color shadow-lg ring-2 ring-cyan-500"
              : "bg-tertiary-color text-black hover:bg-primary-color hover:ring-cyan-700"
          }`}
        >
          + Add notice
        </button>
      </div>

      {/* Conditional Rendering */}
      {showAddnoticeForm ? (
   <div>
   {/* Add notice Form */}
   <h3 className="text-xl font-semibold text-gray-800 mb-4">Add New Notice</h3>
   {/* Add your form here */}
   <form className="space-y-4">
     <div className="flex gap-6">
       <label className="text-gray-700 font-medium mb-1 w-24">Heading</label>
       <input
         type="text"
         placeholder="Enter notice headline"
         className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-color"
       />
     </div>
 
     <div className="flex gap-6">
       <label className="text-gray-700 font-medium mb-1 w-24">Start Date</label>
       <input
         type="date"
         className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-color"
       />
     </div>
 
     <div className="flex gap-6">
       <label className="text-gray-700 font-medium mb-1 w-24">Expiry Date</label>
       <input
         type="date"
         className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-color"
       />
     </div>
 
     <div className="flex gap-6">
       <label className="text-gray-700 font-medium mb-1 w-24">No. of Times Reminder</label>
       <input
         type="number"
         placeholder="Enter reminder count"
         className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-color"
       />
     </div>
 
     <div className="flex gap-6">
       <label className="text-gray-700 font-medium mb-1 w-24">Member Type</label>
       <select
         className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-color"
       >
         <option>Select Member Type</option>
         <option>For All Members</option>
         <option>For Specific Members</option>
       </select>
     </div>
 
     <div className="flex gap-6">
       <label className="text-gray-700 font-medium mb-1 w-24">Package</label>
       <select
         className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-color"
       >
         <option>Select Package</option>
         <option>For All Packages</option>
         <option>Basic Plan</option>
         <option>Premium Plan</option>
         <option>VIP Plan</option>
       </select>
     </div>
 
     <div className="flex gap-6">
       <label className="text-gray-700 font-medium mb-1 w-24">Popup Size</label>
       <select
         className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-color"
       >
         <option>Select Popup Size</option>
         <option>Small</option>
         <option>Medium</option>
         <option>Large</option>
       </select>
     </div>
 
     <div className="flex gap-6">
       <label className="text-gray-700 font-medium mb-1 w-24">Width x Height</label>
       <div className="flex gap-2">
         <input
           type="number"
           placeholder="Width"
           className="w-1/2 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-color"
         />
         <span className="text-gray-700">X</span>
         <input
           type="number"
           placeholder="Height"
           className="w-1/2 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-color"
         />
       </div>
     </div>
 
     <div className="flex gap-6">
       <label className="text-gray-700 font-medium mb-1 w-24">Background Color</label>
       <input
         type="color"
         className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-color"
       />
     </div>
 
     <div className="flex gap-6">
       <label className="text-gray-700 font-medium mb-1 w-24">Background Image</label>
       <input
         type="file"
         className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-color"
       />
     </div>
 
     <div className="flex gap-6">
       <label className="text-gray-700 font-medium mb-1 w-24">Notice Description</label>
       <textarea
         placeholder="Enter notice description"
         className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-color"
       />
     </div>
 
     <button
       type="submit"
       className="px-4 py-2 bg-primary-color bg-cyan-600 text-white rounded-lg hover:opacity-90"
     >
       Save Notice
     </button>
   </form>
 </div>
 
    
      ) : (
        <div>
          {/* Summary Row */}
          <div className="bg-primary-color flex flex-col lg:flex-row text-white p-1 rounded-lg gap-4 mb-6">
              <div className="w-full md:w-1/3 bg-orange-400 p-2 text-center rounded-lg">
                Total notice: {notice.length}
              </div>
              <div className="w-full md:w-1/3 bg-green-400 p-2 text-center rounded-lg">
                Active notice: {activeCount}
              </div>
              <div className="w-full md:w-1/3 bg-red-400 p-2 text-center rounded-lg">
                Inactive notice: {inactiveCount}
              </div>
          </div>

          {/* Filters Section */}
          <div className="flex flex-wrap gap-4 mb-6">
            {/* Filters */}
          </div>

          {/* notice List Table */}
          <table className="min-w-full border-collapse border border-gray-200 text-sm text-gray-600">
  <thead className="bg-gray-100">
    <tr>
      <th className="border border-gray-200 py-2 px-2">S. No</th>
      <th className="border border-gray-200 py-2 px-2">Background Image</th>
      <th className="border border-gray-200 py-2 px-2">Heading</th>
      <th className="border border-gray-200 py-2 px-2">Modal Popup Size</th>
      <th className="border border-gray-200 py-2 px-2">Package Name</th>
      <th className="border border-gray-200 py-2 px-2">Member Type Name</th>
      <th className="border border-gray-200 py-2 px-2">Date</th>
      <th className="border border-gray-200 py-2 px-2">Is Default</th>
      <th className="border border-gray-200 py-2 px-2">Status</th>
      <th className="border border-gray-200 py-2 px-2">Action</th>
    </tr>
  </thead>
  <tbody>
    {paginatednotices.map((notice, index) => (
      <tr key={notice.No} className="hover:bg-gray-50">
        <td className="border border-gray-200 py-2 px-2 text-center">{index + 1}</td>
        <td className="border border-gray-200 py-2 px-2 text-center">
          <img src={notice.backgroundImage} alt="Background" className="w-16 h-16 object-cover" />
        </td>
        <td className="border border-gray-200 py-2 px-2 text-center">{notice.heading}</td>
        <td className="border border-gray-200 py-2 px-2 text-center">{notice.modalPopupSize}</td>
        <td className="border border-gray-200 py-2 px-2 text-center">{notice.packageName}</td>
        <td className="border border-gray-200 py-2 px-2 text-center">{notice.memberTypeName}</td>
        <td className="border border-gray-200 py-2 px-2 text-center">{notice.date}</td>
        <td className="border border-gray-200 py-2 px-2 text-center">{notice.isDefault}</td>
        <td className="border border-gray-200 py-2 px-2 text-center">{notice.status}</td>
        <td className="border border-gray-200 py-2 px-2 text-center">
          <button className="px-2 py-1 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700">
            {notice.action}
          </button>
        </td>
      </tr>
    ))}
  </tbody>
</table>

        </div>
      )}
    </div>
  );
}
