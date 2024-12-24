import React from 'react';
import { motion } from 'framer-motion';
import { Search, Sparkles, Brain, Target, Zap, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const AISearchPage = () => {
  const features = [
    {
      icon: Brain,
      title: 'Natural Language Understanding',
      description: 'Our AI understands complex search queries just like a human would'
    },
    {
      icon: Target,
      title: 'Precise Matching',
      description: "Advanced algorithms ensure you find exactly what you're looking for"
    },
    {
      icon: Sparkles,
      title: 'Smart Recommendations',
      description: 'Get personalized product suggestions based on your preferences'
    },
    {
      icon: Zap,
      title: 'Real-time Results',
      description: 'Lightning-fast search results across millions of products'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-50 to-white text-black">
  <Navbar />

  <main className="pt-32 pb-20">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-block p-3 rounded-2xl bg-blue-100/50 backdrop-blur-sm mb-8"
        >
          <Search className="h-8 w-8 text-blue-600" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold mb-6"
        >
          AI-Powered{' '}
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
            Product Search
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-xl text-gray-600 max-w-3xl mx-auto mb-8"
        >
          Experience the future of online shopping with our advanced AI search engine
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Link
            to="/chat"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full text-white font-medium hover:from-blue-600 hover:to-purple-600 transition-all group"
          >
            Try AI Search Now
            <ArrowRight className="h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + index * 0.1 }}
            className="relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-100/50 to-purple-100/50 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative bg-white backdrop-blur-sm p-6 rounded-xl border border-gray-200">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-gradient-to-r from-blue-100/50 to-purple-100/50 rounded-lg">
                  <feature.icon className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Blog Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="bg-white backdrop-blur-xl rounded-2xl p-8 border border-gray-200 mb-16"
      >
        <h2 className="text-2xl font-bold mb-8 text-center">How Our AI Powers Kluret</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <img
              src="https://media.istockphoto.com/id/1207319918/sv/vektor/isometrisk-konceptillustration-med-m%C3%A4nniskor.jpg?s=612x612&w=0&k=20&c=96A-NHeH6HdU_2b40Tdv2hS4mzv9ov9iTaHvN_zfUWI="
              alt="E-commerce"
              className="rounded-lg shadow-md mb-4"
            />
            <h3 className="text-xl font-semibold mb-2">Revolutionizing E-commerce</h3>
            <p className="text-gray-600">
              Our AI system leverages cutting-edge algorithms to deliver faster and more accurate product searches, creating a seamless shopping experience.
            </p>
          </div>
          <div>
            <img
              src="https://media.istockphoto.com/id/2169852820/sv/foto/abstract-sci-fi-sphere-with-particles-technology-network-connection-on-world-futuristic.jpg?s=612x612&w=0&k=20&c=ZMhxB6HJ3BOFOztWeIok8ZyzEO15wH4yHzLXshMYxsw="
              alt="AI Model Neurons"
              className="rounded-lg shadow-md mb-4"
            />
            <h3 className="text-xl font-semibold mb-2">AI Model at Work</h3>
            <p className="text-gray-600">
              The neural network behind Kluret analyzes millions of data points in real-time to understand user intent and provide personalized recommendations.
            </p>
          </div>
          <div>
            <img
              src="https://media.istockphoto.com/id/1174642606/sv/vektor/abstrakt-svart-kub-med-bl%C3%A5tt-ljus.jpg?s=612x612&w=0&k=20&c=bkvSXH_6ESY9rl1KiforAP2WlhSrgArIINEK3sqeJo4="
              alt="Nodes Powering Kluret"
              className="rounded-lg shadow-md mb-4"
            />
            <h3 className="text-xl font-semibold mb-2">Powered by Thousands of Nodes</h3>
            <p className="text-gray-600">
              Kluret's AI is powered by a robust infrastructure of interconnected nodes that ensures reliability and lightning-fast response times.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { value: '10M+', label: 'Monthly Searches' },
          { value: '99.9%', label: 'Accuracy Rate' },
          { value: '<100ms', label: 'Response Time' }
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 + index * 0.1 }}
            className="bg-white backdrop-blur-sm rounded-xl p-6 border border-gray-200 text-center"
          >
            <div className="text-3xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
              {stat.value}
            </div>
            <div className="text-gray-600">{stat.label}</div>
          </motion.div>
        ))}
      </div>
    </div>
  </main>

  <Footer />
</div>

  );
};

export default AISearchPage;