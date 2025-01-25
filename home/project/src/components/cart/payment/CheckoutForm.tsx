import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ShippingForm from './ShippingForm';
import PaymentMethodSelector from './PaymentMethodSelector';
import { useCart } from '../../search/hooks/useCart';

interface CheckoutFormProps {
  onPaymentMethodSelect: (method: string) => void;
}

const CheckoutForm = ({ onPaymentMethodSelect }: CheckoutFormProps) => {
  const navigate = useNavigate();
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
        fetch('https://customerserver-ec7f53c083c0.herokuapp.com/AddOrder_Confirm/place_order/', {
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

      const results = await Promise.all(orderPromises);
      const allSuccessful = results.every(response => response.ok);

      if (allSuccessful) {
        // Calculate total cost
        const totalCost = cartItems.reduce((sum, item) =>
          sum + parseFloat(item.product_price.replace(/[^0-9.]/g, '')), 0).toString();

        if (selectedMethod === 'klarna') {
          // Initialize Klarna payment
          const response = await fetch('https://customerserver-ec7f53c083c0.herokuapp.com/klarna_pay/create-klarna-payment-intent/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              user_id: userId,
              total_cost: totalCost,
              currency: 'sek'
            })
          });

          const data = await response.json();
          if (data.status === 'success' && data.payment_url) {
            // Store return URL
            localStorage.setItem('payment_return_url', window.location.href);
            // Redirect to Klarna in new tab
            window.open(data.payment_url, '_blank', 'noopener,noreferrer');
            // Close the payment overlay
            onPaymentMethodSelect(selectedMethod);
            return;
          }
        } else if (selectedMethod === 'card') {
          // Store shipping data in session
          sessionStorage.setItem('shipping_data', JSON.stringify(formData));
          // Navigate to Stripe payment page
          navigate('/payment/card');
          return;
        }
      }
    } catch (error) {
      console.error('Error placing order:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Don't render the form if Klarna payment is in progress
  if (selectedMethod === 'klarna' && isSubmitting) {
    return null;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 bg-white rounded-xl p-6 shadow-lg">
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
        className="w-full py-4 bg-black text-white rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-gray-900 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
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