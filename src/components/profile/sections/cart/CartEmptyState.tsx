import React from 'react';
import { ShoppingCart } from 'lucide-react';

const CartEmptyState = () => {
  return (
    <div className="text-center py-12">
      <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <ShoppingCart className="h-8 w-8 text-pink-600" />
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">Your cart is empty</h3>
      <p className="text-gray-500">Start adding items to your cart</p>
    </div>
  );
};

export default CartEmptyState;