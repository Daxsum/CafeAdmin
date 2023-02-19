import React, { useState, useEffect } from "react";
import swal from "sweetalert";

import Header from "./Header";
import List from "./List";
import Edit from "./Edit";
import Axios from "axios";
import Filter from "../partials/actions/filterOptions";
import Add from "./Add";

function Orders() {
  const [orders, setOrders] = useState({});
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [parameter, setParameter] = useState("getAll");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let config = {
      headers: {
        Authorization: sessionStorage.getItem("token"),
      },
    };
    Axios.get(`${import.meta.env.VITE_API}/api/order/getAll`, config)
      .then(({ data }) => {
        setOrders(data);
        setIsLoading(false);
      })
      .catch();
  });
  const handleEdit = (_id) => {
    const [order] = orders.filter((order) => order._id === _id);

    setSelectedProduct(order);
    setIsEditing(true);
  };
  //

  return (
    <div className="container">
      {/* <Filter handleFilter={handleFilter} /> */}
      {/* List */}

      {!isAdding && !isEditing && (
        <>
          <Header setIsAdding={setIsAdding} />

          <List orders={orders} handleEdit={handleEdit} />
          <div className="flex justify-center">
            {isLoading && <h1>loading...</h1>}
          </div>
        </>
      )}

      {/* Edit */}
      {isEditing && (
        <Edit
          orders={orders}
          selectedProduct={selectedProduct}
          setOrders={setOrders}
          setIsEditing={setIsEditing}
        />
      )}
      {isAdding && (
        <Add
          setIsAdding={setIsAdding}
          employees={orders}
          setEmployees={setOrders}
        />
      )}
    </div>
  );
}
export default Orders;
