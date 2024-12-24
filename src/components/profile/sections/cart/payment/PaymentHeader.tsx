import React from 'react';
import { X, CreditCard } from 'lucide-react';

interface PaymentHeaderProps {
  onClose: () => void;
  isProcessing?: boolean;
}

const PaymentHeader = ({ onClose, isProcessing }: PaymentHeaderProps) => {
  return (
    <div className="p-6 border-b border-gray-200">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg">
            <CreditCard className="h-6 w-6 text-blue-500" />
          </div>
          <div>
            <h2 className="text-xl font-semibold">Secure Checkout</h2>
            <p className="text-sm text-gray-500">Complete your purchase securely</p>
          </div>
        </div>
        
        <button
          onClick={onClose}
          disabled={isProcessing}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <X className="h-5 w-5 text-gray-500" />
        </button>
      </div>
    </div>
  );
};

export default PaymentHeader;