import React from 'react';
import { motion } from 'framer-motion';
import { X, CreditCard } from 'lucide-react';

interface PaymentHeaderProps {
  onClose: () => void;
  isProcessing?: boolean;
}

const PaymentHeader = ({ onClose, isProcessing }: PaymentHeaderProps) => {
  return (
    <div className="relative p-6 border-b border-gray-200/50">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl">
            <CreditCard className="h-6 w-6 text-blue-500" />
          </div>
          <div>
            <h2 className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Secure Checkout
            </h2>
            <p className="text-sm text-gray-500">Complete your purchase securely</p>
          </div>
        </div>
        
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onClose}
          disabled={isProcessing}
          className="p-2 hover:bg-gray-100/50 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <X className="h-5 w-5 text-gray-500" />
        </motion.button>
      </div>
    </div>
  );
};

export default PaymentHeader;