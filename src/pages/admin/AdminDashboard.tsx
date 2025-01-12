import React, { useState, useEffect } from "react";
import InputCustom from "../../components/InputCustom";
import CustomButton from "../../components/CustomButton";
import { DollarSign, Utensils, Save } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { supabase } from "../../api/supabaseClient";


const AdminDashboard: React.FC = () => {
  const [quotaValue, setQuotaValue] = useState<number | string>("");
  const [quotaDescription, setQuotaDescription] = useState<string>("");
  const [quotaPlusValue, setQuotaPlusValue] = useState<number | string>("");
  const [quotaPlusDescription, setQuotaPlusDescription] = useState<string>("");
  const [initialData, setInitialData] = useState<any>(null);

  // Fetch initial data from Supabase
  const fetchData = async () => {
    const { data, error } = await supabase.from("data").select("key, value");

    if (error) {
      toast.error("Erreur lors de la récupération des données.");
      return;
    }

    const formattedData = data.reduce((acc: any, item: any) => {
      acc[item.key] = item.value;
      return acc;
    }, {});

    setQuotaValue(formattedData.quota_value || "");
    setQuotaDescription(formattedData.quota_description || "");
    setQuotaPlusValue(formattedData.quotaplus_value || "");
    setQuotaPlusDescription(formattedData.quotaplus_description || "");
    setInitialData(formattedData); // Save initial data for comparison
  };

  // Toast
  const saveSettings = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("OK !");
      }, 2000);
    });
  };

  // Update data in Supabase
  const handleSave = async () => {
    const updates: { key: string; value: string | number }[] = [];

    if (quotaValue !== initialData?.quota_value) {
      updates.push({ key: "quota_value", value: quotaValue });
    }
    if (quotaDescription !== initialData?.quota_description) {
      updates.push({ key: "quota_description", value: quotaDescription });
    }
    if (quotaPlusValue !== initialData?.quotaplus_value) {
      updates.push({ key: "quotaplus_value", value: quotaPlusValue });
    }
    if (quotaPlusDescription !== initialData?.quotaplus_description) {
      updates.push({ key: "quotaplus_description", value: quotaPlusDescription });
    }

    if (updates.length === 0) {
      toast("Aucune modification détectée.");
      return;
    }

    const errors = [];
    for (const update of updates) {
      const { error } = await supabase
        .from("data")
        .update({ value: update.value })
        .eq("key", update.key);

      if (error) {
        errors.push(update.key);
      }
    }

    if (errors.length > 0) {
      toast.error(`Erreur lors de la mise à jour des clés : ${errors.join(", ")}`);
    } else {
      toast.success("Données mises à jour avec succès !");
      fetchData(); // Refresh data after save
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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
                textColor="text-gray-300"
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
                textColor="text-gray-300"
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
                textColor="text-gray-300"
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
                textColor="text-gray-300"
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
