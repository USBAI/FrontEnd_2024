import React from 'react';
import { Phone } from 'lucide-react';

interface ContactFieldsProps {
  phoneNumber: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ContactFields = ({ phoneNumber, onChange }: ContactFieldsProps) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Phone Number
      </label>
      <div className="relative">
        <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
        <input
          type="tel"
          name="phone_number"
          value={phoneNumber}
          onChange={onChange}
          className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-lg"
          placeholder="+46 70 123 4567"
          required
        />
      </div>
    </div>
  );
};

export default ContactFields;