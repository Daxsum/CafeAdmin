import { Formik } from "formik";
import React from "react";
import { ErrorMessage, useField } from "formik";
import "./left.css";

function TextField({ label, ...props }) {
  const [field, meta] = useField(props);
  return (
    <div>
      <div className="w-72 h-4 m-1 text-white">
        <label htmlFor={field.name}>{label}:</label>
      </div>
      <div className="w-72 h-6 m-1  ">
        <input
          className={`new form-control ${
            meta.touched && meta.error && "is-invalid"
          }`}
          {...field}
          {...props}
        />{" "}
      </div>
      <div className="errors">
        <ErrorMessage name={field.name} />
      </div>
    </div>
  );
}

export default TextField;
