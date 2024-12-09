import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Store, Network, Search, User, ChevronDown, Rocket, Code, Zap, Globe, Shield, ArrowRight, ArrowLeft } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
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

  const navItems = [
    {
      icon: Store,
      label: 'Connect your online store',
      description: 'Integrate your e-commerce platform with our AI-powered search',
      gradient: 'from-pink-500 to-purple-500',
      path: '/connectstore',
      details: [
        {
          icon: Rocket,
          title: 'Quick Integration',
          description: 'Set up in minutes with our easy-to-use API'
        },
        {
          icon: Globe,
          title: 'Multi-Platform Support',
          description: 'Works with Shopify, WooCommerce, and more'
        },
        {
          icon: Shield,
          title: 'Secure & Reliable',
          description: 'Enterprise-grade security for your data'
        }
      ]
    },
    {
      icon: Network,
      label: 'B2B API Partner',
      description: 'Access our product data API for enterprise solutions',
      gradient: 'from-blue-500 to-indigo-500',
      path: '/accessapi',
      details: [
        {
          icon: Code,
          title: 'RESTful API',
          description: 'Modern API with comprehensive documentation'
        },
        {
          icon: Zap,
          title: 'High Performance',
          description: 'Process thousands of requests per second'
        },
        {
          icon: Shield,
          title: 'Enterprise Ready',
          description: 'SLA guarantees with 24/7 support'
        }
      ]
    }
  ];

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
        {/* Floating Icons */}
        <div className={`absolute top-4 right-4 z-30 flex items-center gap-5 transition-opacity duration-300 ${
          isNavOpen && window.innerWidth < 768 ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsProfileOpen(true)}
            className="text-white/70 hover:text-white transition-colors"
          >
            <User className="h-6 w-6" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsSearchOpen(true)}
            className="text-white/70 hover:text-white transition-colors"
          >
            <Search className="h-6 w-6" />
          </motion.button>
        </div>

        {!isNavOpen && (
          <motion.button
            onClick={() => setIsNavOpen(true)}
            className="absolute top-4 left-4 z-30"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Menu className="h-6 w-6 text-white/70 hover:text-white transition-colors" />
          </motion.button>
        )}

        <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
        <ChatWindow />

        {/* Profile Page */}
        <AnimatePresence>
          {isProfileOpen && (
            <ProfilePage isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} />
          )}
        </AnimatePresence>
      </div>

      {/* Sidebar - Now positioned above main content */}
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
                <div className="flex items-center gap-4">
                  <Link 
                    to="/"
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                  >
                    <ArrowLeft className="h-5 w-5 text-white/70 hover:text-white" />
                  </Link>
                  <img
                    src="https://www.kluret.se/static/media/kluret_wt.ad13e882d6d5f566612d2b35479039fd.svg"
                    alt="Kluret"
                    className="h-8"
                  />
                </div>
                <button
                  onClick={() => setIsNavOpen(false)}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <X className="h-5 w-5 text-white/70 hover:text-white" />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar">
              <div className="p-6 space-y-4">
                {navItems.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="group"
                  >
                    <div
                      onClick={() => setExpandedItem(expandedItem === index ? null : index)}
                      className="w-full relative bg-gray-700/50 hover:bg-gray-700/70 p-4 rounded-xl transition-all duration-300 cursor-pointer"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 to-purple-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 blur-xl" />
                      <div className="relative">
                        <div className="flex items-start gap-4">
                          <div className={`p-3 rounded-lg bg-gradient-to-r ${item.gradient}`}>
                            <item.icon className="h-5 w-5" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h3 className="font-medium">{item.label}</h3>
                              <motion.div
                                animate={{ rotate: expandedItem === index ? 180 : 0 }}
                                transition={{ duration: 0.2 }}
                              >
                                <ChevronDown className="h-5 w-5 text-gray-400" />
                              </motion.div>
                            </div>
                            <p className="text-sm text-gray-400 mt-1">{item.description}</p>
                          </div>
                        </div>

                        <AnimatePresence>
                          {expandedItem === index && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="mt-4 space-y-3"
                            >
                              {item.details.map((detail, detailIndex) => (
                                <motion.div
                                  key={detailIndex}
                                  initial={{ opacity: 0, y: -10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ delay: detailIndex * 0.1 }}
                                  className="flex items-start gap-3 bg-gray-800/50 p-3 rounded-lg"
                                >
                                  <detail.icon className="h-5 w-5 text-gray-400 mt-0.5" />
                                  <div>
                                    <h4 className="text-sm font-medium">{detail.title}</h4>
                                    <p className="text-xs text-gray-400">{detail.description}</p>
                                  </div>
                                </motion.div>
                              ))}

                              <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  navigate(item.path);
                                }}
                                className="w-full mt-4 px-4 py-3 bg-gradient-to-r from-pink-500 to-purple-500 rounded-lg text-white font-medium flex items-center justify-between group hover:shadow-lg transition-all duration-300"
                              >
                                <span>Get Started</span>
                                <ArrowRight className="h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
                              </motion.button>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Resize Handle */}
            <div
              ref={resizeRef}
              className="absolute top-0 right-0 w-1 h-full cursor-ew-resize group"
              onMouseDown={startResizing}
            >
              <div className="absolute inset-y-0 right-0 w-4 group-hover:bg-blue-500/20 transition-colors -mr-2" />
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChatLayout;