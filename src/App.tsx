import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ChatLayout from './components/chat/ChatLayout';
import ConnectStore from './pages/connectstore';
import ApiAccess from './pages/api-access';
import LandingPage from '../project/src/App';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/chat" element={<ChatLayout />} />
        <Route path="/connectstore/*" element={<ConnectStore />} />
        <Route path="/accessapi/*" element={<ApiAccess />} />
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </Router>
  );
};

export default App;