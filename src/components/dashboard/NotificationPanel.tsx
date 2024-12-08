import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, Package, CreditCard, Users, X, ShoppingBag, Trash2 } from 'lucide-react';

interface NotificationPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Notification {
  id: number;
  type: string;
  title: string;
  message: string;
  time: string;
  icon: React.ElementType;
  color: string;
}

const initialNotifications: Notification[] = [
  {
    id: 1,
    type: 'order',
    title: 'New Order Received',
    message: 'Order #ORD123 has been placed',
    time: '2 minutes ago',
    icon: Package,
    color: 'blue'
  },
  {
    id: 2,
    type: 'payment',
    title: 'Payment Successful',
    message: 'Payment of 1,299 kr received for Order #ORD122',
    time: '15 minutes ago',
    icon: CreditCard,
    color: 'green'
  },
  {
    id: 3,
    type: 'customer',
    title: 'New Customer Registration',
    message: 'John Doe has created an account',
    time: '1 hour ago',
    icon: Users,
    color: 'purple'
  },
  {
    id: 4,
    type: 'stock',
    title: 'Low Stock Alert',
    message: 'Nike Air Max is running low on stock',
    time: '2 hours ago',
    icon: ShoppingBag,
    color: 'red'
  }
];

const NotificationPanel: React.FC<NotificationPanelProps> = ({ isOpen, onClose }) => {
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);

  const handleDelete = (id: number) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/20 z-40"
          />

          {/* Panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="fixed right-4 top-20 w-96 bg-white rounded-xl shadow-xl border border-gray-200 z-50"
          >
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Bell className="h-5 w-5 text-gray-500" />
                  <h2 className="font-semibold">Notifications</h2>
                </div>
                <button
                  onClick={onClose}
                  className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="h-5 w-5 text-gray-500" />
                </button>
              </div>
            </div>

            <div className="divide-y divide-gray-100 max-h-[calc(100vh-200px)] overflow-y-auto">
              <AnimatePresence>
                {notifications.map((notification) => (
                  <motion.div
                    key={notification.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, height: 0 }}
                    className="p-4 hover:bg-gray-50 transition-colors group relative"
                  >
                    <div className="flex gap-4">
                      <div className={`p-2 bg-${notification.color}-100 rounded-lg flex-shrink-0`}>
                        <notification.icon className={`h-5 w-5 text-${notification.color}-500`} />
                      </div>
                      <div className="flex-1 min-w-0 pr-8">
                        <p className="font-medium text-gray-900">{notification.title}</p>
                        <p className="text-sm text-gray-500 mt-0.5">{notification.message}</p>
                        <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
                      </div>
                      <motion.button
                        initial={{ opacity: 0 }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleDelete(notification.id)}
                        className="absolute right-4 top-4 p-1.5 rounded-full hover:bg-red-50 group-hover:opacity-100 opacity-0 transition-opacity"
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {notifications.length === 0 && (
                <div className="p-8 text-center text-gray-500">
                  <p>No notifications</p>
                </div>
              )}
            </div>

            <div className="p-4 border-t border-gray-200">
              <button className="w-full px-4 py-2 text-sm text-center text-blue-600 hover:text-blue-700 font-medium">
                View All Notifications
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default NotificationPanel;