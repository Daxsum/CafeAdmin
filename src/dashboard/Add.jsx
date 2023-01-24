import React, { useState, useRef, useEffect } from "react";
import Swal from "sweetalert2";
import Axios from "axios";

function Add({ setIsAdding }) {
  const [employees, setEmployees] = useState({});
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [speciality, setSpeciality] = useState("");
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
    Axios.get("http://localhost:5000/api/admin/hospital", config)
      .then((response) => {
        console.log(response.data.data.data);
        setEmployees(response.data.data.data);
      })
      .catch();
  }, []);

  const handleAdd = (e) => {
    e.preventDefault();
    if (
      !name ||
      !location ||
      !email ||
      !phone ||
      !speciality ||
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
      name,
      location,
      email,
      phone,
      speciality,
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
        `http://localhost:5000/api/admin/hospital`,
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
      text: `${name} ${location}'s data has been created.`,
      showConfirmButton: false,
      timer: 1500,
    });
  };

  return (
    <div className="small-container">
      <form onSubmit={handleAdd}>
        <h1 style={{ color: "#1976D2", fontWeight: "100"}}>Add Hospitals</h1>
        <label htmlFor="name">Name of Hospital</label>
        <input
          id="name"
          type="text"
          ref={textInput}
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="location">Location</label>
        <input
          id="location"
          type="text"
          name="location"
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
        <label htmlFor="phone">Phone</label>
        <input
          id="phone"
          type="tel"
          name="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <label htmlFor="speciality">Speciality</label>
        <input
          id="speciality"
          type="text"
          name="speciality"
          value={speciality}
          onChange={(e) => setSpeciality(e.target.value)}
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
