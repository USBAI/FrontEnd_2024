import React from 'react';
import { motion } from 'framer-motion';
import { Store, Rocket, Globe, Shield, ArrowRight, Check } from 'lucide-react';
import { Link } from 'react-router-dom';

const ConnectStorePage = () => {
  const features = [
    {
      icon: Rocket,
      title: 'Quick Integration',
      description: 'Set up in minutes with our easy-to-use API and comprehensive documentation'
    },
    {
      icon: Globe,
      title: 'Multi-Platform Support',
      description: 'Works seamlessly with Shopify, WooCommerce, Magento, and more'
    },
    {
      icon: Shield,
      title: 'Secure & Reliable',
      description: 'Enterprise-grade security with 99.9% uptime guarantee'
    }
  ];

  const benefits = [
    'Increase conversion rates by up to 30%',
    'Reduce cart abandonment',
    'Enhance product discoverability',
    'Improve customer satisfaction',
    'Boost sales with AI-powered recommendations',
    'Real-time inventory sync'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-black text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center">
              <img
                src="https://www.kluret.se/static/media/kluret_wt.ad13e882d6d5f566612d2b35479039fd.svg"
                alt="Kluret"
                className="h-8"
              />
            </Link>
            <div className="flex items-center gap-4">
              <Link
                to="/accessapi"
                className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
              >
                API Access
              </Link>
              <Link
                to="/chat"
                className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-sm font-medium"
              >
                Back to Chat
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 via-purple-500/10 to-blue-500/10 animate-gradient" />
          <div className="absolute inset-0 backdrop-blur-[100px]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-block p-3 rounded-2xl bg-pink-500/10 backdrop-blur-sm mb-8"
            >
              <Store className="h-8 w-8 text-pink-400" />
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl font-bold mb-6"
            >
              Connect Your Store with{' '}
              <span className="bg-gradient-to-r from-pink-400 to-purple-400 text-transparent bg-clip-text">
                Kluret
              </span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-gray-300 mb-12"
            >
              Supercharge your e-commerce with AI-powered product search and recommendations
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <button className="px-8 py-4 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 text-white font-medium flex items-center gap-2 hover:from-pink-600 hover:to-purple-600 transition-all group">
                Get Started Now
                <ArrowRight className="h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="px-8 py-4 rounded-full bg-white/10 backdrop-blur-sm text-white font-medium hover:bg-white/20 transition-all">
                View Documentation
              </button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-black/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 to-purple-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative bg-gray-800/50 backdrop-blur-sm p-6 rounded-2xl border border-white/10">
                  <div className="p-3 bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-xl inline-block mb-4">
                    <feature.icon className="h-6 w-6 text-pink-400" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-8">
                Why Choose{' '}
                <span className="bg-gradient-to-r from-pink-400 to-purple-400 text-transparent bg-clip-text">
                  Kluret
                </span>
              </h2>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={benefit}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <div className="p-1 rounded-full bg-gradient-to-r from-pink-500 to-purple-500">
                      <Check className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-gray-300">{benefit}</span>
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 to-purple-500/10 rounded-3xl blur-2xl" />
              <div className="relative bg-gray-800/50 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
                <img
                  src="https://www.kluret.se/static/media/kluret_wt.ad13e882d6d5f566612d2b35479039fd.svg"
                  alt="Kluret"
                  className="h-12 mb-6"
                />
                <div className="space-y-6">
                  <div>
                    <div className="text-sm text-gray-400 mb-1">Monthly Searches</div>
                    <div className="text-3xl font-bold">1M+</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400 mb-1">Active Stores</div>
                    <div className="text-3xl font-bold">500+</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400 mb-1">Success Rate</div>
                    <div className="text-3xl font-bold">99.9%</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConnectStorePage;