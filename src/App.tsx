import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import ConnectStore from './pages/connectstore';
import ApiAccess from './pages/api-access';
import ChatLayout from './components/chat/ChatLayout';
import AboutPage from './pages/about/AboutPage';
import TechnologyPage from './pages/technology/TechnologyPage';
import AISearchPage from './pages/ai-search/AISearchPage';
import SuccessStoriesPage from './pages/success-stories/SuccessStoriesPage';
import ProductUpdatesPage from './pages/updates/ProductUpdatesPage';
import AIImprovementsPage from './pages/updates/AIImprovementsPage';
import ReleaseNotesPage from './pages/updates/ReleaseNotesPage';
import RoadmapPage from './pages/updates/RoadmapPage';
import RetailerIntegrationPage from './pages/partners/RetailerIntegrationPage';
import APIDocumentationPage from './pages/partners/APIDocumentationPage';
import PartnerProgramPage from './pages/partners/PartnerProgramPage';
import PartnerSuccessStoriesPage from './pages/partners/PartnerSuccessStoriesPage';
import './i18n/config';
import '@fontsource/space-grotesk/400.css';
import '@fontsource/space-grotesk/500.css';
import '@fontsource/space-grotesk/700.css';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';

// Auth Guard Component
const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const userUuid = localStorage.getItem('user_uuid');
  if (!userUuid) {
    return <Navigate to="/accessapi/login" replace />;
  }
  return <>{children}</>;
};

function App() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>}>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/chat" element={<ChatLayout />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/technology" element={<TechnologyPage />} />
          <Route path="/ai-search" element={<AISearchPage />} />
          <Route path="/success-stories" element={<SuccessStoriesPage />} />
          
          {/* Updates Routes */}
          <Route path="/updates/product" element={<ProductUpdatesPage />} />
          <Route path="/updates/ai" element={<AIImprovementsPage />} />
          <Route path="/updates/releases" element={<ReleaseNotesPage />} />
          <Route path="/updates/roadmap" element={<RoadmapPage />} />
          
          {/* Partners Routes */}
          <Route path="/partners/retailers" element={<RetailerIntegrationPage />} />
          <Route path="/partners/api" element={<APIDocumentationPage />} />
          <Route path="/partners/program" element={<PartnerProgramPage />} />
          <Route path="/partners/success" element={<PartnerSuccessStoriesPage />} />
          
          {/* Store Routes */}
          <Route path="/connectstore/*" element={<ConnectStore />} />
          
          {/* API Access Routes - Some protected */}
          <Route path="/accessapi/*" element={<ApiAccess />} />

          {/* Catch-all route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </Suspense>
  );
}

export default App;