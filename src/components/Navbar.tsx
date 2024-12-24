import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Menu, X, Sparkles, Globe, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import Logo from './Logo';

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
      href: '/about',
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

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${
      scrolled ? 'bg-white shadow-lg' : 'bg-transparent'
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
              <div className="w-10 h-10">
                <Logo />
              </div>
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
                    className="flex items-center gap-1 text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium"
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
                        className="absolute top-full left-0 mt-2 w-56 rounded-lg bg-white shadow-xl py-2 border border-gray-100"
                      >
                        {item.dropdownItems.map((dropdownItem) => (
                          <Link
                            key={dropdownItem.href}
                            to={dropdownItem.href}
                            className="block px-4 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors"
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
              className="flex items-center gap-2 px-3 py-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              <Globe className="h-4 w-4 text-gray-600" />
              <span className="text-sm font-medium text-gray-600">
                {i18n.language.toUpperCase()}
              </span>
            </motion.button>

            {/* CTA Button */}
            <Link to="/chat">
              <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-2.5 rounded-full bg-gradient-to-r from-pink-500 to-blue-500 text-white font-medium text-sm flex items-center gap-2 hover:shadow-lg transition-all"
              >
                <Sparkles className="h-4 w-4" />
                <span>{t('nav.kluretChat')}</span>
              </motion.button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {isOpen ? (
                <X className="h-6 w-6 text-gray-600" />
              ) : (
                <Menu className="h-6 w-6 text-gray-600" />
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
            className="md:hidden overflow-hidden bg-white border-t border-gray-100"
          >
            <div className="px-4 py-6 space-y-4">
              {menuItems.map((item) => (
                <div key={item.href} className="space-y-2">
                  <button
                    onClick={() => setActiveDropdown(activeDropdown === item.href ? null : item.href)}
                    className="w-full flex items-center justify-between text-gray-600 hover:text-gray-900 transition-colors text-lg font-medium"
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
                            className="block text-sm text-gray-500 hover:text-gray-900 transition-colors py-1"
                          >
                            {dropdownItem.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
              <div className="pt-4 border-t border-gray-100">
                <button
                  onClick={toggleLanguage}
                  className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <Globe className="h-5 w-5" />
                  {i18n.language === 'en' ? 'Svenska' : 'English'}
                </button>
              </div>
              <Link
                to="/chat"
                className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-pink-500 to-blue-500 text-white rounded-lg font-medium hover:from-pink-600 hover:to-blue-600 transition-colors"
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