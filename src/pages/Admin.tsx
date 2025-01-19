import React, { useState, useEffect } from "react";
import SearchBar from "../components/profile/SearchBar";
import { Settings, Search, Users, FileLock, Album, SlidersHorizontal, Logs, TicketCheck, CirclePower, CircleEllipsis, FolderArchive } from "lucide-react";
import AdminDashboard from "./admin/AdminDashboard";
import AdminEnterpriseSettings from "./admin/AdminEnterpriseSettings";
import AdminTeamsManagement from "./admin/AdminTeamsManagement";
import AdminUsersOptions from "./admin/AdminUsersOptions";
import AdminUsersManagement from "./admin/AdminUsersManagement";
import AdminSiteSettings from "./admin/AdminSiteSettings";
import AdminTeamsValidation from "./admin/AdminTeamsValidation";
import AdminLogs from "./admin/AdminLogs";
import AdminRebootCompta from "./admin/AdminRebootCompta";
import AdminArchives from "./admin/AdminArchives";
import { useAuth } from "../api/AuthContext";


const Admin: React.FC = () => {
  const { user } = useAuth();
  const role = user?.role || "Inconnu";
  const [activeTab, setActiveTab] = useState<string>("dashboard");

  // Définir les onglets disponibles en fonction du rôle
  const tabs = [
    ...(role === "limited_admin"
      ? [
          { id: "teams-validation", label: "Gestion des Quotas", icon: TicketCheck, type: "tab" },
        ]
      : [
          { id: "dashboard", label: "Dashboard", icon: Album, type: "tab" },
          { id: "teams-validation", label: "Gestion des Quotas", icon: TicketCheck, type: "tab" },
          { id: "separator-1", type: "separator" },
          { id: "teams-management", label: "Liste Employés", icon: Users, type: "tab" },
          { id: "teams-options", label: "Options Employés", icon: CircleEllipsis, type: "tab" },
          { id: "users-management", label: "Accès Site", icon: FileLock, type: "tab" },
          { id: "separator-2", type: "separator" },
          { id: "reboot-c", label: "Reboot Compta", icon: CirclePower, type: "tab" },
          { id: "logs", label: "Logs", icon: Logs, type: "tab" },
          { id: "separator-3", type: "separator" },
          { id: "archives", label: "Archives", icon: FolderArchive, type: "tab" },
          { id: "separator-4", type: "separator" },
          { id: "enterprise-settings", label: "Paramètres Entreprise", icon: SlidersHorizontal, type: "tab" },
          { id: "site-settings", label: "Paramètres du Site", icon: Settings, type: "tab" },
        ]),
  ];

  // Assurez-vous que l'onglet actif est `teams-validation` pour `limited_admin`
  useEffect(() => {
    if (role === "limited_admin") {
      setActiveTab("teams-validation");
    }
  }, [role]);

  const renderTabContent = () => {
    if (role === "limited_admin" && activeTab !== "teams-validation") {
      return <div>Accès non autorisé</div>;
    }

    switch (activeTab) {
      case "dashboard":
        return <AdminDashboard />;
      case "teams-validation":
        return <AdminTeamsValidation />;
      case "enterprise-settings":
        return <AdminEnterpriseSettings />;
      case "teams-management":
        return <AdminTeamsManagement />;
      case "teams-options":
        return <AdminUsersOptions />;
      case "users-management":
        return <AdminUsersManagement />;
      case "logs":
        return <AdminLogs />;
      case "reboot-c":
        return <AdminRebootCompta />;
      case "archives":
        return <AdminArchives />;
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
    <div className={`mx-auto flex flex-col ${bgColor} text-gray-400 rounded-xl`}>

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
      <div className="flex">

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
        <main className={`h-50 flex-1 p-6 min-h-96 ${bgColorMain} border-r border-b border-gray-700`}>
          {renderTabContent()}
        </main>
      </div>
    </div>
  );
};

export default Admin;
