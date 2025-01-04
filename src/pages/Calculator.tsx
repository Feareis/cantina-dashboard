// Import necessary modules
import React, { useState, useEffect } from "react";
import { CheckCircle, PlusCircle, ShieldCheck, RefreshCw } from "lucide-react";
import ProductCard from "../components/ProductCard";
import MaterialCard from "../components/MaterialCard";
import CustomButton from "../components/CustomButton";
import { SaladeCayo, RisottoCayo, PlateauCayo, MontaraCayo, Poisson, Epices } from "../assets/products/indexProducts";

// Product configuration
const items = [
  { name: "Salade", image: SaladeCayo, increments: [50], decrements: [50] },
  { name: "Risotto", image: RisottoCayo, increments: [10], decrements: [10] },
  { name: "Plateau", image: PlateauCayo, increments: [10], decrements: [10] },
  { name: "Montara", image: MontaraCayo, increments: [10], decrements: [10] },
];

const Calculator: React.FC = () => {
  // State for quantities of products
  const [quantities, setQuantities] = useState({
    salade: 0,
    risotto: 0,
    plateau: 0,
    montara: 0,
  });

  // State for total calculations
  const [total, setTotal] = useState({
    poisson: 0,
    epices: 0,
  });

  // Handle input change for quantity
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, key: string) => {
    const value = parseInt(e.target.value);
    setQuantities((prev) => ({ ...prev, [key]: isNaN(value) ? 0 : value }));
  };

  // Increment quantity by a specific value
  const increment = (key: string, value: number) => {
    setQuantities((prev) => ({ ...prev, [key]: (prev[key as keyof typeof quantities] || 0) + value }));
  };

  // Decrement quantity by a specific value
  const decrement = (key: string, value: number) => {
    setQuantities((prev) => ({
      ...prev,
      [key]: Math.max((prev[key as keyof typeof quantities] || 0) - value, 0),
    }));
  };

  // Reset all quantities
  const resetAll = () => {
    setQuantities({ salade: 0, risotto: 0, plateau: 0, montara: 0 });
  };

  // Apply specific quotas
  const applyQuota = () => {
    setQuantities((prev) => ({
      ...prev,
      risotto: (prev.risotto || 0) + 200,
      plateau: (prev.plateau || 0) + 200,
    }));
  };

  const applyQuotaPlus = () => {
    setQuantities((prev) => ({
      ...prev,
      plateau: (prev.plateau || 0) + 400,
    }));
  };

  const applyQuotaFull = () => {
    applyQuota();
    applyQuotaPlus();
  };

  // Update totals whenever quantities change
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

      {/* Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mt-5 mb-10 w-full px-4">
        <CustomButton label="Quota" onClick={applyQuota} className="bg-green-500 text-gray-700 hover:bg-green-600" icon={CheckCircle} />
        <CustomButton label="Quota+" onClick={applyQuotaPlus} className="bg-yellow-500 text-gray-700 hover:bg-yellow-600" icon={PlusCircle} />
        <CustomButton label="Quota Full" onClick={applyQuotaFull} className="bg-orange-500 text-gray-700 hover:bg-orange-600" icon={ShieldCheck} />
        <div></div>
        <CustomButton label="Reset all" onClick={resetAll} className="bg-red-500 text-white hover:bg-red-600" icon={RefreshCw} />
      </div>

      {/* Product Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full px-4">
        {items.map((item) => (
          <div key={item.name}>
            <ProductCard
              key={item.name}
              name={item.name}
              image={item.image}
              quantity={quantities[item.name.toLowerCase() as keyof typeof quantities] || 0}
              increments={item.increments}
              decrements={item.decrements}
              onIncrement={(value) => increment(item.name.toLowerCase(), value)}
              onDecrement={(value) => decrement(item.name.toLowerCase(), value)}
              onInputChange={(e) => handleInputChange(e, item.name.toLowerCase())}
            />
          </div>
        ))}
      </div>

      {/* Divider */}
      <div className="w-full border-t border-gray-500 mt-10"></div>

      {/* Totals */}
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
