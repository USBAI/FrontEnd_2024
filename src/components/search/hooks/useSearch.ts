import { useState, useCallback, useRef } from 'react';
import { Product } from '../types';
import { searchProducts } from '../services/searchService';

export const useSearch = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const currentPage = useRef(1);
  const lastQuery = useRef('');
  const lastPriceRange = useRef({ min: 0, max: 0 });

  const performSearch = async (query: string, priceRange: { min: number; max: number }, reset: boolean = true) => {
    if (!query.trim()) {
      setProducts([]);
      return;
    }

    // Reset state if this is a new search
    if (reset) {
      setProducts([]);
      currentPage.current = 1;
      lastQuery.current = query;
      lastPriceRange.current = priceRange;
    }

    setIsLoading(true);
    setError(null);

    try {
      const { products: searchResults, error: searchError } = await searchProducts(
        query,
        currentPage.current.toString(),
        priceRange
      );
      
      if (searchError) {
        setError(searchError);
        setProducts(reset ? [] : products);
      } else {
        setProducts(prev => reset ? searchResults : [...prev, ...searchResults]);
        setHasMore(searchResults.length > 0);
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
      setProducts(reset ? [] : products);
    } finally {
      setIsLoading(false);
    }
  };

  const loadMore = useCallback(async () => {
    if (!isLoading && hasMore) {
      currentPage.current += 1;
      await performSearch(lastQuery.current, lastPriceRange.current, false);
    }
  }, [isLoading, hasMore]);

  return {
    products,
    isLoading,
    error,
    performSearch,
    loadMore,
    hasMore,
    currentPage: currentPage.current
  };
};