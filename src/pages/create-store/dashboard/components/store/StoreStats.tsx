import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Users, TrendingUp, Eye } from 'lucide-react';

const stats = [
  { icon: ShoppingBag, label: 'Products', value: '0' },
  { icon: Users, label: 'Visitors', value: '0' },
  { icon: TrendingUp, label: 'Sales', value: '0' },
  { icon: Eye, label: 'Views', value: '0' }
];

const StoreStats = () => {
  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-gray-100/50 p-6">
      <h2 className="font-semibold mb-4">Store Statistics</h2>
      <div className="grid grid-cols-2 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-4 rounded-xl bg-gradient-to-br from-gray-50 via-pink-50/30 to-blue-50/30"
          >
            <stat.icon className="h-5 w-5 text-pink-500 mb-2" />
            <div className="text-2xl font-bold">{stat.value}</div>
            <div className="text-sm text-gray-500">{stat.label}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default StoreStats;