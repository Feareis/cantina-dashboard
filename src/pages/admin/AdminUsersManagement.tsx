import React, { useState, useEffect } from "react";
import { supabase } from "../../api/supabaseClient";
import CustomModal from "../../components/CustomModal";

type User = {
  id: string;
  username: string;
  password: string; // Mot de passe en clair
  role: string;
  is_active: boolean;
};

const AdminUsersManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [newPassword, setNewPassword] = useState("");

  const fetchUsers = async () => {
    const { data, error } = await supabase.from("users").select("*");
    if (error) {
      console.error("Erreur lors de la récupération des utilisateurs :", error.message);
    } else {
      const rolePriority: { [key: string]: number } = { admin: 1, limited_admin: 2, user: 3 };

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

  const updatePassword = async () => {
    if (!editingUser) return;

    if (!newPassword.trim()) {
      alert("Le mot de passe ne peut pas être vide.");
      return;
    }

    const { error } = await supabase
      .from("users")
      .update({ password: newPassword })
      .eq("id", editingUser.id);

    if (error) {
      console.error("Erreur lors de la mise à jour du mot de passe :", error.message);
      return;
    }

    alert("Mot de passe modifié avec succès !");
    setIsModalOpen(false);
    setNewPassword("");
    fetchUsers(); // Recharger la liste après modification
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const getRoleClass = (role: string): string => {
    switch (role) {
      case "admin":
        return "bg-red-700/50 text-red-400";
      case "limited_admin":
        return "bg-yellow-700/50 text-yellow-400";
      case "user":
        return "bg-blue-700/50 text-blue-400";
      default:
        return "bg-gray-700 text-gray-100";
    }
  };

  return (
    <div className="p-6 bg-gray-900 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-6">Gestion des Utilisateurs</h1>
      <table className="w-full text-center border-collapse rounded-lg overflow-hidden shadow-lg">
        <thead className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
          <tr>
            <th className="p-4 text-sm font-semibold uppercase">Rôle</th>
            <th className="p-4 text-sm font-semibold uppercase">Nom d'utilisateur</th>
            <th className="p-4 text-sm font-semibold uppercase">Mot de passe</th>
            <th className="p-4 text-sm font-semibold uppercase">État</th>
            <th className="p-4 text-sm font-semibold uppercase">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr
              key={user.id}
              className={index % 2 === 0 ? "bg-gray-800/50" : "bg-gray-800"}
            >
              <td className={`p-4 font-medium ${getRoleClass(user.role)}`}>
                {user.role}
              </td>
              <td className="p-4 text-gray-200">{user.username}</td>
              <td className="p-4 text-gray-200">{user.password}</td>
              <td className="p-4">
                {user.role === "admin" ? (
                  <span className="text-gray-400">.</span>
                ) : (
                  <label className="flex items-center cursor-pointer justify-center">
                    <input
                      type="checkbox"
                      className="hidden"
                      checked={user.is_active}
                      onChange={() => toggleUserAccess(user.id, !user.is_active)}
                    />
                    <div
                      className={`w-12 h-6 rounded-full p-1 transition ${
                        user.is_active
                          ? "bg-gradient-to-r from-green-600/80 to-green-800"
                          : "bg-gradient-to-r from-red-600/80 to-red-800"
                      }`}
                    >
                      <div
                        className={`w-4 h-4 bg-white rounded-full shadow-md transform transition ${
                          user.is_active ? "translate-x-6" : ""
                        }`}
                      />
                    </div>
                  </label>
                )}
              </td>
              <td className="p-4">
                <button
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  onClick={() => {
                    setEditingUser(user);
                    setIsModalOpen(true);
                  }}
                >
                  Modifier mot de passe
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modale pour modifier le mot de passe */}
      <CustomModal
        isOpen={isModalOpen}
        title="Modifier le mot de passe"
        onClose={() => {
          setIsModalOpen(false);
          setNewPassword("");
        }}
        actions={
          <>
            <button
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
              onClick={() => {
                setIsModalOpen(false);
                setNewPassword("");
              }}
            >
              Annuler
            </button>
            <button
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              onClick={updatePassword}
            >
              Sauvegarder
            </button>
          </>
        }
      >
        <div>
          <p className="text-gray-200 mb-4">
            Modifier le mot de passe pour l'utilisateur{" "}
            <span className="font-semibold">{editingUser?.username}</span>
          </p>
          <input
            type="text"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Nouveau mot de passe"
            className="w-full px-4 py-2 rounded bg-gray-700 text-white border border-gray-500"
          />
        </div>
      </CustomModal>
    </div>
  );
};

export default AdminUsersManagement;
