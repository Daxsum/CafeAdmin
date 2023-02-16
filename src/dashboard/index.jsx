import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import "./list.css";
import Header from "./Header";
import List from "./List";
import Edit from "./Edit";
import Axios from "axios";
import Filter from "../partials/actions/filterOptions";
import Add from "./Add";

function Products() {
  const [products, setProducts] = useState({});
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
    Axios.get(`${import.meta.env.VITE_API}/api/products/getAll`)
      .then(({ data }) => {
        setProducts(data);
        setIsLoading(false);
      })
      .catch();
  });
  const handleEdit = (_id) => {
    const [product] = products.filter((product) => product._id === _id);

    setSelectedProduct(product);
    setIsEditing(true);
  };
  //

  const handleDelete = (id) => {
    const orginalData = products;
    Swal.fire({
      icon: "warning",
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
    }).then((result) => {
      if (result.value) {
        const [product] = products.filter((product) => product._id === id);
        Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: `${product.name}'s data has been deleted.`,
          showConfirmButton: false,
          timer: 1500,
        });
        setProducts(products.filter((product) => product._id !== id));

        let config = {
          headers: {
            Authorization: sessionStorage.getItem("token"),
          },
        };

        try {
          Axios.delete(
            `${import.meta.env.VITE_API}/api/products/Delete/${id}`,
            config
          );
        } catch (error) {
          alert(error);
          setProducts(orginalData);
        }
      }
    });
  };
  // const handleFilter = (searchData) => {
  //   if (searchData === "heart") {
  //     setParameter("hospital?speciality=heart");
  //   } else if (searchData === "general") {
  //     setParameter("hospital?speciality=general");
  //   } else if (searchData === "kidney") {
  //     setParameter("hospital?speciality=kidney");
  //   } else {
  //     setParameter("hospital");
  //   }

  //   let config = {
  //     headers: {
  //       Authorization: sessionStorage.getItem("token"),
  //     },
  //   };
  //   Axios.get("http:/localhost:5000/api/products/getAll", config).then(
  //     (response) => {
  //       setProducts(response.data);
  //     }
  //   );
  // };

  return (
    <div className="container">
      {/* <Filter handleFilter={handleFilter} /> */}
      {/* List */}

      {!isAdding && !isEditing && (
        <>
          <Header setIsAdding={setIsAdding} />

          <List
            products={products}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
          <div className="flex justify-center">
            {isLoading && <h1>loading...</h1>}
          </div>
        </>
      )}

      {/* Edit */}
      {isEditing && (
        <Edit
          products={products}
          selectedProduct={selectedProduct}
          setProducts={setProducts}
          setIsEditing={setIsEditing}
        />
      )}
      {isAdding && (
        <Add
          setIsAdding={setIsAdding}
          products={products}
          setProducts={setProducts}
        />
      )}
    </div>
  );
}

export default Products;
