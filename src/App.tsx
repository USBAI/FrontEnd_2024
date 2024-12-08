import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import ConnectStore from './pages/connectstore';
import ApiAccess from './pages/api-access';
import ChatLayout from './components/chat/ChatLayout';
import './i18n/config';
import '@fontsource/space-grotesk/400.css';
import '@fontsource/space-grotesk/500.css';
import '@fontsource/space-grotesk/700.css';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';

function App() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>}>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/chat" element={<ChatLayout />} />
          <Route path="/connectstore/*" element={<ConnectStore />} />
          <Route path="/accessapi/*" element={<ApiAccess />} />
        </Routes>
      </Router>
    </Suspense>
  );
}

export default App;