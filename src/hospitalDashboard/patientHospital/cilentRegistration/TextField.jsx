import { Formik } from 'formik'
import React from 'react';
import { ErrorMessage, useField } from 'formik';
// import './hospitalReg/left.css'


function TextField({label, ...props}) {
    const[field, meta] = useField(props)
  return (
    <div className='mb-2'>
        <label htmlFor={field.name}>{label}:</label>
        <input 
          className={`new form-control ${meta.touched && meta.error && 'is-invalid'}`}
          {...field} {...props}
        />
        <div className='errors'>
        <ErrorMessage name={field.name}/>
        </div>
        
    </div>
  )
}

export default TextField
