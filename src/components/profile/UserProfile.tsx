import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ProfileHeader from './components/ProfileHeader';
import ProfileNav from './components/ProfileNav';
import ProfileContent from './components/ProfileContent';
import AnimatedBackground from './components/AnimatedBackground';

interface UserProfileProps {
  onClose: () => void;
  onLogout: () => void;
  onNavigate: (section: string) => void;
}

const UserProfile = ({ onClose, onLogout, onNavigate }: UserProfileProps) => {
  const [activeSection, setActiveSection] = useState('cart');

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-white/95 backdrop-blur-xl z-50 overflow-hidden"
    >
      <AnimatedBackground />
      
      {/* Header */}
      <ProfileHeader onClose={onClose} />

      {/* Navigation */}
      <ProfileNav 
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        onLogout={onLogout}
      />

      {/* Main Content */}
      <ProfileContent 
        activeSection={activeSection}
      />
    </motion.div>
  );
};

export default UserProfile;