import React from 'react';
import { Trash2, Plus, Minus } from 'lucide-react';
import { CartItem as CartItemType } from '../../../../components/search/hooks/useCart';

interface CartItemProps {
  item: CartItemType;
}

const CartItem = ({ item }: CartItemProps) => {
  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
      <div className="flex items-center gap-4">
        <img
          src={item.product_image}
          alt={item.product_name}
          className="w-20 h-20 rounded-lg object-cover"
        />
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-medium text-white truncate">
            {item.product_name}
          </h3>
          <p className="text-gray-400">kr {item.product_price}</p>
          {item.product_color && (
            <p className="text-sm text-gray-500">Color: {item.product_color}</p>
          )}
          {item.product_size && (
            <p className="text-sm text-gray-500">Size: {item.product_size}</p>
          )}
        </div>
        <div className="flex items-center gap-3">
          <button className="p-1 hover:bg-white/10 rounded">
            <Minus className="h-4 w-4 text-gray-400" />
          </button>
          <span className="text-white">1</span>
          <button className="p-1 hover:bg-white/10 rounded">
            <Plus className="h-4 w-4 text-gray-400" />
          </button>
        </div>
        <button className="p-2 hover:bg-red-500/10 rounded">
          <Trash2 className="h-5 w-5 text-red-400" />
        </button>
      </div>
    </div>
  );
};

export default CartItem;