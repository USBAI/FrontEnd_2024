import React from 'react';
import { motion } from 'framer-motion';
import { Heart, ShoppingCart } from 'lucide-react';
import { Product } from '../types';
import { calculateMonthlyPayment } from '../utils/priceUtils';
import { useAuth } from '../hooks/useAuth';
import AuthModal from '../../auth/AuthModal';

interface ProductCardProps {
  product: Product;
  isHovered: boolean;
  onHoverStart: () => void;
  onHoverEnd: () => void;
  onClick: () => void;
}

const ProductCard = ({
  product,
  isHovered,
  onHoverStart,
  onHoverEnd,
  onClick
}: ProductCardProps) => {
  const { showAuthModal, setShowAuthModal, checkAuth, handleAuthSuccess } = useAuth();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    checkAuth(() => {
      // Add to cart logic here
      console.log('Adding to cart:', product);
    });
  };

  const handleAddToWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    checkAuth(() => {
      // Add to wishlist logic here
      console.log('Adding to wishlist:', product);
    });
  };

  return (
    <>
      <motion.div
        className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 relative group cursor-pointer"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        onHoverStart={onHoverStart}
        onHoverEnd={onHoverEnd}
        onClick={onClick}
      >
        <div className="aspect-square relative overflow-hidden bg-white">
          <motion.img
            src={product.cover_image}
            alt={product.name}
            className="w-full h-full object-contain"
            animate={{ 
              scale: isHovered ? 1.05 : 1
            }}
            transition={{ duration: 0.3 }}
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            className="absolute top-2 right-2 flex gap-2"
          >
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 bg-white rounded-full shadow-lg"
              onClick={handleAddToWishlist}
            >
              <Heart className="h-4 w-4 text-pink-500" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 bg-white rounded-full shadow-lg"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="h-4 w-4 text-pink-500" />
            </motion.button>
          </motion.div>
        </div>
        <div className="p-4 bg-white">
          <h3 className="text-gray-900 text-sm font-medium line-clamp-2 mb-2 h-10">
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
          </div>
        </div>
      </motion.div>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onSuccess={handleAuthSuccess}
      />
    </>
  );
};

export default ProductCard;