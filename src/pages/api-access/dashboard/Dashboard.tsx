import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Code, Database, Users, BarChart3, ArrowRight, CreditCard, CheckCircle, Lock } from 'lucide-react';
import DashboardLayout from './DashboardLayout';

interface UserInfo {
  company_name: string;
  email: string;
  website_url: string;
  plan: string;
  active: boolean;
}

const Dashboard = () => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [showPaymentForm, setShowPaymentForm] = useState(false);

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
          setShowPaymentForm(!data.user_info.active);
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

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    // Handle payment processing here
    setShowPaymentForm(false);
  };

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-screen">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-blue-500 border-t-transparent"></div>
        </div>
      </DashboardLayout>
    );
  }

  if (showPaymentForm) {
    return (
      <DashboardLayout>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10"
          >
            <div className="text-center mb-8">
              <div className="inline-block p-3 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl mb-4">
                <Lock className="h-8 w-8 text-blue-400" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Complete Your Subscription</h2>
              <p className="text-gray-400">
                Please complete your payment to activate your {userInfo?.plan} plan
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="bg-black/20 rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-4">Plan Details</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Plan</span>
                    <span className="font-medium">{userInfo?.plan}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Price</span>
                    <span className="font-medium">
                      {userInfo?.plan === 'Professional' ? '$600/month' : '$250/month'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Billing</span>
                    <span className="font-medium">Monthly</span>
                  </div>
                </div>
              </div>

              <form onSubmit={handlePayment} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Card Number
                  </label>
                  <div className="relative">
                    <CreditCard className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-white"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      placeholder="MM/YY"
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-white"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      CVC
                    </label>
                    <input
                      type="text"
                      placeholder="123"
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-white"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-medium hover:from-blue-600 hover:to-purple-600 transition-all flex items-center justify-center gap-2"
                >
                  <CheckCircle className="h-5 w-5" />
                  Complete Payment
                </button>
              </form>
            </div>

            <div className="text-center text-sm text-gray-400">
              Your payment is secure and encrypted. By proceeding, you agree to our{' '}
              <a href="#" className="text-blue-400 hover:text-blue-300">Terms of Service</a>.
            </div>
          </motion.div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-3xl font-bold mb-4">API Dashboard</h1>
          <p className="text-gray-400">Monitor your API usage and performance</p>
        </div>

        {error && (
          <div className="mb-8 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400">
            {error}
          </div>
        )}

        {/* Company Info */}
        {userInfo && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10 mb-12"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div>
                <h3 className="text-sm text-gray-400 mb-1">Company</h3>
                <p className="text-lg font-semibold">{userInfo.company_name}</p>
              </div>
              <div>
                <h3 className="text-sm text-gray-400 mb-1">Email</h3>
                <p className="text-lg font-semibold">{userInfo.email}</p>
              </div>
              <div>
                <h3 className="text-sm text-gray-400 mb-1">Website</h3>
                <a 
                  href={userInfo.website_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg font-semibold text-blue-400 hover:text-blue-300"
                >
                  {userInfo.website_url}
                </a>
              </div>
              <div>
                <h3 className="text-sm text-gray-400 mb-1">Plan</h3>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-semibold">{userInfo.plan}</span>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    userInfo.active ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    {userInfo.active ? 'Active' : 'Pending'}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            { icon: Database, label: 'API Calls', value: '1.2M', change: '+12%' },
            { icon: Users, label: 'Active Users', value: '8.5K', change: '+8%' },
            { icon: BarChart3, label: 'Success Rate', value: '99.9%', change: '+0.5%' },
            { icon: Code, label: 'Response Time', value: '85ms', change: '-5%' }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-500/10 rounded-lg">
                  <stat.icon className="h-6 w-6 text-blue-400" />
                </div>
                <div>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="flex items-center gap-1 text-sm">
                    <span className="text-gray-400">{stat.label}</span>
                    <span className={stat.change.startsWith('+') ? 'text-green-400' : 'text-red-400'}>
                      {stat.change}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* API Key Section */}
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 mb-12">
          <h2 className="text-xl font-bold mb-4">API Keys</h2>
          <div className="bg-black/30 p-4 rounded-lg mb-4">
            <code className="text-blue-400">5be3a303-63ff-4adf-81f4-d94276c6a6e7</code>
          </div>
          <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
            Generate New Key
          </button>
        </div>

        {/* Documentation Link */}
        <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Start Building?</h2>
          <p className="text-gray-400 mb-6">
            Check out our comprehensive API documentation to get started
          </p>
          <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full text-white font-medium hover:from-blue-600 hover:to-purple-600 transition-all inline-flex items-center gap-2">
            View Documentation
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;