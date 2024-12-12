import React from 'react';
import { motion } from 'framer-motion';
import { Globe } from 'lucide-react';

interface GlobalStatsProps {
  inView: boolean;
}

const GlobalStats: React.FC<GlobalStatsProps> = ({ inView }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.2 }}
      className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl p-8 shadow-xl border border-pink-100/50 max-w-3xl mx-auto backdrop-blur-sm"
    >
      <div className="flex items-center justify-center gap-4 mb-6">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 360],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="p-3 bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-xl"
        >
          <Globe className="h-6 w-6 text-pink-500" />
        </motion.div>
        <h3 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 text-transparent bg-clip-text">
          100+ Countries Served
        </h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="flex items-center gap-3">
          <span className="text-gray-700">Global search coverage</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-gray-700">24/7 availability</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-gray-700">Worldwide data centers</span>
        </div>
      </div>
    </motion.div>
  );
};

export default GlobalStats;