import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface CartEmptyStateProps {
  onClose: () => void;
}

const CartEmptyState = ({ onClose }: CartEmptyStateProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center py-12 px-4"
    >
      <ShoppingBag className="h-16 w-16 text-gray-400 mx-auto mb-4" />
      <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
      <p className="text-gray-500 mb-6">Looks like you haven't added any items yet</p>
      <button
        onClick={onClose}
        className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-900 transition-colors"
      >
        Start Shopping
        <ArrowRight className="h-5 w-5" />
      </button>
    </motion.div>
  );
};

export default CartEmptyState;