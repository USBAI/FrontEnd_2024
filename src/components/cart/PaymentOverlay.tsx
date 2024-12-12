import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CreditCard, Lock, Shield } from 'lucide-react';
import PaymentSuccess from './PaymentSuccess';

interface PaymentOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  total: number;
}

const PaymentOverlay = ({ isOpen, onClose, total }: PaymentOverlayProps) => {
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'loading' | 'ready' | 'success'>('idle');
  const [paymentUrl, setPaymentUrl] = useState<string | null>(null);
  const [iframeLoaded, setIframeLoaded] = useState(false);

  useEffect(() => {
    const initiatePayment = async () => {
      if (!isOpen) return;

      const userId = localStorage.getItem('user_id');
      if (!userId) return;

      try {
        setPaymentStatus('loading');
        const response = await fetch('http://127.0.0.1:8013/kluret_stripe/collect-data/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            user_id: userId,
            total_cost: total.toString(),
            total_products: 1,
            product_description: 'Cart Purchase'
          })
        });

        const data = await response.json();
        
        if (data.status === 'success' && data.payment_link) {
          setPaymentUrl(data.payment_link);
          setPaymentStatus('ready');
        } else {
          throw new Error('Invalid payment response');
        }
      } catch (error) {
        console.error('Error initiating payment:', error);
        setPaymentStatus('idle');
      }
    };

    if (isOpen) {
      initiatePayment();
    } else {
      setPaymentStatus('idle');
      setPaymentUrl(null);
      setIframeLoaded(false);
    }
  }, [isOpen, total]);

  const handleIframeLoad = () => {
    setIframeLoaded(true);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          
          {/* Payment Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl relative overflow-hidden">
              {/* Header */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-50 rounded-lg">
                      <CreditCard className="h-6 w-6 text-blue-500" />
                    </div>
                    <h2 className="text-xl font-semibold">Secure Checkout</h2>
                  </div>
                  <button
                    onClick={onClose}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <X className="h-5 w-5 text-gray-500" />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {paymentStatus === 'loading' && (
                  <div className="text-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent mx-auto mb-4" />
                    <p className="text-gray-600">Preparing secure checkout...</p>
                  </div>
                )}

                {paymentStatus === 'ready' && paymentUrl && (
                  <div className="relative">
                    {!iframeLoaded && (
                      <div className="absolute inset-0 flex items-center justify-center bg-white">
                        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent" />
                      </div>
                    )}
                    <iframe
                      src={paymentUrl}
                      className="w-full h-[500px] border-0"
                      onLoad={handleIframeLoad}
                      allow="payment"
                    />
                  </div>
                )}

                {paymentStatus === 'success' && (
                  <PaymentSuccess onClose={onClose} />
                )}

                {/* Security Notice */}
                <div className="mt-6 flex items-center gap-2 text-sm text-gray-500 bg-gray-50 rounded-lg p-3">
                  <Lock className="h-4 w-4" />
                  <p>Your payment information is encrypted and secure</p>
                </div>
              </div>

              {/* Security Badges */}
              <div className="px-6 pb-6 flex items-center justify-center gap-4 text-gray-400">
                <Shield className="h-5 w-5" />
                <span className="text-sm">PCI Compliant</span>
                <span>•</span>
                <span className="text-sm">256-bit SSL Encryption</span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default PaymentOverlay;