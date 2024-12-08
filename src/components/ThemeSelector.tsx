import React from 'react';
import { motion } from 'framer-motion';
import { Palette } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const ThemeSelector = () => {
  const { currentTheme, setTheme, themes } = useTheme();
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="relative">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-lg hover:bg-white/10 transition-colors"
      >
        <Palette className="h-6 w-6 text-gray-600" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute right-0 mt-2 p-2 bg-white rounded-lg shadow-xl border border-gray-100 w-48"
          >
            <div className="grid grid-cols-2 gap-2">
              {themes.map((theme) => (
                <button
                  key={theme.name}
                  onClick={() => {
                    setTheme(theme);
                    setIsOpen(false);
                  }}
                  className={`relative p-4 rounded-lg transition-all ${
                    currentTheme.name === theme.name
                      ? 'ring-2 ring-offset-2'
                      : ''
                  } ring-${theme.accentColor}-500`}
                >
                  <div
                    className={`w-full h-8 rounded-md bg-gradient-to-r ${theme.gradientFrom} ${theme.gradientTo}`}
                  />
                  <span className={`text-xs mt-1 block text-center capitalize ${
                    currentTheme.name === theme.name ? `text-${theme.accentColor}-500` : 'text-gray-600'
                  }`}>
                    {theme.name}
                  </span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ThemeSelector;