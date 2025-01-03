// Import necessary modules
import React from "react";

// Define props interface for the MaterialCard component
interface MaterialCardProps {
  name: string; // Material name
  image: string; // Image URL for the material
  total: number; // Total count or quantity
  textColor?: string; // Optional: custom text color
  bgColor?: string; // Optional: custom background color
}

const MaterialCard: React.FC<MaterialCardProps> = ({
  name,
  image,
  total,
  textColor = "text-white", // Default text color
  bgColor = "bg-gray-800", // Default background color
}) => {
  return (
    <div
      className={`
        ${bgColor} shadow-lg rounded-lg p-4 flex flex-col items-center
        transform transition duration-200 hover:scale-105
      `}
    >
      {/* Material name */}
      <h3 className={`text-2xl font-semibold ${textColor} mb-2`}>{name}</h3>

      {/* Divider line */}
      <div className="w-full border-t border-gray-500 my-2"></div>

      {/* Material image */}
      <img
        src={image}
        alt={name}
        className="w-5/6 h-full object-cover rounded-md mb-4"
      />

      {/* Divider line */}
      <div className="w-full border-t border-gray-500 my-2"></div>

      {/* Total count or quantity */}
      <div className={`text-center text-xl font-bold ${textColor}`}>{total}</div>
    </div>
  );
};

export default MaterialCard;
