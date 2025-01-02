import React from "react";
import { LucideIcon } from "lucide-react";

interface CustomButtonProps {
  label: string; // Texte affiché sur le bouton
  onClick: () => void; // Fonction à exécuter lors du clic
  className?: string; // Classes CSS supplémentaires
  icon: LucideIcon; // Icône provenant de lucide-react
}

const CustomButton: React.FC<CustomButtonProps> = ({ label, onClick, className, icon: Icon }) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center font-medium py-2 rounded transform transition duration-250 hover:scale-105 ${className}`}
    >
      <Icon className="mr-2" />
      {label}
    </button>
  );
};

export default CustomButton;
