import React from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';

interface ProfileHeaderProps {
  onClose: () => void;
}

const ProfileHeader = ({ onClose }: ProfileHeaderProps) => {
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClose}
      className="absolute top-9 right-6 p-2 rounded-full hover:bg-gray-100 transition-colors z-50"
    >
      <X className="h-6 w-6 text-gray-600" />
    </motion.button>
  );
};

export default ProfileHeader;