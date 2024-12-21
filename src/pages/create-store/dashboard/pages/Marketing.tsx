import React from 'react';
import { motion } from 'framer-motion';
import { Megaphone, Target, Users, TrendingUp } from 'lucide-react';

const marketingTools = [
  {
    icon: Target,
    title: 'AI Ad Campaigns',
    description: 'Let our AI create and optimize your advertising campaigns'
  },
  {
    icon: Users,
    title: 'Customer Targeting',
    description: 'Smart audience segmentation and personalization'
  },
  {
    icon: TrendingUp,
    title: 'Performance Analytics',
    description: 'Real-time insights and AI-powered recommendations'
  }
];

const Marketing = () => {
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">Marketing</h1>
      </div>

      {/* AI Marketing Tools */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {marketingTools.map((tool, index) => (
          <motion.div
            key={tool.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl p-6 shadow-sm"
          >
            <div className="p-3 bg-emerald-50 rounded-lg inline-block mb-4">
              <tool.icon className="h-6 w-6 text-emerald-500" />
            </div>
            <h3 className="text-lg font-semibold mb-2">{tool.title}</h3>
            <p className="text-gray-600">{tool.description}</p>
            <button className="mt-4 px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors w-full">
              Get Started
            </button>
          </motion.div>
        ))}
      </div>

      {/* AI Assistant Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-xl p-8 shadow-sm text-center"
      >
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-50 mb-4">
          <Megaphone className="h-8 w-8 text-emerald-500" />
        </div>
        <h2 className="text-xl font-bold mb-4">AI Marketing Assistant</h2>
        <p className="text-gray-600 mb-6 max-w-lg mx-auto">
          Let our AI help you create and optimize your marketing campaigns for maximum impact.
        </p>
        <button className="px-6 py-3 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors">
          Start Marketing
        </button>
      </motion.div>
    </div>
  );
};

export default Marketing;