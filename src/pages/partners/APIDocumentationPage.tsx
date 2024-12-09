import React from 'react';
import { motion } from 'framer-motion';
import { Code, Copy, Check, Terminal, Database, Cloud, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const APIDocumentationPage = () => {
  const endpoints = [
    {
      method: 'POST',
      path: '/api/v1/search',
      description: 'Search for products',
      example: `const response = await fetch('https://api.kluret.com/v1/search', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    query: 'Nike shoes',
    filters: {
      price_range: { min: 500, max: 2000 },
      categories: ['footwear', 'sports']
    }
  })
});`
    },
    {
      method: 'GET',
      path: '/api/v1/products/{id}',
      description: 'Get product details',
      example: `const response = await fetch('https://api.kluret.com/v1/products/123', {
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY'
  }
});`
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
              <Code className="h-8 w-8 text-blue-400" />
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-bold mb-6"
            >
              API{' '}
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text">
                Documentation
              </span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-gray-400 max-w-3xl mx-auto"
            >
              Comprehensive guide to integrating with Kluret's API
            </motion.p>
          </div>

          {/* API Overview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10 mb-12"
          >
            <h2 className="text-2xl font-bold mb-4">Getting Started</h2>
            <p className="text-gray-400 mb-6">
              The Kluret API provides a powerful interface for integrating our AI-powered search capabilities into your applications.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  icon: Terminal,
                  title: 'RESTful API',
                  description: 'Simple and intuitive REST endpoints'
                },
                {
                  icon: Database,
                  title: 'Real-time Data',
                  description: 'Live product updates and search results'
                },
                {
                  icon: Cloud,
                  title: 'Cloud-based',
                  description: 'Scalable infrastructure for any size'
                }
              ].map((feature, index) => (
                <div key={index} className="bg-white/5 rounded-lg p-4">
                  <feature.icon className="h-6 w-6 text-blue-400 mb-2" />
                  <h3 className="font-semibold mb-1">{feature.title}</h3>
                  <p className="text-sm text-gray-400">{feature.description}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* API Endpoints */}
          <div className="space-y-8 mb-16">
            {endpoints.map((endpoint, index) => (
              <motion.div
                key={endpoint.path}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 overflow-hidden"
              >
                <div className="p-6 border-b border-white/10">
                  <div className="flex items-center gap-4 mb-2">
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      endpoint.method === 'POST' 
                        ? 'bg-green-500/20 text-green-400'
                        : 'bg-blue-500/20 text-blue-400'
                    }`}>
                      {endpoint.method}
                    </span>
                    <code className="text-gray-300">{endpoint.path}</code>
                  </div>
                  <p className="text-gray-400">{endpoint.description}</p>
                </div>
                <div className="relative bg-black/50 p-6">
                  <button className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-lg transition-colors">
                    <Copy className="h-4 w-4 text-gray-400" />
                  </button>
                  <pre className="text-sm text-gray-300 overflow-x-auto">
                    <code>{endpoint.example}</code>
                  </pre>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-center"
          >
            <h2 className="text-2xl font-bold mb-6">Ready to Start Building?</h2>
            <Link
              to="/accessapi"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full text-white font-medium hover:from-blue-600 hover:to-purple-600 transition-all group"
            >
              Get API Access
              <ArrowRight className="h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default APIDocumentationPage;