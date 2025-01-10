import React, { useState } from "react";
import WeeklyDashboardTable from "./WeeklyDashboardTable";
import CardContainer from "./CardContainer";

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
          <div className="p-4">
            <h2 className="text-xl font-bold">Semaine passée</h2>
            <p>Contenu des statistiques de la semaine passée.</p>
          </div>
        );
      case "Stats":
        return (
          <div className="p-4">
            <h2 className="text-xl font-bold">Stats</h2>
            <p>Contenu des statistiques globales.</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col items-center py-3 text-gray-900 w-full mx-auto">
      {/* Tabs */}
      <div className="flex w-full justify-center border-b border-gray-600 mb-4">
        {["Semaine en cours", "Semaine passée", "Stats"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-20 py-3 text-lg font-medium ${
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
      <div className="w-full text-white rounded-lg shadow p-6">{renderTabContent()}</div>
    </div>
  );
};

export default Dashboard;
