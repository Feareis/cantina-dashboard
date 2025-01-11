import React, { useState } from "react";
import { User, CalendarFold, Phone, Save, KeyRound, ShieldHalf } from "lucide-react";
import InputCustom from "../components/InputCustom";
import StaticTextCustom from "../components/StaticTextCustom";
import CustomButton from "../components/CustomButton";
import toast, { Toaster } from "react-hot-toast";
import { supabase } from "../api/supabaseClient";
import { useAuth } from "../api/AuthContext";


const Profile: React.FC = () => {
  const { user } = useAuth();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const firstName = user?.firstName || "Inconnu";
  const lastName = user?.lastName || "Inconnu";
  const fullName = `${firstName} ${lastName}`.trim();
  const grade = user?.grade || "Inconnu";
  const phoneNumber = user?.phone || "Inconnu";
  const hireDate = user?.hireDate || "Inconnu";

  const profilePictureMapping: { [key: string]: string } = {
    Patron: "/static/profile_picture/patron.png",
    "Co-Patron": "/static/profile_picture/patron.png",
    Responsable: "/static/profile_picture/responsable.png",
    CDI: "/static/profile_picture/cdi.png",
    CDD: "/static/profile_picture/cdd.png",
  };

  const profilePicture = profilePictureMapping[grade] || "/static/profile_picture/default.png";

  {/*
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) setProfileImage(event.target.result as string);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };
  */}

  const formatPhoneNumber = (value: string) => {
    const phone = value.replace(/\D/g, "").slice(0, 10);
    return phone.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
  };

  // Toast
  const saveSettings = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("OK !");
      }, 1000);
    });
  };

  const handleSave = () => {
    toast.promise(
      saveSettings(),
      {
        loading: "Sauvegarde en cours...",
        success: <b>OK !</b>,
      },
      {
        style: {
          marginTop: "100px",
          padding: "16px",
          borderRadius: "8px",
          background: "#1f2937",
          color: "#ffffff",
          border: "1px solid #374151",
        },
      }
    );
  };

  const handlePasswordChange = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error("Tous les champs doivent être remplis.");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Le nouveau mot de passe et la confirmation doivent correspondre.");
      return;
    }

    const username = localStorage.getItem("username");

    if (!username) {
      toast.error("Utilisateur introuvable.");
      return;
    }

    // Utilisation de toast.promise
    const passwordChangePromise = supabase
      .from("users")
      .select("id, password")
      .eq("username", username)
      .single()
      .then(({ data: user, error: userError }) => {
        if (userError || !user) {
          throw new Error("Utilisateur introuvable.");
        }

        if (user.password !== currentPassword) {
          throw new Error("L'ancien mot de passe est incorrect.");
        }

        return supabase
          .from("users")
          .update({ password: newPassword })
          .eq("id", user.id);
      })
      .then(({ error: updateError }) => {
        if (updateError) {
          throw new Error("Erreur lors de la mise à jour du mot de passe.");
        }

        // Réinitialisation des champs après succès
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      });

    // Gérer les différents états du toast
    toast.promise(passwordChangePromise, {
      loading: "Mise à jour du mot de passe...",
      success: "Mot de passe mis à jour avec succès !",
      error: (err) => err.message || "Une erreur est survenue.",
    });
  };

  return (
    <div className="flex flex-col md:flex-row bg-gray-800/50 text-gray-200 border border-gray-700 p-6 rounded-lg shadow-md gap-8 relative">
      {/* Toast */}
      <Toaster
        position="top-right"
        toastOptions={{
          // Options globales pour tous les toasts
          style: {
            marginTop: '100px',
            padding: '16px',
            width: '450px',
            borderRadius: '8px',
            background: '#1f2937',
            color: '#fff',
          },
          error: {
            // Options spécifiques aux erreurs
            duration: 5000,
            style: {
              background: '#1f2937',
              color: '#ff4d4f', // Rouge pour les erreurs
            },
          },
        }}
      />

      {/* Section gauche divisée en 2 */}
      <div className="flex flex-col w-full md:w-1/3 gap-6">
        {/* Top gauche */}
        <div className="flex flex-col items-center gap-4 bg-gray-800 p-6 border border-gray-700 rounded-lg shadow-md h-full">
          <div className="relative">
            <img src={profilePicture} alt={`Profile picture pour ${grade}`} className="h-24 w-24 rounded-full object-cover" />
          </div>
          <h2 className="text-2xl font-bold">{fullName}</h2>
          <p className="text-lg text-gray-400">{grade}</p>
        </div>

        {/* Bottom gauche */}
        <div className="flex flex-col justify-center items-center bg-gray-800 p-6 border border-gray-700 rounded-lg shadow-md h-full">
          <span className="text-base text-gray-400">Stats Soon...</span>
        </div>
      </div>

      {/* Section droite divisée en 2 */}
      <div className="flex flex-col w-full md:w-2/3 gap-6">
        {/* Top droite */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-800 p-6 border border-gray-700 rounded-lg shadow-md h-full">
          <label className="block">
            <p className="text-lg font-bold">Grade :</p>
            <StaticTextCustom
              icon={ShieldHalf}
              text={grade}
              bgColor="bg-gray-900/30"
              textColor="text-gray-400"
            />
          </label>
          <label className="block">
            <p className="text-lg font-bold">Prénom Nom :</p>
            <StaticTextCustom
              icon={User}
              text={fullName}
              bgColor="bg-gray-900/30"
              textColor="text-gray-400"
            />
          </label>
          <label className="block">
            <p className="text-lg font-bold">Téléphone :</p>
            <StaticTextCustom
              icon={Phone}
              text={formatPhoneNumber(phoneNumber)}
              bgColor="bg-gray-900/30"
              textColor="text-gray-400"
            />
          </label>
          <label className="block">
            <p className="text-lg font-bold">Date d'embauche :</p>
            <StaticTextCustom
              icon={CalendarFold}
              text={hireDate}
              bgColor="bg-gray-900/30"
              textColor="text-gray-400"
            />
          </label>
        </div>

        {/* Bottom droite */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-800 p-6 border border-gray-700 rounded-lg shadow-md h-full">
          <label className="block w-3/4">
            <p className="text-lg font-bold">Mot de passe actuel :</p>
            <InputCustom
              type="text"
              icon={KeyRound}
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="Mot de passe actuel"
              bgColor="bg-gray-900/70"
              textColor="text-gray-400"
              className="mt-5"
            />
          </label>
          <label></label>
          <label className="block w-3/4">
            <p className="text-lg font-bold">Nouveau mot de passe :</p>
            <InputCustom
              type="text"
              icon={KeyRound}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Nouveau mot de passe"
              bgColor="bg-gray-900/70"
              textColor="text-gray-400"
              className="mt-5"
            />
          </label>
          <label className="block w-3/4">
            <p className="text-lg font-bold">Confirmer le mot de passe :</p>
            <InputCustom
              type="text"
              icon={KeyRound}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirmer le mot de passe"
              bgColor="bg-gray-900/70"
              textColor="text-gray-400"
              className="mt-5"
            />
          </label>
          <div className="flex justify-end mt-10 col-span-2">
            <CustomButton
              label="Update"
              onClick={handlePasswordChange}
              className="bg-gradient-to-r from-blue-400/70 to-purple-500/70 text-white hover:bg-blue-700 px-6 py-2"
              icon={Save}
            />
          </div>
        </div>
      </div>
    </div>
  );

};

export default Profile;
