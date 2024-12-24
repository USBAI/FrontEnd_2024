import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Lock } from 'lucide-react';
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import LoadingSpinner from '../../../../ui/LoadingSpinner';

interface CardPaymentFormProps {
  total: number;
  onBack: () => void;
  onProcessing: () => void;
  onSuccess: () => void;
  onError: () => void;
}

const CardPaymentForm = ({ total, onBack, onProcessing, onSuccess, onError }: CardPaymentFormProps) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setIsSubmitting(true);
    onProcessing();

    try {
      const { error: submitError } = await elements.submit();
      if (submitError) {
        throw new Error(submitError.message);
      }

      const result = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/payment-complete`,
        },
      });

      if (result.error) {
        throw new Error(result.error.message);
      }

      onSuccess();
    } catch (error) {
      console.error('Payment error:', error);
      onError();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-gray-500 hover:text-gray-700 mb-6"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to payment methods
      </button>

      <form onSubmit={handleSubmit} className="space-y-6">
        <PaymentElement
          options={{
            wallets: {
              applePay: 'auto',
              googlePay: 'auto'
            }
          }}
        />

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={isSubmitting || !stripe || !elements}
          className="w-full py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-medium flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <LoadingSpinner size="sm" />
          ) : (
            <>
              Pay {total} kr
              <Lock className="h-5 w-5" />
            </>
          )}
        </motion.button>
      </form>

      <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
        <Lock className="h-4 w-4" />
        <p>Payments are secure and encrypted</p>
      </div>
    </div>
  );
};

export default CardPaymentForm;