import React, { useState } from "react";
import Swal from "sweetalert2";

import { Card } from "@mantine/core";
import DropDown from "../comm/dropdown";

function Edit({ employees, selectedEmployee, setEmployees, setIsEditing }) {
  const id = selectedEmployee._id;

  const [name, setName] = useState(selectedEmployee.name);
  const [typeId, setTypeId] = useState(selectedEmployee.type.id);
  console.log(selectedEmployee.type.id);
  const [numberInStock, setNumberInStock] = useState(
    selectedEmployee.numberInStock
  );
  const [price, setPrice] = useState(selectedEmployee.price);
  const [file, setFile] = useState(null);
  // const [date, setDate] = useState(selectedEmployee.date);
  //

  const handleUpdate = (e) => {
    e.preventDefault();

    if (!name || !price || !numberInStock) {
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
    console.log(employee);

    for (let i = 0; i < employees.length; i++) {
      if (employees[i].id === id) {
        employees.splice(i, 1, employee);
        break;
      }
    }
    const orginalData = employees;

    e.preventDefault();

    // var myHeaders = new Headers();
    // myHeaders.append("Authorization", sessionStorage.getItem("token"));
    // myHeaders.append("Content-Type", "multipart/form-data");

    console.log(sessionStorage.getItem("token"));

    var formdata = new FormData();

    formdata.append("name", name);
    formdata.append("typeId", typeId);
    formdata.append("numberInStock", numberInStock);
    formdata.append("price", price);
    formdata.append("file", file);

    var requestOptions = {
      method: "PUT",
      headers: {
        Authorization: sessionStorage.getItem("token"),
      },
      body: formdata,
      // redirect: "follow",
    };

    fetch(`http://localhost:5000/api/products/Update/${id}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setEmployees(employees);
        setIsEditing(false);
        Swal.fire({
          icon: "success",
          title: "Updated!",
          text: `${employee.name} ${employee.price}'s data has been updated.`,
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        setError(error.config.message);
        setEmployees(orginalData);
        Swal.error("ops!", `${error.config.message}`, "please try again!");
      });

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

          <span className=" md:flex lg:w-full  jestify-center space-x-2 ">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label htmlFor="numberInStock">numberInStock</label>
            <input
              id="numberInStock"
              type="number"
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
          </span>
          <span className="md:flex space-x-4">
            <label htmlFor="file">Upload Image</label>
            <input
              name="file"
              type="file"
              onChange={(e) => {
                setFile(e.target.files[0]);
              }}
            />
            <DropDown typeId={typeId} setTypeId={setTypeId} />
          </span>
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
