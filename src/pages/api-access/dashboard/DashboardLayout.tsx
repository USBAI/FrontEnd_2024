import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  Code, 
  Settings, 
  LogOut, 
  ChevronLeft,
  ChevronRight,
  Database,
  Activity,
  Key
} from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { icon: LayoutDashboard, label: 'Overview', path: '/accessapi/dashboard' },
    { icon: Database, label: 'API Usage', path: '/accessapi/dashboard/usage' },
    { icon: Activity, label: 'Analytics', path: '/accessapi/dashboard/analytics' },
    { icon: Key, label: 'API Keys', path: '/accessapi/dashboard/keys' },
    { icon: Code, label: 'Documentation', path: '/accessapi/dashboard/docs' },
    { icon: Settings, label: 'Settings', path: '/accessapi/dashboard/settings' },
  ];

  const handleLogout = () => {
    localStorage.removeItem('user_uuid');
    navigate('/accessapi');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-black text-white flex">
      {/* Fixed Sidebar */}
      <motion.div
        initial={false}
        animate={{ width: isCollapsed ? '5rem' : '16rem' }}
        className="fixed top-0 left-0 h-screen bg-white/5 backdrop-blur-xl border-r border-white/10 flex flex-col z-50"
      >
        {/* Logo */}
        <div className="p-4 border-b border-white/10">
          <img
            src="https://www.kluret.se/static/media/kluret_wt.ad13e882d6d5f566612d2b35479039fd.svg"
            alt="Kluret"
            className="h-8"
          />
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 overflow-y-auto custom-scrollbar">
          <div className="space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                  location.pathname === item.path
                    ? 'bg-blue-500/20 text-blue-400'
                    : 'hover:bg-white/10'
                }`}
              >
                <item.icon className="h-5 w-5 flex-shrink-0" />
                {!isCollapsed && <span className="truncate">{item.label}</span>}
              </Link>
            ))}
          </div>
        </nav>

        {/* Bottom Section */}
        <div className="p-4 border-t border-white/10">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2 w-full rounded-lg hover:bg-white/10 transition-colors text-red-400"
          >
            <LogOut className="h-5 w-5 flex-shrink-0" />
            {!isCollapsed && <span className="truncate">Logout</span>}
          </button>
        </div>

        {/* Collapse Button */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute top-1/2 -right-3 p-1 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
        >
          {isCollapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </button>
      </motion.div>

      {/* Main Content - Adjusted margin to account for fixed sidebar */}
      <div 
        className="flex-1 transition-all duration-300"
        style={{ marginLeft: isCollapsed ? '5rem' : '16rem' }}
      >
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;