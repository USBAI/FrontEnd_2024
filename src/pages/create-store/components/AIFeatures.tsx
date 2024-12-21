import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Zap, Target } from 'lucide-react';

const features = [
  {
    icon: Brain,
    title: 'AI-Powered Product Import',
    description: 'Our AI automatically curates and imports products for your store, saving you time and effort'
  },
  {
    icon: Target,
    title: 'Smart Product Selection',
    description: 'AI analyzes market trends to select the most profitable products for your niche'
  },
  {
    icon: Zap,
    title: 'Automated Management',
    description: 'Let AI handle inventory, pricing, and product updates while you focus on growth'
  }
];

const AIFeatures = () => {
  return (
    <section className="py-20 bg-black/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Powered by Advanced AI</h2>
          <p className="text-xl text-gray-400">
            Experience the future of e-commerce with our AI-driven platform
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10">
                <div className="p-3 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-lg inline-block mb-4">
                  <feature.icon className="h-6 w-6 text-emerald-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AIFeatures;