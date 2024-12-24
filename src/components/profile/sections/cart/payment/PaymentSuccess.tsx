import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

interface PaymentSuccessProps {
  onClose: () => void;
}

const PaymentSuccess = ({ onClose }: PaymentSuccessProps) => {
  return (
    <div className="text-center py-12">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6"
      >
        <CheckCircle className="h-8 w-8 text-green-500" />
      </motion.div>
      <h3 className="text-xl font-semibold mb-2">Payment Successful!</h3>
      <p className="text-gray-500 mb-6">
        Thank you for your purchase. Your order is being processed.
      </p>
      <button
        onClick={onClose}
        className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 transition-colors"
      >
        Continue Shopping
      </button>
    </div>
  );
};

export default PaymentSuccess;