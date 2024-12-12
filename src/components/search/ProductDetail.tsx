import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, Sparkles } from 'lucide-react';
import { fetchAllProductDetails } from './services/productApi';
import AiChatPopup from './AiChatPopup';
import AuthModal from '../auth/AuthModal';
import { useAuth } from './hooks/useAuth';
import { useCart } from './hooks/useCart';
import CartIndicator from './components/CartIndicator';
import CartOverlay from '../cart/CartOverlay';
import ProductImageGallery from './components/ProductImageGallery';
import ProductInfo from './components/ProductInfo';
import ProductDescriptionSection from './components/ProductDescriptionSection';

interface ProductDetailProps {
  product: {
    id: string;
    name: string;
    price: string;
    product_page: string;
    cover_image: string;
    color?: string;
  };
  onClose: () => void;
}

const ProductDetail = ({ product, onClose }: ProductDetailProps) => {
  const [showAiChat, setShowAiChat] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [productImages, setProductImages] = useState<string[]>([product.cover_image]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [productDescription, setProductDescription] = useState('');
  const [productSizes, setProductSizes] = useState<string[]>([]);
  const [selectedSize, setSelectedSize] = useState('');
  const [isLoadingDetails, setIsLoadingDetails] = useState(true);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  
  const { showAuthModal, setShowAuthModal, checkAuth, handleAuthSuccess } = useAuth();
  const { cartItems, addToCart } = useCart();

  useEffect(() => {
    const loadProductDetails = async () => {
      try {
        const details = await fetchAllProductDetails(product);
        if (details.images.length > 0) setProductImages(details.images);
        setProductDescription(details.description);
        setProductSizes(details.sizes);
      } catch (error) {
        console.error('Error fetching product details:', error);
      } finally {
        setIsLoadingDetails(false);
      }
    };

    loadProductDetails();
  }, [product]);

  const handleAddToCart = () => {
    checkAuth(async () => {
      setIsAddingToCart(true);
      try {
        const success = await addToCart({
          ...product,
          size: selectedSize,
          description: productDescription
        });
        if (success) {
          // Optionally show success message
        }
      } catch (error) {
        console.error('Error adding to cart:', error);
      } finally {
        setIsAddingToCart(false);
      }
    });
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-white z-50 overflow-y-auto"
      >
        <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-sm border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <X className="h-6 w-6 text-gray-500" />
            </motion.button>
            <div className="flex items-center gap-4">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowAiChat(true)}
                className="relative p-2 hover:bg-gray-100 rounded-full group"
              >
                <Sparkles className="h-6 w-6 text-pink-500" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <Heart className="h-6 w-6 text-gray-500" />
              </motion.button>
              <CartIndicator
                count={cartItems?.length || 0}
                onClick={() => setShowCart(true)}
              />
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Product Images - Always visible immediately */}
            <ProductImageGallery
              images={productImages}
              currentIndex={currentImageIndex}
              onImageSelect={setCurrentImageIndex}
              productName={product.name}
            />

            {/* Product Info - Shows loading state */}
            <div className="space-y-6">
              <ProductInfo
                name={product.name}
                price={product.price}
                sizes={productSizes}
                selectedSize={selectedSize}
                onSizeSelect={setSelectedSize}
                onAddToCart={handleAddToCart}
                isAddingToCart={isAddingToCart}
                isLoading={isLoadingDetails}
              />

              {/* Product Description - Shows loading state */}
              <ProductDescriptionSection
                description={productDescription}
                isLoading={isLoadingDetails}
              />
            </div>
          </div>
        </div>
      </motion.div>

      <AiChatPopup
        isOpen={showAiChat}
        onClose={() => setShowAiChat(false)}
        productInfo={{
          name: product.name,
          description: productDescription,
        }}
      />

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onSuccess={handleAuthSuccess}
      />

      <CartOverlay
        isOpen={showCart}
        onClose={() => setShowCart(false)}
      />
    </>
  );
};

export default ProductDetail;