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
    <div className="fixed top-0 left-0 right-0 z-30 bg-gray-900/80 backdrop-blur-lg border-b border-white/10">
      <div className="flex items-center justify-between px-4 h-16">
        {!isNavOpen && (
          <motion.button
            onClick={() => setIsNavOpen(true)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Menu className="h-6 w-6 text-white/70 hover:text-white" />
          </motion.button>
        )}

        <div className="flex items-center gap-5 ml-auto">
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
      </div>
    </div>
  );
};

export default Header;