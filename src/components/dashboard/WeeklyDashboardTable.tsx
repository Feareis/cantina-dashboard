import React from "react";

const ComplexDivTable: React.FC = () => {
  return (
    <div className="overflow-x-auto p-1">
      {/* Première ligne d'en-tête */}
      <div className="flex flex-wrap items-stretch justify-between bg-gray-800/80 border text-white text-center text-lg space-x-4 rounded-lg p-4">
        <div
          className="border flex-1 px-4 py-2 font-bold bg-gray-600/70 h-16 flex items-center justify-center rounded-lg shadow-2xl"
          style={{ transform: "rotate(-3deg)" }}
        >
          Poste
        </div>
        <div
          className="border flex-1 px-4 py-2 font-bold bg-gray-600/70 h-16 flex items-center justify-center rounded-lg shadow-2xl"
          style={{ transform: "rotate(3deg)" }}
        >
          Nom
        </div>
        <div
          className="border flex-1 px-4 py-2 font-bold bg-green-600/70 h-16 flex items-center justify-center rounded-lg shadow-2xl"
          style={{ transform: "rotate(-3deg)" }}
        >
          Vente Client
        </div>
        <div
          className="border flex-1 px-4 py-2 font-bold bg-red-500/70 h-16 flex items-center justify-center rounded-lg shadow-2xl"
          style={{ transform: "rotate(3deg)" }}
        >
          Vente Client
        </div>
        <div
          className="border flex-1 px-4 py-2 font-bold bg-green-700/70 h-16 flex items-center justify-center rounded-lg shadow-2xl"
          style={{ transform: "rotate(-3deg)" }}
        >
          Vente Export
        </div>
        <div
          className="border flex-1 px-4 py-2 font-bold bg-red-600/70 h-16 flex items-center justify-center rounded-lg shadow-2xl"
          style={{ transform: "rotate(3deg)" }}
        >
          Vente Export
        </div>
        <div
          className="border flex-1 px-4 py-2 font-bold bg-gray-600/70 h-16 flex items-center justify-center rounded-lg shadow-2xl"
          style={{ transform: "rotate(-3deg)" }}
        >
          Quota
        </div>
        <div
          className="border flex-1 px-4 py-2 font-bold bg-gray-600/70 h-16 flex items-center justify-center rounded-lg shadow-2xl"
          style={{ transform: "rotate(3deg)" }}
        >
          Quota+
        </div>
        <div
          className="border flex-1 px-4 py-2 font-bold bg-green-800/70 h-16 flex items-center justify-center rounded-lg shadow-2xl"
          style={{ transform: "rotate(-3deg)" }}
        >
          Prime
        </div>
        <div
          className="border flex-1 px-4 py-2 font-bold bg-red-700/70 h-16 flex items-center justify-center rounded-lg shadow-2xl"
          style={{ transform: "rotate(3deg)" }}
        >
          Taxe
        </div>
      </div>

      {/* Lignes de données */}
      <div className="flex flex-wrap items-center justify-between text-white text-center bg-gray-600 rounded-lg border space-x-4 p-4">
        <div className="border flex-1 px-4 py-2">Manager</div>
        <div className="border flex-1 px-4 py-2">Jean Dupont</div>
        <div className="border flex-1 px-4 py-2">500</div>
        <div className="border flex-1 px-4 py-2">300</div>
        <div className="border flex-1 px-4 py-2">400</div>
        <div className="border flex-1 px-4 py-2">200</div>
        <div className="border flex-1 px-4 py-2">1000</div>
        <div className="border flex-1 px-4 py-2">1200</div>
        <div className="border flex-1 px-4 py-2">1000</div>
        <div className="border flex-1 px-4 py-2">1200</div>
      </div>
      <div className="flex flex-wrap items-center justify-between text-white text-center bg-gray-600 rounded-lg border space-x-4 p-4">
        <div className="border flex-1 px-4 py-2">Vendeur</div>
        <div className="border flex-1 px-4 py-2">Marie Curie</div>
        <div className="border flex-1 px-4 py-2">600</div>
        <div className="border flex-1 px-4 py-2">400</div>
        <div className="border flex-1 px-4 py-2">500</div>
        <div className="border flex-1 px-4 py-2">300</div>
        <div className="border flex-1 px-4 py-2">1100</div>
        <div className="border flex-1 px-4 py-2">1400</div>
        <div className="border flex-1 px-4 py-2">1000</div>
        <div className="border flex-1 px-4 py-2">1200</div>
      </div>
    </div>
  );
};

export default ComplexDivTable;
