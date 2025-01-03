// Import necessary modules
import React from 'react';
import { BadgeDollarSign, Calculator, ChartArea, Users } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

// Define props interface for the Layout component
interface LayoutProps {
  children: React.ReactNode; // Content to be displayed inside the layout
}

export function Layout({ children }: LayoutProps) {
  const location = useLocation();

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      {/* Fixed Navbar */}
      <header className="fixed top-0 left-0 w-full bg-gradient-to-br from-gray-900 to-gray-800 text-white border-b border-gray-700 z-50">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                La Cantina
              </h1>
              <nav className="flex items-center gap-4">
                {/* Navigation links */}
                <Link
                  to="/"
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                    location.pathname === '/'
                      ? 'bg-blue-500/20 text-blue-400'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <ChartArea size={18} />
                  Dashboard
                </Link>
                <Link
                  to="/calculator"
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                    location.pathname === '/calculator'
                      ? 'bg-blue-500/20 text-blue-400'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Calculator size={18} />
                  Calculateur
                </Link>
                <Link
                  to="/export-sales"
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                    location.pathname === '/export-sales'
                      ? 'bg-blue-500/20 text-blue-400'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <BadgeDollarSign size={18} />
                  Vente Export
                </Link>
                <Link
                  to="/clients-sales"
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                    location.pathname === '/clients-sales'
                      ? 'bg-blue-500/20 text-blue-400'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Users size={18} />
                  Vente Clients
                </Link>
              </nav>
            </div>
            {/* Admin Patron Link */}
            <Link
              to="/admin-patron"
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                location.pathname === '/admin-patron'
                  ? 'bg-blue-500/20 text-blue-400'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Users size={18} />
              Patron
            </Link>
          </div>
        </div>
      </header>

      {/* Main content with margin to offset navbar height */}
      <main className="flex-grow container mx-auto px-4 py-6 mt-24">
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
