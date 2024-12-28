import React from "react";
import MembersSummary from "./membersSummary";
import QuickShortcuts from "./quickShortcuts";
import TotalPayoutSummary from "./totalPayoutSummary";
import TotalRechargeSummary from "./totalRechargeSummary";
import TotalUpiSummary from "./totalUpiSummary";

export default function Dashboard() {
  return (
    <div className="dashboard bg-gray-100 p-6 min-h-screen">
      {/* Top Section: Quick Shortcuts and Member Summary */}
      <div className="flex flex-wrap lg:flex-nowrap gap-6 mb-6">
        {/* Quick Shortcuts */}
        <div className="w-full lg:w-1/3 bg-slate-100 p-6 shadow-md rounded-lg">
          <QuickShortcuts />
        </div>

        {/* Members Summary */}
        <div className="w-full lg:w-2/3 bg-slate-100 p-4 shadow-md rounded-lg">
          <MembersSummary />
        </div>
      </div>

      {/* Bottom Section: Summaries */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Total Recharge Summary */}
        <div className="bg-white p-6 shadow-md rounded-lg">
          <TotalRechargeSummary />
        </div>

        {/* Total UPI Summary */}
        <div className="bg-white p-6 shadow-md rounded-lg">
          <TotalUpiSummary />
        </div>

        {/* Total Payout Summary */}
        <div className="bg-white p-6 shadow-md rounded-lg">
          <TotalPayoutSummary />
        </div>
      </div>
    </div>
  );
}
