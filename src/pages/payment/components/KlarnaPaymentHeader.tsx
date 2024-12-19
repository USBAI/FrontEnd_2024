import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Lock } from 'lucide-react';

const KlarnaPaymentHeader = () => {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-6 w-6 text-pink-500" />
            <span className="font-medium">Secure Checkout</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Lock className="h-4 w-4" />
            <span>Powered by Klarna</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default KlarnaPaymentHeader;