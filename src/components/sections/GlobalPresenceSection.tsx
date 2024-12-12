import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Globe3D from './globe/Globe3D';
import RegionCard from './globe/RegionCard';
import GlobalStats from './globe/GlobalStats';

const GlobalPresenceSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const regions = [
    {
      name: 'North America',
      city: 'New York',
      flag: '🇺🇸',
      description: 'Major market presence with extensive retail partnerships',
      image: 'https://images.unsplash.com/photo-1522083165195-3424ed129620?auto=format&fit=crop&w=800&q=80'
    },
    {
      name: 'Europe',
      city: 'London',
      flag: '🇬🇧',
      description: 'Strong European presence with multi-language support',
      image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=800&q=80'
    },
    {
      name: 'Asia Pacific',
      city: 'Singapore',
      flag: '🇸🇬',
      description: 'Rapidly expanding across Asian markets',
      image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=800&q=80'
    },
    {
      name: 'Middle East',
      city: 'Dubai',
      flag: '🇦🇪',
      description: 'Growing presence in Middle Eastern markets',
      image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80'
    }
  ];

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* 3D Globe Background */}
      <Globe3D />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Global AI Search Network
          </h2>
          <p className="text-xl text-gray-600 mb-12">
            Powering product search worldwide with advanced AI technology
          </p>

          {/* Enhanced Stats Display */}
          <GlobalStats inView={inView} />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {regions.map((region, index) => (
            <RegionCard key={region.name} {...region} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default GlobalPresenceSection;