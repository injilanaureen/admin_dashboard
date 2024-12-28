import React from "react";

const TotalRechargeSummary = () => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-bold mb-4">Today Recharge Summary</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-green-100 p-4 rounded-lg flex flex-col items-center justify-center shadow">
          <span className="text-2xl font-bold">0.00 | 0</span>
          <span className="mt-2 text-sm md:text-base text-green-700">
            Total Success Recharges
          </span>
        </div>
        <div className="bg-yellow-100 p-4 rounded-lg flex flex-col items-center justify-center shadow">
          <span className="text-2xl font-bold">0.00 | 0</span>
          <span className="mt-2 text-sm md:text-base text-yellow-700">
            Total Pending Recharges
          </span>
        </div>
        <div className="bg-red-100 p-4 rounded-lg flex flex-col items-center justify-center shadow">
          <span className="text-2xl font-bold">0.00 | 0</span>
          <span className="mt-2 text-sm md:text-base text-red-700">
            Total Failed Recharges
          </span>
        </div>
      </div>
    </div>
  );
};

export default TotalRechargeSummary;
