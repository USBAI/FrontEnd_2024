import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock } from 'lucide-react';
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import KlarnaPayment from './klarna/KlarnaPayment';
import PaymentMethodSelector from './PaymentMethodSelector';

interface PaymentFormProps {
  total: number;
  onProcessing: () => void;
  onSuccess: () => void;
  onError: (error: string) => void;
}

const PaymentForm = ({ total, onProcessing, onSuccess, onError }: PaymentFormProps) => {
  const stripe = useStripe();
  const elements = useElements();
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<'card' | 'klarna' | ''>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCardSubmit = async (e: React.FormEvent) => {
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
          return_url: window.location.origin + '/payment/klarna',
        },
      });

      if (result.error) {
        throw new Error(result.error.message);
      }

      onSuccess();
    } catch (error) {
      console.error('Payment error:', error);
      onError(error instanceof Error ? error.message : 'Payment failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!selectedPaymentMethod) {
    return (
      <PaymentMethodSelector
        selectedMethod={selectedPaymentMethod}
        onSelect={(method) => setSelectedPaymentMethod(method as 'card' | 'klarna')}
      />
    );
  }

  if (selectedPaymentMethod === 'klarna') {
    return (
      <KlarnaPayment
        total={total}
        onSuccess={onSuccess}
        onError={onError}
      />
    );
  }

  return (
    <form onSubmit={handleCardSubmit} className="space-y-6">
      <PaymentElement />

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        type="submit"
        disabled={isSubmitting || !stripe || !elements}
        className="w-full py-4 bg-black text-white rounded-lg font-medium flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? (
          <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
        ) : (
          <>
            Pay {total} kr
            <Lock className="h-5 w-5" />
          </>
        )}
      </motion.button>
    </form>
  );
};

export default PaymentForm;