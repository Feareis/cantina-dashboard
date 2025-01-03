import React from "react";

interface RedistributionCustomTabProps {
  title: string; // Titre principal du tableau
  sections: {
    sectionTitle: string; // Titre de la section
    sectionTitleColor?: string; // Couleur personnalisée pour le titre de la section
    sectionBgColor?: string; // Couleur de fond du titre de section
    data: { grade: string; percentage: string }[]; // Données de la section
  }[]; // Liste des sections avec leurs données
  bgColor?: string; // Couleur de fond
  titleColor?: string; // Couleur du titre principal
  textColor?: string; // Couleur des grades
  percentageColor?: string; // Couleur des pourcentages
  dividerColor?: string; // Couleur des diviseurs
}

// Fonction pour générer un diviseur stylé
const Divider = ({ color }: { color: string }) => (
  <hr className={`w-[95%] mx-auto border-t ${color} mb-4`} />
);

const RedistributionCustomTab: React.FC<RedistributionCustomTabProps> = ({
  title,
  sections,
  bgColor = "bg-white", // Par défaut : fond blanc
  titleColor = "text-gray-800", // Par défaut : gris foncé
  textColor = "text-gray-700", // Par défaut : gris
  percentageColor = "text-gray-900", // Par défaut : gris foncé
  dividerColor = "border-gray-300", // Par défaut : gris clair
  sectionBgColor = "bg-gray-200", // Par défaut : gris clair
}) => {
  return (
    <div className={`p-4 rounded-lg shadow-md transition duration-200 hover:scale-105 ${bgColor}`}>
      {/* Titre principal */}
      <h3 className={`text-2xl font-bold ${titleColor} mb-4 text-center`}>
        {title}
      </h3>

      <Divider color={dividerColor} />

      {sections.map((section, index) => (
        <div key={index} className="mb-6">
          {/* Diviseur (pas de diviseur avant la première section) */}
          {index > 0 && <Divider color={dividerColor} />}

          {/* Titre de section avec span arrondi et couleur personnalisée */}
          <div
            className={`flex justify-center items-center mb-4 py-1 px-4 rounded-lg ${
              section.sectionBgColor || "bg-white"
            }`}
          >
            <h4
              className={`text-xl font-bold ${
                section.sectionTitleColor || "text-gray-600"
              }`}
            >
              {section.sectionTitle}
            </h4>
          </div>

          {/* Données de la section */}
          <div className="space-y-2">
            {section.data.map((item, idx) => (
              <div
                key={idx}
                className="flex justify-between items-center w-full"
              >
                <span className={`text-lg font-semibold ${textColor}`}>
                  {item.grade}
                </span>
                <span
                  className={`text-lg font-bold ${percentageColor} text-center`}
                  style={{ flexBasis: "30%" }}
                >
                  {item.percentage}
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default RedistributionCustomTab;
