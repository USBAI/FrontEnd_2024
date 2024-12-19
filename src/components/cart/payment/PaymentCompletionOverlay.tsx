import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, AlertCircle, Clock, ArrowRight, RotateCcw } from 'lucide-react';

interface PaymentCompletionOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onRetry: () => void;
  paymentIntentId: string | null;
  status: 'succeeded' | 'failed' | 'canceled' | null;
}

const PaymentCompletionOverlay = ({
  isOpen,
  onClose,
  onRetry,
  paymentIntentId,
  status
}: PaymentCompletionOverlayProps) => {
  useEffect(() => {
    // Auto-close successful payments after delay
    if (status === 'succeeded') {
      const timer = setTimeout(() => {
        onClose();
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [status, onClose]);

  const handleRetry = () => {
    // Get the stored payment URL
    const paymentUrl = localStorage.getItem('payment_redirect_url');
    if (paymentUrl) {
      // Open in new tab
      window.open(paymentUrl, '_blank', 'noopener,noreferrer');
    } else {
      // If no stored URL, use the retry handler
      onRetry();
    }
  };

  const handleClose = () => {
    // Clear any stored payment URLs
    localStorage.removeItem('payment_redirect_url');
    onClose();
  };

  const getStatusConfig = () => {
    switch (status) {
      case 'succeeded':
        return {
          title: 'Payment Successful!',
          description: 'Your payment has been processed successfully.',
          icon: CheckCircle,
          iconClass: 'text-green-500',
          bgClass: 'bg-green-100',
          showRetry: false
        };
      case 'failed':
        return {
          title: 'Payment Failed',
          description: 'There was an issue processing your payment.',
          icon: AlertCircle,
          iconClass: 'text-red-500',
          bgClass: 'bg-red-100',
          showRetry: true
        };
      case 'canceled':
        return {
          title: 'Payment Canceled',
          description: 'The payment was canceled.',
          icon: Clock,
          iconClass: 'text-yellow-500',
          bgClass: 'bg-yellow-100',
          showRetry: true
        };
      default:
        return {
          title: 'Processing Payment...',
          description: 'Please wait while we complete your payment.',
          icon: Clock,
          iconClass: 'text-blue-500',
          bgClass: 'bg-blue-100',
          showRetry: false
        };
    }
  };

  const config = getStatusConfig();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center"
          onClick={(e) => e.stopPropagation()}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 relative overflow-hidden shadow-xl"
          >
            {/* Status Icon */}
            <div className={`w-16 h-16 mx-auto mb-6 rounded-full ${config.bgClass} flex items-center justify-center`}>
              <config.icon className={`h-8 w-8 ${config.iconClass}`} />
            </div>

            {/* Status Text */}
            <h2 className="text-2xl font-bold text-center mb-2">{config.title}</h2>
            <p className="text-gray-600 text-center mb-8">{config.description}</p>

            {/* Action Buttons */}
            <div className="flex flex-col gap-3">
              {config.showRetry && (
                <button
                  onClick={handleRetry}
                  className="w-full py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
                >
                  <RotateCcw className="h-5 w-5" />
                  Retry Payment
                </button>
              )}
              <button
                onClick={handleClose}
                className="w-full py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
              >
                <ArrowRight className="h-5 w-5" />
                Return to Payment Form
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PaymentCompletionOverlay;