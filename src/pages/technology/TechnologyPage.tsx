import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Database, Network, Cloud, Lock, Zap } from 'lucide-react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const TechnologyPage = () => {
  const technologies = [
    {
      icon: Cpu,
      title: 'Advanced AI Models',
      description: 'Powered by state-of-the-art machine learning models specifically trained for product search and understanding'
    },
    {
      icon: Database,
      title: 'Real-time Processing',
      description: 'Process millions of products in real-time with our distributed computing infrastructure'
    },
    {
      icon: Network,
      title: 'Neural Networks',
      description: 'Deep learning networks trained on vast product datasets for accurate understanding and matching'
    },
    {
      icon: Cloud,
      title: 'Cloud Infrastructure',
      description: 'Scalable cloud architecture ensuring fast response times and high availability'
    },
    {
      icon: Lock,
      title: 'Security First',
      description: 'Enterprise-grade security protecting all data with end-to-end encryption'
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Optimized algorithms delivering results in milliseconds'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-200 to-white text-gray-900">
  <Navbar />
  
  <main className="pt-32 pb-20">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold mb-6"
        >
          Our{' '}
          <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">
            Technology
          </span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-xl text-gray-600 max-w-3xl mx-auto"
        >
          Discover the cutting-edge technology powering Kluret's AI search engine
        </motion.p>
      </div>

      {/* Technology Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {technologies.map((tech, index) => (
          <motion.div
            key={tech.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + index * 0.1 }}
            className="relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-200/10 to-purple-200/10 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative bg-white shadow-sm p-6 rounded-xl border border-gray-300">
              <div className="p-3 bg-gradient-to-r from-blue-200 to-purple-200 rounded-lg inline-block mb-4">
                <tech.icon className="h-6 w-6 text-blue-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{tech.title}</h3>
              <p className="text-gray-600">{tech.description}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Architecture Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="bg-white shadow-xl rounded-2xl p-8 border border-gray-300 mb-16"
      >
        <h2 className="text-2xl font-bold mb-8 text-center">System Architecture</h2>
        <div className="relative aspect-[16/9] bg-gray-100 rounded-xl p-8">
          {/* Architecture Visualization */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-full max-w-3xl">
              <div className="grid grid-cols-3 gap-8">
                {/* Input Layer */}
                <div className="space-y-4">
                  <div className="h-16 bg-gradient-to-r from-blue-200 to-purple-200 rounded-lg flex items-center justify-center text-sm font-medium">
                    User Query
                  </div>
                  <div className="h-16 bg-gradient-to-r from-blue-200 to-purple-200 rounded-lg flex items-center justify-center text-sm font-medium">
                    Product Data
                  </div>
                </div>

                {/* Processing Layer */}
                <div className="space-y-4">
                  <div className="h-40 bg-gradient-to-r from-pink-200 to-purple-200 rounded-lg flex items-center justify-center text-sm font-medium p-4 text-center">
                    AI Processing Engine
                  </div>
                </div>

                {/* Output Layer */}
                <div className="space-y-4">
                  <div className="h-16 bg-gradient-to-r from-blue-200 to-purple-200 rounded-lg flex items-center justify-center text-sm font-medium">
                    Search Results
                  </div>
                  <div className="h-16 bg-gradient-to-r from-blue-200 to-purple-200 rounded-lg flex items-center justify-center text-sm font-medium">
                    Recommendations
                  </div>
                </div>
              </div>

              {/* Connecting Lines */}
              <div className="absolute inset-0 pointer-events-none">
                <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="rgba(59, 130, 246, 0.3)" />
                      <stop offset="100%" stopColor="rgba(147, 51, 234, 0.3)" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M 200,50 L 400,100 M 200,150 L 400,100 M 400,100 L 600,50 M 400,100 L 600,150"
                    stroke="url(#gradient)"
                    strokeWidth="2"
                    fill="none"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Performance Metrics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-8"
      >
        <div className="bg-white shadow-sm rounded-xl p-6 border border-gray-300">
          <div className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">
            99.9%
          </div>
          <div className="text-gray-600">System Uptime</div>
        </div>
        <div className="bg-white shadow-sm rounded-xl p-6 border border-gray-300">
          <div className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">
            &lt;100ms
          </div>
          <div className="text-gray-600">Response Time</div>
        </div>
        <div className="bg-white shadow-sm rounded-xl p-6 border border-gray-300">
          <div className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">
            1M+
          </div>
          <div className="text-gray-600">Daily Searches</div>
        </div>
      </motion.div>
    </div>
  </main>

  <Footer />
</div>

  );
};

export default TechnologyPage;