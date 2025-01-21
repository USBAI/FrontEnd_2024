import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star, Shield, Package, Wrench, Palette, Sparkles, Heart, ChevronDown, ChevronUp } from 'lucide-react';

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
  const [openFeature, setOpenFeature] = useState<string | null>(null);
  const [showAll, setShowAll] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Simulate loading state for description data
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 1000); // Adjust the timeout as necessary
    return () => clearTimeout(timeout);
  }, []);

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

  const handleToggle = (title: string) => {
    setOpenFeature((prev) => (prev === title ? null : title));
  };

  const italicizeRandomFeatures = (index: number) => {
    // Make 3 random features italic based on their index
    const randomItalicIndexes = [0, 2, 4];
    return randomItalicIndexes.includes(index);
  };

  const visibleFeatures = showAll ? features : features.slice(0, 4);

  return (
    <div className="space-y-6">
      {loading ? (
        <div className="grid gap-4">
          {Array(4).fill(null).map((_, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-pink-100/50 to-purple-100/50 rounded-xl blur-md opacity-100 transition-opacity duration-300" />

              <div className="relative bg-white rounded-xl p-4 border border-gray-100 cursor-pointer animate-pulse">
                <div className="flex gap-4 items-center">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-pink-500/10 to-purple-500/10" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="h-4 bg-gray-300 rounded mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded"></div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="grid gap-4">
          {visibleFeatures.map((feature, index) => {
            const Icon = getFeatureIcon(feature.title);

            const isItalic = italicizeRandomFeatures(index);

            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-pink-100/50 to-purple-100/50 rounded-xl blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div
                  className="relative bg-white rounded-xl p-4 border border-gray-100 hover:border-pink-200 transition-colors duration-300 cursor-pointer"
                  onClick={() => handleToggle(feature.title)}
                >
                  <div className="flex gap-4 items-center">
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-pink-500/10 to-purple-500/10 flex items-center justify-center">
                        <Icon className="h-4 w-4 text-pink-500" />
                      </div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <motion.h4
                        className={`text-base font-semibold text-gray-900 mb-2 ${isItalic ? 'italic' : ''}`}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 + 0.2 }}
                      >
                        {feature.title}
                      </motion.h4>

                      {openFeature === feature.title && (
                        <motion.p
                          className={`text-gray-600 text-sm leading-relaxed ${isItalic ? 'italic' : ''}`}
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          {feature.description}
                        </motion.p>
                      )}
                    </div>

                    <div className="flex-shrink-0">
                      {openFeature === feature.title ? (
                        <ChevronUp className="h-5 w-5 text-gray-500" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-gray-500" />
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {!loading && features.length > 4 && (
        <div className="text-center mt-4">
          <button
            className="text-pink-500 font-semibold hover:underline"
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? 'View Less' : 'View All'}
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductDescription;
