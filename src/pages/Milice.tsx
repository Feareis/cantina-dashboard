import React, { useState, useEffect } from "react";
import { supabase } from "../api/supabaseClient";
import { useNavigate } from "react-router-dom";

interface Employee {
  id: string;
  grade: string;
  first_name: string;
  last_name: string;
}

const Milice: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const gradeOrder = ["Patron", "Co-Patron", "Responsable", "CDI", "CDD"];

  const fetchEmployees = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("employees")
        .select("id, grade, first_name, last_name");

      if (error) {
        console.error("Erreur lors de la récupération des employés :", error.message);
        return;
      }

      const filteredData = (data || []).filter(
        (employee) =>
          !/^rh|test|testgali$/i.test(employee.first_name.trim()) &&
          !/^rh|test|testgali$/i.test(employee.last_name.trim())
      );

      const sortedData: Employee[] = filteredData.sort((a, b) => {
        const gradeComparison = gradeOrder.indexOf(a.grade) - gradeOrder.indexOf(b.grade);
        if (gradeComparison !== 0) {
          return gradeComparison; // Trier par grade
        }
        return a.first_name.localeCompare(b.first_name); // Sinon trier par prénom
      });

      setEmployees(sortedData);
    } catch (error) {
      console.error("Erreur inattendue :", error);
    } finally {
      setLoading(false);
    }
  };

  const getGradeClass = (grade: string): string => {
    switch (grade) {
      case "Patron":
      case "Co-Patron":
        return "bg-red-700/50 text-red-400"; // Rouge pour Patron et Co-Patron
      case "Responsable":
        return "bg-yellow-700/50 text-yellow-400"; // Jaune pour Responsable
      case "CDI":
        return "bg-blue-700/50 text-blue-400"; // Bleu pour CDI
      case "CDD":
        return "bg-cyan-700/50 text-cyan-400"; // Cyan pour CDD
      default:
        return "bg-gray-700 text-gray-100"; // Couleur par défaut
    }
  };

  const filteredEmployees = employees.filter((employee) =>
    `${employee.first_name} ${employee.last_name}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    fetchEmployees();
  }, []);

  if (loading) {
    return <div className="text-center text-white">Chargement des données...</div>;
  }

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white flex flex-col items-center">
      <div className="w-1/2 flex items-center mb-6">
        <button
          onClick={() => navigate("/login")}
          className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 rounded-lg hover:scale-105 transition-transform mr-auto"
        >
          Back
        </button>
        <h1 className="text-3xl font-bold mx-auto">Liste Employés Cantina</h1>
      </div>
      <div className="w-1/2">
        <input
          type="text"
          placeholder="Rechercher..."
          className="mb-4 mt-8 p-2 w-full rounded-lg bg-gray-800 text-gray-300 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <table className="w-full text-center border-collapse rounded-lg overflow-hidden shadow-lg">
          <thead className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
            <tr>
              <th className="p-4 text-sm font-semibold uppercase">Grade</th>
              <th className="p-4 text-sm font-semibold uppercase">Nom</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.map((employee, index) => (
              <tr
                key={employee.id}
                className={index % 2 === 0 ? "bg-gray-800/50" : "bg-gray-800"}
              >
                <td className={`p-4 text-xl font-medium ${getGradeClass(employee.grade)}`}>
                  {employee.grade}
                </td>
                <td className="p-4 text-xl text-gray-200">
                  {employee.first_name} {employee.last_name}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Milice;
