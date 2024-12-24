import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Database, Zap, Globe } from 'lucide-react';

interface AITrainingStatsProps {
  inView: boolean;
}

const AITrainingStats = ({ inView }: AITrainingStatsProps) => {
  const stats = [
    { icon: Brain, value: '100M+', label: 'Training Examples' },
    { icon: Database, value: '10TB+', label: 'Training Data' },
    { icon: Zap, value: '<100ms', label: 'Response Time' },
    { icon: Globe, value: '40+', label: 'Languages' }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 + index * 0.1 }}
          className="relative group"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-pink-100 to-blue-100 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-all duration-300" />
          <div className="relative bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:border-pink-200 transition-all duration-300">
            <stat.icon className="h-8 w-8 mb-4 text-pink-500" />
            <div className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-blue-600 bg-clip-text text-transparent">
              {stat.value}
            </div>
            <div className="text-gray-600 text-sm">
              {stat.label}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default AITrainingStats;