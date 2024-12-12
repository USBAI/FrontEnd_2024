import React from 'react';
import { motion } from 'framer-motion';

const Globe3D = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <motion.div 
        className="relative w-[800px] h-[800px]"
        animate={{ 
          rotate: 360,
        }}
        transition={{ 
          duration: 200,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        {/* Grid Lines */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={`line-${i}`}
            className="absolute inset-0 rounded-full border border-pink-200/10"
            style={{ 
              transform: `rotateX(${i * 15}deg) rotateY(${i * 30}deg)`,
              transformStyle: 'preserve-3d'
            }}
          />
        ))}

        {/* Floating Particles */}
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute w-1 h-1 bg-gradient-to-r from-pink-200 to-white rounded-full shadow-glow"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.2, 0.5, 0.2],
              x: Math.cos(i * Math.PI / 15) * 350,
              y: Math.sin(i * Math.PI / 15) * 350,
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.2
            }}
            style={{
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              boxShadow: '0 0 15px rgba(255, 182, 193, 0.5)'
            }}
          />
        ))}

        {/* Connection Lines */}
        {[...Array(18)].map((_, i) => (
          <motion.div
            key={`connection-${i}`}
            className="absolute w-px h-[400px] origin-bottom"
            style={{
              left: '50%',
              top: '50%',
              transform: `rotate(${i * 20}deg)`,
              background: 'linear-gradient(to top, transparent, rgba(255, 182, 193, 0.3))'
            }}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default Globe3D;