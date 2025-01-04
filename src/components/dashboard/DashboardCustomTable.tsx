import React from "react";

interface EmployeeData {
  position: string;
  name: string;
  clientSales: {
    propre: string;
    sale: string;
  };
  exportSales: {
    cayo: string;
    ls: string;
  };
  quota: boolean;
  quotaPlus: boolean;
  totalWeek: {
    primeToPay: string;
    taxToReverse: string;
  };
  previousWeek: {
    primeS1: string;
    taxS1: string;
  };
  hireDate: string;
  warnings: {
    vacation: boolean;
    week1: boolean;
    week2: boolean;
  };
}

interface EmployeeTableProps {
  data: EmployeeData[];
}

const EmployeeTable: React.FC<EmployeeTableProps> = ({ data }) => {
  return (
    <div className="overflow-x-auto">
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead className="bg-gray-200">
          <tr>
            <th className="border border-gray-300 p-2 text-center">Poste</th>
            <th className="border border-gray-300 p-2 text-center">Employé</th>
            <th colSpan={2} className="border border-gray-300 p-2 text-center">
              Vente Client
            </th>
            <th colSpan={2} className="border border-gray-300 p-2 text-center">
              Vente Export
            </th>
            <th className="border border-gray-300 p-2 text-center">Quota</th>
            <th className="border border-gray-300 p-2 text-center">Quota+</th>
            <th colSpan={2} className="border border-gray-300 p-2 text-center">
              Total semaine
            </th>
            <th colSpan={2} className="border border-gray-300 p-2 text-center">
              Semaine -1
            </th>
            <th className="border border-gray-300 p-2 text-center">
              Date d'embauche
            </th>
            <th colSpan={3} className="border border-gray-300 p-2 text-center">
              Avertos Semaine
            </th>
          </tr>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 p-2"></th>
            <th className="border border-gray-300 p-2"></th>
            <th className="border border-gray-300 p-2 text-center">Propre</th>
            <th className="border border-gray-300 p-2 text-center">Sale</th>
            <th className="border border-gray-300 p-2 text-center">Cayo</th>
            <th className="border border-gray-300 p-2 text-center">LS</th>
            <th className="border border-gray-300 p-2"></th>
            <th className="border border-gray-300 p-2"></th>
            <th className="border border-gray-300 p-2 text-center">Prime</th>
            <th className="border border-gray-300 p-2 text-center">Taxe</th>
            <th className="border border-gray-300 p-2 text-center">Prime</th>
            <th className="border border-gray-300 p-2 text-center">Taxe</th>
            <th className="border border-gray-300 p-2"></th>
            <th className="border border-gray-300 p-2 text-center">Vacances</th>
            <th className="border border-gray-300 p-2 text-center">1</th>
            <th className="border border-gray-300 p-2 text-center">2</th>
          </tr>
        </thead>
        <tbody>
          {data.map((employee, index) => (
            <tr
              key={index}
              className={`${
                index % 2 === 0 ? "bg-white" : "bg-gray-100"
              } hover:bg-gray-50`}
            >
              <td className="border border-gray-300 p-2 text-center">
                {employee.position}
              </td>
              <td className="border border-gray-300 p-2 text-center">
                {employee.name}
              </td>
              <td className="border border-gray-300 p-2 text-center">
                {employee.clientSales.propre}
              </td>
              <td className="border border-gray-300 p-2 text-center">
                {employee.clientSales.sale}
              </td>
              <td className="border border-gray-300 p-2 text-center">
                {employee.exportSales.cayo}
              </td>
              <td className="border border-gray-300 p-2 text-center">
                {employee.exportSales.ls}
              </td>
              <td className="border border-gray-300 p-2 text-center">
                {employee.quota ? "✔️" : "❌"}
              </td>
              <td className="border border-gray-300 p-2 text-center">
                {employee.quotaPlus ? "✔️" : "❌"}
              </td>
              <td className="border border-gray-300 p-2 text-center">
                {employee.totalWeek.primeToPay}
              </td>
              <td className="border border-gray-300 p-2 text-center">
                {employee.totalWeek.taxToReverse}
              </td>
              <td className="border border-gray-300 p-2 text-center">
                {employee.previousWeek.primeS1}
              </td>
              <td className="border border-gray-300 p-2 text-center">
                {employee.previousWeek.taxS1}
              </td>
              <td className="border border-gray-300 p-2 text-center">
                {employee.hireDate}
              </td>
              <td className="border border-gray-300 p-2 text-center">
                {employee.warnings.vacation ? "✔️" : "❌"}
              </td>
              <td className="border border-gray-300 p-2 text-center">
                {employee.warnings.week1 ? "✔️" : "❌"}
              </td>
              <td className="border border-gray-300 p-2 text-center">
                {employee.warnings.week2 ? "✔️" : "❌"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeTable;
