import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ApiAccessLanding from './ApiAccessLanding';
import CreateApiAccount from './CreateApiAccount';
import Dashboard from './dashboard';
import LoginPage from './auth/LoginPage';

// Auth Guard Component
const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const userUuid = localStorage.getItem('user_uuid');
  if (!userUuid) {
    return <Navigate to="/accessapi/login" replace />;
  }
  return <>{children}</>;
};

const ApiAccess = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<ApiAccessLanding />} />
      <Route path="/create-account" element={<CreateApiAccount />} />
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

export default ApiAccess;