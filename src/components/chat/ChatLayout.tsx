import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Store, Network, Search, User, ChevronDown, Rocket, Code, Zap, Globe, Shield, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ChatWindow from './ChatWindow';
import SearchOverlay from '../search/SearchOverlay';

const ChatLayout = () => {
  const [isNavOpen, setIsNavOpen] = useState(window.innerWidth >= 768);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [expandedItem, setExpandedItem] = useState<number | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setIsNavOpen(window.innerWidth >= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
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
      {/* Mobile Overlay */}
      <AnimatePresence>
        {isNavOpen && window.innerWidth < 768 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsNavOpen(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <AnimatePresence>
        {isNavOpen && (
          <motion.aside
            initial={{ x: -320 }}
            animate={{ x: 0 }}
            exit={{ x: -320 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed md:static top-0 left-0 h-full w-[320px] bg-gray-800/50 backdrop-blur-xl border-r border-white/10 z-50 flex flex-col"
          >
            <div className="p-4">
              <div className="flex items-center justify-between mb-8">
                <img
                  src="https://www.kluret.se/static/media/kluret_wt.ad13e882d6d5f566612d2b35479039fd.svg"
                  alt="Kluret"
                  className="h-8"
                />
                <button
                  onClick={() => setIsNavOpen(false)}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors md:hidden"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="h-[calc(100vh-8rem)] overflow-y-auto space-y-4 pr-4 custom-scrollbar">
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
                          <div className="flex-1 text-left">
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
                                  <detail.icon className="h-4 w-4 text-gray-400 mt-0.5" />
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
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col relative">
        {/* Floating Icons */}
        <div className={`absolute top-4 right-4 z-30 flex items-center gap-5 transition-opacity duration-300 ${
          isNavOpen && window.innerWidth < 768 ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
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
      </div>
    </div>
  );
};

export default ChatLayout;