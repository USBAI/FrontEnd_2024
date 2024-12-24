import {
  ShoppingBag,
  Store,
  Network,
  Brain,
  Users,
  BookOpen,
  Settings,
  Clock,
  CreditCard,
  Rocket,
  Code,
  Shield,
  Globe,
  Zap,
  BarChart3,
  MessageSquare
} from 'lucide-react';

export const navItems = [
  {
    icon: ShoppingBag,
    label: 'Create your online store',
    description: 'Launch your store in minutes with Kluret AI',
    gradient: 'from-pink-400 to-rose-400',
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
    gradient: 'from-purple-400 to-pink-400',
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
    gradient: 'from-blue-400 to-indigo-400',
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
    gradient: 'from-purple-400 to-indigo-400',
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
    gradient: 'from-green-400 to-emerald-400',
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
    gradient: 'from-orange-400 to-red-400',
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
    gradient: 'from-gray-400 to-slate-400',
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