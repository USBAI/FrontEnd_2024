import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Lock } from 'lucide-react';
import { useKlarnaPayment } from '../../../../hooks/useKlarnaPayment';
import { useCart } from '../../../../components/search/hooks/useCart';
import LoadingSpinner from '../../../../components/ui/LoadingSpinner';
import KlarnaHeader from './KlarnaHeader';
import KlarnaFeatures from './KlarnaFeatures';
import KlarnaError from './KlarnaError';
import KlarnaMinimumAmount from './KlarnaMinimumAmount';
import KlarnaLoading from './KlarnaLoading';

interface KlarnaPaymentFormProps {
  total: number;
}

const KlarnaPaymentForm: React.FC<KlarnaPaymentFormProps> = ({ total }) => {
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

  useEffect(() => {
    // Only initialize payment when cart is loaded and total is at least 3 SEK
    if (!isCartLoading && cartItems?.length > 0 && total >= 3) {
      initializePayment();
    }
  }, [isCartLoading, cartItems, total, initializePayment]);

  if (isCartLoading || isLoading) {
    return <KlarnaLoading isCartLoading={isCartLoading} />;
  }

  if (total < 3) {
    return <KlarnaMinimumAmount />;
  }

  if (!paymentUrl) {
    return <KlarnaError onRetry={initializePayment} />;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-gray-50 rounded-lg p-6">
        <KlarnaHeader />
        <KlarnaFeatures />
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