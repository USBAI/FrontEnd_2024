import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Search, Filter } from 'lucide-react';

const Orders = () => {
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">Orders</h1>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-xl p-4 mb-8 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search orders..."
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
          />
        </div>
        <button className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2">
          <Filter className="h-5 w-5" />
          Filters
        </button>
      </div>

      {/* Empty State */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl p-8 shadow-sm text-center"
      >
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-50 mb-4">
          <ShoppingCart className="h-8 w-8 text-emerald-500" />
        </div>
        <h2 className="text-xl font-bold mb-4">No Orders Yet</h2>
        <p className="text-gray-600 mb-6 max-w-lg mx-auto">
          Once you start receiving orders, they'll appear here. Our AI will help manage fulfillment automatically.
        </p>
      </motion.div>
    </div>
  );
};

export default Orders;