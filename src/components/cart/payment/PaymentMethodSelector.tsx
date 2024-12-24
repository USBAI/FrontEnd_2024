import React from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Clock } from 'lucide-react';

interface PaymentMethodSelectorProps {
  onSelectMethod: (method: 'card' | 'klarna') => void;
}

const PaymentMethodSelector = ({ onSelectMethod }: PaymentMethodSelectorProps) => {
  const paymentMethods = [
    {
      id: 'card',
      title: 'Pay with Card',
      description: 'Credit/Debit Card, Apple Pay, Google Pay',
      icon: CreditCard,
      gradient: 'from-blue-500 to-purple-500'
    },
    {
      id: 'klarna',
      title: 'Pay with Klarna',
      description: 'Pay later or in installments',
      icon: Clock,
      gradient: 'from-pink-500 to-purple-500'
    }
  ];

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-6">Select Payment Method</h2>
      <div className="grid grid-cols-1 gap-4">
        {paymentMethods.map((method) => (
          <motion.button
            key={method.id}
            onClick={() => onSelectMethod(method.id as 'card' | 'klarna')}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`w-full p-6 rounded-xl border-2 border-gray-200 hover:border-gray-300 bg-white text-left transition-all`}
          >
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-xl bg-gradient-to-r ${method.gradient}`}>
                <method.icon className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">{method.title}</h3>
                <p className="text-sm text-gray-500">{method.description}</p>
              </div>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default PaymentMethodSelector;