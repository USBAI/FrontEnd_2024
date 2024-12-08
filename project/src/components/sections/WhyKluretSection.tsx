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
    },
    {
      icon: Globe2,
      title: 'Local & Global',
      description: 'Access products from Swedish retailers while comparing with international options.',
    },
    {
      icon: MessageSquare,
      title: 'Smart Assistance',
      description: 'Get personalized recommendations and support from our AI assistant.',
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Kluret?</h2>
          <p className="text-xl text-gray-400">Experience the future of product search</p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 * (index + 1) }}
              className="text-center"
            >
              <div className="inline-block p-4 bg-blue-600/10 rounded-full mb-6">
                <benefit.icon className="h-8 w-8 text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{benefit.title}</h3>
              <p className="text-gray-400">{benefit.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyKluretSection;