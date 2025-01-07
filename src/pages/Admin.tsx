import React, { useState } from "react";
import SearchBar from "../components/profile/SearchBar";
import { Settings, Search, Users, FileLock, Album, SlidersHorizontal, Utensils } from "lucide-react";
import AdminDashboard from "./admin/AdminDashboard";
import AdminEnterpriseSettings from "./admin/AdminEnterpriseSettings";
import AdminTeamsManagement from "./admin/AdminTeamsManagement";
import AdminUsersManagement from "./admin/AdminUsersManagement";
import AdminSiteSettings from "./admin/AdminSiteSettings";

import InputCustom from "../components/InputCustom";


const Admin: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("dashboard");

  const tabs = [
    { id: "dashboard", label: "Dashboard", icon: Album, type: "tab" },
    { id: "separator-1", type: "separator" },
    { id: "teams-management", label: "Liste Employés", icon: Users, type: "tab" },
    { id: "users-management", label: "Accès Site", icon: FileLock, type: "tab" },
    { id: "separator-2", type: "separator" },
    { id: "enterprise-settings", label: "Paramètres Entreprise", icon: SlidersHorizontal, type: "tab" },
    { id: "site-settings", label: "Paramètres du Site", icon: Settings, type: "tab" },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <AdminDashboard />;
      case "enterprise-settings":
        return <AdminEnterpriseSettings />;
      case "teams-management":
        return <AdminTeamsManagement />;
      case "users-management":
        return <AdminUsersManagement />;
      case "site-settings":
        return <AdminSiteSettings />;
      default:
        return <div>Sélectionnez un onglet pour afficher le contenu.</div>;
    }
  };

  const bgColor = "bg-gradient-to-b from-gray-900/30 from-10% via-gray-800 via-90% to-gray-800/80 to-95%"
  const bgColorMain = "bg-gradient-to-b from-gray-900 from-30% via-gray-900/50 via-90% to-gray-900/30 to-95%"
  const bgOpacity = "bg-opacity-0"

  return (
    <div className={`${bgColor} text-gray-400 flex flex-col rounded-xl`}>

      {/* Onglet avec SearchBar */}
      <div className={`flex justify-between ${bgOpacity} p-6 border border-gray-700 rounded-t-xl`}>
        <h1>&nbsp;</h1>

        {/* Search Bar avec bordure */}
        <SearchBar
          icon={Search}
          placeholder="Rechercher..."
          bgColor="bg-gray-900/70"
          textColor="text-gray-400"
          border={true}
        />
      </div>

      {/* Contenu principal */}
      <div className="flex flex-1">

        {/* Barre latérale gauche */}
        <aside className={`w-1/5 h-100% ${bgOpacity} border-r border-gray-700 border-l border-gray-700 border-b border-gray-700 rounded-bl-xl p-6`}>
          <nav className="flex flex-col gap-4">
            {tabs.map((tab) =>
              tab.type === "tab" ? (
                <button
                  key={tab.id}
                  className={`flex items-center gap-2 text-left p-2 rounded-lg ${
                    activeTab === tab.id
                      ? "bg-gray-500 text-white"
                      : "hover:bg-gray-700 text-gray-400"
                  }`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.icon && <tab.icon size={20} />}
                  {tab.label}
                </button>
              ) : (
                <hr key={tab.id} className="my-2 border-t border-gray-700" />
              )
            )}
          </nav>
        </aside>

        {/* Contenu de l'onglet actif */}
        <main className={`flex-1 p-6 ${bgColorMain} border-r border-b border-gray-700`}>
          {renderTabContent()}
        </main>
      </div>
    </div>
  );
};

export default Admin;
