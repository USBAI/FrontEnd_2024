import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Heart, ShoppingCart, Sparkles } from 'lucide-react';
import { fetchAllProductDetails } from './services/productApi';
import ProductDescription from './ProductDescription';
import AiChatPopup from './AiChatPopup';

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

const LoadingPlaceholder = () => (
  <div className="animate-pulse space-y-8">
    <div className="aspect-square bg-gray-200 rounded-lg" />
    <div className="space-y-4">
      <div className="h-8 bg-gray-200 rounded w-3/4" />
      <div className="h-6 bg-gray-200 rounded w-1/2" />
      <div className="space-y-2">
        <div className="h-4 bg-gray-200 rounded w-full" />
        <div className="h-4 bg-gray-200 rounded w-5/6" />
        <div className="h-4 bg-gray-200 rounded w-4/6" />
      </div>
    </div>
  </div>
);

const ProductDetail = ({ product, onClose }: ProductDetailProps) => {
  const [showAiChat, setShowAiChat] = useState(false);
  const [productImages, setProductImages] = useState<string[]>([product.cover_image]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [productDescription, setProductDescription] = useState('');
  const [productSizes, setProductSizes] = useState<string[]>([]);
  const [selectedSize, setSelectedSize] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  useEffect(() => {
    const loadProductDetails = async () => {
      setIsLoading(true);
      try {
        const details = await fetchAllProductDetails(product);
        if (details.images.length > 0) setProductImages(details.images);
        setProductDescription(details.description);
        setProductSizes(details.sizes);
      } catch (error) {
        console.error('Error fetching product details:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProductDetails();
  }, [product]);

  const handleAddToCart = () => {
    setIsAddingToCart(true);
    setTimeout(() => {
      setIsAddingToCart(false);
    }, 1000);
  };

  return (
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
              <div className="absolute inset-0 bg-gradient-to-r from-pink-400/20 to-purple-400/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
              <motion.div
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.1, 1]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "linear"
                }}
                className="relative"
              >
                <Sparkles className="h-6 w-6 text-pink-500" />
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-pink-400 rounded-full"
                    animate={{
                      x: [0, (i + 1) * 10],
                      y: [0, -(i + 1) * 10],
                      opacity: [0, 1, 0],
                      scale: [0, 1, 0],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      delay: i * 0.2,
                    }}
                  />
                ))}
              </motion.div>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <Heart className="h-6 w-6 text-gray-500" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 hover:bg-gray-100 rounded-full"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="h-6 w-6 text-gray-500" />
            </motion.button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {isLoading ? (
          <div className="grid md:grid-cols-2 gap-8">
            <LoadingPlaceholder />
            <LoadingPlaceholder />
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-8">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="relative aspect-square bg-gray-50 rounded-lg overflow-hidden">
                <img
                  src={productImages[currentImageIndex]}
                  alt={product.name}
                  className="w-full h-full object-contain"
                />
              </div>
              {productImages.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {productImages.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`aspect-square rounded-lg overflow-hidden border-2 ${
                        currentImageIndex === index
                          ? 'border-black'
                          : 'border-transparent hover:border-gray-200'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${product.name} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                  {product.name}
                </h1>
                <div className="text-3xl font-bold text-gray-900">
                  {product.price}
                </div>
              </div>

              {productSizes.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold mb-3">Select Size</h3>
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                    {productSizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`py-3 rounded-lg border transition-all ${
                          selectedSize === size
                            ? 'border-black bg-black text-white'
                            : 'border-gray-200 hover:border-black text-gray-900'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAddToCart}
                className="w-full py-3 px-4 bg-black text-white rounded-lg font-medium flex items-center justify-center gap-2"
              >
                {isAddingToCart ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white" />
                ) : (
                  <>
                    <ShoppingCart className="h-5 w-5" />
                    Add to Cart
                  </>
                )}
              </motion.button>

              {productDescription && (
                <ProductDescription description={productDescription} />
              )}
            </div>
          </div>
        )}
      </div>

      <AiChatPopup
        isOpen={showAiChat}
        onClose={() => setShowAiChat(false)}
        productInfo={{
          name: product.name,
          description: productDescription,
        }}
      />
    </motion.div>
  );
};

export default ProductDetail;