import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  ShoppingBag, 
  Users, 
  ArrowUp, 
  ArrowDown, 
  DollarSign, 
  Package, 
  Clock, 
  CheckCircle, 
  XCircle,
  TrendingUp,
  Eye,
  Store
} from 'lucide-react';

interface StoreData {
  store: {
    store_id: string;
    store_name: string;
    email: string;
    website_url: string;
    store_type: string;
    country: string;
    store_email: string;
    city: string;
    phone_number: string;
    postal_code: string;
    store_currency: string;
    street_address: string;
    Customers: Array<{
      index: number;
      email: string;
      name: string;
      phone: string;
      location: string;
      lastOrder: string;
      orders: string;
      totalSpent: string;
    }>;
    Orders: Array<{
      order_id: string;
      customer: string;
      date: string;
      items: string;
      total: string;
      status: string;
      payment: string;
    }>;
  };
}

const DashboardHome = () => {
  const [storeData, setStoreData] = useState<StoreData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchStoreData();
  }, []);

  const fetchStoreData = async () => {
    const token = localStorage.getItem('store_token');
    const storeId = localStorage.getItem('store_id');

    if (!token || !storeId) {
      setError('Authentication required');
      setIsLoading(false);
      return;
    }

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
        setStoreData(data);
      } else {
        const data = await response.json();
        setError(data.message || 'Failed to fetch store data');
      }
    } catch (error) {
      console.error('Error fetching store data:', error);
      setError('Failed to fetch store data. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-pink-500 border-t-transparent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
        {error}
      </div>
    );
  }

  if (!storeData) return null;

  // Calculate total revenue
  const totalRevenue = storeData.store.Orders.reduce((sum, order) => 
    sum + parseFloat(order.total || '0'), 0
  );

  // Calculate total orders
  const totalOrders = storeData.store.Orders.length;

  // Calculate total customers
  const totalCustomers = storeData.store.Customers.length;

  // Calculate average order value
  const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

  const stats = [
    {
      title: 'Total Revenue',
      value: `${totalRevenue.toFixed(2)} ${storeData.store.store_currency}`,
      change: '+12.5%',
      isPositive: true,
      icon: DollarSign,
      color: 'pink'
    },
    {
      title: 'Total Orders',
      value: totalOrders.toString(),
      change: '+8.2%',
      isPositive: true,
      icon: ShoppingBag,
      color: 'blue'
    },
    {
      title: 'Total Customers',
      value: totalCustomers.toString(),
      change: '+15.3%',
      isPositive: true,
      icon: Users,
      color: 'purple'
    },
    {
      title: 'Average Order Value',
      value: `${averageOrderValue.toFixed(2)} ${storeData.store.store_currency}`,
      change: '-2.4%',
      isPositive: false,
      icon: BarChart3,
      color: 'indigo'
    }
  ];

  // Get recent orders
  const recentOrders = storeData.store.Orders.slice(0, 3);

  // Get top customers by total spent
  const topCustomers = [...storeData.store.Customers]
    .sort((a, b) => parseFloat(b.totalSpent) - parseFloat(a.totalSpent))
    .slice(0, 3);

  return (
    <div className="space-y-8">
      {/* Store Overview */}
      <div className="bg-gradient-to-r from-pink-500 to-purple-500 rounded-xl p-6 text-white">
        <div className="flex items-center gap-4 mb-4">
          <Store className="h-8 w-8" />
          <div>
            <h2 className="text-2xl font-bold">{storeData.store.store_name}</h2>
            <p className="text-white/80">{storeData.store.website_url}</p>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <div className="bg-white/10 rounded-lg p-4">
            <p className="text-sm text-white/80">Store Type</p>
            <p className="text-lg font-semibold capitalize">{storeData.store.store_type}</p>
          </div>
          <div className="bg-white/10 rounded-lg p-4">
            <p className="text-sm text-white/80">Location</p>
            <p className="text-lg font-semibold">{storeData.store.city}, {storeData.store.country}</p>
          </div>
          <div className="bg-white/10 rounded-lg p-4">
            <p className="text-sm text-white/80">Currency</p>
            <p className="text-lg font-semibold">{storeData.store.store_currency}</p>
          </div>
          <div className="bg-white/10 rounded-lg p-4">
            <p className="text-sm text-white/80">Contact</p>
            <p className="text-lg font-semibold">{storeData.store.phone_number}</p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl p-6 shadow-sm"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-2 bg-${stat.color}-50 rounded-lg`}>
                <stat.icon className={`h-6 w-6 text-${stat.color}-500`} />
              </div>
              <span className={`flex items-center gap-1 text-sm ${
                stat.isPositive ? 'text-green-500' : 'text-red-500'
              }`}>
                {stat.isPositive ? (
                  <ArrowUp className="h-4 w-4" />
                ) : (
                  <ArrowDown className="h-4 w-4" />
                )}
                {stat.change}
              </span>
            </div>
            <h3 className="text-gray-500 text-sm">{stat.title}</h3>
            <p className="text-2xl font-bold mt-1">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="bg-white rounded-xl shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold">Recent Orders</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div
                  key={order.order_id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-pink-100 flex items-center justify-center">
                      <Package className="h-5 w-5 text-pink-500" />
                    </div>
                    <div>
                      <h3 className="font-medium">{order.customer}</h3>
                      <p className="text-sm text-gray-500">{order.order_id}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{order.total} {storeData.store.store_currency}</p>
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm ${
                      order.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                      order.status === 'Processing' ? 'bg-blue-100 text-blue-700' :
                      'bg-yellow-100 text-yellow-700'
                    }`}>
                      {order.status === 'Delivered' ? <CheckCircle className="h-4 w-4" /> :
                       order.status === 'Processing' ? <Clock className="h-4 w-4" /> :
                       <Package className="h-4 w-4" />}
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top Customers */}
        <div className="bg-white rounded-xl shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold">Top Customers</h2>
          </div>
          <div className="p-6">
            <div className="space-y-6">
              {topCustomers.map((customer, index) => (
                <div key={customer.index} className="flex items-center gap-4">
                  <div className="h-12 w-12 bg-gray-100 rounded-lg flex items-center justify-center">
                    <Users className="h-6 w-6 text-gray-500" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">{customer.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-sm text-gray-500">
                        {customer.orders} orders
                      </span>
                      <span className="text-sm text-gray-300">•</span>
                      <span className="text-sm text-gray-500">
                        {customer.totalSpent} {storeData.store.store_currency}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-green-500">
                    <TrendingUp className="h-4 w-4" />
                    <span className="text-sm font-medium">Top {index + 1}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;