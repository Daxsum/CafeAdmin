import React, { useState, useRef, useEffect } from "react";
import Swal from "sweetalert2";
import Axios from "axios";

function Add({ setIsAdding }) {
  const [employees, setEmployees] = useState({});
  const [kebeleIdNumber, setKebeleIdNumber] = useState("");
  const [status, setStatus] = useState("");
  const [patientRecordNumber, setPatientRecordNumber] = useState("");
  const [requiredAmount, setRequiredAmount] = useState("");
  const [problem, setProblem] = useState("");

  const textInput = useRef(null);

  useEffect(() => {
    textInput.current.focus();
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

  const handleAdd = (e) => {
    e.preventDefault();
    if (
      !problem ||
      !requiredAmount ||
      !patientRecordNumber ||
      !status ||
      !kebeleIdNumber
    ) {
      return Swal.fire({
        icon: "error",
        title: "Error!",
        text: "All fields are required.",
        showConfirmButton: true,
      });
    }

    const id = employees.length + 1;
    const newEmployee = {
      id,
      kebeleIdNumber,
      status,
      patientRecordNumber,
      requiredAmount,
      problem,
    };
    try {
      let config = {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      };

      Axios.post(
        "http://localhost:5000/api/hospital/patientRecord",
        newEmployee,
        config
      );
      console.log("inserted");
    } catch (error) {
      alert(error);
    }
    // employees.push(newEmployee);
    setEmployees(employees);
    setIsAdding(false);

    Swal.fire({
      icon: "success",
      title: "Added!",
      text: `${kebeleIdNumber} ${problem}'s data has been created.`,
      showConfirmButton: false,
      timer: 1500,
    });
    window.location.reload(false);
  };

  return (
    <div className="small-container">
      <form onSubmit={handleAdd}>
        <h1 style={{ color: "#1976D2", fontWeight: "100"}}>Add Patients</h1>
        <label htmlFor="kebeleIdNumber">Kebele Id</label>
        <input
          id="kebeleIdNumber"
          type="text"
          ref={textInput}
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
        <label htmlFor="requiredAmount">Required Amount</label>
        <input
          id="requiredAmount"
          type="number"
          name="requiredAmount"
          value={requiredAmount}
          onChange={(e) => setRequiredAmount(e.target.value)}
        />
        <label htmlFor="problem">Problem</label>
        <input
          id="problem"
          type="text"
          name="problem"
          value={problem}
          onChange={(e) => setProblem(e.target.value)}
        />

        <div style={{ marginTop: "30px" }}>
          <input type="submit" value="Add" />
          <input
            style={{ marginLeft: "12px" }}
            className="muted-button"
            type="button"
            value="Cancel"
            onClick={() => setIsAdding(false)}
          />
        </div>
      </form>
    </div>
  );
}
//
export default Add;
