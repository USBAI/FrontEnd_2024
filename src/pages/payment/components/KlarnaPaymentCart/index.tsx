import React from 'react';
import { useCart } from '../../../../components/search/hooks/useCart';
import CartItemList from './CartItemList';
import CartLoading from './CartLoading';

const KlarnaPaymentCart = () => {
  const { cartItems, isLoading } = useCart();

  if (isLoading) {
    return <CartLoading />;
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-6">Shopping Cart</h2>
      <CartItemList items={cartItems || []} />
    </div>
  );
};

export default KlarnaPaymentCart;