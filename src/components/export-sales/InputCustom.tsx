import React from "react";
import { LucideIcon } from "lucide-react";

interface InputCustomProps {
  value: string | number; // Valeur de l'input
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // Fonction pour gérer les changements
  placeholder?: string; // Placeholder de l'input
  bgColor?: string; // Couleur de fond
  textColor?: string; // Couleur du texte
  icon?: LucideIcon; // Icône à gauche de l'input
  type?: "text" | "number" | "search"; // Type d'input (texte, nombre ou recherche)
}

const InputCustom: React.FC<InputCustomProps> = ({
  type = "text",
  icon: Icon,
  value,
  onChange,
  placeholder = "Entrez une valeur",
  bgColor = "bg-gray-900/70",
  textColor = "text-gray-300",
}) => {
  return (
    <div className="relative group mt-4">
      {/* Icône à gauche de l'input */}
      {Icon && (
        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400 group-focus-within:text-gray-300">
          <Icon size={24} />
        </span>
      )}

      {/* Champ d'input */}
      <input
        type={type}
        value={value}
        onChange={onChange}
        className={`w-full sm:w-3/4 ${bgColor} rounded-lg px-6 py-3 ${
          Icon ? "pl-12" : ""
        } text-sm sm:text-base placeholder-gray-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 ${textColor}`}
        placeholder={placeholder}
      />
    </div>
  );
};

export default InputCustom;
