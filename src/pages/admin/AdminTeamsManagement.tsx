import React, { useState, useEffect } from "react";
import { supabase } from "../../api/supabaseClient";
import CustomModal from "../../components/CustomModal";
import InputCustom from "../../components/InputCustom";
import SelectCustom from "../../components/SelectCustom";
import { User, Phone, Calendar, ShieldHalf } from "lucide-react";

type Employee = {
  id?: string;
  first_name: string;
  last_name: string;
  phone: string;
  grade: string;
  hire_date: string;
};

const EmployeeManagement: React.FC = () => {
  const gradeOrder = ["Patron", "Co-Patron", "Responsable", "CDI", "CDD"];

  const fetchEmployees = async () => {
    const { data, error } = await supabase.from("employees").select("*");
    if (error) {
      console.error("Erreur lors de la récupération des employés :", error.message);
      return;
    }
    setEmployees(data || []);
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const generateUniqueUsername = async (firstName: string, lastName: string): Promise<string> => {
    let baseUsername = `${firstName.toLowerCase()}.${lastName.charAt(0).toLowerCase()}`;
    let username = baseUsername;
    let counter = 1;

    while (true) {
      // Vérifiez si le nom d'utilisateur existe
      const { data, error } = await supabase
        .from("users")
        .select("username")
        .eq("username", username);

      if (error) {
        console.error("Erreur lors de la vérification du nom d'utilisateur :", error.message);
        throw error;
      }

      if (!data || data.length === 0) {
        // Si le nom d'utilisateur est unique, retournez-le
        return username;
      }

      // Sinon, ajoutez un compteur et essayez à nouveau
      username = `${baseUsername}${counter}`;
      counter++;
    }
  };

  const generatePassword = (): string => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
    let password = "";
    for (let i = 0; i < 12; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
  };

  const mapGradeToRole = (grade: string): string => {
    switch (grade) {
      case "Patron":
      case "Co-Patron":
        return "admin";
      case "Responsable":
        return "limited_admin";
      case "CDI":
      case "CDD":
        return "user";
      default:
        throw new Error(`Grade non reconnu : ${grade}`);
    }
  };

  const handleAddEmployee = async () => {
    const generatedPassword = generatePassword();
    try {
      const username = await generateUniqueUsername(newEmployee.first_name, newEmployee.last_name);

      // Mapper le grade en rôle
      const role = mapGradeToRole(newEmployee.grade);

      const newEmployeeData = {
        first_name: newEmployee.first_name,
        last_name: newEmployee.last_name,
        phone: newEmployee.phone,
        grade: newEmployee.grade,
        hire_date: newEmployee.hire_date,
      };

      // Insérer l'employé dans la table `employees`
      const { data: employeeData, error: employeeError } = await supabase
        .from("employees")
        .insert([newEmployeeData])
        .select();

      if (employeeError || !employeeData || employeeData.length === 0) {
        console.error("Erreur lors de l'ajout de l'employé :", employeeError?.message);
        return;
      }

      const employeeId = employeeData[0].id;

      // Créer un utilisateur associé
      const { error: userError } = await supabase.from("users").insert([
        {
          employee_id: employeeId,
          username: username,
          password: generatedPassword, // Stocker le mot de passe en clair (uniquement pour test)
          role: role,
        },
      ]);

      if (userError) {
        console.error("Erreur lors de la création de l'utilisateur :", userError.message);
        return;
      }

      alert(`Utilisateur créé avec succès !\nNom d'utilisateur : ${username}\nMot de passe : ${generatedPassword}`);
      fetchEmployees();
      closeModal();
    } catch (error) {
      console.error("Erreur lors de l'ajout de l'employé ou de l'utilisateur :", (error as Error).message);
    }
  };

  const handleUpdateEmployee = async () => {
    if (editingEmployee) {
      const { error } = await supabase
        .from("employees")
        .update({
          first_name: editingEmployee.first_name,
          last_name: editingEmployee.last_name,
          phone: editingEmployee.phone,
          grade: editingEmployee.grade,
          hire_date: editingEmployee.hire_date,
        })
        .eq("id", editingEmployee.id);

      if (error) {
        console.error("Erreur lors de la mise à jour de l'employé :", error.message);
      } else {
        fetchEmployees();
        closeModal(); // Fermer la modale
      }
    }
  };

  const handleDeleteEmployee = async (id: string | undefined) => {
    if (!id) {
      console.error("ID manquant pour supprimer l'employé.");
      return;
    }

    const { error } = await supabase.from("employees").delete().eq("id", id);
    if (error) {
      console.error("Erreur lors de la suppression :", error.message);
    }
  };

  const [employees, setEmployees] = useState<Employee[]>([]);

  const formatPhoneNumber = (value: string) => {
    const phone = value.replace(/\D/g, "").slice(0, 10);
    return phone.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
  };

  const getCurrentDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0]; // Format YYYY-MM-DD
  };

  const [isModalOpen, setModalOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const [newEmployee, setNewEmployee] = useState<Employee>({
    id: "",
    first_name: "",
    last_name: "",
    phone: "",
    grade: "",
    hire_date: "",
  });

  // Gérer l'ouverture de la modal
  const openModal = (employee?: Employee) => {
    if (employee) {
      // Mode édition : Pré-remplit les champs avec les données de l'employé sélectionné
      setEditingEmployee({
        id: employee.id || "",
        first_name: employee.first_name,
        last_name: employee.last_name,
        phone: employee.phone,
        grade: employee.grade,
        hire_date: employee.hire_date,
      });
    } else {
      // Mode ajout : Initialise un nouvel employé vide
      setNewEmployee({
        first_name: "",
        last_name: "",
        phone: "",
        grade: "",
        hire_date: getCurrentDate(),
      });
    }
    setModalOpen(true); // Ouvre la modale
  };

  // Gérer la fermeture de la modal
  const closeModal = () => {
    setEditingEmployee(null);
    setModalOpen(false);
  };

  // Fonction de tri basé sur l'ordre des grades
  const sortEmployeesByGrade = (employees: Employee[]) => {
    return [...employees].sort(
      (a, b) => gradeOrder.indexOf(a.grade) - gradeOrder.indexOf(b.grade)
    );
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
        return "bg-gray-700 text-gray-100"; // Classe par défaut si le grade est inconnu
    }
  };

  const sortedEmployees = sortEmployeesByGrade(employees);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold mb-4">Gestion des Employés</h1>
        <button
          className="bg-gradient-to-r from-blue-400/70 to-purple-500/70 hover:bg-blue-600 text-white px-4 py-2 rounded mt-4"
          onClick={() => openModal()}
        >
          Ajouter un Employé
        </button>
      </div>
      <table className="w-full text-center">
        <thead>
          <tr className="bg-gray-800">
            <th className="border border-gray-400 p-2">Grade</th>
            <th className="border border-gray-400 p-2">Prénom</th>
            <th className="border border-gray-400 p-2">Nom</th>
            <th className="border border-gray-400 p-2">Téléphone</th>
            <th className="border border-gray-400 p-2">Date d'embauche</th>
            <th className="border border-gray-400 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedEmployees.map((employee) => (
            <tr key={employee.id}>
              <td className={`border border-gray-600 p-2 ${getGradeClass(employee.grade)}`}>{employee.grade}</td>
              <td className="border border-gray-600 p-2">{employee.first_name}</td>
              <td className="border border-gray-600 p-2">{employee.last_name}</td>
              <td className="border border-gray-600 p-2">{formatPhoneNumber(employee.phone)}</td>
              <td className="border border-gray-600 p-2">{employee.hire_date}</td>
              <td className="border border-gray-600 p-2">
                <button
                  className="bg-blue-500 text-white px-2 py-1 rounded mr-4"
                  onClick={() => openModal(employee)}
                >
                  Modifier
                </button>
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded"
                  onClick={() => handleDeleteEmployee(employee.id)}
                >
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <CustomModal
        isOpen={isModalOpen}
        title={editingEmployee ? "Modifier un Employé" : "Ajouter un Employé"}
        onClose={closeModal}
        actions={
          <>
            <button
              className="bg-gray-400 text-white px-4 py-2 rounded"
              onClick={closeModal}
            >
              Annuler
            </button>
            <button
              className="bg-green-500 text-white px-4 py-2 rounded"
              onClick={editingEmployee ? handleUpdateEmployee : handleAddEmployee}
            >
              {editingEmployee ? "Modifier" : "Ajouter"}
            </button>
          </>
        }
      >
        <div className="flex flex-col gap-4">
          <SelectCustom
            value={editingEmployee?.grade || newEmployee.grade}
            onChange={(e) =>
              editingEmployee
                ? setEditingEmployee({ ...editingEmployee, grade: e.target.value })
                : setNewEmployee({ ...newEmployee, grade: e.target.value })
            }
            options={gradeOrder}
            icon={ShieldHalf}
            placeholder="Sélectionnez un grade"
            bgColor="bg-gray-900"
            textColor="text-gray-400"
          />
          <InputCustom
            type="text"
            icon={User}
            placeholder="Prénom"
            value={editingEmployee?.first_name || newEmployee.first_name}
            onChange={(e) =>
              editingEmployee
                ? setEditingEmployee({ ...editingEmployee, first_name: e.target.value })
                : setNewEmployee({ ...newEmployee, first_name: e.target.value })
            }
            bgColor="bg-gray-900/70"
            textColor="text-gray-400"
          />
          <InputCustom
            type="text"
            icon={User}
            placeholder="Nom"
            value={editingEmployee?.last_name || newEmployee.last_name}
            onChange={(e) =>
              editingEmployee
                ? setEditingEmployee({ ...editingEmployee, last_name: e.target.value })
                : setNewEmployee({ ...newEmployee, last_name: e.target.value })
            }
            bgColor="bg-gray-900/70"
            textColor="text-gray-400"
          />
          <InputCustom
            type="text"
            icon={Phone}
            placeholder="Téléphone (eg. 1234567890)"
            value={editingEmployee?.phone || newEmployee.phone}
            onChange={(e) =>
              editingEmployee
                ? setEditingEmployee({ ...editingEmployee, phone: e.target.value })
                : setNewEmployee({ ...newEmployee, phone: e.target.value })
            }
            bgColor="bg-gray-900/70"
            textColor="text-gray-400"
          />
          <InputCustom
            type="date"
            icon={Calendar}
            placeholder="Date"
            value={editingEmployee?.hire_date || newEmployee.hire_date}
            onChange={(e) =>
              editingEmployee
                ? setEditingEmployee({ ...editingEmployee, hire_date: e.target.value })
                : setNewEmployee({ ...newEmployee, hire_date: e.target.value })
            }
            bgColor="bg-gray-900/70"
            textColor="text-gray-400"
          />
        </div>
      </CustomModal>
    </div>
  );
};

export default EmployeeManagement;
