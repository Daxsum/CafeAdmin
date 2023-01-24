import React from "react";
import { IconTrash, IconPencil } from '@tabler/icons';

function List({ employees, handleEdit, handleDelete }) {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: null,
  });

  return (
    <div className="contain-table">
      <table className="striped-table">
        <thead>
          <tr>
            <th>No.</th>
            <th>Patient Record No.</th>
            <th>Problem</th>
            <th>RequiredAmount</th>
            <th>Kebele Id No.</th>
            <th>Status</th>
            <th colSpan={2} className="text-center">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {employees.length > 0 ? (
            employees.map((employee, i) => (
              <tr key={employee._id}>
                <td>{i + 1}</td>
                <td>{employee.patientRecordNumber}</td>
                <td>{employee.problem}</td>
                <td>{employee.requiredAmount}</td>
                <td>{employee.kebeleIdNumber}</td>
                <td>{employee.kebeleIdNumber}</td>

                <td className="text-right">
                  <button
                    onClick={() => handleEdit(employee._id)}
                    className="btn bg-blue-500 hover:bg-blue-600 text-white"
                  >
                    <IconPencil />
                  </button>
                </td>
                <td className="text-left">
                  <button
                    onClick={() => handleDelete(employee._id)}
                    className="btn bg-red-500 hover:bg-red-600 text-white"
                  >
                    <IconTrash />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7}>No patients</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default List;
