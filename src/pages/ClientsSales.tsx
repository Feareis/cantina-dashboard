// Import necessary modules
import React, { useState } from 'react';
import CustomButton from "../components/CustomButton";
import DiscountsDropdown from '../components/clients-sales/DiscountsDropdown';
import ProductCard from "../components/card/ProductCard";
import ProductsTabs from "../components/clients-sales/ProductsTabs";
import { BadgeDollarSign, BadgeCent, RefreshCw, Percent } from "lucide-react";
import toast, { Toaster } from 'react-hot-toast';
import { RisottoCayo, PlateauCayo, MontaraCayo, JusDeCerise, Biere, BierePils, BiereRed, BiereTriple } from "../assets/products/indexProducts";  // MenuXpress, MenuSurvivaliste, MenuParadise, MenuElPatron
import ProductsPrice from "../data/ProductsPrice";
import Discounts from "../data/Discounts";
import { supabase } from "../api/supabaseClient";
import { useAuth } from "../api/AuthContext";


const items = [
  // Configuration of products
  { name: "Risotto", image: RisottoCayo, increments: [5], decrements: [5], category: "Nourriture" },
  { name: "Plateau", image: PlateauCayo, increments: [5], decrements: [5], category: "Nourriture" },
  { name: "Montara", image: MontaraCayo, increments: [10], decrements: [10], category: "Boisson" },
  { name: "Jus de cerise", image: JusDeCerise, increments: [5], decrements: [5], category: "Boisson" },
  { name: "Bière", image: Biere, increments: [1], decrements: [1], category: "Alcool" },
  { name: "Bière Pils", image: BierePils, increments: [1], decrements: [1], category: "Alcool" },
  { name: "Bière Red", image: BiereRed, increments: [1], decrements: [1], category: "Alcool" },
  { name: "Bière Triple", image: BiereTriple, increments: [1], decrements: [1], category: "Alcool" },
  // { name: "Menu Xpress", image: MenuXpress, increments: [1], decrements: [1], category: "Menu" },
  // { name: "Menu Survivaliste", image: MenuSurvivaliste, increments: [1], decrements: [1], category: "Menu" },
  // { name: "Menu Paradise", image: MenuParadise, increments: [1], decrements: [1], category: "Menu" },
  // { name: "Menu El Patron's", image: MenuElPatron, increments: [1], decrements: [1], category: "Menu" },
];

