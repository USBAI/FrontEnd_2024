import React from 'react';
import { motion } from 'framer-motion';

const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-50 via-blue-50 to-purple-50" />
      
      {/* Animated Waves */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute inset-0"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 15 + i * 5,
            repeat: Infinity,
            ease: "linear",
            delay: i * 2,
          }}
        >
          <div 
            className="absolute inset-0 bg-gradient-to-r from-pink-200/20 via-blue-200/20 to-purple-200/20 rounded-full blur-3xl"
            style={{
              transform: `translate(${-50 + i * 25}%, ${-50 + i * 25}%) scale(${1.5 + i * 0.2})`
            }}
          />
        </motion.div>
      ))}

      {/* Floating Particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute w-1 h-1 bg-gradient-to-r from-pink-400/50 to-blue-400/50 rounded-full"
          animate={{
            x: [Math.random() * window.innerWidth, Math.random() * window.innerWidth],
            y: [Math.random() * window.innerHeight, Math.random() * window.innerHeight],
            scale: [1, 1.5, 1],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 10 + Math.random() * 10,
            repeat: Infinity,
            ease: "linear",
            delay: i * 0.5,
          }}
        />
      ))}
    </div>
  );
};

export default AnimatedBackground;