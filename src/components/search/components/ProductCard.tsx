import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, ShoppingCart } from 'lucide-react';
import { Product } from '../types';
import { calculateMonthlyPayment } from '../utils/priceUtils';
import { useAuth } from '../hooks/useAuth';
import AuthModal from '../../auth/AuthModal';
import { detectNordicCountry, convertFromSEK } from '../../../utils/currencyUtils';
import './styling.css';

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

  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Extract numeric price from SEK string and convert to user's currency
  const numericPrice = parseFloat(product.price.replace(/[^0-9.]/g, ''));
  const localPrice = userCountry ? convertFromSEK(numericPrice, userCountry) : product.price;

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLoading(true);
    setShowSuccess(false);

    checkAuth(async () => {
      const userId = localStorage.getItem('user_id'); // Fetch user_id from localStorage

      if (!userId) {
        console.error('User ID not found in localStorage');
        setIsLoading(false);
        return;
      }

      const payload = {
        product_color: product.color || '',
        product_description: product.description || '',
        product_id: product.id,
        product_image: product.cover_image,
        product_name: product.name,
        product_price: localPrice,
        product_size: product.size || '',
        product_url: product.url || '',
        user_id: userId
      };

      try {
        const response = await fetch('https://customerserver1-5d81976997ba.herokuapp.com/addcart/add-to-cart/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
        });

        if (!response.ok) {
          throw new Error('Failed to add product to cart');
        }

        const data = await response.json();
        console.log('Product added to cart:', data);
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
      } catch (error) {
        console.error('Error adding product to cart:', error);
      } finally {
        setIsLoading(false);
      }
    });
  };

  const handleAddToWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    checkAuth(() => {
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
          {product.discount && (
            <div className="discounts-div">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="percentage-droped"
              >
                <span className="" style={{ fontSize: '12px', padding: '4px'}}>-{product.discount} OFF</span>
              </motion.button>
            </div>
          )}
        </div>
        <div className="p-4 bg-white">
          <h3 className="text-gray-900 text-sm font-medium line-clamp-2 mb-2 h-10">
            {product.name}
          </h3>
          <div className="flex items-center justify-between">
            <div className='w-full'>
              <div 
                className={`text-lg font-semibold w-full justify-between flex pb-2 max-[800px]:text-[15px] ${product.discount ? 'text-red-500' : 'text-gray-900'}`}
              >
                {localPrice}

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="add-product-to-cart"
                  onClick={handleAddToCart}
                >
                  {isLoading ? (
                    <div className="w-[20px] h-[20px] border-2 border-pink-500 border-t-transparent rounded-full animate-spin"></div>
                    
                  ) : showSuccess ? (
                    <svg width="25px" height="25px" viewBox="0 -0.5 25 25" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#1eff00">
                      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                      <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                      <g id="SVGRepo_iconCarrier">
                        <path d="M5.5 12.5L10.167 17L19.5 8" stroke="#1dad00" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                      </g>
                    </svg>
                  ) : (
                    <ShoppingCart className="h-5 w-5 text-pink-500" />
                  )}
                </motion.button>
              </div>
              <div className="flex items-center gap-1 text-xs text-green-700 justify-between w-full p-2 rounded-[10px] animate-gradient bg-gradient-to-br bg-[length:400%_400%]">
                <span className="text-[14px] font-semibold">{calculateMonthlyPayment(localPrice)} Kr</span>
                <svg width="15" height="20" viewBox="0 0 19 20" fill="none" xmlns="http://www.w3.org/2000/svg">
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
