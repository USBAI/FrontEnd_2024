import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ConnectStoreLanding from './ConnectStoreLanding';
import RegisterPage from './auth/RegisterPage';
import LoginPage from './auth/LoginPage';
import Dashboard from './dashboard';

const ConnectStore = () => {
  return (
    <Routes>
      <Route path="/" element={<ConnectStoreLanding />} />
      <Route path="/create-account" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/dashboard/*" element={<Dashboard />} />
    </Routes>
  );
};

export default ConnectStore;