import React from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface PaymentMethodSelectorProps {
  selectedMethod: string;
  onSelect: (methodId: string) => void;
}

const PaymentMethodSelector = ({ selectedMethod, onSelect }: PaymentMethodSelectorProps) => {
  const navigate = useNavigate();

  const handleMethodSelect = (method: string) => {
    onSelect(method);
    
    if (method === 'klarna') {
      // Open Klarna payment page in new tab
      window.open('/payment/klarna', '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900 mb-3">Select Payment Method</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => handleMethodSelect('card')}
          className={`relative flex flex-col p-4 rounded-lg border-2 text-left ${
            selectedMethod === 'card'
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-200 hover:border-gray-300'
          }`}
        >
          <div className="flex items-center gap-3 mb-2">
            <div className={`p-2 rounded-lg ${
              selectedMethod === 'card' ? 'bg-blue-500/10' : 'bg-gray-100'
            }`}>
              <CreditCard className={`h-5 w-5 ${
                selectedMethod === 'card' ? 'text-blue-500' : 'text-gray-500'
              }`} />
            </div>
            <span className="font-medium">Credit Card</span>
          </div>
          <p className="text-sm text-gray-500">Pay directly with your credit card</p>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => handleMethodSelect('klarna')}
          className={`relative flex flex-col p-4 rounded-lg border-2 text-left ${
            selectedMethod === 'klarna'
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-200 hover:border-gray-300'
          }`}
        >
          <div className="flex items-center gap-3 mb-2">
            <div className={`p-2 rounded-lg ${
              selectedMethod === 'klarna' ? 'bg-blue-500/10' : 'bg-gray-100'
            }`}>
              <Clock className={`h-5 w-5 ${
                selectedMethod === 'klarna' ? 'text-blue-500' : 'text-gray-500'
              }`} />
            </div>
            <span className="font-medium">Klarna</span>
          </div>
          <p className="text-sm text-gray-500">Pay later or in installments</p>
        </motion.button>
      </div>
    </div>
  );
};

export default PaymentMethodSelector;