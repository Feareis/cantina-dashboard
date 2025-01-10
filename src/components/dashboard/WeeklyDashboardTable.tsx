import React, { useEffect, useState } from "react";
import { CheckCircle, XCircle } from "lucide-react";
import { supabase } from "../../api/supabaseClient";

const WeeklyDashboardTable: React.FC = () => {
  const [employeeData, setEmployeeData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  interface Employee {
    id: string;
    first_name: string;
    last_name: string;
    phone: string;
    grade: "Patron" | "Co-Patron" | "Responsable" | "CDI" | "CDD";
    hire_date: string;
    vcp: number; // Vente Client Propre
    vcs: number; // Vente Client Sale
    vep: number; // Vente Export Propre
    ves: number; // Vente Export Sale
    quota: boolean;
    quota_plus: boolean;
  }

  const rolePriority: { [key in Employee["grade"]]: number } = {
    Responsable: 1,
    CDI: 2,
    CDD: 3,
  };

  // Fonction pour récupérer les données depuis Supabase
  const fetchEmployeeData = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.from("employees").select("*");
      if (error) {
        console.error("Erreur lors de la récupération des données : ", error);
        return;
      }

      // Filtrer et trier
      const sortedData = (data as Employee[])
        .filter((employee) => ["Responsable", "CDI", "CDD"].includes(employee.grade))
        .sort((a, b) => rolePriority[a.grade] - rolePriority[b.grade]);

      setEmployeeData(sortedData);
    } catch (error) {
      console.error("Erreur inconnue : ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployeeData();
  }, []);

  // Format currency values
  const formatCurrency = (value: number): string => {
    return `$ ${value.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
  };

  if (loading) {
    return <div className="text-center text-white">Chargement des données...</div>;
  }

  return (
    <div className="overflow-x-auto rounded-lg mt-6">
      {/* Première ligne d'en-tête */}
      <div className="flex flex-wrap items-stretch justify-between border-b border-gray-400 text-white text-center text-lg space-x-2 p-4 mb-2">
        <div
          className="border flex-1 px-4 py-2 font-bold bg-gray-900/50 h-16 flex items-center justify-center rounded-lg shadow-2xl"
          style={{ transform: "rotate(-2deg)" }}
        >
          Poste
        </div>
        <div
          className="border flex-1 px-4 py-2 font-bold bg-gray-900/50 h-16 flex items-center justify-center rounded-lg shadow-2xl"
          style={{ transform: "rotate(2deg)" }}
        >
          Nom
        </div>
        <div
          className="border flex-1 px-4 py-2 font-bold bg-green-900 h-16 flex items-center justify-center rounded-lg shadow-2xl"
          style={{ transform: "rotate(-2deg)" }}
        >
          Vente Client
        </div>
        <div
          className="border flex-1 px-4 py-2 font-bold bg-red-900 h-16 flex items-center justify-center rounded-lg shadow-2xl"
          style={{ transform: "rotate(2deg)" }}
        >
          Vente Client
        </div>
        <div
          className="border flex-1 px-4 py-2 font-bold bg-green-900 h-16 flex items-center justify-center rounded-lg shadow-2xl"
          style={{ transform: "rotate(-2deg)" }}
        >
          Vente Export
        </div>
        <div
          className="border flex-1 px-4 py-2 font-bold bg-red-900 h-16 flex items-center justify-center rounded-lg shadow-2xl"
          style={{ transform: "rotate(2deg)" }}
        >
          Vente Export
        </div>
        <div
          className="border flex-1 px-4 py-2 font-bold bg-gray-900/50 h-16 flex items-center justify-center rounded-lg shadow-2xl"
          style={{ transform: "rotate(-2deg)" }}
        >
          Quota
        </div>
        <div
          className="border flex-1 px-4 py-2 font-bold bg-gray-900/50 h-16 flex items-center justify-center rounded-lg shadow-2xl"
          style={{ transform: "rotate(2deg)" }}
        >
          Quota+
        </div>
        <div
          className="border flex-1 px-4 py-2 font-bold bg-green-900 h-16 flex items-center justify-center rounded-lg shadow-2xl"
          style={{ transform: "rotate(-2deg)" }}
        >
          Prime
        </div>
        <div
          className="border flex-1 px-4 py-2 font-bold bg-red-900 h-16 flex items-center justify-center rounded-lg shadow-2xl"
          style={{ transform: "rotate(2deg)" }}
        >
          Taxe
        </div>
      </div>

      {/* Lignes de données dynamiques */}
      {employeeData
        .filter((employee) => employee.grade !== "Patron" && employee.grade !== "Co-Patron")
        .map((employee, index) => (
          <div
            key={index}
            className="flex flex-wrap items-center justify-between text-lg border-b border-gray-600 text-center p-2"
          >
          {/* Grade Employee */}
            <div
              className={`rounded-lg font-bold border-r border-gray-800 flex-1 px-4 py-2 ${
                employee.grade === "Responsable"
                  ? "bg-yellow-700 text-yellow-100" // Jaune foncé pour Responsable
                  : employee.grade === "CDI"
                  ? "bg-blue-700 text-blue-100" // Bleu foncé pour CDI
                  : employee.grade === "CDD"
                  ? "bg-cyan-700 text-cyan-100" // Cyan foncé pour CDD
                  : ""
              }`}
              style={{ transform: "rotate(-2deg)" }}
            >
            {employee.grade}
          </div>

          {/* Alias Prénom.N + Prénom Nom */}
          <div className="font-bold text-gray-400 border-r border-gray-600 flex-1 px-4 py-2">
            {`${employee.first_name}.${employee.last_name.charAt(0)}`}
            <p className="text-xs text-gray-600">{`${employee.first_name} ${employee.last_name}`}</p>
          </div>

          {/* Vente Client Propre */}
          <div className="font-bold text-green-600 border-x border-gray-800 flex-1 px-4 py-2">
            {formatCurrency(employee.vcp)}
          </div>

          {/* Vente Client Sale */}
          <div className="font-bold text-red-600 border-x border-gray-800 flex-1 px-4 py-2">
            {formatCurrency(employee.vcs)}
          </div>

          {/* Vente Export Propre */}
          <div className="font-bold text-green-600 border-x border-gray-800 flex-1 px-4 py-2">
            {formatCurrency(employee.vep)}
          </div>

          {/* Vente Export Sale */}
          <div className="font-bold text-red-600 border-r border-gray-600 flex-1 px-4 py-2">
            {formatCurrency(employee.ves)}
          </div>

          {/* Quota */}
          <div className="flex-1 px-4 py-2 border-x border-gray-800 flex justify-center items-center">
            {employee.quota ? (
              <CheckCircle className="text-center text-green-500" size={20} />
            ) : (
              <XCircle className="text-red-500" size={20} />
            )}
          </div>

          {/* Quota+ */}
          <div className="flex-1 px-4 py-2 border-r border-gray-600 flex justify-center items-center">
            {employee.quota_plus ? (
              <CheckCircle className="text-green-500" size={20} />
            ) : (
              <XCircle className="text-red-500" size={20} />
            )}
          </div>

          {/* Prime */}
          <div className="font-bold text-green-600 border-x border-gray-800 flex-1 px-4 py-2">
            {formatCurrency((employee.vcp+employee.vep)*0.4)}
          </div>

          {/* Taxe */}
          <div className="font-bold text-red-600 border-l border-gray-800 flex-1 px-4 py-2">
            {formatCurrency((employee.vcs+employee.ves)*0.4)}
          </div>
        </div>
      ))}
    </div>
  );
};

export default WeeklyDashboardTable;
