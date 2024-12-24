import React from 'react';
import { ShoppingCart } from 'lucide-react';

interface CartHeaderProps {
  itemCount: number;
}

const CartHeader = ({ itemCount }: CartHeaderProps) => {
  return (
    <div className="flex items-center gap-4 mb-8">
      <div className="p-3 bg-pink-100 rounded-xl">
        <ShoppingCart className="h-6 w-6 text-pink-600" />
      </div>
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Shopping Cart</h2>
        <p className="text-gray-500">{itemCount} items in your cart</p>
      </div>
    </div>
  );
};

export default CartHeader;