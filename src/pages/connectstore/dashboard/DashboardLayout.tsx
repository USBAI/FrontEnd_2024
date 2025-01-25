import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { 
  BarChart3, 
  ShoppingBag, 
  Users, 
  Settings,
  LogOut,
  Search,
  Bell,
  Menu,
  Package,
  Store,
  X
} from 'lucide-react';
import NotificationPanel from '../../../components/dashboard/NotificationPanel';

interface StoreInfo {
  store: {
    store_id: string;
    store_name: string;
    email: string;
    website_url: string;
    store_type: string;
  };
}

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [storeInfo, setStoreInfo] = useState<StoreInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    // Close mobile menu when route changes
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    // Close sidebar on mobile by default
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('store_token');
    const storeId = localStorage.getItem('store_id');

    if (!token || !storeId) {
      navigate('/connectstore/login');
      return;
    }

    const fetchStoreInfo = async () => {
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
          setStoreInfo(data);
        } else {
          throw new Error('Failed to fetch store info');
        }
      } catch (error) {
        console.error('Error fetching store info:', error);
        navigate('/connectstore/login');
      } finally {
        setIsLoading(false);
      }
    };

    fetchStoreInfo();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('store_token');
    localStorage.removeItem('store_id');
    navigate('/connectstore/login');
  };

  const navItems = [
    { icon: BarChart3, label: 'Dashboard', path: '/connectstore/dashboard' },
    { icon: ShoppingBag, label: 'Products', path: '/connectstore/dashboard/products' },
    { icon: Package, label: 'Orders', path: '/connectstore/dashboard/orders' },
    { icon: Users, label: 'Customers', path: '/connectstore/dashboard/customers' },
    { icon: Settings, label: 'Settings', path: '/connectstore/dashboard/settings' },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity duration-300 ${
          isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full bg-white shadow-lg transition-all duration-300 z-50 
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} 
          md:translate-x-0 md:z-20
          ${isSidebarOpen ? 'w-64' : 'w-20'}`}
      >
        <div className="p-6">
          <div className="flex items-center gap-3">
            <Store className="h-8 w-8 text-pink-500 flex-shrink-0" />
            {isSidebarOpen && (
              <div className="flex flex-col min-w-0">
                <span className="font-bold text-xl truncate">{storeInfo?.store.store_name}</span>
                <span className="text-xs text-gray-500 truncate">{storeInfo?.store.store_type}</span>
              </div>
            )}
          </div>
        </div>

        <nav className="mt-6">
          <div className="px-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`w-full flex items-center gap-3 p-3 rounded-lg mb-2 transition-colors ${
                  location.pathname === item.path
                    ? 'bg-pink-50 text-pink-500' 
                    : 'hover:bg-gray-50 text-gray-600 hover:text-gray-900'
                }`}
              >
                <item.icon className="h-5 w-5 flex-shrink-0" />
                {isSidebarOpen && <span className="truncate">{item.label}</span>}
              </Link>
            ))}
          </div>
        </nav>

        <div className="absolute bottom-4 left-0 right-0 px-4">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 p-3 rounded-lg text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
          >
            <LogOut className="h-5 w-5 flex-shrink-0" />
            {isSidebarOpen && <span className="truncate">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className={`transition-all duration-300 ${isSidebarOpen ? 'md:ml-64' : 'md:ml-20'}`}>
        {/* Header */}
        <header className="bg-white shadow-sm sticky top-0 z-30">
          <div className="flex items-center justify-between px-4 py-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors md:hidden"
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6 text-gray-600" />
                ) : (
                  <Menu className="h-6 w-6 text-gray-600" />
                )}
              </button>
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors hidden md:block"
              >
                <Menu className="h-6 w-6 text-gray-600" />
              </button>
            </div>

            <div className="flex items-center gap-4">
              <div className="relative hidden sm:block">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-64 pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-500/50"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>

              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <Bell className="h-6 w-6 text-gray-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-pink-500 rounded-full"></span>
              </button>

              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-pink-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-pink-600 font-medium">
                    {storeInfo?.store.store_name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="hidden lg:flex flex-col min-w-0">
                  <span className="text-sm font-medium truncate">{storeInfo?.store.email}</span>
                  <a 
                    href={storeInfo?.store.website_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-xs text-gray-500 hover:text-pink-500 truncate"
                  >
                    {storeInfo?.store.website_url}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Notification Panel */}
        <NotificationPanel 
          isOpen={showNotifications} 
          onClose={() => setShowNotifications(false)} 
        />

        {/* Content */}
        <main className="p-4 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;