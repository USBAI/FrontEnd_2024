import React from 'react';
import { motion } from 'framer-motion';
import { Database, TrendingUp, Clock, AlertCircle } from 'lucide-react';
import DashboardLayout from './DashboardLayout';

const APIUsage = () => {
  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-3xl font-bold mb-4">API Usage</h1>
          <p className="text-gray-400">Monitor your API consumption and limits</p>
        </div>

        {/* Usage Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            { icon: Database, label: 'Total Requests', value: '1.2M', limit: '2M' },
            { icon: TrendingUp, label: 'Success Rate', value: '99.9%', trend: 'up' },
            { icon: Clock, label: 'Avg Response Time', value: '85ms', trend: 'down' },
            { icon: AlertCircle, label: 'Error Rate', value: '0.1%', trend: 'down' }
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
                  <div className="text-sm text-gray-400">
                    {stat.label}
                    {stat.limit && <span className="text-gray-500"> / {stat.limit}</span>}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Usage Graph */}
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 mb-12">
          <h2 className="text-xl font-bold mb-6">API Requests Over Time</h2>
          <div className="h-64 bg-black/30 rounded-lg flex items-center justify-center">
            <p className="text-gray-400">Graph visualization coming soon</p>
          </div>
        </div>

        {/* Recent Requests */}
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
          <h2 className="text-xl font-bold mb-6">Recent Requests</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left">
                  <th className="pb-4 text-gray-400 font-medium">Timestamp</th>
                  <th className="pb-4 text-gray-400 font-medium">Endpoint</th>
                  <th className="pb-4 text-gray-400 font-medium">Status</th>
                  <th className="pb-4 text-gray-400 font-medium">Response Time</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { time: '2024-03-15 14:23:45', endpoint: '/api/v1/search', status: 200, responseTime: '82ms' },
                  { time: '2024-03-15 14:23:42', endpoint: '/api/v1/products', status: 200, responseTime: '95ms' },
                  { time: '2024-03-15 14:23:40', endpoint: '/api/v1/search', status: 404, responseTime: '78ms' }
                ].map((request, index) => (
                  <tr key={index} className="border-t border-white/10">
                    <td className="py-4">{request.time}</td>
                    <td className="py-4"><code className="text-blue-400">{request.endpoint}</code></td>
                    <td className="py-4">
                      <span className={`inline-block px-2 py-1 rounded-full text-xs ${
                        request.status === 200 ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                      }`}>
                        {request.status}
                      </span>
                    </td>
                    <td className="py-4">{request.responseTime}</td>
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

export default APIUsage;