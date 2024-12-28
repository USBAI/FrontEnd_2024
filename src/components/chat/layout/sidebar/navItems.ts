import {
  ShoppingBag,
  BarChart3,
  BookOpen,
  Shield,
  MessageSquare,
  Home,
  AlertCircle,
  Info
} from 'lucide-react';

export const navItems = [
  {
    icon: ShoppingBag,
    label: 'Online Product Categories',
    description: 'Explore a variety of product categories online',
    gradient: 'from-green-400 to-blue-400',
    path: '/product-categories',
    details: []
  },
  {
    icon: Home,
    label: 'Electronics',
    description: 'Browse a wide range of electronics',
    gradient: 'from-gray-400 to-slate-400',
    path: '/product-categories/electronics',
    details: []
  },
  {
    icon: Home,
    label: 'Fashion',
    description: 'Explore the latest trends in fashion',
    gradient: 'from-gray-400 to-slate-400',
    path: '/product-categories/fashion',
    details: []
  },
  {
    icon: Home,
    label: 'Home & Kitchen',
    description: 'Find everything for your home and kitchen',
    gradient: 'from-gray-400 to-slate-400',
    path: '/product-categories/home-kitchen',
    details: []
  },
  {
    icon: Home,
    label: 'Beauty & Personal Care',
    description: 'Shop for beauty and personal care products',
    gradient: 'from-gray-400 to-slate-400',
    path: '/product-categories/beauty',
    details: []
  },
  {
    icon: Home,
    label: 'Books & Stationery',
    description: 'Discover a variety of books and stationery',
    gradient: 'from-gray-400 to-slate-400',
    path: '/product-categories/books-stationery',
    details: []
  },
  {
    icon: Home,
    label: 'Sports & Outdoors',
    description: 'Get the best products for sports and outdoor activities',
    gradient: 'from-gray-400 to-slate-400',
    path: '/product-categories/sports-outdoors',
    details: []
  },
  {
    icon: Home,
    label: 'Toys & Games',
    description: 'Shop for toys and games for all ages',
    gradient: 'from-gray-400 to-slate-400',
    path: '/product-categories/toys-games',
    details: []
  },
  {
    icon: Home,
    label: 'Health & Wellness',
    description: 'Find health and wellness products for a better life',
    gradient: 'from-gray-400 to-slate-400',
    path: '/product-categories/health-wellness',
    details: []
  },
  {
    icon: Home,
    label: 'Automotive',
    description: 'Browse automotive products and accessories',
    gradient: 'from-gray-400 to-slate-400',
    path: '/product-categories/automotive',
    details: []
  },
  {
    icon: Home,
    label: 'Groceries & Food',
    description: 'Order fresh groceries and food items online',
    gradient: 'from-gray-400 to-slate-400',
    path: '/product-categories/groceries-food',
    details: []
  },
  {
    icon: Home,
    label: 'Pet Supplies',
    description: 'Find everything for your pets',
    gradient: 'from-gray-400 to-slate-400',
    path: '/product-categories/pet-supplies',
    details: []
  },
  {
    icon: Home,
    label: 'Furniture',
    description: 'Shop furniture for your home and office',
    gradient: 'from-gray-400 to-slate-400',
    path: '/product-categories/furniture',
    details: []
  },
  {
    icon: Home,
    label: 'Baby & Kids',
    description: 'Discover products for babies and kids',
    gradient: 'from-gray-400 to-slate-400',
    path: '/product-categories/baby-kids',
    details: []
  },
  {
    icon: Home,
    label: 'Jewelry & Watches',
    description: 'Browse beautiful jewelry and watches',
    gradient: 'from-gray-400 to-slate-400',
    path: '/product-categories/jewelry-watches',
    details: []
  },
  {
    icon: Home,
    label: 'Arts & Crafts',
    description: 'Get all your arts and crafts supplies',
    gradient: 'from-gray-400 to-slate-400',
    path: '/product-categories/arts-crafts',
    details: []
  },
  {
    icon: Home,
    label: 'Music & Movies',
    description: 'Explore a wide selection of music and movies',
    gradient: 'from-gray-400 to-slate-400',
    path: '/product-categories/music-movies',
    details: []
  },
  {
    icon: Home,
    label: 'Office Supplies',
    description: 'Find everything for your office',
    gradient: 'from-gray-400 to-slate-400',
    path: '/product-categories/office-supplies',
    details: []
  },
  {
    icon: Home,
    label: 'Software & Technology',
    description: 'Discover the latest software and tech products',
    gradient: 'from-gray-400 to-slate-400',
    path: '/product-categories/software-technology',
    details: []
  },
  {
    icon: Home,
    label: 'Gaming',
    description: 'Explore gaming products and accessories',
    gradient: 'from-gray-400 to-slate-400',
    path: '/product-categories/gaming',
    details: []
  },
  {
    icon: Home,
    label: 'Gifts & Gadgets',
    description: 'Find perfect gifts and gadgets',
    gradient: 'from-gray-400 to-slate-400',
    path: '/product-categories/gifts-gadgets',
    details: []
  },
  {
    icon: Home,
    label: 'Travel & Luggage',
    description: 'Shop for travel essentials and luggage',
    gradient: 'from-gray-400 to-slate-400',
    path: '/product-categories/travel-luggage',
    details: []
  },
  {
    icon: Home,
    label: 'Gardening & Outdoor Living',
    description: 'Shop for gardening and outdoor living products',
    gradient: 'from-gray-400 to-slate-400',
    path: '/product-categories/gardening-outdoor',
    details: []
  },
  {
    icon: Home,
    label: 'Handmade & Vintage Goods',
    description: 'Explore unique handmade and vintage items',
    gradient: 'from-gray-400 to-slate-400',
    path: '/product-categories/handmade-vintage',
    details: []
  },
  {
    icon: Home,
    label: 'Collectibles & Memorabilia',
    description: 'Find rare collectibles and memorabilia',
    gradient: 'from-gray-400 to-slate-400',
    path: '/product-categories/collectibles-memorabilia',
    details: []
  },
  {
    icon: Home,
    label: 'Luxury Goods',
    description: 'Shop for high-end luxury items',
    gradient: 'from-gray-400 to-slate-400',
    path: '/product-categories/luxury-goods',
    details: []
  },
  {
    icon: BarChart3,
    label: 'Discounted Products',
    description: 'Find the best deals and offers on products',
    gradient: 'from-red-400 to-yellow-400',
    path: '/discount-products',
    details: [
      {
        icon: BarChart3,
        title: 'Flash Sales',
        description: 'Limited-time discounts on top products',
        path: '/discount-products/flash-sales'
      },
      {
        icon: Shield,
        title: 'Secure Deals',
        description: 'Enjoy discounts without compromising security',
        path: '/discount-products/secure-deals'
      },
      {
        icon: BookOpen,
        title: 'Exclusive Offers',
        description: 'Special prices available only here',
        path: '/discount-products/exclusive-offers'
      }
    ]
  },
  {
    icon: Home,
    label: 'Home',
    description: 'Return to the main dashboard',
    gradient: 'from-gray-400 to-slate-400',
    path: '/home',
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
