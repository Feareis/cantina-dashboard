import React from "react";
import QuotaCard from "../components/dashboard/QuotaCard";
import RedistributionCustomTab from "../components/dashboard/RedistributionCustomTab";
import TopSellersCustomTab from "../components/dashboard/TopSellersCustomTab";
import DashboardCustomTable from "../components/dashboard/DashboardCustomTable";
import { DollarSign, Coffee, Star } from "lucide-react";

const employeeData = [
  {
    position: "Patron",
    name: "Mr O",
    clientSales: { propre: "$0", sale: "$0" },
    exportSales: { cayo: "$33,382", ls: "$0" },
    quota: true,
    quotaPlus: true,
    totalWeek: { primeToPay: "$141,353", taxToReverse: "$0" },
    previousWeek: { primeS1: "$123,313", taxS1: "$2,925" },
    hireDate: "14/12/2024",
    warnings: { vacation: false, week1: true, week2: false },
  },
  // Ajoutez plus de données ici
];


const Dashboard: React.FC = () => {
  // Format currency values
  const formatCurrency = (value: number): string => {
    return `$ ${value.toLocaleString("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })}`;
  };

  const QuotaWeekValue = 65000;
  const QuotaPlusValue = 63000;

  const cardBgColor = "bg-gradient-to-br from-indigo-800 from-10% via-sky-800 via-30% to-emerald-800 to-90% border border-gray-500";
  const cardBgColor2 = "bg-gradient-to-b from-gray-900/30 from-10% via-gray-800 via-30% to-gray-800 to-90% border border-gray-500";

  return (
    <div className="flex flex-col py-3 text-gray-900">

      {/* Main Container */}
      <div className="grid grid-cols-4 gap-6 w-full h-full">

        {/* Left Section (3/4 of the page) */}
        <div className="col-span-3 flex flex-col justify-between">

          {/* Row 1: Quota Cards */}
          <div className="grid grid-cols-3 gap-4">

            {/* Weekly Quota Card */}
            <QuotaCard
              title="Quota de la Semaine"
              value={formatCurrency(QuotaWeekValue)}
              description="150 Risotto + 300 Plateau"
              bgColor={cardBgColor}
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
              bgColor={cardBgColor}
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

      {/* Employees Custom Table */}
      <div className="items-center mt-6">
        <DashboardCustomTable data={employeeData} />
      </div>
    </div>
  );
};

export default Dashboard;
