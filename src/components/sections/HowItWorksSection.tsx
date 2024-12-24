import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Search, MessageSquare, ShoppingCart } from 'lucide-react';

const steps = [
  {
    icon: Search,
    title: 'Search Naturally',
    description: 'Simply type what you\'re looking for in natural language. Our AI understands context and intent.',
  },
  {
    icon: MessageSquare,
    title: 'Get Smart Recommendations',
    description: 'Receive personalized product suggestions based on your preferences and requirements.',
  },
  {
    icon: ShoppingCart,
    title: 'Compare & Shop',
    description: 'Compare prices across multiple retailers and make informed purchasing decisions.',
  },
];

const HowItWorksSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-pink-50/50 via-white to-blue-50/50" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How Kluret Works</h2>
          <p className="text-xl text-gray-600">Simple steps to find your perfect product</p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.2 }}
              className="relative"
            >
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-16 right-0 w-full h-0.5 bg-gradient-to-r from-pink-200 to-blue-200 transform translate-x-1/2" />
              )}
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-blue-500 rounded-2xl flex items-center justify-center mb-6 mx-auto shadow-lg">
                  <step.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">
                  {step.title}
                </h3>
                <p className="text-gray-600 text-center">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;