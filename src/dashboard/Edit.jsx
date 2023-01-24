import React, { useState } from "react";
import Swal from "sweetalert2";
import Axios from "axios";
import { Card } from "@mantine/core";

function Edit({ employees, selectedEmployee, setEmployees, setIsEditing }) {
  const id = selectedEmployee._id;

  const [name, setName] = useState(selectedEmployee.name);
  const [location, setLocation] = useState(selectedEmployee.location);
  const [email, setEmail] = useState(selectedEmployee.email);
  const [phone, setPhone] = useState(selectedEmployee.phone);
  const [speciality, setSpeciality] = useState(selectedEmployee.speciality);
  // const [date, setDate] = useState(selectedEmployee.date);
  //

  const handleUpdate = (e) => {
    e.preventDefault();

    if (!name || !location || !email || !phone || !speciality) {
      return Swal.fire({
        icon: "error",
        title: "Error!",
        text: "All fields are required.",
        showConfirmButton: true,
      });
    }

    const employee = {
      id,
      name,
      location,
      email,
      phone,
      speciality,
    };

    for (let i = 0; i < employees.length; i++) {
      if (employees[i].id === id) {
        employees.splice(i, 1, employee);
        break;
      }
    }
    try {
      const orginalData = employees;
      let config = {
        headers: {
          Authorization: sessionStorage.getItem("token"),
        },
      };

      Axios.put(
        `http://localhost:5000/api/admin/hospital/${id}`,
        employee,
        config
      );
      setEmployees(employees);
      setIsEditing(false);
      Swal.fire({
        icon: "success",
        title: "Updated!",
        text: `${employee.name} ${employee.location}'s data has been updated.`,
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      alert(error);
      setEmployees(orginalData);
    }
    window.location.reload(false);
  };

  return (
    <div className="small-container">
      <br />
      <Card shadow="lg" radius="md" withBorder style={{ width: "700px" }}>
        <form onSubmit={handleUpdate}>
          <h1 style={{ color: "#1976D2", fontWeight: "100" }}>
            Edit Hospitals
          </h1>
          <label htmlFor="firstName">Name</label>
          <input
            id="firstName"
            type="text"
            name="firstName"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label htmlFor="lastName">Location</label>
          <input
            id="lastName"
            type="text"
            name="lastName"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="salary">Phone</label>
          <input
            id="salary"
            type="tel"
            name="salary"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <label htmlFor="salary">Speciality</label>
          <input
            id="salary"
            type="text"
            name="salary"
            value={speciality}
            onChange={(e) => setSpeciality(e.target.value)}
          />

          <div style={{ marginTop: "30px" }}>
            <input
              className="btn bg-indigo-500 hover:bg-indigo-600 text-white"
              type="submit"
              value="Update"
            />
            <input
              style={{ marginLeft: "12px" }}
              className="btn bg-indigo-500 hover:bg-indigo-600 text-white"
              type="button"
              value="Cancel"
              onClick={() => setIsEditing(false)}
            />
          </div>
        </form>
      </Card>
    </div>
  );
}

export default Edit;
