import React from 'react';
import { motion } from 'framer-motion';
import { Cookie, Info } from 'lucide-react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const CookiesPage = () => {
  const cookieTypes = [
    {
      title: 'Essential Cookies',
      description: 'Required for basic site functionality',
      examples: [
        'Session management',
        'Authentication',
        'Security measures'
      ]
    },
    {
      title: 'Analytics Cookies',
      description: 'Help us understand how visitors interact with our site',
      examples: [
        'Page view statistics',
        'User behavior analysis',
        'Performance monitoring'
      ]
    },
    {
      title: 'Preference Cookies',
      description: 'Remember your settings and preferences',
      examples: [
        'Language preferences',
        'Theme settings',
        'Region selection'
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
              <Cookie className="h-8 w-8 text-blue-400" />
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-bold mb-6"
            >
              Cookie Policy
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-gray-400 max-w-3xl mx-auto"
            >
              Understanding how we use cookies to improve your experience
            </motion.p>
          </div>

          {/* Cookie Types */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {cookieTypes.map((type, index) => (
              <motion.div
                key={type.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10 h-full">
                  <h3 className="text-xl font-bold mb-4">{type.title}</h3>
                  <p className="text-gray-400 mb-4">{type.description}</p>
                  <ul className="space-y-2">
                    {type.examples.map((example, i) => (
                      <li key={i} className="flex items-center gap-2 text-gray-300">
                        <div className="w-1 h-1 bg-blue-400 rounded-full" />
                        {example}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Additional Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10"
          >
            <div className="flex items-start gap-4">
              <div className="p-2 bg-blue-500/10 rounded-lg">
                <Info className="h-6 w-6 text-blue-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-4">Managing Your Cookie Preferences</h3>
                <p className="text-gray-300 mb-4">
                  You can control and/or delete cookies as you wish. You can delete all cookies that are already on your computer and you can set most browsers to prevent them from being placed. If you do this, however, you may have to manually adjust some preferences every time you visit a site and some services and functionalities may not work.
                </p>
                <div className="flex items-center gap-4">
                  <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                    Accept All Cookies
                  </button>
                  <button className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors">
                    Manage Preferences
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CookiesPage;