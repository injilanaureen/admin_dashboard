import React, { useEffect, useState } from "react";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [showTable, setShowTable] = useState(true); // Toggle between table and add user
  const [newUser, setNewUser] = useState({
    userName: "",
    email: "",
    mobile: "",
    loginId: "",
    password: "",
    address: "",
    profilePicture: null,
  });

  useEffect(() => {
    // Simulating fetching users data
    const mockUsers = [
      {
        userId: 1,
        userName: "John Doe",
        email: "john.doe@example.com",
        mobile: "1234567890",
        date: "12/26/2024",
        status: "Active",
      },
      {
        userId: 2,
        userName: "Jane Smith",
        email: "jane.smith@example.com",
        mobile: "9876543210",
        date: "12/28/2024",
        status: "Inactive",
      },
    ];
    setUsers(mockUsers);
  }, []);

  // Simulate saving data to the database
  const handleSubmit = (e) => {
    e.preventDefault();

    // Simulate adding a new user
    const newUserData = {
      userId: users.length + 1, // Simulating an auto-increment ID
      ...newUser,
      date: new Date().toLocaleDateString(), // Current date
      status: "Active", // Default status
    };

    setUsers((prev) => [...prev, newUserData]);
    alert(`New User Added Successfully!`);
    handleReset(); // Reset form after submission
  };

  // Handle resetting the form
  const handleReset = () => {
    setNewUser({
      userName: "",
      email: "",
      mobile: "",
      loginId: "",
      password: "",
      address: "",
      profilePicture: null,
      employeeType:"",
    });
  };

  return (
    <div className="p-6 flex flex-col gap-6 bg-gray-50">
      {/* Header Section */}
      <h2 className="text-3xl font-bold text-cyan-600 mb-6">Users Management</h2>

      {/* Button Toggle */}
      <div className="flex flex-col sm:flex-row w-full bg-slate-100 mb-6 p-4 rounded-lg">
        <button
          onClick={() => setShowTable(true)}
          className={`px-4 py-2 rounded-lg border-l-2 border-cyan-600 font-medium w-full sm:w-auto ${
            showTable ? "bg-primary-color shadow-lg ring-2 ring-cyan-500" : "bg-tertiary-color text-black hover:bg-primary-color hover:ring-cyan-700"
          } hover:opacity-90 transition duration-300`}
        >
          + List Users
        </button>
        <button
          onClick={() => setShowTable(false)}
          className={`px-4 py-2 rounded-lg border-r-2 border-cyan-600 font-medium w-full sm:w-auto ${
            !showTable ? "bg-primary-color shadow-lg ring-2 ring-cyan-500" : "bg-tertiary-color text-black hover:bg-primary-color hover:ring-cyan-700"
          } hover:opacity-90 transition duration-300`}
        >
          + Add User
        </button>
      </div>

      {/* Conditional Rendering */}
      {showTable ? (
        <div>
          {/* User Table */}
          <table className="min-w-full border-collapse border border-gray-200 text-sm text-gray-600 overflow-x-auto">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-200 py-2 px-2 sm:w-1/12 text-center">S. No</th>
                <th className="border border-gray-200 py-2 px-2 sm:w-1/4 text-center">User Name</th>
                <th className="border border-gray-200 py-2 px-2 sm:w-1/4 text-center">Email</th>
                <th className="border border-gray-200 py-2 px-2 sm:w-1/4 text-center">Mobile</th>
                <th className="border border-gray-200 py-2 px-2 sm:w-1/6 text-center">Date</th>
                <th className="border border-gray-200 py-2 px-2 sm:w-1/6 text-center ">Status</th>
                <th className="border border-gray-200 py-2 px-2 text-center sm:w-1/12">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map((user, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="border border-gray-200 py-2 px-2 text-center">{user.userId}</td>
                    <td className="border border-gray-200 py-2 px-2 text-center">{user.userName}</td>
                    <td className="border border-gray-200 py-2 px-2 text-center">{user.email}</td>
                    <td className="border border-gray-200 py-2 px-2 text-center">{user.mobile}</td>
                    <td className="border border-gray-200 py-2 px-2 text-center ">{user.date}</td>
                    <td className="border border-gray-200 py-2 px-2 text-center ">{user.status}</td>
                    <td className="border py-2 px-2 text-center">
                      <button className="px-2 py-1 bg-cyan-600 text-white rounded-md hover:bg-cyan-700">
                        Edit
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    className="border border-gray-200 py-3 px-4 text-center"
                    colSpan={7}
                  >
                    No users available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      ) : (
        <div>
          {/* Add User Form */}
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Add User</h3>
          <form onSubmit={handleSubmit} className="space-y-6">
             {/* Employee Type */}
             <div className="flex flex-col sm:flex-row gap-6">
              <label className="text-gray-700 font-medium mb-1 w-full sm:w-1/4">Employee Type<span className="text-red-600">*</span></label>
              <select
                value={newUser.employeeType}
                onChange={(e) => setNewUser({ ...newUser, employeeType: e.target.value })}
                className="w-full sm:w-3/4 border border-gray-300 rounded-lg px-3 py-2"
                required
              >
                <option value="Free">Free</option>
                <option value="Paid">Paid</option>
              </select>
            </div>
            {/* User Name */}
            <div className="flex flex-col sm:flex-row gap-6">
              <label className="text-gray-700 font-medium mb-1 w-full sm:w-1/4">User Name<span className="text-red-600">*</span></label>
              <input
                type="text"
                value={newUser.userName}
                onChange={(e) => setNewUser({ ...newUser, userName: e.target.value })}
                placeholder="Enter user name"
                className="w-full sm:w-3/4 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-color"
                required
              />
            </div>

            {/* Email */}
            <div className="flex flex-col sm:flex-row gap-6">
              <label className="text-gray-700 font-medium mb-1 w-full sm:w-1/4">Email</label>
              <input
                type="email"
                value={newUser.email}
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                placeholder="Enter email"
                className="w-full sm:w-3/4 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-color"
              />
            </div>

            {/* Mobile */}
            <div className="flex flex-col sm:flex-row gap-6">
              <label className="text-gray-700 font-medium mb-1 w-full sm:w-1/4">Mobile<span className="text-red-600">*</span></label>
              <input
                type="text"
                value={newUser.mobile}
                onChange={(e) => setNewUser({ ...newUser, mobile: e.target.value })}
                placeholder="Enter mobile number"
                maxLength="10"
                className="w-full sm:w-3/4 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-color"
                required
              />
            </div>

            {/* Login ID */}
            <div className="flex flex-col sm:flex-row gap-6">
              <label className="text-gray-700 font-medium mb-1 w-full sm:w-1/4">Login ID<span className="text-red-600">*</span></label>
              <input
                type="text"
                value={newUser.loginId}
                onChange={(e) => setNewUser({ ...newUser, loginId: e.target.value })}
                placeholder="Enter login ID"
                maxLength="100"
                className="w-full sm:w-3/4 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-color"
                required
              />
            </div>

            {/* Password */}
            <div className="flex flex-col sm:flex-row gap-6">
              <label className="text-gray-700 font-medium mb-1 w-full sm:w-1/4">Password<span className="text-red-600">*</span></label>
              <input
                type="password"
                value={newUser.password}
                onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                placeholder="Enter password"
                className="w-full sm:w-3/4 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-color"
                required
              />
            </div>

            {/* Address */}
            <div className="flex flex-col sm:flex-row gap-6">
              <label className="text-gray-700 font-medium mb-1 w-full sm:w-1/4">Address</label>
              <textarea
                value={newUser.address}
                onChange={(e) => setNewUser({ ...newUser, address: e.target.value })}
                placeholder="Enter address"
                className="w-full sm:w-3/4 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-color"
              />
            </div>

            {/* Profile Picture */}
            <div className="flex flex-col sm:flex-row gap-6">
              <label className="text-gray-700 font-medium mb-1 w-full sm:w-1/4">Profile Picture</label>
              <input
                type="file"
                onChange={(e) => setNewUser({ ...newUser, profilePicture: e.target.files[0] })}
                className="w-full sm:w-3/4 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-color"
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-end mt-6">
              <button
                type="submit"
                className="px-6 py-2 bg-primary-color text-white rounded-lg hover:bg-tertiary-color"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
