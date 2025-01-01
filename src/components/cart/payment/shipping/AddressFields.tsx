import React from 'react';
import { MapPin } from 'lucide-react';

interface AddressFieldsProps {
  address: string;
  city: string;
  postalCode: string;
  country: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

const AddressFields = ({ address, city, postalCode, country, onChange }: AddressFieldsProps) => {
  return (
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
            value={address}
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
            value={city}
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
            value={postalCode}
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
          value={country}
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
    </div>
  );
};

export default AddressFields;