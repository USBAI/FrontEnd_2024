import React from 'react';
import { motion } from 'framer-motion';
import { CreditCard } from 'lucide-react';

const PaymentProcessing = () => {
  return (
    <div className="text-center py-12">
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 360],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6"
      >
        <CreditCard className="h-8 w-8 text-blue-500" />
      </motion.div>
      <h3 className="text-xl font-semibold mb-2">Processing Payment</h3>
      <p className="text-gray-500">Please don't close this window...</p>
    </div>
  );
};

export default PaymentProcessing;