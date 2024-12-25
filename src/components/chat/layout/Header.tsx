import React from 'react';
import { motion } from 'framer-motion';
import { Menu, Search, User } from 'lucide-react';

interface HeaderProps {
  isNavOpen: boolean;
  setIsNavOpen: (isOpen: boolean) => void;
  setIsProfileOpen: (isOpen: boolean) => void;
  setIsSearchOpen: (isOpen: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({
  isNavOpen,
  setIsNavOpen,
  setIsProfileOpen,
  setIsSearchOpen
}) => {
  return (
    <div className="fixed top-0 left-0 right-0 z-30 backdrop-blur-lg">
      <div className="flex items-center justify-between px-4 h-16">
        <div className="flex items-center gap-3">
          {!isNavOpen && (
            <motion.button
              onClick={() => setIsNavOpen(true)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Menu className="h-6 w-6 text-gray-600" />
            </motion.button>
          )}
        </div>

        <div className="flex items-center gap-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsProfileOpen(true)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <User className="h-6 w-6 text-gray-600" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsSearchOpen(true)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Search className="h-6 w-6 text-gray-600" />
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default Header;