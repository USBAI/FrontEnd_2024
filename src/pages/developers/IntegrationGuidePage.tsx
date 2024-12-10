import React from 'react';
import { motion } from 'framer-motion';
import { Code, Terminal, Database, Cloud, ArrowRight } from 'lucide-react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const IntegrationGuidePage = () => {
  const steps = [
    {
      title: 'Authentication',
      description: 'Set up API keys and authentication',
      code: `const response = await fetch('https://api.kluret.com/v1/search', {
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY'
  }
});`
    },
    {
      title: 'Making Requests',
      description: 'Learn how to make API requests',
      code: `const data = {
  query: 'Nike shoes',
  filters: {
    price_range: { min: 500, max: 2000 }
  }
};

const response = await fetch('https://api.kluret.com/v1/search', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(data)
});`
    },
    {
      title: 'Handling Responses',
      description: 'Process API responses and handle errors',
      code: `try {
  const response = await fetch('https://api.kluret.com/v1/search');
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.message);
  }
  
  return data;
} catch (error) {
  console.error('API Error:', error);
}`
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
              Integration Guide
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-gray-400 max-w-3xl mx-auto"
            >
              Learn how to integrate Kluret's API into your application
            </motion.p>
          </div>

          {/* Steps */}
          <div className="space-y-8 mb-16">
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
                  <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                  <p className="text-gray-400 mb-4">{step.description}</p>
                  <div className="relative bg-black/50 rounded-lg p-4">
                    <button className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors">
                      <Terminal className="h-4 w-4" />
                    </button>
                    <pre className="text-sm text-gray-300 overflow-x-auto">
                      <code>{step.code}</code>
                    </pre>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {[
              {
                icon: Database,
                title: 'Real-time Data',
                description: 'Access product data in real-time with our high-performance API'
              },
              {
                icon: Cloud,
                title: 'Cloud Infrastructure',
                description: 'Built on reliable cloud infrastructure for maximum uptime'
              },
              {
                icon: Terminal,
                title: 'Developer Tools',
                description: 'Comprehensive SDKs and tools for easy integration'
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10"
              >
                <div className="p-3 bg-blue-500/10 rounded-lg inline-block mb-4">
                  <feature.icon className="h-6 w-6 text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10 text-center"
          >
            <h2 className="text-2xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-gray-400 mb-6">
              Sign up for API access and start building with Kluret
            </p>
            <a
              href="/accessapi"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full text-white font-medium hover:from-blue-600 hover:to-purple-600 transition-all"
            >
              Get API Access
              <ArrowRight className="h-5 w-5" />
            </a>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default IntegrationGuidePage;