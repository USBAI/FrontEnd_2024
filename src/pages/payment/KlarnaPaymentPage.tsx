import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import KlarnaPaymentCart from './components/KlarnaPaymentCart';
import KlarnaPaymentHeader from './components/KlarnaPaymentHeader';
import KlarnaStripeForm from './components/KlarnaStripeForm';
import { useCart } from '../../components/search/hooks/useCart';

// Initialize Stripe
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY, {
  locale: 'sv' // Set Swedish locale for Klarna support
});

const KlarnaPaymentPage = () => {
  const { cartItems, isLoading } = useCart();
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  // Calculate total in SEK, ensuring it's at least 3 SEK
  const total = Math.max(
    cartItems?.reduce((sum, item) => {
      const price = parseFloat(item.product_price.replace(/[^0-9.]/g, ''));
      return sum + (isNaN(price) ? 0 : price);
    }, 0) || 0,
    3
  );

  useEffect(() => {
    const initializePayment = async () => {
      if (!cartItems?.length) return;

      const userId = localStorage.getItem('user_id');
      if (!userId) {
        setError('User not authenticated');
        return;
      }

      try {
        const response = await fetch('http://127.0.0.1:8013/klarna_pay/create-klarna-payment-intent/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            user_id: userId,
            total_cost: total.toString(),
            currency: 'sek'
          })
        });

        const data = await response.json();
        
        if (data.status === 'success' && data.client_secret) {
          setClientSecret(data.client_secret);
        } else {
          throw new Error(data.message || 'Failed to initialize payment');
        }
      } catch (error) {
        console.error('Error initializing payment:', error);
        setError(error instanceof Error ? error.message : 'Failed to initialize payment');
      }
    };

    initializePayment();
  }, [cartItems, total]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-pink-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <KlarnaPaymentHeader />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <KlarnaPaymentCart />
          </div>

          {/* Payment Form */}
          <div>
            {error ? (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-600">{error}</p>
              </div>
            ) : clientSecret ? (
              <Elements 
                stripe={stripePromise} 
                options={{ 
                  clientSecret,
                  appearance: { theme: 'stripe' },
                  loader: 'auto'
                }}
              >
                <KlarnaStripeForm />
              </Elements>
            ) : (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-2 border-pink-500 border-t-transparent" />
              </div>
            )}
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default KlarnaPaymentPage;