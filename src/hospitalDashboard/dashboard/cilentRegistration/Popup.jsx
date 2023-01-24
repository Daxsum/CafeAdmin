import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';

import Modal from 'react-bootstrap/Modal';

import { Formik, Form } from "formik";
import TextField from "./TextField";
import Select from "./Select"
import * as Yup from "yup";

function Popup({children}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const validate = Yup.object({
    hospital: Yup.string()
      .oneOf(["minilik", "petros", "pawlos", "Yekatite", "TekurAbesa", "Rasdesta", "Zewditu", "Torhayloc"])
      .required("Required"),

    problem: Yup.string()
      .min(3, "must be more than 3 character")
      .max(13, "must be less than 13 character")
      .required("Required"),
    description: Yup.string()
      .min(100, "must be more than 100 character")
      .max(1000, "must be less than 1000 character")
      .required("Required"),
    // BankName: Yup.string()
    //   .min(3, "must be more than 3 character")
    //   .max(7, "must be less than 7 character")
    //   .required("Required"),
    // BankNumber: Yup.string()
    //   .min(10, "must be more than 10 character")
    //   .max(15, "must be less than 15 character")
    //   .required("Required"),
    // photo: Yup.string().required("Required"),
    kebeleIdNumber: Yup.number().required("Required"),
    patientRecordNumber: Yup.number().required("Required"),
    requiredAmount: Yup.number().required("Required"),
  });

  return (
    <>
     <Formik
        initialValues={{
          hospital: "",
          problem: "",
          discription: "",
          // BankName: "",
          // BankNumber: "",
          // photo: "",
          kebeleIdNumber: "",
          patientRecordNumber: "",
          requiredAmount: "",
        }}
        validationSchema={validate}
      ></Formik>
      <Button variant="primary" onClick={handleShow}>
      Apply
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            
              <Select
                label="hospital you came from"
                name="hospital"
                type="text"
              >
                <option value="">Please select from the options</option>
                <option value="minilik">ሚኒሊክ</option>
                <option value="petros">ቅዱስ ጴጥሮስ</option>
                <option value="pawlos">ቅዱስ ፓውሎስ</option>
                <option value="Yekatite">የካቲት</option>
                <option value="TekurAbesa">ጥቁር አንበሳ</option>
                <option value="Rasdesta">ራስ ደስታ</option>
                <option value="Zewditu">ዘውዲቱ</option>
                <option value="Torhayloc">ጦር ሃይሎች</option>
                <option value=""></option>
                <option value=""></option>
              </Select>
              <TextField label="Disease" name="problem" type="text" />
              <TextField
                multiline
                row="4"
                label="Description of disease"
                name="discription"
                type="text"
              />
              {/* <TextField label="Bank Name" name="BankName" type="text" /> */}
              {/* <TextField label="Account number" name="BankNumber" type="text" /> */}
              <TextField label="kebele Id Number" name="kebeleIdNumber" type="number" />
              <TextField label="patient Record Number" name="patientRecordNumber" type="number" />
              <TextField label="requiredAmount" name="requiredAmount" type="number" />
              
              
              {/* <TextField label="Photo" name="photo" type="file" />
              <TextField label="input kebeleID" name="kebeleId" type="file" />
              <TextField
                label="input hospital record"
                name="hospitalRecord"
                type="file"
              />
              <TextField
                label="input kebele record"
                name="kebeleRecord"
                type="file"
              /> */}
              <button className="btn btn-dark mt-3" type="submit">
                Sign Up
              </button>
           
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Example textarea</Form.Label>
              <Form.Control as="textarea" rows={3} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default Popup;