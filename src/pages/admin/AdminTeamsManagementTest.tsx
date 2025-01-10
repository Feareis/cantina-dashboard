import React, { useEffect, useState } from 'react';
import { getEmployees } from '../../api/employeeService';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  IconButton,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

interface Employee {
  id: string;
  first_name: string;
  last_name: string;
  phone: string;
  grade: string;
  hire_date: string;
}

const EmployeeTable: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [page, setPage] = useState(0);
  const rowsPerPage = 8;

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const data = await getEmployees();
        setEmployees(data || []);
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };

    fetchEmployees();
  }, []);

  const handleChangePage = (_event: number, newPage: number) => {
    setPage(newPage);
  };

  const currentEmployees = employees.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const emptyRows = rowsPerPage - currentEmployees.length;

  return (
    <Paper
      elevation={3}
      className="bg-gradient-to-b from-gray-900/30 via-gray-800 to-gray-800/80 border border-gray-700 rounded-xl text-gray-400"
    >
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow className="bg-gray-800/70 text-gray-600">
              <TableCell className="font-semibold">Grade</TableCell>
              <TableCell className="font-semibold">Prénom</TableCell>
              <TableCell className="font-semibold">Nom</TableCell>
              <TableCell className="font-semibold">Téléphone</TableCell>
              <TableCell className="font-semibold">Date d'embauche</TableCell>
              <TableCell align="center" className="font-semibold">
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentEmployees.map((employee, index) => (
              <TableRow
                key={employee.id}
                className={`hover:bg-gray-300 ${
                  index % 2 === 0 ? 'bg-gray-900/30' : 'bg-gray-800/30'
                }`}
              >
                <TableCell>{employee.grade}</TableCell>
                <TableCell>{employee.first_name}</TableCell>
                <TableCell>{employee.last_name}</TableCell>
                <TableCell>{employee.phone}</TableCell>
                <TableCell>
                  {new Date(employee.hire_date).toLocaleDateString()}
                </TableCell>
                <TableCell align="center">
                  <div className="flex justify-center gap-2">
                    <IconButton
                      onClick={() => console.log(`Edit ${employee.id}`)}
                      className="text-blue-400 hover:text-blue-500"
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => console.log(`Delete ${employee.id}`)}
                      className="text-red-400 hover:text-red-500"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </div>
                </TableCell>
              </TableRow>
            ))}

            {emptyRows > 0 &&
              Array.from({ length: emptyRows }).map((_, index) => (
                <TableRow
                  key={`empty-${index}`}
                  className={`${
                    (currentEmployees.length + index) % 2 === 0
                      ? 'bg-gray-900/30'
                      : 'bg-gray-800/30'
                  }`}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[rowsPerPage]}
        component="div"
        count={employees.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        className="text-gray-400 border-t border-gray-700 bg-gradient-to-b from-gray-900/20 via-gray-800/10 to-gray-900/10"
      />
    </Paper>
  );
};

export default EmployeeTable;
