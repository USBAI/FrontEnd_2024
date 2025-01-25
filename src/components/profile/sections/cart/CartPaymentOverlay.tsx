import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { X, ArrowLeft } from 'lucide-react';
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
  const [isShippingComplete, setIsShippingComplete] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [formFields, setFormFields] = useState({
    full_name: '',
    address: '',
    city: '',
    state: '',
    zip_code: '',
    country: '',
    phone_number: '',
    email: '',
    additional_instructions: '',
  });

  useEffect(() => {
    const handleKlarnaClose = () => {
      // Automatically return to payment methods if Klarna window is closed
      if (selectedMethod === 'klarna') {
        setSelectedMethod(null);
      }
    };

    window.addEventListener('focus', handleKlarnaClose);

    return () => {
      window.removeEventListener('focus', handleKlarnaClose);
    };
  }, [selectedMethod]);

  const handleMethodSelect = async (method: 'card' | 'klarna') => {
    if (method === 'klarna') {
      try {
        const userId = localStorage.getItem('user_id');
        if (!userId) {
          setError('User not authenticated');
          return;
        }

        const response = await fetch(`https://customerserver-ec7f53c083c0.herokuapp.com/users/get-shipping-info/?user_id=${userId}`);
        const data = await response.json();

        if (data.status === 'success') {
          setFormFields(data.shipping_info);
          setIsShippingComplete(false); // Force the shipping form to show
        } else {
          setIsShippingComplete(false);
        }

        setSelectedMethod(method);
      } catch (error) {
        console.error('Error fetching shipping information:', error);
        setError('Failed to fetch shipping information.');
      }
    } else {
      setSelectedMethod(method);
      initializePayment();
    }
  };

  const handleSaveShipping = async () => {
    setIsSaving(true);
    try {
      const url = `https://customerserver-ec7f53c083c0.herokuapp.com/users/post-shipping-info/`;
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: localStorage.getItem('user_id'), ...formFields }),
      });
      const data = await response.json();

      if (data.status === 'success') {
        setIsShippingComplete(true);
        localStorage.setItem('payment_return_url', window.location.href);
        window.open('/payment/klarna', '_blank'); // Redirect to Klarna
        onClose();
      } else {
        setError('Failed to save shipping information.');
      }
    } catch (error) {
      console.error('Error saving shipping information:', error);
      setError('Failed to save shipping information.');
    } finally {
      setIsSaving(false);
    }
  };

  const initializePayment = async () => {
    const userId = localStorage.getItem('user_id');
    if (!userId) {
      setError('User not authenticated');
      return;
    }

    try {
      const response = await fetch('https://customerserver-ec7f53c083c0.herokuapp.com/kluret_stripe/create-payment-intent/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: userId,
          total_cost: total.toString(),
          currency: 'sek',
        }),
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

  const handlePostOrder = async (paymentId: string) => {
    const userId = localStorage.getItem('user_id');
    if (!userId) {
      setError('User not authenticated');
      return;
    }

    try {
      const response = await fetch('https://customerserver-ec7f53c083c0.herokuapp.com/addcart/place-order/', {
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

      if (data.status !== 'success') {
        console.error('Order placement failed:', data.message);
      }
    } catch (error) {
      console.error('Error placing order:', error);
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
            className="fixed inset-0 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="paymentoverlay-div-container"
            onClick={(e) => e.stopPropagation()}
          >
            <PaymentHeader onClose={onClose} isProcessing={paymentStatus === 'processing'} />

            <div className="p-6">
              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
                  {error}
                </div>
              )}

              {!isShippingComplete && selectedMethod === 'klarna' ? (
                <div className="overflow-y-auto max-h-[70vh]">
                <button
                  onClick={() => setSelectedMethod(null)}
                  className="flex items-center gap-2 text-gray-500 hover:text-gray-700 mb-4"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to payment methods
                </button>
                <h2 className="text-lg font-bold mb-4">Enter Shipping Information</h2>
                <form className="space-y-4 max-h-[30vh]">
                  <input
                    type="text"
                    name="full_name"
                    placeholder="Full Name"
                    value={formFields.full_name}
                    onChange={(e) => setFormFields({ ...formFields, full_name: e.target.value })}
                    className="w-full p-2 border rounded"
                  />
                  <input
                    type="text"
                    name="address"
                    placeholder="Address"
                    value={formFields.address}
                    onChange={(e) => setFormFields({ ...formFields, address: e.target.value })}
                    className="w-full p-2 border rounded"
                  />
                  <input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={formFields.city}
                    onChange={(e) => setFormFields({ ...formFields, city: e.target.value })}
                    className="w-full p-2 border rounded"
                  />
                  <input
                    type="text"
                    name="state"
                    placeholder="State"
                    value={formFields.state}
                    onChange={(e) => setFormFields({ ...formFields, state: e.target.value })}
                    className="w-full p-2 border rounded"
                  />
                  <input
                    type="text"
                    name="zip_code"
                    placeholder="ZIP Code"
                    value={formFields.zip_code}
                    onChange={(e) => setFormFields({ ...formFields, zip_code: e.target.value })}
                    className="w-full p-2 border rounded"
                  />
                  <input
                    type="text"
                    name="country"
                    placeholder="Country"
                    value={formFields.country}
                    onChange={(e) => setFormFields({ ...formFields, country: e.target.value })}
                    className="w-full p-2 border rounded"
                  />
                  <input
                    type="text"
                    name="phone_number"
                    placeholder="Phone Number"
                    value={formFields.phone_number}
                    onChange={(e) => setFormFields({ ...formFields, phone_number: e.target.value })}
                    className="w-full p-2 border rounded"
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formFields.email}
                    onChange={(e) => setFormFields({ ...formFields, email: e.target.value })}
                    className="w-full p-2 border rounded"
                  />
                  <textarea
                    name="additional_instructions"
                    placeholder="Additional Instructions (optional)"
                    value={formFields.additional_instructions}
                    onChange={(e) =>
                      setFormFields({ ...formFields, additional_instructions: e.target.value })
                    }
                    className="w-full p-2 border rounded"
                  />
                  <button
                    type="button"
                    onClick={handleSaveShipping}
                    className="w-full py-2 bg-blue-500 text-white rounded flex items-center justify-center"
                    disabled={isSaving}
                  >
                    {isSaving ? 'Saving...' : 'Confirm Shipping Information'}
                  </button>
                </form>
              </div>
              
              ) : paymentStatus === 'idle' && !selectedMethod ? (
                <PaymentMethodSelector onSelectMethod={handleMethodSelect} />
              ) : selectedMethod === 'card' && clientSecret ? (
                <div className="overflow-hidden max-h-[100vh]">
                  <Elements
                    stripe={stripePromise}
                    options={{
                      clientSecret,
                      appearance: { theme: 'stripe' },
                      loader: 'auto',
                    }}
                  >
                    <CardPaymentForm
                      total={total}
                      onBack={() => setSelectedMethod(null)}
                      onProcessing={() => setPaymentStatus('processing')}
                      onSuccess={(paymentId) => {
                        setPaymentStatus('success');
                        handlePostOrder(paymentId);
                      }}
                      onError={() => setPaymentStatus('error')}
                    />
                  </Elements>
                </div>
              ) : paymentStatus === 'processing' ? (
                <PaymentProcessing />
              ) : (
                paymentStatus === 'success' && <PaymentSuccess onClose={onClose} />
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartPaymentOverlay;
