import React, { useState, useEffect } from "react";

export default function MemberManagement() {
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
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setShowAddMemberForm(false)}
          className={`px-4 py-2 rounded-lg border-l-2 border-cyan-600 font-medium ${
            !showAddMemberForm ? "bg-primary-color shadow-lg ring-2 ring-cyan-500" : "bg-tertiary-color text-black hover:bg-primary-color hover:ring-cyan-700"
          }`}
        >
          + List Members
        </button>
        <button
          onClick={() => setShowAddMemberForm(true)}
          className={`px-4 py-2 rounded-lg border-r-2 border-cyan-600 font-medium ${
            showAddMemberForm ? "bg-primary-color shadow-lg ring-2 ring-cyan-500" : "bg-tertiary-color text-black hover:bg-primary-color hover:ring-cyan-700"
          }`}
        >
          + Add Member
        </button>
      </div>

      {/* Conditional Rendering */}
      {showAddMemberForm ? (
        <div>
          {/* Add Member Form */}
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Add New Member</h3>
          <form className="space-y-4">
            <div className="flex gap-6">
              <label className="text-gray-700 font-medium mb-1 w-24">First Name</label>
              <input
                type="text"
                placeholder="Enter first name"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-color"
              />
            </div>
            <div className="flex gap-6">
              <label className="text-gray-700 font-medium mb-1 w-24">Last Name</label>
              <input
                type="text"
                placeholder="Enter last name"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-color"
              />
            </div>
            <div className="flex gap-6">
              <label className="text-gray-700 font-medium mb-1 w-24">Email</label>
              <input
                type="email"
                placeholder="Enter email"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-color"
              />
            </div>
            <div className="flex gap-6">
              <label className="text-gray-700 font-medium mb-1 w-24">Mobile Number</label>
              <input
                type="text"
                placeholder="Enter mobile number"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-color"
              />
            </div>
            <div className="flex gap-6">
              <label className="text-gray-700 font-medium mb-1 w-24">Package</label>
              <select
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-color"
              >
                <option>Select Package</option>
                <option>Basic Plan</option>
                <option>Premium Plan</option>
                <option>VIP Plan</option>
              </select>
            </div>
            <div className="flex gap-6">
              <label className="text-gray-700 font-medium mb-1 w-24">Date of Birth</label>
              <input
                type="date"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-color"
              />
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
      <div className="bg-primary-color flex text-orange-700 p-4 rounded-lg flex justify-between">
        <div className="w-1/3 bg-orange-300 p-2 text-center">Total Members: {member.length}</div>
        <div className="w-1/3 bg-red-300 p-2 text-center">Active Members: {activeCount}</div>
        <div className="w-1/3 bg-blue-300 p-2 text-center">Inactive Members: {inactiveCount}</div>
      </div>

      {/* Filters Section */}
      <div className="flex flex-wrap gap-4 mb-6">
        <input
          type="text"
          placeholder="Filter by Name"
          value={filters.name}
          onChange={(e) => setFilters({ ...filters, name: e.target.value })}
          className="border border-gray-300 rounded-lg px-3 py-2 w-48 focus:ring-2 focus:ring-cyan-500"
        />
        <input
          type="text"
          placeholder="Filter by Email"
          value={filters.email}
          onChange={(e) => setFilters({ ...filters, email: e.target.value })}
          className="border border-gray-300 rounded-lg px-3 py-2 w-48 focus:ring-2 focus:ring-cyan-500"
        />
        <input
          type="date"
          value={filters.fromDate}
          onChange={(e) => setFilters({ ...filters, fromDate: e.target.value })}
          className="border border-gray-300 rounded-lg px-3 py-2 w-48 focus:ring-2 focus:ring-cyan-500"
        />
        <input
          type="date"
          value={filters.toDate}
          onChange={(e) => setFilters({ ...filters, toDate: e.target.value })}
          className="border border-gray-300 rounded-lg px-3 py-2 w-48 focus:ring-2 focus:ring-cyan-500"
        />
        <select
          value={filters.type}
          onChange={(e) => setFilters({ ...filters, type: e.target.value })}
          className="border border-gray-300 rounded-lg px-3 py-2 w-48 focus:ring-2 focus:ring-cyan-500"
        >
          <option value="">Filter by Type</option>
          <option value="COMPANY">Company</option>
          <option value="API Partner">API Partner</option>
        </select>
        <button
          onClick={handleFilter}
          className="px-4 py-2 bg-primary-color text-black bg-orange-200 rounded-lg hover:opacity-90"
        >
          Apply Filters
        </button>
      </div>
          {/* Member List Table */}
          <table className="min-w-full border-collapse border border-gray-200 text-sm text-gray-600">
  <thead className="bg-gray-100">
    <tr>
      <th className="border border-gray-200 py-2 px-2">S. No</th>
      <th className="border border-gray-200 py-2 px-2">Member ID</th>
      <th className="border border-gray-200 py-2 px-2">Member Name</th>
      <th className="border border-gray-200 py-2 px-2">Contact Info</th>
      <th className="border border-gray-200 py-2 px-2">Owner ID</th>
      <th className="border border-gray-200 py-2 px-2">Package</th>
      <th className="border border-gray-200 py-2 px-2">Joining Date</th>
      <th className="border border-gray-200 py-2 px-2">Status</th>
      <th className="border border-gray-200 py-2 px-2">Quick Action</th>
    </tr>
  </thead>
  <tbody>
    {paginatedMembers.map((member, index) => (
      <tr key={member.id} className="hover:bg-gray-50">
        <td className="border border-gray-200 py-2 px-2 text-center">{index + 1}</td>
        <td className="border border-gray-200 py-2 px-2 text-center">{member.memberId}</td>
        <td className="border border-gray-200 py-2 px-2 text-center">{member.memberName}</td>
        <td className="border border-gray-200 py-2 px-2 text-center">{member.contactInfo}</td>
        <td className="border border-gray-200 py-2 px-2 text-center">{member.ownerId}</td>
        <td className="border border-gray-200 py-2 px-2 text-center">{member.package}</td>
        <td className="border border-gray-200 py-2 px-2 text-center">{member.joiningDate}</td>
        <td className="border border-gray-200 py-2 px-2 text-center">{member.status}</td>
        <td className="border border-gray-200 py-2 px-2 text-center">
          <button className="px-2 py-1 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700">
            Edit
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
