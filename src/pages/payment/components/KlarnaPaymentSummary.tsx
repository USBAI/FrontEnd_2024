import React from 'react';
import { motion } from 'framer-motion';
import { useCart } from '../../../components/search/hooks/useCart';
import { useKlarnaPayment } from '../../../hooks/useKlarnaPayment';
import { Lock, CreditCard } from 'lucide-react';
import LoadingSpinner from '../../../components/ui/LoadingSpinner';

const KlarnaPaymentSummary = () => {
  const { cartItems } = useCart();
  
  // Calculate total in SEK, ensuring it's at least 1 SEK
  const total = Math.max(
    cartItems?.reduce((sum, item) => {
      const price = parseFloat(item.product_price.replace(/[^0-9.]/g, ''));
      return sum + price;
    }, 0) || 0,
    1
  );

  const { isLoading, isSubmitting, handleSubmit, initializePayment, paymentUrl } = useKlarnaPayment({
    total,
    onSuccess: () => {
      // Payment window will be handled by the hook
    },
    onError: (error) => {
      console.error('Payment error:', error);
    }
  });

  React.useEffect(() => {
    if (total >= 1) {
      initializePayment();
    }
  }, [total, initializePayment]);

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
      
      <div className="space-y-4 mb-6">
        <div className="flex justify-between text-gray-600">
          <span>Subtotal</span>
          <span>{total.toFixed(2)} kr</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Shipping</span>
          <span>Free</span>
        </div>
        <div className="border-t border-gray-200 pt-4 flex justify-between font-semibold">
          <span>Total</span>
          <span>{total.toFixed(2)} kr</span>
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-6 mb-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-[#FFB3C7]/10 rounded-lg">
            <CreditCard className="h-5 w-5 text-[#FFB3C7]" />
          </div>
          <h3 className="text-lg font-medium">Pay with Klarna</h3>
        </div>

        <p className="text-gray-600 mb-4">
          Complete your payment securely with Klarna
        </p>

        <ul className="text-sm text-gray-600 space-y-2 mb-6">
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

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleSubmit}
          disabled={isLoading || isSubmitting || !paymentUrl || total < 1}
          className="w-full py-4 bg-[#FFB3C7] text-white rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-[#FF9FB7] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading || isSubmitting ? (
            <LoadingSpinner size="sm" />
          ) : (
            <>
              Continue with Klarna
              <Lock className="h-5 w-5" />
            </>
          )}
        </motion.button>

        {total < 1 && (
          <p className="mt-2 text-sm text-red-500 text-center">
            Minimum order amount is 1 kr
          </p>
        )}
      </div>

      <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
        <Lock className="h-4 w-4" />
        <p>Secure payment processed by Klarna</p>
      </div>
    </div>
  );
};

export default KlarnaPaymentSummary;