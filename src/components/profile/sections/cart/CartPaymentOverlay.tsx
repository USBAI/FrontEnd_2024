import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { X } from 'lucide-react';
import PaymentMethodSelector from './payment/PaymentMethodSelector';
import CardPaymentForm from './payment/CardPaymentForm';
import PaymentHeader from './payment/PaymentHeader';
import PaymentProcessing from './payment/PaymentProcessing';
import PaymentSuccess from './payment/PaymentSuccess';

// Initialize Stripe outside component to avoid re-initialization
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

interface CartPaymentOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  total: number;
}

const CartPaymentOverlay = ({ isOpen, onClose, total }: CartPaymentOverlayProps) => {
  const [selectedMethod, setSelectedMethod] = useState<'card' | 'klarna' | null>(null);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
  const [error, setError] = useState<string | null>(null);

  const handleMethodSelect = async (method: 'card' | 'klarna') => {
    if (method === 'klarna') {
      // Store return URL and redirect to Klarna payment page
      localStorage.setItem('payment_return_url', window.location.href);
      window.open('/payment/klarna', '_blank');
      onClose();
      return;
    }

    // For card payments, initialize Stripe
    setSelectedMethod(method);
    initializePayment();
  };

  const initializePayment = async () => {
    const userId = localStorage.getItem('user_id');
    if (!userId) {
      setError('User not authenticated');
      return;
    }

    try {
      const response = await fetch('https://customerserver1-5d81976997ba.herokuapp.com/kluret_stripe/create-payment-intent/', {
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
      console.error('Payment initialization error:', error);
      setError(error instanceof Error ? error.message : 'Failed to initialize payment');
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
            <PaymentHeader 
              onClose={onClose} 
              isProcessing={paymentStatus === 'processing'} 
            />

            <div className="p-6">
              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
                  {error}
                </div>
              )}

              {paymentStatus === 'idle' && !selectedMethod && (
                <PaymentMethodSelector onSelectMethod={handleMethodSelect} />
              )}

              {selectedMethod === 'card' && clientSecret && (
                <Elements 
                  stripe={stripePromise} 
                  options={{ 
                    clientSecret,
                    appearance: { theme: 'stripe' },
                    loader: 'auto'
                  }}
                >
                  <CardPaymentForm
                    total={total}
                    onBack={() => setSelectedMethod(null)}
                    onProcessing={() => setPaymentStatus('processing')}
                    onSuccess={() => setPaymentStatus('success')}
                    onError={() => setPaymentStatus('error')}
                  />
                </Elements>
              )}

              {paymentStatus === 'processing' && <PaymentProcessing />}
              {paymentStatus === 'success' && <PaymentSuccess onClose={onClose} />}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartPaymentOverlay;