import React, { useState, useEffect } from "react";

export default function MembersKYC() {
  const [filters, setFilters] = useState({
    name: "",
    email: "",
    type: "",
    fromDate: "",
    toDate: "",
  });
  const [pageSize, setPageSize] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [showAddMemberForm, setShowAddMemberForm] = useState(false);
  const [member, setMember] = useState([]);
  const [filteredMembers, setFilteredMembers] = useState([]);

  useEffect(() => {
    const mockMembers = [
      {
        id: 1,
        memberId: "AP755059",
        memberName: "Emantor Test",
        contactInfo: "7014954198",
        email: "support@emantor.com",
        ownerId: "COMPANY",
        package: "API Partner",
        joiningDate: "2024-06-03",
        status: "Active",
        quickAction: "Edit",
      },
      {
        id: 2,
        memberId: "COMPANY",
        memberName: "NIKATBY ADMIN",
        contactInfo: "7257912695",
        email: "nikatby.pgpay@gmail.com",
        ownerId: "COMPANY",
        package: "Free Package",
        joiningDate: "2024-06-03",
        status: "Active",
        quickAction: "Edit",
      },
      // Add more members for testing
    ];
    setMember(mockMembers);
    setFilteredMembers(mockMembers);
  }, []);

  const handleFilter = () => {
    let filtered = member;
    if (filters.name) {
      filtered = filtered.filter((m) =>
        m.memberName.toLowerCase().includes(filters.name.toLowerCase())
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
    setFilteredMembers(filtered);
  };

  const handlePageChange = (page) => setCurrentPage(page);

  const paginatedMembers = filteredMembers.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const activeCount = member.filter((m) => m.status === "Active").length;
  const inactiveCount = member.length - activeCount;

  return (
    <div className="p-6 flex flex-col gap-4 bg-gray-50">
      <h2 className="text-3xl font-bold text-cyan-600 mb-4">Member Management</h2>

      {/* Button to toggle between list and add member form */}
      <div className="flex flex-wrap gap-4 mb-6">
        <button
          onClick={() => setShowAddMemberForm(false)}
          className={`px-4 py-2 rounded-lg border-l-2 border-cyan-600 font-medium ${!showAddMemberForm ? "bg-primary-color shadow-lg ring-2 ring-cyan-500" : "bg-tertiary-color text-black hover:bg-primary-color hover:ring-cyan-700"}`}
        >
          + List Members KYC
        </button>
        <button
          onClick={() => setShowAddMemberForm(true)}
          className={`px-4 py-2 rounded-lg border-r-2 border-cyan-600 font-medium ${showAddMemberForm ? "bg-primary-color shadow-lg ring-2 ring-cyan-500" : "bg-tertiary-color text-black hover:bg-primary-color hover:ring-cyan-700"}`}
        >
          + Add Member KYC
        </button>
      </div>

      {/* Conditional Rendering */}
      {showAddMemberForm ? (
        <div>
          {/* Add Member KYC Form */}
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Add New Member KYC</h3>
          <form className="space-y-4">
            {/* Form Fields */}
            <div className="flex flex-col md:flex-row gap-6">
              <label className="text-gray-700 font-medium mb-1 w-full md:w-48">Full Name:</label>
              <input
                type="text"
                placeholder="Enter full name"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-color"
              />
            </div>
            <div className="flex flex-col md:flex-row gap-6">
              <label className="text-gray-700 font-medium mb-1 w-full md:w-48">Contact Number:</label>
              <input
                type="text"
                placeholder="Enter contact number"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-color"
              />
            </div>
            <div className="flex flex-col md:flex-row gap-6">
              <label className="text-gray-700 font-medium mb-1 w-full md:w-48">Email Address:</label>
              <input
                type="email"
                placeholder="Enter email address"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-color"
              />
            </div>
            <div className="flex flex-col md:flex-row gap-6">
              <label className="text-gray-700 font-medium mb-1 w-full md:w-48">Outlet ID:</label>
              <input
                type="text"
                placeholder="Enter outlet ID"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-color"
              />
            </div>
            <div className="flex flex-col md:flex-row gap-6">
              <label className="text-gray-700 font-medium mb-1 w-full md:w-48">PAN Number:</label>
              <input
                type="text"
                placeholder="Enter PAN number"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-color"
              />
            </div>
            <div className="flex flex-col md:flex-row gap-6">
              <label className="text-gray-700 font-medium mb-1 w-full md:w-48">Aadhaar Number:</label>
              <input
                type="text"
                placeholder="Enter Aadhaar number"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-color"
              />
            </div>
            <div className="flex flex-col md:flex-row gap-6">
              <label className="text-gray-700 font-medium mb-1 w-full md:w-48">KYC Status:</label>
              <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-color">
                <option value="">Select KYC Status</option>
                <option value="Verified">Verified</option>
                <option value="Pending">Pending</option>
              </select>
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-primary-color bg-cyan-600 text-white rounded-lg hover:opacity-90"
            >
              Save Member
            </button>
          </form>
        </div>
      ) : (
        <div>
          {/* Summary Row */}
          <div className="bg-primary-color flex text-orange-700 p-4 rounded-lg flex-wrap gap-4 justify-between">
            <div className="w-full md:w-1/3 bg-orange-300 p-2 text-center">Total Members: {member.length}</div>
            <div className="w-full md:w-1/3 bg-red-300 p-2 text-center">Active Members: {activeCount}</div>
            <div className="w-full md:w-1/3 bg-blue-300 p-2 text-center">Inactive Members: {inactiveCount}</div>
          </div>

          {/* Filters Section */}
          <div className="flex flex-wrap gap-4 mb-6">
            {/* Filter Inputs */}
            <input
              type="text"
              placeholder="Filter by Name"
              value={filters.name}
              onChange={(e) => setFilters({ ...filters, name: e.target.value })}
              className="border border-gray-300 rounded-lg px-3 py-2 w-full sm:w-48 focus:ring-2 focus:ring-cyan-500"
            />
            <input
              type="text"
              placeholder="Filter by Email"
              value={filters.email}
              onChange={(e) => setFilters({ ...filters, email: e.target.value })}
              className="border border-gray-300 rounded-lg px-3 py-2 w-full sm:w-48 focus:ring-2 focus:ring-cyan-500"
            />
            <input
              type="text"
              placeholder="Filter by Type"
              value={filters.type}
              onChange={(e) => setFilters({ ...filters, type: e.target.value })}
              className="border border-gray-300 rounded-lg px-3 py-2 w-full sm:w-48 focus:ring-2 focus:ring-cyan-500"
            />
            <input
              type="date"
              value={filters.fromDate}
              onChange={(e) => setFilters({ ...filters, fromDate: e.target.value })}
              className="border border-gray-300 rounded-lg px-3 py-2 w-full sm:w-48 focus:ring-2 focus:ring-cyan-500"
            />
            <input
              type="date"
              value={filters.toDate}
              onChange={(e) => setFilters({ ...filters, toDate: e.target.value })}
              className="border border-gray-300 rounded-lg px-3 py-2 w-full sm:w-48 focus:ring-2 focus:ring-cyan-500"
            />
            <button
              onClick={handleFilter}
              className="bg-cyan-500 text-white px-4 py-2 rounded-lg mt-2 sm:mt-0 w-full sm:w-auto"
            >
              Apply Filters
            </button>
          </div>

         {/* Table */}
<div className="overflow-x-auto bg-white shadow-md rounded-lg">
  <table className="min-w-full table-auto">
    <thead>
      <tr className="bg-gray-200 text-gray-700 text-sm">
        <th className="py-2 px-3 text-left">Member Name</th>
        <th className="py-2 px-3 text-left">Email</th>
        <th className="py-2 px-3 text-left">Package</th>
        <th className="py-2 px-3 text-left">Joining Date</th>
        <th className="py-2 px-3 text-left">Status</th>
        <th className="py-2 px-3 text-left">Actions</th>
      </tr>
    </thead>
    <tbody className="text-sm">
      {paginatedMembers.map((member) => (
        <tr key={member.id} className="border-t">
          <td className="py-2 px-3">{member.memberName}</td>
          <td className="py-2 px-3">{member.email}</td>
          <td className="py-2 px-3">{member.package}</td>
          <td className="py-2 px-3">{member.joiningDate}</td>
          <td className="py-2 px-3">{member.status}</td>
          <td className="py-2 px-3">{member.quickAction}</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>


          {/* Pagination */}
          <div className="flex justify-center gap-2 mt-6">
            {[...Array(Math.ceil(filteredMembers.length / pageSize))].map((_, idx) => (
              <button
                key={idx}
                onClick={() => handlePageChange(idx + 1)}
                className={`px-4 py-2 rounded-lg ${currentPage === idx + 1 ? "bg-cyan-600 text-white" : "bg-gray-300"}`}
              >
                {idx + 1}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
