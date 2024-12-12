import React from 'react';
import { motion } from 'framer-motion';
import ProductDescription from '../ProductDescription';

interface ProductDescriptionSectionProps {
  description: string;
  isLoading: boolean;
}

const ProductDescriptionSection = ({ description, isLoading }: ProductDescriptionSectionProps) => {
  if (isLoading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-3/4" />
        <div className="h-4 bg-gray-200 rounded w-full" />
        <div className="h-4 bg-gray-200 rounded w-2/3" />
      </div>
    );
  }

  if (!description) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
    >
      <ProductDescription description={description} />
    </motion.div>
  );
};

export default ProductDescriptionSection;