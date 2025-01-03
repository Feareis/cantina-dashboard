// This file defines the QuotaCard component, a reusable card component
// used to display quotas or prime-related information. The component
// includes a title, a main value, a description, and optional styling
// and icons.

import React from "react";
import { LucideIcon } from "lucide-react";

// Define the interface for the QuotaCard's props
interface QuotaCardProps {
  title: string;             // The card's title
  value: string | number;    // The main value displayed (e.g., weekly prime)
  description: string;       // A description displayed below the main value
  bgColor?: string;          // Optional background color for the card
  textColor?: string;        // Optional text color for the title
  valueColor?: string;       // Optional text color for the main value
  descriptionColor?: string; // Optional text color for the description
  icon?: LucideIcon;         // Optional icon displayed in the top-right corner
  valueBgColor?: string;     // Optional background color for the value span
}

const QuotaCard: React.FC<QuotaCardProps> = ({
  title,
  value,
  description,
  bgColor = "bg-white",
  textColor = "text-gray-700",
  valueColor = "text-gray-900",
  descriptionColor = "text-gray-500",
  icon: Icon,
  valueBgColor = "bg-gray-200",
}) => {
  return (
    <div
      className={`p-4 rounded-lg shadow-md transform transition duration-200 hover:scale-105 ${bgColor}`}
    >
      {/* Header Section: Title and Optional Icon */}
      <div className={`flex justify-between items-center ${textColor}`}>
        <h3 className="text-xl font-bold">{title}</h3>
        {Icon && <Icon size={28} />}
      </div>

      {/* Main Value Section */}
      <div className="flex justify-center mt-2">
        <span
          className={`inline-flex items-center justify-center px-4 py-1 rounded-xl ${valueBgColor}`}
        >
          <p className={`text-xl font-bold ${valueColor}`}>{value}</p>
        </span>
      </div>

      {/* Description Section */}
      <p className={`text-lg font-bold text-center mt-2 ${descriptionColor}`}>
        {description}
      </p>
    </div>
  );
};

export default QuotaCard;
