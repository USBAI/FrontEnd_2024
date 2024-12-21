import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Package, Settings, Users } from 'lucide-react';

const activities = [
  {
    icon: Package,
    title: 'Store Creation Started',
    time: '2 days ago',
    description: 'Initial store setup process began'
  },
  {
    icon: Settings,
    title: 'AI Configuration',
    time: '1 day ago',
    description: 'Store preferences analyzed by AI'
  },
  {
    icon: Users,
    title: 'Target Audience Defined',
    time: '5 hours ago',
    description: 'AI suggested optimal customer segments'
  }
];

const RecentActivity = () => {
  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-gray-100/50 p-6">
      <div className="flex items-center gap-3 mb-6">
        <Clock className="h-5 w-5 text-pink-500" />
        <h2 className="font-semibold">Recent Activity</h2>
      </div>

      <div className="space-y-4">
        {activities.map((activity, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-start gap-4 p-4 rounded-xl bg-gradient-to-br from-gray-50 via-pink-50/30 to-blue-50/30"
          >
            <div className="p-2 rounded-lg bg-gradient-to-r from-pink-500 to-blue-500">
              <activity.icon className="h-4 w-4 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-medium">{activity.title}</h3>
                <span className="text-sm text-gray-500">{activity.time}</span>
              </div>
              <p className="text-sm text-gray-500">{activity.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivity;