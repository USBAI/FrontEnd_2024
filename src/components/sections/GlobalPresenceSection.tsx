import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Globe, Database, Users, BarChart3, MapPin } from 'lucide-react';

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
            className="absolute inset-0 rounded-full border border-blue-200/10"
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
            className="absolute w-1 h-1 bg-gradient-to-r from-blue-200 to-white rounded-full shadow-glow"
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
              boxShadow: '0 0 15px rgba(59, 130, 246, 0.5)'
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
              background: 'linear-gradient(to top, transparent, rgba(59, 130, 246, 0.3))'
            }}
          />
        ))}
      </motion.div>
    </div>
  );
};

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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 shadow-xl border border-blue-100/50 max-w-3xl mx-auto backdrop-blur-sm"
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
                className="p-3 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-xl"
              >
                <Globe className="h-6 w-6 text-blue-500" />
              </motion.div>
              <h3 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">
                100+ Countries Served
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center gap-3">
                <Users className="h-5 w-5 text-blue-500" />
                <span className="text-gray-700">Global user base</span>
              </div>
              <div className="flex items-center gap-3">
                <BarChart3 className="h-5 w-5 text-blue-500" />
                <span className="text-gray-700">24/7 availability</span>
              </div>
              <div className="flex items-center gap-3">
                <Database className="h-5 w-5 text-blue-500" />
                <span className="text-gray-700">Worldwide data centers</span>
              </div>
            </div>
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {regions.map((region, index) => (
            <motion.div
              key={region.name}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1 }}
              className="relative group h-full flex flex-col"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-100/50 to-indigo-100/50 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg border border-blue-100/50 hover:border-blue-200/50 transition-all duration-300 hover:shadow-xl flex flex-col h-full">
                {/* Region Image */}
                <div className="relative h-48 overflow-hidden flex-shrink-0">
                  <motion.img
                    src={region.image}
                    alt={region.name}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <div className="text-3xl mb-1">{region.flag}</div>
                    <h3 className="text-xl font-bold">{region.name}</h3>
                  </div>
                </div>
                
                {/* Content */}
                <div className="p-6 flex-grow flex flex-col">
                  <div className="flex items-center gap-1 text-sm text-gray-600 mb-3">
                    <MapPin className="h-4 w-4" />
                    {region.city}
                  </div>
                  <p className="text-gray-600 flex-grow">{region.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GlobalPresenceSection;