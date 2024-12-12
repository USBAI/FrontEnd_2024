import React from 'react';
import { motion } from 'framer-motion';
import { Trash2, Plus, Minus } from 'lucide-react';

interface CartItemProps {
  item: {
    product_name: string;
    product_image: string;
    product_price: string;
    product_size?: string;
    product_color?: string;
  };
}

const CartItem = ({ item }: CartItemProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -100 }}
      className="bg-white rounded-xl p-4 shadow-sm"
    >
      <div className="flex gap-4">
        <img
          src={item.product_image}
          alt={item.product_name}
          className="w-24 h-24 object-cover rounded-lg"
        />
        <div className="flex-1">
          <div className="flex justify-between mb-2">
            <h3 className="font-medium">{item.product_name}</h3>
            <button className="text-red-500 hover:text-red-600 p-1">
              <Trash2 className="h-5 w-5" />
            </button>
          </div>
          <div className="text-gray-500 mb-4">
            {item.product_size && <span>Size: {item.product_size}</span>}
            {item.product_color && <span> • Color: {item.product_color}</span>}
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button className="p-1 hover:bg-gray-100 rounded">
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-8 text-center">1</span>
              <button className="p-1 hover:bg-gray-100 rounded">
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <div className="font-medium">{item.product_price} kr</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CartItem;