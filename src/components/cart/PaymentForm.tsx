import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Calendar, Lock } from 'lucide-react';

interface PaymentFormProps {
  total: number;
  onSubmit: () => void;
}

const PaymentForm = ({ total, onSubmit }: PaymentFormProps) => {
  const [formData, setFormData] = useState({
    cardNumber: '',
    expiry: '',
    cvc: '',
    name: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Here we would normally create a payment intent on the backend
      // and handle the Stripe payment flow securely
      onSubmit();
      
      // Simulate payment processing
      setTimeout(() => {
        // Handle success/error
      }, 2000);
    } catch (error) {
      console.error('Payment error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Card Number
        </label>
        <div className="relative">
          <CreditCard className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <input
            type="text"
            value={formData.cardNumber}
            onChange={(e) => setFormData(prev => ({ ...prev, cardNumber: e.target.value }))}
            placeholder="1234 5678 9012 3456"
            className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Expiry Date
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              value={formData.expiry}
              onChange={(e) => setFormData(prev => ({ ...prev, expiry: e.target.value }))}
              placeholder="MM/YY"
              className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            CVC
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              value={formData.cvc}
              onChange={(e) => setFormData(prev => ({ ...prev, cvc: e.target.value }))}
              placeholder="123"
              className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Name on Card
        </label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
          placeholder="John Doe"
          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
        />
      </div>

      <div className="pt-4">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          className="w-full py-4 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
        >
          Pay {total} kr
          <Lock className="h-5 w-5" />
        </motion.button>
      </div>
    </form>
  );
};

export default PaymentForm;