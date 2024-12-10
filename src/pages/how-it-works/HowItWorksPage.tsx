import React from 'react';
import { motion } from 'framer-motion';
import { Search, MessageSquare, ShoppingCart, Sparkles, Brain, Zap, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const HowItWorksPage = () => {
  const steps = [
    {
      icon: Search,
      title: 'Smart Search',
      description: 'Enter your search query in natural language. Our AI understands context and intent.'
    },
    {
      icon: Brain,
      title: 'AI Processing',
      description: 'Our advanced AI analyzes your query and searches across millions of products.'
    },
    {
      icon: Sparkles,
      title: 'Intelligent Matching',
      description: 'Products are matched based on relevance, quality, and your preferences.'
    },
    {
      icon: ShoppingCart,
      title: 'Easy Purchase',
      description: 'Choose your preferred retailer and complete your purchase seamlessly.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-black text-white">
      <Navbar />
      
      <main className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-block p-3 rounded-2xl bg-blue-500/10 backdrop-blur-sm mb-8"
            >
              <Zap className="h-8 w-8 text-blue-400" />
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-bold mb-6"
            >
              How Kluret Works
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-gray-400 max-w-3xl mx-auto"
            >
              Discover how our AI-powered search engine helps you find the perfect products
            </motion.p>
          </div>

          {/* Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10">
                  <div className="p-3 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg inline-block mb-4">
                    <step.icon className="h-6 w-6 text-blue-400" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-gray-400">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Features Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10 mb-16"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-2xl font-bold mb-4">Advanced Features</h2>
                <ul className="space-y-4">
                  <li className="flex items-center gap-3">
                    <div className="p-2 bg-blue-500/10 rounded-lg">
                      <Brain className="h-5 w-5 text-blue-400" />
                    </div>
                    <span>Natural Language Processing</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="p-2 bg-blue-500/10 rounded-lg">
                      <MessageSquare className="h-5 w-5 text-blue-400" />
                    </div>
                    <span>Contextual Understanding</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="p-2 bg-blue-500/10 rounded-lg">
                      <Sparkles className="h-5 w-5 text-blue-400" />
                    </div>
                    <span>Smart Recommendations</span>
                  </li>
                </ul>
              </div>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl" />
                <div className="relative p-6">
                  <h3 className="text-xl font-semibold mb-4">Try It Yourself</h3>
                  <p className="text-gray-400 mb-6">
                    Experience the power of AI-driven product search firsthand.
                  </p>
                  <Link
                    to="/chat"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg text-white font-medium hover:from-blue-600 hover:to-purple-600 transition-all group"
                  >
                    Start Searching
                    <ArrowRight className="h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="text-center"
          >
            <h2 className="text-2xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-gray-400 mb-6">
              Join thousands of satisfied users who have discovered the power of AI-driven product search
            </p>
            <Link
              to="/chat"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full text-white font-medium hover:from-blue-600 hover:to-purple-600 transition-all group"
            >
              Try Kluret Now
              <ArrowRight className="h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default HowItWorksPage;