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
                <svg width="40" height="40" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="100" height="100" rx="50" fill="black"/>
                  <rect x="42" y="15" width="50" height="50" rx="25" fill="white"/>
                  <path d="M1.5 62H98.5V62C98.2174 65.3914 95.3823 68 91.9792 68H8.02079C4.61764 68 1.78261 65.3914 1.5 62V62Z" fill="white"/>
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