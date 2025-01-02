import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Database, Zap, Brain } from 'lucide-react';

const regions = [
  {
    name: 'Sweden',
    flag: '🇸🇪',
    image: 'https://images.unsplash.com/photo-1509356843151-3e7d96241e11?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Norway',
    flag: '🇳🇴',
    image: 'https://media.istockphoto.com/id/1500420309/sv/foto/perfect-reflection-of-the-reine-village-on-the-water-of-the-fjord-in-the-lofoten-islands-norway.jpg?s=612x612&w=0&k=20&c=ACcofu0FVi1d-6jxFpmnL6QXXQUT0BQlHfZiYM0VtDQ='
  },
  {
    name: 'Denmark',
    flag: '🇩🇰',
    image: 'https://images.unsplash.com/photo-1513622470522-26c3c8a854bc?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Finland',
    flag: '🇫🇮',
    image: 'https://media.istockphoto.com/id/1972453916/sv/foto/evening-view-of-aura-river-in-turku-finland.jpg?s=612x612&w=0&k=20&c=9d2hyipLtWcp64KhsVd9KDhow8d9GWdpq8zxMRN8ZWk='
  }
];

const GlobalPresenceSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <section className="py-24 bg-gradient-to-br from-white via-pink-50 to-blue-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Operating in the Nordic Region
          </h2>
          <p className="text-xl text-gray-600 mb-12">
            Revolutionizing product search across Scandinavia with AI technology
          </p>

          {/* Enhanced Stats Display */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 max-w-3xl mx-auto mb-16"
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
                className="p-3 bg-gradient-to-r from-pink-500/20 to-blue-500/20 rounded-xl"
              >
                <Database className="h-6 w-6 text-pink-500" />
              </motion.div>
              <h3 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-blue-600 text-transparent bg-clip-text">
                600M+ Products Scanned
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center gap-3">
                <Brain className="h-5 w-5 text-pink-500" />
                <span className="text-gray-700">AI-powered search</span>
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
          {regions.map((region, index) => (
            <motion.div
              key={region.name}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-pink-100 to-blue-100 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity" />
              <div className="relative bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 hover:border-pink-200 transition-all duration-300">
                <div className="relative h-48 overflow-hidden">
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
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GlobalPresenceSection;