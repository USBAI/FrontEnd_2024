import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ConnectStoreLanding from './ConnectStoreLanding';
import RegisterPage from './auth/RegisterPage';
import LoginPage from './auth/LoginPage';
import Dashboard from './dashboard';

// Auth Guard Component
const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const storeToken = localStorage.getItem('store_token');
  if (!storeToken) {
    return <Navigate to="/connectstore/login" replace />;
  }
  return <>{children}</>;
};

const ConnectStore = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<ConnectStoreLanding />} />
      <Route path="/create-account" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />

      {/* Protected Dashboard Routes */}
      <Route path="/dashboard/*" element={
        <PrivateRoute>
          <Dashboard />
        </PrivateRoute>
      } />

      {/* Catch-all route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default ConnectStore;