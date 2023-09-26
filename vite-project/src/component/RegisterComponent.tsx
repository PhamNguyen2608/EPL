import React, { FC } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { RegisterProps } from '../types/RegisterTypes';

const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email format').required('Required'),
  phoneNumber: Yup.string()
    .matches(/^[0-9]+$/, "Must be only digits")
    .max(11, 'Must be exactly 11 digits')
    .required('Required'),
  password: Yup.string().min(8, 'Minimum 8 characters').required('Required'),
});

const Register: FC<RegisterProps> = ({ handleSubmit }) => {
  return (
    <Formik
      initialValues={{
        email: '',
        phoneNumber: '',
        password: ''
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {() => (
        <Form className="bg-white p-6 rounded-lg shadow-lg w-96 mx-auto">
          {/* Email input */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600 mb-2" htmlFor="email">
              Email Address
            </label>
            <Field
              id="email"
              name="email"
              type="email"
              className="p-2 w-full border rounded-md"
            />
            <ErrorMessage name="email" component="div" className="text-red-500 text-xs" />
          </div>

          {/* Phone Number input */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600 mb-2" htmlFor="phoneNumber">
              Phone Number
            </label>
            <Field
              id="phoneNumber"
              name="phoneNumber"
              type="tel"
              className="p-2 w-full border rounded-md"
            />
            <ErrorMessage name="phoneNumber" component="div" className="text-red-500 text-xs" />
          </div>

          {/* Password input */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600 mb-2" htmlFor="password">
              Password
            </label>
            <Field
              id="password"
              name="password"
              type="password"
              className="p-2 w-full border rounded-md"
            />
            <ErrorMessage name="password" component="div" className="text-red-500 text-xs" />
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:border-blue-700 focus:ring focus:ring-blue-200 active:bg-blue-700"
          >
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default Register;
