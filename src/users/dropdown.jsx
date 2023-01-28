import React, { useState, useEffect } from "react";
import Axios from "axios";
const DropDown = ({ role, setRole }) => {
  const [items, setItems] = useState([
    { name: "table" },
    { name: "admin" },
    { name: "chef" },
    { name: "cashier" },
  ]);

  const handleChange = (e) => {
    e.target.value ? setRole(e.target.value) : setRole(role);
  };
  //
  return (
    <div>
      <label>Role</label>

      <select
        className="w-48"
        label="Role"
        name="role"
        type="select"
        onChange={handleChange}
      >
        {items.map((item) => (
          <option key={item.name} value={item.name}>
            {item.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DropDown;
