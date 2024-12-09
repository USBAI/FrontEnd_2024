import React from 'react';
import { motion } from 'framer-motion';
import { Code, Copy, Book, Terminal, Search, Package } from 'lucide-react';
import DashboardLayout from './DashboardLayout';

const Documentation = () => {
  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-3xl font-bold mb-4">API Documentation</h1>
          <p className="text-gray-400">Complete guide to using the Kluret API</p>
        </div>

        {/* Quick Start */}
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 mb-8">
          <h2 className="text-xl font-bold mb-6">Quick Start</h2>
          <div className="bg-black/30 p-4 rounded-lg mb-6">
            <div className="flex items-center justify-between mb-2">
              <code className="text-blue-400">Authorization: Bearer YOUR_API_KEY</code>
              <button className="p-1 hover:bg-white/10 rounded transition-colors">
                <Copy className="h-4 w-4 text-gray-400" />
              </button>
            </div>
            <p className="text-sm text-gray-400">
              Include this header in all API requests to authenticate
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Terminal, title: 'Installation', description: 'Set up the API client' },
              { icon: Code, title: 'Authentication', description: 'Secure your requests' },
              { icon: Search, title: 'First Request', description: 'Make your first API call' }
            ].map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/5 rounded-lg p-4"
              >
                <step.icon className="h-6 w-6 text-blue-400 mb-2" />
                <h3 className="font-semibold mb-1">{step.title}</h3>
                <p className="text-sm text-gray-400">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* API Reference */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Endpoints */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
              <div className="p-6 border-b border-white/10">
                <h2 className="text-xl font-bold">Endpoints</h2>
              </div>
              <div className="divide-y divide-white/10">
                {[
                  { method: 'POST', path: '/api/v1/search', description: 'Search for products' },
                  { method: 'GET', path: '/api/v1/products/{id}', description: 'Get product details' },
                  { method: 'GET', path: '/api/v1/categories', description: 'List all categories' }
                ].map((endpoint, index) => (
                  <div key={index} className="p-6">
                    <div className="flex items-start gap-4">
                      <span className={`px-2 py-1 rounded text-sm ${
                        endpoint.method === 'POST'
                          ? 'bg-green-500/20 text-green-400'
                          : 'bg-blue-500/20 text-blue-400'
                      }`}>
                        {endpoint.method}
                      </span>
                      <div>
                        <code className="text-blue-400">{endpoint.path}</code>
                        <p className="text-sm text-gray-400 mt-1">{endpoint.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="space-y-6">
            <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
              <div className="p-6 border-b border-white/10">
                <h2 className="text-xl font-bold">Contents</h2>
              </div>
              <div className="p-6">
                <nav className="space-y-4">
                  {[
                    { icon: Book, label: 'Introduction' },
                    { icon: Terminal, label: 'Authentication' },
                    { icon: Package, label: 'Endpoints' },
                    { icon: Code, label: 'Examples' }
                  ].map((item, index) => (
                    <a
                      key={index}
                      href="#"
                      className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors"
                    >
                      <item.icon className="h-5 w-5" />
                      {item.label}
                    </a>
                  ))}
                </nav>
              </div>
            </div>

            {/* SDK Downloads */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
              <div className="p-6 border-b border-white/10">
                <h2 className="text-xl font-bold">SDKs</h2>
              </div>
              <div className="p-6 space-y-4">
                {['JavaScript', 'Python', 'PHP', 'Ruby'].map((sdk, index) => (
                  <button
                    key={index}
                    className="w-full px-4 py-2 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 rounded-lg transition-colors text-sm"
                  >
                    Download {sdk} SDK
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Documentation;