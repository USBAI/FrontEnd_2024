import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../ui/Button';

const CTASection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <section className="py-20 bg-gradient-to-b from-black to-blue-900/20 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500/20 via-purple-500/10 to-transparent" />
        <div className="absolute inset-0 backdrop-blur-[100px]" />
      </div>
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 p-8 md:p-12 rounded-2xl border border-white/10 backdrop-blur-sm"
        >
          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
            <div className="bg-gradient-to-r from-pink-500 to-purple-500 p-3 rounded-full">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-6 bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
            Ready to Transform Your Shopping Experience?
          </h2>
          <p className="text-lg md:text-xl text-gray-300 text-center mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied users who have discovered the power of AI-driven product search
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/connectstore">
              <Button
                variant="primary"
                size="lg"
                icon={<ArrowRight className="h-5 w-5" />}
                className="w-full sm:w-auto"
              >
                Connect Your Store
              </Button>
            </Link>
            <Link to="/accessapi">
              <Button
                variant="secondary"
                size="lg"
                className="w-full sm:w-auto"
              >
                Access API
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;