import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { useTheme, themeColors } from '../../contexts/ThemeContext';

const ThemeSelector = () => {
  const { themeColor, setThemeColor, saveTheme } = useTheme();

  const handleThemeChange = async (color: string) => {
    setThemeColor(color);
    try {
      await saveTheme();
    } catch (error) {
      console.error('Failed to save theme:', error);
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Theme Color</h3>
      <div className="grid grid-cols-3 gap-4">
        {themeColors.map((color) => (
          <motion.button
            key={color.value}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleThemeChange(color.value)}
            className={`relative h-20 rounded-lg transition-shadow hover:shadow-lg ${
              themeColor === color.value ? 'ring-2 ring-offset-2' : ''
            }`}
            style={{ 
              background: `linear-gradient(to right, var(--${color.value}-500), var(--${color.value}-600))`,
              ringColor: `var(--${color.value}-500)`
            }}
          >
            {themeColor === color.value && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white rounded-full p-1">
                  <Check className="h-4 w-4 text-black" />
                </div>
              </div>
            )}
            <span className="absolute bottom-2 left-2 text-white text-sm font-medium">
              {color.name}
            </span>
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default ThemeSelector;