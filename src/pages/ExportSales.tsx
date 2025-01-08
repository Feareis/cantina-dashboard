// Import necessary modules
import React, { useState } from 'react';
import CustomButton from "../components/CustomButton";
import InputCustom from "../components/InputCustom";
import { BadgeDollarSign, BadgeCent, ArrowUpNarrowWide, Salad } from "lucide-react";
import toast, { Toaster } from 'react-hot-toast';

const ExportSales: React.FC = () => {
  const [selectedSale, setSelectedSale] = useState<'propre' | 'sale'>('propre');
  const [expertise, setExpertise] = useState<number | "">("");
  const [nbSalade, setNbSalade] = useState<number | "">("");

  // Handle the sale type selection
  const handleSaleSelection = (type: 'propre' | 'sale') => {
    setSelectedSale(type);
  };

  // Format currency values
  const formatCurrency = (value: number): string => {
    return `$ ${value.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
  };

  // Calculate totals for employees
  const calculateEmployeesTotal = (): number => {
    if (selectedSale === 'propre') {
      if (!expertise || !nbSalade) {
        return 0;
      }
      return (36 + 36 * ((Number(expertise) || 0) * 0.003)) * (Number(nbSalade) || 0);
    } else if (selectedSale === 'sale') {
      return (Number(nbSalade) || 0) * 35;
    }
    return 0;
  };

  // Calculate totals for the company
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

  // Handle button click for adding sales
  const handleButtonClick = () => {
    if (employeesTotal > 0 && companyTotal > 0) {
      toast.success(
        <div className="flex flex-col text-sm">
          <div className="flex w-full mb-1">
            <span className="text-white text-base font-semibold">{currentDate}</span>
            <span className="text-white text-base font-semibold pl-2"> - </span>
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
            marginTop: '80px',
            padding: '16px',
            width: '500px',
            borderRadius: '8px',
            background: '#1f2937',
            color: '#fff',
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
        }
      );
    }
  };

  const currentDate = new Date().toLocaleDateString('fr-FR');

  return (
    <div className="flex flex-col items-center text-gray-900 w-full max-w-8xl mx-auto">
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 5000,
          style: {
            marginTop: '150px',
          },
        }}
      />

      {/* Left Section */}
      <div className="flex flex-col w-full md:flex-row items-stretch justify-between p-4 gap-6 text-white">
        <div className="flex flex-col w-full md:w-1/2 p-6 rounded-lg gap-8">
          <div className="text-xl sm:text-2xl font-medium text-gray-400">
            <p>Date : {currentDate}</p>
            <span>Nom Employé : Oscar Kirk</span>
          </div>

          {/* Expertise Input */}
          <label className="block">
            <p className="text-base sm:text-lg font-bold">Niveau d'expertise :</p>
            <div className="relative group mt-4">
              <InputCustom
                type="text"
                icon={ArrowUpNarrowWide}
                value={expertise}
                onChange={(e) => setExpertise(Number(e.target.value) || "")}
                placeholder="Entrez le niveau d'expertise"
                bgColor="bg-gray-900/70"
                textColor="text-gray-400"
                className="w-2/3"
              />
            </div>
          </label>

          {/* Salad Input */}
          <label className="block">
            <p className="text-lg font-bold">Nombre de salade :</p>
            <div className="relative group mt-4">
              <InputCustom
                type="text"
                icon={Salad}
                value={nbSalade}
                onChange={(e) => setNbSalade(Number(e.target.value) || "")}
                placeholder="Entrez le nombre de salades"
                bgColor="bg-gray-900/70"
                textColor="text-gray-400"
                className="w-2/3"
              />
            </div>
          </label>

          {/* Sale Type Selection */}
          <div>
            <p className="text-lg font-bold">Type de vente :</p>
            <div className="flex gap-4 mt-4">
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
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex flex-col w-full md:w-1/2 p-6 rounded-lg gap-6">
          <div className="flex flex-col justify-center items-center h-full gap-8">
            <div className="w-full sm:w-2/3">
              <p className="block text-center text-lg sm:text-xl font-bold mb-1">Total Employé :</p>
              <p className="text-center text-sm sm:text-base text-gray-400 mt-1">- Dans vos poches directement -</p>
              <div
                className={`text-center text-lg sm:text-xl font-semibold px-4 py-2 rounded mt-5 ${
                  selectedSale === "propre" ? "bg-green-600/50 text-white" : "bg-red-500/50 text-white"
                }`}
              >
                {formatCurrency(employeesTotal)}
              </div>
            </div>
            <div className="w-full sm:w-2/3">
              <p className="block text-center text-lg sm:text-xl font-bold mb-1">Total Entreprise :</p>
              <p className="text-center text-sm sm:text-base text-gray-400 mt-1">
                {selectedSale === "propre"
                  ? "- Séparé de ce que vous gagnez, pas de taxe -"
                  : "- Taxe à donner en fin de semaine -"}
              </p>
              <div
                className={`text-center text-lg sm:text-xl font-semibold px-4 py-2 rounded mt-5 ${
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
              className="w-full sm:w-2/3 bg-blue-500 text-white hover:bg-blue-600 px-4 py-2 mt-auto"
              icon={BadgeDollarSign}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExportSales;
