import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

interface PaymentSuccessProps {
  onClose: () => void;
}

const PaymentSuccess = ({ onClose }: PaymentSuccessProps) => {
  return (
    <div className="text-center py-8">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4"
      >
        <CheckCircle className="h-8 w-8 text-green-500" />
      </motion.div>
      <h3 className="text-xl font-semibold mb-2">Payment Successful!</h3>
      <p className="text-gray-600 mb-6">
        Thank you for your purchase. Your order is being processed.
      </p>
      <button
        onClick={onClose}
        className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-900 transition-colors"
      >
        Continue Shopping
      </button>
    </div>
  );
};

export default PaymentSuccess;