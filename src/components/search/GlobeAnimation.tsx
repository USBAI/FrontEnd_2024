import React from 'react';
import { motion } from 'framer-motion';

export const LoadingGlobe = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <motion.div 
        className="relative w-[600px] h-[600px]"
        animate={{ 
          rotate: 360,
        }}
        transition={{ 
          duration: 15,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        {/* Grid Lines */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`line-${i}`}
            className="absolute inset-0 rounded-full border border-pink-200/20"
            style={{ 
              transform: `rotateX(${i * 22.5}deg) rotateY(${i * 45}deg)`,
              transformStyle: 'preserve-3d'
            }}
          />
        ))}

        {/* Floating Particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute w-1 h-1 bg-gradient-to-r from-pink-200 to-white rounded-full shadow-glow"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.2, 0.8, 0.2],
              x: Math.cos(i * Math.PI / 10) * 250,
              y: Math.sin(i * Math.PI / 10) * 250,
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.2
            }}
            style={{
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              boxShadow: '0 0 10px rgba(255, 182, 193, 0.5)'
            }}
          />
        ))}

        {/* Connection Lines */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={`connection-${i}`}
            className="absolute w-px h-[300px] origin-bottom"
            style={{
              left: '50%',
              top: '50%',
              transform: `rotate(${i * 30}deg)`,
              background: 'linear-gradient(to top, transparent, rgba(255, 182, 193, 0.3))'
            }}
          />
        ))}
      </motion.div>
    </div>
  );
};

export const IdleGlobe = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <motion.div 
        className="relative w-[600px] h-[600px]"
        animate={{ 
          rotate: 360,
        }}
        transition={{ 
          duration: 30,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        {/* Grid Lines */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`line-${i}`}
            className="absolute inset-0 rounded-full border border-pink-100/10"
            style={{ 
              transform: `rotateX(${i * 22.5}deg) rotateY(${i * 45}deg)`,
              transformStyle: 'preserve-3d'
            }}
          />
        ))}

        {/* Floating Particles */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute w-1 h-1 bg-gradient-to-r from-pink-100 to-white rounded-full shadow-glow"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.3, 0.1],
              x: Math.cos(i * Math.PI / 7.5) * 250,
              y: Math.sin(i * Math.PI / 7.5) * 250,
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.3
            }}
            style={{
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              boxShadow: '0 0 8px rgba(255, 182, 193, 0.3)'
            }}
          />
        ))}

        {/* Connection Lines */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={`connection-${i}`}
            className="absolute w-px h-[300px] origin-bottom"
            style={{
              left: '50%',
              top: '50%',
              transform: `rotate(${i * 30}deg)`,
              background: 'linear-gradient(to top, transparent, rgba(255, 182, 193, 0.15))'
            }}
          />
        ))}
      </motion.div>
    </div>
  );
};