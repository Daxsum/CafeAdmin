import React, { useState, useRef, useEffect } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { Card } from "@mantine/core";
import DropDown from "../comm/dropdown";

function Add({ setIsAdding, types, setTypes }) {
  const [name, setName] = useState("");

  const handleAdd = async (e) => {
    e.preventDefault();

    if (!name) {
      return Swal.fire({
        icon: "error",
        title: "Error!",
        text: "All fields are required.",
        showConfirmButton: true,
      });
    }

    const orginalData = types;
    try {
      let config = {
        headers: {
          Authorization: sessionStorage.getItem("token"),
        },
      };
      await axios.post(
        `${import.meta.env.VITE_API}/api/types/Add`,
        {
          name: name,
        },
        config
      );
      setTypes(types);
      setIsAdding(false);
    } catch (error) {
      setTypes(orginalData);
      Swal.fire("ops!", "please try again!");
    }
  };

  return (
    <div className="small-container">
      <br />
      <Card shadow="lg" radius="md" withBorder style={{ width: "700px" }}>
        <form onSubmit={handleAdd}>
          <h1 style={{ color: "#1976D2", fontWeight: "100" }}>Add Catagory</h1>

          <span className=" md:flex lg:w-full  jestify-center space-x-2 space-y-2 ">
            <label htmlFor="name"> Name</label>
            <input
              id="name"
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </span>
          <div style={{ marginTop: "30px" }}>
            <input
              className="btn bg-orange-500 hover:bg-orange-600 text-white"
              type="submit"
              value="Add"
            />
            <input
              style={{ marginLeft: "12px" }}
              className="btn bg-red-500 hover:bg-red-600 text-white"
              type="button"
              value="Cancel"
              onClick={() => setIsAdding(false)}
            />
          </div>
        </form>
      </Card>
    </div>
  );
}
//
export default Add;
