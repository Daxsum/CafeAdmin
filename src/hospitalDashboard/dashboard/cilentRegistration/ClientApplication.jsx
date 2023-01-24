import React, { useState } from "react";
import { Formik, Form, useFormik } from "formik";
import TextField from "./TextField";
import Select from "./Select";
// import {formData} from "formData";
import * as Yup from "yup";
import axios from "axios";
import "./leftSide.css";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { Card } from "@mantine/core";


function ClientApplication({ userId }) {
  const [photo, setPhoto] = useState(null);
  const [hospital, sethospital] = useState(null);
  const [problem, setProblem] = useState(null);
  const [description, setDescription] = useState(null);
  const [bankName, setBankName] = useState(null);
  const [accountNumber, setAccoutNumber] = useState(null);
  const [kebeleFile, setkebeleFile] = useState(null);
  const [kebeleId, setKebeleId] = useState(null);
  const [hospitalProof, setHospitalProof] = useState(null);
  const [requiredAmount, setRequiredAmout] = useState(null);
  const navigate = useNavigate();
  const onSubmit = (e) => {
    e.preventDefault();

    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Bearer " + sessionStorage.getItem("token")
    );
    myHeaders.append("Cookie", "jwt=" + sessionStorage.getItem("token"));

    console.log(sessionStorage.getItem("token"));

    var formdata = new FormData();

    formdata.append("description", description);
    formdata.append("problem", problem);
    formdata.append("bankName", bankName);
    formdata.append("accountNumber", accountNumber);
    formdata.append("requiredAmount", requiredAmount);
    formdata.append("photo", photo);
    formdata.append("kebeleFile", kebeleFile);
    formdata.append("hospitalProof", hospitalProof);
    formdata.append("kebeleId", kebeleId);
    formdata.append("hospital", "6360e3b22273b11533f9c95c");
    formdata.append("userId", userId);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    fetch("http://localhost:5000/api/hospital/patientRecord", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        navigate("/patientHospital");
        Swal.fire("Good job!", "You've registed Successfuly!", "success");
      })
      .catch((error) => console.log("error", error));
  };

  return (
    
      <Card shadow="sm" p="lg" radius="md" withBorder>
        <form onSubmit={onSubmit}>
         <div className="container">
        <h3 style={{ color: '#1976D2', fontWeight: '100', marginBottom: "20px" }} className="apply">
          Apply for Fundrazing
        </h3>

        <label>Photo</label>
        <input
          label="Photo"
          name="photo"
          type="file"
          onChange={(e) => {
            setPhoto(e.target.files[0]);
          }}
        />

        <label>Hospital</label>
        <select
          label="hospital you came from"
          name="hospital"
          type="select"
          onChange={(choice) => sethospital(choice.value)}
        >
          <option value="">Please select from the options</option>
          <option value="6360e3b22273b11533f9c95c">ሚኒሊክ</option>
          <option value="petros">ቅዱስ ጴጥሮስ</option>
          <option value="pawlos">ቅዱስ ፓውሎስ</option>
          <option value="6363e502cd2f90edc63597f7">የካቲት</option>
          <option value="TekurAbesa">ጥቁር አንበሳ</option>
          <option value="Rasdesta">ራስ ደስታ</option>
          <option value="Zewditu">ዘውዲቱ</option>
          <option value="Torhayloch">ጦር ሃይሎች</option>
          <option value=""></option>
          <option value=""></option>
        </select>

        <label>Disease Name</label>
        <input
          name="problem"
          type="text"
          onChange={(e) => {
            setProblem(e.target.value);
          }}
        />

        <label>Description of Disease</label>
        <textarea
          multiline
          row="4"
          name="description"
          type="text"
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />

        <label>Bank Name</label>
        <input
          name="bankName"
          type="text"
          onChange={(e) => {
            setBankName(e.target.value);
          }}
        />

        <label>Account Number</label>
        <input
          name="accountNumber"
          type="number"
          onChange={(e) => {
            setAccoutNumber(e.target.value);
          }}
        />

        <label>Kebele Proof</label>
        <input
          name="kebeleFile"
          type="file"
          onChange={(e) => {
            setkebeleFile(e.target.files[0]);
          }}
        />

        <label>Kebele Id</label>
        <input
          name="kebeleId"
          type="file"
          onChange={(e) => {
            setKebeleId(e.target.files[0]);
          }}
        />

        <label>Hospital Record</label>
        <input
          name="hospitalProof"
          type="file"
          onChange={(e) => {
            setHospitalProof(e.target.files[0]);
          }}
        />

        <label>Amount of money required</label>
        <input
          name="requiredAmount"
          type="number"
          onChange={(e) => {
            setRequiredAmout(e.target.value);
          }}
        />

        <button className="btn btn-dark mt-3" type="submit" onClick={onSubmit}>
          Apply
        </button>
      </div>
      </form>
      </Card>
     
    
  );
}

export default ClientApplication;
