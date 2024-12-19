import React from 'react';
import { CreditCard } from 'lucide-react';

const KlarnaHeader: React.FC = () => {
  return (
    <>
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-[#FFB3C7]/10 rounded-lg">
          <CreditCard className="h-5 w-5 text-[#FFB3C7]" />
        </div>
        <h3 className="text-lg font-medium text-gray-900">Pay with Klarna</h3>
      </div>

      <p className="text-gray-600 mb-4">
        You will be redirected to Klarna to complete your payment securely in a new tab.
      </p>
    </>
  );
};

export default KlarnaHeader;