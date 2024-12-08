import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Code, Zap, Lock, Globe } from 'lucide-react';
import Button from '../ui/Button';

const APISection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const features = [
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'High-performance API with response times under 100ms'
    },
    {
      icon: Lock,
      title: 'Secure',
      description: 'Enterprise-grade security with encrypted data transmission'
    },
    {
      icon: Globe,
      title: 'Global CDN',
      description: 'Distributed infrastructure for optimal performance'
    }
  ];

  return (
    <section className="py-24 bg-black relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-purple-600/5" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text">
              Integrate with Kluret API
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Power your e-commerce platform with our advanced AI search capabilities
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 }}
          >
            <div className="bg-gray-900 rounded-xl p-6 shadow-2xl">
              <pre className="text-sm text-gray-300 overflow-x-auto">
                <code>{`// Example API Request
const response = await fetch('https://api.kluret.com/search', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    query: 'iPhone 13',
    filters: {
      price_range: { min: 5000, max: 8000 },
      condition: 'new'
    }
  })
});

const results = await response.json();`}</code>
              </pre>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4 }}
            className="space-y-8"
          >
            {features.map((feature, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-lg bg-blue-600/10 flex items-center justify-center">
                    <feature.icon className="h-6 w-6 text-blue-400" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </div>
              </div>
            ))}
            <Button
              variant="primary"
              size="lg"
              icon={<Code className="h-5 w-5" />}
              className="mt-8"
            >
              Get API Access
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default APISection;