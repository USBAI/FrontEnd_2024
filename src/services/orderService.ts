import { CartItem } from '../components/search/hooks/useCart';

interface OrderResponse {
  message: string;
  status: 'success' | 'error';
}

export const createOrder = async (
  userId: string,
  paymentId: string,
  cartItems: CartItem[]
): Promise<OrderResponse> => {
  try {
    // Create order for each cart item
    const orderPromises = cartItems.map(item => 
      fetch('https://customerserver1-5d81976997ba.herokuapp.com/users_order/add-user-order/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user_id: userId,
          payment_id: paymentId,
          product_name: item.product_name,
          product_url: item.product_url,
          product_price: item.product_price,
          quantity: 1 // Default to 1 for now
        })
      })
    );

    const responses = await Promise.all(orderPromises);
    const results = await Promise.all(responses.map(r => r.json()));

    // Check if all orders were created successfully
    const allSuccessful = results.every(r => r.message && r.message.includes('created successfully'));

    if (allSuccessful) {
      // Remove items from cart
      await clearCart(userId, cartItems);
      return { status: 'success', message: 'Orders created successfully' };
    } else {
      throw new Error('Some orders failed to create');
    }
  } catch (error) {
    console.error('Error creating orders:', error);
    return {
      status: 'error',
      message: error instanceof Error ? error.message : 'Failed to create orders'
    };
  }
};

const clearCart = async (userId: string, cartItems: CartItem[]): Promise<void> => {
  try {
    const removePromises = cartItems.map(item =>
      fetch('https://customerserver1-5d81976997ba.herokuapp.com/addcart/remove-from-cart/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user_id: userId,
          product_url: item.product_url
        })
      })
    );

    await Promise.all(removePromises);
  } catch (error) {
    console.error('Error clearing cart:', error);
    throw error;
  }
};