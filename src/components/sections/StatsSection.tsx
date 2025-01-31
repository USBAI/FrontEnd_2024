import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Users, ShoppingBag, Building2, CreditCard, Globe, Laptop, CloverIcon } from 'lucide-react';
import kluretVideo from './kluret_view.mp4';

const stats = [
  {
    icon: CloverIcon,
    value: 'Free',
    label: 'Kluret Chat',
    description: 'Chat with our AI for products recomandations'
  },
  {
    icon: Laptop,
    value: '600M+',
    label: 'Kluret Network',
    description: 'With over 600 Million products active in our network'
  },
  {
    icon: Globe,
    value: 'Free',
    label: 'Kluret Product Assist',
    description: 'Know more about the product before purchasing'
  },
  {
    icon: CreditCard,
    value: 'Free',
    label: 'Fast Delivery',
    description: 'Kluret makes it fast to get your Product in time'
  }
];

const StatsSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <section className="py-24 bg-gradient-to-br from-blue-50 via-white to-pink-50 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-200/20 rounded-full blur-3xl"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Powering the Future of E-commerce
          </h2>
          <p className="text-xl text-gray-600">
            Leading the revolution in AI-powered product search
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              ref={ref}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.1 }}
              className="relative p-6 bg-white/80 backdrop-blur-sm rounded-2xl border border-blue-100/50 overflow-hidden group hover:border-blue-200/50 transition-colors duration-300 shadow-lg hover:shadow-xl"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-100/30 to-pink-100/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 bg-gradient-to-br from-blue-100 to-pink-100 rounded-lg">
                    <stat.icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={inView ? { scale: 1 } : {}}
                    transition={{ duration: 0.3 }}
                    className="text-2xl font-bold text-gray-900"
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

        <div className="mt-16 w-full">
          <video
            className="w-full h-auto rounded-lg"
            autoPlay
            loop
            muted
            playsInline
          >
            <source src={kluretVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

      </div>
    </section>
  );
};

export default StatsSection;