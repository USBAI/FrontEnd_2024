import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Settings, Package, LogOut, ShoppingCart, X } from 'lucide-react';
import CartSection from './sections/CartSection';
import ShipmentsSection from './sections/ShipmentsSection';
import SettingsSection from './sections/SettingsSection';

interface UserProfileProps {
  onClose: () => void;
  onLogout: () => void;
  onNavigate: (section: string) => void;
}

const UserProfile = ({ onClose, onLogout, onNavigate }: UserProfileProps) => {
  const [activeSection, setActiveSection] = useState('cart');

  const menuItems = [
    { icon: ShoppingCart, label: 'My Cart', section: 'cart' },
    { icon: Package, label: 'My Shipments', section: 'shipments' },
    { icon: Settings, label: 'Settings', section: 'settings' },
  ];

  const renderSection = () => {
    switch (activeSection) {
      case 'cart':
        return <CartSection />;
      case 'shipments':
        return <ShipmentsSection />;
      case 'settings':
        return <SettingsSection />;
      default:
        return <CartSection />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-gradient-to-br from-gray-900 via-gray-900 to-black z-50 overflow-hidden"
    >
      {/* Close Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={onClose}
        className="absolute top-6 right-6 p-2 rounded-full hover:bg-white/10 transition-colors"
      >
        <X className="h-6 w-6 text-white/70 hover:text-white" />
      </motion.button>

      <div className="max-w-7xl mx-auto px-4 h-full pt-6">
        {/* Top Navigation Bar */}
        <div className="relative flex justify-center mb-8">
          <motion.nav 
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className="w-[90%] bg-white/5 backdrop-blur-xl rounded-full border border-white/10 p-2"
          >
            <div className="flex items-center justify-between px-4">
              {/* User Info */}
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                  <User className="h-5 w-5 text-white" />
                </div>
                <div className="hidden sm:block">
                  <h2 className="font-bold text-white">Welcome Back</h2>
                  <p className="text-sm text-gray-400">Manage your account</p>
                </div>
              </div>

              {/* Navigation Links */}
              <div className="flex items-center gap-2">
                {menuItems.map((item) => (
                  <motion.button
                    key={item.section}
                    onClick={() => setActiveSection(item.section)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors ${
                      activeSection === item.section
                        ? 'bg-blue-500/20 text-blue-400'
                        : 'hover:bg-white/10 text-gray-400 hover:text-white'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <item.icon className="h-5 w-5" />
                    <span className="hidden sm:inline">{item.label}</span>
                  </motion.button>
                ))}

                {/* Logout Button */}
                <motion.button
                  onClick={onLogout}
                  className="flex items-center gap-2 px-4 py-2 rounded-full hover:bg-white/10 text-red-400 transition-colors ml-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <LogOut className="h-5 w-5" />
                  <span className="hidden sm:inline">Logout</span>
                </motion.button>
              </div>
            </div>
          </motion.nav>
        </div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="h-[calc(100vh-12rem)] overflow-y-auto custom-scrollbar"
        >
          {renderSection()}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default UserProfile;