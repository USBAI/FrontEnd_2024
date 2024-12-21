import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DashboardLayout from './layout/DashboardLayout';
import Overview from './pages/Overview';
import Store from './pages/Store';
import Products from './pages/Products';
import Orders from './pages/Orders';
import Marketing from './pages/Marketing';
import Settings from './pages/Settings';

const CreateStoreDashboard = () => {
  return (
    <DashboardLayout>
      <Routes>
        <Route path="/" element={<Overview />} />
        <Route path="/store" element={<Store />} />
        <Route path="/products" element={<Products />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/marketing" element={<Marketing />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </DashboardLayout>
  );
};

export default CreateStoreDashboard;