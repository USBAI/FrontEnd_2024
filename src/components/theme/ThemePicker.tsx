import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Palette, Check } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

const themes = [
  { name: 'Pink & Purple', primary: 'pink', secondary: 'purple', accent: 'blue' },
  { name: 'Blue & Indigo', primary: 'blue', secondary: 'indigo', accent: 'purple' },
  { name: 'Green & Teal', primary: 'green', secondary: 'teal', accent: 'emerald' },
  { name: 'Orange & Red', primary: 'orange', secondary: 'red', accent: 'yellow' },
  { name: 'Purple & Blue', primary: 'purple', secondary: 'blue', accent: 'pink' },
];

const ThemePicker = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  const handleThemeChange = (newTheme: typeof themes[0]) => {
    setTheme(newTheme);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-lg hover:bg-gray-100 transition-colors relative"
      >
        <Palette className="h-6 w-6 text-gray-600" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-gray-200 p-4 z-50"
            >
              <h3 className="text-sm font-medium text-gray-900 mb-3">Choose Theme</h3>
              <div className="space-y-2">
                {themes.map((t) => (
                  <button
                    key={t.name}
                    onClick={() => handleThemeChange(t)}
                    className={`w-full flex items-center gap-3 p-2 rounded-lg transition-colors ${
                      theme.primary === t.primary
                        ? `bg-${t.primary}-50 text-${t.primary}-600`
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-1.5">
                      <div className={`w-4 h-4 rounded-full bg-${t.primary}-500`} />
                      <div className={`w-4 h-4 rounded-full bg-${t.secondary}-500`} />
                      <div className={`w-4 h-4 rounded-full bg-${t.accent}-500`} />
                    </div>
                    <span className="flex-1 text-left text-sm">{t.name}</span>
                    {theme.primary === t.primary && (
                      <Check className="h-4 w-4" />
                    )}
                  </button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ThemePicker;