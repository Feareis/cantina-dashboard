import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../api/supabaseClient";
import { useAuth } from "../api/AuthContext";
import InputCustom from "../components/InputCustom";
import { User, KeyRound } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth(); // Utilisation de login depuis AuthContext

  const authenticateUser = async (username: string, password: string) => {
    try {
      const { data, error } = await supabase
        .from("users")
        .select("id, employee_id, password, role, is_active")
        .eq("username", username)
        .single();

      if (error || !data) {
        toast.error("Login ou mot de passe incorrect.");
        return null;
      }

      if (!data.is_active) {
        toast.error("Votre compte est inactif. Veuillez contacter l'administrateur.");
        return null;
      }

      if (data.password !== password) {
        toast.error("Login ou mot de passe incorrect.");
        return null;
      }

      return data;

    } catch (error: any) {
      // toast.error("Erreur lors de l'authentification !");
      return null;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const user = await authenticateUser(username, password);

      if (user) {

        // Requête pour récupérer les informations de l'employé
        const { data: employee, error: employeeError } = await supabase
          .from("employees")
          .select("first_name, last_name, grade, phone, hire_date")
          .eq("id", user.employee_id)
          .single();

        if (employeeError) {
          toast.error("Impossible de récupérer les informations de l'employé.");
          return null;
        }

        // console.log("Informations de l'employé :", employee);

        const userData = {
          username,
          password,
          employeeID: user.employee_id,
          role: user.role,
          firstName: employee.first_name,
          lastName: employee.last_name,
          grade: employee.grade,
          phone: employee.phone,
          hireDate: employee.hire_date,
        };

        login(userData); // Active l'authentification via AuthContext
        navigate("/"); // Redirige après une connexion réussie
      }
    } catch (error: any) {
      // alert(error.message || "Une erreur est survenue lors de la connexion.");
      return null;
    }
  };

  return (
    <div className="relative h-screen w-full">
      {/* Toast configuration */}
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 2500,
          style: {
            background: "#1f2937",
            color: "#fff",
            borderRadius: "8px",
            padding: "16px",
          },
        }}
      />

      {/* Fond vidéo ou image */}
      <div className="absolute inset-0">
        <img src="/static/cayo.png" alt="Background" className="object-cover w-full h-full" />
      </div>

      {/* Contenu centré */}
      <div className="relative flex justify-center items-center h-full">
        <div className="bg-gray-700/95 p-10 rounded-2xl shadow-lg text-center text-gray-100 w-full max-w-md">
          <h2 className="text-2xl font-bold mb-8">Connexion</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Champ Username */}
            <InputCustom
              type="text"
              icon={User}
              value={username}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
              placeholder="Nom d'utilisateur"
              bgColor="bg-gray-900/70"
              textColor="text-gray-400"
              className="w-full"
            />

            {/* Champ Password */}
            <InputCustom
              type="password"
              icon={KeyRound}
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
              placeholder="Mot de passe"
              bgColor="bg-gray-900/70"
              textColor="text-gray-400"
              className="w-full"
            />

            {/* Bouton Connexion */}
            <button
              type="submit"
              className="w-1/2 py-3 bg-gradient-to-r from-blue-400 to-purple-500 text-white font-bold rounded-lg transition-transform duration-200 hover:scale-105"
            >
              SE CONNECTER
            </button>
          </form>
          <p className="text-sm text-gray-400 mt-6">Demandez vos accès / Rejoindre la Cantina</p>
          <div className="flex justify-center mt-4">
            <a
              href="https://discord.gg/Q7ZR4aqrjC"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block w-10 h-10 transition-transform duration-200 hover:scale-125"
            >
              <img src={"/static/icons/discord-icon.svg"} alt="Discord" />
            </a>
          </div>
          <footer className="text-xs text-gray-500 mt-6">Made with ❤️ by Feareis</footer>
        </div>
      </div>
    </div>
  );
};

export default Login;
