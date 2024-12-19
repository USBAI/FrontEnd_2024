import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Lock } from 'lucide-react';
import LoadingSpinner from '../../../components/ui/LoadingSpinner';

const KlarnaStripeForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      // Submit the payment form
      const { error: submitError } = await elements.submit();
      if (submitError) {
        throw new Error(submitError.message);
      }

      // Confirm the payment
      const result = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/payment-complete`,
        },
      });

      if (result.error) {
        throw new Error(result.error.message);
      }
    } catch (error) {
      console.error('Payment error:', error);
      setError(error instanceof Error ? error.message : 'Payment failed');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
          <p className="text-red-600">{error}</p>
        </div>
      )}

      <div className="bg-white rounded-lg p-6 shadow-sm">
        <PaymentElement 
          options={{
            defaultValues: {
              billingDetails: {
                address: {
                  country: 'SE',
                }
              }
            },
            wallets: {
              applePay: 'never',
              googlePay: 'never'
            },
            paymentMethodOrder: ['klarna']
          }}
        />
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        type="submit"
        disabled={isProcessing || !stripe || !elements}
        className="w-full py-4 bg-[#FFB3C7] text-white rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-[#FF9FB7] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isProcessing ? (
          <LoadingSpinner size="sm" />
        ) : (
          <>
            Pay with Klarna
            <Lock className="h-5 w-5" />
          </>
        )}
      </motion.button>

      <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
        <Lock className="h-4 w-4" />
        <p>Secure payment processed by Klarna</p>
      </div>
    </form>
  );
};

export default KlarnaStripeForm;