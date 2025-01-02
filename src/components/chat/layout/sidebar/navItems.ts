import {
  ShoppingBag,
  BarChart3,
  BookOpen,
  Shield,
  MessageSquare,
  Home,
  AlertCircle,
  Info,
  Technology,
  User,
  Users,
  Activity,
  LayoutDashboard,
  Settings,
  HelpCircle,
  Mail,
  Phone,
  MapPin,
  Globe,
  Briefcase,
  FileText,
  Calendar,
  Clock,
  CreditCard,
  DollarSign,
  Banknote,
  ShoppingCart,
  Laptop,
  AirVent,
} from 'lucide-react';

export const navItems = [
  {
    icon: Home,
    label: 'Home',
    description: 'Read more about kluret',
    gradient: 'from-pink-400 to-blue-400',
    path: '/',
    details: []
  },
  {
    icon: Laptop,
    label: 'Our Technology',
    description: "Discover the cutting-edge technology powering Kluret's AI search enginet",
    gradient: 'from-blue-400 to-blue-400',
    path: '/technology',
    details: []
  },
  {
    icon: AirVent,
    label: 'AI-Powered',
    description: 'Experience the future of online shopping with our advanced AI search engine',
    gradient: 'from-orange-400 to-pink-600',
    path: '/ai-search',
    details: []
  },
  {
    icon: AlertCircle,
    label: 'Report a Problem',
    description: 'Let us know if you encounter any issues',
    gradient: 'from-yellow-400 to-red-400',
    path: '/report-problem',
    details: []
  },
  {
    icon: Info,
    label: 'About Company',
    description: 'Learn more about us and what we do',
    gradient: 'from-blue-400 to-indigo-400',
    path: '/about-company',
    details: []
  }
];
