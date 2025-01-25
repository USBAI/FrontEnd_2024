import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Package, Truck, CheckCircle, Clock } from 'lucide-react';

const ShipmentsSection = () => {
  const [shipments, setShipments] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchShipments = async () => {
      const userId = localStorage.getItem('user_id'); // Get user_id from localStorage
      if (!userId) {
        setError('User not authenticated');
        return;
      }

      try {
        const response = await fetch('https://customerserver-ec7f53c083c0.herokuapp.com/addcart/user-orders/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ user_id: userId }),
        });

        if (!response.ok) {
          throw new Error('Failed to fetch shipments');
        }

        const data = await response.json();
        if (data.orders) {
          // Format and deduplicate shipments
          const formattedShipments = data.orders.map((order) => ({
            id: order._id,
            orderNumber: order.StripePaymentID,
            date: new Date(order.order_date).toLocaleDateString(),
            status: 'processing', // Default status since the response doesn't have a status
            items: order.products.map((product) => product.product_name),
            trackingNumber: order.StripePaymentID, // Using StripePaymentID as a placeholder for tracking number
          }));

          // Deduplicate based on trackingNumber (StripePaymentID)
          const uniqueShipments = formattedShipments.filter(
            (shipment, index, self) =>
              index ===
              self.findIndex((s) => s.trackingNumber === shipment.trackingNumber)
          );

          setShipments(uniqueShipments);
        } else {
          setShipments([]);
        }
      } catch (error) {
        console.error('Error fetching shipments:', error);
        setError(error.message);
      }
    };

    fetchShipments();
  }, []);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'delivered':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'in-transit':
        return <Truck className="h-5 w-5 text-blue-500" />;
      default:
        return <Clock className="h-5 w-5 text-yellow-500" />;
    }
  };

  const getStatusText = (status) => {
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
    <div className="max-w-4xl mx-auto p-6">
      {error ? (
        <div className="flex flex-col items-center justify-center gap-2 mb-8">
          <p className="text-center text-red-500">{error}</p>
        </div>
      ) : shipments.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-2 mb-8">
          <Package className="h-6 w-6 text-blue-600" />
          <p className="text-center text-gray-500">Oops! No shipments available</p>
        </div>
      ) : (
        <>
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
                transition={{ duration: 0.5 }}
                className="rounded-xl p-6 shadow-md border border-gray-200 bg-gray-50"
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

                  <button className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                    Track Shipment
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ShipmentsSection;
