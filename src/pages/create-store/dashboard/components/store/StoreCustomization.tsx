import React from 'react';
import { motion } from 'framer-motion';
import { Palette, Layout, Image, Type } from 'lucide-react';

const customizationOptions = [
  { icon: Palette, label: 'Theme', description: 'Customize colors and styles' },
  { icon: Layout, label: 'Layout', description: 'Arrange your store sections' },
  { icon: Image, label: 'Media', description: 'Manage images and videos' },
  { icon: Type, label: 'Typography', description: 'Choose fonts and text styles' }
];

const StoreCustomization = () => {
  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-gray-100/50 p-6">
      <h2 className="font-semibold mb-6">Customization</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {customizationOptions.map((option, index) => (
          <motion.button
            key={option.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-4 rounded-xl bg-gradient-to-br from-gray-50 via-pink-50/30 to-blue-50/30 text-left group hover:shadow-lg transition-shadow"
          >
            <option.icon className="h-6 w-6 text-pink-500 mb-2 group-hover:scale-110 transition-transform" />
            <div className="font-medium mb-1">{option.label}</div>
            <div className="text-sm text-gray-500">{option.description}</div>
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default StoreCustomization;