import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Lock } from 'lucide-react';

const KlarnaPaymentHeader = () => {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <a href="/chat">
              <svg width="40" height="40" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="100" height="100" rx="50" fill="black"/>
                <rect x="42" y="15" width="50" height="50" rx="25" fill="white"/>
                <path d="M1.5 62H98.5V62C98.2174 65.3914 95.3823 68 91.9792 68H8.02079C4.61764 68 1.78261 65.3914 1.5 62V62Z" fill="white"/>
              </svg>
            </a>
            
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