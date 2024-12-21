import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Megaphone,
  Settings,
  Menu,
  X,
  ChevronRight,
  ChevronLeft,
  Store,
  Globe
} from 'lucide-react';

const navItems = [
  { icon: LayoutDashboard, label: 'Overview', path: '/create-store/dashboard' },
  { icon: Store, label: 'My Store', path: '/create-store/dashboard/store' },
  { icon: Package, label: 'Products', path: '/create-store/dashboard/products' },
  { icon: ShoppingCart, label: 'Orders', path: '/create-store/dashboard/orders' },
  { icon: Megaphone, label: 'Marketing', path: '/create-store/dashboard/marketing' },
  { icon: Settings, label: 'Settings', path: '/create-store/dashboard/settings' }
];

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-pink-50 to-blue-50">
      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-30"
          style={{
            background: 'linear-gradient(45deg, #ff69b4, #818cf8, #38bdf8)',
            filter: 'blur(100px)',
            borderRadius: '50%'
          }}
        />
        
        {/* Additional animated elements */}
        <motion.div
          animate={{
            scale: [1.1, 1, 1.1],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full"
          style={{
            background: 'linear-gradient(45deg, #ff69b4, #da62c4)',
            filter: 'blur(80px)',
          }}
        />
        
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full"
          style={{
            background: 'linear-gradient(45deg, #38bdf8, #818cf8)',
            filter: 'blur(80px)',
          }}
        />
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full bg-white/80 backdrop-blur-xl shadow-lg transition-all duration-300 z-50
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0
          ${isSidebarOpen ? 'w-64' : 'w-20'}`}
      >
        {/* Logo */}
        <div className="h-16 border-b border-gray-100/50 flex items-center px-6">
          <div className="flex items-center gap-3">
            <Store className="h-8 w-8 text-pink-500" />
            {isSidebarOpen && (
              <span className="font-semibold bg-gradient-to-r from-pink-500 to-blue-500 text-transparent bg-clip-text">
                Kluret Store
              </span>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg mb-2 transition-all duration-300 ${
                location.pathname === item.path
                  ? 'bg-gradient-to-r from-pink-500/10 to-blue-500/10 text-pink-600'
                  : 'text-gray-600 hover:bg-gray-50/50'
              }`}
            >
              <item.icon className="h-5 w-5 flex-shrink-0" />
              {isSidebarOpen && (
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                >
                  {item.label}
                </motion.span>
              )}
            </Link>
          ))}
        </nav>

        {/* Collapse Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="absolute -right-3 top-1/2 p-1 bg-white rounded-full shadow-lg border border-gray-100 hidden md:block"
        >
          {isSidebarOpen ? (
            <ChevronLeft className="h-4 w-4 text-gray-600" />
          ) : (
            <ChevronRight className="h-4 w-4 text-gray-600" />
          )}
        </motion.button>
      </aside>

      {/* Main Content */}
      <div
        className={`transition-all duration-300 ${
          isSidebarOpen ? 'md:ml-64' : 'md:ml-20'
        }`}
      >
        {/* Header */}
        <header className="h-16 bg-white/80 backdrop-blur-xl border-b border-gray-100/50 px-4 flex items-center justify-between sticky top-0 z-40">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-lg hover:bg-gray-100/50 md:hidden"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6 text-gray-600" />
            ) : (
              <Menu className="h-6 w-6 text-gray-600" />
            )}
          </button>

          <div className="flex items-center gap-4 ml-auto">
            <Link
              to="/create-store/dashboard/store"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-pink-500 to-blue-500 text-white hover:from-pink-600 hover:to-blue-600 transition-all"
            >
              <Globe className="h-4 w-4" />
              <span>View Store</span>
            </Link>
            <motion.div
              className="h-8 w-8 rounded-full bg-gradient-to-r from-pink-500 to-blue-500 flex items-center justify-center text-white cursor-pointer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              K
            </motion.div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6 relative z-10">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;