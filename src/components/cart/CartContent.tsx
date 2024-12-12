import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CartItem from './CartItem';
import CartSummary from './CartSummary';
import { useCart } from '../search/hooks/useCart';
import CartEmptyState from './CartEmptyState';
import CartLoadingState from './CartLoadingState';

interface CartContentProps {
  onClose: () => void;
}

const CartContent = ({ onClose }: CartContentProps) => {
  const { cartItems, isLoading } = useCart();

  if (isLoading) {
    return <CartLoadingState />;
  }

  if (!cartItems || cartItems.length === 0) {
    return <CartEmptyState onClose={onClose} />;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          <AnimatePresence>
            {cartItems.map((item, index) => (
              <CartItem key={index} item={item} />
            ))}
          </AnimatePresence>
        </div>

        {/* Order Summary */}
        <CartSummary items={cartItems} onClose={onClose} />
      </div>
    </div>
  );
};

export default CartContent;