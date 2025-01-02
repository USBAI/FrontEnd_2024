import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Check } from 'lucide-react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const TermsPage = () => {
  const sections = [
    {
      title: 'Terms of Use',
      content: [
        'By accessing and using Kluret services, you agree to these terms',
        'You must be at least 18 years old to use our services',
        'You are responsible for maintaining the security of your account'
      ]
    },
    {
      title: 'API Usage Terms',
      content: [
        'API keys must be kept secure and not shared',
        'Rate limits must be respected',
        'Usage monitoring and analytics data collection is permitted'
      ]
    },
    {
      title: 'Data Privacy',
      content: [
        'We protect your data using industry-standard security measures',
        'Your data is only used to provide and improve our services',
        'We never sell your personal information to third parties'
      ]
    }
  ];

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
              className="inline-block p-3 rounded-2xl bg-blue-100 mb-8"
            >
              <Shield className="h-8 w-8 text-blue-500" />
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-bold mb-6"
            >
              Terms & Conditions
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-gray-600 max-w-3xl mx-auto"
            >
              Please read these terms carefully before using our services
            </motion.p>
          </div>

          {/* Terms Sections */}
          <div className="space-y-12">
            {sections.map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative bg-gray-50 p-8 rounded-xl border border-gray-200">
                  <h2 className="text-2xl font-bold mb-6">{section.title}</h2>
                  <div className="space-y-4">
                    {section.content.map((item, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div className="p-1 bg-blue-100 rounded-lg mt-1">
                          <Check className="h-4 w-4 text-blue-500" />
                        </div>
                        <p className="text-gray-700">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Last Updated */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-12 text-center text-gray-600"
          >
            Last updated: March 15, 2024
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TermsPage;
