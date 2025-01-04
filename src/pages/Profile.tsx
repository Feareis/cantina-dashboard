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
    <div className="flex flex-col items-center">
      <h3 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Profile Page</h3>
    </div>
  );
};

export default Profile;
