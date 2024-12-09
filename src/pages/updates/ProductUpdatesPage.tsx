import React from 'react';
import { motion } from 'framer-motion';
import { Package, ArrowRight, Calendar, Tag } from 'lucide-react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const updates = [
  {
    date: '2024-03-15',
    version: '2.4.0',
    title: 'Enhanced Product Search',
    description: 'Improved search accuracy and performance with new AI algorithms',
    changes: [
      'Implemented advanced product matching algorithm',
      'Reduced search latency by 40%',
      'Added support for multi-language product descriptions'
    ]
  },
  {
    date: '2024-03-01',
    version: '2.3.0',
    title: 'UI/UX Improvements',
    description: 'Major updates to the user interface and experience',
    changes: [
      'Redesigned product cards for better visibility',
      'Added real-time price tracking',
      'Improved mobile responsiveness'
    ]
  }
];

const ProductUpdatesPage = () => {
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
              <Package className="h-8 w-8 text-blue-400" />
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-bold mb-6"
            >
              Product{' '}
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text">
                Updates
              </span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-gray-400 max-w-3xl mx-auto"
            >
              Stay up to date with the latest improvements and features
            </motion.p>
          </div>

          {/* Updates Timeline */}
          <div className="space-y-8 mb-16">
            {updates.map((update, index) => (
              <motion.div
                key={update.version}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10">
                  <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <Calendar className="h-4 w-4" />
                      {update.date}
                    </div>
                    <div className="flex items-center gap-2">
                      <Tag className="h-4 w-4 text-blue-400" />
                      <span className="text-sm font-medium bg-blue-400/10 text-blue-400 px-2 py-1 rounded-full">
                        v{update.version}
                      </span>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-2">{update.title}</h3>
                  <p className="text-gray-400 mb-4">{update.description}</p>
                  
                  <ul className="space-y-2">
                    {update.changes.map((change, i) => (
                      <li key={i} className="flex items-center gap-2 text-gray-300">
                        <ArrowRight className="h-4 w-4 text-blue-400 flex-shrink-0" />
                        {change}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Subscribe Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10 text-center"
          >
            <h2 className="text-2xl font-bold mb-4">Stay Updated</h2>
            <p className="text-gray-400 mb-6">
              Subscribe to our newsletter to receive the latest updates directly in your inbox
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-white"
              />
              <button className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-medium hover:from-blue-600 hover:to-purple-600 transition-all">
                Subscribe
              </button>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductUpdatesPage;