import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Search, Users, ShoppingBag, Globe } from 'lucide-react';

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
    icon: Globe,
    value: '100+',
    label: 'Retailers',
    description: 'Connected platforms'
  }
];

const StatsSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              ref={ref}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1 }}
              className="relative p-6 bg-gray-50 rounded-2xl overflow-hidden group hover:shadow-lg transition-shadow duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <stat.icon className="h-8 w-8 text-blue-600" />
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={inView ? { scale: 1 } : {}}
                    transition={{ delay: index * 0.1 + 0.2 }}
                    className="text-3xl font-bold text-gray-900"
                  >
                    {stat.value}
                  </motion.span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{stat.label}</h3>
                <p className="text-sm text-gray-600">{stat.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;