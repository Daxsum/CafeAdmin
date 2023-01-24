import React, { useState } from "react";
import Swal from "sweetalert2";
import Axios from "axios";
import { Card } from "@mantine/core";

function Edit({ employees, selectedEmployee, setEmployees, setIsEditing }) {
  const id = selectedEmployee._id;

  const [name, setName] = useState(selectedEmployee.userId.firstName);
  const [phone, setPhone] = useState(selectedEmployee.phone);
  const [problem, setProblem] = useState(selectedEmployee.problem);
  const [rased, setRased] = useState(selectedEmployee.rased);
  const [requiredAmount, setRequiredAmount] = useState(
    selectedEmployee.requiredAmount
  );
  // const [date, setDate] = useState(selectedEmployee.date);
  //
  const handleUpdate = (e) => {
    e.preventDefault();

    if (!name || !phone || !problem || !rased || !requiredAmount) {
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
      phone,
      problem,
      rased,
      requiredAmount,
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
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      };

      Axios.put(
        `http://localhost:5000/api/hospital/patientRecord/${id}`,
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
    <Card shadow="lg"  radius="md" withBorder style={{ width: '700px'}}>
      <form onSubmit={handleUpdate}>
        <h1>Edit Hospitals</h1>
        <label htmlFor="firstName">Name</label>
        <input
          id="firstName"
          type="text"
          name="firstName"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="phone">Phone</label>
        <input
          id="phone"
          type="tel"
          name="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <label htmlFor="problem">Problem</label>
        <input
          id="problem"
          type="text"
          name="problem"
          value={problem}
          onChange={(e) => setProblem(e.target.value)}
        />
        <label htmlFor="rased">Rased Amount</label>
        <input
          id="rased"
          type="number"
          name="rased"
          value={rased}
          onChange={(e) => setRased(e.target.value)}
        />
        <label htmlFor="required">Required Amount</label>
        <input
          id="required"
          type="text"
          name="required"
          value={requiredAmount}
          onChange={(e) => setRequiredAmount(e.target.value)}
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
