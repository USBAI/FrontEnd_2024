import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Trash2, Plus, Minus } from 'lucide-react';

interface CartItem {
  'User-ID': string;
  product_name: string;
  product_price: string;
  product_color: string;
  product_size: string;
  product_description: string;
  product_image: string;
  product_url: string;
}

const CartSection = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    const userId = localStorage.getItem('user_id');
    if (!userId) {
      setError('User not authenticated');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('https://customerserver1-5d81976997ba.herokuapp.com/addcart/getcart/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ user_id: userId })
      });

      if (!response.ok) {
        throw new Error('Failed to fetch cart items');
      }

      const data = await response.json();
      setCartItems(data.cart_items || []);
    } catch (err) {
      setError('Failed to load cart items');
      console.error('Error fetching cart:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      const price = parseFloat(item.product_price);
      return total + (isNaN(price) ? 0 : price);
    }, 0).toFixed(2);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-blue-500 border-t-transparent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400">
        {error}
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <div className="p-3 bg-blue-500/20 rounded-xl">
          <ShoppingCart className="h-6 w-6 text-blue-400" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white">Shopping Cart</h2>
          <p className="text-gray-400">{cartItems.length} items in your cart</p>
        </div>
      </div>

      <div className="space-y-4">
        {cartItems.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10"
          >
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
          </motion.div>
        ))}
      </div>

      {cartItems.length > 0 && (
        <div className="mt-8">
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <div className="flex justify-between mb-4">
              <span className="text-gray-400">Subtotal</span>
              <span className="text-white font-medium">
                kr {calculateTotal()}
              </span>
            </div>
            <button className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-medium hover:from-blue-600 hover:to-purple-600 transition-all">
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}

      {cartItems.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-400">Your cart is empty</p>
        </div>
      )}
    </div>
  );
};

export default CartSection;