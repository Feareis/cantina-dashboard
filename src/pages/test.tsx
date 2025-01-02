import React, { useState } from "react";
import ProductCard from "../components/ProductCard";
import CustomTabs from "../components/CustomTabs";
import CustomButton from "../components/CustomButton";
import { BadgeDollarSign } from "lucide-react";
import {
  RisottoCayo,
  PlateauCayo,
  MontaraCayo,
} from "../assets/products/indexProducts";

const items = [
  {
    name: "Risotto",
    image: RisottoCayo,
    increments: [5],
    decrements: [5],
    category: "Nourriture",
  },
  {
    name: "Plateau",
    image: PlateauCayo,
    increments: [5],
    decrements: [5],
    category: "Nourriture",
  },
  {
    name: "Montara",
    image: MontaraCayo,
    increments: [10],
    decrements: [10],
    category: "Nourriture",
  },
  {
    name: "Jus de cerise",
    image: "Jus de cerise",
    increments: [5],
    decrements: [5],
    category: "Boisson",
  },
  {
    name: "Bières Simple",
    image: MontaraCayo,
    increments: [5],
    decrements: [5],
    category: "Alcool",
  },
  {
    name: "Bières Pils",
    image: "Bières Pils",
    increments: [5],
    decrements: [5],
    category: "Alcool",
  },
  {
    name: "Bières Red",
    image: "Bières Red",
    increments: [5],
    decrements: [5],
    category: "Alcool",
  },
  {
    name: "Bières Triple",
    image: "Bières Triple",
    increments: [5],
    decrements: [5],
    category: "Alcool",
  },
  {
    name: "Bières de test",
    image: MontaraCayo,
    increments: [5],
    decrements: [5],
    category: "Alcool",
  },
];

const Test: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("Nourriture");
  const [selectedSale, setSelectedSale] = useState<string>("propre");
  const employeesTotal = 0; // Placeholder for actual calculation
  const companyTotal = 0; // Placeholder for actual calculation

  const handleButtonClick = () => {
    console.log("Vente ajoutée");
  };

  const formatCurrency = (value: number) => {
    return `$ ${value.toLocaleString("en-US")}`;
  };

  return (
    <div className="flex flex-col items-center py-3 text-gray-900">
      <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-300 to-purple-400 bg-clip-text text-transparent mb-6">
        Vente Client
      </h2>

      {/* Bloc principal */}
      <div className="flex w-full gap-4 px-8 bg-gray-900">
        {/* Conteneur principal des onglets et produits */}
        <div className="flex-1 flex flex-col p-6 rounded-lg">
          {/* Onglets */}
          <CustomTabs
            tabs={["Nourriture", "Boisson", "Alcool", "Autre"]}
            activeTab={activeTab}
            onTabChange={(tab) => setActiveTab(tab)}
          />

          {/* Produits */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
            {items
              .filter((item) => item.category === activeTab)
              .map((item, index) => (
                <ProductCard
                  key={index}
                  name={item.name}
                  image={item.image}
                  increments={item.increments}
                  decrements={item.decrements}
                />
              ))}
          </div>
        </div>

        {/* Conteneur des totaux */}
        <div className="w-1/5 flex flex-col w-full bg-gray-700/70 p-6 rounded-lg shadow gap-6 self-start mt-8">
          <div className="flex flex-col justify-center items-center gap-8">
            <div className="w-full">
              <p className="block text-center text-xl font-bold mb-1">Total Employé :</p>
              <p className="text-center text-base text-gray-400 mt-1">- Text -</p>
              <div
                className={`text-center text-xl font-semibold px-4 py-2 rounded mt-5 ${
                  selectedSale === "propre" ? "bg-green-600/50 text-white" : "bg-red-500/50 text-white"
                }`}
              >
                {formatCurrency(employeesTotal)}
              </div>
            </div>
            <div className="w-full">
              <p className="block text-center text-xl font-bold mb-1">Total Entreprise :</p>
              <p className="text-center text-base text-gray-400 mt-1">- Text -</p>
              <div
                className={`text-center text-xl font-semibold px-4 py-2 rounded mt-5 ${
                  selectedSale === "propre" ? "bg-green-600/50 text-white" : "bg-red-500/50 text-white"
                }`}
              >
                {formatCurrency(companyTotal)}
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center gap-8">
            <CustomButton
              label="Ajouter la vente"
              onClick={handleButtonClick}
              className="w-full bg-blue-500 text-white hover:bg-blue-600 px-4 py-2 mt-10"
              icon={BadgeDollarSign}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Test;
