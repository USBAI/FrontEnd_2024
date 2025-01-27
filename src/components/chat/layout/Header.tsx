import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, Search, User } from 'lucide-react';

interface HeaderProps {
  isNavOpen: boolean;
  setIsNavOpen: (isOpen: boolean) => void;
  setIsProfileOpen: (isOpen: boolean) => void;
  setIsSearchOpen: (isOpen: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({
  isNavOpen,
  setIsNavOpen,
  setIsProfileOpen,
  setIsSearchOpen
}) => {
  const [cartItemsCount, setCartItemsCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);

  const fetchCartItems = async () => {
    const userId = localStorage.getItem('userId');
    if (!userId) return;

    try {
      const response = await fetch("https://customerserver-ec7f53c083c0.herokuapp.com/addcart/getcart/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          user_id: userId
        })
      });

      if (response.ok) {
        const data = await response.json();
        setCartItemsCount(data.cart_items.length);
        // Calculate total price from cart items
        const total = data.cart_items.reduce((sum: number, item: any) => 
          sum + (parseFloat(item.price) * item.quantity), 0
        );
        setCartTotal(total);
      }
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };

  useEffect(() => {
    // Initial fetch when component mounts
    fetchCartItems();

    // Fetch cart items every second
    const interval = setInterval(() => {
      fetchCartItems();
    }, 1000);

    // Set up event listener for custom event
    const handleCustomEvent = () => {
      fetchCartItems();
    };

    window.addEventListener('cartUpdated', handleCustomEvent);

    return () => {
      window.removeEventListener('cartUpdated', handleCustomEvent);
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-30 backdrop-blur-lg">
      <div className="flex items-center justify-between px-4 h-16">
        <div className="flex items-center gap-3">
          {!isNavOpen && (
            <motion.button
              onClick={() => setIsNavOpen(true)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Menu className="h-6 w-6 text-gray-600" />
            </motion.button>
          )}
        </div>

        <div className="flex items-center gap-2">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsProfileOpen(true)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative"
          >
            <User className="h-6 w-6 text-gray-600" />
            {cartItemsCount > 0 && (
              <div className="absolute -top-1 -right-1 flex flex-col items-end">
                <span className="bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemsCount}
                </span>
                <span className="text-xs font-semibold text-gray-700 mt-1">
                  ${cartTotal.toFixed(2)}
                </span>
              </div>
            )}
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsSearchOpen(true)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Search className="h-6 w-6 text-gray-600" />
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default Header;