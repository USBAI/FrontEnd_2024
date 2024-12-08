import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Menu, X, Sparkles, Globe, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showDropdown, setShowDropdown] = useState('');
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'en' ? 'sv' : 'en');
  };

  const menuItems = [
    {
      label: t('nav.whatsKluret'),
      href: '/',
      dropdownItems: [
        { label: 'About Our Technology', href: '/technology' },
        { label: 'AI Search Engine', href: '/ai-search' },
        { label: 'Success Stories', href: '/success-stories' },
        { label: 'Why Choose Kluret', href: '/why-kluret' }
      ]
    },
    {
      label: t('nav.latestUpdates'),
      href: '/updates',
      dropdownItems: [
        { label: 'Product Updates', href: '/updates/product' },
        { label: 'AI Improvements', href: '/updates/ai' },
        { label: 'Release Notes', href: '/updates/releases' },
        { label: 'Roadmap', href: '/updates/roadmap' }
      ]
    },
    {
      label: t('nav.partners'),
      href: '/partners',
      dropdownItems: [
        { label: 'Retailer Integration', href: '/partners/retailers' },
        { label: 'API Documentation', href: '/partners/api' },
        { label: 'Partner Program', href: '/partners/program' },
        { label: 'Success Stories', href: '/partners/success' }
      ]
    }
  ];

  const buttonVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.05 },
    tap: { scale: 0.95 }
  };

  const glowVariants = {
    initial: { opacity: 0.5 },
    animate: { opacity: [0.3, 0.5, 0.3] },
    hover: { opacity: 0.7 }
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${
      scrolled ? 'bg-black/80 backdrop-blur-md shadow-lg' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex-shrink-0"
          >
            <Link to="/" className="flex items-center gap-2">
              <img
                className="h-10 w-auto"
                src="https://www.kluret.se/static/media/kluret_wt.ad13e882d6d5f566612d2b35479039fd.svg"
                alt="Kluret"
              />
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {/* Menu Items */}
            <div className="flex items-center gap-6">
              {menuItems.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative"
                  onHoverStart={() => setShowDropdown(item.href)}
                  onHoverEnd={() => setShowDropdown('')}
                >
                  <button
                    onClick={() => setActiveDropdown(activeDropdown === item.href ? null : item.href)}
                    className="flex items-center gap-1 text-gray-300 hover:text-white transition-colors text-sm font-medium"
                  >
                    {item.label}
                    <ChevronDown className="h-4 w-4 opacity-50" />
                  </button>
                  <AnimatePresence>
                    {(showDropdown === item.href || activeDropdown === item.href) && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute top-full left-0 mt-2 w-56 rounded-lg bg-gray-900/95 backdrop-blur-md shadow-xl py-2"
                      >
                        {item.dropdownItems.map((dropdownItem) => (
                          <Link
                            key={dropdownItem.href}
                            to={dropdownItem.href}
                            className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-800/50 transition-colors"
                          >
                            {dropdownItem.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>

            {/* Language Toggle */}
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={toggleLanguage}
              className="flex items-center gap-2 px-3 py-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
            >
              <Globe className="h-4 w-4 text-gray-400" />
              <span className="text-sm font-medium text-gray-300">
                {i18n.language.toUpperCase()}
              </span>
            </motion.button>

            {/* CTA Button */}
            <Link to="/chat">
              <motion.div
                className="relative"
                initial="initial"
                animate="animate"
                whileHover="hover"
                whileTap="tap"
              >
                <motion.div
                  variants={glowVariants}
                  className="absolute inset-0 bg-gradient-to-r from-pink-500/30 to-purple-500/30 rounded-full blur-xl"
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />
                
                <motion.button
                  variants={buttonVariants}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  className="relative flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 text-white font-medium text-sm border border-pink-400/20 shadow-lg hover:shadow-pink-500/25"
                >
                  <Sparkles className="h-4 w-4 animate-pulse" />
                  <span className="relative">
                    {t('nav.kluretChat')}
                    <motion.span
                      className="absolute bottom-0 left-0 w-full h-0.5 bg-white/40"
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </span>
                </motion.button>
              </motion.div>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
            >
              {isOpen ? (
                <X className="h-6 w-6 text-gray-300" />
              ) : (
                <Menu className="h-6 w-6 text-gray-300" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden overflow-hidden bg-gray-900/95 backdrop-blur-md border-t border-gray-800"
          >
            <div className="px-4 py-6 space-y-4">
              {menuItems.map((item) => (
                <div key={item.href} className="space-y-2">
                  <button
                    onClick={() => setActiveDropdown(activeDropdown === item.href ? null : item.href)}
                    className="w-full flex items-center justify-between text-gray-300 hover:text-white transition-colors text-lg font-medium"
                  >
                    {item.label}
                    <motion.div
                      animate={{ rotate: activeDropdown === item.href ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown className="h-5 w-5" />
                    </motion.div>
                  </button>
                  <AnimatePresence>
                    {activeDropdown === item.href && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="pl-4 space-y-2"
                      >
                        {item.dropdownItems.map((dropdownItem) => (
                          <Link
                            key={dropdownItem.href}
                            to={dropdownItem.href}
                            className="block text-sm text-gray-400 hover:text-white transition-colors py-1"
                          >
                            {dropdownItem.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
              <div className="pt-4 border-t border-gray-800">
                <button
                  onClick={toggleLanguage}
                  className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
                >
                  <Globe className="h-5 w-5" />
                  {i18n.language === 'en' ? 'Svenska' : 'English'}
                </button>
              </div>
              <Link
                to="/chat"
                className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 transition-colors rounded-lg text-white font-medium"
              >
                <Sparkles className="h-5 w-5" />
                {t('nav.kluretChat')}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;