import React from 'react';
import { Trash2, Plus, Minus } from 'lucide-react';
import { CartItem as CartItemType } from '../../../../components/search/hooks/useCart';

interface CartItemProps {
  item: CartItemType;
}

const CartItem = ({ item }: CartItemProps) => {
  return (
    <div className="product-item-container">
      <div className="flex items-center gap-4">
        <img
          src={item.product_image}
          alt={item.product_name}
          className="w-20 h-20 rounded-lg object-cover"
        />
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-medium text-black truncate">
            {item.product_name}
          </h3>
          <p className="text-black">{item.product_price}</p>
          {item.product_color && (
            <p className="text-sm text-gray-500">Color: {item.product_color}</p>
          )}
          {item.product_size && (
            <p className="text-sm text-gray-500">Size: {item.product_size}</p>
          )}
        </div>
        <div className='editor-product-listing-cart'>
          <button className="p-2 hover:bg-red-500/10 rounded">
            <Trash2 className="h-5 w-5 text-red-400" />
          </button>
          <div className="add-more-product-cart">
            <button className="p-1 hover:bg-white/10 rounded">
              <Minus className="add-more-product-cart-buttonm h-6 w-6 text-[white]" />
            </button>
            <span className="text-black">1</span>
            <button className="p-1 hover:bg-white/10 rounded">
              <Plus className="add-more-product-cart-buttonp h-6 w-6 text-[white]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;