import React, { useState, useRef, useEffect } from "react";

import Axios from "axios";
import { Card } from "@mantine/core";
import DropDown from "../comm/dropdown";
import swal from "sweetalert";
function Add({ setIsAdding, products, setProducts }) {
  const [name, setName] = useState("");
  const [typeId, setTypeId] = useState("");
  const [numberInStock, setNumberInStock] = useState(0);
  const [price, setPrice] = useState(0);
  const [file, setFile] = useState(null);

  const handleAdd = (e) => {
    e.preventDefault();

    if (!name || !price || !numberInStock) {
      return swal("ops!", "All fields are required!", "error");
    }

    const orginalData = products;
    var formdata = new FormData();
    formdata.append("name", name);
    formdata.append("typeId", typeId);
    formdata.append("numberInStock", numberInStock);
    formdata.append("price", price);
    formdata.append("file", file);
    var requestOptions = {
      method: "POST",
      headers: {
        Authorization: sessionStorage.getItem("token"),
      },
      body: formdata,
      // redirect: "follow",
    };
    fetch(`${import.meta.env.VITE_API}/api/products/Add`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setProducts(products);
        setIsAdding(false);
        swal("Good Job!", "Product Added Successfully!", "success");
      })
      .catch((error) => {
        setProducts(orginalData);
        swal("ops!", `${error.config.message}`, "please try again!");
      });
  };

  return (
    <div className="small-container">
      <br />
      <Card shadow="lg" radius="md" withBorder style={{ width: "700px" }}>
        <form onSubmit={handleAdd}>
          <h1 style={{ color: "#1976D2", fontWeight: "100" }}>Add Foods</h1>

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
