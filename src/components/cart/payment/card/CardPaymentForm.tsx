import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Calendar, Lock } from 'lucide-react';

const CardPaymentForm = () => {
  const [cardData, setCardData] = useState({
    number: '',
    expiry: '',
    cvc: '',
    name: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // Format card number
    if (name === 'number') {
      const formatted = value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
      setCardData(prev => ({ ...prev, [name]: formatted }));
      return;
    }
    
    // Format expiry date
    if (name === 'expiry') {
      const formatted = value
        .replace(/\D/g, '')
        .replace(/(\d{2})(\d)/, '$1/$2')
        .slice(0, 5);
      setCardData(prev => ({ ...prev, [name]: formatted }));
      return;
    }

    setCardData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="mt-6 space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Card Number
        </label>
        <div className="relative">
          <CreditCard className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <input
            type="text"
            name="number"
            value={cardData.number}
            onChange={handleChange}
            placeholder="1234 5678 9012 3456"
            maxLength={19}
            className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Expiry Date
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              name="expiry"
              value={cardData.expiry}
              onChange={handleChange}
              placeholder="MM/YY"
              maxLength={5}
              className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            CVC
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              name="cvc"
              value={cardData.cvc}
              onChange={handleChange}
              placeholder="123"
              maxLength={4}
              className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
            />
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Name on Card
        </label>
        <input
          type="text"
          name="name"
          value={cardData.name}
          onChange={handleChange}
          placeholder="John Doe"
          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
        />
      </div>
    </div>
  );
};

export default CardPaymentForm;