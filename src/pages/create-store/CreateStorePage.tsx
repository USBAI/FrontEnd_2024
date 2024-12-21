import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShoppingBag, ArrowRight, Brain, Rocket, Target, Zap } from 'lucide-react';
import CreateStoreHero from './components/CreateStoreHero';
import AIFeatures from './components/AIFeatures';
import StoreSetupSteps from './components/StoreSetupSteps';
import StoreBenefits from './components/StoreBenefits';

const CreateStorePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-black text-white">
      <CreateStoreHero />
      <AIFeatures />
      <StoreSetupSteps />
      <StoreBenefits />
      
      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-teal-500/10 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Start Your Journey?</h2>
            <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
              Join thousands of successful entrepreneurs who've built their dream stores with Kluret AI
            </p>
            <Link
              to="/create-store/dashboard"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full text-white font-medium hover:from-emerald-600 hover:to-teal-600 transition-all group"
            >
              Create Your Store Now
              <ArrowRight className="h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CreateStorePage;