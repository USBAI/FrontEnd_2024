import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface SidebarDetailProps {
  detail: {
    icon: LucideIcon;
    title: string;
    description: string;
  };
  index: number;
}

const SidebarDetail = ({ detail, index }: SidebarDetailProps) => {
  const Icon = detail.icon;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="flex items-start gap-3 bg-gray-50 p-3 rounded-lg hover:bg-pink-50/50 transition-colors"
    >
      <Icon className="h-4 w-4 text-gray-400 mt-0.5" />
      <div>
        <h4 className="text-sm font-medium text-gray-900">{detail.title}</h4>
        <p className="text-xs text-gray-500">{detail.description}</p>
      </div>
    </motion.div>
  );
};

export default SidebarDetail;