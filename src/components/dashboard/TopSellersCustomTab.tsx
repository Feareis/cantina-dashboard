// This file defines the TopSellersCustomTab component, a customizable table
// designed to display the top sellers' performance. It includes a title,
// optional icon, and a list of employees with their sales and totals.

import React from "react";
import { LucideIcon } from "lucide-react";

// Define the interface for the TopSellersCustomTab's props
interface TopSellersCustomTabProps {
  title: string;                                          // The main title of the table
  icon?: LucideIcon;                                      // Optional icon displayed next to the title
  data: { name: string; sales: number; total: string }[]; // Array of employee data
  bgColor?: string;                                       // Optional background color for the table
  titleColor?: string;                                    // Optional color for the title
  columnTitleColor?: string;                              // Optional color for the column headers
  textColor?: string;                                     // Optional text color for the employee data
  dividerColor?: string;                                  // Optional color for the divider
}

// Divider component for separating sections
const Divider = ({ color }: { color: string }) => (
  <hr className={`w-[95%] mx-auto border-t ${color} my-4`} />
);

const TopSellersCustomTab: React.FC<TopSellersCustomTabProps> = ({
  title,
  icon: Icon,
  data,
  bgColor = "bg-white",
  titleColor = "text-gray-800",
  columnTitleColor = "text-gray-600",
  textColor = "text-gray-700",
  dividerColor = "border-gray-300",
}) => {
  return (
    <div
      className={`p-4 rounded-lg shadow-md transition duration-200 hover:scale-105 ${bgColor}`}
    >
      {/* Header Section: Title and Icon */}
      <div className="flex justify-between items-center mb-4">
        <h3 className={`text-2xl font-bold ${titleColor}`}>{title}</h3>
        {Icon && <Icon size={28} className={`${titleColor}`} />}
      </div>

      {/* Table Header */}
      <div className="grid grid-cols-3 text-center mb-2">
        <span className={`text-lg font-semibold ${columnTitleColor}`}>Nom</span>
        <span className={`text-lg font-semibold ${columnTitleColor}`}>
          Nombre de ventes
        </span>
        <span className={`text-lg font-semibold ${columnTitleColor}`}>Total</span>
      </div>

      {/* Divider */}
      <Divider color={dividerColor} />

      {/* Employee Data */}
      <div className="space-y-2">
        {data.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-3 text-center items-center"
          >
            <span className={`text-lg ${textColor}`}>{item.name}</span>
            <span className={`text-lg ${textColor}`}>{item.sales}</span>
            <span className={`text-lg ${textColor}`}>{item.total}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopSellersCustomTab;
