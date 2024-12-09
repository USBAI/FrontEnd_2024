import React from 'react';
import { motion } from 'framer-motion';
import { Star, TrendingUp, Users, ShoppingBag, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const PartnerSuccessStoriesPage = () => {
  const stories = [
    {
      company: 'Nordic Fashion',
      logo: 'https://images.unsplash.com/photo-1633409361618-c73427e4e206?w=400&h=400&fit=crop',
      quote: "Kluret's API integration has transformed our online store, increasing conversion rates by 45%",
      author: 'Maria Andersson',
      role: 'E-commerce Director',
      metrics: [
        { label: 'Conversion Rate', value: '+45%' },
        { label: 'Search Accuracy', value: '99.8%' },
        { label: 'Customer Satisfaction', value: '4.9/5' }
      ]
    },
    {
      company: 'TechStore Sweden',
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
              <Star className="h-8 w-8 text-blue-400" />
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-bold mb-6"
            >
              Partner{' '}
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text">
                Success Stories
              </span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-gray-400 max-w-3xl mx-auto"
            >
              See how our partners are transforming their businesses with Kluret
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
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative bg-white/5 backdrop-blur-xl p-8 rounded-2xl border border-white/10">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="md:col-span-2">
                      <div className="flex items-center gap-4 mb-6">
                        <img
                          src={story.logo}
                          alt={story.company}
                          className="w-16 h-16 rounded-xl object-cover"
                        />
                        <div>
                          <h3 className="text-xl font-bold">{story.company}</h3>
                          <p className="text-gray-400">{story.author}, {story.role}</p>
                        </div>
                      </div>
                      <blockquote className="text-xl text-gray-300 mb-6">
                        "{story.quote}"
                      </blockquote>
                      <div className="grid grid-cols-3 gap-4">
                        {story.metrics.map((metric) => (
                          <div key={metric.label}>
                            <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text">
                              {metric.value}
                            </div>
                            <div className="text-sm text-gray-400">{metric.label}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl" />
                      <div className="relative p-6">
                        <h4 className="font-semibold mb-4">Key Results</h4>
                        <ul className="space-y-3">
                          <li className="flex items-center gap-2 text-sm">
                            <TrendingUp className="h-4 w-4 text-green-400" />
                            <span>Increased conversion rates</span>
                          </li>
                          <li className="flex items-center gap-2 text-sm">
                            <Users className="h-4 w-4 text-blue-400" />
                            <span>Higher customer satisfaction</span>
                          </li>
                          <li className="flex items-center gap-2 text-sm">
                            <ShoppingBag className="h-4 w-4 text-purple-400" />
                            <span>Reduced cart abandonment</span>
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
            <h2 className="text-2xl font-bold mb-6">Ready to Write Your Success Story?</h2>
            <Link
              to="/partners/program"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full text-white font-medium hover:from-blue-600 hover:to-purple-600 transition-all group"
            >
              Join Our Partner Program
              <ArrowRight className="h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PartnerSuccessStoriesPage;