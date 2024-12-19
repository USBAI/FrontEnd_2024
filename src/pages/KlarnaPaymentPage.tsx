import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, X } from 'lucide-react';
import { useParams } from 'react-router-dom';

const KlarnaPaymentPage = () => {
  const { paymentId } = useParams();
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentUrl, setPaymentUrl] = useState<string | null>(null);

  useEffect(() => {
    const initializePayment = async () => {
      if (!paymentId) {
        setError('Invalid payment session');
        return;
      }

      try {
        // Get the payment URL from Stripe
        const response = await fetch('https://api.stripe.com/v1/payment_intents/' + paymentId + '/confirm', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Bearer ' + import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
          }
        });

        const data = await response.json();
        
        if (data.next_action?.redirect_to_url?.url) {
          setPaymentUrl(data.next_action.redirect_to_url.url);
        } else {
          throw new Error('No redirect URL found');
        }
      } catch (error) {
        console.error('Error initializing payment:', error);
        setError('Failed to initialize payment');
      }
    };

    initializePayment();
  }, [paymentId]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!paymentUrl || isSubmitting) return;

    setIsSubmitting(true);
    try {
      // Store return URL and payment state
      localStorage.setItem('payment_return_url', window.location.href);
      localStorage.setItem('payment_form_state', JSON.stringify({
        isProcessing: true,
        location: window.location.pathname + window.location.search
      }));

      // Redirect to Klarna URL
      window.location.href = paymentUrl;
    } catch (error) {
      console.error('Payment error:', error);
      setError(error instanceof Error ? error.message : 'Payment failed');
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    window.close();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-end mb-4">
          <button
            onClick={handleClose}
            className="p-2 hover:bg-gray-200 rounded-full transition-colors"
          >
            <X className="h-6 w-6 text-gray-600" />
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          {error ? (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-600">
              {error}
            </div>
          ) : !paymentUrl ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-2 border-blue-500 border-t-transparent" />
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <h2 className="text-xl font-bold mb-6">Pay with Klarna</h2>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Country
                </label>
                <select
                  name="country"
                  defaultValue="SE"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="SE">Sweden</option>
                </select>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-[#FFB3C7] text-white rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-[#FF9FB7] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                ) : (
                  <>
                    Continue with Klarna
                    <Lock className="h-5 w-5" />
                  </>
                )}
              </motion.button>

              <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                <Lock className="h-4 w-4" />
                <p>Secure payment processed by Klarna</p>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default KlarnaPaymentPage;