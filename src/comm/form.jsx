import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./input";

// to use this for you only need to import Joi form joi-browser also don't
// forget to install joi-browser in your system for more info searc for
// "npm Joi".
//  then ,you only have to defined schema and define you data as
//  empity object on the state,finaly you can do what ever you
//   want after submition the form
//  by defining doSubmit method  and do not forget inherited this component! for more info check
//  this git ripo https://github.com/Daxsum/Vidly  on form and login component
class Form extends Component {
  state = { data: {}, error: {} };
  validate = () => {
    const { error } = Joi.validate(this.state.data, this.schema, {
      abortEarly: false,
    });

    if (!error) return null;
    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };
  handleSubmit = (e) => {
    e.preventDefault();
    const errors = this.validate();

    this.setState({ errors: errors || {} });
    if (errors) return;
    this.doSubmit(); //define  doSubmit() for what to do after submition  eg: calling a surver
  };
  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };
  handleChange = (e) => {
    const errors = { ...this.state.errors };
    const errorMassage = this.validateProperty(e.currentTarget);
    if (errorMassage) errors[e.currentTarget.name] = errorMassage;
    else delete errors[e.currentTarget.name];

    const data = { ...this.state.data };
    data[e.currentTarget.name] = e.currentTarget.value;
    this.setState({ data, errors });
  };
  renderInput(name, label, type = "text") {
    const { errors, data } = this.state;
    return (
      <Input
        onChange={this.handleChange}
        type={type}
        name={name}
        value={data[name]}
        label={label}
        error={errors[name]}
      />
    );
  }
  renderButton(label) {
    return (
      <button
        disabled={this.validate()}
        className={
          "w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
        }
        variant="primary"
      >
        {label}
      </button>
    );
  }
}

export default Form;
