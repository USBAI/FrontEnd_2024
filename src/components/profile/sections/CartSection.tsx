import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';
import CartHeader from './cart/CartHeader';
import CartItemList from './cart/CartItemList';
import CartSummary from './cart/CartSummary';
import CartEmptyState from './cart/CartEmptyState';
import CartLoadingState from './cart/CartLoadingState';
import CartErrorState from './cart/CartErrorState';
import { useCart } from '../../../components/search/hooks/useCart';

const CartSection = () => {
  const { cartItems, isLoading, error } = useCart();
  const [showPayment, setShowPayment] = React.useState(false);

  if (isLoading) {
    return <CartLoadingState />;
  }

  if (error) {
    return <CartErrorState error={error} />;
  }

  if (!cartItems?.length) {
    return <CartEmptyState />;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <CartHeader itemCount={cartItems.length} />
      <div className="space-y-4">
        <CartItemList items={cartItems} />
        <CartSummary 
          items={cartItems}
          showPayment={showPayment}
          onShowPayment={() => setShowPayment(true)}
          onClosePayment={() => setShowPayment(false)}
        />
      </div>
    </div>
  );
};

export default CartSection;