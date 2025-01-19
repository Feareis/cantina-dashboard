// AdminUsersOptions.tsx

import React, { useEffect, useState } from "react";
import { supabase } from "../../api/supabaseClient";

interface Employee {
  id: string;
  grade: string;
  first_name: string;
  last_name: string;
  holidays: boolean;
  warning1: boolean;
  warning2: boolean;
}

const AdminUsersOptions: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(false);

  const gradeOrder = ["Patron", "Co-Patron", "Responsable", "CDI", "CDD"];

  const fetchEmployees = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("employees")
        .select("id, grade, first_name, last_name, holidays, warning1, warning2");

      if (error) {
        console.error("Erreur lors de la récupération des employés :", error.message);
        return;
      }

      const sortedData: Employee[] = (data || []).sort((a, b) => {
        const gradeComparison =
          gradeOrder.indexOf(a.grade) - gradeOrder.indexOf(b.grade);
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

  const toggleSwitch = async (
    id: string,
    field: "holidays" | "warning1" | "warning2",
    currentValue: boolean
  ) => {
    const { error } = await supabase
      .from("employees")
      .update({ [field]: !currentValue })
      .eq("id", id);

    if (error) {
      console.error(`Erreur lors de la mise à jour de ${field} pour l'employé ${id} :`, error.message);
      return;
    }

    setEmployees((prev) =>
      prev.map((emp) =>
        emp.id === id ? { ...emp, [field]: !currentValue } : emp
      )
    );
  };

  const getGradeClass = (grade: string): string => {
    switch (grade) {
      case "Patron":
      case "Co-Patron":
        return "bg-red-700/50 text-red-400";
      case "Responsable":
        return "bg-yellow-700/50 text-yellow-400";
      case "CDI":
        return "bg-blue-700/50 text-blue-400";
      case "CDD":
        return "bg-cyan-700/50 text-cyan-400";
      default:
        return "bg-gray-700 text-gray-100";
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  if (loading) {
    return <div className="text-center text-white">Chargement des données...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Options Utilisateurs</h1>

      <table className="w-full text-center border-collapse rounded-lg overflow-hidden shadow-lg">
        <thead className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
          <tr>
            <th className="p-4 text-sm font-semibold uppercase">Grade</th>
            <th className="p-4 text-sm font-semibold uppercase">Nom</th>
            <th className="p-4 text-sm font-semibold uppercase">Congés</th>
            <th className="p-4 text-sm font-semibold uppercase">Avertissement 1</th>
            <th className="p-4 text-sm font-semibold uppercase">Avertissement 2</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((record, index) => (
            <tr
              key={record.id}
              className={index % 2 === 0 ? "bg-gray-800/50" : "bg-gray-800"}
            >
              <td className={`p-4 font-medium ${getGradeClass(record.grade)}`}>
                {record.grade}
              </td>
              <td className="p-4 text-gray-200">
                {record.first_name} {record.last_name}
              </td>
              <td className="p-4">
                <label className="flex items-center justify-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="hidden"
                    checked={record.holidays}
                    onChange={() => toggleSwitch(record.id, "holidays", record.holidays)}
                  />
                  <div
                    className={`w-12 h-6 rounded-full p-1 transition bg-gray-700 ${
                      record.holidays
                        ? "bg-gradient-to-r from-blue-500 to-blue-700"
                        : "bg-gray-700"
                    }`}
                  >
                    <div
                      className={`w-4 h-4 bg-white rounded-full shadow-md transform transition ${
                        record.holidays ? "translate-x-6" : ""
                      }`}
                    />
                  </div>
                </label>
              </td>
              <td className="p-4">
                <label className="flex items-center justify-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="hidden"
                    checked={record.warning1}
                    onChange={() => toggleSwitch(record.id, "warning1", record.warning1)}
                  />
                  <div
                    className={`w-12 h-6 rounded-full p-1 transition ${
                      record.warning1
                        ? "bg-gradient-to-r from-yellow-500 to-yellow-700"
                        : "bg-gray-700"
                    }`}
                  >
                    <div
                      className={`w-4 h-4 bg-white rounded-full shadow-md transform transition ${
                        record.warning1 ? "translate-x-6" : ""
                      }`}
                    />
                  </div>
                </label>
              </td>
              <td className="p-4">
                <label className="flex items-center justify-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="hidden"
                    checked={record.warning2}
                    onChange={() => toggleSwitch(record.id, "warning2", record.warning2)}
                  />
                  <div
                    className={`w-12 h-6 rounded-full p-1 transition ${
                      record.warning2
                        ? "bg-gradient-to-r from-red-500 to-red-700"
                        : "bg-gray-700"
                    }`}
                  >
                    <div
                      className={`w-4 h-4 bg-white rounded-full shadow-md transform transition ${
                        record.warning2 ? "translate-x-6" : ""
                      }`}
                    />
                  </div>
                </label>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminUsersOptions;
