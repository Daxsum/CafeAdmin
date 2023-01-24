import React, { useState } from "react";
import { Switch } from "@mantine/core";
import { IconPencil } from "@tabler/icons";
import SeeMore from "./seeMore";

function List({
  employees,
  handleEdit,
  handleDelete,
  handleDenied,
  handleVerify,
  setEmployees,
}) {
  const [checked, setChecked] = useState(true);
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: null,
  });
  // const data = (response) => {
  //   for (let i = 0; i <= response.data.data.data.length; i++) {
  //     // setPatients([response.data.data.data[i]]);
  //     console.log(response.data.data.data[i]);
  //   }
  // };
  // data(employees);
  console.log(employees);
  return (
    <div className="contain-table">
      <table className="striped-table">
        <thead>
          <tr>
            <th>No.</th>
            <th>First Name</th>
            <th>Phone</th>
            <th>Problem</th>
            <th>Rased Amount</th>
            <th>Required Amount</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {employees.length > 0 ? (
            employees.map((employee, i) => (
              <tr key={employee._id}>
                <td>{i + 1}</td>
                <td>{employee.userId.firstName}</td>
                <td>{employee.userId.phone}</td>
                <td>{employee.problem}</td>
                <td>{employee.raised}</td>
                <td>{employee.requiredAmount}</td>
                <td>{employee.status}</td>
                <td className="text-right">
                  {/* <button
                    onClick={() => handleVerify(employee._id)}
                    className="btn bg-indigo-500 hover:bg-indigo-600 text-white active:bg-pink-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 m1"
                  >
                    Verfiy
                  </button> */}
                  <SeeMore
                    onclick={() => handleVerify(employee._id)}
                    patient={employee}
                    setEmployees={setEmployees}
                  />
                  {/* <button
                    onClick={() => handleDenied(employee._id)}
                    className="bg-red-500 text-white active:bg-pink-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 m-1"
                  >
                    Denied
                  </button> */}
                </td>
                <td className="text-right">
                  <button
                    onClick={() => handleEdit(employee._id)}
                    className="btn bg-indigo-500 hover:bg-indigo-600 text-white"
                  >
                    <IconPencil />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7}>No hospitals</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default List;
