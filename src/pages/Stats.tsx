import React from "react";
import TopSellersCustomTab from "../components/dashboard/TopSellersCustomTab";
import { Star } from "lucide-react";


const Stats: React.FC = () => {
  // Format currency values
  const formatCurrency = (value: number): string => {
    return `$ ${value.toLocaleString("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })}`;
  };

  const cardBgColor = "bg-gradient-to-br from-indigo-800 from-10% via-sky-800 via-30% to-emerald-800 to-90% border border-gray-500";
  // const cardBgColor = "bg-gradient-to-b from-gray-900/30 from-10% via-gray-800 via-90% to-gray-700/50 to-95% border border-gray-500";

  return (
    <div className="flex flex-col py-4 px-4 text-gray-900">

      {/* Main Container */}
      <div className="grid grid-cols-2 gap-6 w-full h-full">

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
  );
};

export default Stats;
