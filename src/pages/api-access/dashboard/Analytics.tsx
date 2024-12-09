import React from 'react';
import { motion } from 'framer-motion';
import { BarChart2, PieChart, TrendingUp, Users } from 'lucide-react';
import DashboardLayout from './DashboardLayout';

const Analytics = () => {
  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-3xl font-bold mb-4">Analytics</h1>
          <p className="text-gray-400">Detailed insights into your API performance</p>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            { icon: Users, label: 'Total Users', value: '8.5K', change: '+12%' },
            { icon: BarChart2, label: 'Avg Daily Calls', value: '45K', change: '+8%' },
            { icon: PieChart, label: 'Success Rate', value: '99.9%', change: '+0.5%' },
            { icon: TrendingUp, label: 'Monthly Growth', value: '34%', change: '+5%' }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-500/10 rounded-lg">
                  <stat.icon className="h-6 w-6 text-blue-400" />
                </div>
                <div>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="flex items-center gap-1 text-sm">
                    <span className="text-gray-400">{stat.label}</span>
                    <span className="text-green-400">{stat.change}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Usage Over Time */}
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <h2 className="text-xl font-bold mb-6">Usage Over Time</h2>
            <div className="h-64 bg-black/30 rounded-lg flex items-center justify-center">
              <p className="text-gray-400">Usage graph visualization coming soon</p>
            </div>
          </div>

          {/* Endpoint Distribution */}
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <h2 className="text-xl font-bold mb-6">Endpoint Distribution</h2>
            <div className="h-64 bg-black/30 rounded-lg flex items-center justify-center">
              <p className="text-gray-400">Distribution chart coming soon</p>
            </div>
          </div>
        </div>

        {/* Top Endpoints */}
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
          <h2 className="text-xl font-bold mb-6">Top Endpoints</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left">
                  <th className="pb-4 text-gray-400 font-medium">Endpoint</th>
                  <th className="pb-4 text-gray-400 font-medium">Calls</th>
                  <th className="pb-4 text-gray-400 font-medium">Avg Response Time</th>
                  <th className="pb-4 text-gray-400 font-medium">Success Rate</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { endpoint: '/api/v1/search', calls: '450K', responseTime: '85ms', successRate: '99.9%' },
                  { endpoint: '/api/v1/products', calls: '320K', responseTime: '92ms', successRate: '99.8%' },
                  { endpoint: '/api/v1/categories', calls: '180K', responseTime: '78ms', successRate: '99.9%' }
                ].map((endpoint, index) => (
                  <tr key={index} className="border-t border-white/10">
                    <td className="py-4"><code className="text-blue-400">{endpoint.endpoint}</code></td>
                    <td className="py-4">{endpoint.calls}</td>
                    <td className="py-4">{endpoint.responseTime}</td>
                    <td className="py-4">{endpoint.successRate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Analytics;