import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import "./index.css";
import Header from "./Header";
import List from "./List";

import Edit from "./Edit";

import Axios from "axios";

function Hospital() {
  const [employees, setEmployees] = useState({});
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  console.log(localStorage.getItem("token"));
  useEffect(() => {
    let config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };
    Axios.get("http://localhost:5000/api/admin/patientRecord", config)
      .then((response) => {
        console.log(response.data.data.data);
        setEmployees(response.data.data.data);
      })
      .catch();
  }, []);
  const handleEdit = (_id) => {
    const [employee] = employees.filter((employee) => employee._id === _id);
    console.log(employee);
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
          text: `${employee.kebeleIdNumber} ${employee.problem}'s data has been deleted.`,
          showConfirmButton: false,
          timer: 1500,
        });
        setEmployees(employees.filter((employee) => employee._id !== id));

        let config = {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        };
        console.log(id);
        try {
          Axios.delete(
            `http://localhost:5000/api/admin/patientRecord/${id}`,
            config
          );
          console.log(employee._id);
        } catch (error) {
          alert(error);
          setEmployees(orginalData);
        }
      }
    });
  };

  return (
    <div className="container">
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
