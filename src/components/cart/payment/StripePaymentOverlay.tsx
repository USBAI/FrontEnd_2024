```tsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CreditCard, Lock, Shield } from 'lucide-react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import StripePaymentForm from './StripePaymentForm';
import PaymentProcessing from './PaymentProcessing';
import PaymentSuccess from './PaymentSuccess';
import { createPaymentIntent } from '../../../services/paymentService';

// Initialize Stripe outside component to avoid re-initialization
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

interface StripePaymentOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  total: number;
}

const StripePaymentOverlay = ({ isOpen, onClose, total }: StripePaymentOverlayProps) => {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initializePayment = async () => {
      if (!isOpen) return;

      const userId = localStorage.getItem('user_id');
      if (!userId) {
        setError('User not authenticated');
        return;
      }

      try {
        const response = await createPaymentIntent({
          userId,
          amount: total,
          currency: 'sek'
        });

        if (response.status === 'success' && response.clientSecret) {
          setClientSecret(response.clientSecret);
        } else {
          throw new Error(response.message || 'Failed to initialize payment');
        }
      } catch (error) {
        console.error('Payment initialization error:', error);
        setError(error instanceof Error ? error.message : 'Failed to initialize payment');
      }
    };

    if (isOpen) {
      initializePayment();
    } else {
      // Reset state when overlay closes
      setClientSecret(null);
      setPaymentStatus('idle');
      setError(null);
    }
  }, [isOpen, total]);

  const handleClose = () => {
    if (paymentStatus !== 'processing') {
      onClose();
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
              {/* Header */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-50 rounded-lg">
                      <CreditCard className="h-6 w-6 text-blue-500" />
                    </div>
                    <h2 className="text-xl font-semibold">Secure Checkout</h2>
                  </div>
                  <button
                    onClick={handleClose}
                    disabled={paymentStatus === 'processing'}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors disabled:opacity-50"
                  >
                    <X className="h-5 w-5 text-gray-500" />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {error && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                    {error}
                  </div>
                )}

                {clientSecret ? (
                  <Elements stripe={stripePromise} options={{ clientSecret }}>
                    {paymentStatus === 'idle' && (
                      <StripePaymentForm
                        total={total}
                        onProcessing={() => setPaymentStatus('processing')}
                        onSuccess={() => setPaymentStatus('success')}
                        onError={setError}
                      />
                    )}
                  </Elements>
                ) : (
                  <div className="flex items-center justify-center py-12">
                    <div className="animate-spin rounded-full h-8 w-8 border-2 border-blue-500 border-t-transparent" />
                  </div>
                )}

                {paymentStatus === 'processing' && (
                  <PaymentProcessing />
                )}

                {paymentStatus === 'success' && (
                  <PaymentSuccess onClose={handleClose} />
                )}

                {/* Security Notice */}
                <div className="mt-6 flex items-center gap-2 text-sm text-gray-500 bg-gray-50 rounded-lg p-3">
                  <Lock className="h-4 w-4" />
                  <p>Your payment information is encrypted and secure</p>
                </div>
              </div>

              {/* Security Badges */}
              <div className="px-6 pb-6 flex items-center justify-center gap-4 text-gray-400">
                <Shield className="h-5 w-5" />
                <span className="text-sm">PCI Compliant</span>
                <span>•</span>
                <span className="text-sm">256-bit SSL Encryption</span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default StripePaymentOverlay;
```