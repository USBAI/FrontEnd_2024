import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ApiAccessLanding from './ApiAccessLanding';
import CreateApiAccount from './CreateApiAccount';
import Dashboard from './dashboard/Dashboard';
import APIUsage from './dashboard/APIUsage';
import Analytics from './dashboard/Analytics';
import APIKeys from './dashboard/APIKeys';
import Documentation from './dashboard/Documentation';
import Settings from './dashboard/Settings';

const ApiAccess = () => {
  return (
    <Routes>
      <Route path="/" element={<ApiAccessLanding />} />
      <Route path="/create-account" element={<CreateApiAccount />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/dashboard/usage" element={<APIUsage />} />
      <Route path="/dashboard/analytics" element={<Analytics />} />
      <Route path="/dashboard/keys" element={<APIKeys />} />
      <Route path="/dashboard/docs" element={<Documentation />} />
      <Route path="/dashboard/settings" element={<Settings />} />
    </Routes>
  );
};

export default ApiAccess;