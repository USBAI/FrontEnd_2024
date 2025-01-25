import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, MoreVertical, Download, FileText, Table, Plus, Trash2, Edit } from 'lucide-react';
import { exportToPDF, exportToExcel } from '../../../utils/exportUtils';

interface Customer {
  index: number;
  email: string;
  name: string;
  phone: string;
  location: string;
  lastOrder: string;
  orders: string;
  totalSpent: string;
}

const Customers = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [showAddCustomer, setShowAddCustomer] = useState(false);
  const [newCustomer, setNewCustomer] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    lastOrder: '',
    orders: '',
    totalSpent: ''
  });
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('store_token');
    const storeId = localStorage.getItem('store_id');

    if (!token || !storeId) return;

    const fetchCustomers = async () => {
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
          if (data.store.Customers) {
            setCustomers(data.store.Customers);
          }
        }
      } catch (error) {
        console.error('Error fetching customers:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  const handleAddCustomer = async () => {
    const token = localStorage.getItem('store_token');
    const storeId = localStorage.getItem('store_id');

    if (!token || !storeId) return;

    try {
      const response = await fetch('https://customerserver-ec7f53c083c0.herokuapp.com/ConnectStoreServer/save_customer/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          store_id: storeId,
          ...newCustomer
        })
      });

      if (response.ok) {
        setCustomers(prev => [...prev, { ...newCustomer, index: prev.length + 1 }]);
        setShowAddCustomer(false);
        setNewCustomer({
          name: '',
          email: '',
          phone: '',
          location: '',
          lastOrder: '',
          orders: '',
          totalSpent: ''
        });
      }
    } catch (error) {
      console.error('Error adding customer:', error);
    }
  };

  const handleExportPDF = () => {
    exportToPDF(customers);
    setActiveMenu(null);
  };

  const handleExportExcel = () => {
    exportToExcel(customers);
    setActiveMenu(null);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">Customers</h1>
        <div className="flex items-center gap-4">
          <div className="relative">
            <button
              onClick={() => setActiveMenu(activeMenu === 'export' ? null : 'export')}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2"
            >
              <Download className="h-5 w-5" />
              Export
            </button>
            {activeMenu === 'export' && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2">
                <button
                  onClick={handleExportPDF}
                  className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center gap-2"
                >
                  <FileText className="h-4 w-4" />
                  Export as PDF
                </button>
                <button
                  onClick={handleExportExcel}
                  className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center gap-2"
                >
                  <Table className="h-4 w-4" />
                  Export as Excel
                </button>
              </div>
            )}
          </div>
          <button
            onClick={() => setShowAddCustomer(true)}
            className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors flex items-center gap-2"
          >
            <Plus className="h-5 w-5" />
            Add Customer
          </button>
        </div>
      </div>

      {/* Add Customer Modal */}
      {showAddCustomer && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl p-6 w-full max-w-lg"
          >
            <h2 className="text-xl font-bold mb-6">Add New Customer</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  value={newCustomer.name}
                  onChange={(e) => setNewCustomer(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-500/50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={newCustomer.email}
                  onChange={(e) => setNewCustomer(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-500/50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input
                  type="tel"
                  value={newCustomer.phone}
                  onChange={(e) => setNewCustomer(prev => ({ ...prev, phone: e.target.value }))}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-500/50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <input
                  type="text"
                  value={newCustomer.location}
                  onChange={(e) => setNewCustomer(prev => ({ ...prev, location: e.target.value }))}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-500/50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Orders</label>
                <input
                  type="text"
                  value={newCustomer.orders}
                  onChange={(e) => setNewCustomer(prev => ({ ...prev, orders: e.target.value }))}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-500/50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Total Spent</label>
                <input
                  type="text"
                  value={newCustomer.totalSpent}
                  onChange={(e) => setNewCustomer(prev => ({ ...prev, totalSpent: e.target.value }))}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-500/50"
                />
              </div>
            </div>
            <div className="flex justify-end gap-4 mt-6">
              <button
                onClick={() => setShowAddCustomer(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={handleAddCustomer}
                className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors"
              >
                Save Customer
              </button>
            </div>
          </motion.div>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="relative w-96">
              <input
                type="text"
                placeholder="Search customers..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-500/50"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>

            <div className="flex items-center gap-4">
              <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                <Filter className="h-5 w-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left py-4 px-6 font-medium text-gray-500">Customer</th>
                <th className="text-left py-4 px-6 font-medium text-gray-500">Contact</th>
                <th className="text-left py-4 px-6 font-medium text-gray-500">Location</th>
                <th className="text-left py-4 px-6 font-medium text-gray-500">Orders</th>
                <th className="text-left py-4 px-6 font-medium text-gray-500">Total Spent</th>
                <th className="text-left py-4 px-6 font-medium text-gray-500">Last Order</th>
                <th className="text-left py-4 px-6 font-medium text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer) => (
                <motion.tr
                  key={customer.index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="border-b border-gray-100 last:border-0"
                >
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-pink-100 flex items-center justify-center">
                        <span className="text-pink-600 font-medium">
                          {customer.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <div className="font-medium">{customer.name}</div>
                        <div className="text-sm text-gray-500">{customer.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">{customer.phone}</td>
                  <td className="py-4 px-6">{customer.location}</td>
                  <td className="py-4 px-6">{customer.orders}</td>
                  <td className="py-4 px-6">{customer.totalSpent}</td>
                  <td className="py-4 px-6">{customer.lastOrder}</td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <button className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
                        <Edit className="h-4 w-4 text-gray-500" />
                      </button>
                      <button className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
                        <Trash2 className="h-4 w-4 text-gray-500" />
                      </button>
                      <button className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
                        <MoreVertical className="h-4 w-4 text-gray-500" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-6 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">
              Showing {customers.length} customers
            </p>
            <div className="flex items-center gap-2">
              <button className="px-3 py-1 rounded border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 transition-colors">
                Previous
              </button>
              <button className="px-3 py-1 rounded bg-pink-500 text-white text-sm hover:bg-pink-600 transition-colors">
                1
              </button>
              <button className="px-3 py-1 rounded border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 transition-colors">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Customers;