import React, { useState } from "react";
import Swal from "sweetalert2";
import Axios from "axios";
import { Card } from "@mantine/core";
import DropDown from "../comm/dropdown";

function Edit({ employees, selectedEmployee, setEmployees, setIsEditing }) {
  const id = selectedEmployee._id;

  const [name, setName] = useState(selectedEmployee.name);
  const [typeId, setTypeId] = useState(selectedEmployee.typeId);
  const [numberInStock, setNumberInStock] = useState(
    selectedEmployee.numberInStock
  );
  const [price, setPrice] = useState(selectedEmployee.price);
  const [file, setFile] = useState(selectedEmployee.file);
  // const [date, setDate] = useState(selectedEmployee.date);
  //

  const handleUpdate = (e) => {
    e.preventDefault();

    if (!name || !typeId || !price || !numberInStock) {
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
      typeId,
      numberInStock,
      price,
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
          Authorization: sessionStorage.getItem("token"),
        },
      };

      Axios.put(
        `http://localhost:5000/api/products/Update/${id}`,
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
    // window.location.reload(false);
  };
  //   let optionItems = obj.array.map((item) =>
  //   <option key={item}>{item}</option>
  // );

  return (
    <div className="small-container">
      <br />
      <Card shadow="lg" radius="md" withBorder style={{ width: "700px" }}>
        <form onSubmit={handleUpdate}>
          <h1 style={{ color: "#1976D2", fontWeight: "100" }}>Edit Foods</h1>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <DropDown />
          <label htmlFor="numberInStock">numberInStock</label>
          <input
            id="numberInStock"
            type="numberInStock"
            name="numberInStock"
            value={numberInStock}
            onChange={(e) => setNumberInStock(e.target.value)}
          />
          <label htmlFor="price">price</label>
          <input
            id="price"
            type="number"
            name="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <label htmlFor="file">Speciality</label>

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
