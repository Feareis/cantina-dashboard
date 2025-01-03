import React from "react";
import QuotaCard from "../components/Dashboard/QuotaCard";
import RedistributionCustomTab from "../components/Dashboard/RedistributionCustomTab";
import TopSellersCustomTab from "../components/Dashboard/TopSellersCustomTab";
import { DollarSign, Coffee, Star } from "lucide-react";

const Dashboard: React.FC = () => {

  // Format currency values
  const formatCurrency = (value: number): string => {
    return `$ ${value.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
  };

  const QuotaWeekValue = 65000;
  const QuotaPlusValue = 63000;

  return (
    <div className="flex flex-col items-center py-3 text-gray-900">
      {/* Main Container */}
      <div className="grid grid-cols-4 gap-6 w-full h-full items-center">

        {/* Left Section (3/4 of the page) */}
        <div className="col-span-3 flex flex-col gap-4">

          {/* Row 1: Quota Cards */}
          <div className="grid grid-cols-3 gap-4">
            {/* Weekly Quota Card */}
            <QuotaCard
              title="Quota de la Semaine"
              value={formatCurrency(QuotaWeekValue)}
              description="150 Risotto + 300 Plateau"
              bgColor="bg-gradient-to-r from-blue-600 to-green-600"
              textColor="text-white"
              valueColor="text-green-500"
              descriptionColor="text-gray-200"
              icon={DollarSign}
            />
            {/* Bonus Quota Card */}
            <QuotaCard
              title="Quota Bonus"
              value={formatCurrency(QuotaPlusValue)}
              description="400 Plateau"
              bgColor="bg-gradient-to-r from-green-600 to-purple-600"
              textColor="text-white"
              valueColor="text-red-600"
              descriptionColor="text-gray-300"
              icon={Coffee}
            />
            {/* Empty Space */}
            <div className="bg-transparent" />
          </div>

          {/* Row 2: Best Sellers Tables */}
          <div className="grid grid-cols-2 gap-4">
            {/* Best Sellers - Export Sales */}
            <TopSellersCustomTab
              title="Meilleurs Vendeurs - Exportateur"
              icon={Star}
              bgColor="bg-gradient-to-r from-teal-600 to-gray-600"
              titleColor="text-white"
              columnTitleColor="text-gray-200"
              textColor="text-gray-300"
              dividerColor="border-gray-200"
              data={[
                { name: "Alice", sales: 15, total: "$ 1,500" },
                { name: "Bob", sales: 12, total: "$ 1,200" },
                { name: "Charlie", sales: 10, total: "$ 1,000" },
              ]}
            />

            {/* Best Sellers - Client Sales */}
            <TopSellersCustomTab
              title="Meilleurs Vendeurs - Client"
              icon={Star}
              bgColor="bg-gradient-to-r from-gray-600 to-amber-600"
              titleColor="text-white"
              columnTitleColor="text-gray-200"
              textColor="text-gray-300"
              dividerColor="border-gray-200"
              data={[
                { name: "Alice", sales: 15, total: "$1500" },
                { name: "Bob", sales: 12, total: "$1200" },
                { name: "Charlie", sales: 10, total: "$1000" },
              ]}
            />
          </div>
        </div>

        {/* Right Section (1/4 of the page) */}
        <div className="col-span-1 bg-white bg-opacity-0 rounded-lg p-4">
          {/* Redistribution Rates */}
          <RedistributionCustomTab
            title="Taux de Redistribution"
            bgColor="bg-gradient-to-r from-amber-600 to-emerald-600"
            titleColor="text-white"
            textColor="text-gray-200"
            percentageColor="text-gray-200"
            dividerColor="border-blue-400"
            sections={[
              {
                sectionTitle: "Propre",
                sectionTitleColor: "text-green-600",
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

export default Dashboard;
