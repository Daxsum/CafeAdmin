import React from "react";
import { IconTrash, IconPencil } from "@tabler/icons";

function List({ orders, handleEdit }) {
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
            <th>Type</th>
            <th>Who</th>
            <th>Quantity</th>
            <th>Status</th>
            <th></th>
            <th colSpan={2} className="text-center">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {orders.length > 0 ? (
            orders.map((order, i) => (
              <tr key={order._id}>
                <td>{i + 1}</td>
                <td>{order.item.name}</td>
                <td>{order.item.type.name}</td>
                <td>{order.who.userName}</td>
                <td>{order.quantity}</td>
                <td>
                  {order.isActive === true ? (
                    <span className="bg-green-600 rounded-md p-2 text-white">
                      Active
                    </span>
                  ) : (
                    <span className="bg-red-600 rounded-md p-2 text-white">
                      Served
                    </span>
                  )}
                </td>
                <td>
                  {" "}
                  <img
                    className="h-40 object-cover rounded-xl"
                    src={`//localhost:5000/${order.item.filePath}`}
                    alt=""
                  />
                </td>

                <td className="text-right">
                  <button
                    onClick={() => handleEdit(order._id)}
                    className="btn bg-orange-500 hover:bg-orange-600 text-white"
                  >
                    <IconPencil />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7}>No Orders</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default List;
