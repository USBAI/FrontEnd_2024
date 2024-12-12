import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import CartContent from './CartContent';

interface CartOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartOverlay = ({ isOpen, onClose }: CartOverlayProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          {/* Cart Panel */}
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed inset-0 bg-white z-50 overflow-y-auto"
          >
            <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-sm border-b border-gray-100">
              <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="h-6 w-6 text-gray-500" />
                </button>
                <h1 className="text-xl font-semibold">Shopping Cart</h1>
                <div className="w-10" /> {/* Spacer for alignment */}
              </div>
            </div>

            <CartContent onClose={onClose} />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartOverlay;