import React from 'react';

const CartLoadingState = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="space-y-6">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="bg-white rounded-xl p-4 animate-pulse">
            <div className="flex items-center gap-4">
              <div className="w-24 h-24 bg-gray-200 rounded-lg" />
              <div className="flex-1 space-y-3">
                <div className="h-4 bg-gray-200 rounded w-3/4" />
                <div className="h-4 bg-gray-200 rounded w-1/4" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CartLoadingState;