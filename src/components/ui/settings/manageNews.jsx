import React, { useState, useEffect } from "react";

export default function ManageNews() {
  const [filters, setFilters] = useState({
    name: "",
    email: "",
    type: "",
    fromDate: "",
    toDate: "",
  });
  const [pageSize, setPageSize] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [showAddnewsForm, setShowAddnewsForm] = useState(false);
  const [news, setnews] = useState([]);
  const [filterednewss, setFilterednewss] = useState([]);

  useEffect(() => {
    const mocknewss = [
        {
            No: 1,
            newsName: "Emantor Test",
            navigateURL: "https://www.emantor.com",
            newsDate: "2024-06-03",
            date: "2024-06-03",
            status: "Active",
            action: "Edit",
          },
          {
            No: 2,
            newsName: "NIKATBY ADMIN",
            navigateURL: "https://www.nikatby.com",
            newsDate: "2024-06-03",
            date: "2024-06-03",
            status: "Active",
            action: "Edit",
          },
      // Add more newss for testing
    ];
    setnews(mocknewss);
    setFilterednewss(mocknewss);
  }, []);

  const handleFilter = () => {
    let filtered = news;
    if (filters.name) {
      filtered = filtered.filter((m) =>
        m.newsName.toLowerCase().includes(filters.name.toLowerCase())
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
    setFilterednewss(filtered);
  };

  const handlePageChange = (page) => setCurrentPage(page);

  const paginatednewss = filterednewss.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const activeCount = news.filter((m) => m.status === "Active").length;
  const inactiveCount = news.length - activeCount;

  return (
    <div className="p-6 flex flex-col gap-4 bg-gray-50">
      <h2 className="text-3xl font-bold text-cyan-600 mb-4">news Management</h2>

      {/* Button to toggle between list and add news form */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setShowAddnewsForm(false)}
          className={`px-4 py-2 rounded-lg border-l-2 border-cyan-600 font-medium ${
            !showAddnewsForm
              ? "bg-primary-color shadow-lg ring-2 ring-cyan-500"
              : "bg-tertiary-color text-black hover:bg-primary-color hover:ring-cyan-700"
          }`}
        >
          + List news
        </button>
        <button
          onClick={() => setShowAddnewsForm(true)}
          className={`px-4 py-2 rounded-lg border-r-2 border-cyan-600 font-medium ${
            showAddnewsForm
              ? "bg-primary-color shadow-lg ring-2 ring-cyan-500"
              : "bg-tertiary-color text-black hover:bg-primary-color hover:ring-cyan-700"
          }`}
        >
          + Add news
        </button>
      </div>

      {/* Conditional Rendering */}
      {showAddnewsForm ? (
      <div>
      {/* Add news Form */}
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Add New News</h3>
      {/* Add your form here */}
      <form className="space-y-4">
        <div className="flex gap-6">
          <label className="text-gray-700 font-medium mb-1 w-24">News Headline</label>
          <input
            type="text"
            placeholder="Enter news headline"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-color"
          />
        </div>
        <div className="flex gap-6">
          <label className="text-gray-700 font-medium mb-1 w-24">Member Type</label>
          <select
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-color"
          >
            <option>Select member type</option>
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
          <label className="text-gray-700 font-medium mb-1 w-24">News Link</label>
          <input
            type="url"
            placeholder="Enter news link"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-color"
          />
        </div>
        <div className="flex gap-6">
          <label className="text-gray-700 font-medium mb-1 w-24">News Date</label>
          <input
            type="date"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-color"
          />
        </div>
        <div className="flex gap-6">
          <label className="text-gray-700 font-medium mb-1 w-24">News Description</label>
          <textarea
            placeholder="Enter news description"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-color"
          />
        </div>
        <div className="flex gap-6">
          <label className="text-gray-700 font-medium mb-1 w-24">News Image</label>
          <input
            type="file"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-color"
          />
        </div>
        <div className="flex gap-6">
          <label className="text-gray-700 font-medium mb-1 w-24">News Icon</label>
          <input
            type="file"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-color"
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-primary-color bg-cyan-600 text-white rounded-lg hover:opacity-90"
        >
          Save News
        </button>
      </form>
    </div>
    
      ) : (
        <div>
          {/* Summary Row */}
          <div className="bg-primary-color flex flex-col lg:flex-row text-white p-1 rounded-lg gap-4 mb-6">
              <div className="w-full md:w-1/3 bg-orange-400 p-2 text-center rounded-lg">
                Total news: {news.length}
              </div>
              <div className="w-full md:w-1/3 bg-green-400 p-2 text-center rounded-lg">
                Active news: {activeCount}
              </div>
              <div className="w-full md:w-1/3 bg-red-400 p-2 text-center rounded-lg">
                Inactive news: {inactiveCount}
              </div>
          </div>

          {/* Filters Section */}
          <div className="flex flex-wrap gap-4 mb-6">
            {/* Filters */}
          </div>

          {/* news List Table */}
          <table className="min-w-full border-collapse border border-gray-200 text-sm text-gray-600">
  <thead className="bg-gray-100">
    <tr>
      <th className="border border-gray-200 py-2 px-2">S. No</th>
      <th className="border border-gray-200 py-2 px-2">News Name</th>
      <th className="border border-gray-200 py-2 px-2">Navigate URL</th>
      <th className="border border-gray-200 py-2 px-2">News Date</th>
      <th className="border border-gray-200 py-2 px-2">Date</th>
      <th className="border border-gray-200 py-2 px-2">Status</th>
      <th className="border border-gray-200 py-2 px-2">Action</th>
    </tr>
  </thead>
  <tbody>
    {paginatednewss.map((news, index) => (
      <tr key={news.No} className="hover:bg-gray-50">
        <td className="border border-gray-200 py-2 px-2 text-center">{index + 1}</td>
        <td className="border border-gray-200 py-2 px-2 text-center">{news.newsName}</td>
        <td className="border border-gray-200 py-2 px-2 text-center">
          <a href={news.navigateURL} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
            {news.navigateURL}
          </a>
        </td>
        <td className="border border-gray-200 py-2 px-2 text-center">{news.newsDate}</td>
        <td className="border border-gray-200 py-2 px-2 text-center">{news.date}</td>
        <td className="border border-gray-200 py-2 px-2 text-center">{news.status}</td>
        <td className="border border-gray-200 py-2 px-2 text-center">
          <button className="px-2 py-1 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700">
            {news.action}
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
