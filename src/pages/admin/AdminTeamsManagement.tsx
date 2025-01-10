import React, { useState } from "react";
import CustomModal from "../../components/CustomModal";
import InputCustom from "../../components/InputCustom";
import SelectCustom from "../../components/SelectCustom";
import { User, Phone, Calendar, ShieldHalf } from "lucide-react";

type Employee = {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  grade: string;
  hireDate: string;
};

const EmployeeManagement: React.FC = () => {
  const gradeOrder = ["Patron", "Co-Patron", "Responsable", "CDI", "CDD"];
  const gradeOptions = ["Patron", "Co-Patron", "Responsable", "CDI", "CDD"];

  const [employees, setEmployees] = useState<Employee[]>([
    {
      id: "1",
      firstName: "John",
      lastName: "Doe",
      phone: "1234567890",
      grade: "Responsable",
      hireDate: "2022-01-15",
    },
    {
      id: "2",
      firstName: "Jane",
      lastName: "Smith",
      phone: "9876543210",
      grade: "CDI",
      hireDate: "2023-05-10",
    },
    {
      id: "3",
      firstName: "Alice",
      lastName: "Johnson",
      phone: "5551234567",
      grade: "Patron",
      hireDate: "2021-12-01",
    },
  ]);

  const formatPhoneNumber = (value: string) => {
    const phone = value.replace(/\D/g, "").slice(0, 10);
    return phone.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const [newEmployee, setNewEmployee] = useState<Employee>({
    id: "",
    firstName: "",
    lastName: "",
    phone: "",
    grade: "",
    hireDate: "",
  });

  // Gérer l'ouverture de la modal
  const openModal = (employee?: Employee) => {
    if (employee) {
      setEditingEmployee(employee);
    } else {
      setNewEmployee({ id: "", firstName: "", lastName: "", phone: "", grade: "", hireDate: "" });
    }
    setIsModalOpen(true);
  };

  // Gérer la fermeture de la modal
  const closeModal = () => {
    setEditingEmployee(null);
    setIsModalOpen(false);
  };

  // Ajouter un employé
  const handleAddEmployee = () => {
    setEmployees([
      ...employees,
      { ...newEmployee, id: Math.random().toString(36).substr(2, 9) },
    ]);
    closeModal();
  };

  // Mettre à jour un employé
  const handleUpdateEmployee = () => {
    if (editingEmployee) {
      setEmployees(
        employees.map((emp) => (emp.id === editingEmployee.id ? editingEmployee : emp))
      );
      closeModal();
    }
  };

  // Supprimer un employé
  const handleDeleteEmployee = (id: string) => {
    setEmployees(employees.filter((emp) => emp.id !== id));
  };

  // Fonction de tri basé sur l'ordre des grades
  const sortEmployeesByGrade = (employees: Employee[]) => {
    return [...employees].sort(
      (a, b) => gradeOrder.indexOf(a.grade) - gradeOrder.indexOf(b.grade)
    );
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
      <table className="w-full border-collapse border border-gray-100 text-center">
        <thead>
          <tr className="bg-gray-800">
            <th className="border border-gray-100 p-2">Grade</th>
            <th className="border border-gray-100 p-2">Prénom</th>
            <th className="border border-gray-100 p-2">Nom</th>
            <th className="border border-gray-100 p-2">Téléphone</th>
            <th className="border border-gray-100 p-2">Date d'embauche</th>
            <th className="border border-gray-100 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedEmployees.map((employee) => (
            <tr key={employee.id}>
              <td className="border border-gray-300 p-2">{employee.grade}</td>
              <td className="border border-gray-300 p-2">{employee.firstName}</td>
              <td className="border border-gray-300 p-2">{employee.lastName}</td>
              <td className="border border-gray-300 p-2">{formatPhoneNumber(employee.phone)}</td>
              <td className="border border-gray-300 p-2">{employee.hireDate}</td>
              <td className="border border-gray-300 p-2">
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
        <div className="flex flex-col gap-2">
          <SelectCustom
            value={editingEmployee ? editingEmployee.grade : newEmployee.grade}
            onChange={(e) =>
              editingEmployee
                ? setEditingEmployee({ ...editingEmployee, grade: e.target.value })
                : setNewEmployee({ ...newEmployee, grade: e.target.value })
            }
            options={gradeOptions}
            icon={ShieldHalf}
            placeholder="Sélectionnez un grade"
            bgColor="bg-gray-900"
            textColor="text-gray-400"
          />
          <InputCustom
            type="text"
            icon={User}
            placeholder="Prénom"
            value={editingEmployee ? editingEmployee.firstName : newEmployee.firstName}
            onChange={(e) =>
              editingEmployee
                ? setEditingEmployee({ ...editingEmployee, firstName: e.target.value })
                : setNewEmployee({ ...newEmployee, firstName: e.target.value })
            }
            bgColor="bg-gray-900/70"
            textColor="text-gray-400"
          />
          <InputCustom
            type="text"
            icon={User}
            placeholder="Nom"
            value={editingEmployee ? editingEmployee.lastName : newEmployee.lastName}
            onChange={(e) =>
              editingEmployee
                ? setEditingEmployee({ ...editingEmployee, lastName: e.target.value })
                : setNewEmployee({ ...newEmployee, lastName: e.target.value })
            }
            bgColor="bg-gray-900/70"
            textColor="text-gray-400"
          />
          <InputCustom
            type="text"
            icon={Phone}
            placeholder="Téléphone (eg. 1234567890)"
            value={editingEmployee ? editingEmployee.phone : newEmployee.phone}
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
            value={editingEmployee ? editingEmployee.hireDate : newEmployee.hireDate}
            onChange={(e) =>
              editingEmployee
                ? setEditingEmployee({ ...editingEmployee, hireDate: e.target.value })
                : setNewEmployee({ ...newEmployee, hireDate: e.target.value })
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
