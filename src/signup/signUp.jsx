import Joi from "joi-browser";
import React from "react";
// import { Link, Redirect } from "react-router-dom";
import register from "../services/adminRegistrationService";
import Form from "../comm/form";

class RegisterForm extends Form {
  state = {
    data: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
      passwordConfirm: "",
    },
    errors: {},
  };
  schema = {
    firstName: Joi.string().required().label("firstName"),
    lastName: Joi.string().required().label("lastName"),
    email: Joi.string().required().label("email"),
    phone: Joi.number().required().label("email"),
    password: Joi.string().required().label("Password"),
    passwordConfirm: Joi.string().required().label("passwordConfirm"),
  };

  doSubmit = async () => {
    //call a surver
    try {
      await register(this.state.data);
      console.log("submitted");
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.email = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    // if (auth.getCurrentUser()) return <Redirect to="/home" />;
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
              <form
                onSubmit={this.handleSubmit}
                className="space-y-4 md:space-y-6"
                action="#"
              >
                <div>
                  {" "}
                  {this.renderInput("firstName", "First Name")}
                  {this.renderInput("lastName", "Last Name")}
                  {this.renderInput("email", "email")}
                  {this.renderInput("phone", "Phone")}
                  {this.renderInput("password", "Password", "password")}
                  {this.renderInput(
                    "passwordConfirm",
                    "Confirm Password",
                    "password"
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="remember"
                        aria-describedby="remember"
                        type="checkbox"
                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                        required=""
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label
                        htmlFor="remember"
                        className="text-gray-500 dark:text-gray-300"
                      >
                        Remember me
                      </label>
                    </div>
                  </div>
                  <a
                    href="#"
                    className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    do you have alrady an account? login
                  </a>
                </div>
                {this.renderButton("SignUp")}
              </form>
            </div>
          </div>
        </div>
      </section>
      // <div>
      //   <div style={{ margin: "200px" }}>
      //     <div className="my_row">
      //       <div>
      //         <img
      //           alt="Signup"
      //           style={{ height: "600px", width: "600px" }}
      //           src={
      //             process.env.PUBLIC_URL +
      //             "/access-control-system-abstract-concept_335657-3180.webp"
      //           }
      //         />
      //       </div>
      // <form onSubmit={this.handleSubmit}>
      //   <h1 style={{ margin: "20px" }}>SignUp</h1>
      // {this.renderInput("firstName", "First Name")}
      // {this.renderInput("lastName", "Last Name")}
      // {this.renderInput("email", "email")}
      // {this.renderInput("phone", "Phone")}
      // {this.renderInput("password", "Password", "password")}
      // {this.renderInput(
      //   "passwordConfirm",
      //   "Confirm Password",
      //   "password"
      // )}

      // {this.renderButton("SignUp")}
      //       </form>
      //     </div>
      //   </div>
      // </div>
    );
  }
}

export default RegisterForm;
