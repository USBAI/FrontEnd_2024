import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Header from './layout/Header';
import Sidebar from './layout/Sidebar';
import ResizeHandle from './layout/ResizeHandle';
import ChatWindow from './ChatWindow';
import SearchOverlay from '../search/SearchOverlay';
import ProfilePage from './ProfilePage';

const MIN_SIDEBAR_WIDTH = 280;
const MAX_SIDEBAR_WIDTH = 600;

const ChatLayout = () => {
  const [isNavOpen, setIsNavOpen] = useState(window.innerWidth >= 768);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [expandedItem, setExpandedItem] = useState<number | null>(null);
  const [sidebarWidth, setSidebarWidth] = useState(320);
  const [isResizing, setIsResizing] = useState(false);
  const resizeRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setIsNavOpen(window.innerWidth >= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing) return;

      let newWidth = e.clientX;
      if (newWidth < MIN_SIDEBAR_WIDTH) newWidth = MIN_SIDEBAR_WIDTH;
      if (newWidth > MAX_SIDEBAR_WIDTH) newWidth = MAX_SIDEBAR_WIDTH;
      
      setSidebarWidth(newWidth);
    };

    const handleMouseUp = () => {
      setIsResizing(false);
      document.body.style.cursor = 'default';
      document.body.style.userSelect = 'auto';
    };

    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing]);

  const startResizing = () => {
    setIsResizing(true);
    document.body.style.cursor = 'ew-resize';
    document.body.style.userSelect = 'none';
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-pink-50 via-white to-blue-50 text-gray-900 overflow-hidden">
      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isNavOpen && window.innerWidth < 768 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/10 backdrop-blur-sm z-40"
            onClick={() => setIsNavOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 flex flex-col relative">
        <Header 
          isNavOpen={isNavOpen}
          setIsNavOpen={setIsNavOpen}
          setIsProfileOpen={setIsProfileOpen}
          setIsSearchOpen={setIsSearchOpen}
        />

        <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
        <ChatWindow />

        {/* Profile Page */}
        <AnimatePresence>
          {isProfileOpen && (
            <ProfilePage isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} />
          )}
        </AnimatePresence>
      </div>

      {/* Sidebar */}
      <AnimatePresence>
        {isNavOpen && (
          <motion.aside
            initial={{ x: -320 }}
            animate={{ x: 0 }}
            exit={{ x: -320 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-0 left-0 h-screen bg-white/80 backdrop-blur-xl border-r border-gray-200 z-50 flex flex-col overflow-hidden"
            style={{ width: `${sidebarWidth}px` }}
          >
            <div className="p-4">
              <div className="flex items-center justify-between">
                <svg width="40" height="40" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="22" height="22" rx="11" fill="url(#paint0_linear_0_1)"/>
                  <path d="M0.128418 12.32L21.6595 12.8032V12.8032C21.5887 15.9615 18.9709 18.4643 15.8126 18.3934L5.71863 18.1669C2.56036 18.096 0.0575377 15.4783 0.128418 12.32V12.32Z" fill="url(#paint1_linear_0_1)"/>
                  <rect x="9" y="3" width="11" height="11" rx="5.5" fill="white"/>
                  <defs>
                    <linearGradient id="paint0_linear_0_1" x1="4.51" y1="2.53" x2="18.26" y2="19.69" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#EFF0FF"/>
                      <stop offset="0.55" stopColor="#C9B8FC"/>
                      <stop offset="0.986587" stopColor="#FFBAF6"/>
                    </linearGradient>
                    <linearGradient id="paint1_linear_0_1" x1="12.0269" y1="18.3714" x2="12.6321" y2="12.2372" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#E7B4FF" stopOpacity="0.22"/>
                      <stop offset="1" stopColor="#8330E8"/>
                    </linearGradient>
                  </defs>
                </svg>
                <button
                  onClick={() => setIsNavOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="h-5 w-5 text-gray-500 hover:text-gray-700" />
                </button>
              </div>
            </div>

            <Sidebar
              isOpen={isNavOpen}
              expandedItem={expandedItem}
              setExpandedItem={setExpandedItem}
              navigate={navigate}
            />

            <ResizeHandle startResizing={startResizing} />
          </motion.aside>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChatLayout;