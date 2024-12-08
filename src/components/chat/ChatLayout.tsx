import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Store, Network, Search, User, ChevronDown, Rocket, Code, Zap, Globe, Shield, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ChatWindow from './ChatWindow';
import SearchOverlay from '../search/SearchOverlay';

const ChatLayout = () => {
  const [isNavOpen, setIsNavOpen] = useState(true);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [expandedItem, setExpandedItem] = useState<number | null>(null);
  const navigate = useNavigate();
  
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

  const iconVariants = {
    initial: { scale: 0.8, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    hover: { scale: 1.1 },
    tap: { scale: 0.95 }
  };

  const dropdownVariants = {
    hidden: { height: 0, opacity: 0 },
    visible: { height: 'auto', opacity: 1 }
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-gray-900 to-gray-900" />
        <div className="absolute inset-0" style={{ 
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.1) 1px, transparent 0)`,
          backgroundSize: '40px 40px' 
        }} />
      </div>

      {/* Sidebar */}
      <AnimatePresence>
        {isNavOpen && (
          <motion.aside
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 320, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            className="bg-gray-800/50 backdrop-blur-xl border-r border-white/10 relative z-10 flex flex-col"
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
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="h-[70vh] ml-[10px] overflow-y-auto space-y-4 pr-4 custom-scrollbar">
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
                              variants={dropdownVariants}
                              initial="hidden"
                              animate="visible"
                              exit="hidden"
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
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col relative">
        {/* Floating Icons */}
        <div className="absolute top-4 right-4 z-50 flex items-center gap-5">
          <motion.button
            whileHover="hover"
            whileTap="tap"
            variants={iconVariants}
            className="text-white/70 hover:text-white transition-colors"
          >
            <User className="h-6 w-6" />
          </motion.button>
          <motion.button
            whileHover="hover"
            whileTap="tap"
            variants={iconVariants}
            onClick={() => setIsSearchOpen(true)}
            className="text-white/70 hover:text-white transition-colors"
          >
            <Search className="h-6 w-6" />
          </motion.button>
        </div>

        {!isNavOpen && (
          <motion.button
            onClick={() => setIsNavOpen(true)}
            className="absolute top-4 left-4 z-50"
            whileHover="hover"
            whileTap="tap"
            variants={iconVariants}
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