import React from 'react';
import { motion } from 'framer-motion';
import CartSection from '../sections/CartSection';
import ShipmentsSection from '../sections/ShipmentsSection';
import SettingsSection from '../sections/SettingsSection';

interface ProfileContentProps {
  activeSection: string;
}

const ProfileContent = ({ activeSection }: ProfileContentProps) => {
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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="h-full pt-28 px-4 overflow-y-auto custom-scrollbar"
    >
      <div className="max-w-7xl mx-auto">
        {renderSection()}
      </div>
    </motion.div>
  );
};

export default ProfileContent;