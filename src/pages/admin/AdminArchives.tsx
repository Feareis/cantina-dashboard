import React, { useEffect, useState } from "react";
import { Trash, FolderDown } from "lucide-react";
import { supabase } from "../../api/supabaseClient";

const AdminArchives: React.FC = () => {
  const [archives, setArchives] = useState<
    { id: number; weekDate: string; archiveName: string; downloadLink: string }[]
  >([]);

  // Charger les archives depuis Supabase
  const fetchArchives = async () => {
    const { data, error } = await supabase.from("archives").select("*");
    if (error) {
      console.error("Erreur lors de la récupération des archives :", error.message);
      return;
    }

    setArchives(
      data.map((archive) => ({
        id: archive.id,
        weekDate: archive.week_date,
        archiveName: archive.archive_name,
        downloadLink: archive.download_link,
      }))
    );
  };

  // Supprimer une archive
  const deleteArchive = async (archiveId: number) => {
    const { error } = await supabase.from("archives").delete().eq("id", archiveId);
    if (error) {
      console.error("Erreur lors de la suppression de l'archive :", error.message);
      return;
    }
    setArchives((prev) => prev.filter((archive) => archive.id !== archiveId));
  };

  useEffect(() => {
    fetchArchives();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Archives Comptabilité</h1>
      <div className="space-y-4">
        {archives.map((archive) => (
          <div key={archive.id} className="bg-gray-800 text-white p-4 rounded-md shadow-lg flex justify-between items-center">
            <div>
              <p className="font-bold text-lg">Date Semaine : {archive.weekDate}</p>
            </div>
            <div className="flex items-center space-x-4">
              {/* Icône de téléchargement */}
              <a
                href={archive.downloadLink}
                download={archive.archiveName}
                className="text-green-500 hover:text-green-700 transition-transform duration-200 transform hover:scale-110"
              >
                <FolderDown className="w-6 h-6" />
              </a>

              {/* Icône de suppression */}
              <button
                className="text-red-500 hover:text-red-700 transition-transform duration-200 transform hover:scale-110"
                onClick={() => deleteArchive(archive.id)}
              >
                <Trash className="w-6 h-6" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminArchives;
