import React from "react";
import { LucideIcon } from "lucide-react";

interface StaticTextCustomProps {
  text: string | number; // Texte affiché
  placeholder?: string; // Texte par défaut si aucune valeur n'est fournie
  bgColor?: string; // Couleur de fond
  textColor?: string; // Couleur du texte
  icon?: LucideIcon; // Icône à gauche du texte
}

const StaticTextCustom: React.FC<StaticTextCustomProps> = ({
  text,
  placeholder = "Non défini",
  bgColor = "bg-gray-900/70",
  textColor = "text-gray-300",
  icon: Icon,
}) => {
  return (
    <div
      className={`relative w-full sm:w-3/4 ${bgColor} rounded-lg px-6 py-3 mt-4 ${
        Icon ? "pl-12" : ""
      } text-sm sm:text-base border border-gray-700 ${textColor}`}
    >
      {/* Icône à gauche du texte */}
      {Icon && (
        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
          <Icon size={24} />
        </span>
      )}

      {/* Texte affiché */}
      <span className={`flex items-center ${text ? "" : "text-gray-400"}`}>
        {text || placeholder}
      </span>
    </div>
  );
};

export default StaticTextCustom;
