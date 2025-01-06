import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Clock, ArrowLeft } from 'lucide-react';

interface PaymentMethodSelectorProps {
  onShippingComplete: (method: 'card' | 'klarna') => void;
}

const PaymentMethodSelector = ({ onShippingComplete }: PaymentMethodSelectorProps) => {
  const [selectedMethod, setSelectedMethod] = useState<'card' | 'klarna' | null>(null);
  const [isShippingComplete, setIsShippingComplete] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formFields, setFormFields] = useState({
    full_name: '',
    address: '',
    city: '',
    state: '',
    zip_code: '',
    country: '',
    phone_number: '',
    email: '',
    additional_instructions: '',
  });

  const paymentMethods = [
    {
      id: 'card',
      title: 'Pay with Card',
      description: 'Credit/Debit Card, Apple Pay, Google Pay',
      icon: CreditCard,
      gradient: 'from-blue-500 to-purple-500',
    },
    {
      id: 'klarna',
      title: 'Pay with Klarna',
      description: 'Pay later or in installments',
      icon: Clock,
      gradient: 'from-pink-500 to-purple-500',
    },
  ];

  useEffect(() => {
    const fetchShippingInfo = async () => {
      try {
        const userId = localStorage.getItem('user_id');
        if (!userId) {
          setError('User not authenticated');
          return;
        }

        const response = await fetch(`https://customerserver1-5d81976997ba.herokuapp.com/users/get-shipping-info/?user_id=${userId}`);
        const data = await response.json();

        if (data.status === 'success') {
          setFormFields(data.shipping_info);
        } else {
          setError('Shipping information not found.');
        }
      } catch (error) {
        console.error('Error fetching shipping information:', error);
        setError('Failed to fetch shipping information.');
      }
    };

    if (selectedMethod) {
      fetchShippingInfo();
    }
  }, [selectedMethod]);

  const handleSelectMethod = (method: 'card' | 'klarna') => {
    setSelectedMethod(method);
    setIsShippingComplete(false);
  };

  const handleSaveShipping = async () => {
    setIsSaving(true);
    try {
      const url = `https://customerserver1-5d81976997ba.herokuapp.com/users/post-shipping-info/`;
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: localStorage.getItem('user_id'), ...formFields }),
      });
      const data = await response.json();

      if (data.status === 'success') {
        setIsShippingComplete(true);
        localStorage.setItem('payment_return_url', window.location.href);
        window.open('/payment/klarna', '_blank');
      } else {
        setError('Failed to save shipping information.');
      }
    } catch (error) {
      console.error('Error saving shipping information:', error);
      setError('Failed to save shipping information.');
    } finally {
      setIsSaving(false);
    }
  };

  if (!isShippingComplete && selectedMethod) {
    return (
      <div className="p-6">
        <button
          onClick={() => setSelectedMethod(null)}
          className="flex items-center gap-2 text-gray-500 hover:text-gray-700 mb-4"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to payment methods
        </button>
        <h2 className="text-lg font-bold mb-4">Enter Shipping Information</h2>
        <form className="space-y-4">
          <input
            type="text"
            name="full_name"
            placeholder="Full Name"
            value={formFields.full_name}
            onChange={(e) => setFormFields({ ...formFields, full_name: e.target.value })}
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={formFields.address}
            onChange={(e) => setFormFields({ ...formFields, address: e.target.value })}
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            name="city"
            placeholder="City"
            value={formFields.city}
            onChange={(e) => setFormFields({ ...formFields, city: e.target.value })}
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            name="state"
            placeholder="State"
            value={formFields.state}
            onChange={(e) => setFormFields({ ...formFields, state: e.target.value })}
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            name="zip_code"
            placeholder="ZIP Code"
            value={formFields.zip_code}
            onChange={(e) => setFormFields({ ...formFields, zip_code: e.target.value })}
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            name="country"
            placeholder="Country"
            value={formFields.country}
            onChange={(e) => setFormFields({ ...formFields, country: e.target.value })}
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            name="phone_number"
            placeholder="Phone Number"
            value={formFields.phone_number}
            onChange={(e) => setFormFields({ ...formFields, phone_number: e.target.value })}
            className="w-full p-2 border rounded"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formFields.email}
            onChange={(e) => setFormFields({ ...formFields, email: e.target.value })}
            className="w-full p-2 border rounded"
          />
          <textarea
            name="additional_instructions"
            placeholder="Additional Instructions (optional)"
            value={formFields.additional_instructions}
            onChange={(e) =>
              setFormFields({ ...formFields, additional_instructions: e.target.value })
            }
            className="w-full p-2 border rounded"
          />
          <button
            type="button"
            onClick={handleSaveShipping}
            className="w-full py-2 bg-blue-500 text-white rounded"
            disabled={isSaving}
          >
            {isSaving ? 'Saving...' : 'Save Shipping Information'}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-6">Select Payment Method</h2>
      <div className="grid grid-cols-1 gap-4">
        {paymentMethods.map((method) => (
          <motion.button
            key={method.id}
            onClick={() => handleSelectMethod(method.id as 'card' | 'klarna')}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`w-full p-6 rounded-xl border-2 border-gray-200 hover:border-gray-300 bg-white text-left transition-all`}
          >
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-xl bg-gradient-to-r ${method.gradient}`}>
                <method.icon className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">{method.title}</h3>
                <p className="text-sm text-gray-500">{method.description}</p>
              </div>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default PaymentMethodSelector;
