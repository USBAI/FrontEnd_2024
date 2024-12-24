import React from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Clock } from 'lucide-react';

interface PaymentStepProps {
  selectedMethod: string;
  onSelect: (method: string) => void;
}

const PaymentStep = ({ selectedMethod, onSelect }: PaymentStepProps) => {
  const paymentMethods = [
    {
      id: 'card',
      title: 'Credit Card',
      description: 'Pay directly with your card',
      icon: CreditCard,
      gradient: 'from-blue-500 to-purple-500'
    },
    {
      id: 'klarna',
      title: 'Klarna',
      description: 'Pay later or in installments',
      icon: Clock,
      gradient: 'from-pink-500 to-purple-500'
    }
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900">Select Payment Method</h3>
      
      <div className="grid grid-cols-2 gap-4">
        {paymentMethods.map((method) => (
          <motion.button
            key={method.id}
            type="button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelect(method.id)}
            className={`relative flex flex-col p-4 rounded-xl border-2 text-left transition-all ${
              selectedMethod === method.id
                ? 'border-blue-500 bg-blue-50/50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg bg-gradient-to-r ${method.gradient} bg-opacity-10`}>
                <method.icon className={`h-5 w-5 ${
                  selectedMethod === method.id ? 'text-blue-500' : 'text-gray-500'
                }`} />
              </div>
              <div>
                <h4 className="font-medium text-gray-900">{method.title}</h4>
                <p className="text-xs text-gray-500">{method.description}</p>
              </div>
            </div>

            <div className={`absolute top-3 right-3 w-4 h-4 rounded-full border-2 transition-colors ${
              selectedMethod === method.id
                ? 'border-blue-500 bg-blue-500'
                : 'border-gray-300'
            }`}>
              {selectedMethod === method.id && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <div className="w-2 h-2 bg-white rounded-full" />
                </motion.div>
              )}
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default PaymentStep;