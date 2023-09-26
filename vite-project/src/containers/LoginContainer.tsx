import React from 'react';
import { Formik, FormikProps, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import LoginComponent from '../component/LoginComponent';
import authService from '../api/authSevice';
import axios, {AxiosError} from 'axios';
interface FormValues {
  email: string;
  password: string;
}

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string().required('Password is required'),
});

const LoginContainer: React.FC = () => {
  const [loading, setLoading] = React.useState(false);

  const handleLogin = async (
    values: FormValues,
    formikHelpers: FormikHelpers<FormValues>
  ) => {
    setLoading(true);
    console.log("Dữ liệu được gửi đi",values)
    try {
      const response = await authService.login(values);
      console.log(response);
      // Handle token or perform other actions with the response
    } catch (error) {
      console.log(error)
      if (axios.isAxiosError(error)) {
        const axiosError: AxiosError = error; // Gán kiểu
        console.error('Có lỗi xảy ra:', axiosError.response?.data);
      } else {
        console.error('Có lỗi xảy ra:', error);
      }
    }
    setLoading(false);
    formikHelpers.setSubmitting(false);
  };

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={validationSchema}
      onSubmit={handleLogin}
    >
      {(formikProps: FormikProps<FormValues>) => (
        <LoginComponent loading={loading} formikProps={formikProps} />
      )}
    </Formik>
  );
};

export default LoginContainer;
