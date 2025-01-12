import React, { useState } from "react";
import WeeklyDashboardTable from "../components/dashboard/WeeklyDashboardTable";
import TestDashboard from "../components/dashboard/TestDashboard";
import CardContainer from "../components/dashboard/CardContainer";
import Stats from "../components/dashboard/Stats";

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("Semaine en cours");

  const renderTabContent = () => {
    switch (activeTab) {
      case "Semaine en cours":
        return (
          <div>
            <CardContainer />
            <WeeklyDashboardTable />
          </div>
        );
      case "Semaine passée":
        return (
          <div>
            <TestDashboard />
          </div>
        );
      case "Stats":
        return (
          <div className="p-4">
            <Stats />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col items-center text-gray-900 w-full mx-auto">
      {/* Tabs */}
      <div className="flex w-full border-b border-gray-600">
        {["Semaine en cours", "Semaine passée", "Stats (soon)"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-10 py-3 text-lg font-medium ${
              activeTab === tab
                ? "border-b-2 border-purple-500 text-purple-500"
                : "text-gray-500 hover:text-purple-500"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="w-full text-white rounded-lg p-6">{renderTabContent()}</div>
    </div>
  );
};

export default Dashboard;
