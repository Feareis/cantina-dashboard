import React, { useState, useEffect } from "react";
import { supabase } from "../../api/supabaseClient";
import { Trash } from "lucide-react";

type SalesLog = {
  id: string;
  employee_id: string;
  employee_name?: string;
  type: string;
  sale_type: string;
  employee_share: number;
  company_share: number;
  date: string;
};

const AdminLogs: React.FC = () => {
  const [logs, setLogs] = useState<SalesLog[]>([]);

  // Fetch logs and join with employee names
  const fetchLogs = async () => {
    const { data, error } = await supabase
      .from("sales_logs")
      .select(`
        id,
        employee_id,
        type,
        sale_type,
        employee_share,
        company_share,
        date,
        employees (first_name, last_name)
      `);

    if (error) {
      console.error("Erreur lors de la récupération des logs :", error.message);
      return;
    }

    const formattedLogs = (data || []).map((log: any) => ({
      id: log.id,
      employee_id: log.employee_id,
      employee_name: `${log.employees?.first_name || "Inconnu"} ${
        log.employees?.last_name || "Inconnu"
      }`,
      type: log.type,
      sale_type: log.sale_type,
      employee_share: log.employee_share,
      company_share: log.company_share,
      date: log.date,
    }));

    const sortedLogs = formattedLogs.sort((a, b) => {
      const dateComparison = new Date(a.date).getTime() - new Date(b.date).getTime();
      if (dateComparison !== 0) return dateComparison;

      return a.employee_name.localeCompare(b.employee_name);
    });

    setLogs(sortedLogs);
  };

  // Delete a log
  const deleteLog = async (id: string) => {
    const { error } = await supabase.from("sales_logs").delete().eq("id", id);

    if (error) {
      console.error("Erreur lors de la suppression :", error.message);
      return;
    }

    setLogs((prev) => prev.filter((log) => log.id !== id));
  };

  useEffect(() => {
    // Fetch initial logs
    fetchLogs();

    // Set up subscription
    const subscription = supabase
      .channel("realtime:sales_logs")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "sales_logs" },
        (payload) => {
          console.log("Changement détecté :", payload);

          if (payload.eventType === "INSERT") {
            const newLog = {
              id: payload.new.id,
              employee_id: payload.new.employee_id,
              employee_name: `${payload.new.employees?.first_name || "Inconnu"} ${
                payload.new.employees?.last_name || "Inconnu"
              }`,
              type: payload.new.type,
              sale_type: payload.new.sale_type,
              employee_share: payload.new.employee_share,
              company_share: payload.new.company_share,
              date: payload.new.date,
            };
            setLogs((prev) => [newLog, ...prev]);
          } else if (payload.eventType === "UPDATE") {
            setLogs((prev) =>
              prev.map((log) =>
                log.id === payload.new.id
                  ? { ...log, ...payload.new }
                  : log
              )
            );
          } else if (payload.eventType === "DELETE") {
            setLogs((prev) => prev.filter((log) => log.id !== payload.old.id));
          }
        }
      )
      .subscribe();

    // Cleanup subscription on component unmount
    return () => {
      supabase.removeChannel(subscription);
    };
  }, []);

  const getTypeColor = (type: string, saleType: string) => {
    if (type === "export" && saleType === "propre") return "text-green-500";
    if (type === "export" && saleType === "sale") return "text-red-500";
    if (type === "client" && saleType === "propre") return "text-green-500";
    if (type === "client" && saleType === "sale") return "text-red-500";
    return "text-gray-200";
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Logs des Ventes</h1>
      <table className="w-full text-center border-collapse rounded-lg overflow-hidden shadow-lg">
        <thead className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
          <tr>
            <th className="p-4 text-sm font-semibold uppercase">Date</th>
            <th className="p-4 text-sm font-semibold uppercase">Employé</th>
            <th className="p-4 text-sm font-semibold uppercase">Type</th>
            <th className="p-4 text-sm font-semibold uppercase">Type de Vente</th>
            <th className="p-4 text-sm font-semibold uppercase">Part Employé</th>
            <th className="p-4 text-sm font-semibold uppercase">Part Entreprise</th>
            <th className="p-4 text-sm font-semibold uppercase">Actions</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log, index) => (
            <tr
              key={log.id}
              className={index % 2 === 0 ? "bg-gray-800/50" : "bg-gray-800"}
            >
              <td className="p-4 text-gray-200">
                {new Date(log.date).toLocaleDateString("fr-FR")}
              </td>
              <td className="p-4 text-gray-200">{log.employee_name}</td>
              <td
                className={`p-4 font-semibold ${getTypeColor(log.type, log.sale_type)}`}
              >
                {log.type}
              </td>
              <td
                className={`p-4 font-semibold ${getTypeColor(log.type, log.sale_type)}`}
              >
                {log.sale_type}
              </td>
              <td
                className={`p-4 font-semibold ${
                  log.sale_type === "propre" ? "text-green-400" : "text-red-500"
                }`}
              >
                {log.employee_share.toLocaleString()} $
              </td>
              <td
                className={`p-4 font-semibold ${
                  log.sale_type === "propre" ? "text-blue-400" : "text-orange-400"
                }`}
              >
                {log.company_share.toLocaleString()} $
              </td>
              <td className="p-4 flex justify-center gap-4">
                {/* Icone pour supprimer */}
                <button
                  onClick={() => deleteLog(log.id)}
                  className="p-2 rounded-full bg-red-500/20 hover:bg-red-500/50"
                  title="Supprimer le log"
                >
                  <Trash className="w-5 h-5 text-red-500" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminLogs;
