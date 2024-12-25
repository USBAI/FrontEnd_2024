import React from 'react';
import { motion } from 'framer-motion';
import { Heart, ShoppingCart } from 'lucide-react';
import { Product } from '../types';
import { calculateMonthlyPayment } from '../utils/priceUtils';
import { useAuth } from '../hooks/useAuth';
import AuthModal from '../../auth/AuthModal';
import { detectNordicCountry, convertFromSEK } from '../../../utils/currencyUtils';

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
  const userCountry = detectNordicCountry();
  
  // Extract numeric price from SEK string and convert to user's currency
  const numericPrice = parseFloat(product.price.replace(/[^0-9.]/g, ''));
  const localPrice = userCountry ? convertFromSEK(numericPrice, userCountry) : product.price;

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
          <div className="absolute top-2 right-2 flex gap-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="pt-1 pb-1 pl-2 pr-2 bg-white rounded-full shadow-lg flex gap-4"
              onClick={handleAddToWishlist}
            >
              <span className='text-red-400'>-11 %</span>

              <svg className="mt-1" width="20" height="14" viewBox="0 0 23 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6.91563 7.31064L7.64521 6.62673L7.64521 6.62673L6.91563 7.31064ZM15.5757 6.05804L16.2547 5.32391L16.2547 5.32391L15.5757 6.05804ZM22.039 12.9992C22.5908 12.9777 23.0208 12.5129 22.9992 11.961L22.6485 2.96787C22.627 2.416 22.1621 1.98607 21.6103 2.0076C21.0584 2.02912 20.6285 2.49394 20.65 3.04581L20.9618 11.0397L12.9679 11.3515C12.416 11.373 11.9861 11.8379 12.0076 12.3897C12.0291 12.9416 12.4939 13.3715 13.0458 13.35L22.039 12.9992ZM11.3149 6.75309L10.4378 6.27281L10.4378 6.27281L11.3149 6.75309ZM0.270429 1.6839L6.18606 7.99454L7.64521 6.62673L1.72957 0.316095L0.270429 1.6839ZM14.8967 6.79216L21.321 12.7341L22.679 11.2659L16.2547 5.32391L14.8967 6.79216ZM12.192 7.23337C12.7353 6.24128 14.0664 6.02414 14.8967 6.79216L16.2547 5.32391C14.4689 3.67213 11.6061 4.13913 10.4378 6.27281L12.192 7.23337ZM6.18606 7.99454C7.92562 9.85025 10.9704 9.46437 12.192 7.23337L10.4378 6.27281C9.86977 7.31016 8.45404 7.48958 7.64521 6.62673L6.18606 7.99454Z" fill="#FF0000"/>
              </svg>
            </motion.button>
          </div>
        </div>
        <div className="p-4 bg-white">
          <h3 className="text-gray-900 text-sm font-medium line-clamp-2 mb-2 h-10">
            {product.name}
          </h3>
          <div className="flex items-center justify-between">
            <div className='w-full'>
              <div className="text-lg font-semibold text-gray-900 w-full justify-between flex pb-2">
                {localPrice}

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 bg-white rounded-full shadow-lg"
                  onClick={handleAddToCart}
                >
                  <ShoppingCart className="h-4 w-4 text-pink-500" />
                </motion.button>
              </div>
              <div className="flex items-center gap-1 text-xs text-gray-500 justify-between w-full">
                <span>{calculateMonthlyPayment(localPrice)} Kr</span>

                <svg width="19" height="20" viewBox="0 0 19 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16.443 -9.15527e-05H12.0894C12.0894 3.57134 9.89835 6.77134 6.56912 9.05705L5.26019 9.97134V-9.15527e-05H0.73584V19.9999H5.26019V10.0856L12.7439 19.9999H18.2641L11.065 10.5142C14.3374 8.14277 16.4715 4.45705 16.443 -9.15527e-05Z" fill="#0B051D"/>
                </svg>
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