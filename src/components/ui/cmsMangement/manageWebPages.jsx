import React, { useEffect, useState } from "react";

export default function ManageWebPages() {
  const [pages, setPages] = useState([]);
  const [showTable, setShowTable] = useState(true); // Toggle between table and add page

  useEffect(() => {
    const mockPages = [
      {
        id: 1,
        pageName: "Home",
        pageHeading: "Welcome to Our Site",
        metaTitle: "Home Page - Website",
        metaKeywords: "home, website, landing",
        date: "12/01/2024",
        status: "published",
        action: "edit",
      },
      {
        id: 2,
        pageName: "About",
        pageHeading: "About Us",
        metaTitle: "About Us - Website",
        metaKeywords: "about, us, company",
        date: "12/15/2024",
        status: "draft",
        action: "edit",
      },
    ];

    setPages(mockPages);
  }, []);

  return (
    <div className="p-6 bg-gray-50">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-cyan-600">Page Management</h2>
        <div className="flex gap-4 bg-slate-100">
          <button
            onClick={() => setShowTable(true)}
            className={`px-4 py-2 rounded-lg border-r-2 border-cyan-600 font-medium ${
              showTable ? "bg-primary-color" : "bg-tertiary-color"
            } hover:opacity-90`}
          >
            + List Pages
          </button>
          <button
            onClick={() => setShowTable(false)}
            className={`px-4 py-2 rounded-lg border-r-2 border-cyan-600 text-black font-medium ${
              !showTable ? "bg-primary-color" : "bg-tertiary-color"
            } hover:opacity-90`}
          >
            + Add Pages
          </button>
        </div>
      </div>

      {/* Conditional Rendering */}
      {showTable ? (
        <div>
          {/* Page Table */}
          <table className="min-w-full border-collapse border border-gray-200 text-sm text-gray-600">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-200 py-2 px-2">S. No</th>
                <th className="border border-gray-200 py-2 px-2">Page Name</th>
                <th className="border border-gray-200 py-2 px-2">Page Heading</th>
                <th className="border border-gray-200 py-2 px-2">Meta Title</th>
                <th className="border border-gray-200 py-2 px-2">Meta Keywords</th>
                <th className="border border-gray-200 py-2 px-2">Date</th>
                <th className="border border-gray-200 py-2 px-2">Status</th>
                <th className="border border-gray-200 py-2 px-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {pages.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="border border-gray-200 py-2 px-2 text-center">{item.id}</td>
                  <td className="border border-gray-200 py-2 px-2 text-center">{item.pageName}</td>
                  <td className="border border-gray-200 py-2 px-2 text-center">{item.pageHeading}</td>
                  <td className="border border-gray-200 py-2 px-2 text-center">{item.metaTitle}</td>
                  <td className="border border-gray-200 py-2 px-2 text-center">{item.metaKeywords}</td>
                  <td className="border border-gray-200 py-2 px-2 text-center">{item.date}</td>
                  <td className="border border-gray-200 py-2 px-2 text-center">{item.status}</td>
                  <td className="border border-gray-200 py-2 px-2 text-center">{item.action}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div>
          {/* Add Page Section */}
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Add New Page</h3>
          <form className="space-y-4">
            <div className="flex gap-6">
              <label className="text-gray-700 font-medium w-24">Page Name</label>
              <input
                type="text"
                placeholder="Enter page name"
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              />
            </div>
            <div className="flex gap-6">
              <label className="text-gray-700 font-medium w-24">Page Heading</label>
              <input
                type="text"
                placeholder="Enter page heading"
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              />
            </div>
            <div className="flex gap-6">
              <label className="text-gray-700 font-medium w-24">Meta Title</label>
              <input
                type="text"
                placeholder="Enter meta title"
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              />
            </div>
            <div className="flex gap-6">
              <label className="text-gray-700 font-medium w-24">Meta Keywords</label>
              <input
                type="text"
                placeholder="Enter meta keywords"
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              />
            </div>
            <div className="flex gap-6">
              <label className="text-gray-700 font-medium w-24">Date</label>
              <input
                type="date"
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              />
            </div>
            <div className="flex gap-6">
              <label className="b text-gray-700 font-medium mb-1 w-24">Pages Description</label>
              <input
                type="textarea "
                className="w-full border border-gray-300 rounded-lg px-3 py-20 focus:outline-none focus:ring-2 focus:ring-primary-color"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-primary-color text-white rounded-lg hover:opacity-90"
            >
              Save Page
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
