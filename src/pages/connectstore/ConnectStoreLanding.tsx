import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Store, Clock, Globe, BarChart3, ArrowRight, Shield, Zap, X, Users, ShoppingCart, Boxes, CreditCard } from 'lucide-react';
import Globe3D from '../../components/animations/Globe3D';

const ConnectStoreLanding = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Clock,
      title: '24/7 Integration',
      description: 'Set up your store quickly and start selling immediately with our seamless integration process'
    },
    {
      icon: Globe,
      title: 'Global Reach',
      description: 'Get your products listed on the official Kluret marketplace, reaching customers worldwide'
    },
    {
      icon: BarChart3,
      title: 'Analytics Dashboard',
      description: 'Access real-time insights about your store performance and customer behavior'
    }
  ];

  const benefits = [
    {
      icon: Shield,
      title: 'Secure Platform',
      description: 'Enterprise-grade security protecting your store and customer data',
      stats: '99.9% Uptime'
    },
    {
      icon: Store,
      title: 'Dedicated Store Page',
      description: 'Custom branded store page on Kluret marketplace',
      stats: 'Fully Customizable'
    },
    {
      icon: Zap,
      title: 'AI-Powered Search',
      description: 'Smart product recommendations increasing your sales',
      stats: '+45% Conversion'
    }
  ];

  const metrics = [
    {
      icon: Users,
      value: '10M+',
      label: 'Active Shoppers',
      description: 'Monthly active users on Kluret'
    },
    {
      icon: ShoppingCart,
      value: '500K+',
      label: 'Daily Orders',
      description: 'Orders processed through our platform'
    },
    {
      icon: Boxes,
      value: '50K+',
      label: 'Stores',
      description: 'Businesses trust Kluret'
    },
    {
      icon: CreditCard,
      value: '€2M+',
      label: 'Daily GMV',
      description: 'Gross Merchandise Value'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-black text-white">
      {/* Close Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => navigate('/chat')}
        className="fixed top-8 right-8 z-50 p-2 rounded-full hover:bg-white/10 transition-colors"
      >
        <X className="h-6 w-6 text-white/70 hover:text-white" />
      </motion.button>

      {/* Hero Section with Globe */}
      <div className="relative pt-32 pb-20 overflow-hidden">
        <Globe3D />
        <div className="relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                Grow Your Business with{' '}
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
                Connect your store to Kluret's AI-powered marketplace and reach millions of customers worldwide. Setup takes minutes, benefits last forever.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-4"
              >
                <button
                  onClick={() => navigate('/connectstore/create-account')}
                  className="px-8 py-4 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 text-white font-medium flex items-center gap-2 hover:from-pink-600 hover:to-purple-600 transition-all group shadow-lg"
                >
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
      </div>

      {/* Metrics Section - White Background */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {metrics.map((metric, index) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white shadow-lg p-6 rounded-xl border border-pink-100"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-2 bg-pink-50 rounded-lg">
                    <metric.icon className="h-6 w-6 text-pink-500" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">{metric.value}</div>
                    <div className="text-sm text-gray-600">{metric.label}</div>
                  </div>
                </div>
                <p className="text-sm text-gray-600">{metric.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section - Dark Background */}
      <div className="py-20 bg-gradient-to-br from-gray-900 via-gray-900 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Everything You Need to Succeed</h2>
            <p className="text-xl text-gray-400">Powerful tools to grow your online business</p>
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
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 to-purple-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10">
                  <div className="p-3 bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-xl inline-block mb-4">
                    <feature.icon className="h-6 w-6 text-pink-400" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Benefits Section - White Background */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">Why Choose Kluret</h2>
            <p className="text-xl text-gray-600">Join thousands of successful businesses</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-6 rounded-xl shadow-lg border border-pink-100"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-2 bg-pink-50 rounded-lg">
                    <benefit.icon className="h-5 w-5 text-pink-500" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{benefit.title}</h3>
                    <p className="text-sm text-pink-500">{benefit.stats}</p>
                  </div>
                </div>
                <p className="text-gray-600">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section - Dark Background */}
      <div className="py-20 bg-gradient-to-br from-gray-900 via-gray-900 to-black">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-gray-400 mb-8">
            Join the thousands of businesses already growing with Kluret's AI-powered marketplace
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/connectstore/create-account')}
            className="px-8 py-4 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 text-white font-medium flex items-center gap-2 mx-auto hover:from-pink-600 hover:to-purple-600 transition-all group shadow-lg"
          >
            Create Your Store
            <ArrowRight className="h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default ConnectStoreLanding;