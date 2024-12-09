import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from './DashboardLayout';
import DashboardHome from './DashboardHome';
import APIUsage from './APIUsage';
import Analytics from './Analytics';
import APIKeys from './APIKeys';
import Documentation from './Documentation';
import Settings from './Settings';

const Dashboard = () => {
  return (
    <DashboardLayout>
      <Routes>
        <Route path="/" element={<DashboardHome />} />
        <Route path="/usage" element={<APIUsage />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/keys" element={<APIKeys />} />
        <Route path="/docs" element={<Documentation />} />
        <Route path="/settings" element={<Settings />} />
        
        {/* Catch-all route */}
        <Route path="*" element={<Navigate to="/accessapi/dashboard" replace />} />
      </Routes>
    </DashboardLayout>
  );
};

export default Dashboard;