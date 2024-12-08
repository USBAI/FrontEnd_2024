import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Palette, X } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

interface ThemeCustomizerProps {
  isOpen: boolean;
  onClose: () => void;
}

const ThemeCustomizer: React.FC<ThemeCustomizerProps> = ({ isOpen, onClose }) => {
  const { primaryColor, setPrimaryColor, secondaryColor, setSecondaryColor } = useTheme();

  const colors = [
    { name: 'Pink', value: 'pink' },
    { name: 'Blue', value: 'blue' },
    { name: 'Purple', value: 'purple' },
    { name: 'Green', value: 'green' },
    { name: 'Orange', value: 'orange' },
    { name: 'Indigo', value: 'indigo' }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/20 z-40"
          />

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="fixed right-4 top-20 w-80 bg-white rounded-xl shadow-xl border border-gray-200 z-50"
          >
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Palette className="h-5 w-5 text-gray-500" />
                  <h2 className="font-semibold">Theme Customization</h2>
                </div>
                <button
                  onClick={onClose}
                  className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="h-5 w-5 text-gray-500" />
                </button>
              </div>
            </div>

            <div className="p-4 space-y-6">
              {/* Primary Color */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-3">Primary Color</h3>
                <div className="grid grid-cols-3 gap-3">
                  {colors.map((color) => (
                    <button
                      key={color.value}
                      onClick={() => setPrimaryColor(color.value)}
                      className={`relative h-12 rounded-lg transition-transform hover:scale-105 ${
                        primaryColor === color.value ? 'ring-2 ring-offset-2' : ''
                      } bg-${color.value}-500`}
                    >
                      {primaryColor === color.value && (
                        <motion.div
                          layoutId="primaryColorCheck"
                          className="absolute inset-0 flex items-center justify-center"
                        >
                          <span className="w-2 h-2 rounded-full bg-white" />
                        </motion.div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Secondary Color */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-3">Secondary Color</h3>
                <div className="grid grid-cols-3 gap-3">
                  {colors.map((color) => (
                    <button
                      key={color.value}
                      onClick={() => setSecondaryColor(color.value)}
                      className={`relative h-12 rounded-lg transition-transform hover:scale-105 ${
                        secondaryColor === color.value ? 'ring-2 ring-offset-2' : ''
                      } bg-${color.value}-500`}
                    >
                      {secondaryColor === color.value && (
                        <motion.div
                          layoutId="secondaryColorCheck"
                          className="absolute inset-0 flex items-center justify-center"
                        >
                          <span className="w-2 h-2 rounded-full bg-white" />
                        </motion.div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Preview */}
              <div className="mt-6">
                <h3 className="text-sm font-medium text-gray-700 mb-3">Preview</h3>
                <div className={`p-4 rounded-lg bg-${primaryColor}-50 border border-${primaryColor}-200`}>
                  <div className={`w-full h-12 rounded-lg bg-gradient-to-r from-${primaryColor}-500 to-${secondaryColor}-500`} />
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ThemeCustomizer;