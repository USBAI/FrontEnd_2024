import React from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Clock } from 'lucide-react';
import PaymentMethodButton from './PaymentMethodButton';

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
      variant: 'card' as const
    },
    {
      id: 'klarna',
      title: 'Pay with Klarna',
      description: 'Pay later or in installments',
      icon: Clock,
      variant: 'klarna' as const
    }
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Select Payment Method</h2>
      <div className="space-y-2">
        {paymentMethods.map((method) => (
          <PaymentMethodButton
            key={method.id}
            icon={method.icon}
            title={method.title}
            description={method.description}
            onClick={() => onSelectMethod(method.id as 'card' | 'klarna')}
            variant={method.variant}
          />
        ))}
      </div>
    </div>
  );
};

export default PaymentMethodSelector;