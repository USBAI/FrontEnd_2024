import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Settings, Package, LogOut, ShoppingCart, X, Menu, ChevronLeft } from 'lucide-react';
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

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

  const handleSectionChange = (section: string) => {
    setActiveSection(section);
    setIsMobileMenuOpen(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-gradient-to-br from-gray-900 via-gray-900 to-black z-50"
    >
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between p-4 border-b border-white/10 bg-white/5 backdrop-blur-xl">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 rounded-lg hover:bg-white/10 transition-colors"
        >
          <Menu className="h-6 w-6 text-white" />
        </button>
        <h1 className="text-xl font-bold text-white">My Account</h1>
        <button
          onClick={onClose}
          className="p-2 rounded-lg hover:bg-white/10 transition-colors"
        >
          <X className="h-6 w-6 text-white" />
        </button>
      </div>

      {/* Desktop Close Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={onClose}
        className="absolute top-6 right-6 p-2 rounded-full hover:bg-white/10 transition-colors hidden md:block"
      >
        <X className="h-6 w-6 text-white/70 hover:text-white" />
      </motion.button>

      <div className="h-[calc(100%-4rem)] md:h-full flex">
        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50 md:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
          )}
        </AnimatePresence>

        {/* Sidebar */}
        <motion.div
          initial={false}
          animate={{ 
            width: isSidebarCollapsed ? '5rem' : '16rem',
            x: isMobileMenuOpen ? 0 : window.innerWidth < 768 ? -320 : 0 
          }}
          transition={{ type: 'spring', damping: 30 }}
          className="fixed md:static top-[4rem] md:top-0 left-0 h-[calc(100%-4rem)] md:h-full bg-white/5 backdrop-blur-xl border-r border-white/10 flex flex-col z-50"
        >
          {/* Profile Header */}
          <div className="p-4 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center flex-shrink-0">
                <User className="h-6 w-6 text-white" />
              </div>
              {!isSidebarCollapsed && (
                <div>
                  <h2 className="font-bold text-white">Welcome Back</h2>
                  <p className="text-sm text-gray-400">Manage your account</p>
                </div>
              )}
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 overflow-y-auto custom-scrollbar">
            <div className="space-y-2">
              {menuItems.map((item) => (
                <button
                  key={item.section}
                  onClick={() => handleSectionChange(item.section)}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors w-full ${
                    activeSection === item.section
                      ? 'bg-blue-500/20 text-blue-400'
                      : 'hover:bg-white/10 text-gray-400 hover:text-white'
                  }`}
                >
                  <item.icon className="h-5 w-5 flex-shrink-0" />
                  {!isSidebarCollapsed && <span className="truncate">{item.label}</span>}
                </button>
              ))}
            </div>
          </nav>

          {/* Bottom Section */}
          <div className="p-4 border-t border-white/10">
            <button
              onClick={onLogout}
              className="flex items-center gap-3 px-3 py-2 w-full rounded-lg hover:bg-white/10 transition-colors text-red-400"
            >
              <LogOut className="h-5 w-5 flex-shrink-0" />
              {!isSidebarCollapsed && <span className="truncate">Logout</span>}
            </button>
          </div>

          {/* Collapse Button */}
          <button
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            className="absolute top-1/2 -right-3 p-1 bg-white/10 rounded-full hover:bg-white/20 transition-colors hidden md:block"
          >
            <motion.div
              animate={{ rotate: isSidebarCollapsed ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronLeft className="h-4 w-4 text-white" />
            </motion.div>
          </button>
        </motion.div>

        {/* Main Content */}
        <div 
          className="flex-1 overflow-y-auto p-4 md:p-8 transition-all duration-300"
          style={{ marginLeft: isSidebarCollapsed ? '5rem' : window.innerWidth >= 768 ? '16rem' : 0 }}
        >
          {renderSection()}
        </div>
      </div>
    </motion.div>
  );
};

export default UserProfile;