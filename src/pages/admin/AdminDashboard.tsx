import React, { useState } from "react";
import InputCustom from "../../components/InputCustom";
import CustomButton from "../../components/CustomButton";
import { DollarSign, Utensils, Save } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";


const AdminDashboard: React.FC = () => {
  const [quotaValue, setQuotaValue] = useState<number | string>(""); // Quota en argent
  const [quotaDescription, setQuotaDescription] = useState<string>(""); // Description du quota
  const [quotaPlusValue, setQuotaPlusValue] = useState<number | string>(""); // Quota+ en argent
  const [quotaPlusDescription, setQuotaPlusDescription] = useState<string>(""); // Description du quota+

  // Toast
  const saveSettings = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("OK !");
      }, 2000);
    });
  };

  const handleSave = () => {
    toast.promise(
      saveSettings(),
      {
        loading: "Sauvegarde en cours...",
        success: <b>OK !</b>,
      },
      {
        style: {
          marginTop: "100px",
          padding: "16px",
          borderRadius: "8px",
          background: "#1f2937",
          color: "#ffffff",
          border: "1px solid #374151",
        },
      }
    );
  };

  return (
    <div className="p-8">

      {/* Toast */}
      <Toaster position="top-right" />

      {/* Gestion Quotas */}
      <div className="p-6 bg-gray-800/50 border border-gray-700 rounded-lg mb-8">
        {/* Titre de la section */}
        <h2 className="text-2xl font-semibold text-gray-100 text-center mb-4">
          Gestion des quotas
        </h2>

        {/* Conteneur des deux sections */}
        <div className="flex justify-between gap-6">
          {/* Section Quota */}
          <div className="flex-1 p-3 flex flex-col items-center">
            <h3 className="text-lg font-medium text-gray-200 mb-4 text-center">
              Quota
            </h3>
            {/* Inputs */}
            <div className="w-full flex flex-col items-center gap-4">
              {/* Input valeur quota */}
              <InputCustom
                type="text"
                value={quotaValue}
                onChange={(e) => setQuotaValue(e.target.value)}
                placeholder="Valeur en $ (eg. 50000)"
                icon={DollarSign}
                bgColor="bg-gray-900/70"
                textColor="text-gray-400"
                className="w-5/6"
              />
              {/* Input description quota */}
              <InputCustom
                type="text"
                value={quotaDescription}
                onChange={(e) => setQuotaDescription(e.target.value)}
                placeholder="Description (eg. 2000 Salade)"
                icon={Utensils}
                bgColor="bg-gray-900/70"
                textColor="text-gray-400"
                className="w-5/6"
              />
            </div>
          </div>

          {/* Section Quota+ */}
          <div className="flex-1 p-3 flex flex-col items-center">
            <h3 className="text-lg font-medium text-gray-200 mb-4">
              Quota+
            </h3>
            {/* Inputs */}
            <div className="w-full flex flex-col items-center gap-4">
              {/* Input valeur quota+ */}
              <InputCustom
                type="text"
                value={quotaPlusValue}
                onChange={(e) => setQuotaPlusValue(e.target.value)}
                placeholder="Valeur en $/Objet (eg. 20000 ou items)"
                icon={DollarSign}
                bgColor="bg-gray-900/70"
                textColor="text-gray-400"
                className="w-5/6"
              />
              {/* Input description quota+ */}
              <InputCustom
                type="text"
                value={quotaPlusDescription}
                onChange={(e) => setQuotaPlusDescription(e.target.value)}
                placeholder="Description (eg. 2000 Salade)"
                icon={Utensils}
                bgColor="bg-gray-900/70"
                textColor="text-gray-400"
                className="w-5/6"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bouton Sauvegarder */}
      <div className="flex justify-end mt-10">
        <CustomButton
          label="Save"
          onClick={handleSave}
          className="bg-gradient-to-r from-blue-400/70 to-purple-500/70 text-white hover:bg-blue-700 px-6 py-2"
          icon={Save}
        />
      </div>
    </div>
  );
};

export default AdminDashboard;
