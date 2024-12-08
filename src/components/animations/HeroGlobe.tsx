import React from 'react';
import { motion } from 'framer-motion';

const HeroGlobe = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
      {/* Main Globe */}
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
            className="absolute inset-0 rounded-full border border-blue-500/10"
            style={{ 
              transform: `rotateX(${i * 15}deg) rotateY(${i * 30}deg)`,
              transformStyle: 'preserve-3d'
            }}
          />
        ))}

        {/* Floating Stars */}
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={`star-${i}`}
            className="absolute w-1 h-1 bg-white rounded-full"
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
              boxShadow: '0 0 15px rgba(255, 255, 255, 0.5)'
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
              background: 'linear-gradient(to top, transparent, rgba(59, 130, 246, 0.3))'
            }}
          />
        ))}
      </motion.div>

      {/* Outer Ring */}
      <motion.div
        className="absolute w-[900px] h-[900px] border border-blue-500/20 rounded-full"
        animate={{
          rotate: [0, 360]
        }}
        transition={{
          duration: 100,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      {/* Inner Ring */}
      <motion.div
        className="absolute w-[700px] h-[700px] border border-blue-500/20 rounded-full"
        animate={{
          rotate: [360, 0]
        }}
        transition={{
          duration: 80,
          repeat: Infinity,
          ease: "linear"
        }}
      />
    </div>
  );
};

export default HeroGlobe;