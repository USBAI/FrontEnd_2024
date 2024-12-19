import React from 'react';
import { X, CreditCard } from 'lucide-react';

interface PaymentHeaderProps {
  onClose: () => void;
  isProcessing: boolean;
}

const PaymentHeader = ({ onClose, isProcessing }: PaymentHeaderProps) => {
  return (
    <div className="p-4 sm:p-6 border-b border-gray-200">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-50 rounded-lg">
            <CreditCard className="h-5 w-5 sm:h-6 sm:w-6 text-blue-500" />
          </div>
          <h2 className="text-lg sm:text-xl font-semibold">Secure Checkout</h2>
        </div>
        {!isProcessing && (
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        )}
      </div>
    </div>
  );
};

export default PaymentHeader;