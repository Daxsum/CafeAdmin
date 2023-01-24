import React, { useState, useRef, useEffect } from "react";
import Swal from "sweetalert2";
import Axios from "axios";

function Add({ setIsAdding }) {
  const [employees, setEmployees] = useState({});
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const textInput = useRef(null);

  useEffect(() => {
    textInput.current.focus();
    let config = {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    };
    Axios.get("http://localhost:5000/api/hospital/patientRecord", config)
      .then((response) => {
        console.log(response);
        setEmployees(response.data.data.data);
      })
      .catch();
  }, []);

  const handleAdd = (e) => {
    e.preventDefault();
    if (
      !firstName ||
      !lastName ||
      !email ||
      !phone ||
      !password ||
      !passwordConfirm
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
      firstName,
      lastName,
      email,
      phone,
      password,
      passwordConfirm,
    };
    try {
      let config = {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      };

      Axios.post(
        `http://localhost:5000/api/hospital/user`,
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
      text: `${firstName} ${lastName}'s data has been created.`,
      showConfirmButton: false,
      timer: 1500,
    });
  };

  return (
    <div className="small-container">
      <form onSubmit={handleAdd}>
        <h1 style={{ color: "#1976D2", fontWeight: "100"}}>Add New User</h1>
        <label htmlFor="firstName">First Name</label>
        <input
          id="firstName"
          type="text"
          ref={textInput}
          name="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <label htmlFor="lastName">Last Name</label>
        <input
          id="lastName"
          type="text"
          name="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="phone">Phone</label>
        <input
          id="phone"
          type="tel"
          name="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <label htmlFor="passwordConfirm">passwordConfirm</label>
        <input
          id="passwordConfirm"
          type="password"
          name="passwordConfirm"
          value={passwordConfirm}
          onChange={(e) => setPasswordConfirm(e.target.value)}
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
