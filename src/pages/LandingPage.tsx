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
    <div className="bg-gray-900 text-white min-h-screen font-inter">
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent-pink to-accent-purple origin-left z-50"
        style={{ scaleX }}
      />
      <Navbar />
      <main>
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
  );
}

export default LandingPage;