import React from 'react';
import { motion } from 'framer-motion';
import { Package, Plus, Search, Filter } from 'lucide-react';

const Products = () => {
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">Products</h1>
        <button className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors flex items-center gap-2">
          <Plus className="h-5 w-5" />
          Add Product
        </button>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-xl p-4 mb-8 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search products..."
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
          />
        </div>
        <button className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2">
          <Filter className="h-5 w-5" />
          Filters
        </button>
      </div>

      {/* AI Import Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl p-8 shadow-sm text-center mb-8"
      >
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-50 mb-4">
          <Package className="h-8 w-8 text-emerald-500" />
        </div>
        <h2 className="text-xl font-bold mb-4">Import Products with AI</h2>
        <p className="text-gray-600 mb-6 max-w-lg mx-auto">
          Let our AI help you find and import trending products for your store. No inventory needed!
        </p>
        <button className="px-6 py-3 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors">
          Start AI Import
        </button>
      </motion.div>

      {/* Empty State */}
      <div className="bg-white rounded-xl p-8 shadow-sm text-center">
        <p className="text-gray-500">No products yet. Start by importing products with AI.</p>
      </div>
    </div>
  );
};

export default Products;