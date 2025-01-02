import React, { useState } from 'react';
import CustomButton from "../components/CustomButton";
import CustomDropdown from '../components/CustomDropdown';
import ProductCard from "../components/ProductCard";
import CustomTabs from "../components/CustomTabs";
import { BadgeDollarSign, BadgeCent, CheckCircle, RefreshCw, Percent } from "lucide-react";
import toast, { Toaster } from 'react-hot-toast';
import { RisottoCayo, PlateauCayo, MontaraCayo } from "../assets/products/indexProducts";

const items = [
  {
    name: "Risotto",
    image: RisottoCayo,
    increments: [5],
    decrements: [5],
    category: "Nourriture",
  },
  {
    name: "Plateau",
    image: PlateauCayo,
    increments: [5],
    decrements: [5],
    category: "Nourriture",
  },
  {
    name: "Montara",
    image: MontaraCayo,
    increments: [10],
    decrements: [10],
    category: "Nourriture",
  },
  {
    name: "Jus de cerise",
    image: "Jus de cerise",
    increments: [5],
    decrements: [5],
    category: "Boisson",
  },
  {
    name: "Bières Simple",
    image: MontaraCayo,
    increments: [5],
    decrements: [5],
    category: "Alcool",
  },
  {
    name: "Bières Pils",
    image: "Bières Pils",
    increments: [5],
    decrements: [5],
    category: "Alcool",
  },
  {
    name: "Bières Red",
    image: "Bières Red",
    increments: [5],
    decrements: [5],
    category: "Alcool",
  },
  {
    name: "Bières Triple",
    image: "Bières Triple",
    increments: [5],
    decrements: [5],
    category: "Alcool",
  },
  {
    name: "Bières de test",
    image: MontaraCayo,
    increments: [5],
    decrements: [5],
    category: "Alcool",
  },
  {
    name: "Menu 1",
    image: "Menu 1",
    increments: [2],
    decrements: [2],
    category: "Menu",
  },
  {
    name: "Menu 2",
    image: "Menu 2",
    increments: [2],
    decrements: [2],
    category: "Menu",
  },
  {
    name: "Menu 3",
    image: "Menu 3",
    increments: [2],
    decrements: [2],
    category: "Menu",
  },

];

