import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Shield, Globe2, MessageSquare } from 'lucide-react';

const WhyKluretSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const benefits = [
    {
      icon: Shield,
      title: 'Secure & Reliable',
      description: 'Your data is protected with enterprise-grade security. We prioritize your privacy and safety.',
      gradient: 'from-pink-500 to-rose-500'
    },
    {
      icon: Globe2,
      title: 'Local & Global',
      description: 'Access products from Swedish retailers while comparing with international options.',
      gradient: 'from-purple-500 to-blue-500'
    },
    {
      icon: MessageSquare,
      title: 'Smart Assistance',
      description: 'Get personalized recommendations and support from our AI assistant.',
      gradient: 'from-blue-500 to-cyan-500'
    },
  ];

  return (
    <section className="py-24 relative overflow-hidden bg-gradient-to-br from-white via-pink-50 to-blue-50">
      {/* Animated Background */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-pink-200/30 to-blue-200/30 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4,
          }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-blue-200/30 to-pink-200/30 rounded-full blur-3xl"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-pink-600 to-blue-600 bg-clip-text text-transparent">
            Why Choose Kluret?
          </h2>
          <p className="text-xl text-gray-600">
            Experience the future of product search
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 * (index + 1) }}
              className="relative group"
            >
              {/* Animated Gradient Background */}
              <div className="absolute inset-0 bg-gradient-to-r from-pink-100 to-blue-100 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-all duration-300" />
              
              {/* Card Content */}
              <div className="relative bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:border-pink-200 transition-all duration-300">
                <div className="mb-6">
                  <div className={`h-14 w-14 rounded-xl bg-gradient-to-r ${benefit.gradient} p-3 shadow-lg`}>
                    <benefit.icon className="h-full w-full text-white" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-4 bg-gradient-to-r from-pink-600 to-blue-600 bg-clip-text text-transparent">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyKluretSection;