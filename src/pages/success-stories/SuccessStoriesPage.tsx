import React from 'react';
import { motion } from 'framer-motion';
import { Star, TrendingUp, Users, ShoppingBag, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const SuccessStoriesPage = () => {
  const stories = [
    {
      company: 'TechStyle',
      logo: 'https://images.unsplash.com/photo-1633409361618-c73427e4e206?w=400&h=400&fit=crop',
      quote: "Kluret's AI search has transformed our online store, increasing conversion rates by 45%",
      author: 'Maria Andersson',
      role: 'E-commerce Director',
      metrics: [
        { label: 'Conversion Rate', value: '+45%' },
        { label: 'Search Accuracy', value: '99.8%' },
        { label: 'Customer Satisfaction', value: '4.9/5' }
      ]
    },
    {
      company: 'FashionNova',
      logo: 'https://images.unsplash.com/photo-1614036417651-efe5912149d8?w=400&h=400&fit=crop',
      quote: "Our customers can now find exactly what they're looking for in seconds",
      author: 'Erik Johansson',
      role: 'CEO',
      metrics: [
        { label: 'Search Time', value: '-65%' },
        { label: 'Sales Growth', value: '+38%' },
        { label: 'Return Rate', value: '-25%' }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gwhite from-gray-50 via-gray-100 to-white text-gray-900">
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
              <Star className="h-8 w-8 text-blue-500" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-bold mb-6 text-gray-800"
            >
              Success{' '}
              <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">
                Stories
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-gray-600 max-w-3xl mx-auto"
            >
              See how businesses are transforming their e-commerce with Kluret
            </motion.p>
          </div>

          {/* Success Stories */}
          <div className="space-y-12 mb-16">
            {stories.map((story, index) => (
              <motion.div
                key={story.company}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-100/50 to-purple-100/50 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative bg-white shadow-lg p-8 rounded-2xl border border-gray-200">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="md:col-span-2">
                      <div className="flex items-center gap-4 mb-6">
                        <img
                          src={story.logo}
                          alt={story.company}
                          className="w-16 h-16 rounded-xl object-cover"
                        />
                        <div>
                          <h3 className="text-xl font-bold text-gray-800">{story.company}</h3>
                          <p className="text-gray-500">{story.author}, {story.role}</p>
                        </div>
                      </div>
                      <blockquote className="text-xl text-gray-700 mb-6">
                        "{story.quote}"
                      </blockquote>
                      <div className="grid grid-cols-3 gap-4">
                        {story.metrics.map((metric) => (
                          <div key={metric.label}>
                            <div className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">
                              {metric.value}
                            </div>
                            <div className="text-sm text-gray-500">{metric.label}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-100/50 to-purple-100/50 rounded-xl" />
                      <div className="relative p-6">
                        <h4 className="font-semibold mb-4 text-gray-800">Key Results</h4>
                        <ul className="space-y-3">
                          <li className="flex items-center gap-2 text-sm">
                            <TrendingUp className="h-4 w-4 text-green-500" />
                            <span className="text-gray-700">Increased conversion rates</span>
                          </li>
                          <li className="flex items-center gap-2 text-sm">
                            <Users className="h-4 w-4 text-blue-500" />
                            <span className="text-gray-700">Higher customer satisfaction</span>
                          </li>
                          <li className="flex items-center gap-2 text-sm">
                            <ShoppingBag className="h-4 w-4 text-purple-500" />
                            <span className="text-gray-700">Reduced cart abandonment</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-center"
          >
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Ready to Write Your Success Story?</h2>
            <Link
              to="/connectstore"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full text-white font-medium hover:from-blue-600 hover:to-purple-600 transition-all group"
            >
              Get Started Now
              <ArrowRight className="h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SuccessStoriesPage;
