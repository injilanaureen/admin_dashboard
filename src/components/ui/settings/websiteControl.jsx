import React, { useState } from 'react';

export default function WebsiteControl() {
  const [formData, setFormData] = useState({
    WebsiteUnderConstruction: false,
    CustomersLogin: false,
    MembersLogin: false,
    IsB2BProject: false,
    IsOTPRequiredforSignup: false,
    Calendar: false,
  });

  const handleChange = (e) => {
    const { name } = e.target;

    setFormData({
      ...formData,
      [name]: !formData[name], // Toggle the value
    });

  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted', formData);
  };

  const handleReset = () => {
    setFormData({
      WebsiteUnderConstruction: false,
      CustomersLogin: false,
      MembersLogin: false,
      IsB2BProject: false,
      IsOTPRequiredforSignup: false,
      Calendar: false,
    });
  };

  return (
    <div className="p-6 m-4 bg-gray-100">
      <h2 className="text-2xl md:text-3xl font-bold text-cyan-600 mb-6 text-center">
        Setup Access Rights
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4 mx-5 lg:mx-10">
        <div className="space-y-4">
          {[
            { label: 'Website Under Construction', name: 'WebsiteUnderConstruction', disabled: false },
            { label: 'Customers Login', name: 'CustomersLogin', disabled: false },
            { label: 'Members Login', name: 'MembersLogin', disabled: false },
            { label: 'Is B2B Project', name: 'IsB2BProject', disabled: false },
            { label: 'Is OTP Required for Signup', name: 'IsOTPRequiredforSignup', disabled: false },
            { label: 'Calendar', name: 'Calendar', disabled: false },
          ].map((field, idx) => (
            <div
              key={idx}
              className="flex flex-col md:flex-row items-center md:space-x-4 space-y-2 md:space-y-0"
            >
              <label className="w-full md:w-1/3 text-gray-700">
                <span className="text-red-500">*</span> {field.label}
              </label>
              <div className="relative">
                <input
                  type="checkbox"
                  name={field.name}
                  checked={formData[field.name]}
                  onChange={handleChange}
                  className="hidden peer"
                  disabled={field.disabled}
                />
                <div
                className={`w-24 h-8 flex items-center rounded-full p-1 transition-all ${
                    formData[field.name] ? 'bg-green-500' : 'bg-gray-300'
                } ${field.disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
                onClick={() => {
                    if (!field.disabled) handleChange({ target: { name: field.name, value: !formData[field.name] } });
                }}
                >
                {/* Ball */}
                <div
                    className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform ${
                    formData[field.name] ? 'translate-x-16' : 'translate-x-0'
                    }`}
                ></div>

                {/* Text */}
                <span
                    className={`absolute inset-0 flex items-center justify-center text-sm font-bold text-white transition-transform ${
                    formData[field.name] ? 'justify-start' : 'justify-end'
                    }`}
                >
                    {formData[field.name] ? 'ON' : 'OFF'}
                </span>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mt-4">
          <button
            type="submit"
            className="w-full md:w-auto bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Submit
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
