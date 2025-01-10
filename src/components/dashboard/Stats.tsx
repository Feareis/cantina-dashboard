import React from "react";
import TopSellersCustomTab from "./TopSellersCustomTab";
import RedistributionCustomTab from "./RedistributionCustomTab";
import { Star } from "lucide-react";


const Stats: React.FC = () => {
  // Format currency values
  const formatCurrency = (value: number): string => {
    return `$ ${value.toLocaleString("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })}`;
  };

  // const cardBgColor = "bg-gradient-to-br from-indigo-800 from-10% via-sky-800 via-30% to-emerald-800 to-90% border border-gray-500";
  const cardBgColor = "bg-gradient-to-b from-gray-900/30 from-10% via-gray-800 via-90% to-gray-700/50 to-95% border border-gray-500";

  return (
    <div className="flex flex-col py-4 px-4 text-gray-900">

      {/* Main Container */}
      <div className="grid grid-cols-4 gap-6 w-full h-full">

        {/* Left Section (3/4 of the page) */}
        <div className="col-span-3 flex flex-col justify-between">

          {/* Row 1: Quota Cards */}
          <div className="grid grid-cols-2 gap-4">

            {/* Best Sellers - Export Sales */}
            <TopSellersCustomTab
              title="Meilleurs Vendeurs - Exportateur"
              icon={Star}
              bgColor={cardBgColor}
              titleColor="text-white"
              columnTitleColor="text-gray-200"
              textColor="text-gray-300"
              dividerColor="border-gray-200"
              data={[
                { name: "Alice", sales: 15, total: formatCurrency(1500) },
                { name: "Bob", sales: 12, total: formatCurrency(1200) },
                { name: "Charlie", sales: 10, total: formatCurrency(1000) },
              ]}
            />

            {/* Best Sellers - Client Sales */}
            <TopSellersCustomTab
              title="Meilleurs Vendeurs - Client"
              icon={Star}
              bgColor={cardBgColor}
              titleColor="text-white"
              columnTitleColor="text-gray-200"
              textColor="text-gray-300"
              dividerColor="border-gray-200"
              data={[
                { name: "Alice", sales: 15, total: formatCurrency(1500) },
                { name: "Bob", sales: 12, total: formatCurrency(1200) },
                { name: "Charlie", sales: 10, total: formatCurrency(1000) },
              ]}
            />

            {/* Empty Space */}
            <div className="bg-transparent" />
          </div>
        </div>

        {/* Right Section (1/4 of the page) - Redistribution Rates */}
        <div className="flex flex-col justify-between h-full">
          <RedistributionCustomTab
            title="Taux de Redistribution"
            bgColor={cardBgColor}
            titleColor="text-white"
            textColor="text-gray-200"
            percentageColor="text-gray-200"
            dividerColor="border-gray-400"
            sections={[
              {
                sectionTitle: "Propre",
                sectionTitleColor: "text-green-600",
                sectionDescription: "Entreprise -> Employees",
                sectionBgColor: "bg-gray-200",
                data: [
                  { grade: "Responsable", percentage: "40%" },
                  { grade: "CDI", percentage: "30%" },
                  { grade: "CDD", percentage: "25%" },
                ],
              },
              {
                sectionTitle: "Sale",
                sectionTitleColor: "text-red-600",
                sectionDescription: "Employees -> Entreprise",
                sectionBgColor: "bg-gray-200",
                data: [
                  { grade: "Vente Client", percentage: "15%" },
                  { grade: "Vente Export", percentage: "10%" },
                ],
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default Stats;
