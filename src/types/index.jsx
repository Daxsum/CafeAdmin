import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import "./list.css";
import Header from "./Header";
import List from "./List";
import Edit from "./Edit";
import Axios from "axios";
import Filter from "../partials/actions/filterOptions";
import Add from "./Add";

function Types() {
  const [types, setTypes] = useState({});
  const [selectedType, setSelectedType] = useState(null);
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
    Axios.get(`${import.meta.env.VITE_API}/api/types/getAll`)
      .then(({ data }) => {
        setTypes(data);
        setIsLoading(false);
      })
      .catch();
  });
  const handleEdit = (_id) => {
    const [type] = types.filter((type) => type._id === _id);
    setSelectedType(type);
    setIsEditing(true);
  };
  //

  const handleDelete = (id) => {
    const orginalData = types;
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const [type] = types.filter((type) => type._id === id);
        swal("Deleted!", "the item is deleted!", "success");
        setTypes(types.filter((type) => type._id !== id));

        let config = {
          headers: {
            Authorization: sessionStorage.getItem("token"),
          },
        };

        try {
          Axios.delete(
            `${import.meta.env.VITE_API}/api/types/Delete/${id}`,
            config
          );
        } catch (error) {
          swal("ops!", "please try again!", "error");
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
            types={types}
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
          types={types}
          selectedType={selectedType}
          setTypes={setTypes}
          setIsEditing={setIsEditing}
        />
      )}
      {isAdding && (
        <Add setIsAdding={setIsAdding} types={types} setTypes={setTypes} />
      )}
    </div>
  );
}

export default Types;
