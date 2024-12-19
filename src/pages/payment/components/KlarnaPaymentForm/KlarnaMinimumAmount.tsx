import React from 'react';

const KlarnaMinimumAmount = () => {
  return (
    <div className="text-center py-8">
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
        <p className="text-yellow-600">
          Minimum order amount is 3 kr. Please add more items to your cart.
        </p>
      </div>
    </div>
  );
};

export default KlarnaMinimumAmount;