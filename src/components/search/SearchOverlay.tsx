import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LoadingGlobe, IdleGlobe } from './GlobeAnimation';
import ProductDetail from './ProductDetail';
import FilterPanel from './FilterPanel';
import SearchHeader from './components/SearchHeader';
import ProductGrid from './components/ProductGrid';
import { Product } from './types';
import { useSearch } from './hooks/useSearch';
import ErrorMessage from './components/ErrorMessage';
import { usePaymentOverlay } from '../../hooks/usePaymentOverlay';
import LoadingIndicator from './components/LoadingIndicator';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  initialSearchQuery?: string;
  shouldTriggerSearch?: boolean;
}

const SearchOverlay: React.FC<SearchOverlayProps> = ({ 
  isOpen, 
  onClose,
  initialSearchQuery = '',
  shouldTriggerSearch = false
}) => {
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [showFilters, setShowFilters] = useState(false);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(10000);
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchButtonRef = useRef<HTMLButtonElement>(null);
  const { state: paymentState } = usePaymentOverlay();

  const { 
    products, 
    isLoading, 
    error, 
    performSearch, 
    loadMore,
    hasMore 
  } = useSearch();

  // Handle infinite scroll
  const observer = useRef<IntersectionObserver>();
  const lastProductRef = useCallback((node: HTMLDivElement) => {
    if (isLoading) return;
    
    if (observer.current) observer.current.disconnect();
    
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        loadMore();
      }
    });
    
    if (node) observer.current.observe(node);
  }, [isLoading, hasMore, loadMore]);

  useEffect(() => {
    if (isOpen && initialSearchQuery) {
      setSearchQuery(initialSearchQuery);
      if (shouldTriggerSearch) {
        setTimeout(() => {
          searchButtonRef.current?.click();
        }, 100);
      }
    }
  }, [isOpen, initialSearchQuery, shouldTriggerSearch]);

  // Cleanup observer on unmount
  useEffect(() => {
    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, []);

  const handleSearch = async () => {
    await performSearch(searchQuery, { min: minPrice, max: maxPrice });
    
    if (listRef.current) {
      listRef.current.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };

  if (paymentState.isOpen) {
    return null;
  }

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
            <SearchHeader
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              handleSearch={handleSearch}
              loading={isLoading}
              showFilters={showFilters}
              setShowFilters={setShowFilters}
              onClose={onClose}
              inputRef={searchInputRef}
              searchButtonRef={searchButtonRef}
            />

            <div ref={listRef} className="flex-1 overflow-y-auto">
              <div className="max-w-[2000px] mx-auto px-4 py-6">
                {error ? (
                  <ErrorMessage message={error} />
                ) : isLoading && products.length === 0 ? (
                  <LoadingGlobe />
                ) : products.length === 0 ? (
                  <IdleGlobe />
                ) : (
                  <>
                    <ProductGrid
                      products={products}
                      hoveredProduct={hoveredProduct}
                      setHoveredProduct={setHoveredProduct}
                      setSelectedProduct={setSelectedProduct}
                      lastProductRef={lastProductRef}
                    />
                    {isLoading && <LoadingIndicator />}
                  </>
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
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SearchOverlay;