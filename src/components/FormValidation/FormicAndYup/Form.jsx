// npm install formik yup
// useFormik from Formik for managing form state and handling submissions.
// Yup for defining a schema and validating the form data.

import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email format').required('Email is required'),
});

const Form = () => {
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log('Form submitted successfully', values);
    },
  });

  return (
    <div className='flex justify-center my-16 py-10 '>
    <form onSubmit={formik.handleSubmit}  className='text-white text-lg p-20 rounded-md  bg-blue-950'>
    <h1 className='text-3xl blue'>Contact Form</h1>

      <div  className='my-5 text-red-600'> 
        <label className='text-xl text-white'>Name:</label> <br/>
        <input
          type="text"
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className='border-2 border-white rounded-md p-2'
        />
        {formik.touched.name && formik.errors.name && <p>{formik.errors.name}</p>}
      </div>
      <div  className='my-5 text-red-600'>
        <label  className='text-xl text-white'>Email</label> <br/>
        <input
          type="email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className='border-2 border-white rounded-md p-2'
        />
        {formik.touched.email && formik.errors.email && <p>{formik.errors.email}</p>}
      </div>
      <button className='w-full border-2 border-x-blue-50 shadow-lg rounded-lg p-2 px-5 hover:bg-white hover:text-blue-950' type="submit">Submit</button>
    </form>
    </div>
  );
};

export default Form;
