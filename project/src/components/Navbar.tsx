import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Menu, X, MessageCircle, Globe, ChevronDown, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showDropdown, setShowDropdown] = useState('');
  const { t, i18n } = useTranslation();

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
    { label: t('nav.whatsKluret'), href: '/' },
    { label: t('nav.latestUpdates'), href: '/updates' },
    { label: t('nav.partners'), href: '/partners' },
    { label: t('nav.ourTeam'), href: '/team' },
  ];

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-black/80 backdrop-blur-md shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex-shrink-0"
          >
            <a href="/" className="flex items-center gap-2">
              <img
                className="h-10 w-auto"
                src="/kluret-logo.svg"
                alt="Kluret"
              />
            </a>
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
                  onHoverStart={() => setShowDropdown(item.href)}
                  onHoverEnd={() => setShowDropdown('')}
                  className="relative"
                >
                  <NavLink href={item.href}>
                    <span className="flex items-center gap-1">
                      {item.label}
                      <ChevronDown className="h-4 w-4 opacity-50" />
                    </span>
                  </NavLink>
                  <AnimatePresence>
                    {showDropdown === item.href && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute top-full left-0 mt-2 w-48 rounded-lg bg-gray-900/95 backdrop-blur-md shadow-xl py-2"
                      >
                        <a href="#" className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-800/50">
                          Option 1
                        </a>
                        <a href="#" className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-800/50">
                          Option 2
                        </a>
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

            {/* Search Button */}
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
            >
              <Search className="h-5 w-5 text-gray-400" />
            </motion.button>

            {/* CTA Button */}
            <motion.a
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              href="/chat"
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600 hover:bg-blue-700 transition-colors text-white font-medium"
            >
              <MessageCircle className="h-4 w-4" />
              {t('nav.kluretChat')}
            </motion.a>
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
                <MobileNavLink key={item.href} href={item.href}>
                  {item.label}
                </MobileNavLink>
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
              <a
                href="/chat"
                className="flex items-center gap-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 transition-colors rounded-lg text-white font-medium"
              >
                <MessageCircle className="h-5 w-5" />
                {t('nav.kluretChat')}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a
    href={href}
    className="text-gray-300 hover:text-white transition-colors text-sm font-medium"
  >
    {children}
  </a>
);

const MobileNavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a
    href={href}
    className="block text-gray-300 hover:text-white transition-colors text-lg font-medium"
  >
    {children}
  </a>
);

export default Navbar;