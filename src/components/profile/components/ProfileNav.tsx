import React from 'react';
import { motion } from 'framer-motion';
import { User, Settings, Package, LogOut, ShoppingCart } from 'lucide-react';

interface ProfileNavProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  onLogout: () => void;
}

const menuItems = [
  { icon: ShoppingCart, label: 'My Cart', section: 'cart' },
  { icon: Package, label: 'My Shipments', section: 'shipments' },
  { icon: Settings, label: 'Settings', section: 'settings' },
];

const ProfileNav = ({ activeSection, setActiveSection, onLogout }: ProfileNavProps) => {
  return (
    <div className="fixed top-0 left-0 right-0 flex justify-center z-40 px-4 py-6">
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="w-[90%] bg-white/80 backdrop-blur-xl rounded-full border border-gray-200/50 shadow-lg p-2"
      >
        <div className="flex items-center justify-around px-4">
          {/* User Info */}
          {/* <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-gradient-to-r from-pink-400 to-blue-400 flex items-center justify-center">
              <User className="h-5 w-5 text-white" />
            </div>
            <div className="hidden sm:block">
              <h2 className="font-bold text-gray-900">Welcome Back</h2>
              <p className="text-sm text-gray-500">Manage your account</p>
            </div>
          </div> */}

          {/* Navigation Links */}
          <div className="flex items-center justify-space-between gap-2">
            {menuItems.map((item) => (
              <motion.button
                key={item.section}
                onClick={() => setActiveSection(item.section)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors ${
                  activeSection === item.section
                    ? 'bg-pink-100 text-pink-600'
                    : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'
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
              className="flex items-center gap-2 px-4 py-2 rounded-full hover:bg-red-50 text-red-500 transition-colors ml-2"
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
  );
};

export default ProfileNav;