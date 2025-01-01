import React from "react";

interface MaterialCardProps {
  name: string;
  image: string;
  total: number;
  textColor?: string; // Optionnel : couleur de texte personnalisée
  bgColor?: string; // Optionnel : couleur d'arrière-plan personnalisée
}

const MaterialCard: React.FC<MaterialCardProps> = ({ name, image, total, textColor = "text-white", bgColor = "bg-gray-800" }) => {
  return (
    <div className={`${bgColor} shadow-lg rounded-lg p-4 flex flex-col items-center`}>
      <h3 className={`text-2xl font-semibold ${textColor} mb-2`}>{name}</h3>
      <div className="w-full border-t border-gray-500 my-2"></div>
      <img
        src={image}
        alt={name}
        className="w-full h-full object-cover rounded-md mb-4"
      />
      <div className="w-full border-t border-gray-500 my-2"></div>
      <div className={`text-center text-xl font-bold ${textColor}`}>
        {total}
      </div>
    </div>
  );
};

export default MaterialCard;
