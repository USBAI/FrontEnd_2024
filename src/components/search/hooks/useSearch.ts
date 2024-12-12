import { useState } from 'react';
import { Product } from '../types';
import { searchProducts } from '../services/searchService';

export const useSearch = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState('1');

  const performSearch = async (query: string, priceRange: { min: number; max: number }) => {
    if (!query.trim()) {
      setProducts([]);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const { products: searchResults, error: searchError } = await searchProducts(
        query,
        currentPage,
        priceRange
      );
      
      if (searchError) {
        setError(searchError);
        setProducts([]);
      } else {
        setProducts(searchResults);
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
      setProducts([]);
    } finally {
      setIsLoading(false);
    }
  };

  const nextPage = () => {
    setCurrentPage(prev => (parseInt(prev) + 1).toString());
  };

  const previousPage = () => {
    setCurrentPage(prev => Math.max(1, parseInt(prev) - 1).toString());
  };

  return {
    products,
    isLoading,
    error,
    performSearch,
    currentPage,
    nextPage,
    previousPage
  };
};