// This file defines the RedistributionCustomTab component, which is a customizable
// tab for displaying redistribution data. The component supports multiple sections,
// each with a title, custom styles, and associated data.

import React from "react";

// Define the interface for the RedistributionCustomTab's props
interface RedistributionCustomTabProps {
  title: string;                                   // The main title of the tab
  sections: {
    sectionTitle: string;                          // The title of a section
    sectionTitleColor?: string;                    // Optional custom color for the section title
    sectionDescription?: string;                   // Optional custom color for the section title
    sectionDescriptionColor?: string;              // Optional custom color for the section description
    sectionBgColor?: string;                       // Optional background color for the section title
    data: { grade: string; percentage: string }[]; // Data items with grade and percentage
  }[];                                             // List of sections and their data
  bgColor?: string;                                // Optional background color for the entire tab
  titleColor?: string;                             // Optional color for the main title
  textColor?: string;                              // Optional text color for the grades
  percentageColor?: string;                        // Optional text color for the percentages
  dividerColor?: string;                           // Optional color for the dividers
}

// Divider component for separating sections
const Divider = ({ color }: { color: string }) => (
  <hr className={`w-[95%] mx-auto border-t ${color} mb-4`} />
);

const RedistributionCustomTab: React.FC<RedistributionCustomTabProps> = ({
  title,
  sections,
  bgColor = "bg-white",
  titleColor = "text-gray-800",
  textColor = "text-gray-700",
  percentageColor = "text-gray-900",
  dividerColor = "border-gray-300",
}) => {
  return (
    <div
      className={`p-4 rounded-lg transition duration-200 hover:scale-105 ${bgColor}`}
    >
      {/* Main Title */}
      <h3 className={`text-2xl font-bold ${titleColor} mb-4 text-center`}>
        {title}
      </h3>

      {/* Divider */}
      <Divider color={dividerColor} />

      {/* Sections */}
      {sections.map((section, index) => (
        <div key={index} className="mb-2">
          {/* Divider before each section except the first */}
          {index > 0 && <Divider color={dividerColor} />}

          {/* Section Title */}
          <div
            className={`flex justify-between items-center mb-4 py-1 px-4 rounded-lg ${
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
            <p
              className={`text-sm font-semibold ml-4 ${
                section.sectionDescriptionColor || "text-gray-600"
              }`}
            >
              {section.sectionDescription}
            </p>
          </div>

          {/* Section Data */}
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
