import React from "react";
import { IconTrash, IconPencil } from "@tabler/icons";

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
            <th>Name</th>
            <th>Number In Stock</th>
            <th>Price</th>
            <th>Type</th>
            <th></th>
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
                <td>{employee.name}</td>
                <td>{employee.numberInStock}</td>
                <td>{employee.price}</td>
                <td>{employee.type.name}</td>

                <td>
                  {" "}
                  <img
                    className="h-40 object-cover rounded-xl"
                    src={`//localhost:5000/${employee.filePath}`}
                    alt=""
                  />
                </td>

                <td className="text-right">
                  <button
                    onClick={() => handleEdit(employee._id)}
                    className="btn bg-orange-500 hover:bg-orange-600 text-white"
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
              <td colSpan={7}>No food available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default List;
