import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import HeroSection from '../components/sections/HeroSection';
import FeaturesSection from '../components/sections/FeaturesSection';
import WhyKluretSection from '../components/sections/WhyKluretSection';
import HowItWorksSection from '../components/sections/HowItWorksSection';
import StatsSection from '../components/sections/StatsSection';
import TestimonialsSection from '../components/sections/TestimonialsSection';
import PartnersSection from '../components/sections/PartnersSection';
import APISection from '../components/sections/APISection';
import StoreIntegrationSection from '../components/sections/StoreIntegrationSection';
import CTASection from '../components/sections/CTASection';

function LandingPage() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="relative bg-gray-900 text-white font-inter">
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent-pink to-accent-purple origin-left z-50"
        style={{ scaleX }}
      />

      {/* Background Gradient */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-gray-900 to-purple-900/20 animate-gradient" />
        <div className="absolute inset-0 backdrop-blur-[100px]" />
      </div>

      {/* Content */}
      <div className="relative">
        <Navbar />
        <main className="relative z-10">
          <HeroSection />
          <StatsSection />
          <FeaturesSection />
          <HowItWorksSection />
          <WhyKluretSection />
          <TestimonialsSection />
          <PartnersSection />
          <APISection />
          <StoreIntegrationSection />
          <CTASection />
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default LandingPage;