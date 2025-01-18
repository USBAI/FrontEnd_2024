import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Sparkles } from 'lucide-react';
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
  const [currentProduct, setCurrentProduct] = useState(product);
  const [productImages, setProductImages] = useState<string[]>([product.cover_image]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [productDescription, setProductDescription] = useState('');
  const [productSizes, setProductSizes] = useState<string[]>([]);
  const [selectedSize, setSelectedSize] = useState('');
  const [isLoadingDetails, setIsLoadingDetails] = useState(true);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [suggestedProducts, setSuggestedProducts] = useState<any[]>([]);

  const [showAiChat, setShowAiChat] = useState(false);
  const [showCart, setShowCart] = useState(false);

  const { showAuthModal, setShowAuthModal, checkAuth, handleAuthSuccess } = useAuth();
  const { cartItems, addToCart } = useCart();

  useEffect(() => {
      const loadProductDetails = async () => {
        try {
          setIsLoadingDetails(true); // Start loading state
          setProductImages([currentProduct.cover_image]); // Set initial cover image
          setProductDescription(''); // Clear old description
          setProductSizes([]); // Clear old sizes
    
          // Fetch product details and update state incrementally
          fetchAllProductDetails(currentProduct, (partialDetails) => {
            if (partialDetails.images) setProductImages(partialDetails.images);
            if (partialDetails.description) setProductDescription(partialDetails.description);
            if (partialDetails.sizes) setProductSizes(partialDetails.sizes);
          });
        } catch (error) {
          console.error('Error loading product details:', error);
        } finally {
          setIsLoadingDetails(false); // End loading state
        }
      };
    
      loadProductDetails();
    

    const fetchSuggestedProducts = async () => {
      try {
        const formData = new FormData();
        formData.append('product_name', currentProduct.name);
        formData.append('page_index', '1');
        formData.append('min_price', '0');
        formData.append('max_price', '10000');

        const response = await fetch(
          'https://engine1-f36f7fb18f56.herokuapp.com/openai_google_computing/jdb/',
          {
            method: 'POST',
            body: formData,
            cache: 'no-store',
          }
        );

        const data = await response.json();
        setSuggestedProducts(data || []);
      } catch (error) {
        console.error('Error fetching suggested products:', error);
      }
    };

    loadProductDetails();
    fetchSuggestedProducts();
  }, [currentProduct]);

  const handleAddToCart = () => {
    checkAuth(async () => {
      setIsAddingToCart(true);
      try {
        const success = await addToCart({
          ...currentProduct,
          size: selectedSize,
          description: productDescription,
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

  const calculateKlarnaInstallment = (price: string) => {
    const numericPrice = parseFloat(price.replace(/[^0-9.-]+/g, ''));
    return (numericPrice * 0.36).toFixed(2);
  };

  const handleSuggestedProductClick = (suggestedProduct: any) => {
    setCurrentProduct({
      id: suggestedProduct.product_id,
      name: suggestedProduct.name,
      price: suggestedProduct.price,
      product_page: suggestedProduct.product_page_url,
      cover_image: suggestedProduct.cover_image_url,
    });

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-white z-50 overflow-y-auto"
      >
        <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-sm">
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
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                onClick={() => setShowAiChat(true)}
                className="relative p-2 hover:bg-gray-100 rounded-full group"
              >
                <Sparkles className="h-6 w-6 text-pink-500" />
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
            <ProductImageGallery
              images={productImages}
              currentIndex={currentImageIndex}
              onImageSelect={setCurrentImageIndex}
              productName={currentProduct.name}
            />
            <div className="space-y-6">
              <ProductInfo
                name={currentProduct.name}
                price={currentProduct.price}
                sizes={productSizes}
                selectedSize={selectedSize}
                onSizeSelect={setSelectedSize}
                onAddToCart={handleAddToCart}
                isAddingToCart={isAddingToCart}
                isLoading={isLoadingDetails}
              />
              <ProductDescriptionSection
                description={productDescription}
                isLoading={isLoadingDetails}
              />
            </div>
          </div>

          {/* Suggested Products */}
          <div className="mt-8">
            <div className="flex space-x-4 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 py-4">
              
              {suggestedProducts.map((suggestedProduct) => (
                
                <div
                  key={suggestedProduct.product_id}
                  className="min-w-[140px] max-w-[140px] bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 relative group cursor-pointer"
                  onClick={() => handleSuggestedProductClick(suggestedProduct)}
                >
                  <div className="aspect-square relative overflow-hidden bg-white">
                    <img
                      src={suggestedProduct.cover_image_url}
                      alt={suggestedProduct.name}
                      className="w-full h-full object-contain"
                    />
                    {suggestedProduct.discount_percentage && (
                      <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                        {suggestedProduct.discount_percentage} OFF
                      </div>
                    )}
                  </div>
                  <div className="p-4 bg-white">
                    <h3 className="text-gray-900 text-sm font-medium line-clamp-2 mb-2">
                      {suggestedProduct.name}
                    </h3>
                    <div className="flex flex-col items-start">
                      <span className="text-lg font-semibold text-red-500">
                        {suggestedProduct.price}
                      </span>
                      <span className="text-xs text-green-700">
                        Klarna: SEK {calculateKlarnaInstallment(suggestedProduct.price)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      <AiChatPopup
        isOpen={showAiChat}
        onClose={() => setShowAiChat(false)}
        productInfo={{
          name: currentProduct.name,
          description: productDescription,
        }}
      />

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onSuccess={handleAuthSuccess}
      />

      <CartOverlay isOpen={showCart} onClose={() => setShowCart(false)} />
    </>
  );
};

export default ProductDetail;
