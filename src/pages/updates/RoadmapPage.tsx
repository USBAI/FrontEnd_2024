import React from 'react';
import { motion } from 'framer-motion';
import { Map, Calendar, CheckCircle, Clock, ArrowRight, Target } from 'lucide-react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const roadmapItems = [
  {
    quarter: 'Q2 2024',
    status: 'in-progress',
    title: 'Enhanced AI Search',
    description: 'Major improvements to our core search algorithm',
    items: [
      'Advanced natural language processing',
      'Multi-language support expansion',
      'Improved product recommendations'
    ]
  },
  {
    quarter: 'Q3 2024',
    status: 'planned',
    title: 'Mobile Experience',
    description: 'Optimizing the mobile shopping experience',
    items: [
      'Native mobile apps for iOS and Android',
      'Voice search capabilities',
      'Offline product browsing'
    ]
  },
  {
    quarter: 'Q4 2024',
    status: 'planned',
    title: 'Enterprise Features',
    description: 'New features for enterprise customers',
    items: [
      'Advanced analytics dashboard',
      'Custom API integration options',
      'Dedicated support system'
    ]
  }
];

const RoadmapPage = () => {
  return (
    <div className="min-h-screen bg-white text-black">
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
              <Map className="h-8 w-8 text-blue-500" />
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-bold mb-6"
            >
              Product{' '}
              <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">
                Roadmap
              </span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-gray-600 max-w-3xl mx-auto"
            >
              See what's coming next in Kluret's development journey
            </motion.p>
          </div>

          {/* Roadmap Timeline */}
          <div className="space-y-8 mb-16">
            {roadmapItems.map((item, index) => (
              <motion.div
                key={item.quarter}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-gray-200/10 to-gray-300/10 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-gray-700/10">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-blue-500" />
                      <span className="font-medium">{item.quarter}</span>
                    </div>
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm ${
                      item.status === 'in-progress'
                        ? 'bg-blue-500/20 text-blue-500'
                        : 'bg-purple-500/20 text-purple-500'
                    }`}>
                      {item.status === 'in-progress' ? (
                        <Clock className="h-4 w-4" />
                      ) : (
                        <Target className="h-4 w-4" />
                      )}
                      {item.status === 'in-progress' ? 'In Progress' : 'Planned'}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-gray-600 mb-6">{item.description}</p>

                  <div className="space-y-3">
                    {item.items.map((feature, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="p-2 bg-blue-500/10 rounded-lg">
                          <CheckCircle className="h-4 w-4 text-blue-500" />
                        </div>
                        <span className="text-gray-500">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Feedback Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-gray-300/10 text-center"
          >
            <h2 className="text-2xl font-bold mb-4">Help Shape Our Future</h2>
            <p className="text-gray-600 mb-6">
              We value your input! Share your ideas and suggestions for future features
            </p>
            <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-medium hover:from-blue-600 hover:to-purple-600 transition-all inline-flex items-center gap-2">
              Submit Feedback
              <ArrowRight className="h-5 w-5" />
            </button>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default RoadmapPage;
