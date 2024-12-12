import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';

interface CartIndicatorProps {
  count: number;
  onClick: () => void;
}

const CartIndicator = ({ count, onClick }: CartIndicatorProps) => {
  return (
    <button onClick={onClick} className="relative">
      <ShoppingCart className="h-6 w-6 text-gray-500" />
      {count > 0 && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-medium"
        >
          {count}
        </motion.div>
      )}
    </button>
  );
};

export default CartIndicator;