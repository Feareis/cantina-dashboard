import React from "react";
import QuotaCard from "../components/Dashboard/QuotaCard";
import RedistributionCustomTab from "../components/Dashboard/RedistributionCustomTab";
import { DollarSign, Coffee } from "lucide-react";

const Dashboard: React.FC = () => {

  // Format currency values
  const formatCurrency = (value: number): string => {
    return `$ ${value.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
  };

  const QuotaWeekValue = 65000;
  const QuotaPlusValue = 63000;

  return (
    <div className="flex flex-col items-center py-3 text-gray-900 mt-6">
      {/* Main Container */}
      <div className="grid grid-cols-4 gap-6 w-full h-full px-6 bg-gray-800">

        {/* Left Section (3/4 of the page) */}
        <div className="col-span-3 flex flex-col gap-4">

          {/* Row 1: Quota Cards */}
          <div className="grid grid-cols-3 gap-4">
            {/* Weekly Quota Card */}
            <QuotaCard
              title="Quota de la Semaine"
              value={formatCurrency(QuotaWeekValue)}
              description="150 Risotto + 300 Plateau"
              bgColor="bg-gradient-to-r from-blue-600 to-green-500"
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
              bgColor="bg-gradient-to-r from-orange-600 to-purple-500"
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
            {/* Best Sellers - Clean Sales */}
            <div className="bg-white rounded-lg shadow-md p-4">
              <h3 className="text-xl font-bold text-gray-700 mb-4">
                Meilleurs Vendeurs - Propre
              </h3>
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="py-2">Nom</th>
                    <th className="py-2">Ventes</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="py-2">Alice</td>
                    <td className="py-2">15 ventes</td>
                  </tr>
                  <tr>
                    <td className="py-2">Bob</td>
                    <td className="py-2">12 ventes</td>
                  </tr>
                  <tr>
                    <td className="py-2">Charlie</td>
                    <td className="py-2">10 ventes</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Best Sellers - Dirty Sales */}
            <div className="bg-white rounded-lg shadow-md p-4">
              <h3 className="text-xl font-bold text-gray-700 mb-4">
                Meilleurs Vendeurs - Sale
              </h3>
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="py-2">Nom</th>
                    <th className="py-2">Ventes</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="py-2">Dave</td>
                    <td className="py-2">10 ventes</td>
                  </tr>
                  <tr>
                    <td className="py-2">Eve</td>
                    <td className="py-2">8 ventes</td>
                  </tr>
                  <tr>
                    <td className="py-2">Frank</td>
                    <td className="py-2">7 ventes</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Section (1/4 of the page) */}
        <div className="col-span-1 bg-white bg-opacity-0 rounded-lg shadow-md p-4">
          {/* Tableau des redistributions */}
                <RedistributionCustomTab
                  title="Taux de Redistribution"
                  bgColor="bg-gradient-to-r from-yellow-600 to-pink-600"
                  titleColor="text-white"
                  sectionTitleColor="text-white"
                  textColor="text-gray-200"
                  percentageColor="text-gray-200"
                  dividerColor="border-gray-300"
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

