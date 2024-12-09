import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, ShoppingBag, Users, ArrowUp, ArrowDown, DollarSign, Package, Store } from 'lucide-react';

interface UserInfo {
  company_name: string;
  email: string;
  website_url: string;
  plan: string;
  active: boolean;
}

const DashboardHome = () => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserInfo = async () => {
      const userUuid = localStorage.getItem('user_uuid');
      if (!userUuid) return;

      try {
        const response = await fetch('https://customerserver1-5d81976997ba.herokuapp.com/AccessApi/get_user_info/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ user_uuid: userUuid })
        });

        if (response.ok) {
          const data = await response.json();
          setUserInfo(data.user_info);
        } else {
          throw new Error('Failed to fetch user info');
        }
      } catch (error) {
        setError('Failed to load user information');
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserInfo();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-blue-500 border-t-transparent"></div>
      </div>
    );
  }

  if (!userInfo?.active) {
    return (
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10"
        >
          <div className="text-center mb-8">
            <div className="inline-block p-3 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl mb-4">
              <Store className="h-8 w-8 text-blue-400" />
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

            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Card Number
                </label>
                <input
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-white"
                />
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
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-medium hover:from-blue-600 hover:to-purple-600 transition-all flex items-center justify-center gap-2"
              >
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
    );
  }

  const stats = [
    {
      title: 'Total API Calls',
      value: '1.2M',
      change: '+12.5%',
      isPositive: true,
      icon: BarChart3
    },
    {
      title: 'Active Users',
      value: '8.5K',
      change: '+8.2%',
      isPositive: true,
      icon: Users
    },
    {
      title: 'Success Rate',
      value: '99.9%',
      change: '+0.5%',
      isPositive: true,
      icon: ShoppingBag
    },
    {
      title: 'Response Time',
      value: '85ms',
      change: '-5%',
      isPositive: true,
      icon: Package
    }
  ];

  return (
    <div className="space-y-8">
      {/* Company Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl p-6 text-white"
      >
        <div className="flex items-center gap-4">
          <Store className="h-8 w-8" />
          <div>
            <h2 className="text-2xl font-bold">{userInfo?.company_name}</h2>
            <p className="text-white/80">{userInfo?.website_url}</p>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-blue-500/10 rounded-lg">
                <stat.icon className="h-6 w-6 text-blue-400" />
              </div>
              <span className={`flex items-center gap-1 text-sm ${
                stat.isPositive ? 'text-green-400' : 'text-red-400'
              }`}>
                {stat.isPositive ? (
                  <ArrowUp className="h-4 w-4" />
                ) : (
                  <ArrowDown className="h-4 w-4" />
                )}
                {stat.change}
              </span>
            </div>
            <h3 className="text-gray-400 text-sm">{stat.title}</h3>
            <p className="text-2xl font-bold mt-1">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10"
      >
        <h2 className="text-xl font-bold mb-6">Recent Activity</h2>
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex items-center gap-4 p-4 bg-white/5 rounded-lg">
              <div className="p-2 bg-blue-500/10 rounded-lg">
                <Package className="h-5 w-5 text-blue-400" />
              </div>
              <div>
                <p className="font-medium">API Call to /search endpoint</p>
                <p className="text-sm text-gray-400">2 minutes ago</p>
              </div>
              <span className="ml-auto text-sm text-green-400">200 OK</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default DashboardHome;