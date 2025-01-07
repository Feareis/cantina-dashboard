import React, { useState } from "react";
import InputCustom from "../../components/InputCustom";
import { DollarSign, Utensils } from "lucide-react";

const AdminDashboard: React.FC = () => {
  const [quotaValue, setQuotaValue] = useState<number | string>(""); // Quota en argent
  const [quotaDescription, setQuotaDescription] = useState<string>(""); // Description du quota

  const [quotaPlusValue, setQuotaPlusValue] = useState<number | string>(""); // Quota+ en argent
  const [quotaPlusDescription, setQuotaPlusDescription] = useState<string>(""); // Description du quota+

  return (
    <div className="p-8">
      {/* Conteneur principal */}
      <div className="bg-gray-800 p-8 rounded-lg shadow-xl">
        {/* Titre de la section */}
        <h2 className="text-2xl font-semibold text-gray-100 text-center mb-8">
          Gestion des quotas
        </h2>

        {/* Conteneur des deux sections */}
        <div className="flex justify-between gap-8">
          {/* Section Quota */}
          <div className="flex-1 bg-gray-700 p-6 rounded-md shadow-md flex flex-col items-center">
            <h3 className="text-lg font-medium text-gray-200 mb-4 text-center">
              Quota :
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

          {/* Diviseur vertical */}
          <div className="w-px bg-gray-600"></div>

          {/* Section Quota+ */}
          <div className="flex-1 bg-gray-700 p-6 rounded-md shadow-md flex flex-col items-center">
            <h3 className="text-lg font-medium text-gray-200 mb-4">
              Quota+ :
            </h3>
            {/* Inputs */}
            <div className="w-full flex flex-col items-center gap-4">
              {/* Input valeur quota+ */}
              <InputCustom
                type="text"
                value={quotaPlusValue}
                onChange={(e) => setQuotaPlusValue(e.target.value)}
                placeholder="Valeur en $ (eg. 20000)"
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
    </div>
  );
};

export default AdminDashboard;
