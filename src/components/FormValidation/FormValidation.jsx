import React, { useState } from "react";

const FormValidation = () => {
  const [formValues, setFormValues] = useState({ name: "", email: "",});
  // const[name,setName]=useState('')
  // const[email,setEmail]=useState('')
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    // destructuring the event
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

    const validate = () => {
      let tempErrors = {  };
      if (!formValues.name) tempErrors.name = "Name is required";
      if (!formValues.email) {
        tempErrors.email = "Email is required";
      } else if (!/\S+@\S+\.\S+/.test(formValues.email)) {
        tempErrors.email = "Email is invalid";
      }
      setErrors(tempErrors);
      return Object.keys(tempErrors).length === 0;
    };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("Form submitted successfully");
      alert("Form submitted successfully");
      //setFormValues({ name: "", email: "" });
      // handle form submission
    }
  };

  return (
    <div className="flex justify-center my-5">
      <form onSubmit={handleSubmit} className="  ">
        <div>
          <label for="name" className="text-lg text-blue-950 font-bold">
            Name:
          </label>
          <br />
          <input
            className="border-2 border-blue-950 p-2 rounded-lg"
            type="text"
            id="name"
            name="name"
            value={formValues.name}
            onChange={handleChange}
          />
          {errors.name && <p>{errors.name}</p>}
        </div>
        <div>
          <label for="email" className="text-lg text-blue-950 font-bold">
            Email:
          </label>
          <br />
          <input
            className="border-2 border-blue-950 p-2 rounded-lg"
            type="email"
            id="email"
            name="email"
            value={formValues.email}
            onChange={handleChange}
          />
          {errors.email && <p>{errors.email}</p>}
        </div>
        <button
          className="border-0 rounded shadow-lg bg-blue-950 text-white p-2 px-5 m-3 "
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default FormValidation;
