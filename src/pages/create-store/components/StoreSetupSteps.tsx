import React from 'react';
import { motion } from 'framer-motion';
import { Store, Settings, Rocket } from 'lucide-react';

const steps = [
  {
    icon: Store,
    title: 'Create Your Store',
    description: 'Sign up and let our AI understand your business goals'
  },
  {
    icon: Settings,
    title: 'AI Configuration',
    description: 'Our AI automatically sets up your store with curated products'
  },
  {
    icon: Rocket,
    title: 'Launch & Grow',
    description: 'Start selling while AI manages your store operations'
  }
];

const StoreSetupSteps = () => {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Three Steps to Success</h2>
          <p className="text-xl text-gray-400">
            Get your AI-powered store up and running in minutes
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 mb-6">
                  <step.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-gray-400">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StoreSetupSteps;