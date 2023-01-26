import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import "./list.css";
import Header from "./Header";
import List from "./List";
import Edit from "./Edit";
import Axios from "axios";
import Filter from "../partials/actions/filterOptions";

function Hospital() {
  const [employees, setEmployees] = useState({});
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [parameter, setParameter] = useState("getAll");

  useEffect(() => {
    let config = {
      headers: {
        Authorization: sessionStorage.getItem("token"),
      },
    };
    Axios.get("http://localhost:5000/api/products/getAll")
      .then(({ data }) => {
        setEmployees(data);
      })
      .catch();
  });
  const handleEdit = (_id) => {
    const [employee] = employees.filter((employee) => employee._id === _id);

    setSelectedEmployee(employee);
    setIsEditing(true);
  };
  //

  const handleDelete = (id) => {
    const orginalData = employees;
    Swal.fire({
      icon: "warning",
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
    }).then((result) => {
      if (result.value) {
        const [employee] = employees.filter((employee) => employee._id === id);
        Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: `${employee.name} ${employee.location}'s data has been deleted.`,
          showConfirmButton: false,
          timer: 1500,
        });
        setEmployees(employees.filter((employee) => employee._id !== id));

        let config = {
          headers: {
            Authorization: sessionStorage.getItem("token"),
          },
        };

        try {
          Axios.delete(
            `http://localhost:5000/api/admin/hospital/${id}`,
            config
          );
        } catch (error) {
          alert(error);
          setEmployees(orginalData);
        }
      }
    });
  };
  const handleFilter = (searchData) => {
    if (searchData === "heart") {
      setParameter("hospital?speciality=heart");
    } else if (searchData === "general") {
      setParameter("hospital?speciality=general");
    } else if (searchData === "kidney") {
      setParameter("hospital?speciality=kidney");
    } else {
      setParameter("hospital");
    }

    let config = {
      headers: {
        Authorization: sessionStorage.getItem("token"),
      },
    };
    Axios.get("http:/localhost:5000/api/products/getAll", config).then(
      (response) => {
        setEmployees(response.data);
      }
    );
  };

  return (
    <div className="container">
      <Filter handleFilter={handleFilter} />
      {/* List */}

      {!isAdding && !isEditing && (
        <>
          <Header setIsAdding={setIsAdding} />

          <List
            employees={employees}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        </>
      )}

      {/* Edit */}
      {isEditing && (
        <Edit
          employees={employees}
          selectedEmployee={selectedEmployee}
          setEmployees={setEmployees}
          setIsEditing={setIsEditing}
        />
      )}
    </div>
  );
}

export default Hospital;
