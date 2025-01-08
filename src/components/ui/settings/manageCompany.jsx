import React, { useEffect, useState } from "react";

export default function ManageCompany() {
  const [formData, setFormData] = useState({
    facebookPage: "",
    facebookShare: "",
    instagramShare: "",
    twitterPage: "",
    twitterShare: "",
    googlePlusPage: "",
    googlePlusShare: "",
    linkedInPage: "",
    pinterestPage: "",
    googlePlayURL: "",
    youtubeURL: "",
    skypeURL: "",
    facebookLikes: "",
    commonScript: ""
  });

  // Form fields configuration
  const fields = [
    { 
      label: "Company Name", 
      name: "companyName", 
      placeholder: "Enter company name" 
    },
    { 
      label: "Company Owner", 
      name: "companyOwner", 
      placeholder: "Enter company owner's name" 
    },
    { 
      label: "Company Website", 
      name: "companyWebsite", 
      placeholder: "Enter company website URL" 
    },
    { 
      label: "Static IP", 
      name: "staticIP", 
      placeholder: "Enter static IP address" 
    },
    { 
      label: "Copyright", 
      name: "copyright", 
      placeholder: "Enter copyright information" 
    },
    { 
      label: "Company Logo", 
      name: "companyLogo", 
      placeholder: "Enter company logo URL" 
    },
    { 
      label: "Phone Number", 
      name: "phoneNumber", 
      placeholder: "Enter phone number" 
    },
    { 
      label: "Mobile Number", 
      name: "mobileNumber", 
      placeholder: "Enter mobile number" 
    },
    { 
      label: "EmailID", 
      name: "emailID", 
      placeholder: "Enter email ID" 
    },
    { 
      label: "Fax", 
      name: "fax", 
      placeholder: "Enter fax number" 
    },
    { 
      label: "Address", 
      name: "address", 
      placeholder: "Enter address" 
    },
    { 
      label: "Country", 
      name: "country", 
      placeholder: "Enter country" 
    },
    { 
      label: "State", 
      name: "state", 
      placeholder: "Enter state" 
    },
    { 
      label: "City", 
      name: "city", 
      placeholder: "Enter city" 
    }
  ];
  
  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // Handle form submission logic here
  };

  return (
    <div className="p-6 bg-gray-50">
      {/* Header Section */}
      <div className="flex flex-col gap-4 mb-6">
        <h2 className="text-2xl font-bold text-cyan-600">Social Media Management</h2>
        <div className="flex flex-col gap-2 p-4 bg-slate-100">

          {/* Add Page Section */}
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Add/Update Social Links</h3>
          <form className="space-y-4" onSubmit={handleSubmit}>
            {fields.map((field) => (
              <div key={field.name} className="flex flex-col sm:flex-row sm:gap-6">
                <label className="text-gray-700 mb-2 sm:w-36">{field.label}</label>
                <input
                  type="text"
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  placeholder={field.placeholder}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                />
              </div>
            ))}
            <button
              type="submit"
              className="px-4 py-2 bg-cyan-800 text-white rounded-lg hover:opacity-90"
            >
              Save Page
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
