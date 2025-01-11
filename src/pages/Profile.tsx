import React from "react";
import { User, CalendarFold, Phone, Save, KeyRound, ShieldHalf } from "lucide-react";
import InputCustom from "../components/InputCustom";
import StaticTextCustom from "../components/StaticTextCustom";
import CustomButton from "../components/CustomButton";
import toast, { Toaster } from "react-hot-toast";

const fullName = `${localStorage.getItem("firstName") || ""} ${localStorage.getItem("lastName") || ""}`.trim();
const grade = localStorage.getItem("grade") || "";
const phoneNumber = localStorage.getItem("phone") || "";
const hireDate = localStorage.getItem("hireDate") || "";

const Profile: React.FC = () => {
  // const [profileImage, setProfileImage] = useState<string>("/static/profile_picture/patron.png");

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

  return (
    <div className="flex flex-col md:flex-row bg-gray-800/50 text-gray-200 border border-gray-700 p-6 rounded-lg shadow-md gap-8 relative">

      {/* Toast */}
      <Toaster position="top-right" />

      {/* Section gauche */}
      <div className="w-full md:w-1/3 bg-gray-800 p-6 border border-gray-700 rounded-lg shadow-md flex flex-col items-center gap-4">
        <div className="relative">
          <img src={profilePicture} alt={`Profile picture pour ${grade}`} className="h-24 w-24 rounded-full object-cover" />
          {/*
          <label
            htmlFor="upload-button"
            className="absolute bottom-0 right-0 bg-blue-600 p-2 rounded-full text-white cursor-pointer hover:bg-blue-500"
          >
            <Upload size={16} />
          </label>
          <input
            id="upload-button"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageUpload}
          />
          */}
        </div>
        <h2 className="text-2xl font-bold">{fullName}</h2>
        <p className="text-lg text-gray-400">{grade}</p>

        <div className="w-full border-t border-gray-700 my-4"></div>

        <div className="flex flex-col w-full gap-2">
          <div className="flex justify-center text-sm">
            <span className="text-base text-gray-400">Stats Soon...</span>
            {/*
            <span className="text-base text-gray-400">Total d'argent propre gagné</span>
            <span className="text-green-400 font-bold">$ 3,456,789</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-base text-gray-400">Total d'argent sale gagné</span>
            <span className="text-red-400 font-bold">$ 1,234,567</span>
          </div>
        </div>

        <div className="w-2/3 border-t border-gray-700 my-4"></div>

        <div className="flex flex-col w-full gap-2">
          <div className="flex justify-between text-sm">
            <span className="text-base text-gray-400">Total de vente exports</span>
            <span className="text-orange-400 font-bold">361</span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-base text-gray-400">Total de vente clients</span>
            <span className="text-blue-400 font-bold">123</span>
            */}
          </div>
        </div>
      </div>

      {/* Section droite */}
      <div className="w-full md:w-2/3 bg-gray-800 p-6 border border-gray-700 rounded-lg shadow-md flex flex-col">

        {/* Informations Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* Grade */}
          <label className="block">
            <p className="text-lg font-bold">Grade :</p>
            <StaticTextCustom
              icon={ShieldHalf}
              text={grade}
              bgColor="bg-gray-900/30"
              textColor="text-gray-400"
            />
          </label>

          {/* Prénom Nom */}
          <label className="block">
            <p className="text-lg font-bold">Prénom Nom :</p>
            <StaticTextCustom
              icon={User}
              text={fullName}
              bgColor="bg-gray-900/30"
              textColor="text-gray-400"
            />
          </label>

          {/* Téléphone */}
          <label className="block">
            <p className="text-lg font-bold">Téléphone :</p>
            <StaticTextCustom
              icon={Phone}
              text={formatPhoneNumber(phoneNumber)}
              bgColor="bg-gray-900/30"
              textColor="text-gray-400"
            />
          </label>

          {/* Date d'embauche */}
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

        {/* Diviser */}
        <div className="flex w-2/3 border-t border-gray-700 my-8"></div>

        {/* Change Password Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <label className="block">
            <p className="text-lg font-bold">Changer de mot de passe :</p>
            <div className="relative group mt-4">
              <InputCustom
                type="text"
                icon={KeyRound}
                value=""
                onChange={() => {}}
                placeholder="Mot de passe actuel"
                bgColor="bg-gray-900/70"
                textColor="text-gray-400"
              />
            </div>
          </label>
          <label className="block">
            <p className="text-lg font-bold">&nbsp;</p>
            <div className="relative group mt-4">
              <InputCustom
                type="text"
                icon={KeyRound}
                value=""
                onChange={() => {}}
                placeholder="Nouveau mot de passe"
                bgColor="bg-gray-900/70"
                textColor="text-gray-400"
              />
            </div>
          </label>
        </div>

        {/* Bouton Sauvegarder */}
        <div className="flex justify-end mt-10">
          <CustomButton
            label="Update"
            onClick={handleSave}
            className="bg-gradient-to-r from-blue-400/70 to-purple-500/70 text-white hover:bg-blue-700 px-6 py-2"
            icon={Save}
          />
        </div>
      </div>
    </div>
  );
};

export default Profile;
