import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

const benefits = [
  'No inventory management required',
  'AI-powered product selection and pricing',
  'Automated order fulfillment',
  'Real-time market trend analysis',
  'Smart product recommendations',
  'Integrated marketing tools',
  'Automated customer support',
  'Built-in SEO optimization'
];

const StoreBenefits = () => {
  return (
    <section className="py-20 bg-black/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Why Choose Kluret AI</h2>
          <p className="text-xl text-gray-400">
            Focus on growing your business while our AI handles everything else
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-3"
            >
              <div className="p-1 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500">
                <CheckCircle className="h-4 w-4 text-white" />
              </div>
              <span className="text-gray-300">{benefit}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StoreBenefits;