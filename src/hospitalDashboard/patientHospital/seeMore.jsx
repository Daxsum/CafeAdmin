import React, { useState } from "react";
// import Button from "react-bootstrap/Button";
// import Modal from "react-bootstrap/Modal";
// import { Modal } from "@mantine/core";
import axios from "axios";

// function SeeMore({ patient }) {
//   const [show, setShow] = useState(false);
//   const [amount, setAmount] = useState(0);

//   const handleDonate = (id) => {
//     try {
//       const Amount = {
//         amount: amount,
//       };
//       const header = {
//         Authorization: "Bearer " + sessionStorage.getItem("token"),
//       };
//       axios.put(`http://localhost:5000/api/users/record/${id}`, Amount, header);
//       setShow(false);
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   const handleClose = () => setShow(false);
//   const handleShow = () => {
//     setShow(true);
//   };

//   return (
//     <>
//       <div className="w-200 ">
//         <Modal withCloseButton={false}>
//           Modal without header, press escape or click on overlay to close
//           <Button variant="primary m-1" onClick={handleShow}>
//             Verify
//           </Button>
//           {/* <Modal show={show} onHide={handleClose}> */}
//           {/* <Modal.Header closeButton> */}
//           {/* <Modal.Title>{patient.userId.firstName}</Modal.Title> */}
//           {/* </Modal.Header> */}
//           <h5>{patient.description}</h5>
//           <h3>Evidences</h3>
//           <h5>Hospital Proof</h5>
//           <img
//             src={`http://localhost:5000/img/file/${patient.hospitalProof}`}
//             alt="hospitalProof"
//           />
//           <h5>Kebele File</h5>
//           <img
//             src={`http://localhost:5000/img/file/${patient.kebeleFile}`}
//             alt="patient.kebeleFile"
//           />
//           <h5>Kebele ID</h5>
//           <img
//             src={`http://localhost:5000/img/file/${patient.kebeleId}`}
//             alt="hospitalProof"
//           />
//           <div className="input-group mb-3">
//             <h5>Enter the Amount Of Money You want To Donate</h5>
//             <span className="input-group-text" id="inputGroup-sizing-default">
//               Amount($)
//             </span>
//             <input
//               type="number"
//               className="form-control"
//               aria-label="Sizing example input "
//               aria-describedby="inputGroup-sizing-default"
//               onChange={(e) => {
//                 setAmount(e.target.value);
//               }}
//             />
//             <Button variant="secondary" onClick={handleClose}>
//               Close
//             </Button>
//             <Button
//               variant="primary"
//               onClick={() => {
//                 handleDonate(patient._id);
//               }}
//             >
//               Donate
//             </Button>
//           </div>
//         </Modal>
//       </div>
//     </>
//   );
// }

// // render(<Example />);
import Swal from "sweetalert2";
import { useDisclosure, useCounter } from "@mantine/hooks";
import { Modal, Button, Group, Text, Badge } from "@mantine/core";
import Axios from "axios";
function SeeMore({ patient, setEmployees }) {
  const [amount, setAmount] = useState(0);
  const handleDenied = (id) => {
    console.log(id);

    let config = {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    };

    Axios.put(
      `http://localhost:5000/api/hospital/patientDecline/${id}`,
      config
    ).then((response) => {
      // console.log(response.data.data.data.userId.firstName);
      setEmployees(response.data.data.data);
      window.location.reload(false);
    });
  };
  const handleVerify = (id) => {
    console.log(id);
    try {
      const orginalData = patient;
      let config = {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      };

      Axios.put(
        `http://localhost:5000/api/hospital/patientVerification/${id}`,
        config
      );
      setEmployees(patient);

      Swal.fire({
        icon: "success",
        title: "Updated!",
        text: "data has been Validated.",
        showConfirmButton: true,
        timer: 1500,
      });
    } catch (error) {
      alert(error);
      setEmployees(orginalData);
    }
    window.location.reload(false);
  };
  const handleDonate = (id) => {
    try {
      const Amount = {
        amount: amount,
      };
      const header = {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      };
      axios.put(`http://localhost:5000/api/users/record/${id}`, Amount, header);
      setShow(false);
    } catch (error) {
      console.log(error);
    }
  };
  const [opened, { close, open }] = useDisclosure(false);
  const [count, { increment, decrement }] = useCounter(3, { min: 0 });

  const badges = Array(count)
    .fill(0)
    .map((_, index) => <Badge key={index}>Badge {index}</Badge>);

  return (
    <>
      <Modal opened={opened} onClose={close} size="auto">
        <h5>{patient.description}</h5>
        <h3>Evidences</h3>
        <h5>Hospital Proof</h5>
        <img
          src={`http://localhost:5000/img/file/${patient.hospitalProof}`}
          alt="hospitalProof"
        />
        <h5>Kebele File</h5>
        <img
          src={`http://localhost:5000/img/file/${patient.kebeleFile}`}
          alt="patient.kebeleFile"
        />
        <h5>Kebele ID</h5>
        <img
          src={`http://localhost:5000/img/file/${patient.kebeleId}`}
          alt="hospitalProof"
        />

        <Group mt="xl">
          <button
            className="btn bg-indigo-500 hover:bg-indigo-600 text-white active:bg-pink-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 m1"
            variant="outline"
            onClick={() => handleVerify(patient._id)}
          >
            Verify
          </button>
          <button
            className="bg-red-500 text-white active:bg-pink-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 m-1"
            variant="outline"
            onClick={() => handleDenied(patient._id)}
          >
            Denied
          </button>
        </Group>
      </Modal>
      <Group position="center">
        <button
          className="bg-red-500 text-white active:bg-pink-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 m-1"
          onClick={open}
        >
          Confirmation
        </button>
      </Group>
    </>
  );
}
export default SeeMore;
