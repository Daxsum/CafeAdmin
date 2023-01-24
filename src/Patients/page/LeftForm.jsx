import React from "react";
import { Formik, Form } from "formik";
import TextField from "./TextField";
import * as Yup from "yup";
import Axios from "axios";
import "./left.css";

function LeftForm() {
  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a
          href="#"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          <img
            className="w-8 h-8 mr-2"
            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
            alt="logo"
          />
          ልዳን
        </a>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign in to your account
            </h1>

            <div className="width_alter">
              <Formik
                initialValues={{
                  name: "",
                  email: "",
                  phone: "",
                  password: "",
                  passwordConfirm: "",
                  speciality: "",
                  location: "",
                  // hospitalRecord: "",
                }}
                validationSchema={Yup.object({
                  name: Yup.string()
                    .max(15, "must be less than 15 character")
                    .min(2, "must be more than 2 character")
                    .required("Required"),
                  location: Yup.string()
                    .max(20, "must be less than 20 character")
                    .min(2, "must be more than 2 character")
                    .required("Required"),
                  speciality: Yup.string()
                    .max(20, "must be less than 20 character")
                    .min(2, "must be more than 2 character")
                    .required("Required"),
                  email: Yup.string()
                    // .max(15, "must be less than 15 character")
                    .min(2, "must be more than 2 character")
                    .required("Required"),
                  phone: Yup.string()
                    .max(13, "must be less than 13 character")
                    .min(9, "must be 10 character")
                    .required("Required"),
                  password: Yup.string()
                    .max(13, "must be less than 13 character")
                    .min(7, "must be more than 7 character")
                    .required("Required"),
                  passwordConfirm: Yup.string()
                    .max(13, "must be less than 13 character")
                    .min(7, "must be more than 7 character")
                    .oneOf(
                      [Yup.ref("password"), null],
                      "Your passwords do not match."
                    ),
                  // hospitalRecord: Yup.string().required("Required"),
                })}
                onSubmit={(values, actions) => {
                  setTimeout(() => {
                    let axiosConfig = {
                      headers: {
                        "Content-Type": "application/json;charset=UTF-8",
                        Authorization: "*",
                      },
                    };

                    Axios.post(
                      "http://localhost:5000/api/admin/hospital",
                      values
                    )
                      .then((res) => {
                        console.log("RESPONSE RECEIVED: ", res);
                        alert("data inserted sucsessfully");
                      })
                      .catch((err) => {
                        console.log("AXIOS ERROR: ", err);
                      });
                    // Axios.post("http://localhost:5000/api/admin/addHospital ", values, actions)
                    //   .then(response => {
                    //     console.log(response);
                    //     alert("data inserted sucsessfully")
                    //   })
                    //   .catch(error => {
                    //     console.log(error);
                    //   });
                  });
                }}
              >
                {(formik) => (
                  <div className="flex flex-col h-45 ">
                    {console.log(formik)}
                    <Form>
                      <TextField
                        label="Hospital Name"
                        name="name"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.name}
                      />
                      <TextField
                        label="Email"
                        name="email"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.email}
                      />
                      <TextField
                        label="PhoneNumber"
                        name="phone"
                        type="number"
                        onChange={formik.handleChange}
                        value={formik.values.phone}
                      />
                      <TextField
                        label="Password"
                        name="password"
                        type="password"
                        onChange={formik.handleChange}
                        value={formik.values.password}
                      />
                      <TextField
                        label="Confirm Password"
                        name="passwordConfirm"
                        type="password"
                        onChange={formik.handleChange}
                        value={formik.values.passwordConfirm}
                      />
                      <TextField
                        label="speciality"
                        name="speciality"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.speciality}
                      />
                      <TextField
                        label="location"
                        name="location"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.location}
                      />
                      {/* <TextField
                label="Hospital Record"
                name="hospitalRecord"
                type="file"
              /> */}
                      <button className="btn btn-dark mt-3" type="submit">
                        Add
                      </button>
                    </Form>
                  </div>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LeftForm;
