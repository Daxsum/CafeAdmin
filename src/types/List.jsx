import React from "react";
import { IconTrash, IconPencil } from "@tabler/icons";

function List({ types, handleEdit, handleDelete }) {
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
            <th colSpan={2} className="text-center">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {types.length > 0 ? (
            types.map((type, i) => (
              <tr key={type._id}>
                <td>{i + 1}</td>
                <td>{type.name}</td>

                <td className="text-right">
                  <button
                    onClick={() => handleEdit(type._id)}
                    className="btn bg-orange-500 hover:bg-orange-600 text-white"
                  >
                    <IconPencil />
                  </button>
                </td>
                <td className="text-left">
                  <button
                    onClick={() => handleDelete(type._id)}
                    className="btn bg-red-500 hover:bg-red-600 text-white"
                  >
                    <IconTrash />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7}>No catagory available , please add a catagory</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default List;
