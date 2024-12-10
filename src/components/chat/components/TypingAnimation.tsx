import React from 'react';
import { motion } from 'framer-motion';

const TypingAnimation = () => {
  return (
    <div className="flex items-center space-x-1.5 px-2 py-1.5">
      <motion.div
        className="w-2 h-2 bg-blue-400 rounded-full"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.4, 1, 0.4]
        }}
        transition={{
          duration: 0.6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="w-2 h-2 bg-blue-400 rounded-full"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.4, 1, 0.4]
        }}
        transition={{
          duration: 0.6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.2
        }}
      />
      <motion.div
        className="w-2 h-2 bg-blue-400 rounded-full"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.4, 1, 0.4]
        }}
        transition={{
          duration: 0.6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.4
        }}
      />
    </div>
  );
};

export default TypingAnimation;