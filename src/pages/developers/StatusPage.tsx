import React from 'react';
import { motion } from 'framer-motion';
import { Activity, CheckCircle, AlertCircle, Clock, RefreshCw } from 'lucide-react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const StatusPage = () => {
  const services = [
    {
      name: 'API',
      status: 'operational',
      uptime: '99.99%',
      latency: '45ms'
    },
    {
      name: 'Search Engine',
      status: 'operational',
      uptime: '99.95%',
      latency: '85ms'
    },
    {
      name: 'Database',
      status: 'operational',
      uptime: '99.99%',
      latency: '15ms'
    },
    {
      name: 'Authentication',
      status: 'operational',
      uptime: '100%',
      latency: '25ms'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'operational':
        return <CheckCircle className="h-5 w-5 text-green-400" />;
      case 'degraded':
        return <Clock className="h-5 w-5 text-yellow-400" />;
      case 'outage':
        return <AlertCircle className="h-5 w-5 text-red-400" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'operational':
        return 'bg-green-500/20 text-green-400';
      case 'degraded':
        return 'bg-yellow-500/20 text-yellow-400';
      case 'outage':
        return 'bg-red-500/20 text-red-400';
      default:
        return '';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-black text-white">
      <Navbar />
      
      <main className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-block p-3 rounded-2xl bg-blue-500/10 backdrop-blur-sm mb-8"
            >
              <Activity className="h-8 w-8 text-blue-400" />
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-bold mb-6"
            >
              System Status
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-gray-400 max-w-3xl mx-auto"
            >
              Monitor the performance and availability of Kluret services
            </motion.p>
          </div>

          {/* Status Overview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 mb-8"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <span className="text-lg font-medium">All Systems Operational</span>
              </div>
              <button className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
                <RefreshCw className="h-4 w-4" />
                Refresh
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {services.map((service) => (
                <div
                  key={service.name}
                  className="bg-white/5 rounded-lg p-4"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">{service.name}</span>
                    {getStatusIcon(service.status)}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-sm px-2 py-1 rounded-full ${getStatusColor(service.status)}`}>
                      {service.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {services.map((service, index) => (
              <motion.div
                key={service.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10"
              >
                <h3 className="font-medium mb-4">{service.name}</h3>
                <div className="space-y-4">
                  <div>
                    <div className="text-sm text-gray-400 mb-1">Uptime</div>
                    <div className="text-2xl font-bold">{service.uptime}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400 mb-1">Latency</div>
                    <div className="text-2xl font-bold">{service.latency}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Incident History */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10"
          >
            <h2 className="text-xl font-bold mb-6">Recent Incidents</h2>
            <div className="text-center text-gray-400 py-8">
              No incidents reported in the last 90 days
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default StatusPage;