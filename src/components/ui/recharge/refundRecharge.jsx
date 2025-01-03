import React, { useState } from 'react';

export default function RefundRecharge() {
  const [formData, setFormData] = useState({
    transactionID: '',
    memberInfo: '',
    rechargeNumber: '',
    amount: '',
    apiTransID: '',
    operatorRef: '',
    status: '',
  });

  const [error, setError] = useState('');
  const [isValid, setIsValid] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation Logic
    const { transactionID, memberInfo, rechargeNumber, amount, apiTransID, operatorRef, status } = formData;
    if (!transactionID || !memberInfo || !rechargeNumber || !amount || !apiTransID || !operatorRef || !status) {
      setError('Please fill in all required fields.');
      setIsValid(false);
      return;
    }

    // Reset the error if form is valid
    setError('');
    setIsValid(true);

    // Perform the form submit logic (for example, an API call)
    console.log('Form submitted', formData);
  };

  const handleReset = () => {
    setFormData({
      transactionID: '',
      memberInfo: '',
      rechargeNumber: '',
      amount: '',
      apiTransID: '',
      operatorRef: '',
      status: '',
    });
    setError('');
    setIsValid(true);
  };

  return (
    <div className="p-6 m-4 bg-gray-100">
      <h2 className="text-2xl md:text-3xl font-bold text-cyan-600 mb-6 text-center">
        Refund Recharge Transaction
      </h2>
  
      {/* Validation Alert */}
      {error && !isValid && (
        <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 mb-6 rounded shadow">
          <button
            aria-hidden="true"
            className="float-right text-xl font-bold text-gray-500 hover:text-gray-700"
            type="button"
            onClick={() => setError(null)}
          >
            ×
          </button>
          <h4 className="text-lg font-semibold text-yellow-700 flex items-center">
            <i className="fa fa-warning text-yellow-600 mr-2"></i> Alert!
          </h4>
          <p className="text-yellow-700">{error}</p>
        </div>
      )}
  
      {/* Form Section */}
      <form onSubmit={handleSubmit} className="space-y-4 mx-5 lg:mx-10">
        <div className="space-y-4">
          {[
            { label: "Transaction ID", name: "transactionID", disabled: false },
            { label: "Member Info", name: "memberInfo", disabled: true },
            { label: "*Recharge Number	", name: "rechargeNumber", disabled: true },
            { label: "Amount", name: "amount", disabled: true },
            { label: "API Trans ID", name: "apiTransID", disabled: true },
            { label: "Operator Ref ID", name: "operatorRef", disabled: true },
            { label: "Status", name: "status", disabled: true },
          ].map((field, idx) => (
            <div key={idx} className="flex flex-col md:flex-row items-center md:items-center md:space-x-4 space-y-2 md:space-y-0">
              <label className="w-full md:w-1/3 text-gray-700">
                <span className="text-red-500">*</span> {field.label}
              </label>
              <input
                type="text"
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                className={`w-full p-2 border rounded-lg border-gray-300 ${
                  field.disabled ? "bg-gray-100 text-gray-500 cursor-not-allowed" : "focus:outline-none focus:ring-2 focus:ring-cyan-600"
                }`}
                disabled={field.disabled}
              />
              {!isValid && !formData[field.name] && !field.disabled && (
                <span className="text-red-500 text-sm">Required</span>
              )}
            </div>
          ))}
        </div>
  
        {/* Action Buttons */}
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mt-4">
          <button
            type="submit"
            className="w-full md:w-auto bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Search
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="w-full md:w-auto bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
  
}
