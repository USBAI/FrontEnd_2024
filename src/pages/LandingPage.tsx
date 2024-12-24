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
import AICategoriesSection from '../components/sections/AICategoriesSection';
import AlgorithmSection from '../components/sections/AlgorithmSection';
import GlobalPresenceSection from '../components/sections/GlobalPresenceSection';

function LandingPage() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="relative bg-white text-gray-900 font-inter">
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-pink-500 to-blue-500 origin-left z-50"
        style={{ scaleX }}
      />

      {/* Background Gradient */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-50 via-white to-blue-50 animate-gradient" />
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
          <AICategoriesSection />
          <AlgorithmSection />
          <GlobalPresenceSection />
          <TestimonialsSection />
          <PartnersSection />
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default LandingPage;