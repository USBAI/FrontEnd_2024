import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ShoppingBag, TrendingUp, Users, Award } from 'lucide-react';
import Button from '../ui/Button';

const SuccessStoriesSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const stories = [
    {
      icon: ShoppingBag,
      title: "E-commerce Growth",
      metric: "200%",
      description: "Average increase in conversion rates for our partners",
      color: "from-pink-400 to-pink-600"
    },
    {
      icon: TrendingUp,
      title: "Search Accuracy",
      metric: "99.9%",
      description: "Precision in product matching and recommendations",
      color: "from-purple-400 to-purple-600"
    },
    {
      icon: Users,
      title: "User Satisfaction",
      metric: "98%",
      description: "Customer satisfaction rate across all platforms",
      color: "from-blue-400 to-blue-600"
    },
    {
      icon: Award,
      title: "Industry Recognition",
      metric: "15+",
      description: "Awards for innovation in AI search technology",
      color: "from-indigo-400 to-indigo-600"
    }
  ];

  return (
    <section className="py-24 relative overflow-hidden bg-gradient-to-br from-white to-pink-50">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-pink-200/40 via-purple-100/30 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
            Success Stories
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Transforming e-commerce experiences through AI-powered innovation
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stories.map((story, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-white rounded-2xl shadow-xl transition-all duration-300 group-hover:scale-105" />
              <div className="relative p-8">
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${story.color} flex items-center justify-center mb-6 shadow-lg`}>
                  <story.icon className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">{story.title}</h3>
                <div className="flex items-baseline gap-2 mb-3">
                  <span className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                    {story.metric}
                  </span>
                </div>
                <p className="text-gray-600">{story.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
          className="mt-16 text-center"
        >
          <Button
            variant="primary"
            size="lg"
            className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
          >
            Join Our Success Story
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default SuccessStoriesSection;