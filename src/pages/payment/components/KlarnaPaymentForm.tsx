import React from 'react';
import { motion } from 'framer-motion';
import { Lock, CreditCard } from 'lucide-react';
import { useKlarnaPayment } from '../../../hooks/useKlarnaPayment';
import LoadingSpinner from '../../../components/ui/LoadingSpinner';
import { useCart } from '../../../components/search/hooks/useCart';

interface KlarnaPaymentFormProps {
  total: number;
}

const KlarnaPaymentForm = ({ total }: KlarnaPaymentFormProps) => {
  const { cartItems, isLoading: isCartLoading } = useCart();
  const { isLoading, isSubmitting, handleSubmit, initializePayment, paymentUrl } = useKlarnaPayment({
    total,
    onSuccess: () => {
      // Payment will be handled by redirect
    },
    onError: (error) => {
      console.error('Payment error:', error);
    }
  });

  React.useEffect(() => {
    // Only initialize payment when cart is loaded and total is at least 3 SEK
    if (!isCartLoading && cartItems?.length > 0 && total >= 3) {
      initializePayment();
    }
  }, [isCartLoading, cartItems, total, initializePayment]);

  if (isCartLoading || isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-8">
        <LoadingSpinner size="lg" />
        <p className="mt-4 text-gray-600">
          {isCartLoading ? 'Loading cart...' : 'Initializing Klarna payment...'}
        </p>
      </div>
    );
  }

  if (total < 3) {
    return (
      <div className="text-center py-8">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
          <p className="text-yellow-600">
            Minimum order amount is 3 kr. Please add more items to your cart.
          </p>
        </div>
      </div>
    );
  }

  if (!paymentUrl) {
    return (
      <div className="text-center py-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
          <p className="text-red-600">Failed to load Klarna payment. Please try again.</p>
        </div>
        <button
          onClick={() => initializePayment()}
          className="text-blue-500 hover:text-blue-600 underline"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-gray-50 rounded-lg p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-[#FFB3C7]/10 rounded-lg">
            <CreditCard className="h-5 w-5 text-[#FFB3C7]" />
          </div>
          <h3 className="text-lg font-medium">Pay with Klarna</h3>
        </div>

        <p className="text-gray-600 mb-4">
          Complete your payment securely with Klarna
        </p>

        <ul className="text-sm text-gray-600 space-y-2">
          <li className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
            Pay in installments
          </li>
          <li className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
            Pay within 30 days
          </li>
          <li className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
            Secure checkout process
          </li>
        </ul>
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        type="submit"
        disabled={isSubmitting}
        className="w-full py-4 bg-[#FFB3C7] text-white rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-[#FF9FB7] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? (
          <LoadingSpinner size="sm" />
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
  );
};

export default KlarnaPaymentForm;