const ClientsSales: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<string>("Nourriture");
  const [selectedSale, setSelectedSale] = useState<'propre' | 'sale'>('propre');
  const [selectedDiscount, setSelectedDiscount] = useState<string | null>(null);
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});

  const firstName = user?.firstName || "Inconnu";
  const lastName = user?.lastName || "Inconnu";
  const employeeId = user?.employeeID;
  const fullName = `${firstName} ${lastName}`.trim();

  const logSale = async (
    employeeId: string,
    type: "client" | "export",
    saleType: "propre" | "sale",
    employeeShare: number,
    companyShare: number
  ) => {
    const { error } = await supabase.from("sales_logs").insert([
      {
        employee_id : employeeId,
        type,
        sale_type: saleType,
        employee_share: employeeShare,
        company_share: companyShare,
        date: new Date().toISOString(),
      },
    ]);

    if (error) {
      console.error("Erreur lors de l'ajout de la vente : ", error.message);
    } else {
      console.log("Vente ajoutée avec succès !");
    }
  };

  // Handle the selection of sale type (e.g., 'propre' or 'sale')
  const handleSaleSelection = (type: 'propre' | 'sale') => {
    setSelectedSale(type);
  };

  // Handle the selection of a discount from the dropdown
  const handleDiscountSelect = (selected: string) => {
    setSelectedDiscount(selected);
  };

  // Reset all quantities to their initial state
  const resetAll = () => {
    setQuantities({});
  };

  // Format a number as a currency string (e.g., "$123,456")
  const formatCurrency = (value: number): string => {
    return `$ ${value.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
  };

  // Calculate totals for employees
  const calculateEmployeesTotal = (): number => {
    if (selectedSale === 'propre') return 0;

    return Object.keys(quantities).reduce((total, product) => {
      const normalizedProduct = product.charAt(0).toUpperCase() + product.slice(1);
      const productPrice = ProductsPrice[normalizedProduct]?.sale || 0;
      return total + (quantities[product] || 0) * productPrice;
    }, 0);
  };

  // Calculate totals for the company
  const calculateCompanyTotal = (): number => {
    if (selectedSale === 'sale') {
      return calculateEmployeesTotal() * 0.15;
    }

    const totalPropre = Object.keys(quantities).reduce((total, product) => {
      const normalizedProduct = product.charAt(0).toUpperCase() + product.slice(1);
      const productPrice = ProductsPrice[normalizedProduct]?.propre || 0;
      return total + (quantities[product] || 0) * productPrice;
    }, 0);

    if (selectedDiscount && Discounts[selectedDiscount]) {
      return totalPropre * (1 - Discounts[selectedDiscount]);
    }

    return totalPropre;
  };

  const employeesTotal = calculateEmployeesTotal();
  const companyTotal = calculateCompanyTotal();

  // Handle changes in the input field for a specific product
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, product: string) => {
    const value = parseInt(e.target.value, 10);
    setQuantities((prev) => ({
      ...prev,
      [product]: isNaN(value) ? 0 : value,
    }));
  };

  // Increment the quantity of a specific product by a given value
  const increment = (product: string, value: number) => {
    setQuantities((prev) => ({
      ...prev,
      [product]: (prev[product] || 0) + value,
    }));
  };

  // Decrement the quantity of a specific product by a given value, ensuring no negative values
  const decrement = (product: string, value: number) => {
    setQuantities((prev) => ({
      ...prev,
      [product]: Math.max((prev[product] || 0) - value, 0),
    }));
  };

  const currentDate = new Date().toLocaleDateString('fr-FR');

  // Handle the button click to add a sale, showing a toast notification
  const handleButtonClick = () => {
    if (employeesTotal >= 0 && companyTotal > 0) {

        logSale(
          employeeId,
          "client",
          selectedSale,
          employeesTotal,
          companyTotal
        );

      toast.success(
        <div className="flex flex-col">
          <div className="flex w-full mb-1">
            <span className="text-white text-base font-semibold">{currentDate}</span>
            <span className="text-white text-base font-semibold pl-2"> - </span>
            <span className="text-white text-base font-bold pl-2">{fullName}</span>
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
            marginTop: '100px',
            padding: '16px',
            width: '450px',
            borderRadius: '8px',
            background: '#1f2937',
            color: '#fff',
          },
        }
      );

      resetAll();
    } else {
      toast.error(
        <div className="flex flex-col text-sm">
          <span className="text-white text-base font-semibold">Veuillez entrer des informations valides avant d'ajouter une vente.</span>
        </div>,
        {
          duration: 5000,
          style: {
            marginTop: '100px',
            backgroundColor: '#1f2937',
            width: '450px',
            maxWidth: '90%',
          },
        }
      );
    }
  };

  return (
    <div className="flex flex-col items-center py-3 text-gray-900 w-full max-w-8xl mx-auto">

      {/* Toast Notifications */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 5000,
          style: {
            marginTop: '80px',
          },
        }}
      />

      {/* Main Content */}
      <div className="flex flex-col w-full justify-between p-4 gap-6 text-white">

        {/* Employee Info */}
        <div className="text-2xl font-medium text-gray-400">
          <p>Date : {currentDate}</p>
          <span>Nom Employé : {fullName}</span>
        </div>

        {/* Sale Selection and Reset Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4 mt-5 w-full px-8">

          {/* Buttons for Sale Type Selection and Reset */}
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
          <DiscountsDropdown
            options={Object.keys(Discounts)}
            className="w-full bg-orange-500 hover:bg-orange-500 text-white"
            onSelect={handleDiscountSelect}
            placeholder="Remise ?"
            icon={Percent}
          />
          <div></div>
          <CustomButton label="Reset all" onClick={resetAll} className="bg-red-500 text-white hover:bg-red-600" icon={RefreshCw} />
        </div>

        {/* Tabs and Product List */}
        <div className="flex flex-col md:flex-row w-full gap-6 px-4">

          {/* Product Tabs */}
          <div className="w-4/5 flex-1 flex flex-col p-4 rounded-lg">

            {/* Product Filter Tabs */}
            <ProductsTabs
              tabs={["Nourriture", "Boisson", "Alcool"]} // "Menu"
              activeTab={activeTab}
              onTabChange={(tab) => setActiveTab(tab)}
            />

            {/* Filtered Product List */}
            <div className="text-gray-700 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">

              {/* Individual Product Cards */}
              {items
                .filter((item) => item.category === activeTab)
                .map((item) => (
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

          {/* Totals Section */}
          <div className="w-full md:w-1/4 flex flex-col bg-gray-700/70 p-6 rounded-lg shadow gap-6 self-start mt-8">

            {/* Employee and Company Totals */}
            <div className="flex flex-col justify-center items-center gap-8">
              <div className="w-full">
                <p className="block text-center text-xl font-bold mb-1">Total Employé :</p>
                <p className="text-center text-base text-gray-400 mt-1">
                  {selectedSale === 'propre'
                    ? ""
                    : "Recuperer tout le sale pour vous"}
                </p>
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
                <p className="text-center text-base text-gray-400 mt-1">
                  {selectedSale === 'propre'
                    ? "Faites une facture avec F6"
                    : "Taxe à donner en fin de semaine"}
                </p>
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
