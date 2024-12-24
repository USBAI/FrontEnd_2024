import React from 'react';

interface CartErrorStateProps {
  error: string;
}

const CartErrorState = ({ error }: CartErrorStateProps) => {
  return (
    <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
      {error}
    </div>
  );
};

export default CartErrorState;