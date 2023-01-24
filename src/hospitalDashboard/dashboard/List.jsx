import React, { useState } from 'react';
import { Switch } from '@mantine/core';
import { IconClipboardPlus } from '@tabler/icons';

function List({ employees, handleEdit, handleDelete }) {
  const [checked, setChecked] = useState(false);
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: null,
  });

  return (
    <div className='contain-table'>
      <table className='striped-table'>
        <thead>
          <tr>
            <th>No.</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {employees.length > 0 ? (
            employees.map((employee, i) => (
              <tr key={employee._id}>
                <td>{i + 1}</td>
                <td>{employee.firstName}</td>
                <td>{employee.lastName}</td>
                <td>{employee.email}</td>
                <td>{employee.phone}</td>
                <td>Not Submited</td>

                <td className='text-right'>
                  {/* <Switch
                    checked={checked}
                    onChange={(event) =>
                      setChecked(event.currentTarget.checked)
                    }
                  /> */}

                  <button
                    onClick={() => handleDelete(employee._id)}
                    className='btn bg-blue-500 hover:bg-blue-600 text-white'
                  >
                    <IconClipboardPlus /> Add Patient Record
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7}>No hospitals yet</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default List;
