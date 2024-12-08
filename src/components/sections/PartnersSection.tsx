import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const PartnersSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const partners = [
    { name: 'Google Gemini', logo: 'https://www.svgrepo.com/show/475656/google-color.svg' },
    { name: 'OpenAI', logo: 'https://www.svgrepo.com/show/306500/openai.svg' },
    { name: 'Etsy', logo: 'https://www.svgrepo.com/show/349358/etsy.svg' },
    { name: 'Stripe', logo: 'https://www.svgrepo.com/show/354401/stripe.svg' },
    { name: 'Klarna', logo: 'https://www.svgrepo.com/show/508697/klarna.svg' },
    { name: 'Alibaba', logo: 'https://www.svgrepo.com/show/448259/alibaba.svg' },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-pink-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Our Partners</h2>
          <p className="text-xl text-gray-600">Working with industry leaders to provide the best service</p>
        </motion.div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {partners.map((partner, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.1 * index }}
              className="flex flex-col items-center relative group"
            >
              {/* Animated Background */}
              <motion.div
                className="absolute inset-0 bg-white/80 backdrop-blur-[2px] rounded-lg"
                animate={{
                  scale: [1, 1.05, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: index * 0.2,
                }}
              />
              
              {/* Glow Effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-200/30 to-pink-200/30 rounded-lg blur-xl"
                animate={{
                  opacity: [0.3, 0.5, 0.3],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />

              <div className="relative h-16 w-16 bg-white/90 backdrop-blur-sm rounded-lg p-3 flex items-center justify-center shadow-lg transition-all duration-300 group-hover:shadow-xl">
                <motion.img
                  src={partner.logo}
                  alt={partner.name}
                  className="h-full w-full object-contain"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 10 }}
                />
              </div>
              <p className="mt-2 text-sm text-gray-600 relative z-10">{partner.name}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;