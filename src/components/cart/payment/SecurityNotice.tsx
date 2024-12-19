import React from 'react';
import { Lock } from 'lucide-react';

const SecurityNotice = () => {
  return (
    <div className="mt-6 flex items-center gap-2 text-sm text-gray-500 bg-gray-50 rounded-lg p-3">
      <Lock className="h-4 w-4 flex-shrink-0" />
      <p className="text-xs sm:text-sm">Your payment information is encrypted and secure</p>
    </div>
  );
};

export default SecurityNotice;