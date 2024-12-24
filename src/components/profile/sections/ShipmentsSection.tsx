import React from 'react';
import { motion } from 'framer-motion';
import { Package, Truck, CheckCircle, Clock } from 'lucide-react';

const ShipmentsSection = () => {
  const shipments = [
    {
      id: 1,
      orderNumber: 'ORD-123456',
      date: '2024-03-15',
      status: 'delivered',
      items: ['Wireless Headphones', 'Smart Watch'],
      trackingNumber: 'TRK-789012'
    },
    {
      id: 2,
      orderNumber: 'ORD-123457',
      date: '2024-03-14',
      status: 'in-transit',
      items: ['Laptop Stand', 'Keyboard'],
      trackingNumber: 'TRK-789013'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'in-transit':
        return <Truck className="h-5 w-5 text-blue-500" />;
      default:
        return <Clock className="h-5 w-5 text-yellow-500" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'Delivered';
      case 'in-transit':
        return 'In Transit';
      default:
        return 'Processing';
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <div className="p-3 bg-blue-100 rounded-xl">
          <Package className="h-6 w-6 text-blue-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">My Shipments</h2>
          <p className="text-gray-500">Track your orders and shipments</p>
        </div>
      </div>

      <div className="space-y-4">
        {shipments.map((shipment) => (
          <motion.div
            key={shipment.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-medium text-gray-900">
                  Order #{shipment.orderNumber}
                </h3>
                <p className="text-gray-500">{shipment.date}</p>
              </div>
              <div className="flex items-center gap-2">
                {getStatusIcon(shipment.status)}
                <span className="text-sm font-medium text-gray-700">
                  {getStatusText(shipment.status)}
                </span>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-2">Items</h4>
                <ul className="space-y-2">
                  {shipment.items.map((item, index) => (
                    <li key={index} className="text-gray-700">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-2">
                  Tracking Number
                </h4>
                <p className="text-gray-700 font-mono">{shipment.trackingNumber}</p>
              </div>

              <button className="w-full py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                Track Shipment
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ShipmentsSection;