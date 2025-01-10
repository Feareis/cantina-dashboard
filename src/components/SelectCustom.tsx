import React from "react";
import { LucideIcon } from "lucide-react";

interface SelectCustomProps {
  value: string; // Valeur actuelle de la sélection
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void; // Gestion du changement
  options: string[]; // Liste des options sous forme de valeurs simples
  placeholder?: string; // Texte de placeholder (option par défaut)
  bgColor?: string; // Couleur de fond
  textColor?: string; // Couleur du texte
  icon?: LucideIcon; // Icône optionnelle à gauche
  className?: string; // Classes CSS supplémentaires
}

const SelectCustom: React.FC<SelectCustomProps> = ({
  value,
  onChange,
  options,
  placeholder = "Sélectionnez une option",
  bgColor = "bg-gray-800",
  textColor = "text-gray-200",
  icon: Icon,
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

      {/* Select */}
      <select
        value={value}
        onChange={onChange}
        className={`w-full pl-10 py-3 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 ${bgColor} ${textColor}`}
      >
        {/* Placeholder option */}
        {placeholder && <option value="">{placeholder}</option>}
        {/* Options dynamiques */}
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectCustom;
