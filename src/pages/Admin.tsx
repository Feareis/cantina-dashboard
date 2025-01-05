import React, { useState } from "react";
import SearchBar from "../components/profile/SearchBar";
import { Settings, Search, Users, FileLock, Album, SlidersHorizontal } from "lucide-react";

const Profile: React.FC = () => {
  const tabs = [
    { id: "dashboard", label: "Dashboard", icon: Album },
    { id: "teams-management", label: "Liste Employés", icon: Users },
    { id: "users-management", label: "Accès Site", icon: FileLock },
    { id: "enterprise-settings", label: "Paramètres Entreprise", icon: SlidersHorizontal },
    { id: "site-settings", label: "Paramètres du Site", icon: Settings },
  ];

  const [activeTab, setActiveTab] = useState<string>("dashboard");

  const renderTabContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <div>Tableau de bord de l'entreprise.</div>;
      case "enterprise-settings":
        return <div>Gestion des paramètres généraux de l'entreprise.</div>;
      case "teams-management":
        return <div>Gestion employées.</div>;
      case "users-management":
        return <div>Gestion accès site.</div>;
      case "site-settings":
        return <div>Gestion des paramètres généraux du site.</div>;
      default:
        return <div>Sélectionnez un onglet pour afficher le contenu.</div>;
    }
  };

  const bgColor = "bg-gradient-to-b from-gray-900/30 from-10% via-gray-800 via-90% to-gray-800/80 to-95%"
  const bgColorMain = "bg-gradient-to-b from-gray-900 from-30% via-gray-900/50 via-90% to-gray-900/30 to-95%"
  const bgOpacity = "bg-opacity-0"

  return (
    <div className={`${bgColor} text-gray-400 flex flex-col rounded-xl`}>

      {/* Titre de l'onglet */}
      <div className={`flex justify-between ${bgOpacity} p-6 border border-gray-700 rounded-t-xl`}>
        <h1 className="text-3xl font-bold">{tabs.find(tab => tab.id === activeTab)?.label}</h1>

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
        <aside className={`w-1/4 h-[90%] ${bgOpacity} border-r border-gray-700 border-l border-gray-700 border-b border-gray-700 rounded-bl-xl p-6`}>
          <nav className="flex flex-col gap-4">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`flex items-center gap-2 text-left p-2 rounded-lg ${
                  activeTab === tab.id
                    ? "bg-gray-500 text-white"
                    : "hover:bg-gray-700 text-gray-400"
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                <tab.icon size={20} />
                {tab.label}
              </button>
            ))}
          </nav>
        </aside>

        {/* Contenu de l'onglet actif */}
        <main className={`flex-1 p-6 ${bgColorMain} border-r border-b border-gray-700`}>
          <div className="p-6 text-xl text-center">{renderTabContent()}</div>
        </main>
      </div>
    </div>
  );
};

export default Profile;
