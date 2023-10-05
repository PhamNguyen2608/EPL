import React from 'react';
import { Route, Routes } from 'react-router-dom';
import RegisterContainer from '../containers/RegisterContainer';
import LoginContainer from '../containers/LoginContainer';
import UserManagement from '../containers/UserManagement';
const Root: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginContainer />} />
      <Route path="/register" element={<RegisterContainer />} />
      <Route path="/user" element={<UserManagement />} />
    </Routes>
  );
};

export default Root;
