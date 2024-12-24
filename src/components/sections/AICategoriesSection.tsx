import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  ShoppingBag, 
  Search, 
  Image, 
  MessageSquare, 
  Sparkles,
  Zap,
  Tag,
  TrendingUp,
  ShoppingCart,
  Heart,
  Box,
  Truck
} from 'lucide-react';

const categories = [
  {
    icon: Search,
    title: 'Natural Language Search',
    description: 'Understand complex search queries in natural language',
    gradient: 'from-pink-500 to-rose-500'
  },
  {
    icon: Image,
    title: 'Visual Search',
    description: 'Find products using images and visual references',
    gradient: 'from-rose-500 to-orange-500'
  },
  {
    icon: MessageSquare,
    title: 'Conversational Shopping',
    description: 'Interactive chat-based product discovery',
    gradient: 'from-orange-500 to-amber-500'
  },
  {
    icon: Tag,
    title: 'Price Analysis',
    description: 'Real-time price comparison and tracking',
    gradient: 'from-amber-500 to-yellow-500'
  },
  {
    icon: TrendingUp,
    title: 'Trend Detection',
    description: 'Identify popular products and emerging trends',
    gradient: 'from-yellow-500 to-lime-500'
  },
  {
    icon: Heart,
    title: 'Personalization',
    description: 'Tailored recommendations based on preferences',
    gradient: 'from-lime-500 to-green-500'
  },
  {
    icon: Box,
    title: 'Product Categorization',
    description: 'Automatic product classification and organization',
    gradient: 'from-green-500 to-emerald-500'
  },
  {
    icon: Truck,
    title: 'Delivery Optimization',
    description: 'Smart delivery time and cost estimation',
    gradient: 'from-emerald-500 to-teal-500'
  },
  {
    icon: ShoppingCart,
    title: 'Cart Analysis',
    description: 'Smart shopping cart optimization suggestions',
    gradient: 'from-teal-500 to-cyan-500'
  },
  {
    icon: Sparkles,
    title: 'Style Matching',
    description: 'Find products that match your style preferences',
    gradient: 'from-cyan-500 to-blue-500'
  },
  {
    icon: Zap,
    title: 'Real-time Updates',
    description: 'Instant notifications for price drops and availability',
    gradient: 'from-blue-500 to-indigo-500'
  },
  {
    icon: ShoppingBag,
    title: 'Bundle Suggestions',
    description: 'Smart product bundling recommendations',
    gradient: 'from-indigo-500 to-violet-500'
  }
];

const AICategoriesSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

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
            AI-Powered Categories
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover the wide range of shopping experiences enhanced by our AI technology
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 * index }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-pink-100 to-blue-100 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-all duration-300" />
              <div className="relative bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:border-pink-200 transition-all duration-300 h-full">
                <div className={`h-12 w-12 rounded-xl bg-gradient-to-r ${category.gradient} p-2.5 shadow-lg mb-4`}>
                  <category.icon className="h-full w-full text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-2 bg-gradient-to-r from-pink-600 to-blue-600 bg-clip-text text-transparent">
                  {category.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {category.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AICategoriesSection;