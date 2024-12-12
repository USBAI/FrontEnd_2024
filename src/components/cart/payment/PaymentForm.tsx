import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock } from 'lucide-react';
import {
  PaymentElement,
  useStripe,
  useElements
} from '@stripe/react-stripe-js';

interface PaymentFormProps {
  total: number;
  onProcessing: () => void;
  onSuccess: () => void;
  onError: (error: string) => void;
}

const PaymentForm = ({ total, onProcessing, onSuccess, onError }: PaymentFormProps) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);
    onProcessing();

    try {
      // Submit the payment form
      const { error: submitError } = await elements.submit();
      if (submitError) {
        throw new Error(submitError.message);
      }

      // Get the user ID
      const userId = localStorage.getItem('user_id');
      if (!userId) {
        throw new Error('User not authenticated');
      }

      // Confirm the payment
      const result = await stripe.confirmPayment({
        elements,
        confirmParams: {
          payment_method_data: {
            billing_details: {
              // Add any additional billing details if needed
            },
          },
          return_url: window.location.origin // This will be ignored since we're using redirect: 'if_required'
        },
        redirect: 'if_required'
      });

      if (result.error) {
        throw new Error(result.error.message);
      }

      if (result.paymentIntent && result.paymentIntent.status === 'succeeded') {
        // Payment successful, confirm with backend
        const response = await fetch('https://customerserver1-5d81976997ba.herokuapp.com/kluret_stripe/confirm-payment/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            payment_intent_id: result.paymentIntent.id,
            user_id: userId
          })
        });

        const data = await response.json();
        if (data.status === 'success') {
          onSuccess();
        } else {
          throw new Error(data.message || 'Payment confirmation failed');
        }
      } else {
        throw new Error('Payment was not completed successfully');
      }
    } catch (error) {
      console.error('Payment error:', error);
      onError(error instanceof Error ? error.message : 'Payment failed');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <PaymentElement />

      <div className="pt-4">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={isProcessing || !stripe || !elements}
          className="w-full py-4 bg-black text-white rounded-lg font-medium flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isProcessing ? (
            <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
          ) : (
            <>
              Pay {total} kr
              <Lock className="h-5 w-5" />
            </>
          )}
        </motion.button>
      </div>
    </form>
  );
};

export default PaymentForm;