import React from "react";

interface CustomTabsProps {
  tabs: string[];
  activeTab: string;
  onTabChange: (tab: string) => void;
  tabColors?: {
    activeTextColor: string;
    inactiveTextColor: string;
    indicatorColor: string;
    backgroundColor: string;
  };
  className?: string;
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
