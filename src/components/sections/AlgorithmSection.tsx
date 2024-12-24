import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Brain, Database, Network, Zap } from 'lucide-react';

const AlgorithmSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <section className="py-24 relative overflow-hidden bg-gradient-to-br from-white via-pink-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-pink-600 to-blue-600 bg-clip-text text-transparent">
            Our AI Algorithm
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Powered by cutting-edge AI models from Google Groq and OpenAI
          </p>
        </motion.div>

        {/* Algorithm Visualization */}
        <div className="relative h-[600px] mb-16">
          {/* Input Layer */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="absolute left-0 top-1/2 -translate-y-1/2 w-64 space-y-4"
          >
            <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-100">
              <h3 className="font-semibold mb-2 text-gray-900">Input Layer</h3>
              <div className="space-y-2">
                <div className="h-8 bg-gradient-to-r from-pink-100 to-blue-100 rounded-lg animate-pulse" />
                <div className="h-8 bg-gradient-to-r from-pink-100 to-blue-100 rounded-lg animate-pulse" />
                <div className="h-8 bg-gradient-to-r from-pink-100 to-blue-100 rounded-lg animate-pulse" />
              </div>
            </div>
          </motion.div>

          {/* Neural Network Animation */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4 }}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[400px]"
          >
            <svg className="w-full h-full">
              <defs>
                <linearGradient id="nodeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#ec4899" />
                  <stop offset="100%" stopColor="#3b82f6" />
                </linearGradient>
                <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="rgba(236, 72, 153, 0.2)" />
                  <stop offset="100%" stopColor="rgba(59, 130, 246, 0.2)" />
                </linearGradient>
              </defs>

              {/* Connection Lines */}
              {[...Array(50)].map((_, i) => (
                <motion.line
                  key={`line-${i}`}
                  x1={Math.random() * 500}
                  y1={Math.random() * 400}
                  x2={Math.random() * 500}
                  y2={Math.random() * 400}
                  stroke="url(#lineGradient)"
                  strokeWidth="2"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={inView ? { pathLength: 1, opacity: 1 } : {}}
                  transition={{ duration: 1.5, delay: i * 0.02 }}
                />
              ))}

              {/* Nodes */}
              {[...Array(30)].map((_, i) => (
                <motion.circle
                  key={`node-${i}`}
                  cx={Math.random() * 500}
                  cy={Math.random() * 400}
                  r="6"
                  fill="url(#nodeGradient)"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={inView ? { scale: 1, opacity: 1 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                />
              ))}
            </svg>

            {/* Data Flow Animation */}
            {[...Array(10)].map((_, i) => (
              <motion.div
                key={`particle-${i}`}
                className="absolute w-2 h-2 rounded-full bg-gradient-to-r from-pink-400 to-blue-400"
                animate={{
                  x: [0, 500],
                  y: [Math.random() * 400, Math.random() * 400],
                  scale: [1, 1.2, 1],
                  opacity: [0.2, 0.8, 0.2],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "linear",
                  delay: i * 0.4,
                }}
              />
            ))}
          </motion.div>

          {/* Output Layer */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.6 }}
            className="absolute right-0 top-1/2 -translate-y-1/2 w-64 space-y-4"
          >
            <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-100">
              <h3 className="font-semibold mb-2 text-gray-900">Output Layer</h3>
              <div className="space-y-2">
                <div className="h-8 bg-gradient-to-r from-green-100 to-emerald-100 rounded-lg animate-pulse" />
                <div className="h-8 bg-gradient-to-r from-green-100 to-emerald-100 rounded-lg animate-pulse" />
                <div className="h-8 bg-gradient-to-r from-green-100 to-emerald-100 rounded-lg animate-pulse" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Model Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: Brain, value: '175B', label: 'Parameters' },
            { icon: Database, value: '100M+', label: 'Training Examples' },
            { icon: Network, value: '99.9%', label: 'Accuracy' },
            { icon: Zap, value: '<100ms', label: 'Response Time' }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.8 + index * 0.1 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-pink-100 to-blue-100 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-all duration-300" />
              <div className="relative bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:border-pink-200 transition-all duration-300">
                <stat.icon className="h-8 w-8 mb-4 text-pink-500" />
                <div className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-blue-600 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-gray-600 text-sm">
                  {stat.label}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AlgorithmSection;