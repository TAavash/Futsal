import React from 'react';
import useForm from './useForm';

const initialValues = { name: '', email: '' };

const Form = () => {
  const validate = (fieldValues = values) => {
    let tempErrors = { ...errors };
    if ('name' in fieldValues)
      tempErrors.name = fieldValues.name ? "" : "Name is required";
    if ('email' in fieldValues)
      tempErrors.email = fieldValues.email ? "" : "Email is required";
    else if (fieldValues.email)
      tempErrors.email = /\S+@\S+\.\S+/.test(fieldValues.email) ? "" : "Email is invalid";

    setErrors(tempErrors);

    if (fieldValues === values)
      return Object.keys(tempErrors).length === 0;
  };

  const {
    values,
    errors,
    handleChange,
    resetForm,
    setErrors,
  } = useForm(initialValues, true, validate);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log('Form submitted successfully');
      resetForm();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={values.name}
          onChange={handleChange}
        />
        {errors.name && <p>{errors.name}</p>}
      </div>
      <div>
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={values.email}
          onChange={handleChange}
        />
        {errors.email && <p>{errors.email}</p>}
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default Form;
