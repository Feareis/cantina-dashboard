import React from "react";
import QuotaCard from "./QuotaCard";
import RedistributionCustomTab from "./RedistributionCustomTab";
import { DollarSign, Coffee } from "lucide-react";

const Dashboard: React.FC = () => {
  const formatCurrency = (value: number): string => {
    return `$ ${value.toLocaleString("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })}`;
  };

  const QuotaWeekValue = 65000;
  const QuotaPlusValue = 63000;

  const cardBgColor = "bg-gradient-to-br from-indigo-800 from-10% via-sky-800 via-30% to-emerald-800 to-90% border border-gray-500";

  return (
    <div className="flex flex-col py-4 px-4 text-gray-900">

      {/* Main Container */}
      <div className="grid grid-cols-4 gap-6 w-full h-full">

        {/* Empty Space */}
        <div className="bg-transparent" />

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
    </div>

  );
};

export default Dashboard;
