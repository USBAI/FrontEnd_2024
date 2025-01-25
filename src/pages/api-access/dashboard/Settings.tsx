import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Save, Bell, Shield, Globe, Mail, Loader2 } from 'lucide-react';
import DashboardLayout from './DashboardLayout';

interface UserInfo {
  company_name: string;
  email: string;
  website_url: string;
  plan: string;
  active: boolean;
}

const Settings = () => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    company_name: '',
    email: '',
    website_url: ''
  });

  useEffect(() => {
    const fetchUserInfo = async () => {
      const userUuid = localStorage.getItem('user_uuid');
      if (!userUuid) return;

      try {
        const response = await fetch('https://customerserver-ec7f53c083c0.herokuapp.com/AccessApi/get_user_info/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ user_uuid: userUuid })
        });

        if (response.ok) {
          const data = await response.json();
          setUserInfo(data.user_info);
          setFormData({
            company_name: data.user_info.company_name,
            email: data.user_info.email,
            website_url: data.user_info.website_url
          });
        } else {
          setError('Failed to fetch user information');
        }
      } catch (error) {
        setError('An error occurred while fetching user information');
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserInfo();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async () => {
    // Handle form submission
    console.log('Saving changes:', formData);
  };

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-screen">
          <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-3xl font-bold mb-4">Settings</h1>
          <p className="text-gray-400">Manage your API account preferences</p>
        </div>

        {error && (
          <div className="mb-8 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Settings */}
          <div className="lg:col-span-2 space-y-8">
            {/* Account Settings */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10"
            >
              <div className="p-6 border-b border-white/10">
                <h2 className="text-xl font-bold">Account Settings</h2>
              </div>
              <div className="p-6 space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Company Name
                  </label>
                  <input
                    type="text"
                    name="company_name"
                    value={formData.company_name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-black/30 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-black/30 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Website URL
                  </label>
                  <input
                    type="url"
                    name="website_url"
                    value={formData.website_url}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-black/30 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-white"
                  />
                </div>
              </div>
            </motion.div>

            {/* Plan Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10"
            >
              <div className="p-6 border-b border-white/10">
                <h2 className="text-xl font-bold">Plan Information</h2>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Current Plan</label>
                    <p className="text-lg font-semibold">{userInfo?.plan}</p>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Status</label>
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${
                      userInfo?.active 
                        ? 'bg-green-500/20 text-green-400'
                        : 'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {userInfo?.active ? 'Active' : 'Pending Activation'}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Sidebar Settings */}
          <div className="space-y-8">
            {/* Notifications */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10"
            >
              <div className="p-6 border-b border-white/10">
                <h2 className="text-xl font-bold">Notifications</h2>
              </div>
              <div className="p-6 space-y-4">
                {[
                  { icon: Bell, label: 'API Status Updates' },
                  { icon: Shield, label: 'Security Alerts' },
                  { icon: Mail, label: 'Usage Reports' }
                ].map((item, index) => (
                  <label key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <item.icon className="h-5 w-5 text-gray-400" />
                      <span>{item.label}</span>
                    </div>
                    <input
                      type="checkbox"
                      defaultChecked
                      className="rounded border-gray-600 text-blue-500 focus:ring-blue-500 focus:ring-offset-gray-900"
                    />
                  </label>
                ))}
              </div>
            </motion.div>

            {/* Save Changes */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              onClick={handleSubmit}
              className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-medium hover:from-blue-600 hover:to-purple-600 transition-all flex items-center justify-center gap-2"
            >
              <Save className="h-5 w-5" />
              Save Changes
            </motion.button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Settings;