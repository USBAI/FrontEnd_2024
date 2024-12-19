import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ChatWindow from './ChatWindow';
import SearchOverlay from '../search/SearchOverlay';
import ProfilePage from './ProfilePage';
import Header from './layout/Header';
import Sidebar from './layout/Sidebar';
import ResizeHandle from './layout/ResizeHandle';

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
    <div className="flex h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-black text-white overflow-hidden">
      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isNavOpen && window.innerWidth < 768 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40"
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
            className="fixed top-0 left-0 h-screen bg-gray-800/50 backdrop-blur-xl border-r border-white/10 z-50 flex flex-col overflow-hidden"
            style={{ width: `${sidebarWidth}px` }}
          >
            <div className="p-6 border-b border-white/10">
              <div className="flex items-center justify-between">
                <img
                  src="https://www.kluret.se/static/media/kluret_wt.ad13e882d6d5f566612d2b35479039fd.svg"
                  alt="Kluret"
                  className="h-8"
                />
                <button
                  onClick={() => setIsNavOpen(false)}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <X className="h-5 w-5 text-white/70 hover:text-white" />
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