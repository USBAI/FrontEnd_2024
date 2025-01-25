import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Trash2, Plus, Minus } from 'lucide-react';
import axios from 'axios';

interface CartItemProps {
  item: {
    product_name: string;
    product_image: string;
    product_price: string;
    product_size?: string;
    product_color?: string;
    product_url: string; // Ensure this property is present in the item object
  };
  onItemRemoved: (productUrl: string) => void; // Callback to notify parent component
}

const CartItem = ({ item, onItemRemoved }: CartItemProps) => {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false); // State for spinner

  const handleRemoveFromCart = async () => {
    const user_id = localStorage.getItem('user_id'); // Retrieve the user_id from localStorage

    if (!user_id) {
      alert('User not logged in');
      return;
    }

    setIsRemoving(true); // Show spinner

    try {
      const response = await axios.post(
        'https://customerserver-ec7f53c083c0.herokuapp.com/addcart/remove-from-cart/',
        {
          user_id,
          product_url: item.product_url,
        }
      );

      if (response.status === 200) {
        onItemRemoved(item.product_url); // Notify parent component to update UI
      } else {
        alert(response.data.message || 'Failed to remove item from cart');
      }
    } catch (error) {
      console.error('Error removing item from cart:', error);
    } finally {
      setIsRemoving(false); // Hide spinner
      setShowConfirmModal(false); // Close the modal
    }
  };

  return (
    <>
      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h3 className="text-lg font-bold mb-4">Confirm Deletion</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to remove <strong>{item.product_name}</strong> from your cart?
            </p>
            <div className="flex justify-between">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleRemoveFromCart}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                {isRemoving ? (
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8H4z"
                    ></path>
                  </svg>
                ) : (
                  'Confirm'
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cart Item */}
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
              <button
                onClick={() => setShowConfirmModal(true)}
                className="text-red-500 hover:text-red-600 p-1"
              >
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
    </>
  );
};

export default CartItem;
