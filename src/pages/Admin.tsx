import SearchBar from "../components/profile/SearchBar";

import React, { useState } from "react";
import {
  Settings,
  User,
  Lock,
  CreditCard,
  Bell,
  Search,
} from "lucide-react";

const Profile: React.FC = () => {
  // Onglets de la barre latérale
  const tabs = [
    { id: "Profile", label: "Profile", icon: User },
    { id: "security", label: "Security", icon: Lock },
    { id: "billing", label: "Billing", icon: CreditCard },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  // État pour suivre l'onglet actif
  const [activeTab, setActiveTab] = useState<string>("general");

  // Contenu dynamique des onglets
  const renderTabContent = () => {
    switch (activeTab) {
      case "Profile":
        return <div>Informations générales sur l'utilisateur. Tests test</div>;
      case "security":
        return <div>Paramètres de sécurité et mots de passe.</div>;
      case "billing":
        return <div>Gestion des options de facturation.</div>;
      case "notifications":
        return <div>Paramètres des notifications.</div>;
      case "settings":
        return <div>Options avancées pour le profil.</div>;
      default:
        return <div>Sélectionnez un onglet pour afficher le contenu.</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-800 text-gray-400 flex flex-col rounded-xl">

      {/* Titre de l'onglet */}
      <div className="flex justify-between bg-gray-900 p-6 border border-gray-700 rounded-t-xl">
        <h1 className="text-3xl font-bold">{tabs.find(tab => tab.id === activeTab)?.label}</h1>

        {/* Search Bar avec bordure */}
        <SearchBar
          icon={Search}
          placeholder="Rechercher..."
          onSearch=""
          bgColor="bg-gray-900/70"
          textColor="text-gray-400"
          border={true}
        />
      </div>

      {/* Contenu principal */}
      <div className="flex flex-1">
        {/* Barre latérale gauche */}
        <aside className="w-1/4 bg-gray-900 border-r border-gray-700 border-l border-gray-700 border-b border-gray-700 rounded-bl-xl p-6">
          <nav className="flex flex-col gap-4">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`flex items-center gap-2 text-left p-2 rounded-lg ${
                  activeTab === tab.id
                    ? "bg-blue-500 text-white"
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
        <main className="flex-1 p-6 bg-gray-800 border-r border-gray-700 border-b border-gray-700">
          <div className="bg-gray-900 p-6 rounded-lg shadow">{renderTabContent()}</div>
        </main>
      </div>
    </div>
  );
};

export default Profile;
