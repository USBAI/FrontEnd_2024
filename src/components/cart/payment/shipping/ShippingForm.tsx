import React from 'react';
import { motion } from 'framer-motion';
import AddressFields from './AddressFields';
import ContactFields from './ContactFields';
import TermsAndConditions from './TermsAndConditions';

interface ShippingFormData {
  shipping_address: string;
  shipping_city: string;
  shipping_postal_code: string;
  shipping_country: string;
  phone_number: string;
}

interface ShippingFormProps {
  formData: ShippingFormData;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

const ShippingForm = ({ formData, onChange }: ShippingFormProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <h3 className="text-lg font-medium text-gray-900">Shipping Information</h3>
      
      <div className="space-y-6">
        {/* Contact Fields */}
        <ContactFields
          phoneNumber={formData.phone_number}
          onChange={onChange}
        />

        {/* Address Fields */}
        <AddressFields
          address={formData.shipping_address}
          city={formData.shipping_city}
          postalCode={formData.shipping_postal_code}
          country={formData.shipping_country}
          onChange={onChange}
        />
      </div>
    </motion.div>
  );
};

export default ShippingForm;