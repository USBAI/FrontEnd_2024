import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Store, ArrowLeft, Check, Building2, Globe, Lock, Mail } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    store_name: '',
    email: '',
    website_url: '',
    store_type: 'shopify',
    password: '',
    confirm_password: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch('https://customerserver-ec7f53c083c0.herokuapp.com/ConnectStoreAuth/register/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        navigate('/connectstore/login');
      } else {
        setError(data.message || 'Registration failed. Please try again.');
      }
    } catch (error) {
      setError('An error occurred. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const storeTypes = [
    { value: 'shopify', label: 'Shopify', description: 'Best for established online stores' },
    { value: 'woocommerce', label: 'WooCommerce', description: 'Perfect for WordPress websites' },
    { value: 'magento', label: 'Magento', description: 'Ideal for large enterprises' },
    { value: 'custom', label: 'Custom Platform', description: 'For custom-built e-commerce solutions' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-black text-white">
      <div className="relative pt-20 pb-20 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 via-purple-500/10 to-blue-500/10 animate-gradient" />
          <div className="absolute inset-0 backdrop-blur-[100px]" />
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 4,
            }}
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
          />
        </div>

        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <Link 
            to="/connectstore"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8 group"
          >
            <ArrowLeft className="h-4 w-4 transform group-hover:-translate-x-1 transition-transform" />
            Back to Overview
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10 shadow-2xl"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-xl">
                <Store className="h-6 w-6 text-pink-400" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Create Store Account</h1>
                <p className="text-gray-400 text-sm">Join the Kluret marketplace and start selling</p>
              </div>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Store Name */}
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Store Name
                  </label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      name="store_name"
                      value={formData.store_name}
                      onChange={handleChange}
                      className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500/50 text-white placeholder-gray-500"
                      placeholder="Enter your store name"
                      required
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500/50 text-white placeholder-gray-500"
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                </div>

                {/* Website URL */}
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Website URL
                  </label>
                  <div className="relative">
                    <Globe className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                    <input
                      type="url"
                      name="website_url"
                      value={formData.website_url}
                      onChange={handleChange}
                      className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500/50 text-white placeholder-gray-500"
                      placeholder="https://your-store.com"
                      required
                    />
                  </div>
                </div>

                {/* Store Type */}
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Store Type
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    {storeTypes.map((type) => (
                      <label
                        key={type.value}
                        className={`relative flex flex-col p-4 cursor-pointer rounded-lg border ${
                          formData.store_type === type.value
                            ? 'border-pink-500 bg-pink-500/10'
                            : 'border-white/10 bg-white/5 hover:bg-white/10'
                        } transition-colors`}
                      >
                        <input
                          type="radio"
                          name="store_type"
                          value={type.value}
                          checked={formData.store_type === type.value}
                          onChange={handleChange}
                          className="sr-only"
                        />
                        <span className="font-medium mb-1">{type.label}</span>
                        <span className="text-xs text-gray-400">{type.description}</span>
                        {formData.store_type === type.value && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute -top-2 -right-2 bg-pink-500 rounded-full p-1"
                          >
                            <Check className="h-3 w-3 text-white" />
                          </motion.div>
                        )}
                      </label>
                    ))}
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500/50 text-white placeholder-gray-500"
                      placeholder="Create a password"
                      required
                    />
                  </div>
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                    <input
                      type="password"
                      name="confirm_password"
                      value={formData.confirm_password}
                      onChange={handleChange}
                      className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500/50 text-white placeholder-gray-500"
                      placeholder="Confirm your password"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-lg font-medium flex items-center justify-center gap-2 hover:from-pink-600 hover:to-purple-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
                >
                  {isSubmitting ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                  ) : (
                    <>
                      Create Store Account
                      <Check className="h-5 w-5" />
                    </>
                  )}
                </motion.button>
              </div>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-400">
                Already have an account?{' '}
                <Link to="/connectstore/login" className="text-pink-400 hover:text-pink-300">
                  Sign in
                </Link>
              </p>
            </div>
          </motion.div>

          <div className="mt-8 text-center text-sm text-gray-400">
            By creating an account, you agree to our{' '}
            <a href="#" className="text-pink-400 hover:text-pink-300">Terms of Service</a>
            {' '}and{' '}
            <a href="#" className="text-pink-400 hover:text-pink-300">Privacy Policy</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;