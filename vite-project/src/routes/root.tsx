import React from 'react';
import { Route, Routes } from 'react-router-dom';
import RegisterContainer from '../containers/RegisterContainer';
import LoginContainer from '../containers/LoginContainer';
import UserManagement from '../containers/UserManagement';
import PostManagement from '../containers/PostManagement';
const Root: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginContainer />} />
      <Route path="/register" element={<RegisterContainer />} />
      <Route path="/users" element={<UserManagement />} />
      <Route path="/posts" element={<PostManagement />} />
    </Routes>
  );
};

export default Root;
