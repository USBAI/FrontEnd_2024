import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface AIFeatureCardProps {
  feature: {
    icon: LucideIcon;
    title: string;
    description: string;
    gradient: string;
  };
  index: number;
  inView: boolean;
}

const AIFeatureCard = ({ feature, index, inView }: AIFeatureCardProps) => {
  const { icon: Icon, title, description, gradient } = feature;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.2 + index * 0.1 }}
      className="relative group"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-pink-100 to-blue-100 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-all duration-300" />
      <div className="relative bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:border-pink-200 transition-all duration-300">
        <div className={`h-12 w-12 rounded-xl bg-gradient-to-r ${gradient} p-2.5 shadow-lg mb-4`}>
          <Icon className="h-full w-full text-white" />
        </div>
        <h3 className="text-lg font-semibold mb-2 bg-gradient-to-r from-pink-600 to-blue-600 bg-clip-text text-transparent">
          {title}
        </h3>
        <p className="text-gray-600 text-sm">
          {description}
        </p>
      </div>
    </motion.div>
  );
};

export default AIFeatureCard;