import React, { useEffect, useState } from "react";

export default function MyLoginDetails() {
  const [login, setlogin] = useState([]);

  useEffect(() => {
    const mocklogin = [
      {
        id: 1,
        LoginIP: "49.36.181.123",
        City: "Noida",
        Latitude: "28.5355",
        Longitude: "77.3910",
        RegionCode: "UP",
        RegionName: "Uttar Pradesh",
        CountryCode: "IN",
        CountryName: "India",
        logindate: "12/26/2024",
        action: "Delete",
      },
      {
        id: 2,
        LoginIP: "192.168.127.12",
        City: "Mumbai",
        Latitude: "19.0760",
        Longitude: "72.8777",
        RegionCode: "MH",
        RegionName: "Maharashtra",
        CountryCode: "IN",
        CountryName: "India",
        logindate: "12/26/2024",
        action: "Delete",
      },
    ];
    setlogin(mocklogin);
  }, []);

  return (
    <div className="p-6 flex flex-col gap-6 bg-gray-50">
      {/* Header Section */}
      <h2 className="text-3xl font-bold text-cyan-600 mb-6">Login Management</h2>

      <div>
        {/* Login Table */}
        <table className="min-w-full border-collapse border border-gray-200 text-sm text-gray-600">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-200 py-2 px-2">S. No</th>
              <th className="border border-gray-200 py-2 px-2">Login IP</th>
              <th className="border border-gray-200 py-2 px-2">City</th>
              <th className="border border-gray-200 py-2 px-2">Latitude</th>
              <th className="border border-gray-200 py-2 px-2">Longitude</th>
              <th className="border border-gray-200 py-2 px-2">Region Code</th>
              <th className="border border-gray-200 py-2 px-2">Region Name</th>
              <th className="border border-gray-200 py-2 px-2">Country Code</th>
              <th className="border border-gray-200 py-2 px-2">Country Name</th>
              <th className="border border-gray-200 py-2 px-2">Login Date</th>
              <th className="border border-gray-200 py-2 px-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {login.length > 0 ? (
              login.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="border border-gray-200 py-2 px-2 text-center">{item.id}</td>
                  <td className="border border-gray-200 py-2 px-2 text-center">{item.LoginIP}</td>
                  <td className="border border-gray-200 py-2 px-2 text-center">{item.City}</td>
                  <td className="border border-gray-200 py-2 px-2 text-center">{item.Latitude}</td>
                  <td className="border border-gray-200 py-2 px-2 text-center">{item.Longitude}</td>
                  <td className="border border-gray-200 py-2 px-2 text-center">{item.RegionCode}</td>
                  <td className="border border-gray-200 py-2 px-2 text-center">{item.RegionName}</td>
                  <td className="border border-gray-200 py-2 px-2 text-center">{item.CountryCode}</td>
                  <td className="border border-gray-200 py-2 px-2 text-center">{item.CountryName}</td>
                  <td className="border border-gray-200 py-2 px-2 text-center">{item.logindate}</td>
                  <td className="border border-gray-200 py-2 px-2 text-center">
                    <button className="text-red-500 hover:underline">{item.action}</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  className="border border-gray-200 py-3 px-4 text-center"
                  colSpan={11}
                >
                  No logins available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
