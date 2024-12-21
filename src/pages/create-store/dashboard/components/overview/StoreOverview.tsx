import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Users, TrendingUp, Clock } from 'lucide-react';

const stats = [
  {
    icon: ShoppingBag,
    label: 'Store Status',
    value: 'Building',
    color: 'from-yellow-500 to-orange-500'
  },
  {
    icon: Users,
    label: 'AI Suggestions',
    value: '3',
    color: 'from-blue-500 to-indigo-500'
  },
  {
    icon: TrendingUp,
    label: 'Completion',
    value: '15%',
    color: 'from-green-500 to-emerald-500'
  },
  {
    icon: Clock,
    label: 'Time Active',
    value: '2 days',
    color: 'from-purple-500 to-pink-500'
  }
];

const StoreOverview = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white/80 backdrop-blur-xl rounded-xl shadow-lg border border-gray-100/50 p-4"
        >
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg bg-gradient-to-r ${stat.color}`}>
              <stat.icon className="h-5 w-5 text-white" />
            </div>
            <div>
              <div className="text-sm text-gray-500">{stat.label}</div>
              <div className="font-semibold">{stat.value}</div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default StoreOverview;