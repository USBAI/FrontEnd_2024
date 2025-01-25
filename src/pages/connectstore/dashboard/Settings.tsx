import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Save, Store, Mail, Globe, MapPin, Phone, CreditCard, Building2 } from 'lucide-react';

interface StoreInfo {
  store: {
    store_id: string;
    store_name: string;
    email: string;
    website_url: string;
    store_type: string;
    phone_number?: string;
    store_currency?: string;
    street_address?: string;
    city?: string;
    postal_code?: string;
    country?: string;
  };
}

const Settings = () => {
  const [storeInfo, setStoreInfo] = useState<StoreInfo | null>(null);
  const [editedInfo, setEditedInfo] = useState({
    store_name: '',
    store_email: '',
    phone_number: '',
    store_currency: '',
    street_address: '',
    city: '',
    postal_code: '',
    country: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('store_token');
    const storeId = localStorage.getItem('store_id');

    if (!token || !storeId) return;

    const fetchStoreInfo = async () => {
      try {
        const response = await fetch('https://customerserver-ec7f53c083c0.herokuapp.com/ConnectStoreServer/get_store_info/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ store_id: storeId })
        });

        if (response.ok) {
          const data = await response.json();
          setStoreInfo(data);
          setEditedInfo({
            store_name: data.store.store_name || '',
            store_email: data.store.email || '',
            phone_number: data.store.phone_number || '',
            store_currency: data.store.store_currency || '',
            street_address: data.store.street_address || '',
            city: data.store.city || '',
            postal_code: data.store.postal_code || '',
            country: data.store.country || ''
          });
        }
      } catch (error) {
        console.error('Error fetching store info:', error);
      }
    };

    fetchStoreInfo();
  }, []);

  const handleSave = async () => {
    setIsLoading(true);
    setSaveSuccess(false);
    const token = localStorage.getItem('store_token');
    const storeId = localStorage.getItem('store_id');

    if (!token || !storeId) {
      console.error('Missing token or store ID');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('https://customerserver-ec7f53c083c0.herokuapp.com/ConnectStoreServer/save_store_info/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          store_id: storeId,
          ...editedInfo
        })
      });

      if (response.ok) {
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
        
        if (storeInfo) {
          setStoreInfo({
            store: {
              ...storeInfo.store,
              ...editedInfo
            }
          });
        }
      } else {
        throw new Error('Failed to save store information');
      }
    } catch (error) {
      console.error('Error saving store info:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const currencies = [
    { code: 'SEK', name: 'Swedish Krona' },
    { code: 'EUR', name: 'Euro' },
    { code: 'USD', name: 'US Dollar' },
    { code: 'GBP', name: 'British Pound' }
  ];

  const countries = [
    { code: 'SE', name: 'Sweden' },
    { code: 'NO', name: 'Norway' },
    { code: 'DK', name: 'Denmark' },
    { code: 'FI', name: 'Finland' }
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">Settings</h1>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleSave}
          disabled={isLoading}
          className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
          ) : (
            <>
              <Save className="h-5 w-5" />
              Save Changes
            </>
          )}
        </motion.button>
      </div>

      {saveSuccess && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="mb-6 p-4 bg-green-100 border border-green-200 rounded-lg text-green-700"
        >
          Settings saved successfully!
        </motion.div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* General Settings */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold">General Settings</h2>
              <p className="text-sm text-gray-500">Update your store information</p>
            </div>
            <div className="p-6 space-y-6">
              {/* Store Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Store Name
                </label>
                <div className="relative">
                  <Store className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    value={editedInfo.store_name}
                    onChange={(e) => setEditedInfo(prev => ({ ...prev, store_name: e.target.value }))}
                    className="w-full pl-12 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-500/50"
                  />
                </div>
              </div>

              {/* Store Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Store Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="email"
                    value={editedInfo.store_email}
                    onChange={(e) => setEditedInfo(prev => ({ ...prev, store_email: e.target.value }))}
                    className="w-full pl-12 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-500/50"
                  />
                </div>
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="tel"
                    value={editedInfo.phone_number}
                    onChange={(e) => setEditedInfo(prev => ({ ...prev, phone_number: e.target.value }))}
                    className="w-full pl-12 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-500/50"
                    placeholder="+46 70 123 4567"
                  />
                </div>
              </div>

              {/* Store Currency */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Store Currency
                </label>
                <div className="relative">
                  <CreditCard className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <select
                    value={editedInfo.store_currency}
                    onChange={(e) => setEditedInfo(prev => ({ ...prev, store_currency: e.target.value }))}
                    className="w-full pl-12 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-500/50"
                  >
                    <option value="">Select a currency</option>
                    {currencies.map(currency => (
                      <option key={currency.code} value={currency.code}>
                        {currency.name} ({currency.code})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Address Section */}
              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-semibold mb-4">Store Address</h3>
                
                {/* Street Address */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Street Address
                  </label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      value={editedInfo.street_address}
                      onChange={(e) => setEditedInfo(prev => ({ ...prev, street_address: e.target.value }))}
                      className="w-full pl-12 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-500/50"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* City */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      City
                    </label>
                    <input
                      type="text"
                      value={editedInfo.city}
                      onChange={(e) => setEditedInfo(prev => ({ ...prev, city: e.target.value }))}
                      className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-500/50"
                    />
                  </div>

                  {/* Postal Code */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Postal Code
                    </label>
                    <input
                      type="text"
                      value={editedInfo.postal_code}
                      onChange={(e) => setEditedInfo(prev => ({ ...prev, postal_code: e.target.value }))}
                      className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-500/50"
                    />
                  </div>

                  {/* Country */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Country
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <select
                        value={editedInfo.country}
                        onChange={(e) => setEditedInfo(prev => ({ ...prev, country: e.target.value }))}
                        className="w-full pl-12 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-500/50"
                      >
                        <option value="">Select a country</option>
                        {countries.map(country => (
                          <option key={country.code} value={country.code}>
                            {country.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Store Information */}
        <div>
          <div className="bg-white rounded-xl shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold">Store Information</h2>
              <p className="text-sm text-gray-500">Current store details</p>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-gray-500">Store ID</label>
                  <p className="font-medium">{storeInfo?.store.store_id}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">Store Type</label>
                  <p className="font-medium capitalize">{storeInfo?.store.store_type}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">Website</label>
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4 text-gray-400" />
                    <a 
                      href={storeInfo?.store.website_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-pink-500 hover:text-pink-600"
                    >
                      {storeInfo?.store.website_url}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;