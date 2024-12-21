import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Lightbulb, TrendingUp } from 'lucide-react';

const insights = [
  {
    icon: Lightbulb,
    title: 'Product Suggestions',
    description: 'AI recommends adding popular product categories to increase sales potential.'
  },
  {
    icon: TrendingUp,
    title: 'Market Analysis',
    description: 'Current market trends suggest focusing on sustainable products.'
  }
];

const AIInsights = () => {
  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-gray-100/50 p-6">
      <div className="flex items-center gap-3 mb-6">
        <Brain className="h-5 w-5 text-pink-500" />
        <h2 className="font-semibold">AI Insights</h2>
      </div>

      <div className="space-y-4">
        {insights.map((insight, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-4 rounded-xl bg-gradient-to-br from-gray-50 via-pink-50/30 to-blue-50/30"
          >
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-gradient-to-r from-pink-500 to-blue-500">
                <insight.icon className="h-4 w-4 text-white" />
              </div>
              <div>
                <h3 className="font-medium mb-1">{insight.title}</h3>
                <p className="text-sm text-gray-500">{insight.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AIInsights;