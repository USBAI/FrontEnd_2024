import React from 'react';
import { motion } from 'framer-motion';

interface AITrainingVisualProps {
  inView: boolean;
}

const AITrainingVisual = ({ inView }: AITrainingVisualProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      className="relative aspect-square max-w-lg mx-auto"
    >
      {/* Neural Network Visualization */}
      <div className="absolute inset-0">
        <svg className="w-full h-full" viewBox="0 0 400 400">
          <defs>
            <linearGradient id="nodeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ec4899" />
              <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(236, 72, 153, 0.2)" />
              <stop offset="100%" stopColor="rgba(59, 130, 246, 0.2)" />
            </linearGradient>
          </defs>

          {/* Connection Lines */}
          {[...Array(20)].map((_, i) => (
            <motion.line
              key={`line-${i}`}
              x1={100 + Math.random() * 200}
              y1={100 + Math.random() * 200}
              x2={100 + Math.random() * 200}
              y2={100 + Math.random() * 200}
              stroke="url(#lineGradient)"
              strokeWidth="2"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={inView ? { pathLength: 1, opacity: 1 } : {}}
              transition={{ duration: 1.5, delay: i * 0.1 }}
            />
          ))}

          {/* Nodes */}
          {[...Array(12)].map((_, i) => (
            <motion.circle
              key={`node-${i}`}
              cx={100 + Math.random() * 200}
              cy={100 + Math.random() * 200}
              r="8"
              fill="url(#nodeGradient)"
              initial={{ scale: 0, opacity: 0 }}
              animate={inView ? { scale: 1, opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            />
          ))}
        </svg>
      </div>

      {/* Floating Data Points */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute w-2 h-2 rounded-full bg-gradient-to-r from-pink-400 to-blue-400"
          animate={{
            x: [Math.random() * 400, Math.random() * 400],
            y: [Math.random() * 400, Math.random() * 400],
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "linear",
            delay: i * 0.2,
          }}
          style={{
            left: Math.random() * 100 + '%',
            top: Math.random() * 100 + '%',
          }}
        />
      ))}
    </motion.div>
  );
};

export default AITrainingVisual;