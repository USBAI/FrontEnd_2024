import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Zap, ArrowRight, Calendar, Target } from 'lucide-react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const improvements = [
  {
    date: '2024-03-10',
    title: 'Enhanced Natural Language Processing',
    description: 'Major improvements to our AI\'s understanding of complex search queries',
    metrics: [
      { label: 'Accuracy Improvement', value: '+15%' },
      { label: 'Processing Speed', value: '-30%' },
      { label: 'Language Support', value: '12 new' }
    ],
    details: [
      'Improved context understanding in search queries',
      'Better handling of spelling mistakes and typos',
      'Enhanced multi-language support'
    ]
  },
  {
    date: '2024-02-25',
    title: 'Recommendation Engine Update',
    description: 'Upgraded our AI recommendation system for more personalized results',
    metrics: [
      { label: 'Relevance Score', value: '+25%' },
      { label: 'User Engagement', value: '+40%' },
      { label: 'Conversion Rate', value: '+18%' }
    ],
    details: [
      'New personalization algorithms',
      'Improved product similarity matching',
      'Enhanced cross-category recommendations'
    ]
  }
];

const AIImprovementsPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-100 to-gray-200 text-gray-900">
      <Navbar />
      
      <main className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-block p-3 rounded-2xl bg-blue-100 backdrop-blur-sm mb-8"
            >
              <Brain className="h-8 w-8 text-blue-600" />
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-bold mb-6"
            >
              AI{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
                Improvements
              </span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-gray-600 max-w-3xl mx-auto"
            >
              Discover how our AI technology keeps getting smarter
            </motion.p>
          </div>

          {/* Improvements List */}
          <div className="space-y-12 mb-16">
            {improvements.map((improvement, index) => (
              <motion.div
                key={improvement.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-purple-100 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative bg-white backdrop-blur-xl p-8 rounded-2xl border border-gray-200">
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                    <Calendar className="h-4 w-4" />
                    {improvement.date}
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-2 text-gray-900">{improvement.title}</h3>
                  <p className="text-gray-600 mb-6">{improvement.description}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    {improvement.metrics.map((metric) => (
                      <div
                        key={metric.label}
                        className="bg-gray-100 rounded-lg p-4 text-center"
                      >
                        <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text mb-1">
                          {metric.value}
                        </div>
                        <div className="text-sm text-gray-500">{metric.label}</div>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-3">
                    {improvement.details.map((detail, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <Target className="h-4 w-4 text-blue-600" />
                        </div>
                        <span className="text-gray-700">{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Performance Metrics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              { label: 'Search Accuracy', value: '99.9%', icon: Target },
              { label: 'Response Time', value: '<100ms', icon: Zap },
              { label: 'Daily Queries', value: '1M+', icon: Brain }
            ].map((metric, index) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="bg-gray-100 backdrop-blur-sm rounded-xl p-6 border border-gray-200"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <metric.icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
                      {metric.value}
                    </div>
                    <div className="text-gray-600">{metric.label}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AIImprovementsPage;