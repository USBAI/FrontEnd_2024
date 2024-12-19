import React from 'react';
import { CreditCard } from 'lucide-react';

const KlarnaHeader = () => {
  return (
    <>
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-[#FFB3C7]/10 rounded-lg">
          <CreditCard className="h-5 w-5 text-[#FFB3C7]" />
        </div>
        <h3 className="text-lg font-medium">Pay with Klarna</h3>
      </div>

      <p className="text-gray-600 mb-4">
        Complete your payment securely with Klarna
      </p>
    </>
  );
};

export default KlarnaHeader;