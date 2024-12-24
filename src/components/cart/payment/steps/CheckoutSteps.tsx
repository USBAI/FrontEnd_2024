import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import ShippingStep from './ShippingStep';
import PaymentStep from './PaymentStep';

const CheckoutSteps = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [shippingData, setShippingData] = useState({
    shipping_address: '',
    shipping_city: '',
    shipping_postal_code: '',
    shipping_country: '',
    phone_number: ''
  });

  const handleShippingSubmit = (data: typeof shippingData) => {
    setShippingData(data);
    setCurrentStep(2);
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg">
      {currentStep === 1 ? (
        <ShippingStep 
          initialData={shippingData}
          onSubmit={handleShippingSubmit}
        />
      ) : (
        <PaymentStep shippingData={shippingData} />
      )}
    </div>
  );
};

export default CheckoutSteps;