import React from "react";
import { IconTrash, IconPencil } from "@tabler/icons";

function List({ users, handleEdit, handleDelete }) {
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
            <th>First Name</th>
            <th>Last Name</th>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
            <th></th>
            <th colSpan={2} className="text-center">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user, i) => (
              <tr key={user._id}>
                <td>{i + 1}</td>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.userName}</td>
                <td>
                  {user.email ? user.email : <div>email not available</div>}
                </td>
                <td>{user.role}</td>

                <td className="text-right">
                  <button
                    onClick={() => handleEdit(user._id)}
                    className="btn bg-orange-500 hover:bg-orange-600 text-white"
                  >
                    <IconPencil />
                  </button>
                </td>
                <td className="text-left">
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="btn bg-red-500 hover:bg-red-600 text-white"
                  >
                    <IconTrash />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7}>
                There are no active users right now,so pelase create a user
                first!
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default List;
