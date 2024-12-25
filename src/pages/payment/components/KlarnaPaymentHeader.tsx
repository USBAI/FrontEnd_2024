import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Lock } from 'lucide-react';

const KlarnaPaymentHeader = () => {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
          <svg width="63" height="31" viewBox="0 0 63 31" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="63" height="31" rx="15.5" fill="url(#paint0_linear_0_1)"/>
            <rect x="4" y="3" width="25" height="25" rx="12.5" fill="black"/>
            <rect x="15" y="7" width="12" height="12" rx="6" fill="white"/>
            <path d="M4.25293 18H28.7402V18C28.6031 19.1412 27.635 20 26.4856 20H6.5152C5.36436 20 4.39403 19.1422 4.25293 18V18Z" fill="white"/>
            <g clip-path="url(#clip0_0_1)">
            <path d="M53.443 5.99991H49.0894C49.0894 9.57134 46.8983 12.7713 43.5691 15.057L42.2602 15.9713V5.99991H37.7358V25.9999H42.2602V16.0856L49.7439 25.9999H55.2641L48.065 16.5142C51.3374 14.1428 53.4715 10.457 53.443 5.99991Z" fill="#0B051D"/>
            </g>
            <defs>
            <linearGradient id="paint0_linear_0_1" x1="0" y1="0" x2="64.974" y2="26.0827" gradientUnits="userSpaceOnUse">
            <stop stop-color="#B6B7FF"/>
            <stop offset="1" stop-color="#FF88E1"/>
            </linearGradient>
            <clipPath id="clip0_0_1">
            <rect width="19" height="20" fill="white" transform="translate(37 6)"/>
            </clipPath>
            </defs>
          </svg>

          
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