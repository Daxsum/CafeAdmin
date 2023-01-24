import React, { useState } from "react";
import Swal from "sweetalert2";
import Axios from "axios";
import { Card } from "@mantine/core";

function Edit({ employees, selectedEmployee, setEmployees, setIsEditing }) {
  const id = selectedEmployee._id;

  const [kebeleIdNumber, setKebeleIdNumber] = useState(
    selectedEmployee.kebeleIdNumber
  );
  const [status, setStatus] = useState(selectedEmployee.status);
  const [patientRecordNumber, setPatientRecordNumber] = useState(
    selectedEmployee.patientRecordNumber
  );
  const [requiredAmount, setRequiredAmount] = useState(
    selectedEmployee.requiredAmount
  );
  const [problem, setProblem] = useState(selectedEmployee.problem);
  // const [date, setDate] = useState(selectedEmployee.date);
  //
  const handleUpdate = (e) => {
    e.preventDefault();

    if (
      !kebeleIdNumber ||
      !status ||
      !patientRecordNumber ||
      !requiredAmount ||
      !problem
    ) {
      return Swal.fire({
        icon: "error",
        title: "Error!",
        text: "All fields are required.",
        showConfirmButton: true,
      });
    }

    const employee = {
      id,
      kebeleIdNumber,
      status,
      patientRecordNumber,
      requiredAmount,
      problem,
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
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      };

      Axios.put(
        `http://localhost:5000/api/admin/patient/${id}`,
        employee,
        config
      );
      setEmployees(employees);
      setIsEditing(false);
      Swal.fire({
        icon: "success",
        title: "Updated!",
        text: `${employee.kebeleIdNumber} ${employee.problem}'s data has been updated.`,
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      alert(error);
      setEmployees(orginalData);
    }
  };

  return (
    <div className="small-container">
      <br />
    <Card shadow="lg"  radius="md" withBorder style={{ width: '700px'}}>
      <form onSubmit={handleUpdate}>
        <h1 style={{ color: "#1976D2", fontWeight: "100"}}>Edit patients</h1>
        <label htmlFor="kebeleIdNumber">kebele Id</label>
        <input
          id="kebeleIdNumber"
          type="text"
          name="kebeleIdNumber"
          value={kebeleIdNumber}
          onChange={(e) => setKebeleIdNumber(e.target.value)}
        />
        <label htmlFor="status">Status</label>
        <input
          id="status"
          type="text"
          name="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        />
        <label htmlFor="patientRecordNumber">Patient Record Number</label>
        <input
          id="patientRecordNumber"
          type="text"
          name="patientRecordNumber"
          value={patientRecordNumber}
          onChange={(e) => setPatientRecordNumber(e.target.value)}
        />
        <label htmlFor="salary">Funding Goal</label>
        <input
          id="equiredAmount"
          type="number"
          name="requiredAmount"
          value={requiredAmount}
          onChange={(e) => setRequiredAmount(e.target.value)}
        />
        <label htmlFor="problem">Case</label>
        <input
          id="problem"
          type="text"
          name="problem"
          value={problem}
          onChange={(e) => setProblem(e.target.value)}
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
