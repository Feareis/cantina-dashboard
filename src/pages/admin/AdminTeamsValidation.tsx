import React, { useState, useEffect } from "react";
import { supabase } from "../../api/supabaseClient";

type Employee = {
  id: string;
  first_name: string;
  last_name: string;
  grade: string;
  quota: boolean;
  quota_plus: boolean;
};

const EmployeeTable: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const gradeOrder = ["Patron", "Co-Patron", "Responsable", "CDI", "CDD"];

  const fetchEmployees = async () => {
    const { data, error } = await supabase
      .from("employees")
      .select("id, first_name, last_name, grade, quota, quota_plus");
    if (error) {
      console.error("Erreur lors de la récupération des employés :", error.message);
      return;
    }
    setEmployees(data || []);
  };

  const toggleSwitch = async (
    id: string,
    field: "quota" | "quota_plus",
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

  const sortEmployeesByGrade = (employees: Employee[]) => {
    return [...employees].sort(
      (a, b) => gradeOrder.indexOf(a.grade) - gradeOrder.indexOf(b.grade)
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

  const sortedEmployees = sortEmployeesByGrade(employees);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Gestion des Quotas</h1>
      <table className="w-full text-center border-collapse rounded-lg overflow-hidden shadow-lg">
        <thead className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
          <tr>
            <th className="p-4 text-sm font-semibold uppercase">Grade</th>
            <th className="p-4 text-sm font-semibold uppercase">Nom</th>
            <th className="p-4 text-sm font-semibold uppercase">Quota</th>
            <th className="p-4 text-sm font-semibold uppercase">Quota Plus</th>
          </tr>
        </thead>
        <tbody>
          {sortedEmployees.map((employee, index) => (
            <tr
              key={employee.id}
              className={index % 2 === 0 ? "bg-gray-800/50" : "bg-gray-800"}
            >
              <td className={`p-4 font-medium ${getGradeClass(employee.grade)}`}>
                {employee.grade}
              </td>
              <td className="p-4 text-gray-200">
                {employee.first_name} {employee.last_name}
              </td>
              <td className="p-4">
                <label
                  className={`flex items-center justify-center ${
                    ["Patron", "Co-Patron"].includes(employee.grade) ? "cursor-not-allowed" : "cursor-pointer"
                  }`}
                >
                  <input
                    type="checkbox"
                    className="hidden"
                    checked={employee.quota}
                    onChange={() =>
                      !["Patron", "Co-Patron"].includes(employee.grade) &&
                      toggleSwitch(employee.id, "quota", employee.quota)
                    }
                    disabled={["Patron", "Co-Patron"].includes(employee.grade)}
                  />
                  <div
                    className={`w-12 h-6 rounded-full p-1 transition bg-gray-700 ${
                      employee.quota
                        ? "bg-gradient-to-r from-blue-500 to-blue-700"
                        : "bg-gray-700"
                    }`}
                  >
                    <div
                      className={`w-4 h-4 bg-white rounded-full shadow-md transform transition ${
                        employee.quota ? "translate-x-6" : ""
                      }`}
                    />
                  </div>
                </label>
              </td>
              <td className="p-4">
                <label
                  className={`flex items-center justify-center ${
                    ["Patron", "Co-Patron"].includes(employee.grade) ? "cursor-not-allowed" : "cursor-pointer"
                  }`}
                >
                  <input
                    type="checkbox"
                    className="hidden"
                    checked={employee.quota_plus}
                    onChange={() =>
                      !["Patron", "Co-Patron"].includes(employee.grade) &&
                      toggleSwitch(employee.id, "quota_plus", employee.quota_plus)
                    }
                    disabled={["Patron", "Co-Patron"].includes(employee.grade)}
                  />
                  <div
                    className={`w-12 h-6 rounded-full p-1 transition bg-gray-700 ${
                      employee.quota_plus
                        ? "bg-gradient-to-r from-purple-500 to-purple-700"
                        : "bg-gray-700"
                    }`}
                  >
                    <div
                      className={`w-4 h-4 bg-white rounded-full shadow-md transform transition ${
                        employee.quota_plus ? "translate-x-6" : ""
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

export default EmployeeTable;
