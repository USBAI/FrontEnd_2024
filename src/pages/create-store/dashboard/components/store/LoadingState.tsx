import React from 'react';
import { motion } from 'framer-motion';
import { Loader } from 'lucide-react';

const LoadingState = () => {
  return (
    <div className="h-full flex items-center justify-center bg-white">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        className="flex flex-col items-center"
      >
        <Loader className="h-8 w-8 text-pink-500 mb-4" />
        <p className="text-gray-500">Loading preview...</p>
      </motion.div>
    </div>
  );
};

export default LoadingState;