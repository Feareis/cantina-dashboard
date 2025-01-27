import React, { useState, useEffect } from "react";
import { supabase } from "../../api/supabaseClient";

const AdminStatsTeams: React.FC = () => {
  const [totalEmployees, setTotalEmployees] = useState(0);
  const [totalResponsable, setTotalResponsable] = useState(0);
  const [totalCDI, setTotalCDI] = useState(0);
  const [totalCDD, setTotalCDD] = useState(0);
  const [loading, setLoading] = useState(true);

  const excludedNames = [/^rh$/i, /^tests$/i, /^testgali$/i];

  const fetchStats = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("employees")
        .select("id, grade, first_name, last_name");

      if (error) {
        console.error("Erreur lors de la récupération des données :", error.message);
        return;
      }

      if (data) {
        const filteredData = data.filter(
          (employee) =>
            !excludedNames.some((regex) =>
              regex.test(employee.first_name?.trim()) || regex.test(employee.last_name?.trim())
            )
        );

        setTotalEmployees(filteredData.length);
        setTotalResponsable(filteredData.filter((employee) => employee.grade === "Responsable").length);
        setTotalCDI(filteredData.filter((employee) => employee.grade === "CDI").length);
        setTotalCDD(filteredData.filter((employee) => employee.grade === "CDD").length);
      }
    } catch (error) {
      console.error("Erreur inattendue :", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  if (loading) {
    return <div className="text-center text-white">Chargement des statistiques...</div>;
  }

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-6">Statistiques Employés</h1>
      {/* Carte : Nombre total d'employés */}
      <div className="bg-green-800 rounded-lg shadow-lg p-6 text-center mb-8 mt-6">
        <h2 className="text-2xl font-bold">Total Employés</h2>
        <p className="text-4xl font-extrabold mt-4">{totalEmployees}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Carte : Nombre total d'employés */}
        <div className="bg-yellow-800 rounded-lg shadow-lg p-6 text-center">
          <h2 className="text-2xl font-bold">Nombre de Responsable</h2>
          <p className="text-4xl font-extrabold mt-4">{totalResponsable}</p>
        </div>

        {/* Carte : Nombre de CDI */}
        <div className="bg-blue-800 rounded-lg shadow-lg p-6 text-center">
          <h2 className="text-2xl font-bold">Nombre de CDI</h2>
          <p className="text-4xl font-extrabold mt-4">{totalCDI}</p>
        </div>

        {/* Carte : Nombre de CDD */}
        <div className="bg-cyan-800 rounded-lg shadow-lg p-6 text-center">
          <h2 className="text-2xl font-bold">Nombre de CDD</h2>
          <p className="text-4xl font-extrabold mt-4">{totalCDD}</p>
        </div>
      </div>
    </div>
  );
};

export default AdminStatsTeams;
