import React, { useEffect, useState } from "react";

export default function ManageWebPages() {
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
    { label: "Facebook Page", name: "facebookPage", placeholder: "Enter page name" },
    { label: "Facebook Share", name: "facebookShare", placeholder: "Enter page heading" },
    { label: "Instagram Share", name: "instagramShare", placeholder: "Enter Instagram heading" },
    { label: "Twitter Page", name: "twitterPage", placeholder: "Enter Twitter page link" },
    { label: "Twitter Share", name: "twitterShare", placeholder: "Enter Twitter heading" },
    { label: "GooglePlus Page", name: "googlePlusPage", placeholder: "Enter GooglePlus page link" },
    { label: "GooglePlus Share", name: "googlePlusShare", placeholder: "Enter GooglePlus heading" },
    { label: "LinkedIn Page", name: "linkedInPage", placeholder: "Enter LinkedIn page link" },
    { label: "Pinterest Page", name: "pinterestPage", placeholder: "Enter Pinterest page link" },
    { label: "GooglePlay URL", name: "googlePlayURL", placeholder: "Enter GooglePlay URL" },
    { label: "YouTube URL", name: "youtubeURL", placeholder: "Enter YouTube URL" },
    { label: "Skype URL", name: "skypeURL", placeholder: "Enter Skype URL" },
    { label: "Facebook Likes", name: "facebookLikes", placeholder: "Enter Facebook Likes count" },
    { label: "Common Script", name: "commonScript", placeholder: "Enter common script" },
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
              <div key={field.name} className="flex gap-6 ">
                <label className="text-gray-700 w-36">{field.label}</label>
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
              className="px-4 py-2 bg-primary-color text-white rounded-lg hover:opacity-90"
            >
              Save Page
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
