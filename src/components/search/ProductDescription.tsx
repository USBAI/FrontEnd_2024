import React from 'react';
import { motion } from 'framer-motion';
import { Star, Shield, Package, Wrench, Palette, Sparkles, Heart } from 'lucide-react';

interface ProductDescriptionProps {
  description: string;
}

const getFeatureIcon = (title: string) => {
  const titleLower = title.toLowerCase();
  if (titleLower.includes('design') || titleLower.includes('style')) return Star;
  if (titleLower.includes('material') || titleLower.includes('quality')) return Shield;
  if (titleLower.includes('color') || titleLower.includes('palette')) return Palette;
  if (titleLower.includes('comfort') || titleLower.includes('features')) return Heart;
  if (titleLower.includes('care') || titleLower.includes('maintenance')) return Wrench;
  if (titleLower.includes('warranty') || titleLower.includes('guarantee')) return Package;
  return Sparkles;
};

const ProductDescription: React.FC<ProductDescriptionProps> = ({ description }) => {
  const parseDescription = (htmlString: string) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, 'text/html');
    const rows = doc.querySelectorAll('tr');
    const features: { title: string; description: string }[] = [];

    rows.forEach((row, index) => {
      if (index === 0) return; // Skip header row
      const cells = row.querySelectorAll('td');
      if (cells.length === 2) {
        features.push({
          title: cells[0].textContent?.replace(')', '') || '',
          description: cells[1].textContent || '',
        });
      }
    });

    return features;
  };

  const features = parseDescription(description);

  return (
    <div className="space-y-6">
      <div className="grid gap-4">
        {features.map((feature, index) => {
          const Icon = getFeatureIcon(feature.title);
          
          return (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-pink-100/50 to-purple-100/50 rounded-xl blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative bg-white rounded-xl p-4 border border-gray-100 hover:border-pink-200 transition-colors duration-300">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-pink-500/10 to-purple-500/10 flex items-center justify-center">
                      <Icon className="h-4 w-4 text-pink-500" />
                    </div>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <motion.h4 
                      className="text-base font-semibold text-gray-900 mb-2"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 + 0.2 }}
                    >
                      {feature.title}
                    </motion.h4>
                    
                    <motion.p 
                      className="text-gray-600 text-sm leading-relaxed"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.1 + 0.3 }}
                    >
                      {feature.description}
                    </motion.p>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductDescription;