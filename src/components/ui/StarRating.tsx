import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  className?: string;
}

const StarRating = ({ rating, className = '' }: StarRatingProps) => {
  return (
    <div className={`flex items-center gap-0.5 ${className}`}>
      {[...Array(5)].map((_, index) => {
        const isFilled = index < Math.floor(rating);
        const isPartiallyFilled = index === Math.floor(rating) && rating % 1 !== 0;
        
        return (
          <motion.div
            key={index}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="relative"
          >
            <Star
              className={`h-4 w-4 ${
                isFilled
                  ? 'fill-yellow-400 text-yellow-400'
                  : isPartiallyFilled
                  ? 'text-yellow-400'
                  : 'text-gray-300'
              }`}
              strokeWidth={1.5}
            />
            {isPartiallyFilled && (
              <div
                className="absolute inset-0 overflow-hidden"
                style={{ width: `${(rating % 1) * 100}%` }}
              >
                <Star
                  className="h-4 w-4 fill-yellow-400 text-yellow-400"
                  strokeWidth={1.5}
                />
              </div>
            )}
          </motion.div>
        );
      })}
      <span className="text-sm text-gray-600 ml-1">{rating.toFixed(1)}</span>
    </div>
  );
};

export default StarRating;