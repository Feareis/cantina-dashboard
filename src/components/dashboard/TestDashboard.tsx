import React, { useEffect, useState } from "react";
import { supabase } from "../../api/supabaseClient";

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

const WeeklyDashboardTable: React.FC = () => {
  const [rates, setRates] = useState({
    tred_cdd: 0,
    tred_cdi: 0,
    tred_responsable: 0,
    trev_ve: 0,
    trev_vc: 0,
    quota_value: 0,
    quotaplus_value: 0,
  });
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);

  // Récupération des taux depuis la table "data"
  const fetchRates = async () => {
    try {
      const { data: ratesData, error } = await supabase.from("data").select("*");
      if (error) throw error;

      const fetchedRates = {
        tred_cdd: parseFloat(ratesData?.find((rate) => rate.key === "tred_cdd")?.value) || 0,
        tred_cdi: parseFloat(ratesData?.find((rate) => rate.key === "tred_cdi")?.value) || 0,
        tred_responsable: parseFloat(ratesData?.find((rate) => rate.key === "tred_responsable")?.value) || 0,
        trev_ve: parseFloat(ratesData?.find((rate) => rate.key === "trev_ve")?.value) || 0,
        trev_vc: parseFloat(ratesData?.find((rate) => rate.key === "trev_vc")?.value) || 0,
        quota_value: parseFloat(ratesData?.find((rate) => rate.key === "quota_value")?.value) || 0,
        quotaplus_value: parseFloat(ratesData?.find((rate) => rate.key === "quotaplus_value")?.value) || 0,
      };

      setRates(fetchedRates);
    } catch (error) {
      console.error("Erreur lors de la récupération des taux :", error);
    }
  };

  // Récupération des employés depuis la table "employees"
  const fetchEmployees = async () => {
    try {
      const { data: employeesData, error } = await supabase.from("employees").select("*");
      if (error) throw error;

      setEmployees(employeesData || []);
    } catch (error) {
      console.error("Erreur lors de la récupération des employés :", error);
    }
  };

  // Récupération des deux tables
  const fetchData = async () => {
    setLoading(true);
    await Promise.all([fetchRates(), fetchEmployees()]);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <div className="text-center text-white">Chargement des données...</div>;
  }

  return (
    <div className="p-4">

      {/* Section des taux */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-2">Taux</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-gray-800 rounded-lg text-white">
            <p>TRED CDD : {rates.tred_cdd}</p>
          </div>
          <div className="p-4 bg-gray-800 rounded-lg text-white">
            <p>TRED CDI : {rates.tred_cdi}</p>
          </div>
          <div className="p-4 bg-gray-800 rounded-lg text-white">
            <p>TRED Responsable : {rates.tred_responsable}</p>
          </div>
          <div className="p-4 bg-gray-800 rounded-lg text-white">
            <p>TRÉV VE : {rates.trev_ve}</p>
          </div>
          <div className="p-4 bg-gray-800 rounded-lg text-white">
            <p>TRÉV VC : {rates.trev_vc}</p>
          </div>
          <div className="p-4 bg-gray-800 rounded-lg text-white">
            <p>Quota : {rates.quota_value}</p>
          </div>
          <div className="p-4 bg-gray-800 rounded-lg text-white">
            <p>Quota+ : {rates.quotaplus_value}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeeklyDashboardTable;
