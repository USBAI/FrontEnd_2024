import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Store,
  Network,
  ChevronDown,
  Rocket,
  Code,
  Shield,
  ArrowRight,
  Globe,
  Zap,
  BookOpen,
  Users,
  MessageSquare,
  Settings,
  BarChart3,
  Brain,
  ShoppingBag,
  Clock,
  CreditCard
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  expandedItem: number | null;
  setExpandedItem: (index: number | null) => void;
  navigate: (path: string) => void;
}

const navItems = [
  {
    icon: ShoppingBag,
    label: 'Create your online store',
    description: 'Launch your store in minutes with Kluret AI',
    gradient: 'from-emerald-500 to-teal-500',
    path: '/create-store',
    details: [
      {
        icon: Clock,
        title: 'Quick Setup',
        description: 'Get your store running in under 5 minutes'
      },
      {
        icon: CreditCard,
        title: 'Secure Payments',
        description: 'Built-in payment processing with Klarna'
      },
      {
        icon: Brain,
        title: 'AI-Powered',
        description: 'Smart product recommendations and search'
      }
    ]
  },
  {
    icon: Store,
    label: 'Connect your online store',
    description: 'Integrate your e-commerce platform with our AI-powered search',
    gradient: 'from-pink-500 to-purple-500',
    path: '/connectstore',
    details: [
      {
        icon: Rocket,
        title: 'Quick Integration',
        description: 'Set up in minutes with our easy-to-use API'
      },
      {
        icon: Globe,
        title: 'Multi-Platform Support',
        description: 'Works with Shopify, WooCommerce, and more'
      },
      {
        icon: Shield,
        title: 'Secure & Reliable',
        description: 'Enterprise-grade security for your data'
      }
    ]
  },
  {
    icon: Network,
    label: 'B2B API Partner',
    description: 'Access our product data API for enterprise solutions',
    gradient: 'from-blue-500 to-indigo-500',
    path: '/accessapi',
    details: [
      {
        icon: Code,
        title: 'RESTful API',
        description: 'Modern API with comprehensive documentation'
      },
      {
        icon: Zap,
        title: 'High Performance',
        description: 'Process thousands of requests per second'
      },
      {
        icon: Shield,
        title: 'Enterprise Ready',
        description: 'SLA guarantees with 24/7 support'
      }
    ]
  },
  {
    icon: Brain,
    label: 'AI Technology',
    description: 'Learn about our advanced AI search technology',
    gradient: 'from-purple-500 to-indigo-500',
    path: '/technology',
    details: [
      {
        icon: Brain,
        title: 'Neural Networks',
        description: 'Advanced AI models for accurate search'
      },
      {
        icon: Globe,
        title: 'Global Coverage',
        description: 'Support for multiple languages and regions'
      },
      {
        icon: Zap,
        title: 'Real-time Processing',
        description: 'Instant results with sub-100ms latency'
      }
    ]
  },
  {
    icon: Users,
    label: 'Success Stories',
    description: 'See how businesses are growing with Kluret',
    gradient: 'from-green-500 to-emerald-500',
    path: '/success-stories',
    details: [
      {
        icon: BarChart3,
        title: 'Case Studies',
        description: 'Real results from our customers'
      },
      {
        icon: Users,
        title: 'Testimonials',
        description: 'What our clients say about us'
      },
      {
        icon: Rocket,
        title: 'Growth Stories',
        description: 'Business transformation stories'
      }
    ]
  },
  {
    icon: BookOpen,
    label: 'Documentation',
    description: 'Comprehensive guides and API documentation',
    gradient: 'from-orange-500 to-red-500',
    path: '/docs',
    details: [
      {
        icon: Code,
        title: 'API Reference',
        description: 'Detailed API documentation'
      },
      {
        icon: BookOpen,
        title: 'Integration Guides',
        description: 'Step-by-step integration tutorials'
      },
      {
        icon: MessageSquare,
        title: 'Code Examples',
        description: 'Sample code in multiple languages'
      }
    ]
  },
  {
    icon: Settings,
    label: 'Settings & Support',
    description: 'Manage your account and get help',
    gradient: 'from-gray-500 to-slate-500',
    path: '/settings',
    details: [
      {
        icon: Settings,
        title: 'Account Settings',
        description: 'Manage your preferences'
      },
      {
        icon: MessageSquare,
        title: '24/7 Support',
        description: 'Get help when you need it'
      },
      {
        icon: Shield,
        title: 'Security',
        description: 'Control your security settings'
      }
    ]
  }
];

const Sidebar: React.FC<SidebarProps> = ({ isOpen, expandedItem, setExpandedItem, navigate }) => {
  return (
    <div className="flex-1 overflow-y-auto custom-scrollbar">
      <div className="p-6 space-y-4">
        {navItems.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group"
          >
            <div
              onClick={() => setExpandedItem(expandedItem === index ? null : index)}
              className="w-full relative bg-gray-700/50 hover:bg-gray-700/70 p-4 rounded-xl transition-all duration-300 cursor-pointer"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 to-purple-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 blur-xl" />
              <div className="relative">
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-lg bg-gradient-to-r ${item.gradient}`}>
                    <item.icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">{item.label}</h3>
                      <motion.div
                        animate={{ rotate: expandedItem === index ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronDown className="h-5 w-5 text-gray-400" />
                      </motion.div>
                    </div>
                    <p className="text-sm text-gray-400 mt-1">{item.description}</p>
                  </div>
                </div>

                <AnimatePresence>
                  {expandedItem === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="mt-4 space-y-3"
                    >
                      {item.details.map((detail, detailIndex) => (
                        <motion.div
                          key={detailIndex}
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: detailIndex * 0.1 }}
                          className="flex items-start gap-3 bg-gray-800/50 p-3 rounded-lg"
                        >
                          <detail.icon className="h-4 w-4 text-gray-400 mt-0.5" />
                          <div>
                            <h4 className="text-sm font-medium">{detail.title}</h4>
                            <p className="text-xs text-gray-400">{detail.description}</p>
                          </div>
                        </motion.div>
                      ))}

                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(item.path);
                        }}
                        className={`w-full mt-4 px-4 py-3 bg-gradient-to-r ${item.gradient} rounded-lg text-white font-medium flex items-center justify-between group hover:shadow-lg transition-all duration-300`}
                      >
                        <span>Get Started</span>
                        <ArrowRight className="h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
                      </motion.button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;