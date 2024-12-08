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
    <section className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Partners</h2>
          <p className="text-xl text-gray-400">Working with industry leaders to provide the best service</p>
        </motion.div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {partners.map((partner, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.1 * index }}
              className="flex flex-col items-center"
            >
              <div className="h-16 w-16 bg-gray-800/50 rounded-lg p-3 flex items-center justify-center mb-2">
                <img src={partner.logo} alt={partner.name} className="h-full w-full object-contain" />
              </div>
              <p className="text-sm text-gray-400">{partner.name}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;