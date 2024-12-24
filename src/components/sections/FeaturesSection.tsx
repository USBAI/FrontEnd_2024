import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Search, ShoppingCart, Zap } from 'lucide-react';

const FeatureCard = ({ icon: Icon, title, description, delay }: {
  icon: React.ElementType;
  title: string;
  description: string;
  delay: number;
}) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.6 }}
      className="relative group"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-pink-100 to-blue-100 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity" />
      <div className="relative bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:border-pink-200 transition-colors">
        <div className="h-12 w-12 rounded-xl bg-gradient-to-r from-pink-500 to-blue-500 flex items-center justify-center mb-6">
          <Icon className="h-6 w-6 text-white" />
        </div>
        <h3 className="text-xl font-semibold mb-4 bg-gradient-to-r from-pink-600 to-blue-600 bg-clip-text text-transparent">
          {title}
        </h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </motion.div>
  );
};

const FeaturesSection = () => {
  const { t } = useTranslation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const features = [
    { icon: Search, title: t('features.items.0.title'), description: t('features.items.0.description') },
    { icon: ShoppingCart, title: t('features.items.1.title'), description: t('features.items.1.description') },
    { icon: Zap, title: t('features.items.2.title'), description: t('features.items.2.description') },
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-white via-pink-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-pink-600 to-blue-600 bg-clip-text text-transparent">
            {t('features.title')}
          </h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              delay={0.2 * (index + 1)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;