import React, { useState } from "react";
import ProductPrice from "./price/ProductPrice";
import MenuPrice from "./price/MenuPrice";

const Price: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("Nos Produits");

  const renderTabContent = () => {
    switch (activeTab) {
      case "Nos Produits":
        return (
          <div>
            <ProductPrice />
          </div>
        );
      case "Nos Menus (soon)":
        return (
          <div>
            <MenuPrice />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col items-center text-gray-900 w-full mx-auto">
      {/* Tabs */}
      <div className="flex w-full justify-center">
        {["Nos Produits", "Nos Menus (soon)"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-10 py-3 text-lg font-medium ${
              activeTab === tab
                ? "border-b-2 border-purple-500 text-purple-500"
                : "text-gray-500 hover:text-purple-500"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="w-full text-white rounded-lg p-6">{renderTabContent()}</div>
    </div>
  );
};

export default Price;
