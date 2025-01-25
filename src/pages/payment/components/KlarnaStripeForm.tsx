import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom'; // To handle URL query parameters
import { motion } from 'framer-motion';
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Lock, X, CheckCircle } from 'lucide-react';
import LoadingSpinner from '../../../components/ui/LoadingSpinner';

interface KlarnaStripeFormProps {
  onPaymentIdChange: (paymentId: string) => void; // Callback to pass paymentId to parent
}

const KlarnaStripeForm = ({ onPaymentIdChange }: KlarnaStripeFormProps) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPopupActive, setIsPopupActive] = useState(false);
  const [isPaymentComplete, setIsPaymentComplete] = useState(false);

  const [paymentId, setPaymentId] = useState<string | null>(null);
  const [userId] = useState<string | null>(localStorage.getItem('user_id'));
  const [searchParams] = useSearchParams(); // To extract query parameters

  useEffect(() => {
    if (paymentId) {
      onPaymentIdChange(paymentId); // Pass paymentId to parent
    }
  }, [paymentId, onPaymentIdChange]);

  // Handle URL query parameters after Klarna redirects back
  useEffect(() => {
    const paymentIntent = searchParams.get('payment_intent');
    const redirectStatus = searchParams.get('redirect_status');

    const verifyPaymentFromURL = async () => {
      if (paymentIntent && userId && redirectStatus === 'succeeded') {
        try {
          const response = await fetch('https://customerserver-ec7f53c083c0.herokuapp.com/addcart/place-order/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              user_id: userId,
              payment_id: paymentIntent,
            }),
          });

          const data = await response.json();

          if (data.status === 'success') {
            setIsPaymentComplete(true);
            setIsPopupActive(false); // Close popup
          } else {
            console.log(`Payment verification status: ${data.status}`);
          }
        } catch (error) {
          console.error('Error verifying payment from URL:', error);
        }
      }
    };

    verifyPaymentFromURL();
  }, [searchParams, userId]);

  // Single request logic to verify payment
  useEffect(() => {
    const verifyPayment = async () => {
      if (paymentId && userId) {
        try {
          const response = await fetch('https://customerserver-ec7f53c083c0.herokuapp.com/AddCart/place-order/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              user_id: userId,
              payment_id: paymentId,
            }),
          });

          const data = await response.json();

          if (data.status === 'success') {
            setIsPaymentComplete(true);
            setIsPopupActive(false); // Close popup
          } else {
            console.log(`Payment verification status: ${data.status}`);
          }
        } catch (error) {
          console.error('Error verifying payment:', error);
        }
      }
    };

    verifyPayment(); // Make the request only once
  }, [paymentId, userId]);

  const handleAlert = () => {
    if (paymentId && userId) {
      alert(`Payment ID: ${paymentId}\nUser ID: ${userId}`);
    } else {
      alert('Payment ID or User ID is missing.');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);
    setError(null);
    setIsPopupActive(true);

    try {
      const { error: submitError } = await elements.submit();
      if (submitError) {
        throw new Error(submitError.message);
      }

      const result = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/payment/klarna`,
        },
      });

      if (result.error) {
        throw new Error(result.error.message);
      }

      if (result.paymentIntent) {
        setPaymentId(result.paymentIntent.id); // Store payment ID
        handleAlert(); // Alert payment ID and user ID
      }
    } catch (error) {
      console.error('Payment error:', error);
      setError(error instanceof Error ? error.message : 'Payment failed');
      setIsPopupActive(false);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      {isPopupActive && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg relative">
            <button
              onClick={() => setIsPopupActive(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="space-y-4">
              {!isPaymentComplete ? (
                <>
                  <p className="text-center text-lg font-medium">
                    Verifying your payment...
                  </p>
                  <LoadingSpinner size="sm" />
                </>
              ) : (
                <div className="flex flex-col items-center space-y-2">
                  <CheckCircle className="text-green-500 w-12 h-12" />
                  <p className="text-center text-lg font-medium text-green-600">
                    Payment Successful!
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

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
                  },
                },
              },
              wallets: {
                applePay: 'never',
                googlePay: 'never',
              },
              paymentMethodOrder: ['klarna'],
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
          {isProcessing ? <LoadingSpinner size="sm" /> : <>Pay with Klarna <Lock className="h-5 w-5" /></>}
        </motion.button>

        <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
          <Lock className="h-4 w-4" />
          <p>Secure payment processed by Klarna</p>
        </div>
      </form>
    </>
  );
};

export default KlarnaStripeForm;
