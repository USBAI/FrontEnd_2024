import React from 'react';
import { motion } from 'framer-motion';
import { CreditCard } from 'lucide-react';
import LoadingSpinner from '../../ui/LoadingSpinner';

interface KlarnaPaymentFormProps {
  onSubmit: (e: React.FormEvent) => Promise<void>;
  isSubmitting: boolean;
}

const KlarnaPaymentForm: React.FC<KlarnaPaymentFormProps> = ({ onSubmit, isSubmitting }) => {
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="bg-gray-50 rounded-lg p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-pink-50 rounded-lg">
            <CreditCard className="h-5 w-5 text-pink-500" />
          </div>
          <h3 className="text-lg font-medium text-gray-900">Pay with Klarna</h3>
        </div>
        
        <p className="text-gray-600 mb-4">
          Complete your purchase securely with Klarna's payment options:
        </p>
        
        <ul className="text-sm text-gray-600 space-y-2">
          <li className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-pink-500 rounded-full" />
            Pay in installments
          </li>
          <li className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-pink-500 rounded-full" />
            Pay within 30 days
          </li>
          <li className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-pink-500 rounded-full" />
            Secure checkout process
          </li>
        </ul>
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        type="submit"
        disabled={isSubmitting}
        className="w-full py-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-lg font-medium flex items-center justify-center gap-2 hover:from-pink-600 hover:to-purple-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? (
          <LoadingSpinner size="sm" />
        ) : (
          'Continue with Klarna'
        )}
      </motion.button>

      <p className="text-sm text-gray-500 text-center">
        You will be redirected to Klarna to complete your payment securely in a new tab
      </p>
    </form>
  );
};

export default KlarnaPaymentForm;