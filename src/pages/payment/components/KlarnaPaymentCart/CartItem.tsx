import React from 'react';
import { Trash2, Plus, Minus } from 'lucide-react';
import { CartItem as CartItemType } from '../../../../components/search/hooks/useCart';

interface CartItemProps {
  item: CartItemType;
}

const CartItem = ({ item }: CartItemProps) => {
  return (
    <div className="bg-white rounded-lg p-4 shadow-sm">
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
          {item.product_color && (
            <p className="text-sm text-gray-500">Color: {item.product_color}</p>
          )}
          {item.product_size && (
            <p className="text-sm text-gray-500">Size: {item.product_size}</p>
          )}
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center gap-2">
              <button className="p-1 hover:bg-gray-100 rounded">
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-8 text-center">1</span>
              <button className="p-1 hover:bg-gray-100 rounded">
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <div className="font-medium">{item.product_price}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;