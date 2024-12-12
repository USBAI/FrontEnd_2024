import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, Plus, Minus, ArrowLeft, ShoppingBag, CreditCard } from 'lucide-react';
import { useCart } from '../search/hooks/useCart';
import { Link } from 'react-router-dom';

const LoadingPlaceholder = () => (
  <div className="space-y-6">
    {[...Array(3)].map((_, i) => (
      <div key={i} className="bg-white rounded-xl p-4 animate-pulse">
        <div className="flex items-center gap-4">
          <div className="w-24 h-24 bg-gray-200 rounded-lg" />
          <div className="flex-1 space-y-3">
            <div className="h-4 bg-gray-200 rounded w-3/4" />
            <div className="h-4 bg-gray-200 rounded w-1/4" />
          </div>
        </div>
      </div>
    ))}
  </div>
);

const CartPage = () => {
  const { cartItems, isLoading } = useCart();

  const calculateTotal = () => {
    return cartItems.reduce((sum, item) => {
      const price = parseFloat(item.product_price.replace(/[^0-9.]/g, ''));
      return sum + price;
    }, 0).toFixed(2);
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-gray-100 z-50 overflow-y-auto">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-bold">Shopping Cart</h1>
          </div>
          <LoadingPlaceholder />
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-gray-100 z-50 overflow-y-auto">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link to="/chat" className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
            <ArrowLeft className="h-5 w-5" />
            <span>Continue Shopping</span>
          </Link>
          <h1 className="text-2xl font-bold">Shopping Cart</h1>
        </div>

        {cartItems.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
          >
            <ShoppingBag className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
            <p className="text-gray-500 mb-6">Looks like you haven't added any items yet</p>
            <Link
              to="/chat"
              className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-900 transition-colors"
            >
              Start Shopping
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              <AnimatePresence>
                {cartItems.map((item, index) => (
                  <motion.div
                    key={index}
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
                ))}
              </AnimatePresence>
            </div>

            {/* Order Summary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl p-6 shadow-sm h-fit"
            >
              <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>{calculateTotal()} kr</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="border-t border-gray-200 pt-3 flex justify-between font-semibold">
                  <span>Total</span>
                  <span>{calculateTotal()} kr</span>
                </div>
              </div>
              <button className="w-full py-3 bg-black text-white rounded-lg font-medium hover:bg-gray-900 transition-colors flex items-center justify-center gap-2">
                <CreditCard className="h-5 w-5" />
                Checkout
              </button>
              <div className="mt-4 text-center">
                <Link
                  to="/chat"
                  className="text-sm text-gray-500 hover:text-gray-700"
                >
                  or continue shopping
                </Link>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;