// Import necessary modules and assets
import React, { useState, useEffect } from "react";
import { CheckCircle, PlusCircle, ShieldCheck, RefreshCw } from "lucide-react";
import ProductCard from "../components/card/ProductCard";
import MaterialCard from "../components/card/MaterialCard";
import CustomButton from "../components/CustomButton";
import { supabase } from "../api/supabaseClient";
import { SaladeCayo, RisottoCayo, PlateauCayo, MontaraCayo, Poisson, Epices } from "../assets/products/indexProducts";

// Product configuration
const items = [
  { name: "salade", image: SaladeCayo, increments: [50], decrements: [50] },
  { name: "risotto", image: RisottoCayo, increments: [10], decrements: [10] },
  { name: "plateau", image: PlateauCayo, increments: [10], decrements: [10] },
  { name: "montara", image: MontaraCayo, increments: [10], decrements: [10] },
];

const Calculator: React.FC = () => {
  // State management
  const [quantities, setQuantities] = useState<Record<"salade" | "risotto" | "plateau" | "montara", number>>({
    salade: 0,
    risotto: 0,
    plateau: 0,
    montara: 0,
  });

  const [total, setTotal] = useState({ poisson: 0, epices: 0 });
  const [quota, setQuota] = useState<string>("");
  const [quotaPlus, setQuotaPlus] = useState<string>("");

  // Fetch quotas from Supabase
  const fetchQuotas = async () => {
    const { data, error } = await supabase
      .from("data")
      .select("key, value")
      .in("key", ["quota_description", "quota-plus_description"]);

    if (error) {
      console.error("Error fetching quotas:", error);
      return;
    }

    // Parse and set quota descriptions
    const quotaDescription = data?.find((item) => item.key === "quota_description")?.value || "";
    const quotaPlusDescription = data?.find((item) => item.key === "quota-plus_description")?.value || "";
    setQuota(quotaDescription);
    setQuotaPlus(quotaPlusDescription);
  };

  useEffect(() => {
    fetchQuotas(); // Fetch quotas on component mount
  }, []);

  // Handle input change for product quantities
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, key: string) => {
    const value = parseInt(e.target.value, 10);
    setQuantities((prev) => ({ ...prev, [key]: isNaN(value) ? 0 : value }));
  };

  // Increment or decrement product quantities
  const increment = (key: keyof typeof quantities, value: number) => {
    setQuantities((prev) => ({ ...prev, [key]: prev[key] + value }));
  };

  const decrement = (key: keyof typeof quantities, value: number) => {
    setQuantities((prev) => ({
      ...prev,
      [key]: Math.max(prev[key] - value, 0),
    }));
  };

  // Reset all quantities
  const resetAll = () => {
    setQuantities({ salade: 0, risotto: 0, plateau: 0, montara: 0 });
  };

  // Apply quotas to quantities
  const applyQuota = () => {
    const updates = parseQuota(quota);
    setQuantities((prev) =>
      Object.keys(updates).reduce((acc, key) => {
        acc[key] = (prev[key] || 0) + updates[key];
        return acc;
      }, { ...prev })
    );
  };

  const applyQuotaPlus = () => {
    const updates = parseQuota(quotaPlus);
    setQuantities((prev) =>
      Object.keys(updates).reduce((acc, key) => {
        acc[key] = (prev[key] || 0) + updates[key];
        return acc;
      }, { ...prev })
    );
  };

  const applyQuotaFull = () => {
    applyQuota();
    applyQuotaPlus();
  };

  // Parse quota descriptions
  const parseQuota = (quotaString: string) => {
    const updates: { [key: string]: number } = {};
    const parts = quotaString.split("+").map((part) => part.trim());
    parts.forEach((part) => {
      const [value, key] = part.split(" ");
      if (value && key) {
        const lowerKey = key.toLowerCase();
        updates[lowerKey] = (updates[lowerKey] || 0) + parseInt(value, 10);
      }
    });
    return updates;
  };

  // Update total calculations based on quantities
  useEffect(() => {
    const poisson =
      quantities.salade * 2 +
      quantities.risotto * 5 +
      quantities.plateau * 10 +
      quantities.montara * 0;
    const epices =
      quantities.salade * 2 +
      quantities.risotto * 5 +
      quantities.plateau * 10 +
      quantities.montara * 5;
    setTotal({ poisson, epices });
  }, [quantities]);

  return (
    <div className="flex flex-col items-center text-gray-900 w-full max-w-8xl mx-auto">
      {/* Buttons for quota actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mt-5 mb-10 w-full px-4">
        <CustomButton label="Quota" onClick={applyQuota} className="bg-green-500 text-gray-700 hover:bg-green-600" icon={CheckCircle} />
        <CustomButton label="Quota+" onClick={applyQuotaPlus} className="bg-yellow-500 text-gray-700 hover:bg-yellow-600" icon={PlusCircle} />
        <CustomButton label="Quota Full" onClick={applyQuotaFull} className="bg-orange-500 text-gray-700 hover:bg-orange-600" icon={ShieldCheck} />
        <div></div>
        <CustomButton label="Reset all" onClick={resetAll} className="bg-red-500 text-white hover:bg-red-600" icon={RefreshCw} />
      </div>

      {/* Product cards for quantity management */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full px-4">
        {items.map((item) => (
          <ProductCard
            key={item.name}
            name={item.name}
            image={item.image}
            quantity={quantities[item.name as keyof typeof quantities]}
            increments={item.increments}
            decrements={item.decrements}
            onIncrement={(value) => increment(item.name as keyof typeof quantities, value)}
            onDecrement={(value) => decrement(item.name as keyof typeof quantities, value)}
            onInputChange={(e) => handleInputChange(e, item.name as keyof typeof quantities)}
          />
        ))}
      </div>

      {/* Totals display */}
      <div className="w-full border-t border-gray-500 mt-10"></div>
      <div className="w-3/4 items-center p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full px-8 mt-5">
          <div></div>
          <MaterialCard name="Poisson" image={Poisson} total={total.poisson} textColor="text-blue-600" bgColor="bg-blue-200" />
          <MaterialCard name="Epices" image={Epices} total={total.epices} textColor="text-green-600" bgColor="bg-green-200" />
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
