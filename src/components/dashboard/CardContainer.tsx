import React, { useState, useEffect } from "react";
import QuotaCard from "./QuotaCard";
import { DollarSign, Coffee } from "lucide-react";
import { supabase } from "../../api/supabaseClient";

const Dashboard: React.FC = () => {
  const [quotaValue, setQuotaValue] = useState<number | null>(null);
  const [quotaDescription, setQuotaDescription] = useState<string>("");
  const [quotaPlusValue, setQuotaPlusValue] = useState<number | null>(null);
  const [quotaPlusDescription, setQuotaPlusDescription] = useState<string>("");

  // Fonction pour récupérer les données depuis Supabase
  const fetchQuotaData = async () => {
    const { data, error } = await supabase.from("data").select("key, value");

    if (error) {
      console.error("Erreur lors de la récupération des données :", error.message);
      return;
    }

    const formattedData = data.reduce((acc: any, item: any) => {
      acc[item.key] = item.value;
      return acc;
    }, {});

    setQuotaValue(Number(formattedData.quota_value) || null);
    setQuotaDescription(formattedData.quota_description || "");
    setQuotaPlusValue(Number(formattedData.quotaplus_value) || null);
    setQuotaPlusDescription(formattedData.quotaplus_description || "");
  };

  useEffect(() => {
    fetchQuotaData();
  }, []);

  const formatCurrency = (value: number | null): string => {
    if (value === null) return "-";
    return `$ ${value.toLocaleString("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })}`;
  };

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
          value={formatCurrency(quotaValue)}
          description={quotaDescription || "Aucune description"}
          bgColor={cardBgColor}
          textColor="text-white"
          valueColor="text-green-500"
          descriptionColor="text-gray-200"
          icon={DollarSign}
        />

        {/* Bonus Quota Card */}
        <QuotaCard
          title="Quota Bonus"
          value={formatCurrency(quotaPlusValue)}
          description={quotaPlusDescription || "Aucune description"}
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
