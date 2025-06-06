import React from 'react';
import { motion } from 'framer-motion';
import { Filter, Search as SearchIcon, X } from 'lucide-react';

interface SearchHeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  handleSearch: () => void;
  loading: boolean;
  showFilters: boolean;
  setShowFilters: (show: boolean) => void;
  onClose: () => void;
  inputRef?: React.RefObject<HTMLInputElement>;
  searchButtonRef?: React.RefObject<HTMLButtonElement>;
}

const SearchHeader = ({
  searchQuery,
  setSearchQuery,
  handleSearch,
  loading,
  showFilters,
  setShowFilters,
  onClose,
  inputRef,
  searchButtonRef
}: SearchHeaderProps) => {
  return (
    <div className="sticky top-0 z-10 pt-8 pb-4 bg-gradient-to-b from-white via-white to-transparent">
      <div className="max-w-[800px] mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative"
        >
          <input
            ref={inputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            placeholder="Search for products..."
            className="search-engine-ssh94990204992949-38850302"
          />
          <div className="search-functions">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowFilters(!showFilters)}
              className="text-gray-400 hover:text-pink-500 transition-colors"
            >
              <Filter className="h-5 w-5" />
            </motion.button>
            <motion.button
              ref={searchButtonRef}
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
  );
};

export default SearchHeader;