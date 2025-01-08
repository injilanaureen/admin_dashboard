import React, { useState } from "react";

export default function EmailSetting() {
  const [formData, setFormData] = useState({
    userName: "",
    password: "",
    hostName: "",
    portnumber: "",
    UseDefaultCredentials: false,
    EnableSSL: false,
    mailFrom: "",
    domainname: "",
    mailCC: "",
    mailBCC: "",
    mailContent: "",
    mailSignature: "",
  });

  const fields = [
    { label: "User Name", name: "userName", placeholder: "Enter User Name", type: "text" },
    { label: "Password", name: "password", placeholder: "Enter Password", type: "password" },
    { label: "Host Name", name: "hostName", placeholder: "Enter Host Name", type: "text" },
    { label: "Port Number", name: "portnumber", placeholder: "Enter Port Number", type: "number" },
    { label: "Mail From", name: "mailFrom", placeholder: "Enter Mail From", type: "email" },
    { label: "Domain Name", name: "domainname", placeholder: "Enter Domain Name", type: "text" },
    { label: "Mail CC", name: "mailCC", placeholder: "Enter Mail CC", type: "text" },
    { label: "Mail BCC", name: "mailBCC", placeholder: "Enter Mail BCC", type: "text" },
    { label: "Mail Content", name: "mailContent", placeholder: "Enter Mail Content", type: "textarea" },
    { label: "Mail Signature", name: "mailSignature", placeholder: "Enter Mail Signature", type: "textarea" },
  ];

  const toggleFields = [
    { label: "Use Default Credentials", name: "UseDefaultCredentials" },
    { label: "Enable SSL", name: "EnableSSL" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleToggle = (name) => {
    setFormData((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="p-6 bg-gray-50">
      <h2 className="text-2xl font-bold text-cyan-600 mb-6">Email Settings</h2>

      <form className="space-y-6" onSubmit={handleSubmit}>
        {fields.map((field) => (
          <div key={field.name} className="flex flex-col gap-2">
            <label className="text-gray-700">{field.label}</label>
            {field.type === "textarea" ? (
              <textarea
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                placeholder={field.placeholder}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              />
            ) : (
              <input
                type={field.type}
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                placeholder={field.placeholder}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              />
            )}
          </div>
        ))}

        {toggleFields.map((field) => (
          <div key={field.name} className="flex items-center gap-4">
            <label className="text-gray-700">{field.label}</label>
            <div
              className={`relative w-14 h-8 rounded-full p-1 cursor-pointer ${
                formData[field.name] ? "bg-green-500" : "bg-gray-300"
              }`}
              onClick={() => handleToggle(field.name)}
            >
              <div
                className={`w-6 h-6 bg-white rounded-full shadow-md transition-transform ${
                  formData[field.name] ? "translate-x-6" : "translate-x-0"
                }`}
              />
              <span
                className={`absolute inset-0 flex items-center justify-center text-sm font-bold text-white transition-opacity ${
                  formData[field.name] ? "opacity-100" : "opacity-0"
                }`}
              >
                ON
              </span>
              <span
                className={`absolute inset-0 flex items-center justify-center text-sm font-bold text-white transition-opacity ${
                  !formData[field.name] ? "opacity-100" : "opacity-0"
                }`}
              >
                OFF
              </span>
            </div>
          </div>
        ))}

        <button
          type="submit"
          className="px-4 py-2 bg-cyan-800 text-white rounded-lg hover:opacity-90"
        >
          Save Settings
        </button>
      </form>
    </div>
  );
}
