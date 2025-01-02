import React, { useState, useEffect } from "react";
import { CheckCircle, PlusCircle, ShieldCheck, RefreshCw } from "lucide-react";
import ProductCard from "../components/calculator/ProductCard";
import MaterialCard from "../components/calculator/MaterialCard";
import { SaladeCayo, RisottoCayo, PlateauCayo, MontaraCayo, Poisson, Epices } from "../assets/products/indexProducts";

const items = [
  { name: "Salade", image: SaladeCayo, increments: [50, 200], decrements: [200, 50] },
  { name: "Risotto", image: RisottoCayo, increments: [10, 50], decrements: [50, 10] },
  { name: "Plateau", image: PlateauCayo, increments: [10, 50], decrements: [50, 10] },
  { name: "Montara", image: MontaraCayo, increments: [10, 50], decrements: [50, 10] },
];

const Calculator: React.FC = () => {
  const [quantities, setQuantities] = useState({
    salade: 0,
    risotto: 0,
    plateau: 0,
    montara: 0,
  });

  const [total, setTotal] = useState({
    poisson: 0,
    epices: 0,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, key: string) => {
    const value = parseInt(e.target.value);
    setQuantities((prev) => ({ ...prev, [key]: isNaN(value) ? 0 : value }));
  };

  const increment = (key: string, value: number) => {
    setQuantities((prev) => ({ ...prev, [key]: (prev[key as keyof typeof quantities] || 0) + value }));
  };

  const decrement = (key: string, value: number) => {
    setQuantities((prev) => ({
      ...prev,
      [key]: Math.max((prev[key as keyof typeof quantities] || 0) - value, 0),
    }));
  };

  const resetAll = () => {
    setQuantities({ salade: 0, risotto: 0, plateau: 0, montara: 0 });
  };

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
    <div className="flex flex-col items-center py-8 text-gray-900">
      <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-300 to-purple-400 bg-clip-text text-transparent mb-6">
        Calculateur de Matières Premières
      </h2>

      <div className="grid grid-cols-5 gap-4 mt-5 mb-10 w-full px-8">
        <button
          onClick={applyQuota}
          className="flex items-center justify-center bg-green-500 text-gray-700 font-medium py-2 rounded hover:bg-green-600 transform transition duration-250 hover:scale-105"
        >
          <CheckCircle className="mr-2" /> Quota
        </button>
        <button
          onClick={applyQuotaPlus}
          className="flex items-center justify-center bg-yellow-500 text-gray-700 font-medium py-2 rounded hover:bg-yellow-600 transform transition duration-250 hover:scale-105"
        >
          <PlusCircle className="mr-2" /> Quota+
        </button>
        <button
          onClick={applyQuotaFull}
          className="flex items-center justify-center bg-orange-500 text-gray-700 font-medium py-2 rounded hover:bg-orange-600 transform transition duration-250 hover:scale-105"
        >
          <ShieldCheck className="mr-2" /> Quota Full
        </button>
        <div></div>
        <button
          className="flex items-center justify-center bg-red-500 text-white font-medium py-2 rounded hover:bg-red-600 transform transition duration-250 hover:scale-105"
          onClick={resetAll}
        >
          <RefreshCw className="mr-2" /> Reset all
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full px-8">
        {items.map((item) => (
          <div key={item.name} className="transform transition duration-200 hover:scale-105">
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

      <div className="w-full border-t border-gray-500 mt-10"></div>

      <div className="w-3/4 items-center p-6">
        <h3 className="text-3xl font-bold text-center bg-gradient-to-r from-blue-300 to-purple-400 bg-clip-text text-transparent">Total</h3>
        <div className="grid grid-cols-4 gap-6 w-full px-8 mt-5">
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
