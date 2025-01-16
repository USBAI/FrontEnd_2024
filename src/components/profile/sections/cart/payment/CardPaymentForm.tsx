import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Lock } from 'lucide-react';
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import LoadingSpinner from '../../../../ui/LoadingSpinner';

interface CardPaymentFormProps {
  total: number;
  onBack: () => void;
  onProcessing: () => void;
  onSuccess: () => void;
  onError: () => void;
}

const CardPaymentForm = ({ total, onBack, onProcessing, onSuccess, onError }: CardPaymentFormProps) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [shippingInfo, setShippingInfo] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
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
  const [isShippingComplete, setIsShippingComplete] = useState(false);
  const [isSaving, setIsSaving] = useState(false); // State for spinner
  const [saveButtonText, setSaveButtonText] = useState('Save Shipping Information'); // State for button text

  const userId = localStorage.getItem('user_id'); // Get the user ID from localStorage

  useEffect(() => {
    if (!userId) {
      console.error('User ID is missing in localStorage');
      return;
    }

    const fetchShippingInfo = async () => {
      try {
        const response = await fetch(`https://customerserver1-5d81976997ba.herokuapp.com/users/get-shipping-info/?user_id=${userId}`);
        const data = await response.json();
        if (data.status === 'success') {
          setShippingInfo(data.shipping_info);
          setFormFields(data.shipping_info); // Prepopulate form fields
        } else {
          console.log('No shipping info found');
        }
      } catch (error) {
        console.error('Error fetching shipping info:', error);
      }
    };

    fetchShippingInfo();
  }, [userId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleSaveShipping = async () => {
    setIsSaving(true);
    setSaveButtonText('Saving...');
    try {
      const url = shippingInfo
        ? `https://customerserver1-5d81976997ba.herokuapp.com/users/update-shipping-info/`
        : `https://customerserver1-5d81976997ba.herokuapp.com/users/post-shipping-info/`;
      const method = shippingInfo ? 'PUT' : 'POST';
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: userId, ...formFields }),
      });
      const data = await response.json();
      if (data.status === 'success') {
        setSaveButtonText('Saved Successfully');
        setIsShippingComplete(true);
        setShippingInfo(formFields); // Update local state
      } else {
        setSaveButtonText('Save Failed');
      }
    } catch (error) {
      console.error('Error saving shipping information:', error);
      setSaveButtonText('Save Failed');
    } finally {
      setTimeout(() => {
        setIsSaving(false);
        setSaveButtonText('Save Shipping Information');
      }, 2000);
    }
  };

  const handleSubmitPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setIsSubmitting(true);
    onProcessing();

    try {
      const { error: submitError } = await elements.submit();
      if (submitError) {
        throw new Error(submitError.message);
      }

      const result = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/payment-complete`,
        },
      });

      if (result.error) {
        throw new Error(result.error.message);
      }

      onSuccess();
    } catch (error) {
      console.error('Payment error:', error);
      onError();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-gray-500 hover:text-gray-700 mb-6"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to payment methods
      </button>

      {!isShippingComplete ? (
        <div>
          <h2 className="text-lg font-bold mb-4">
            {shippingInfo ? 'Edit Shipping Information' : 'Enter Shipping Information'}
          </h2>
          <form className="space-y-4 max-h-[30vh] overflow-y-auto">
            <input
              type="text"
              name="full_name"
              placeholder="Full Name"
              value={formFields.full_name}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={formFields.address}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
            <input
              type="text"
              name="city"
              placeholder="City"
              value={formFields.city}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
            <input
              type="text"
              name="state"
              placeholder="State"
              value={formFields.state}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
            <input
              type="text"
              name="zip_code"
              placeholder="ZIP Code"
              value={formFields.zip_code}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
            <input
              type="text"
              name="country"
              placeholder="Country"
              value={formFields.country}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
            <input
              type="text"
              name="phone_number"
              placeholder="Phone Number"
              value={formFields.phone_number}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formFields.email}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
            <textarea
              name="additional_instructions"
              placeholder="Additional Instructions (optional)"
              value={formFields.additional_instructions}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
            <button
              type="button"
              onClick={handleSaveShipping}
              className="w-full py-2 bg-blue-500 text-white rounded flex items-center justify-center"
              disabled={isSaving}
            >
              {isSaving ? <LoadingSpinner size="sm" /> : saveButtonText}
            </button>
          </form>
        </div>
      ) : (
        <form onSubmit={handleSubmitPayment} className="space-y-6">
          <PaymentElement
            options={{
              wallets: {
                applePay: 'auto',
                googlePay: 'auto',
              },
              // Exclude Klarna by default
              paymentMethodOrder: ['card', 'googlePay', 'applePay'],
            }}
          />
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isSubmitting || !stripe || !elements}
            className="w-full py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-medium flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? <LoadingSpinner size="sm" /> : `Pay ${total} kr`}
          </motion.button>
        </form>
      )}

      <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
        <Lock className="h-4 w-4" />
        <p>Payments are secure and encrypted</p>
      </div>
    </div>
  );
};

export default CardPaymentForm;
