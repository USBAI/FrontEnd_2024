import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CreditCard } from 'lucide-react';
import PaymentOverlay from './payment/PaymentOverlay';

interface CartSummaryProps {
  items: Array<{ product_price: string }>;
  onClose: () => void;
}

const CartSummary = ({ items, onClose }: CartSummaryProps) => {
  const [showPayment, setShowPayment] = useState(false);

  const calculateTotal = () => {
    return items.reduce((sum, item) => {
      const numericPrice = parseFloat(item.product_price.replace(/[^0-9.]/g, ''));
      return sum + numericPrice;
    }, 0).toFixed(2);
  };

  const handleCheckout = () => {
    setShowPayment(true);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl p-6 shadow-sm h-fit"
      >
        <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
        <div className="space-y-3 mb-6">
          <div className="flex justify-between text-gray-600">
            <span>Subtotal</span>
            <span>{calculateTotal()} kr</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>Shipping</span>
            <span>Free</span>
          </div>
          <div className="border-t border-gray-200 pt-3 flex justify-between font-semibold">
            <span>Total</span>
            <span>{calculateTotal()} kr</span>
          </div>
        </div>
        <button
          onClick={handleCheckout}
          className="w-full py-3 bg-black text-white rounded-lg font-medium hover:bg-gray-900 transition-colors flex items-center justify-center gap-2"
        >
          <CreditCard className="h-5 w-5" />
          Checkout
        </button>
      </motion.div>

      <PaymentOverlay
        isOpen={showPayment}
        onClose={() => setShowPayment(false)}
        total={parseFloat(calculateTotal())}
      />
    </>
  );
};

export default CartSummary;