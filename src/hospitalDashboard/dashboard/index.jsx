import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import "./list.css";
import Header from "./Header";
import List from "./List";

import Edit from "./Edit";

import Axios from "axios";
import Filter from "../../hospitalFile/actions/filterOptions";
import ClientApplication from "./cilentRegistration/ClientApplication";
function Hospital() {
  const [employees, setEmployees] = useState({});
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isRegster, setIsRegster] = useState(false);
  const [parameter, setParameter] = useState("user");
  const [userId, setUserId] = useState("");
  console.log(localStorage.getItem("token"));
  useEffect(() => {
    let config = {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    };
    Axios.get(`http://localhost:5000/api/hospital/${parameter}`, config).then(
      (response) => {
        console.log(response);
        setEmployees(response.data.data.data);
      }
    );
  }, []);
  const handleEdit = (_id) => {
    const [employee] = employees.filter((employee) => employee._id === _id);
    console.log(employee);
    setSelectedEmployee(employee);
    setIsEditing(true);
  };
  const handleAddPatientRecord = (id) => {
    console.log(id);
    setUserId(id);
    setIsRegster(true);
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
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    };
    Axios.get(`http://localhost:5000/api/admin/${parameter}`, config).then(
      (response) => {
        console.log(response.data.data.data);
        setEmployees(response.data.data.data);
      }
    );
  };

  return (
    <div className="container">
      {!isRegster && <Filter handleFilter={handleFilter} />}
      {/* List */}
      {isRegster && <ClientApplication userId={userId} />}
      {!isAdding && !isEditing && !isRegster && (
        <>
          <Header setIsAdding={setIsAdding} />

          <List
            employees={employees}
            handleEdit={handleEdit}
            handleDelete={handleAddPatientRecord}
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
