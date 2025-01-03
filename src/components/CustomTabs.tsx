// Import necessary modules
import React from "react";

// Define the props interface for the CustomTabs component
interface CustomTabsProps {
  tabs: string[];                     // List of tab labels
  activeTab: string;                  // Currently active tab
  onTabChange: (tab: string) => void; // Callback for tab changes
  tabColors?: {
    activeTextColor: string;          // Text color for the active tab
    inactiveTextColor: string;        // Text color for inactive tabs
    indicatorColor: string;           // Color of the tab indicator
    backgroundColor: string;          // Background color of the tab container
  };
  className?: string;                 // Additional class names for customization
}

const CustomTabs: React.FC<CustomTabsProps> = ({
  tabs,
  activeTab,
  onTabChange,
  tabColors = {
    activeTextColor: "text-purple-500",
    inactiveTextColor: "text-gray-400",
    indicatorColor: "bg-purple-500",
    backgroundColor: "bg-transparent",
  },
  className,
}) => {
  return (
    <div
      className={`flex flex-col w-full p-4 ${tabColors.backgroundColor} ${className}`}
    >
      {/* Tabs container */}
      <div className="flex border-b relative">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => onTabChange(tab)}
            className={`flex-1 py-2 text-base font-medium ${
              activeTab === tab ? tabColors.activeTextColor : tabColors.inactiveTextColor
            }`}
          >
            {tab}
          </button>
        ))}
        {/* Indicator for the active tab */}
        <div
          className={`absolute bottom-0 h-1 transition-all duration-300 ${tabColors.indicatorColor}`}
          style={{
            width: `${100 / tabs.length}%`,
            left: `${tabs.findIndex((t) => t === activeTab) * (100 / tabs.length)}%`,
          }}
        />
      </div>
    </div>
  );
};

export default CustomTabs;
