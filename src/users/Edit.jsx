import React, { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { Card } from "@mantine/core";
import DropDown from "./dropdown";

function Edit({ users, selectedUser, setUsers, setIsEditing }) {
  const id = selectedUser._id;

  const [firstName, setFirstName] = useState(selectedUser.firstName);
  const [lastName, setLastName] = useState(selectedUser.lastName);
  const [userName, setUserName] = useState(selectedUser.userName);
  const [email, setEmail] = useState(selectedUser.email);
  const [role, setRole] = useState(selectedUser.role);
  const [password, setPassword] = useState(selectedUser.password);

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!firstName || !lastName || !userName || !role || !password) {
      return Swal.fire({
        icon: "error",
        title: "Error!",
        text: "All fields are required.",
        showConfirmButton: true,
      });
    }

    const user = {
      id,
      firstName,
      lastName,
      userName,
      email,
      role,
      password,
    };

    for (let i = 0; i < users.length; i++) {
      if (users[i].id === id) {
        users.splice(i, 1, user);
        break;
      }
    }
    const orginalData = users;

    e.preventDefault();

    try {
      let config = {
        headers: {
          Authorization: sessionStorage.getItem("token"),
        },
      };
      await axios.put(
        `http://localhost:5000/api/users/Update/${id}`,
        {
          firstName: firstName,
          lastName: lastName,
          userName: userName,
          email: email,
          role: role,
          password: password,
        },
        config
      );
      setUsers(users);
      setIsEditing(false);
    } catch (error) {
      setUsers(orginalData);
      Swal.fire("ops!", "please try again!");
    }
  };

  return (
    <div className="small-container">
      <br />
      <Card shadow="lg" radius="md" withBorder style={{ width: "700px" }}>
        <form onSubmit={handleUpdate}>
          <h1 style={{ color: "#fc9403", fontWeight: "100" }}>
            Users Control Panel
          </h1>

          <span className=" md:flex lg:w-full  jestify-center space-x-2 ">
            <label htmlFor="firstName" className="whitespace-nowrap">
              First Name
            </label>
            <input
              id="firstName"
              type="text"
              name="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <label htmlFor="lastName" className="whitespace-nowrap">
              Last Name
            </label>
            <input
              id="lastName"
              type="text"
              name="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </span>
          <span className="md:flex lg:w-full  jestify-center space-x-2">
            <label htmlFor="userName">Username</label>
            <input
              id="userName"
              type="text"
              name="userName"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
            <label htmlFor="email">Email</label>
            <input
              name="email"
              type="email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </span>
          <span className="md:flex lg:w-full  jestify-center space-x-4 space-y-14 h-10">
            <DropDown role={role} setRole={setRole} />
            <label htmlFor="password">Password</label>
            <input
              name="password"
              type="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </span>
          <div className=" my-8 space-x-2 py-10">
            <input
              className="btn bg-orange-500 hover:bg-orange-600 text-white"
              type="submit"
              value="Update"
            />
            <input
              className="btn bg-red-500 hover:bg-red-600 text-white ml-4  "
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
