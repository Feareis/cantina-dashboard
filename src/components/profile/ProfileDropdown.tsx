import React, { useState, useEffect, useRef } from "react";
import { ChevronDown, LogOut, User, ShieldMinus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../api/AuthContext";


const ProfileDropdown: React.FC = () => {
  const { user, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null); // Ref pour le conteneur du dropdown
  const navigate = useNavigate();

  const firstName = user?.firstName || "Inconnu";
  const lastName = user?.lastName || "Inconnu";
  const grade = user?.grade || "Inconnu";
  const role = user?.role || "Inconnu";

  const handleLogout = () => {
    logout(); // Déconnectez l'utilisateur via le contexte
    navigate("/login"); // Redirigez vers la page de connexion
  };

  const profilePictureMapping: { [key: string]: string } = {
    Patron: "/static/profile_picture/patron.png",
    "Co-Patron": "/static/profile_picture/patron.png",
    Responsable: "/static/profile_picture/responsable.png",
    CDI: "/static/profile_picture/cdi.png",
    CDD: "/static/profile_picture/cdd.png",
  };

  const profilePicture = profilePictureMapping[grade] || "/static/profile_picture/default.png";

  // Gestion de l'ouverture/fermeture du dropdown
  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  // Fermer le dropdown lorsqu'on clique en dehors
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Bouton principal */}
      <button
        onClick={toggleDropdown}
        className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-700 transition"
      >
        {/* Nom complet */}
        <span className="text-gray-400">{firstName} {lastName}</span>

        {/* Photo de profil */}
        <img
          src={profilePicture}
          alt="Profile"
          className="h-8 w-8 rounded-full object-cover"
        />

        {/* Icône dropdown */}
        <ChevronDown size={20} className="text-gray-400" />
      </button>

      {/* Menu Dropdown */}
      {dropdownOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-gray-800 border border-gray-700 rounded-lg shadow-lg z-10">

          {/* Option Admin */}
          {role === "admin" || role === "limited_admin" ? (
            <button
              onClick={() => {
                navigate("/admin");
                setDropdownOpen(false);
              }}
              className="w-full text-left px-4 py-2 text-gray-400 hover:bg-gray-700 hover:text-white transition"
            >
              <ShieldMinus size={18} className="inline-block mr-2" />
              Admin
            </button>
          ) : null}

          {/* Option Profile */}
          <button
            onClick={() => {
              navigate("/profile");
              setDropdownOpen(false);
            }}
            className="w-full text-left px-4 py-2 text-gray-400 hover:bg-gray-700 hover:text-white transition"
          >
            <User size={18} className="inline-block mr-2" />
            Profile
          </button>

          {/* Option Déconnexion */}
          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-2 text-gray-400 hover:bg-gray-700 hover:text-white transition"
          >
            <LogOut size={18} className="inline-block mr-2" />
            Déconnexion
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
