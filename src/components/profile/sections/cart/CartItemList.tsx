import React from 'react';
import { Trash2, Plus, Minus } from 'lucide-react';
import { CartItem as CartItemType } from '../../../../components/search/hooks/useCart';

interface CartItemProps {
  item: CartItemType;
}

const CartItem = ({ item }: CartItemProps) => {
  return (
    <div className="bg-gray-50 rounded-lg p-4 shadow-md">
      <div className="flex items-center gap-4">
        <img
          src={item.product_image}
          alt={item.product_name}
          className="w-20 h-20 rounded-lg object-cover"
        />
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-gray-800 truncate">
            {item.product_name}
          </h3>
          <p className="text-gray-600 font-medium">kr {item.product_price}</p>
          {item.product_color && (
            <p className="text-sm text-gray-500">Color: {item.product_color}</p>
          )}
          {item.product_size && (
            <p className="text-sm text-gray-500">Size: {item.product_size}</p>
          )}
        </div>
        <div className="flex items-center gap-3">
          <button className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full">
            <Minus className="h-4 w-4 text-gray-600" />
          </button>
          <span className="text-gray-800 font-medium">1</span>
          <button className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full">
            <Plus className="h-4 w-4 text-gray-600" />
          </button>
        </div>
        <button className="p-2 bg-gray-100 hover:bg-red-100 rounded-full">
          <Trash2 className="h-5 w-5 text-red-500" />
        </button>
      </div>
    </div>
  );
};

export default CartItem;
