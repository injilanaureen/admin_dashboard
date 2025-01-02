import React, { useState } from "react";

const ManageFundCredit = () => {
  const [formData, setFormData] = useState({
    creditTo: "1",
    memberName: "1",
    creditAmount: "",
    remark: "",
  });
  const [showAlert, setShowAlert] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.creditAmount) {
      setShowAlert(true);
      return;
    }
    setShowAlert(false);

    // Backend integration logic
    try {
      const response = await fetch("YOUR_BACKEND_API_URL", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      console.log("Form submitted successfully:", result);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleReset = () => {
    setFormData({
      creditTo: "1",
      memberName: "1",
      creditAmount: "",
      remark: "",
    });
    setShowAlert(false);
  };

  return (
    <div className="p-4 sm:p-6 bg-gray-100 rounded shadow-md max-w-6xl mx-auto">
      <h2 className="text-xl sm:text-2xl mb-6 sm:mb-10">Transfer Funds</h2>
      {showAlert && (
        <div className="bg-yellow-200 border-l-4 border-yellow-500 text-yellow-800 p-4 mb-4 rounded">
          <div className="flex justify-between items-center">
            <h4 className="font-bold">Alert!</h4>
            <button
              onClick={() => setShowAlert(false)}
              className="text-yellow-800 hover:text-yellow-600 font-bold"
            >
              ×
            </button>
          </div>
          <p>Credit Amount is required.</p>
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Credit To */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center sm:space-x-6">
          <label className="flex-none w-full sm:w-48 text-gray-700 font-medium">
            <span className="text-red-500">*</span> Credit To:
          </label>
          <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-2 sm:space-y-0">
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="creditTo"
                value="0"
                checked={formData.creditTo === "0"}
                onChange={handleInputChange}
                className="form-radio text-primary-color"
              />
              <span className="ml-2">Downline Members</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="creditTo"
                value="1"
                checked={formData.creditTo === "1"}
                onChange={handleInputChange}
                className="form-radio text-primary-color"
              />
              <span className="ml-2">Self</span>
            </label>
          </div>
        </div>

        {/* Member Name */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center sm:space-x-6">
          <label className="flex-none w-full sm:w-48 text-gray-700 font-medium">
            <span className="text-red-500">*</span> Member Name:
          </label>
          <div className="flex-1 w-full">
            <select
              name="memberName"
              value={formData.memberName}
              onChange={handleInputChange}
              className="form-select block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-color focus:border-primary-color"
            >
              <option value="- Select member -">- Select member -</option>
              <option value="2">Emantor Test(AP755059)</option>
              <option value="1">NIKATBY ADMIN(COMPANY)</option>
            </select>
            <p className="text-sm text-green-700 mt-1">Available Balance: 1.00</p>
          </div>
        </div>

        {/* Credit Amount */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center sm:space-x-6">
          <label className="flex-none w-full sm:w-48 text-gray-700 font-medium">
            <span className="text-red-500">*</span> Credit Amount:
          </label>
          <div className="flex-1 w-full">
            <input
              type="text"
              name="creditAmount"
              value={formData.creditAmount}
              onChange={handleInputChange}
              maxLength="10"
              className="form-input block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-color focus:border-primary-color"
            />
          </div>
        </div>

        {/* Remark */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center sm:space-x-6">
          <label className="flex-none w-full sm:w-48 text-gray-700 font-medium">Remark:</label>
          <div className="flex-1 w-full">
            <textarea
              name="remark"
              value={formData.remark}
              onChange={handleInputChange}
              rows="2"
              className="form-textarea block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-color focus:border-primary-color"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row sm:justify-end sm:space-x-4 space-y-2 sm:space-y-0">
          <button
            type="reset"
            onClick={handleReset}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Reset
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default ManageFundCredit;
