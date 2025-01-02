import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, ChevronDown, Search, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const FAQPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const faqs = [
    {
      id: 1,
      category: 'General',
      questions: [
        {
          question: 'What is Kluret?',
          answer: 'Kluret is an AI-powered product search engine that helps users find products across multiple online retailers.'
        },
        {
          question: 'How does Kluret work?',
          answer: 'Kluret uses advanced AI algorithms to understand your search intent and find the most relevant products from our partner retailers.'
        }
      ]
    },
    {
      id: 2,
      category: 'About Kluret',
      questions: [
        { question: 'Introduction to Kluret', answer: 'Kluret is a cutting-edge AI search engine designed to revolutionize the way we search for products online.' },
        { question: 'Founders\' Vision', answer: 'Elias and Ernest envision a search engine that provides accurate results while understanding human language nuances.' },
        { question: 'Search Engine Capabilities', answer: 'Kluret excels at advanced search engine tasks, filtering results for relevant products.' },
        { question: 'Product Focus', answer: 'Currently focused on finding products online, with plans to expand to the Swedish entire web.' },
        { question: 'Version 1 Features', answer: 'The first version of Kluret offers product search capabilities for the Swedish web.' },
        { question: 'AI-Powered', answer: 'Kluret utilizes AI technology to understand queries and provide personalized results.' },
        { question: 'Natural Language Processing', answer: 'Built on NLP principles, Kluret understands user queries like a human.' },
        { question: 'Contextual Understanding', answer: 'Kluret ensures relevant results even for ambiguous queries.' },
        { question: 'Product Database', answer: 'Our database is updated regularly to reflect the latest online products.' },
        { question: 'Search Query Analysis', answer: 'Analyzing user queries helps us identify patterns and improve results.' }
      ]
    },
    {
      id: 3,
      category: 'Features',
      questions: [
        { question: 'User Experience', answer: 'Kluret offers an intuitive interface for a seamless search experience.' },
        { question: 'Product Filtering', answer: 'Advanced filters allow users to refine search results by criteria like price and brand.' },
        { question: 'Personalized Results', answer: 'Results are tailored to user preferences, search history, and browsing behavior.' },
        { question: 'Real-Time Updates', answer: 'The database updates in real-time to provide the latest information.' },
        { question: 'Security', answer: 'User data is protected with robust security measures.' },
        { question: 'Partnerships', answer: 'Collaborations with retailers expand our product offerings.' },
        { question: 'Expanding Capabilities', answer: 'We aim to include voice search and augmented reality features soon.' },
        { question: 'Multilingual Support', answer: 'Kluret will support multiple languages for EU-wide accessibility.' },
        { question: 'Customer Support', answer: 'Our support team is available to assist users with any queries.' },
        { question: 'Feedback Mechanism', answer: 'Users can provide feedback to help us improve our services.' }
      ]
    },
    {
      id: 4,
      category: 'Shopping Features',
      questions: [
        { question: 'Product Recommendations', answer: 'Kluret offers personalized recommendations based on user activity.' },
        { question: 'Price Comparison', answer: 'Compare prices across retailers to find the best deals.' },
        { question: 'Product Reviews', answer: 'Aggregated reviews provide a comprehensive view of product performance.' },
        { question: 'Search Query Suggestions', answer: 'Get suggestions to refine your search queries.' },
        { question: 'Product Availability', answer: 'Real-time availability information ensures accurate stock levels.' },
        { question: 'Retailer Partnerships', answer: 'Exclusive offers and promotions from our retail partners.' },
        { question: 'User Profiles', answer: 'Create profiles to save preferences and search history.' },
        { question: 'Shopping Lists', answer: 'Easily manage shopping lists for future purchases.' },
        { question: 'Price Alerts', answer: 'Receive notifications when desired products go on sale.' }
      ]
    }
  ];

  const filteredFaqs = faqs
    .map(category => ({
      ...category,
      questions: category.questions.filter(
        q =>
          q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          q.answer.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }))
    .filter(category => category.questions.length > 0);

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
              className="inline-block p-3 rounded-2xl bg-blue-100 backdrop-blur-sm mb-8"
            >
              <HelpCircle className="h-8 w-8 text-blue-500" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-bold mb-6"
            >
              Frequently Asked Questions
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-gray-600 max-w-3xl mx-auto mb-8"
            >
              Find answers to common questions about Kluret
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="max-w-xl mx-auto"
            >
              <div className="relative">
                <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search FAQs..."
                  className="w-full pl-12 pr-4 py-3 bg-gray-100 border border-gray-300 rounded-lg text-black placeholder-gray-600"
                />
              </div>
            </motion.div>
          </div>

          {/* FAQ Categories */}
          <div className="space-y-8">
            {filteredFaqs.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative bg-gray-100 backdrop-blur-sm p-6 rounded-xl border border-gray-300">
                  <h2 className="text-xl font-bold mb-6">{category.category}</h2>
                  <div className="space-y-4">
                    {category.questions.map((faq, faqIndex) => (
                      <div key={faqIndex} className="relative group">
                        <button
                          onClick={() =>
                            setExpandedId(expandedId === faqIndex ? null : faqIndex)
                          }
                          className="w-full text-left"
                        >
                          <div className="flex items-center justify-between p-4 bg-gray-200 rounded-lg group-hover:bg-gray-300 transition-colors">
                            <h3 className="font-medium pr-8">{faq.question}</h3>
                            <motion.div
                              animate={{
                                rotate: expandedId === faqIndex ? 180 : 0
                              }}
                              transition={{ duration: 0.2 }}
                            >
                              <ChevronDown className="h-5 w-5 text-gray-600" />
                            </motion.div>
                          </div>
                        </button>
                        <AnimatePresence>
                          {expandedId === faqIndex && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden"
                            >
                              <div className="p-4 text-gray-600">
                                {faq.answer}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Still Need Help */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-12 text-center"
          >
            <h2 className="text-2xl font-bold mb-4">Still Need Help?</h2>
            <p className="text-gray-600 mb-6">
              Can't find what you're looking for? We're here to help.
            </p>
            <Link
              to="/report-problem"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full text-white font-medium hover:from-blue-600 hover:to-purple-600 transition-all group"
            >
              Contact Support
              <ArrowRight className="h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default FAQPage;
