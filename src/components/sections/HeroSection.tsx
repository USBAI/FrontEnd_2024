import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Search, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import HeroGlobe from '../animations/HeroGlobe';

const HeroSection = () => {
  const { t } = useTranslation();
  const [searchText, setSearchText] = useState('');
  const placeholderTexts = [
    'Search for iPhone 13...',
    'Find gaming laptops...',
    'Look for running shoes...',
    'Search for smart watches...',
  ];
  const [currentPlaceholderIndex, setCurrentPlaceholderIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPlaceholderIndex((prev) => (prev + 1) % placeholderTexts.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-white via-pink-50/50 to-blue-50/50">
      {/* Background Globe */}
      <HeroGlobe />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
            {t('hero.title')}
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto">
            {t('hero.subtitle')}
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="relative">
              <input
                type="text"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                placeholder={placeholderTexts[currentPlaceholderIndex]}
                className="w-full h-14 px-6 bg-white rounded-full text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-200 pr-32 shadow-lg"
              />
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-pink-500 to-blue-500 hover:from-pink-600 hover:to-blue-600 text-white px-6 py-2 rounded-full flex items-center gap-2 transition-all">
                <Search className="h-5 w-5" />
                <span className="hidden sm:inline">Search</span>
              </button>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/chat">
              <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="px-8 py-4 rounded-full bg-gradient-to-r from-pink-500 to-blue-500 text-white font-medium flex items-center gap-2 hover:from-pink-600 hover:to-blue-600 transition-all shadow-lg hover:shadow-xl"
              >
                {t('hero.tryButton')}
                <ArrowRight className="h-5 w-5" />
              </motion.button>
            </Link>
            <Link to="#features">
              <motion.button
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
                className="px-8 py-4 rounded-full bg-white text-gray-700 font-medium hover:bg-gray-50 transition-all shadow-lg hover:shadow-xl border border-gray-100"
              >
                Learn More
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;