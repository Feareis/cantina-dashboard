import React, { useState } from 'react';
import CustomButton from "../components/CustomButton";
import CustomDropdown from '../components/CustomDropdown';
import ProductCard from "../components/ProductCard";
import CustomTabs from "../components/CustomTabs";
import { BadgeDollarSign, BadgeCent, RefreshCw, Percent } from "lucide-react";
import toast, { Toaster } from 'react-hot-toast';
import { RisottoCayo, PlateauCayo, MontaraCayo, JusDeCerise, Biere, BierePils, BiereRed, BiereTriple } from "../assets/products/indexProducts";
import ProductsPrice from "../data/ProductsPrice";
import Discounts from "../data/Discounts";

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
    image: JusDeCerise,
    increments: [5],
    decrements: [5],
    category: "Boisson",
  },
  {
    name: "Bières",
    image: Biere,
    increments: [5],
    decrements: [5],
    category: "Alcool",
  },
  {
    name: "Bières Pils",
    image: BierePils,
    increments: [5],
    decrements: [5],
    category: "Alcool",
  },
  {
    name: "Bières Red",
    image: BiereRed,
    increments: [5],
    decrements: [5],
    category: "Alcool",
  },
  {
    name: "Bières Triple",
    image: BiereTriple,
    increments: [5],
    decrements: [5],
    category: "Alcool",
  },
  {
    name: "Menu Xpress",
    image: "Menu",
    increments: [2],
    decrements: [2],
    category: "Menu",
  },
  {
    name: "Menu Survivaliste",
    image: "Menu",
    increments: [2],
    decrements: [2],
    category: "Menu",
  },
  {
    name: "Menu Paradise",
    image: "Menu",
    increments: [2],
    decrements: [2],
    category: "Menu",
  },
  {
    name: "Menu El Patron's",
    image: "Menu",
    increments: [2],
    decrements: [2],
    category: "Menu",
  },

];

const ClientsSales: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("Nourriture");
  const [selectedSale, setSelectedSale] = useState<'propre' | 'sale'>('propre');
  const [cart, setCart] = useState<{ product: string; quantity: number }[]>([]);
  const [selectedDiscount, setSelectedDiscount] = useState<string | null>(null);
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});

  const handleSaleSelection = (type: 'propre' | 'sale') => {
    setSelectedSale(type);
  };

  const handleDiscountSelect = (selected: string) => {
    setSelectedDiscount(selected);
  };

  const resetAll = () => {
      setQuantities({ salade: 0, risotto: 0, plateau: 0, montara: 0 });
  };

  const formatCurrency = (value: number): string => {
    return `$ ${value.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
  };

  // Calculate total for employee
  const calculateEmployeesTotal = (): number => {
    if (selectedSale === 'propre') return 0;

    return Object.keys(quantities).reduce((total, product) => {
      const normalizedProduct = product.charAt(0).toUpperCase() + product.slice(1);
      const productPrice = ProductsPrice[normalizedProduct]?.sale || 0;
      return total + (quantities[product] || 0) * productPrice;
    }, 0);
  };

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

  // Add a product to the cart
  const addProductToCart = (product: string, quantity: number) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.product === product);
      if (existingProduct) {
        // Met à jour la quantité du produit existant
        return prevCart.map((item) =>
          item.product === product
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      // Ajoute un nouveau produit au panier
      return [...prevCart, { product, quantity }];
    });
  };

  const handleButtonClick = () => {
    if (employeesTotal >= 0 && companyTotal > 0) {
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, product: string) => {
    const value = parseInt(e.target.value, 10);
    setQuantities((prev) => {
      const updatedQuantities = {
        ...prev,
        [product]: isNaN(value) ? 0 : value,
      };
      console.log("Updated Quantities (Input Change):", updatedQuantities); // Debugging
      return updatedQuantities;
    });
  };

  const increment = (product: string, value: number) => {
    setQuantities((prev) => {
      const updatedQuantities = {
        ...prev,
        [product]: (prev[product] || 0) + value,
      };
      console.log("Updated Quantities (Increment):", updatedQuantities); // Debugging
      return updatedQuantities;
    });
  };

  const decrement = (product: string, value: number) => {
    setQuantities((prev) => {
      const updatedQuantities = {
        ...prev,
        [product]: Math.max((prev[product] || 0) - value, 0), // Prevents negative quantities
      };
      console.log("Updated Quantities (Decrement):", updatedQuantities); // Debugging
      return updatedQuantities;
    });
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
            options={Object.keys(Discounts)}
            className="w-full bg-orange-500 hover:bg-orange-500 text-white"
            onSelect={handleDiscountSelect}
            placeholder="Remise ?"
            icon={Percent}
          />
          <div></div>
          <CustomButton label="Reset all" onClick={resetAll} className="bg-red-500 text-white hover:bg-red-600" icon={RefreshCw} />
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

            {/* Conteneur des totaux */}
            <div className="w-1/5 flex flex-col w-full bg-gray-700/70 p-6 rounded-lg shadow gap-6 self-start mt-8">
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
