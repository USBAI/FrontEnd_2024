import React, { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Search as SearchIcon, Filter, Heart, ShoppingCart } from 'lucide-react';
import { LoadingGlobe, IdleGlobe } from './GlobeAnimation';
import ProductDetail from './ProductDetail';
import FilterPanel from './FilterPanel';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Product {
  id: string;
  name: string;
  price: string;
  product_page: string;
  cover_image: string;
  color?: string;
}

const generateUniqueId = () => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

const SearchOverlay = ({ isOpen, onClose }: SearchOverlayProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [minPrice, setMinPrice] = useState(1);
  const [maxPrice, setMaxPrice] = useState(100000);
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const handleSearch = useCallback(async () => {
    if (!searchQuery.trim()) return;
    setLoading(true);
    setProducts([]);

    try {
      const formData = new FormData();
      formData.append('product_name', searchQuery);
      formData.append('page_index', '1');
      formData.append('min_price', minPrice.toString());
      formData.append('max_price', maxPrice.toString());

      const response = await fetch('https://engine1-f36f7fb18f56.herokuapp.com/openai_google_computing/jdb/', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        if (Array.isArray(data) && data.length > 0) {
          const productsList = data.map((product) => ({
            id: generateUniqueId(),
            name: product.name || 'No Name Provided',
            price: product.price || 'No Price Provided',
            product_page: product.product_page_url,
            cover_image: product.cover_image_url || 'placeholder_image_url',
            color: product.color || '',
          }));
          setProducts(productsList);
        }
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  }, [searchQuery, minPrice, maxPrice]);

  const calculateMonthlyPayment = (price: string) => {
    const numericPrice = parseFloat(price.replace(/[^\d.-]/g, ''));
    return isNaN(numericPrice) ? '0 kr/month' : `${Math.round(numericPrice / 6)} kr/month`;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-gradient-to-br from-white via-pink-50 to-white z-50 overflow-hidden"
        >
          <div className="h-full flex flex-col relative">
            {/* Search Header */}
            <div className="sticky top-0 z-10 pt-8">
              <div className="max-w-[500px] mx-auto px-4">
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="relative"
                >
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                    placeholder="Search for products..."
                    className="w-full h-14 px-6 rounded-full text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-200 pr-32"
                  />
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-5">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setShowFilters(!showFilters)}
                      className="text-gray-400 hover:text-pink-500 transition-colors"
                    >
                      <Filter className="h-5 w-5" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleSearch}
                      className="text-gray-400 hover:text-pink-500 transition-colors"
                      animate={loading ? {
                        rotate: 360,
                        scale: [1, 1.2, 1],
                      } : {}}
                      transition={{
                        duration: 1.5,
                        repeat: loading ? Infinity : 0,
                        ease: "linear"
                      }}
                    >
                      <SearchIcon className="h-5 w-5" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={onClose}
                      className="text-gray-400 hover:text-pink-500 transition-colors"
                    >
                      <X className="h-5 w-5" />
                    </motion.button>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Results or Globe Animation */}
            <div ref={listRef} className="flex-1 overflow-y-auto px-4 py-6">
              {loading ? (
                <LoadingGlobe />
              ) : products.length === 0 ? (
                <IdleGlobe />
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {products.map((product) => (
                    <motion.div
                      key={product.id}
                      className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      onHoverStart={() => setHoveredProduct(product.id)}
                      onHoverEnd={() => setHoveredProduct(null)}
                      onClick={() => setSelectedProduct(product)}
                    >
                      <div className="aspect-square relative overflow-hidden">
                        <motion.img
                          src={product.cover_image}
                          alt={product.name}
                          className="w-full h-full object-contain bg-white"
                          animate={{ 
                            scale: hoveredProduct === product.id ? 1.05 : 1
                          }}
                          transition={{ duration: 0.3 }}
                        />
                      </div>
                      <div className="p-4 w-[95%] mx-auto">
                        <h3 className="text-gray-900 text-sm font-medium line-clamp-2 mb-2">
                          {product.name}
                        </h3>
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-lg font-semibold text-gray-900">
                              {product.price}
                            </div>
                            <div className="flex items-center gap-1 text-xs text-gray-500">
                              <img 
                                src="https://www.svgrepo.com/show/508697/klarna.svg" 
                                alt="Klarna" 
                                className="h-3 w-3"
                              />
                              <span>{calculateMonthlyPayment(product.price)}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.95 }}
                              className="text-pink-500 hover:text-pink-600 transition-colors"
                              onClick={(e) => {
                                e.stopPropagation();
                                // Handle wishlist
                              }}
                            >
                              <Heart className="h-5 w-5" />
                            </motion.button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <FilterPanel
            isOpen={showFilters}
            onClose={() => setShowFilters(false)}
            minPrice={minPrice}
            maxPrice={maxPrice}
            setMinPrice={setMinPrice}
            setMaxPrice={setMaxPrice}
            onSave={() => {
              setShowFilters(false);
              handleSearch();
            }}
          />

          <AnimatePresence>
            {selectedProduct && (
              <ProductDetail
                product={selectedProduct}
                onClose={() => setSelectedProduct(null)}
              />
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SearchOverlay;