import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import ShippingForm from './ShippingForm';
import PaymentMethodSelector from './PaymentMethodSelector';
import { useCart } from '../../search/hooks/useCart';

interface CheckoutFormProps {
  onPaymentMethodSelect: (method: string) => void;
}

const CheckoutForm = ({ onPaymentMethodSelect }: CheckoutFormProps) => {
  const { cartItems } = useCart();
  const [selectedMethod, setSelectedMethod] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    shipping_address: '',
    shipping_city: '',
    shipping_postal_code: '',
    shipping_country: '',
    phone_number: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const userId = localStorage.getItem('user_id');
      if (!userId || !cartItems) throw new Error('Missing user ID or cart items');

      // Create an order for each cart item
      const orderPromises = cartItems.map(item => 
        fetch('http://127.0.0.1:8013/AddOrder_Confirm/place_order/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            user_id: userId,
            product_name: item.product_name,
            product_url: item.product_url,
            product_price: item.product_price,
            quantity: '1',
            ...formData
          })
        })
      );

      await Promise.all(orderPromises);
      onPaymentMethodSelect(selectedMethod);
    } catch (error) {
      console.error('Error placing order:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Shipping Information */}
      <ShippingForm 
        formData={formData}
        onChange={handleInputChange}
      />

      {/* Payment Method Selection */}
      <PaymentMethodSelector
        selectedMethod={selectedMethod}
        onSelect={setSelectedMethod}
      />

      {/* Submit Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        type="submit"
        disabled={isSubmitting || !selectedMethod}
        className="w-full py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-medium flex items-center justify-center gap-2 hover:from-blue-600 hover:to-purple-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? (
          <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
        ) : (
          <>
            Continue to Payment
            <ArrowRight className="h-5 w-5" />
          </>
        )}
      </motion.button>
    </form>
  );
};

export default CheckoutForm;