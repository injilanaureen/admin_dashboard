import React, { useState } from "react";

export default function MembersRights() {
  const [selectedPackage, setSelectedPackage] = useState("");
  const [selectedRights, setSelectedRights] = useState({});
  const [savedData, setSavedData] = useState(null);

  const packages = ["Api Partner", "Free Package", "Owner"]; // Example package options

  const rightsOptions = [
    { category: "DashBoard", children: [] },
    { category: "My Commission Slab", children: [] },
    {
      category: "Wallet System",
      children: [
        {
          name: "Make Fund Request",
          rights: ["View", "Add", "Edit", "On/Off", "Delete"],
        },
      ],
    },
    { category: "Manage Bank Accounts", children: [] },
    {
      category: "Reports",
      children: [
        { name: "E-Wallet Transactions", rights: ["View", "Add", "Edit", "On/Off", "Delete"] },
        { name: "Recharge Transactions", rights: ["View", "Add", "Edit", "On/Off", "Delete"] },
        { name: "Dispute Settlement", rights: ["View", "Add", "Edit", "On/Off", "Delete"] },
        { name: "My Commission Profit", rights: ["View", "Add", "Edit", "On/Off", "Delete"] },
        { name: "My Login Details", rights: ["View", "Add", "Edit", "On/Off", "Delete"] },
      ],
    },
    {
      category: "Help & Support",
      children: [
        { name: "Submit Ticket", rights: ["View", "Add", "Edit", "On/Off", "Delete"] },
        { name: "My All Ticket", rights: ["View", "Add", "Edit", "On/Off", "Delete"] },
      ],
    },
    {
      category: "Developer Zone",
      children: [
        { name: "API Setting", rights: ["View", "Add", "Edit", "On/Off", "Delete"] },
        { name: "API Document", rights: ["View", "Add", "Edit", "On/Off", "Delete"] },
        { name: "API Callback", rights: ["View", "Add", "Edit", "On/Off", "Delete"] },
      ],
    },
    {
      category: "Payout Services",
      children: [
        { name: "Payout Dashboard", rights: ["View", "Add", "Edit", "On/Off", "Delete"] },
        { name: "Payout Transactions", rights: ["View", "Add", "Edit", "On/Off", "Delete"] },
        { name: "Payout Dispute Settlement", rights: ["View", "Add", "Edit", "On/Off", "Delete"] },
        { name: "Payout Profit Report", rights: ["View", "Add", "Edit", "On/Off", "Delete"] },
      ],
    },
    {
      category: "UPI Services",
      children: [
        { name: "UPI Dashboard", rights: ["View", "Add", "Edit", "On/Off", "Delete"] },
        { name: "UPI Transactions", rights: ["View", "Add", "Edit", "On/Off", "Delete"] },
        { name: "UPI Dispute Settlement", rights: ["View", "Add", "Edit", "On/Off", "Delete"] },
        { name: "UPI Profit Report", rights: ["View", "Add", "Edit", "On/Off", "Delete"] },
      ],
    },
  ];

  const handlePackageChange = (e) => {
    const packageName = e.target.value;
    setSelectedPackage(packageName);

    // Reset rights when switching packages
    if (packageName) {
      setSelectedRights({});
    } else {
      setSelectedRights({});
    }
  };

  const handleMainCheck = (category) => {
    setSelectedRights((prev) => {
      const isChecked = !prev[category];
      const updatedRights = { ...prev, [category]: isChecked };
  
      if (!isChecked) {
        delete updatedRights[category]; // Remove data if unchecked
      }
  
      return updatedRights;
    });
  };
  
  const handleRightCheck = (category, childName, right) => {
    setSelectedRights((prev) => {
      const categoryRights = prev[category] || {};
      const childRights = categoryRights[childName] || {};
      const updatedChildRights = {
        ...childRights,
        [right]: !childRights[right],
      };
      const updatedCategoryRights = {
        ...categoryRights,
        [childName]: updatedChildRights,
      };
      return {
        ...prev,
        [category]: updatedCategoryRights,
      };
    });
  };
  
  const handleSave = () => {
    // Save data for selected package
    setSavedData({ package: selectedPackage, rights: selectedRights });
    console.log("Saved Data:", { package: selectedPackage, rights: selectedRights });
  };

  return (
    <div className="p-6 bg-secondary-color text-text-color">
      <h1 className="text-lg font-bold">Member Rights Management</h1>
      <div className="mt-4 items-center flex">
        <label htmlFor="package" className="text-center  text-lg font-medium">
          Select Member Type:
        </label>
        <select
          id="package"
          value={selectedPackage}
          onChange={handlePackageChange}
          className="mt-1 w-full p-2 border border-tertiary-color bg-white text-black"
        >
          <option value="">-- Select Package --</option>
          {packages.map((pkg, index) => (
            <option key={index} value={pkg}>
              {pkg}
            </option>
          ))}
        </select>
      </div>

      {selectedPackage && (
        <div className="mt-6 border border-gray-300 rounded-lg p-4">
          <h2 className="text-lg font-semibold mb-4">
            Rights for {selectedPackage}
          </h2>
          {rightsOptions.map((item, index) => (
            <div key={index} className="border-b-2 border-gray-300 pb-2 mb-3">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="mr-2"
                  checked={selectedRights[item.category] || false}
                  onChange={() => handleMainCheck(item.category)}
                />
                <span className="font-normal">{item.category}</span>
              </div>
              {item.children.length > 0 && (
                <div className="pl-4 mt-2">
                  {item.children.map((child, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-10 border border-gray-300 p-2 rounded-md mb-2"
                    >
                      <div className="flex-1 font-medium">{child.name}</div>
                      {child.rights.map((right, ridx) => (
                        <label key={ridx} className="flex items-center space-x-1">
                          <input
                            type="checkbox"
                            disabled={!selectedRights[item.category]}
                            checked={
                              selectedRights[item.category]?.[child.name]?.[right] || false
                            }
                            onChange={() =>
                              handleRightCheck(item.category, child.name, right)
                            }
                          />
                          <span>{right}</span>
                        </label>
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
          <button
            onClick={handleSave}
            className="mt-4 bg-primary-color text-btn-text-color px-4 py-2 rounded-md"
          >
            Save Rights
          </button>
        </div>
      )}

      {savedData && (
        <div className="mt-6">
          <h2 className="text-lg font-semibold">Saved Data:</h2>
          <pre className="bg-gray-200 text-black p-4 rounded-md">
            {JSON.stringify(savedData, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
