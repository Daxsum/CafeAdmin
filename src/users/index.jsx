import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import "./list.css";
import Header from "./Header";
import List from "./List";
import Edit from "./Edit";
import Axios from "axios";
import Filter from "../partials/actions/filterOptions";
import Add from "./Add";

function Users() {
  const [users, setUsers] = useState({});
  const [selectedUser, setSelectedUser] = useState(null);
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
    Axios.get(`${import.meta.env.VITE_API}/api/users/getAll`, config)
      .then(({ data }) => {
        setUsers(data);
        setIsLoading(false);
      })
      .catch();
  });
  const handleEdit = (_id) => {
    const [user] = users.filter((user) => user._id === _id);

    setSelectedUser(user);
    setIsEditing(true);
  };
  //

  const handleDelete = (id) => {
    const orginalData = users;
    Swal.fire({
      icon: "warning",
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
    }).then((result) => {
      if (result.value) {
        const [user] = users.filter((user) => user._id === id);
        Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: `${user.userName}'s data has been deleted.`,
          showConfirmButton: false,
          timer: 1500,
        });
        setUsers(users.filter((user) => user._id !== id));

        let config = {
          headers: {
            Authorization: sessionStorage.getItem("token"),
          },
        };

        try {
          Axios.delete(
            `${import.meta.env.VITE_API}/api/users/Delete/${id}`,
            config
          );
        } catch (error) {
          alert(error);
          setUsers(orginalData);
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
            users={users}
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
          users={users}
          selectedUser={selectedUser}
          setUsers={setUsers}
          setIsEditing={setIsEditing}
        />
      )}
      {isAdding && (
        <Add setIsAdding={setIsAdding} users={users} setUsers={setUsers} />
      )}
    </div>
  );
}

export default Users;
