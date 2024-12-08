import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Search, Users, ShoppingBag, Globe2, Zap, Shield, Building, Clock } from 'lucide-react';

const stats = [
  {
    icon: Search,
    value: '10M+',
    label: 'Products Indexed',
    description: 'Across Swedish retailers'
  },
  {
    icon: Users,
    value: '50K+',
    label: 'Active Users',
    description: 'Growing community'
  },
  {
    icon: ShoppingBag,
    value: '99%',
    label: 'Accuracy Rate',
    description: 'In product matching'
  },
  {
    icon: Building,
    value: '100+',
    label: 'Retailers',
    description: 'Connected platforms'
  },
  {
    icon: Clock,
    value: '0.1s',
    label: 'Response Time',
    description: 'Lightning-fast results'
  },
  {
    icon: Shield,
    value: '100%',
    label: 'Secure',
    description: 'Data protection'
  },
  {
    icon: Globe2,
    value: '24/7',
    label: 'Availability',
    description: 'Always online'
  },
  {
    icon: Zap,
    value: '1M+',
    label: 'Searches/Day',
    description: 'Daily operations'
  }
];

const StatsSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <section className="py-24 bg-gray-900 relative overflow-hidden">
      {/* Animated Globe Background */}
      <div className="absolute inset-0 flex items-center justify-center opacity-10">
        <motion.div
          animate={{
            rotate: 360
          }}
          transition={{
            duration: 200,
            repeat: Infinity,
            ease: "linear"
          }}
          className="w-[800px] h-[800px] rounded-full border border-blue-500/20"
        >
          <motion.div
            animate={{
              rotate: -360
            }}
            transition={{
              duration: 100,
              repeat: Infinity,
              ease: "linear"
            }}
            className="w-full h-full rounded-full border border-purple-500/20"
          />
        </motion.div>
        {/* Connection Lines */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-400/50 rounded-full"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0, 1, 0],
              x: Math.cos(i * Math.PI / 4) * 300,
              y: Math.sin(i * Math.PI / 4) * 300,
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.25,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Powering the Future of E-commerce
          </h2>
          <p className="text-xl text-gray-400">
            Leading the revolution in AI-powered product search
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              ref={ref}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1 }}
              className="relative p-6 bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 overflow-hidden group hover:border-blue-500/50 transition-colors duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 bg-gray-700/50 rounded-lg">
                    <stat.icon className="h-6 w-6 text-blue-400" />
                  </div>
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={inView ? { scale: 1 } : {}}
                    transition={{ delay: index * 0.1 + 0.2 }}
                    className="text-2xl font-bold text-white"
                  >
                    {stat.value}
                  </motion.span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-1">{stat.label}</h3>
                <p className="text-sm text-gray-400">{stat.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;