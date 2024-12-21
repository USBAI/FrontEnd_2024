import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Package, Users, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';

const actions = [
  {
    icon: Package,
    title: 'Add Products',
    description: 'Start adding products to your store',
    path: '/create-store/dashboard/products'
  },
  {
    icon: Users,
    title: 'Customer Segments',
    description: 'Define your target audience',
    path: '/create-store/dashboard/marketing'
  },
  {
    icon: Settings,
    title: 'Store Settings',
    description: 'Configure your store preferences',
    path: '/create-store/dashboard/settings'
  }
];

const QuickActions = () => {
  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-gray-100/50 p-6">
      <div className="flex items-center gap-3 mb-6">
        <Zap className="h-5 w-5 text-pink-500" />
        <h2 className="font-semibold">Quick Actions</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {actions.map((action, index) => (
          <Link key={index} to={action.path}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-4 rounded-xl bg-gradient-to-br from-gray-50 via-pink-50/30 to-blue-50/30 hover:shadow-lg transition-shadow"
            >
              <div className="p-2 rounded-lg bg-gradient-to-r from-pink-500 to-blue-500 w-fit mb-3">
                <action.icon className="h-4 w-4 text-white" />
              </div>
              <h3 className="font-medium mb-1">{action.title}</h3>
              <p className="text-sm text-gray-500">{action.description}</p>
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;