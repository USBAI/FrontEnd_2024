import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface PaymentMethodButtonProps {
  icon: LucideIcon;
  title: string;
  description: string;
  onClick: () => void;
  variant: 'card' | 'klarna';
}

const PaymentMethodButton = ({
  icon: Icon,
  title,
  description,
  onClick,
  variant
}: PaymentMethodButtonProps) => {
  const colors = {
    card: {
      border: 'border-blue-200 hover:border-blue-300',
      bg: 'bg-blue-50/50',
      gradient: 'from-blue-500 to-purple-500'
    },
    klarna: {
      border: 'border-pink-200 hover:border-pink-300',
      bg: 'bg-pink-50/50',
      gradient: 'from-pink-500 to-purple-500'
    }
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full"
    >
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`w-full p-2 rounded-xl border-2 ${colors[variant].border} ${colors[variant].bg} text-left transition-all`}
      >
        <div className="flex items-center gap-4">
          <div className={`p-3 rounded-xl bg-gradient-to-r ${colors[variant].gradient}`}>
            <Icon className="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-lg">{title}</h3>
            <p className="text-sm text-gray-500">{description}</p>
          </div>
        </div>
      </motion.div>
    </button>
  );
};

export default PaymentMethodButton;