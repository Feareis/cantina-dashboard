import React from 'react';
import { BadgeDollarSign, Calculator, ChartArea, Github, Users } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const location = useLocation();

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <header className="border-b border-gray-700">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                La Cantina
              </h1>
              <nav className="flex items-center gap-4">
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
            <a
              href="https://github.com/Feareis/cantina-dashboard"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="View source on GitHub"
            >
              <Github size={24} />
            </a>
          </div>
        </div>
      </header>
      <main className="flex-grow container mx-auto px-4 py-6">
        {children}
      </main>
      <footer className="border-t border-gray-700 mt-16">
        <div className="container mx-auto px-4 py-6 text-center text-gray-400">
          <p>Made with ❤️ by Feareis </p>
        </div>
      </footer>
    </div>
  );
}
