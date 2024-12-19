import React from 'react';

const KlarnaPaymentError: React.FC = () => {
  return (
    <div className="text-center py-8 text-red-600">
      Failed to load Klarna payment. Please try again.
    </div>
  );
};

export default KlarnaPaymentError;