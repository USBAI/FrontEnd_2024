import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CreditCard, Lock, Shield } from 'lucide-react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import PaymentForm from './PaymentForm';
import PaymentProcessing from './PaymentProcessing';
import PaymentSuccess from './PaymentSuccess';
import PaymentHeader from './PaymentHeader';
import SecurityNotice from './SecurityNotice';
import SecurityBadges from './SecurityBadges';
import { usePaymentOverlay } from '../../../hooks/usePaymentOverlay';

// Initialize Stripe outside component to avoid re-initialization
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY, {
  locale: 'sv', // Set Swedish locale for Klarna support
});

interface PaymentOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  total: number;
}

const PaymentOverlay = ({ isOpen, onClose, total }: PaymentOverlayProps) => {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [paymentId, setPaymentId] = useState<string | null>(null);
  const { state, startProcessing, stopProcessing } = usePaymentOverlay();

  useEffect(() => {
    const initializePayment = async () => {
      if (!isOpen) return;

      const userId = localStorage.getItem('user_id');
      if (!userId) {
        setError('User not authenticated');
        return;
      }

      try {
        const response = await fetch('http://127.0.0.1:8013/kluret_stripe/create-payment-intent/', {
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
        if (response.ok && data.client_secret) {
          setClientSecret(data.client_secret);
        } else {
          throw new Error(data.message || 'Failed to initialize payment');
        }
      } catch (error) {
        console.error('Error initializing payment:', error);
        setError(error instanceof Error ? error.message : 'Failed to initialize payment');
      }
    };

    if (isOpen) {
      initializePayment();
    } else {
      setClientSecret(null);
      setError(null);
      setPaymentId(null);
    }
  }, [isOpen, total]);

  const handleClose = () => {
    if (!state.isProcessing) {
      onClose();
    }
  };

  const handlePaymentSuccess = (id: string) => {
    setPaymentId(id);
    stopProcessing();
  };

  // If payment is in progress, restore the payment overlay
  if (state.isOpen) {
    return null;
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={handleClose}
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl relative overflow-hidden">
              <PaymentHeader 
                onClose={handleClose} 
                isProcessing={state.isProcessing} 
              />

              <div className="p-6">
                {error && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                    {error}
                  </div>
                )}

                {clientSecret ? (
                  <Elements 
                    stripe={stripePromise} 
                    options={{ 
                      clientSecret,
                      appearance: { theme: 'stripe' },
                      loader: 'auto'
                    }}
                  >
                    <PaymentForm
                      total={total}
                      onProcessing={() => startProcessing(clientSecret)}
                      onSuccess={handlePaymentSuccess}
                      onError={setError}
                    />
                  </Elements>
                ) : (
                  <div className="flex items-center justify-center py-12">
                    <div className="animate-spin rounded-full h-8 w-8 border-2 border-blue-500 border-t-transparent" />
                  </div>
                )}

                {state.isProcessing && <PaymentProcessing />}
                {paymentId && (
                  <PaymentSuccess
                    onClose={handleClose}
                    paymentId={paymentId}
                  />
                )}

                <SecurityNotice />
              </div>

              <SecurityBadges />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default PaymentOverlay;