import React, { FC } from 'react';
import Register from '../component/RegisterComponent';
import { RegisterFormValues } from '../types/RegisterTypes';

const RegisterContainer: FC = () => {
  const handleSubmit = (values: RegisterFormValues) => {
   
    console.log(values);
  };

  return <Register handleSubmit={handleSubmit} />;
};

export default RegisterContainer;
