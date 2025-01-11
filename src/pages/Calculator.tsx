// Import necessary modules and assets
import React, { useState, useEffect } from "react";
import { CheckCircle, PlusCircle, ShieldCheck, RefreshCw } from "lucide-react";
import ProductCard from "../components/card/ProductCard";
import MaterialCard from "../components/card/MaterialCard";
import CustomButton from "../components/CustomButton";
import { supabase } from "../api/supabaseClient";
import { SaladeCayo, RisottoCayo, PlateauCayo, MontaraCayo, Poisson, Epices } from "../assets/products/indexProducts";

const Calculator: React.FC = () => {
  // State for quantities
  const [quantities, setQuantities] = useState<Record<"salade" | "risotto" | "plateau" | "montara", number>>({
    salade: 0,
    risotto: 0,
    plateau: 0,
    montara: 0,
  });

  // Product configuration
  const items: { name: keyof typeof quantities; image: string; increments: number[]; decrements: number[] }[] = [
    { name: "salade", image: SaladeCayo, increments: [50], decrements: [50] },
    { name: "risotto", image: RisottoCayo, increments: [10], decrements: [10] },
    { name: "plateau", image: PlateauCayo, increments: [10], decrements: [10] },
    { name: "montara", image: MontaraCayo, increments: [10], decrements: [10] },
  ];

  const [total, setTotal] = useState({ poisson: 0, epices: 0 });
  const [quota, setQuota] = useState<string>("");
  const [quotaPlus, setQuotaPlus] = useState<string>("");

  const fetchQuotas = async () => {
    const { data, error } = await supabase
      .from("data")
      .select("key, value")
      .in("key", ["quota_description", "quota-plus_description"]);

    if (error) {
      console.error("Error fetching quotas:", error);
      return;
    }

    const quotaDescription = data?.find((item) => item.key === "quota_description")?.value || "";
    const quotaPlusDescription = data?.find((item) => item.key === "quota-plus_description")?.value || "";
    setQuota(quotaDescription);
    setQuotaPlus(quotaPlusDescription);
  };

  const [buttonClicks, setButtonClicks] = useState({
    quota: 0,
    quotaPlus: 0,
    quotaFull: 0,
  });

  useEffect(() => {
    fetchQuotas();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, key: keyof typeof quantities) => {
    const value = parseInt(e.target.value, 10);
    setQuantities((prev) => ({ ...prev, [key]: isNaN(value) ? 0 : value }));
  };

  const increment = (key: keyof typeof quantities, value: number) => {
    setQuantities((prev) => ({ ...prev, [key]: prev[key] + value }));
  };

  const decrement = (key: keyof typeof quantities, value: number) => {
    setQuantities((prev) => ({ ...prev, [key]: Math.max(prev[key] - value, 0) }));
  };

  const resetAll = () => {
    setQuantities({ salade: 0, risotto: 0, plateau: 0, montara: 0 });
    setButtonClicks({quota: 0, quotaPlus: 0, quotaFull: 0});
  };

  const parseQuota = (quotaString: string): Partial<Record<keyof typeof quantities, number>> => {
    const updates: Partial<Record<keyof typeof quantities, number>> = {};
    const parts = quotaString.split("+").map((part) => part.trim());
    parts.forEach((part) => {
      const [value, key] = part.split(" ");
      if (value && key && key.toLowerCase() in quantities) {
        const typedKey = key.toLowerCase() as keyof typeof quantities;
        updates[typedKey] = (updates[typedKey] || 0) + parseInt(value, 10);
      }
    });
    return updates;
  };

  const applyQuota = (incrementClick = true) => {
    if (incrementClick) {
      setButtonClicks((prev) => ({
        ...prev,
        quota: prev.quota + 1,
      }));
    }

    const updates = parseQuota(quota);
    setQuantities((prev) => {
      const updatedQuantities = { ...prev };
      Object.keys(updates).forEach((key) => {
        if (key in quantities) {
          const typedKey = key as keyof typeof quantities;
          updatedQuantities[typedKey] = (prev[typedKey] || 0) + (updates[typedKey] || 0);
        }
      });
      return updatedQuantities;
    });
  };

  const applyQuotaPlus = (incrementClick = true) => {
    if (incrementClick) {
      setButtonClicks((prev) => ({
        ...prev,
        quotaPlus: prev.quotaPlus + 1,
      }));
    }

    const updates = parseQuota(quotaPlus);
    setQuantities((prev) => {
      const updatedQuantities = { ...prev };
      Object.keys(updates).forEach((key) => {
        if (key in quantities) {
          const typedKey = key as keyof typeof quantities;
          updatedQuantities[typedKey] = (prev[typedKey] || 0) + (updates[typedKey] || 0);
        }
      });
      return updatedQuantities;
    });
  };

  const applyQuotaFull = () => {
    setButtonClicks((prev) => ({
      ...prev,
      quotaFull: prev.quotaFull + 1,
    }));

    // Appelle les fonctions sans incrémenter leurs compteurs
    applyQuota(false);
    applyQuotaPlus(false);
  };

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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mt-4 mb-1 w-full px-4">
        <CustomButton label="Quota" onClick={applyQuota} className="bg-green-500 text-gray-700 hover:bg-green-600" icon={CheckCircle} />
        <CustomButton label="Quota+" onClick={applyQuotaPlus} className="bg-yellow-500 text-gray-700 hover:bg-yellow-600" icon={PlusCircle} />
        <CustomButton label="Quota Full" onClick={applyQuotaFull} className="bg-orange-500 text-gray-700 hover:bg-orange-600" icon={ShieldCheck} />
        <div></div>
        <CustomButton label="Reset all" onClick={resetAll} className="bg-red-500 text-white hover:bg-red-600" icon={RefreshCw} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8 w-full px-4 text-white text-center text-base">
        <p className="text-green-500">{buttonClicks.quota}</p>
        <p className="text-yellow-500">{buttonClicks.quotaPlus}</p>
        <p className="text-orange-500">{buttonClicks.quotaFull}</p>
        <div></div>
        <div></div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full px-4">
        {items.map((item) => (
          <ProductCard
            key={String(item.name)}
            name={item.name}
            image={item.image}
            quantity={quantities[item.name]}
            increments={item.increments}
            decrements={item.decrements}
            onIncrement={(value) => increment(item.name, value)}
            onDecrement={(value) => decrement(item.name, value)}
            onInputChange={(e) => handleInputChange(e, item.name)}
          />
        ))}
      </div>

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
