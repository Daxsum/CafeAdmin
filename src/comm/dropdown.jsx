import React, { useState, useEffect } from "react";
import Axios from "axios";
const DropDown = ({ typeId, setTypeId }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    let config = {
      headers: {
        Authorization: sessionStorage.getItem("token"),
      },
    };
    Axios.get("http://localhost:5000/api/types/getAll")
      .then(({ data }) => {
        setItems(data);
      })
      .catch();
  }, []);
  const handleChange = (e) => {
    e.target.value ? setTypeId(e.target.value) : setTypeId(typeId);
  };
  //
  return (
    <div>
      <label>Type</label>

      <select
        className="w-48"
        label="Type"
        name="type"
        type="select"
        onChange={handleChange}
      >
        {items.map((item) => (
          <option key={item._id} value={item._id}>
            {item.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DropDown;
