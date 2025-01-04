import React from "react";
import { LucideIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface BreadcrumbProps {
  icon: LucideIcon; // Icône cliquable (home icon par exemple)
  iconPath: string; // Chemin à rediriger lorsque l'icône est cliquée
  pageName: string; // Nom de la page actuelle
  description?: string; // Description de la page (optionnel)
  bgColor?: string; // Couleur de fond pour le breadcrumb
  textColor?: string; // Couleur de texte pour le breadcrumb
  borderColor?: string; // Couleur de bordure pour le breadcrumb
  borderWidth?: string; // Largeur de bordure
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({
  icon: Icon,
  iconPath,
  pageName,
  description,
  bgColor = "bg-gray-100", // Couleur de fond par défaut
  textColor = "text-gray-600", // Couleur de texte par défaut
  borderColor = "border-gray-300", // Couleur de bordure par défaut
  borderWidth = "border", // Taille de la bordure (par défaut 1px)
}) => {
  const navigate = useNavigate();

  return (
    <div
      className={`p-4 rounded-lg shadow-md ${borderWidth} ${borderColor} ${bgColor}`}
    >
      {/* Ligne Breadcrumb */}
      <div className={`flex items-center mb-2 ${textColor}`}>
        {/* Icône cliquable */}
        <button
          onClick={() => navigate(iconPath)}
          className={`flex items-center hover:text-blue-500 transition`}
        >
          <Icon size={20} />
        </button>
        <span className="mx-2">/</span>
        <span className="font-semibold">{pageName}</span>
      </div>

      {/* Titre et description organisés */}
      <div className="flex justify-between items-center gap-20">
        {/* Titre de la page à gauche */}
        <h1 className={`text-2xl font-bold ${textColor}`}>{pageName}</h1>
        {/* Description centrée à droite */}
        {description && (
          <div className="flex-1 text-end">
            <p className={`text-base ${textColor}`}>{description}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Breadcrumb;
