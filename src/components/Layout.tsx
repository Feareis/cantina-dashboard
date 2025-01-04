import React from "react";
import { BadgeDollarSign, Calculator, ChartArea, Users } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import Breadcrumb from "./Breadcrumb";
import { Home } from "lucide-react";

interface LayoutProps {
  children: React.ReactNode; // Contenu affiché dans le layout
}

export function Layout({ children }: LayoutProps) {
  const location = useLocation();

  // Configuration des breadcrumbs dynamiques
  const breadcrumbs: { [key: string]: { pageName: string; description?: string } } = {
    "/": { pageName: "Dashboard", description: "Retrouvez toutes les informations générales de l'entreprise" },
    "/calculator": { pageName: "Calculateur de matières premières", description: "Effectuez des calculs rapides sur le nombre de matières premières dont vous avez besoins" },
    "/export-sales": { pageName: "Vente Exportateur", description: "Saisissez vos ventes exportateurs" },
    "/clients-sales": { pageName: "Vente Clients", description: "Saisissez vos ventes clients" },
    "/admin": { pageName: "Admin", description: "Gérez vos paramètres de site et vos paramètres entreprise" },
  };

  const currentBreadcrumb = breadcrumbs[location.pathname] || {
    pageName: "Page inconnue",
  };

  const headerBgColor = "bg-gradient-to-br from-gray-900 to-gray-800";
  const headerTextColor = "text-gray-400";
  const headerBorderColor = "border-gray-700";
  const headerBorderWidth = "border-b"; // La bordure du header est en bas seulement

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      {/* Fixed Navbar */}
      <header
        className={`fixed top-0 left-0 w-full ${headerBgColor} ${headerTextColor} ${headerBorderWidth} ${headerBorderColor} z-50`}
      >
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              La Cantina
            </h1>
            <nav className="flex items-center gap-4">
              <Link
                to="/"
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  location.pathname === "/"
                    ? "bg-blue-500/20 text-blue-400"
                    : "hover:text-white hover:bg-white/5"
                }`}
              >
                <ChartArea size={18} />
                Dashboard
              </Link>
              <Link
                to="/calculator"
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  location.pathname === "/calculator"
                    ? "bg-blue-500/20 text-blue-400"
                    : "hover:text-white hover:bg-white/5"
                }`}
              >
                <Calculator size={18} />
                Calculateur
              </Link>
              <Link
                to="/export-sales"
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  location.pathname === "/export-sales"
                    ? "bg-blue-500/20 text-blue-400"
                    : "hover:text-white hover:bg-white/5"
                }`}
              >
                <BadgeDollarSign size={18} />
                Vente Export
              </Link>
              <Link
                to="/clients-sales"
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  location.pathname === "/clients-sales"
                    ? "bg-blue-500/20 text-blue-400"
                    : "hover:text-white hover:bg-white/5"
                }`}
              >
                <Users size={18} />
                Vente Clients
              </Link>
              <Link
                to="/admin"
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  location.pathname === "/admin"
                    ? "bg-blue-500/20 text-blue-400"
                    : "hover:text-white hover:bg-white/5"
                }`}
              >
                <Users size={18} />
                Admin
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main content with margin to offset navbar height */}
      <main className="flex-grow container mx-auto px-4 py-6 mt-24">
        {/* Breadcrumb intégré dans le contenu principal avec toutes les props */}
        <div className="mb-6">
          <Breadcrumb
            icon={Home}
            iconPath="/"
            pageName={currentBreadcrumb.pageName}
            description={currentBreadcrumb.description}
            bgColor={headerBgColor}
            textColor={headerTextColor}
            borderColor={headerBorderColor}
            borderWidth="border" // Bordure complète pour le breadcrumb
          />
        </div>

        {/* Contenu de la page */}
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-gray-900 to-gray-800 border-t border-gray-700">
        <div className="container mx-auto px-4 py-6 text-center text-gray-400">
          <p>Made with ❤️ by Feareis</p>
        </div>
      </footer>
    </div>
  );
}
