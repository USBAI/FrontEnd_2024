import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ApiAccessLanding from './ApiAccessLanding';
import CreateApiAccount from './CreateApiAccount';

const ApiAccess = () => {
  return (
    <Routes>
      <Route path="/" element={<ApiAccessLanding />} />
      <Route path="/create-account" element={<CreateApiAccount />} />
    </Routes>
  );
};

export default ApiAccess;