import { useState, useEffect } from 'react';

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

export const useCart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCart = async () => {
    const userId = localStorage.getItem('user_id');
    if (!userId) return;

    setIsLoading(true);
    try {
      const response = await fetch('https://customerserver1-5d81976997ba.herokuapp.com/addcart/getcart/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ user_id: userId })
      });

      if (response.ok) {
        const data = await response.json();
        setCartItems(data.cart_items || []);
      }
    } catch (error) {
      console.error('Error fetching cart:', error);
      setError('Failed to fetch cart items');
    } finally {
      setIsLoading(false);
    }
  };

  const addToCart = async (product: any) => {
    const userId = localStorage.getItem('user_id');
    if (!userId) return false;

    setIsLoading(true);
    try {
      const response = await fetch('https://customerserver1-5d81976997ba.herokuapp.com/addcart/add-to-cart/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user_id: userId,
          product_id: product.id,
          product_name: product.name,
          product_price: product.price,
          product_color: product.color || '',
          product_size: product.size || '',
          product_description: product.description || '',
          product_image: product.cover_image,
          product_url: product.product_page
        })
      });

      if (response.ok) {
        await fetchCart(); // Refresh cart after adding
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error adding to cart:', error);
      setError('Failed to add item to cart');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // WebSocket connection for real-time updates
  useEffect(() => {
    const userId = localStorage.getItem('user_id');
    if (!userId) return;

    const ws = new WebSocket('wss://customerserver1-5d81976997ba.herokuapp.com/ws/cart/');

    ws.onopen = () => {
      console.log('WebSocket connected');
      ws.send(JSON.stringify({ user_id: userId }));
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'cart_update') {
        fetchCart();
      }
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    // Initial cart fetch
    fetchCart();

    return () => {
      ws.close();
    };
  }, []);

  return {
    cartItems,
    isLoading,
    error,
    addToCart,
    fetchCart
  };
};