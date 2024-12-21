import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Globe } from 'lucide-react';
import StoreOverview from '../components/overview/StoreOverview';
import RecentActivity from '../components/overview/RecentActivity';
import QuickActions from '../components/overview/QuickActions';
import AIInsights from '../components/overview/AIInsights';

const Overview = () => {
  return (
    <div className="space-y-6">
      {/* Header with View Store Button */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-blue-500 text-transparent bg-clip-text">
          Dashboard Overview
        </h1>
        <Link
          to="/create-store/dashboard/store"
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-pink-500 to-blue-500 text-white hover:from-pink-600 hover:to-blue-600 transition-all"
        >
          <Globe className="h-4 w-4" />
          <span>View Store</span>
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      {/* Store Overview Stats */}
      <StoreOverview />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity - Left Column */}
        <div className="lg:col-span-2 space-y-6">
          <RecentActivity />
          <QuickActions />
        </div>

        {/* AI Insights - Right Column */}
        <div>
          <AIInsights />
        </div>
      </div>
    </div>
  );
}

export default Overview;