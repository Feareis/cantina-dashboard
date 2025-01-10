import React from "react";
import { LucideIcon } from "lucide-react";

interface InputCustomProps {
  value: string | number; // Valeur de l'input
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // Fonction pour gérer les changements
  placeholder?: string; // Placeholder de l'input
  bgColor?: string; // Couleur de fond
  textColor?: string; // Couleur du texte
  icon?: LucideIcon; // Icône à gauche de l'input
  type?: "text" | "number" | "search" | "date"; // Type d'input (texte, nombre ou recherche)
  className?: string; // Classes supplémentaires
}

const InputCustom: React.FC<InputCustomProps> = ({
  type = "text",
  icon: Icon,
  value,
  onChange,
  placeholder = "Entrez une valeur",
  bgColor = "bg-gray-800",
  textColor = "text-gray-200",
  className = "",
}) => {
  return (
    <div className={`relative flex items-center ${className}`}>
      {/* Icône à gauche */}
      {Icon && (
        <span className="absolute left-3 flex items-center text-gray-400">
          <Icon size={20} />
        </span>
      )}

      {/* Input */}
      <input
        type={type}
        value={value}
        onChange={onChange}
        className={`w-full pl-10 py-3 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 ${bgColor} ${textColor}`}
        placeholder={placeholder}
      />
    </div>
  );
};

export default InputCustom;
