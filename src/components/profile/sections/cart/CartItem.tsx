import React from 'react';
import { Trash2, Plus, Minus } from 'lucide-react';
import { CartItem as CartItemType } from '../../../../components/search/hooks/useCart';

interface CartItemProps {
  item: CartItemType;
}

const CartItem = ({ item }: CartItemProps) => {
  return (
    <div className="cart-item-container p-4 box-border flex flex-wrap">
      <div className="cart-item bg-white shadow-md rounded-lg border border-gray-200 p-4">
        <div className="flex flex-col items-left gap-2">
          <div className="relative w-32 h-20 max-h-20">
            <img
              src={item.product_image}
              alt={item.product_name}
              className="w-full h-full rounded-md object-contain"
            />
            {item.discount && (
              <span className="absolute top-1 left-1 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">
                -{item.discount}%
              </span>
            )}
          </div>
          <h3 className="text-sm font-semibold text-gray-800 text-center truncate max-w-full">
            {item.product_name.length > 7 ? `${item.product_name.slice(0, 7)}...` : item.product_name}
          </h3>
          <p className="text-base font-bold text-red-600">{item.product_price}</p>
          {item.product_color && (
            <p className="text-xs text-gray-500">Color: {item.product_color}</p>
          )}
          {item.product_size && (
            <p className="text-xs text-gray-500">Size: {item.product_size}</p>
          )}
          <div className="flex items-center gap-4">
            <div className="flex items-center space-x-2 border rounded-lg px-2 py-1">
              <button className="p-1 text-gray-600 hover:text-gray-800">
                <Minus className="h-4 w-4" />
              </button>
              <span className="text-gray-800">1</span>
              <button className="p-1 text-gray-600 hover:text-gray-800">
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <button className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
