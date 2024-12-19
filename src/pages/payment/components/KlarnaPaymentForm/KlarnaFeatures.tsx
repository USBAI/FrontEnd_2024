import React from 'react';

const KlarnaFeatures = () => {
  const features = [
    'Pay in installments',
    'Pay within 30 days',
    'Secure checkout process'
  ];

  return (
    <ul className="text-sm text-gray-600 space-y-2">
      {features.map((feature) => (
        <li key={feature} className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
          {feature}
        </li>
      ))}
    </ul>
  );
};

export default KlarnaFeatures;