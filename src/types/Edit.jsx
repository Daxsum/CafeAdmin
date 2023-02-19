import React, { useState } from "react";
import swal from "sweetalert";
import axios from "axios";

import { Card } from "@mantine/core";
import DropDown from "../comm/dropdown";

function Edit({ types, selectedType, setTypes, setIsEditing }) {
  const id = selectedType._id;

  const [name, setName] = useState(selectedType.name);

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!name) {
      return swal("ops!", "empity values are not accepted!", "error");
    }

    const type = {
      name,
    };

    for (let i = 0; i < types.length; i++) {
      if (types[i].id === id) {
        types.splice(i, 1, type);
        break;
      }
    }
    const orginalData = types;

    try {
      let config = {
        headers: {
          Authorization: sessionStorage.getItem("token"),
        },
      };
      await axios.put(
        `${import.meta.env.VITE_API}/api/types/Update/${id}`,
        {
          name: name,
        },
        config
      );
      setTypes(types);
      setIsEditing(false);
    } catch (error) {
      setTypes(orginalData);
      swal("ops!", "please try again!", "error");
    }
  };

  return (
    <div className="small-container">
      <br />
      <Card shadow="lg" radius="md" withBorder style={{ width: "700px" }}>
        <form onSubmit={handleUpdate}>
          <h1 style={{ color: "#fc9403", fontWeight: "100" }}>Edit Catagory</h1>

          <span className=" md:flex lg:w-full  jestify-center space-x-2 ">
            <label htmlFor="name">Name</label>
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
              value="Update"
            />
            <input
              style={{ marginLeft: "12px" }}
              className="btn bg-red-500 hover:bg-red-600 text-white"
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