const ClientsSales: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("Nourriture");
  const [selectedSale, setSelectedSale] = useState<'propre' | 'sale'>('propre');
  const [expertise, setExpertise] = useState<number | "">("");
  const [nbSalade, setNbSalade] = useState<number | "">("");

  const handleSaleSelection = (type: 'propre' | 'sale') => {
    setSelectedSale(type);
  };

  const handleSelect = (selected: string) => {
      console.log('Selected:', selected);
  };

  const formatCurrency = (value: number): string => {
    return `$ ${value.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
  };

  const calculateEmployeesTotal = (): number => {
    if (selectedSale === 'propre') {
      if (!expertise || !nbSalade) {
        return 0;
      }
      return 36 + 36 * ((Number(expertise) || 0) * 0.003) * (Number(nbSalade) || 0);
    } else if (selectedSale === 'sale') {
      return (Number(nbSalade) || 0) * 35;
    }
    return 0;
  };

  const calculateCompanyTotal = (): number => {
    const employeesTotal = calculateEmployeesTotal();
    if (selectedSale === 'propre') {
      return employeesTotal * 0.3;
    } else if (selectedSale === 'sale') {
      return employeesTotal * 0.1;
    }
    return 0;
  };

  const employeesTotal = calculateEmployeesTotal();
  const companyTotal = calculateCompanyTotal();

  const handleButtonClick = () => {
    if (employeesTotal > 0 && companyTotal > 0) {
      toast.success(
            <div className="flex flex-col">
              <div className="flex w-full mb-1">
                <span className="text-white text-base font-semibold">{currentDate}</span>
                <span className="text-white text-base font-semibold pl-2" > - </span>
                <span className="text-white text-base font-bold pl-2">Oscar Kirk</span>
              </div>
              <div className="w-full border-t border-gray-500 mt-2 mb-2"></div>
              <div className="flex w-full mb-1">
                <span className="text-white text-base font-semibold">Total Employé :</span>
                <span className="text-white text-base font-bold pl-2">{formatCurrency(employeesTotal)}</span>
              </div>
              <div className="flex w-full mb-1">
                <span className="text-white text-base font-semibold">Total Entreprise :</span>
                <span className="text-white text-base font-bold pl-2">{formatCurrency(companyTotal)}</span>
              </div>
            </div>,
            {
              duration: 5000,
              style: {
                marginTop: '80px', // Position en dessous de la barre de navigation
                padding: '16px',
                width: '500px', // Largeur personnalisée
                borderRadius: '8px',
                background: '#1f2937', // Couleur de fond sombre
                color: '#fff', // Texte blanc
              },
            }
          );

          // Reset inputs after successful toast
          setExpertise("");
          setNbSalade("");
    } else {
      toast.error(
        <div className="flex flex-col text-sm">
          <span className="text-white text-base font-semibold">Veuillez entrer des informations valides avant d'ajouter une vente.</span>
        </div>,
        {
        duration: 5000,
        style: {
          marginTop: '80px',
          backgroundColor: '#1f2937',
          width: '600px',
          maxWidth: '90%',
        },
      });
    }
  };

  const currentDate = new Date().toLocaleDateString('fr-FR'); // Format DD/MM/YYYY

  const [quantities, setQuantities] = useState({
    risotto: 0,
    plateau: 0,
    montara: 0,
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

  return (
    <div className="flex flex-col items-center py-3 text-gray-900">
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 5000,
          style: {
            marginTop: '80px',
          },
        }}
      />
      <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-300 to-purple-400 bg-clip-text text-transparent">
        Vente Client
      </h2>
      <div className="flex flex-col w-full justify-between p-4 gap-6 text-white">

        {/* Date et Nom de l'employé */}
        <div className="text-2xl font-medium text-gray-400">
          <p>Date : {currentDate}</p>
          <span>Nom Employé : Oscar Kirk</span>
        </div>

        {/* Bloc Top : Type de Vente + Remise */}
        <div className="grid grid-cols-5 gap-4 mt-5 w-full px-8">
          <CustomButton
            label="Vente Propre"
            onClick={() => handleSaleSelection('propre')}
            className={`w-full ${
                selectedSale === 'propre'
                ? 'bg-green-500 text-white'
                : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
            }`}
            icon={BadgeDollarSign}
          />
          <CustomButton
            label="Vente Sale"
            onClick={() => handleSaleSelection('sale')}
            className={`w-full ${
                selectedSale === 'sale'
                ? 'bg-red-500 text-white'
                : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
            }`}
            icon={BadgeCent}
          />
          <CustomDropdown
            options={['Milice', 'Brasserie Cayo', 'Tabac Cayo', 'Repairico']}
            className="w-full bg-orange-500 hover:bg-orange-500 text-white"
            onSelect={handleSaleSelection}
            placeholder="Remise ?"
            icon={Percent}
          />
          <div></div>
          <CustomButton label="Reset all" onClick={handleSelect} className="bg-red-500 text-white hover:bg-red-600" icon={RefreshCw} />
        </div>

        {/* Bloc principal */}
        <div className="flex w-full gap-4 px-4">
          {/* Conteneur principal des onglets et produits */}
          <div className="flex-1 flex flex-col p-6 rounded-lg">
            {/* Onglets */}
              <CustomTabs
              tabs={["Nourriture", "Boisson", "Alcool", "Menu", "Autre"]}
              activeTab={activeTab}
              onTabChange={(tab) => setActiveTab(tab)}
            />

            {/* Produits */}
            <div className="text-gray-700 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
              {items
                  .filter((item) => item.category === activeTab)
                  .map((item, index) => (
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
                  ))}
              </div>
            </div>

            {/* Conteneur des totaux */}
            <div className="w-1/5 flex flex-col w-full bg-gray-700/70 p-6 rounded-lg shadow gap-6 self-start mt-8">
              <div className="flex flex-col justify-center items-center gap-8">
                <div className="w-full">
                  <p className="block text-center text-xl font-bold mb-1">Total Employé :</p>
                  <p className="text-center text-base text-gray-400 mt-1">- Text -</p>
                  <div
                        className={`text-center text-xl font-semibold px-4 py-2 rounded mt-5 ${
                        selectedSale === "propre" ? "bg-green-600/50 text-white" : "bg-red-500/50 text-white"
                        }`}
                    >
                    {formatCurrency(employeesTotal)}
                  </div>
                </div>
                <div className="w-full">
                  <p className="block text-center text-xl font-bold mb-1">Total Entreprise :</p>
                  <p className="text-center text-base text-gray-400 mt-1">- Text -</p>
                  <div
                        className={`text-center text-xl font-semibold px-4 py-2 rounded mt-5 ${
                        selectedSale === "propre" ? "bg-green-600/50 text-white" : "bg-red-500/50 text-white"
                        }`}
                    >
                    {formatCurrency(companyTotal)}
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center gap-8">
                <CustomButton
                  label="Ajouter la vente"
                  onClick={handleButtonClick}
                  className="w-full bg-blue-500 text-white hover:bg-blue-600 px-4 py-2 mt-10"
                  icon={BadgeDollarSign}
                />
              </div>
            </div>
          </div>
      </div>
    </div>
  );
};

export default ClientsSales;
