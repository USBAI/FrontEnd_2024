import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone } from 'lucide-react';

interface ShippingFormProps {
  formData: {
    shipping_address: string;
    shipping_city: string;
    shipping_postal_code: string;
    shipping_country: string;
    phone_number: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

const ShippingForm = ({ formData, onChange }: ShippingFormProps) => {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium text-gray-900">Shipping Information</h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Street Address
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              name="shipping_address"
              value={formData.shipping_address}
              onChange={onChange}
              className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-lg"
              placeholder="Enter your street address"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              City
            </label>
            <input
              type="text"
              name="shipping_city"
              value={formData.shipping_city}
              onChange={onChange}
              className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg"
              placeholder="Enter city"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Postal Code
            </label>
            <input
              type="text"
              name="shipping_postal_code"
              value={formData.shipping_postal_code}
              onChange={onChange}
              className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg"
              placeholder="Enter postal code"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Country
          </label>
          <select
            name="shipping_country"
            value={formData.shipping_country}
            onChange={onChange}
            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg"
            required
          >
            <option value="">Select country</option>
            <option value="SE">Sweden</option>
            <option value="NO">Norway</option>
            <option value="DK">Denmark</option>
            <option value="FI">Finland</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number
          </label>
          <div className="relative">
            <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="tel"
              name="phone_number"
              value={formData.phone_number}
              onChange={onChange}
              className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-lg"
              placeholder="+46 70 123 4567"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShippingForm;