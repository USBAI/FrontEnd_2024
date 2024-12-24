import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Brain, Database, Network, Zap } from 'lucide-react';
import AITrainingStats from './ai-training/AITrainingStats';
import AITrainingVisual from './ai-training/AITrainingVisual';
import AIFeatureCard from './ai-training/AIFeatureCard';

const AITrainingSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const features = [
    {
      icon: Brain,
      title: 'Neural Networks',
      description: 'Advanced deep learning models trained on billions of product data points',
      gradient: 'from-pink-500 to-rose-500'
    },
    {
      icon: Database,
      title: 'Massive Dataset',
      description: 'Trained on over 100 million product listings worldwide',
      gradient: 'from-purple-500 to-blue-500'
    },
    {
      icon: Network,
      title: 'Continuous Learning',
      description: 'Real-time model updates based on user interactions',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Optimized inference delivering results in milliseconds',
      gradient: 'from-cyan-500 to-teal-500'
    }
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
            Trained on Internet-Scale Data
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our AI models are trained on the largest product dataset ever assembled, delivering unmatched accuracy and understanding
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* AI Training Visualization */}
          <AITrainingVisual inView={inView} />

          {/* Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <AIFeatureCard
                key={index}
                feature={feature}
                index={index}
                inView={inView}
              />
            ))}
          </div>
        </div>

        {/* Training Stats */}
        <AITrainingStats inView={inView} />
      </div>
    </section>
  );
};

export default AITrainingSection;