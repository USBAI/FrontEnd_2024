import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';

interface ProductInfoProps {
  name: string;
  price: string;
  sizes: string[];
  selectedSize: string;
  onSizeSelect: (size: string) => void;
  onAddToCart: () => void;
  isAddingToCart: boolean;
  isLoading: { sizes?: boolean };  // Modified to track loading state per section
}

const ProductInfo = ({
  name,
  price,
  sizes,
  selectedSize,
  onSizeSelect,
  onAddToCart,
  isAddingToCart,
  isLoading
}: ProductInfoProps) => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">{name}</h1>
        <div className="text-3xl font-bold text-gray-900">{price}</div>
      </div>

      {/* Show loading state only for sizes section if it's still loading */}
      {isLoading.sizes ? (
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-3" />
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-12 bg-gray-200 rounded" />
            ))}
          </div>
        </div>
      ) : sizes.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-3">Select Size</h3>
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
            {sizes.map((size) => (
              <button
                key={size}
                onClick={() => onSizeSelect(size)}
                className={`py-3 rounded-lg border transition-all ${
                  selectedSize === size
                    ? 'border-black bg-black text-white'
                    : 'border-gray-200 hover:border-black text-gray-900'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      )}

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onAddToCart}
        className="w-full py-3 px-4 bg-black text-white rounded-lg font-medium flex items-center justify-center gap-2"
      >
        {isAddingToCart ? (
          <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white" />
        ) : (
          <>
            <ShoppingCart className="h-5 w-5" />
            Add to Cart
          </>
        )}
      </motion.button>
    </div>
  );
};

export default ProductInfo;