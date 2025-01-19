import React, { useEffect, useState } from "react";
import { supabase } from "../../api/supabaseClient";

type WeeklyPast = {
  employee_id: string;
  grade: string;
  first_name: string;
  last_name: string;
  employee_prime: number;
  employee_taxe: number;
  quota: boolean;
  quota_plus: boolean;
};

const AdminPastWeek: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const [totalPrime, setTotalPrime] = useState(0);
  const [totalTaxe, setTotalTaxe] = useState(0);
  const [quotaCount, setQuotaCount] = useState(0);
  const [quotaPlusCount, setQuotaPlusCount] = useState(0);

  const fetchWeeklyPast = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.from("weekly_past").select("*");

      if (error) {
        console.error("Erreur lors de la récupération des données de weekly_past :", error.message);
        return;
      }

      // Calculs des totaux directement sans stocker weeklyPast
      const totalPrimeCalc = data?.reduce((sum, record) => sum + record.employee_prime, 0) || 0;
      const totalTaxeCalc = data?.reduce((sum, record) => sum + record.employee_taxe, 0) || 0;
      const quotaCountCalc = data?.filter((record) => record.quota).length || 0;
      const quotaPlusCountCalc = data?.filter((record) => record.quota_plus).length || 0;

      setTotalPrime(totalPrimeCalc);
      setTotalTaxe(totalTaxeCalc);
      setQuotaCount(quotaCountCalc);
      setQuotaPlusCount(quotaPlusCountCalc);
    } catch (error) {
      if (error instanceof Error) {
        console.error("Erreur inattendue :", error.message);
      } else {
        console.error("Erreur inconnue :", error);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeeklyPast();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Statistiques de la Semaine Passée</h1>

      {loading ? (
        <p>Chargement des données...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-gray-800 text-white p-4 rounded shadow">
            <h2 className="text-xl font-semibold">Total des Primes</h2>
            <p className="text-2xl m-6 text-center text-green-500 font-bold">{totalPrime.toLocaleString()} $</p>
          </div>

          <div className="bg-gray-800 text-white p-4 rounded shadow">
            <h2 className="text-xl font-semibold">Total des Taxes</h2>
            <p className="text-2xl m-6 text-center text-red-500 font-bold">{totalTaxe.toLocaleString()} $</p>
          </div>

          <div className="bg-gray-800 text-white p-4 rounded shadow">
            <h2 className="text-xl font-semibold">Quota OK</h2>
            <p className="text-2xl m-6 text-center text-blue-500 font-bold">{quotaCount}</p>
          </div>

          <div className="bg-gray-800 text-white p-4 rounded shadow">
            <h2 className="text-xl font-semibold">Quota+ OK</h2>
            <p className="text-2xl m-6 text-center text-purple-500 font-bold">{quotaPlusCount}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPastWeek;
