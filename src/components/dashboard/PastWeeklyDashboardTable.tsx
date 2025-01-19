// PastWeeklyDashboardTable.tsx
// This component fetches and displays past weekly data from the "weekly_past" table.

import React, { useEffect, useState } from "react";
import { CheckCircle, XCircle } from "lucide-react";
import { supabase } from "../../api/supabaseClient";
import { useAuth } from "../../api/AuthContext";

interface PastWeeklyData {
  id: string;
  employee_id: string;
  grade: string;
  first_name: string;
  last_name: string;
  employee_prime: number;
  employee_taxe: number;
  holidays: boolean;
  warning1: boolean;
  warning2: boolean;
}

const PastWeeklyDashboardTable: React.FC = () => {
  const { user } = useAuth();
  const [pastData, setPastData] = useState<PastWeeklyData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const loggedInFirstName = user?.firstName || "Inconnu";
  const loggedInLastName = user?.lastName || "Inconnu";

  const rolePriority: { [key: string]: number } = {
    Patron: 0,
    "Co-Patron": 0,
    Responsable: 1,
    CDI: 2,
    CDD: 3,
  };

  // Fetch data from weekly_past table
  const fetchWeeklyPast = async () => {
    try {
      const { data, error } = await supabase
        .from("weekly_past")
        .select("id, employee_id, grade, first_name, last_name, employee_prime, employee_taxe");

      if (error) {
        console.error("Erreur lors de la récupération des données de weekly_past :", error.message);
        return [];
      }

      return data || [];
    } catch (error) {
      console.error("Erreur inconnue lors de la récupération de weekly_past :", error);
      return [];
    }
  };

  // Fetch data from employees table
  const fetchEmployees = async () => {
    try {
      const { data, error } = await supabase
        .from("employees")
        .select("id, holidays, warning1, warning2");

      if (error) {
        console.error("Erreur lors de la récupération des données d'employees :", error.message);
        return [];
      }

      return data || [];
    } catch (error) {
      console.error("Erreur inconnue lors de la récupération d'employees :", error);
      return [];
    }
  };

  // Combine data from both tables
  const fetchPastData = async () => {
    setLoading(true);
    try {
      const [weeklyPastData, employeesData] = await Promise.all([
        fetchWeeklyPast(),
        fetchEmployees(),
      ]);

      const combinedData = weeklyPastData.map((past) => {
        const employee = employeesData.find((e) => e.id === past.employee_id);
        return {
          ...past,
          holidays: employee?.holidays || false,
          warning1: employee?.warning1 || false,
          warning2: employee?.warning2 || false,
        };
      });

      const filteredData = combinedData
        .filter((employee) => employee.grade !== "Patron" && employee.grade !== "Co-Patron")
        .sort((a, b) => {
          const isUserA = a.first_name === loggedInFirstName && a.last_name === loggedInLastName;
          const isUserB = b.first_name === loggedInFirstName && b.last_name === loggedInLastName;

          if (isUserA && !isUserB) return -1; // L'utilisateur connecté passe avant
          if (!isUserA && isUserB) return 1;  // Les autres suivent

          const gradeComparison = rolePriority[a.grade] - rolePriority[b.grade];
          if (gradeComparison !== 0) return gradeComparison;

          const nameA = `${a.first_name} ${a.last_name}`.toLowerCase();
          const nameB = `${b.first_name} ${b.last_name}`.toLowerCase();
          return nameA.localeCompare(nameB);
        });

      setPastData(filteredData);
    } catch (error) {
      console.error("Erreur lors de la récupération des données combinées :", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPastData();
  }, []);

  const formatCurrency = (value: number): string => {
    return `${value.toLocaleString("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })} $`;
  };

  if (loading) return <div className="text-center text-white">Loading data...</div>;

  const headerStyle = "border flex-1 px-4 py-2 font-bold h-16 flex items-center justify-center rounded-lg shadow-2xl";
  const headerGray = `${headerStyle} bg-gray-900`;
  const headerGreen = `${headerStyle} bg-green-900`;
  const headerRed = `${headerStyle} bg-red-900`;
  const headerBlue = `${headerStyle} bg-blue-900`;
  const headerYellow = `${headerStyle} bg-yellow-700`;
  const headerOrange = `${headerStyle} bg-orange-800`;

  return (
    <div className="overflow-x-auto rounded-lg mt-4">
      {/* Table Header */}
      <div className="flex flex-wrap items-stretch justify-between text-white text-center text-lg space-x-2 p-2 mb-2">
        <div className={headerGray}>Poste</div>
        <div className={headerGray}>Nom</div>
        <div className={headerGreen}>Prime</div>
        <div className={headerRed}>Taxe</div>
        <div className={headerBlue}>Congés</div>
        <div className={headerYellow}>Averto 1</div>
        <div className={headerOrange}>Averto 2</div>
      </div>

      {/* Table Rows */}
      {pastData.map((data, index) => {
        const isLoggedInUser =
          data.first_name === loggedInFirstName && data.last_name === loggedInLastName;

        return (
          <div
            key={index}
            className={`flex flex-wrap items-center justify-between text-lg border-b border-gray-600 text-center p-2 ${
              isLoggedInUser ? "bg-gray-700/30 rounded-lg" : ""
            }`}
          >
            <div
              className={`rounded-lg font-bold border-r border-gray-800 flex-1 px-4 py-2 ${
                data.grade === "Responsable"
                  ? "bg-yellow-700 text-yellow-100"
                  : data.grade === "CDI"
                  ? "bg-blue-700 text-blue-100"
                  : data.grade === "CDD"
                  ? "bg-cyan-700 text-cyan-100"
                  : ""
              }`}
            >
              {data.grade}
            </div>
            <div className="font-bold text-gray-400 border-r border-gray-600 flex-1 px-4 py-2">
              {data.first_name}
              <p className="text-xs text-gray-600">{`${data.first_name} ${data.last_name}`}</p>
            </div>
          <div className="flex-1 px-4 py-2 font-bold text-green-500 border-r border-gray-700">
            {formatCurrency(data.employee_prime)}
          </div>
          <div className="flex-1 px-4 py-2 font-bold text-red-500 border-r border-gray-700">
            {formatCurrency(data.employee_taxe)}
          </div>
          <div className="flex-1 px-4 py-2 border-r border-gray-700 flex justify-center items-center">
            {data.holidays ? (
              <CheckCircle className="text-center text-blue-600" size={20} />
            ) : (
              <XCircle className="text-gray-600" size={20} />
            )}
          </div>
          <div className="flex-1 px-4 py-2 border-r border-gray-700 flex justify-center items-center">
            {data.warning1 ? (
              <CheckCircle className="text-center text-yellow-600" size={20} />
            ) : (
              <XCircle className="text-gray-600" size={20} />
            )}
          </div>
          <div className="flex-1 px-4 py-2 flex justify-center items-center">
            {data.warning2 ? (
              <CheckCircle className="text-center text-red-600" size={20} />
            ) : (
              <XCircle className="text-gray-600" size={20} />
            )}
          </div>
        </div>
        );
      })}
    </div>
  );
};

export default PastWeeklyDashboardTable;
