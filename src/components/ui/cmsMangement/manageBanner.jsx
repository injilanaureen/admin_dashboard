import React, { useEffect, useState } from "react";

export default function ManageBanner() {
  const [banner, setBanner] = useState([]);
  const [showTable, setShowTable] = useState(true); // Toggle between table and add banner

  useEffect(() => {
    const mockBanner = [
      {
        id: 1,
        img: "/images/networking.png",
        bannername: "Add banner",
        bannertitle: "banners",
        position: "me@mailbox.com",
        date: "12/26/2024",
        status: "done",
        action: "implemented",
      },
      {
        id: 2,
        img: "/images/wallet.svg",
        bannername: "banner2",
        bannertitle: "Image banners",
        position: "injila@mailbox.com",
        date: "02/28/2024",
        status: "pending",
        action: "in progress",
      },
    ];
    setBanner(mockBanner);
  }, []);

  return (
    <div className="p-6 flex flex-col gap-1 bg-gray-50">
      {/* Header Section */}
    <h2 className="text-3xl font-bold text-cyan-600 mb-6">Banner Management</h2>
        <div className="flex justify-between bg-slate-100 mb-4 w-1/6">
      <button
        onClick={() => setShowTable(true)}
        className={`px-4 py-2 rounded-lg border-l-2 border-cyan-600 font-medium ${
          showTable
            ? "bg-primary-color shadow-lg ring-2 ring-cyan-500"
            : "bg-tertiary-color text-black hover:bg-primary-color hover:ring-cyan-700"
        } hover:opacity-90 transition duration-300`}
      >
        + List Banner
      </button>
      <button
        onClick={() => setShowTable(false)}
        className={`px-4 py-2 rounded-lg border-r-2 border-cyan-600 font-medium ${
          !showTable
            ? "bg-primary-color shadow-lg ring-2 ring-cyan-500"
            : "bg-tertiary-color text-black hover:bg-primary-color hover:ring-cyan-700"
        } hover:opacity-90 transition duration-300`}
      >
        + Add Banner
      </button>
    </div>

      {/* Conditional Rendering */}
      {showTable ? (
        <div>
          {/* Banner Table */}
          <table className="min-w-full border-collapse border border-gray-200 text-sm text-gray-600">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-200 py-2 px-2">S. No</th>
                <th className="border border-gray-200 py-2 px-2">Banner Image</th>
                <th className="border border-gray-200 py-2 px-2">Banner Name</th>
                <th className="border border-gray-200 py-2 px-2">Banner Title</th>
                <th className="border border-gray-200 py-2 px-2">Position</th>
                <th className="border border-gray-200 py-2 px-2">Date</th>
                <th className="border border-gray-200 py-2 px-2">Status</th>
                <th className="border border-gray-200 py-2 px-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {banner.length > 0 ? (
                banner.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="border border-gray-200 py-2 px-2 text-center">{item.id}</td>
                    <td className="border border-gray-200 py-2 px-2 text-center">
                      <img
                        src={item.img}
                        alt="banner"
                        className="w-8 h-8 mx-auto"
                      />
                    </td>
                    <td className="border border-gray-200 py-2 px-2 text-center">
                      {item.bannername}
                    </td>
                    <td className="border border-gray-200 py-2 px-2 text-center">
                      {item.bannertitle}
                    </td>
                    <td className="border border-gray-200 py-2 px-2 text-center">
                      {item.position}
                    </td>
                    <td className="border border-gray-200 py-2 px-2 text-center">
                      {item.date}
                    </td>
                    <td className="border border-gray-200 py-2 px-2 text-center">
                      {item.status}
                    </td>
                    <td className="border border-gray-200 py-2 px-2 text-center">
                      {item.action}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    className="border border-gray-200 py-3 px-4 text-center"
                    colSpan={8}
                  >
                    No banners available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      ) : (
        <div>
          {/* Add Banner Section */}
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Add New Banner</h3>
          <form className="space-y-4">
            <div className="flex gap-6">
              <label className="text-gray-700 font-medium mb-1 w-24">Banner Name</label>
              <input
                type="text"
                placeholder="Enter banner name"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-color"
              />
            </div>
            <div className="flex gap-6">
              <label className="block text-gray-700 font-medium mb-1 w-24">Banner Title</label>
              <input
                type="text"
                placeholder="Enter banner title"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-color"
              />
            </div>
            <div className="flex gap-6">
              <label className="block text-gray-700 font-medium mb-1 w-24">Position</label>
              <input
                type="text"
                placeholder="Enter position"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-color"
              />
            </div>
            <div className="flex gap-6">
              <label className="block text-gray-700 font-medium mb-1 w-24">Date</label>
              <input
                type="date"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-color"
              />
            </div>
            <div className="flex gap-6">
              <label className="b text-gray-700 font-medium mb-1 w-24">Banner Description</label>
              <input
                type="textarea "
                className="w-full border border-gray-300 rounded-lg px-3 py-20 focus:outline-none focus:ring-2 focus:ring-primary-color"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-primary-color text-white rounded-lg hover:opacity-90"
            >
              Save Banner
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
