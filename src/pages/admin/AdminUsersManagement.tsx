import React, { useState, useEffect } from "react";
import { supabase } from "../../api/supabaseClient";

type User = {
  id: string;
  username: string;
  password: string; // Mot de passe en clair
  role: string;
  is_active: boolean;
};

const AdminUsersManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  const fetchUsers = async () => {
    const { data, error } = await supabase.from("users").select("*");
    if (error) {
      console.error("Erreur lors de la récupération des utilisateurs :", error.message);
    } else {
      const rolePriority = { admin: 1, limited_admin: 2, user: 3 };

      const sortedUsers = (data || []).sort(
        (a, b) => rolePriority[a.role] - rolePriority[b.role]
      );

      setUsers(sortedUsers);
    }
  };

  const toggleUserAccess = async (userId: string, newStatus: boolean) => {
    const { error } = await supabase
      .from("users")
      .update({ is_active: newStatus })
      .eq("id", userId);

    if (error) {
      console.error("Erreur lors de la mise à jour de l'accès :", error.message);
      return;
    }

    fetchUsers(); // Recharger la liste après modification
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Gestion des Utilisateurs</h1>
      <table className="w-full text-center">
        <thead>
          <tr className="bg-gray-800 text-white">
            <th className="border border-gray-400 p-2">Rôle</th>
            <th className="border border-gray-400 p-2">Nom d'utilisateur</th>
            <th className="border border-gray-400 p-2">Mot de passe</th>
            <th className="border border-gray-400 p-2">État</th>
            <th className="border border-gray-400 p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className="border border-gray-600 p-2">{user.role}</td>
              <td className="border border-gray-600 p-2">{user.username}</td>
              <td className="border border-gray-600 p-2">{user.password}</td>
              <td className="border border-gray-600 p-2">
                {user.is_active ? "Actif" : "Inactif"}
              </td>
              <td className="border border-gray-600 p-2">
                {user.role === "admin" ? (
                  <span className="text-gray-400">Non modifiable</span>
                ) : (
                  <button
                    className={`px-4 py-2 rounded ${
                      user.is_active ? "bg-red-500 text-white" : "bg-green-500 text-white"
                    }`}
                    onClick={() => toggleUserAccess(user.id, !user.is_active)}
                  >
                    {user.is_active ? "Désactiver" : "Activer"}
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminUsersManagement;
