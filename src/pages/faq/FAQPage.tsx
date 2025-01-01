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
      category: 'API Access',
      questions: [
        {
          question: 'How do I get API access?',
          answer: 'You can sign up for API access through our developer portal. We offer different tiers based on your needs.'
        },
        {
          question: 'What are the API rate limits?',
          answer: 'Rate limits vary by plan. Our basic plan includes 100,000 requests per month.'
        }
      ]
    },
    {
      id: 3,
      category: 'Integration',
      questions: [
        {
          question: 'How do I integrate Kluret with my store?',
          answer: 'We provide easy-to-use SDKs and comprehensive documentation for seamless integration.'
        },
        {
          question: 'Which platforms do you support?',
          answer: 'We support major e-commerce platforms including Shopify, WooCommerce, and custom solutions.'
        }
      ]
    }
  ];

  const filteredFaqs = faqs.map(category => ({
    ...category,
    questions: category.questions.filter(
      q => q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
           q.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

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
              <HelpCircle className="h-8 w-8 text-blue-400" />
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
              className="text-xl text-gray-400 max-w-3xl mx-auto mb-8"
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
                  className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400"
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
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10">
                  <h2 className="text-xl font-bold mb-6">{category.category}</h2>
                  <div className="space-y-4">
                    {category.questions.map((faq, faqIndex) => (
                      <div key={faqIndex} className="relative group">
                        <button
                          onClick={() => setExpandedId(expandedId === faqIndex ? null : faqIndex)}
                          className="w-full text-left"
                        >
                          <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg group-hover:bg-white/10 transition-colors">
                            <h3 className="font-medium pr-8">{faq.question}</h3>
                            <motion.div
                              animate={{ rotate: expandedId === faqIndex ? 180 : 0 }}
                              transition={{ duration: 0.2 }}
                            >
                              <ChevronDown className="h-5 w-5 text-gray-400" />
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
                              <div className="p-4 text-gray-400">
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
            <p className="text-gray-400 mb-6">
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