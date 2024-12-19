import React from 'react';
import { Shield } from 'lucide-react';

const SecurityBadges = () => {
  return (
    <div className="px-4 sm:px-6 pb-4 sm:pb-6 flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-gray-400">
      <Shield className="h-4 w-4 sm:h-5 sm:w-5" />
      <span className="text-xs sm:text-sm">PCI Compliant</span>
      <span className="hidden sm:inline">•</span>
      <span className="text-xs sm:text-sm">256-bit SSL Encryption</span>
    </div>
  );
};

export default SecurityBadges;