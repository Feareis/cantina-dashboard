import React, { useEffect, useState } from "react";
import { supabase } from "../../api/supabaseClient";
import JSZip from "jszip";
import { saveAs } from "file-saver";

type Employee = {
  id: string;
  grade: string;
  first_name: string;
  last_name: string;
  vcp: number;
  vcs: number;
  vep: number;
  ves: number;
  quota: boolean;
  quota_plus: boolean;
  holidays: boolean;
  warning1: boolean;
  warning2: boolean;
};

type WeeklyPast = {
  employee_id: string;
  grade: string;
  first_name: string;
  last_name: string;
  employee_prime: number;
  employee_taxe: number;
};

const AdminRebootCompta: React.FC = () => {
  const [weeklyPast, setWeeklyPast] = useState<WeeklyPast[]>([]);
  const [loading, setLoading] = useState(false);
  const gradeOrder = ["Patron", "Co-Patron", "Responsable", "CDI", "CDD"];

  const fetchWeeklyPast = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.from("weekly_past").select("employee_id, grade, first_name, last_name, employee_prime, employee_taxe");

      if (error) {
        console.error("Erreur lors de la récupération de weekly_past :", error.message);
        return;
      }

      const sortedData = (data || []).sort((a, b) => {
        const gradeComparison =
          gradeOrder.indexOf(a.grade) - gradeOrder.indexOf(b.grade);
        if (gradeComparison !== 0) {
          return gradeComparison; // Trier par grade
        }
        return a.first_name.localeCompare(b.first_name); // Sinon trier par prénom
      });

      setWeeklyPast(sortedData);
    } catch (error) {
        if (error instanceof Error) {
          console.error("Erreur inattendue :", error.message);
          alert(`Une erreur s'est produite : ${error.message}`);
        } else {
          console.error("Erreur inattendue :", error);
          alert("Une erreur inconnue s'est produite.");
        }
    } finally {
      setLoading(false);
    }
  };

  const deleteAllLogs = async () => {
    const { data: logs, error: fetchError } = await supabase
      .from('sales_logs')
      .select('id');

    if (fetchError) {
      console.error('Erreur lors de la récupération des logs :', fetchError.message);
      return;
    }

    if (logs && logs.length > 0) {
      for (const log of logs) {
        const { error } = await supabase
          .from('sales_logs')
          .delete()
          .eq('id', log.id);

        if (error) {
          console.error(`Erreur lors de la suppression du log ${log.id} :`, error.message);
          return;
        }
      }

      console.log('Tous les logs ont été supprimés');
    } else {
      console.log('Aucun log à supprimer');
    }
  };

  const getCurrentWeekDate = (): string => {
    const today = new Date();

    // Si nous sommes dimanche (day = 0), ajuster pour inclure dans la semaine précédente
    if (today.getDay() === 0) {
      today.setDate(today.getDate() - 1); // Reculer d'un jour pour revenir au samedi
    }

    // Obtenir le lundi de la semaine
    const startOfWeek = new Date(today);
    startOfWeek.setDate(startOfWeek.getDate() - (startOfWeek.getDay() - 1)); // Reculer au lundi (day = 1)

    // Obtenir le dimanche de la semaine
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6); // Avancer de 6 jours pour atteindre dimanche

    // Fonction pour formater la date (ex : 13/01/25)
    const format = (date: Date): string =>
      `${date.getDate().toString().padStart(2, "0")}/${(date.getMonth() + 1)
        .toString()
        .padStart(2, "0")}/${date.getFullYear()}`;

    return `${format(startOfWeek)} - ${format(endOfWeek)}`;
  };

  const createArchive = async (
    employees: any[],
    salesLogs: any[],
    archiveData: any[],
    currentWeekDate: string
  ): Promise<{ zipBlob: Blob; archiveName: string }> => {
    const zip = new JSZip();

    // Ajouter les données au fichier zip
    zip.file("employees.json", JSON.stringify(employees, null, 2));
    zip.file("sales_logs.json", JSON.stringify(salesLogs, null, 2));
    zip.file("data.json", JSON.stringify(archiveData, null, 2));

    // Générer le fichier zip
    const zipBlob = await zip.generateAsync({ type: "blob" });
    const archiveName = `archive_${currentWeekDate}.zip`;

    return { zipBlob, archiveName };
  };

  const handleRebootCompta = async () => {
    setLoading(true);
    try {
      const { data: employees, error: employeesError } = await supabase.from("employees").select("*");
      const { data: salesLogs, error: salesLogsError } = await supabase.from("sales_logs").select("*");
      const { data: archiveData, error: archiveDataError } = await supabase.from("data").select("*");

      console.log("Employees :", employees);
      console.log("Sales Logs :", salesLogs);
      console.log("Archive Data :", archiveData);

      // Vérification des erreurs
      if (employeesError) throw new Error("Erreur lors de la récupération des employés.");
      if (salesLogsError) throw new Error("Erreur lors de la récupération des logs.");
      if (archiveDataError) throw new Error("Erreur lors de la récupération des données d'archive.");

      if (!employees || !salesLogs || !archiveData) {
        throw new Error("Impossible de récupérer toutes les données nécessaires.");
      }


      // Étape 1 : Récupérer les données nécessaires pour le calcul
      const { data: rates } = await supabase.from("data").select("*");
      if (!rates) throw new Error("Impossible de récupérer les taux pour le calcul.");

      const tred: Partial<Record<Employee["grade"], number>> = {
        Responsable: parseFloat(rates?.find((rate) => rate.key === "tred_responsable")?.value || "0"),
        CDI: parseFloat(rates?.find((rate) => rate.key === "tred_cdi")?.value || "0"),
        CDD: parseFloat(rates?.find((rate) => rate.key === "tred_cdd")?.value || "0"),
      };
      const quotaValue = parseFloat(rates?.find((r) => r.key === "quota_value")?.value || "0");
      const quotaPlusValue = parseFloat(rates?.find((r) => r.key === "quotaplus_value")?.value || "0");
      const trevVc = parseFloat(rates?.find((r) => r.key === "trev_vc")?.value || "0");
      const trevVe = parseFloat(rates?.find((r) => r.key === "trev_ve")?.value || "0");


      // Étape 2 : Préparer les mises à jour pour weekly_past
      const updates = employees.map((employee) => {
        const gradeRate = tred[employee.grade as keyof typeof tred] || 0;

        // Calcul de la prime
        const primeBase = employee.quota
          ? (employee.vcp + employee.vep) * gradeRate + quotaValue
          : 0;
        const employee_prime = employee.quota_plus
          ? primeBase + quotaPlusValue
          : primeBase;

        const employee_taxe = employee.vcs * trevVc + employee.ves * trevVe;

        return {
          employee_id: employee.id,
          grade: employee.grade,
          first_name: employee.first_name,
          last_name: employee.last_name,
          employee_prime: Math.round(employee_prime),
          employee_taxe: Math.round(employee_taxe),
        };
      });


      // Étape 3 : Mettre à jour les données dans weekly_past
      for (const update of updates) {
        const { error } = await supabase
          .from("weekly_past")
          .update({
            employee_prime: update.employee_prime,
            employee_taxe: update.employee_taxe,
          })
          .eq("employee_id", update.employee_id);

        if (error) {
          console.error(
            `Erreur lors de la mise à jour de l'employé ${update.employee_id} :`,
            error.message
          );
          throw new Error(`Échec de la mise à jour pour l'employé ${update.employee_id}`);
        }
      }


      // Étape 4 : Créer l'archive
      const currentWeekDate = getCurrentWeekDate();
      const { zipBlob, archiveName } = await createArchive(employees, salesLogs, archiveData, currentWeekDate);
      const downloadLink = URL.createObjectURL(zipBlob);
      const { error: archiveSaveError } = await supabase
        .from("archives")
        .insert([{ week_date: currentWeekDate, archive_name: archiveName, download_link: downloadLink }]);

      if (archiveSaveError) {
        throw new Error("Erreur lors de la sauvegarde de l'archive.");
      }

      saveAs(zipBlob, archiveName);


      // Étape 5 : Supprimer toutes les lignes de sales_logs
      deleteAllLogs();


      // Étape 6 : Reset les quotas / quotas+
      const { error: resetError } = await supabase
        .from("employees")
        .update({ quota: false, quota_plus: false });

      if (resetError) {
        console.error("Erreur lors de la réinitialisation des quotas :", resetError.message);
        throw new Error("Échec de la réinitialisation des quotas.");
      }


      // Étape 7 : Rafraîchir les données
      alert("Reboot comptabilité effectué avec succès !");
      fetchWeeklyPast();
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
    fetchWeeklyPast();

    const subscription = supabase
      .channel("weekly_past_changes")
      .on("postgres_changes", { event: "*", schema: "public", table: "weekly_past" }, (_) => {
          fetchWeeklyPast();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Reboot Comptabilité</h1>

      <div className="flex justify-end items-center p-2 rounded-md mb-8">
        <button
          className="bg-red-600/70 hover:bg-red-700 text-white text-2xl font-bold py-2 px-4 rounded transition-transform duration-200 hover:scale-105"
          onClick={handleRebootCompta}
          disabled={loading}
        >
          {loading ? "Reboot en cours..." : "Reboot comptabilité"}
        </button>
      </div>

      <table className="w-full text-center border-collapse rounded-lg overflow-hidden shadow-lg">
        <thead className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
          <tr>
            <th className="p-4 text-sm font-semibold uppercase">Grade</th>
            <th className="p-4 text-sm font-semibold uppercase">Nom</th>
            <th className="p-4 text-sm font-semibold uppercase">Prime</th>
            <th className="p-4 text-sm font-semibold uppercase">Taxe</th>
          </tr>
        </thead>
        <tbody>
          {weeklyPast.map((record, index) => (
            <tr
              key={record.employee_id}
              className={index % 2 === 0 ? "bg-gray-800/50" : "bg-gray-800"}
            >
              <td className={`p-4 font-medium ${getGradeClass(record.grade)}`}>
                {record.grade}
              </td>
              <td className="p-4 text-gray-200">
                {record.first_name} {record.last_name}
              </td>
              <td className="p-4 text-green-500 font-semibold">
                {record.employee_prime.toLocaleString()} $
              </td>
              <td className="p-4 text-red-500 font-semibold">
                {record.employee_taxe.toLocaleString()} $
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminRebootCompta;
