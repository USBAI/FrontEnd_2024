import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Loader } from 'lucide-react';
import { useCart } from '../../search/hooks/useCart';
import { createOrder } from '../../../services/orderService';

interface PaymentSuccessProps {
  onClose: () => void;
  paymentId: string;
}

const PaymentSuccess = ({ onClose, paymentId }: PaymentSuccessProps) => {
  const { cartItems } = useCart();
  const [isProcessing, setIsProcessing] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const processOrder = async () => {
      const userId = localStorage.getItem('user_id');
      if (!userId || !cartItems) return;

      try {
        const result = await createOrder(userId, paymentId, cartItems);
        
        if (result.status === 'error') {
          throw new Error(result.message);
        }
      } catch (error) {
        console.error('Error processing order:', error);
        setError(error instanceof Error ? error.message : 'Failed to process order');
      } finally {
        setIsProcessing(false);
      }
    };

    processOrder();
  }, [paymentId, cartItems]);

  if (isProcessing) {
    return (
      <div className="text-center py-12">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6"
        >
          <Loader className="h-8 w-8 text-blue-500" />
        </motion.div>
        <h3 className="text-xl font-semibold mb-2">Processing Your Order</h3>
        <p className="text-gray-600">
          Please wait while we complete your purchase...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-6">
          <CheckCircle className="h-8 w-8 text-red-500" />
        </div>
        <h3 className="text-xl font-semibold mb-2">Something Went Wrong</h3>
        <p className="text-gray-600 mb-6">
          {error}
        </p>
        <button
          onClick={onClose}
          className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-900 transition-colors"
        >
          Close
        </button>
      </div>
    );
  }

  return (
    <div className="text-center py-12">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6"
      >
        <CheckCircle className="h-8 w-8 text-green-500" />
      </motion.div>
      <h3 className="text-xl font-semibold mb-2">Payment Successful!</h3>
      <p className="text-gray-600 mb-6">
        Thank you for your purchase. Your order is being processed.
      </p>
      <button
        onClick={onClose}
        className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-900 transition-colors"
      >
        Continue Shopping
      </button>
    </div>
  );
};

export default PaymentSuccess;