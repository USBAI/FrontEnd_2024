import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Key, Copy, Plus, Trash2, AlertCircle } from 'lucide-react';
import DashboardLayout from './DashboardLayout';

const APIKeys = () => {
  const [showNewKeyModal, setShowNewKeyModal] = useState(false);

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-3xl font-bold mb-4">API Keys</h1>
            <p className="text-gray-400">Manage your API access credentials</p>
          </div>
          <button
            onClick={() => setShowNewKeyModal(true)}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2"
          >
            <Plus className="h-5 w-5" />
            Generate New Key
          </button>
        </div>

        {/* Warning Notice */}
        <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-4 mb-8 flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-yellow-500 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-medium text-yellow-500 mb-1">Important Security Notice</h3>
            <p className="text-yellow-500/80 text-sm">
              Keep your API keys secure and never share them publicly. Rotate keys regularly and revoke any compromised keys immediately.
            </p>
          </div>
        </div>

        {/* API Keys List */}
        <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
          <div className="p-6 border-b border-white/10">
            <h2 className="text-xl font-bold">Active API Keys</h2>
          </div>
          <div className="divide-y divide-white/10">
            {[
              { name: 'Production Key', key: '5be3a303-63ff-4adf-81f4-d94276c6a6e7', created: '2024-03-15', lastUsed: '2024-03-15 14:23:45' },
              { name: 'Development Key', key: '7ac4b404-74ff-5bg7-92b5-e85387c7b7f8', created: '2024-03-10', lastUsed: '2024-03-15 13:45:12' }
            ].map((apiKey, index) => (
              <motion.div
                key={apiKey.key}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-6"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-blue-500/10 rounded-lg">
                      <Key className="h-5 w-5 text-blue-400" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">{apiKey.name}</h3>
                      <div className="flex items-center gap-2 mb-2">
                        <code className="text-sm bg-black/30 px-3 py-1 rounded text-blue-400">
                          {apiKey.key}
                        </code>
                        <button className="p-1 hover:bg-white/10 rounded transition-colors">
                          <Copy className="h-4 w-4 text-gray-400" />
                        </button>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-400">
                        <span>Created: {apiKey.created}</span>
                        <span>Last used: {apiKey.lastUsed}</span>
                      </div>
                    </div>
                  </div>
                  <button className="p-2 hover:bg-white/10 rounded transition-colors text-red-400">
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* New Key Modal */}
      {showNewKeyModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gray-800 rounded-xl p-6 max-w-md w-full mx-4"
          >
            <h2 className="text-xl font-bold mb-4">Generate New API Key</h2>
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Key Name
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 bg-black/30 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-white"
                  placeholder="e.g., Production Key"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Expiration
                </label>
                <select className="w-full px-4 py-2 bg-black/30 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-white">
                  <option value="never">Never</option>
                  <option value="30">30 days</option>
                  <option value="90">90 days</option>
                  <option value="180">180 days</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowNewKeyModal(false)}
                className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                Generate Key
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default APIKeys;