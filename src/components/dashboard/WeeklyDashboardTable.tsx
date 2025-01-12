// WeeklyDashboardTable.tsx
// This component fetches and displays employee data in a dashboard table format, including real-time updates from Supabase.

import React, { useEffect, useState } from "react";
import { CheckCircle, XCircle } from "lucide-react";
import { supabase } from "../../api/supabaseClient";
import { useAuth } from "../../api/AuthContext";

// Employee interface definition
interface Employee {
  id: string;
  first_name: string;
  last_name: string;
  phone: string;
  grade: "Patron" | "Co-Patron" | "Responsable" | "CDI" | "CDD";
  hire_date: string;
  vcp: number; // Sales to customers (clean)
  vcs: number; // Sales to customers (dirty)
  vep: number; // Export sales (clean)
  ves: number; // Export sales (dirty)
  quota: boolean;
  quota_plus: boolean;
  prime?: number;
  taxe?: number;
}

const WeeklyDashboardTable: React.FC = () => {
  const { user } = useAuth();
  const [employeeData, setEmployeeData] = useState<Employee[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Helper for role priority sorting
  const rolePriority: Record<Employee["grade"], number> = {
    Patron: 0,
    "Co-Patron": 0,
    Responsable: 1,
    CDI: 2,
    CDD: 3,
  };

  // Parse numeric values safely
  const parseNumericValue = (value: string | null | undefined): number => {
    return value ? parseFloat(value) || 0 : 0;
  };

  // Fetch employee and rate data from Supabase
  const fetchEmployees = async () => {
    setLoading(true);
    try {
      // Fetch employee data
      const { data: employees, error: employeeError } = await supabase
        .from("employees")
        .select("*");
      if (employeeError) throw employeeError;

      // Fetch rate data
      const { data: rates, error: rateError } = await supabase.from("data").select("*");
      if (rateError) throw rateError;

      // Extract rates for calculations
      const tred = {
        Responsable: parseNumericValue(rates?.find((r) => r.key === "tred_responsable")?.value),
        CDI: parseNumericValue(rates?.find((r) => r.key === "tred_cdi")?.value),
        CDD: parseNumericValue(rates?.find((r) => r.key === "tred_cdd")?.value),
      };
      const quotaValue = parseNumericValue(rates?.find((r) => r.key === "quota_value")?.value);
      const quotaPlusValue = parseNumericValue(rates?.find((r) => r.key === "quotaplus_value")?.value);
      const trevVc = parseNumericValue(rates?.find((r) => r.key === "trev_vc")?.value);
      const trevVe = parseNumericValue(rates?.find((r) => r.key === "trev_ve")?.value);

      // Calculate primes and taxes for employees
      const calculatedData = employees.map((employee) => {
        const gradeRate = tred[employee.grade] || 0;
        const primeBase = employee.quota ? (employee.vcp + employee.vep) * gradeRate + quotaValue : 0;
        const prime = employee.quota_plus ? primeBase + quotaPlusValue : primeBase;
        const taxe = employee.vcs * trevVc + employee.ves * trevVe;
        return { ...employee, prime, taxe };
      });

      // Sort and filter employees
      const sortedData = calculatedData
        .filter((e) => e.grade !== "Patron" && e.grade !== "Co-Patron")
        .sort((a, b) => rolePriority[a.grade] - rolePriority[b.grade]);

      setEmployeeData(sortedData);
    } catch (error) {
      console.error("Error fetching employee data:", error);
    } finally {
      setLoading(false);
    }
  };

  const loggedInFirstName = user?.firstName || "Inconnu";
  const loggedInLastName = user?.lastName || "Inconnu";

  useEffect(() => {
    // Récupérer les employés au premier chargement
    fetchEmployees();

    // Écouter les changements en temps réel sur sales_logs
    const salesLogsSubscription = supabase
      .channel("sales_logs_changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "sales_logs" },
        (payload) => {
          console.log("Changement détecté dans sales_logs :", payload);
          fetchEmployees(); // Actualiser les employés
        }
      )
      .subscribe();

    // Écouter les changements en temps réel sur employees
    const employeesSubscription = supabase
      .channel("employees_changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "employees" },
        (payload) => {
          console.log("Changement détecté dans employees :", payload);
          fetchEmployees(); // Actualiser les employés
        }
      )
      .subscribe();

    // Nettoyer les abonnements lors du démontage
    return () => {
      supabase.removeChannel(salesLogsSubscription);
      supabase.removeChannel(employeesSubscription);
    };
  }, []);

  // Format numbers as currency
  const formatCurrency = (value: number): string => {
    return `$ ${value.toLocaleString("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })}`;
  };

  // Config for grade styles
  const gradeStyles: Record<string, string> = {
    Responsable: "bg-yellow-700 text-yellow-100",
    CDI: "bg-blue-700 text-blue-100",
    CDD: "bg-cyan-700 text-cyan-100",
  };

  if (loading) return <div className="text-center text-white">Loading data...</div>;

  const headerStyle = "border flex-1 px-4 py-2 font-bold h-16 flex items-center justify-center rounded-lg shadow-2xl";
  const headerGreen = `${headerStyle} bg-green-900`;
  const headerGray = `${headerStyle} bg-gray-900`;
  const headerRed = `${headerStyle} bg-red-900`;

  return (
    <div className="overflow-x-auto rounded-lg mt-4">
      {/* Table Header */}
      <div className="flex flex-wrap items-stretch justify-between text-white text-center text-lg space-x-2 p-2">
        <div className={headerGray}>Poste</div>
        <div className={headerGray}>Nom</div>
        <div className={headerGreen}>Vente Client</div>
        <div className={headerRed}>Vente Client</div>
        <div className={headerGreen}>Vente Export</div>
        <div className={headerRed}>Vente Export</div>
        <div className={headerGray}>Quota</div>
        <div className={headerGray}>Quota+</div>
        <div className={headerGreen}>Prime</div>
        <div className={headerRed}>Taxe</div>
      </div>

      {/* Table Rows */}
      {employeeData.map((employee, index) => {
        const isLoggedInUser =
          employee.first_name === loggedInFirstName && employee.last_name === loggedInLastName;

        return (
          <div
            key={index}
            className={`flex flex-wrap items-center justify-between text-lg border-b border-gray-600 text-center p-2 ${
              isLoggedInUser ? "bg-gray-700/30" : ""
            }`}
          >
            <div
              className={`rounded-lg font-bold border-r border-gray-800 flex-1 px-4 py-2 ${
                employee.grade === "Responsable"
                  ? "bg-yellow-700 text-yellow-100"
                  : employee.grade === "CDI"
                  ? "bg-blue-700 text-blue-100"
                  : employee.grade === "CDD"
                  ? "bg-cyan-700 text-cyan-100"
                  : ""
              }`}
            >
              {employee.grade}
            </div>

            <div className="font-bold text-gray-400 border-r border-gray-600 flex-1 px-4 py-2">
              {employee.first_name}
              <p className="text-xs text-gray-600">{`${employee.first_name} ${employee.last_name}`}</p>
            </div>

            <div className="font-bold text-green-700 border-x border-gray-800 flex-1 px-4 py-2">
              {formatCurrency(employee.vcp)}
            </div>

            <div className="font-bold text-red-700 border-x border-gray-800 flex-1 px-4 py-2">
              {formatCurrency(employee.vcs)}
            </div>

            <div className="font-bold text-green-700 border-x border-gray-800 flex-1 px-4 py-2">
              {formatCurrency(employee.vep)}
            </div>

            <div className="font-bold text-red-700 border-r border-gray-600 flex-1 px-4 py-2">
              {formatCurrency(employee.ves)}
            </div>

            <div className="flex-1 px-4 py-2 border-x border-gray-800 flex justify-center items-center">
              {employee.quota ? (
                <CheckCircle className="text-center text-green-600" size={20} />
              ) : (
                <XCircle className="text-red-600" size={20} />
              )}
            </div>

            <div className="flex-1 px-4 py-2 border-r border-gray-600 flex justify-center items-center">
              {employee.quota_plus ? (
                <CheckCircle className="text-green-600" size={20} />
              ) : (
                <XCircle className="text-red-600" size={20} />
              )}
            </div>

            <div className="font-bold text-green-600 border-x border-gray-800 flex-1 px-4 py-2">
              {formatCurrency(employee.prime)}
            </div>

            <div className="font-bold text-red-600 border-l border-gray-800 flex-1 px-4 py-2">
              {formatCurrency(employee.taxe)}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default WeeklyDashboardTable;
