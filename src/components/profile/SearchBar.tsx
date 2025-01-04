import React from "react";
import { LucideIcon } from "lucide-react";

interface SearchBarProps {
  placeholder?: string; // Texte du placeholder
  onSearch?: (query: string) => void; // Fonction de recherche
  bgColor?: string; // Couleur de fond
  textColor?: string; // Couleur du texte
  border?: boolean; // Affichage ou non de la bordure
  icon?: LucideIcon;
}

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = "Search...",
  onSearch,
  bgColor = "bg-gray-700",
  textColor = "text-gray-200",
  border = false,
  icon: Icon,
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onSearch) {
      onSearch(e.target.value); // Appelle la fonction de recherche avec la valeur saisie
    }
  };

  return (
    <div
      className={`flex items-center px-4 py-2 rounded-lg shadow focus-within:ring-2 focus-within:ring-gray-500 ${
        bgColor
      } ${border ? "border border-gray-500" : ""}`}
    >
      {/* Icône de recherche */}
      <Icon size={20} className={`mr-3 ${textColor}`} />

      {/* Champ de recherche */}
      <input
        type="text"
        placeholder={placeholder}
        onChange={handleInputChange}
        className={`bg-transparent w-full outline-none placeholder-gray-400 focus:ring-0 ${textColor}`}
      />
    </div>
  );
};

export default SearchBar;
