import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { X } from 'lucide-react';
import PaymentMethodSelector from './PaymentMethodSelector';
import CardPaymentForm from './CardPaymentForm';
import LoadingSpinner from '../../ui/LoadingSpinner';
import './payment.css'

// Initialize Stripe
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

interface PaymentOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  total: number;
}

const PaymentOverlay = ({ isOpen, onClose, total }: PaymentOverlayProps) => {
  const [selectedMethod, setSelectedMethod] = useState<'card' | 'klarna' | null>(null);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleMethodSelect = async (method: 'card' | 'klarna') => {
    setIsLoading(true);
    setError(null);

    try {
      const userId = localStorage.getItem('user_id');
      if (!userId) {
        throw new Error('User not authenticated');
      }

      const response = await fetch('https://customerserver-ec7f53c083c0.herokuapp.com/kluret_stripe/create-payment-intent/', {
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

      if (data.status === 'success') {
        if (method === 'klarna') {
          // Store return URL and redirect to Klarna payment page
          localStorage.setItem('payment_return_url', window.location.href);
          window.open('/payment/klarna', '_blank');
          onClose();
        } else {
          setClientSecret(data.client_secret);
          setSelectedMethod(method);
        }
      } else {
        throw new Error(data.message || 'Failed to initialize payment');
      }
    } catch (error) {
      console.error('Payment initialization error:', error);
      setError(error instanceof Error ? error.message : 'Failed to initialize payment');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="paymentoverlay-div-container"
            // className="fixed inset-4 sm:inset-auto sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 z-50 max-w-2xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Checkout</h2>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="h-5 w-5 text-gray-500" />
                </button>
              </div>
              <p className="text-sm text-gray-500 mt-1">Total: {total.toFixed(2)} kr</p>
            </div>

            {/* Content */}
            <div className="max-h-[calc(100vh-12rem)] overflow-y-auto">
              {error ? (
                <div className="p-6">
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-600">
                    {error}
                  </div>
                </div>
              ) : isLoading ? (
                <div className="p-6 flex flex-col items-center justify-center">
                  <LoadingSpinner size="lg" />
                  <p className="mt-4 text-gray-500">Initializing payment...</p>
                </div>
              ) : !selectedMethod ? (
                <PaymentMethodSelector onSelectMethod={handleMethodSelect} />
              ) : selectedMethod === 'card' && clientSecret ? (
                <Elements 
                  stripe={stripePromise} 
                  options={{ 
                    clientSecret,
                    appearance: { theme: 'stripe' },
                    loader: 'auto'
                  }}
                >
                  <CardPaymentForm
                    clientSecret={clientSecret}
                    total={total}
                    onBack={() => setSelectedMethod(null)}
                    onSuccess={onClose}
                  />
                </Elements>
              ) : null}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default PaymentOverlay;