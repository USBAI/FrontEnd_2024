import React from 'react';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';

interface RegionCardProps {
  name: string;
  city: string;
  flag: string;
  description: string;
  image: string;
  index: number;
}

const RegionCard: React.FC<RegionCardProps> = ({ name, city, flag, description, image, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="relative group h-full flex flex-col"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-pink-100/50 to-purple-100/50 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg border border-pink-100/50 hover:border-pink-200/50 transition-all duration-300 hover:shadow-xl flex flex-col h-full">
        {/* City Image */}
        <div className="relative h-48 overflow-hidden flex-shrink-0">
          <motion.img
            src={image}
            alt={`${city}, ${name}`}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.3 }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <div className="absolute bottom-4 left-4 text-white">
            <div className="text-3xl mb-1">{flag}</div>
            <h3 className="text-xl font-bold">{name}</h3>
          </div>
        </div>
        
        {/* Content */}
        <div className="p-6 flex-grow flex flex-col">
          <div className="flex items-center gap-1 text-sm text-gray-600 mb-3">
            <MapPin className="h-4 w-4" />
            {city}
          </div>
          <p className="text-gray-600 flex-grow">{description}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default RegionCard;