import React from 'react';
import { CartItem } from '../../../../components/search/hooks/useCart';
import CartPaymentOverlay from './CartPaymentOverlay';

interface CartSummaryProps {
  items: CartItem[];
  showPayment: boolean;
  onShowPayment: () => void;
  onClosePayment: () => void;
}

const CartSummary = ({ items, showPayment, onShowPayment, onClosePayment }: CartSummaryProps) => {
  const calculateTotal = () => {
    return items.reduce((total, item) => {
      const price = parseFloat(item.product_price.replace(/[^0-9.]/g, ''));
      return total + (isNaN(price) ? 0 : price);
    }, 0).toFixed(2);
  };

  return (
    <>
      <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
        <div className="flex justify-between mb-4">
          <span className="text-gray-400">Subtotal</span>
          <span className="text-white font-medium">
            kr {calculateTotal()}
          </span>
        </div>
        <button
          onClick={onShowPayment}
          className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-medium hover:from-blue-600 hover:to-purple-600 transition-all"
        >
          Proceed to Checkout
        </button>
      </div>

      <CartPaymentOverlay
        isOpen={showPayment}
        onClose={onClosePayment}
        total={parseFloat(calculateTotal())}
      />
    </>
  );
};

export default CartSummary;