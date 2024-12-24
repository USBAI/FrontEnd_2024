import React from 'react';

const CartLoadingState = () => {
  return (
    <div className="flex items-center justify-center h-64">
      <div className="animate-spin rounded-full h-8 w-8 border-2 border-pink-500 border-t-transparent"></div>
    </div>
  );
};

export default CartLoadingState;