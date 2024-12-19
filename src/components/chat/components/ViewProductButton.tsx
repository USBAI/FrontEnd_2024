import React from 'react';
import { motion } from 'framer-motion';
import { Eye, ArrowRight } from 'lucide-react';

interface ViewProductButtonProps {
  product: string;
  onViewProduct?: (product: string) => void;
}

export const ViewProductButton: React.FC<ViewProductButtonProps> = ({ product, onViewProduct }) => {
  return (
    <div className="mt-4 relative">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
      <motion.button
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => onViewProduct?.(product)}
        className="w-full relative group/btn bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 hover:from-blue-500/20 hover:via-purple-500/20 hover:to-pink-500/20 backdrop-blur-sm border border-white/10 rounded-xl p-3 transition-all duration-300"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-xl opacity-0 group-hover/btn:opacity-100 blur-xl transition-opacity" />
        
        <div className="relative flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/20 rounded-lg">
              <Eye className="h-4 w-4 text-blue-400" />
            </div>
            <div className="text-left">
              <div className="text-sm font-medium text-white">View Products</div>
              <div className="text-xs text-gray-400">See available options</div>
            </div>
          </div>
          
          <motion.div
            initial={{ x: 0 }}
            animate={{ x: 0 }}
            whileHover={{ x: 3 }}
            className="p-2 rounded-lg bg-white/5 backdrop-blur-sm"
          >
            <ArrowRight className="h-4 w-4 text-blue-400" />
          </motion.div>
        </div>
      </motion.button>
    </div>
  );
};