import React, { useState } from "react";

const Compose = () => {
  const [formData, setFormData] = useState({
    to: "",
    subject: "",
    body: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Email Sent to: ${formData.to}\nSubject: ${formData.subject}`);
    // Reset form after submission
    setFormData({ to: "", subject: "", body: "" });
  };

  return (
    <div className="p-6 bg-gray-50">
      <h2 className="text-2xl font-bold text-cyan-600 mb-4">Compose Email</h2>
      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-white p-6 rounded-lg shadow-md"
      >
        <div>
          <label className="block text-sm font-medium text-gray-600">To:</label>
          <input
            type="email"
            name="to"
            value={formData.to}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600">Subject:</label>
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600">Body:</label>
          <textarea
            name="body"
            value={formData.body}
            onChange={handleChange}
            rows="6"
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-cyan-600 text-white py-2 px-4 rounded-md shadow hover:bg-cyan-700 transition"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default Compose;
