import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ShoppingBag, ArrowRight, Boxes, BarChart } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../ui/Button';

const StoreIntegrationSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const benefits = [
    {
      icon: ShoppingBag,
      title: 'Seamless Integration',
      description: 'Connect your store with just a few clicks'
    },
    {
      icon: Boxes,
      title: 'Automatic Sync',
      description: 'Products automatically sync with Kluret'
    },
    {
      icon: BarChart,
      title: 'Analytics Dashboard',
      description: 'Track performance and customer behavior'
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-gray-900 to-black relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-pink-500/10 via-purple-500/10 to-transparent" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            <span className="bg-gradient-to-r from-pink-400 to-purple-400 text-transparent bg-clip-text">
              Connect Your Store
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Join the growing network of retailers using Kluret's AI-powered search
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.2 }}
              className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8"
            >
              <div className="w-12 h-12 rounded-lg bg-purple-600/10 flex items-center justify-center mb-6">
                <benefit.icon className="h-6 w-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">{benefit.title}</h3>
              <p className="text-gray-400">{benefit.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
          className="text-center"
        >
          <Link to="/connectstore">
            <Button
              variant="primary"
              size="lg"
              icon={<ArrowRight className="h-5 w-5" />}
              className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700"
            >
              Start Selling on Kluret
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default StoreIntegrationSection;