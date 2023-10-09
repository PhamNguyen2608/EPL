import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Formik, FormikProps, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import LoginComponent from '../component/LoginComponent';
import { login } from '../store/slices/authSlice';
import { AppDispatch } from '../store/index';

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
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();


  const handleLogin = async (
    values: FormValues,
    formikHelpers: FormikHelpers<FormValues>
  ) => {
    setLoading(true);
    setErrorMessage(null);
  
    try {
      const action = login(values);
      const resultAction = await dispatch(action);
      
      if (login.rejected.match(resultAction)) {
        console.log('Login failed:', resultAction.error);
        setErrorMessage('Login unsuccessful. Please try again.');
      } else if (login.fulfilled.match(resultAction)) {
        console.log('Login thành công:', resultAction.payload);
        navigate('/user');  
      }
      
    } catch (error) {
      console.error('Có lỗi xảy ra:', error);
      setErrorMessage('Đăng nhập không thành công. Vui lòng thử lại.');
    }
  
    setLoading(false);
    formikHelpers.setSubmitting(false);
  };
  
  console.log("ErrorMessage",errorMessage)
  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={validationSchema}
      onSubmit={handleLogin}
    >
      {(formikProps: FormikProps<FormValues>) => (
        <LoginComponent loading={loading} formikProps={formikProps} errorMessage={errorMessage} />
      )}
    </Formik>
  );
};

export default LoginContainer;
