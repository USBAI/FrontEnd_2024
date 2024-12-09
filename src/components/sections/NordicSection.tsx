import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { MapPin, Database, Search, Zap } from 'lucide-react';

const Globe3D = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <motion.div 
        className="relative w-[800px] h-[800px]"
        animate={{ 
          rotate: 360,
        }}
        transition={{ 
          duration: 200,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        {/* Grid Lines */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={`line-${i}`}
            className="absolute inset-0 rounded-full border border-pink-200/10"
            style={{ 
              transform: `rotateX(${i * 15}deg) rotateY(${i * 30}deg)`,
              transformStyle: 'preserve-3d'
            }}
          />
        ))}

        {/* Floating Particles */}
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute w-1 h-1 bg-gradient-to-r from-pink-200 to-white rounded-full shadow-glow"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.2, 0.5, 0.2],
              x: Math.cos(i * Math.PI / 15) * 350,
              y: Math.sin(i * Math.PI / 15) * 350,
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.2
            }}
            style={{
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              boxShadow: '0 0 15px rgba(255, 182, 193, 0.5)'
            }}
          />
        ))}

        {/* Connection Lines */}
        {[...Array(18)].map((_, i) => (
          <motion.div
            key={`connection-${i}`}
            className="absolute w-px h-[400px] origin-bottom"
            style={{
              left: '50%',
              top: '50%',
              transform: `rotate(${i * 20}deg)`,
              background: 'linear-gradient(to top, transparent, rgba(255, 182, 193, 0.3))'
            }}
          />
        ))}
      </motion.div>
    </div>
  );
};

const NordicSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const countries = [
    {
      name: 'Sweden',
      city: 'Stockholm',
      flag: '🇸🇪',
      description: 'Our headquarters and primary market',
      coordinates: { x: 20, y: -30 },
      image: 'https://images.unsplash.com/photo-1509356843151-3e7d96241e11?auto=format&fit=crop&w=800&q=80'
    },
    {
      name: 'Norway',
      city: 'Oslo',
      flag: '🇳🇴',
      description: 'Expanding Nordic presence',
      coordinates: { x: -20, y: -20 },
      image: 'https://images.unsplash.com/photo-1513622118278-bc041b3c13ed?auto=format&fit=crop&w=800&q=80'
    },
    {
      name: 'Denmark',
      city: 'Copenhagen',
      flag: '🇩🇰',
      description: 'Growing market reach',
      coordinates: { x: 0, y: -10 },
      image: 'https://images.unsplash.com/photo-1513622470522-26c3c8a854bc?auto=format&fit=crop&w=800&q=80'
    },
    {
      name: 'Finland',
      city: 'Helsinki',
      flag: '🇫🇮',
      description: 'Strategic expansion',
      coordinates: { x: 40, y: -40 },
      image: 'https://images.unsplash.com/photo-1573108724029-4c46571d6490?auto=format&fit=crop&w=800&q=80'
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
            Operating in the Nordic Countries
          </h2>
          <p className="text-xl text-gray-600 mb-12">
            Bringing AI-powered product search to the Nordic region
          </p>

          {/* Enhanced Stats Display */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl p-8 shadow-xl border border-pink-100/50 max-w-3xl mx-auto backdrop-blur-sm"
          >
            <div className="flex items-center justify-center gap-4 mb-6">
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="p-3 bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-xl"
              >
                <Database className="h-6 w-6 text-pink-500" />
              </motion.div>
              <h3 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 text-transparent bg-clip-text">
                35,000,000+ Products Scanned
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center gap-3">
                <Search className="h-5 w-5 text-pink-500" />
                <span className="text-gray-700">Real-time search</span>
              </div>
              <div className="flex items-center gap-3">
                <Zap className="h-5 w-5 text-pink-500" />
                <span className="text-gray-700">Lightning fast</span>
              </div>
              <div className="flex items-center gap-3">
                <Database className="h-5 w-5 text-pink-500" />
                <span className="text-gray-700">Daily updates</span>
              </div>
            </div>
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {countries.map((country, index) => (
            <motion.div
              key={country.name}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1 }}
              className="relative group h-full flex flex-col"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-pink-100/50 to-purple-100/50 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg border border-pink-100/50 hover:border-pink-200/50 transition-all duration-300 hover:shadow-xl flex flex-col h-full">
                {/* City Image */}
                <div className="relative h-48 overflow-hidden flex-shrink-0">
                  <motion.img
                    src={country.image}
                    alt={`${country.city}, ${country.name}`}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <div className="text-3xl mb-1">{country.flag}</div>
                    <h3 className="text-xl font-bold">{country.name}</h3>
                  </div>
                </div>
                
                {/* Content */}
                <div className="p-6 flex-grow flex flex-col">
                  <div className="flex items-center gap-1 text-sm text-gray-600 mb-3">
                    <MapPin className="h-4 w-4" />
                    {country.city}
                  </div>
                  <p className="text-gray-600 flex-grow">{country.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NordicSection;