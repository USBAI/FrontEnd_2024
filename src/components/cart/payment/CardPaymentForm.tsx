import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Lock } from 'lucide-react';
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import LoadingSpinner from '../../ui/LoadingSpinner';

interface CardPaymentFormProps {
  clientSecret: string;
  total: number;
  onBack: () => void;
  onSuccess: () => void;
}

const CardPaymentForm = ({ clientSecret, total, onBack, onSuccess }: CardPaymentFormProps) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [paymentMethods, setPaymentMethods] = useState({
    applePay: false,
    googlePay: false
  });

  useEffect(() => {
    const checkPaymentMethods = async () => {
      if (!stripe) return;

      const capabilities = await stripe.paymentRequest.canMakePayment();
      setPaymentMethods({
        applePay: !!capabilities?.applePay,
        googlePay: !!capabilities?.googlePay
      });
    };

    checkPaymentMethods();
  }, [stripe]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements || !clientSecret) return;

    setIsProcessing(true);
    setError(null);

    try {
      // Submit the form first
      const { error: submitError } = await elements.submit();
      if (submitError) {
        throw new Error(submitError.message);
      }

      // Confirm the payment
      const { error: paymentError } = await stripe.confirmPayment({
        elements,
        clientSecret,
        confirmParams: {
          return_url: `${window.location.origin}/payment/klarna`,
        },
      });

      if (paymentError) {
        throw new Error(paymentError.message);
      }

      onSuccess();
    } catch (error) {
      console.error('Payment error:', error);
      setError(error instanceof Error ? error.message : 'Payment failed');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="p-6">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-gray-500 hover:text-gray-700 mb-6"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to payment methods
      </button>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <PaymentElement
          options={{
            wallets: {
              applePay: paymentMethods.applePay ? 'auto' : 'never',
              googlePay: paymentMethods.googlePay ? 'auto' : 'never'
            },
            layout: {
              type: 'tabs',
              defaultCollapsed: false
            }
          }}
        />

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={isProcessing || !stripe || !elements}
          className="w-full py-4 bg-black text-white rounded-lg font-medium flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isProcessing ? (
            <LoadingSpinner size="sm" />
          ) : (
            <>
              Pay {total.toFixed(2)} kr
              <Lock className="h-5 w-5" />
            </>
          )}
        </motion.button>

        <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
          <Lock className="h-4 w-4" />
          <p>Payments are secure and encrypted</p>
        </div>
      </form>
    </div>
  );
};

export default CardPaymentForm;