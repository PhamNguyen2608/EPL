import React, { FC } from 'react';
import Register from '../component/RegisterComponent';
import { RegisterFormValues } from '../types/RegisterTypes';

const RegisterContainer: FC = () => {
  const handleSubmit = (values: RegisterFormValues) => {
    // Xử lý logic đăng ký ở đây
    console.log(values);
  };

  return <Register handleSubmit={handleSubmit} />;
};

export default RegisterContainer;
