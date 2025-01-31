import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ChatInput from './ChatInput';
import BotMessage from './components/BotMessage';
import UserMessage from './components/UserMessage';
import SearchOverlay from '../search/SearchOverlay';
import { Message } from './types';


const ProductDetailModal = ({ product, isOpen, onClose }) => {
  const [productImages, setProductImages] = useState([]);
  const [description, setDescription] = useState("");
  const [isDescriptionLoading, setIsDescriptionLoading] = useState(false);
  const [isImagesLoading, setIsImagesLoading] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [addToCartState, setAddToCartState] = useState("idle"); // 'idle', 'loading', 'success'
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const endpoint = isLogin ? 
        'https://customerserver-ec7f53c083c0.herokuapp.com/users/login_authorizer/' :
        'https://customerserver-ec7f53c083c0.herokuapp.com/users/register_user/';

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (data.status === 'success') {
        localStorage.setItem('user_id', data.user_id);
        setShowAuthModal(false);
        handleAddToCart();
      } else {
        setError(data.message || 'Authentication failed');
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchProductDetails = async () => {
      if (!product || !product.product_page_url || !product.name) return;

      setIsImagesLoading(true);
      setIsDescriptionLoading(true);
      setProductImages([product.cover_image_url]);

      const formData = new FormData();
      formData.append("url", product.product_page_url);

      // Fetch images
      fetch(
        "https://engine-b37ec1b1fb4e.herokuapp.com/vision/inteligentvision/",
        {
          method: "POST",
          body: formData,
        }
      ).then(async (imagesResponse) => {
        if (imagesResponse.ok) {
          const imagesData = await imagesResponse.json();
          if (imagesData.images && Array.isArray(imagesData.images)) {
            const uniqueImages = Array.from(
              new Set([product.cover_image_url, ...imagesData.images])
            );
            setProductImages(uniqueImages);
          }
        }
        setIsImagesLoading(false);
      }).catch(error => {
        console.error("Error fetching images:", error);
        setIsImagesLoading(false);
      });

      // Fetch description
      fetch(
        "https://engine-b37ec1b1fb4e.herokuapp.com/nodesconnections/openai_api_nodesconnections/",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            url: product.product_page_url,
            product_name: product.name,
          }),
        }
      ).then(async (descResponse) => {
        if (descResponse.ok) {
          const descData = await descResponse.json();
          setDescription(descData.description);
        }
        setIsDescriptionLoading(false);
      }).catch(error => {
        console.error("Error fetching description:", error);
        setIsDescriptionLoading(false);
      });
    };

    if (isOpen) {
      fetchProductDetails();
    } else {
      setProductImages([]);
      setDescription("");
      setCurrentIndex(0);
      setAddToCartState("idle");
    }
  }, [product, isOpen]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : productImages.length - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < productImages.length - 1 ? prev + 1 : 0));
  };

  const handleThumbnailClick = (index) => {
    setCurrentIndex(index);
  };

  const handleAddToCart = async () => {
    const userId = localStorage.getItem("user_id");
    if (!userId) {
      setShowAuthModal(true);
      return;
    }

    setAddToCartState("loading");

    const payload = {
      user_id: userId,
      product_id: product.product_id,
      product_name: product.name,
      product_price: product.price,
      product_image: product.cover_image_url,
      product_url: product.product_page_url,
      product_description: description,
      product_color: "",
      product_size: "",
    };

    try {
      const response = await fetch(
        "https://customerserver-ec7f53c083c0.herokuapp.com/addcart/add-to-cart/",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (response.ok) {
        setAddToCartState("success");
        localStorage.setItem("request", "true");
        setTimeout(() => setAddToCartState("idle"), 2000);
      } else {
        setAddToCartState("idle");
        console.error("Failed to add product to cart");
      }
    } catch (error) {
      console.error("Error adding product to cart:", error);
      setAddToCartState("idle");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: "10%" }}
          exit={{ y: "100%" }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-0 left-0 right-0 z-50 rounded-t-lg shadow-lg overflow-hidden"
          style={{
            height: "90vh",
            width: "97%",
            margin: "0 auto",
            background: `
              radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.5), transparent 60%),
              radial-gradient(circle at 70% 70%, rgba(173, 216, 230, 0.5), transparent 70%),
              radial-gradient(circle at 50% 50%, rgba(240, 248, 255, 0.7), transparent 60%),
              #f0f8ff`,
            paddingBottom: "env(safe-area-inset-bottom)",
          }}
        >
          <div className="flex justify-between items-center p-4">
            <button
              onClick={() => {
                onClose();
                setProductImages([]);
                setDescription("");
              }}
              className="p-2 rounded-full hover:bg-gray-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div
            className="flex flex-col md:flex-row gap-6 h-full p-4 overflow-y-auto"
            style={{
              maxHeight: "calc(90vh - 50px - env(safe-area-inset-bottom))",
            }}
          >
            {/* Left Section - Main Image Carousel */}
            <div className="flex-1 flex flex-col items-center">
              <div
                className="relative w-full flex items-center justify-center bg-white rounded"
                style={{ height: "40vh" }}
              >
                {isImagesLoading ? (
                  <div className="w-full h-full bg-gray-300 rounded animate-pulse"></div>
                ) : (
                  <>
                    <img
                      src={productImages[currentIndex]}
                      alt={`Product Image ${currentIndex + 1}`}
                      className="w-full h-full object-contain rounded"
                    />
                    <button
                      onClick={handlePrev}
                      className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black text-white p-2 rounded-full"
                    >
                      ❮
                    </button>
                    <button
                      onClick={handleNext}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black text-white p-2 rounded-full"
                    >
                      ❯
                    </button>
                  </>
                )}
              </div>

              {/* Thumbnail Row */}
              <div className="mt-4 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2 justify-center items-center">
                {productImages.map((image, index) => (
                  <div
                    key={index}
                    className={`w-full max-w-[60px] border rounded-[5px] ${
                      index === currentIndex
                        ? "border-pink-500"
                        : "border-gray-300"
                    }`}
                    onClick={() => handleThumbnailClick(index)}
                  >
                    <img
                      src={image}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-12 object-cover rounded-[5px]"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Right Section - Product Information */}
            <div className="flex-1">
              {/* Add to Cart Button */}
              <button
                className={`w-full py-3 px-4 rounded-lg font-medium flex items-center justify-center gap-2 mb-4 ${
                  addToCartState === "success"
                    ? "bg-green-500 text-white"
                    : "bg-black text-white"
                }`}
                tabIndex="0"
                onClick={handleAddToCart}
                disabled={addToCartState === "loading"}
              >
                {addToCartState === "loading" && (
                  <div className="loader w-5 h-5 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                )}
                {addToCartState === "success" && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-check-circle"
                  >
                    <path d="M9 12l2 2 4-4"></path>
                    <circle cx="12" cy="12" r="10"></circle>
                  </svg>
                )}
                {addToCartState === "idle" && (
                  <>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-shopping-cart h-5 w-5"
                    >
                      <circle cx="8" cy="21" r="1"></circle>
                      <circle cx="19" cy="21" r="1"></circle>
                      <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path>
                    </svg>
                    Add to Cart
                  </>
                )}
              </button>

              <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
              <p className="text-lg text-gray-700 mb-2">{product.price}</p>
              <p className="text-md text-gray-500 mb-4">
                Klarna:{" "}
                {Math.round(
                  parseFloat(product.price.replace(/[^0-9.-]+/g, "")) / 24
                )}{" "}
                kr / month
              </p>

              {/* Description Section */}
              {isDescriptionLoading ? (
                <div className="space-y-3">
                  <div className="h-4 bg-gray-300 rounded w-3/4 animate-pulse"></div>
                  <div className="h-4 bg-gray-300 rounded w-5/6 animate-pulse"></div>
                  <div className="h-4 bg-gray-300 rounded w-2/3 animate-pulse"></div>
                  <div className="h-4 bg-gray-300 rounded w-4/5 animate-pulse"></div>
                  <div className="h-4 bg-gray-300 rounded w-3/4 animate-pulse"></div>
                  <div className="h-4 bg-gray-300 rounded w-5/6 animate-pulse"></div>
                  <div className="h-4 bg-gray-300 rounded w-2/3 animate-pulse"></div>
                  <div className="h-4 bg-gray-300 rounded w-4/5 animate-pulse"></div>
                  <div className="h-4 bg-gray-300 rounded w-3/4 animate-pulse"></div>
                  <div className="h-4 bg-gray-300 rounded w-5/6 animate-pulse"></div>
                  <div className="h-4 bg-gray-300 rounded w-2/3 animate-pulse"></div>
                  <div className="h-4 bg-gray-300 rounded w-4/5 animate-pulse"></div>
                  <div className="h-4 bg-gray-300 rounded w-3/4 animate-pulse"></div>
                  <div className="h-4 bg-gray-300 rounded w-5/6 animate-pulse"></div>
                  <div className="h-4 bg-gray-300 rounded w-2/3 animate-pulse"></div>
                  <div className="h-4 bg-gray-300 rounded w-4/5 animate-pulse"></div>
                </div>
              ) : (
                <div>
                  <div
                    className="text-gray-700 p-4 border border-gray-200 rounded shadow-sm bg-white overflow-auto"
                    dangerouslySetInnerHTML={{ __html: description }}
                  ></div>
                  <div>
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div>
              <br />
              <br />
              <br />
              <br />
            </div>
        </motion.div>
      )}

      {showAuthModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white rounded-2xl p-6 w-full max-w-md mx-4 relative"
          >
            <button
              onClick={() => setShowAuthModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {isLogin ? 'Welcome Back' : 'Create Account'}
              </h2>
              <p className="text-gray-500 mt-1">
                {isLogin ? 'Sign in to continue shopping' : 'Join to start shopping'}
              </p>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleAuthSubmit} className="space-y-4">
              {!isLogin && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <div className="relative">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="absolute left-3 top-3 h-5 w-5 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      placeholder="Enter your name"
                      required={!isLogin}
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute left-3 top-3 h-5 w-5 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute left-3 top-3 h-5 w-5 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                  <input
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    placeholder="Enter your password"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-lg font-medium hover:from-pink-600 hover:to-purple-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  isLogin ? 'Sign In' : 'Create Account'
                )}
              </button>
            </form>

            <div className="mt-4 text-center">
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-pink-500 hover:text-pink-600 text-sm"
              >
                {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};











interface ApiResponse {
  response: string;
  additional_data?: {
    product?: string;
    price?: string;
    open?: boolean;
    pricing?: boolean;
  };
  updated_user_history: string;
}

interface Product {
  name: string;
  price: string;
  product_id: string;
  cover_image_url: string;
  product_page_url: string;
}

const TypingIndicator = () => (
  <div className="flex flex-col gap-2 min-h-[20px] p-2 w-full">
    <p className='text-white'>Loading...</p>
    <div className="h-[5px] w-[90%] bg-gradient-to-r from-pink-300 via-gray-300 to-gray-200 rounded-full animate-[pulse_1s_ease-in-out_infinite] opacity-100"></div>
    <div className="h-[5px] w-[75%] bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-full animate-[pulse_1s_ease-in-out_infinite] animation-delay-300 opacity-100"></div>
    <div className="h-[5px] w-[60%] bg-gradient-to-r from-gray-200 via-gray-300 to-blue-200 rounded-full animate-[pulse_1s_ease-in-out_infinite] animation-delay-1000 opacity-100"></div>
  </div>
);

const generateRandomUserId = () => {
  return 'user_' + Math.random().toString(36).substring(2, 15);
};

const ChatWindow = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [userHistory, setUserHistory] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [shouldTriggerSearch, setShouldTriggerSearch] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [productSuggestionsMap, setProductSuggestionsMap] = useState<Record<string, Product[]>>({});
  const [isFetchingProductsMap, setIsFetchingProductsMap] = useState<Record<string, boolean>>({});
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sessionUserId] = useState(generateRandomUserId());

  const openModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const fetchProducts = async (productName: string, requestId: string) => {
    if (isFetchingProductsMap[requestId] || !productName.trim()) return;

    setIsFetchingProductsMap((prev) => ({ ...prev, [requestId]: true }));
    setProductSuggestionsMap((prev) => ({ ...prev, [requestId]: [] }));

    try {
      const formData = new FormData();
      formData.append('product_name', productName);
      formData.append('page_index', '1');
      formData.append('min_price', '0');
      formData.append('max_price', '10000');

      await new Promise((resolve) => setTimeout(resolve, 3000));

      const response = await fetch(
        'https://engine-b37ec1b1fb4e.herokuapp.com/openai_google_computing/jdb/',
        {
          method: 'POST',
          body: formData,
          cache: 'no-store',
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch products: ${response.statusText}`);
      }

      const data = await response.json();

      const validProducts = data
        .filter(
          (product: any) =>
            product.name &&
            product.price &&
            product.cover_image_url &&
            product.product_page_url
        )
        .map((product: any) => ({
          name: product.name,
          price: product.price,
          product_id: product.product_id || Math.random().toString(36).substr(2, 9),
          cover_image_url: product.cover_image_url,
          product_page_url: product.product_page_url,
        }));

      setProductSuggestionsMap((prev) => ({ ...prev, [requestId]: validProducts }));
    } catch (error) {
      console.error('Error fetching product suggestions:', error);
      setProductSuggestionsMap((prev) => ({ ...prev, [requestId]: [] }));
    } finally {
      setIsFetchingProductsMap((prev) => ({ ...prev, [requestId]: false }));
    }
  };

  const handleViewProduct = async (productName: string) => {
    if (!productName.trim()) return;

    const requestId = Date.now().toString();
    setSearchQuery(productName);
    setIsSearchOpen(true);
    setShouldTriggerSearch(true);

    await fetchProducts(productName, requestId);
  };

  const sendMessage = async (text: string, image?: File) => {
    if (!text.trim() && !image) return;

    const messageId = Date.now().toString();
    const userMessage: Message = {
      content: text,
      type: 'user',
      id: messageId,
      image: image ? URL.createObjectURL(image) : undefined,
      status: image ? 'processing' : 'complete',
    };

    setMessages((prev) => [...prev, userMessage]);
    scrollToBottom();
    setIsLoading(true);

    try {
      setIsTyping(true);
      let response;
      if (image) {
        const formData = new FormData();
        formData.append('user_input', text || 'I want to buy this');
        formData.append('user_history', userHistory);
        formData.append('user_id', sessionUserId);
        formData.append('image', image);

        response = await fetch('https://engine-b37ec1b1fb4e.herokuapp.com/imagebase_api_ai/chatbot/', {
          method: 'POST',
          body: formData,
        });
      } else {
        response = await fetch('https://engine-b37ec1b1fb4e.herokuapp.com/textbase_api/chatbot/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            user_input: text,
            user_history: userHistory,
            user_id: sessionUserId,
          }),
        });
      }

      const data: ApiResponse = await response.json();
      setUserHistory(data.updated_user_history);

      if (image) {
        setMessages((prev) =>
          prev.map((msg) => (msg.id === messageId ? { ...msg, status: 'complete' } : msg))
        );
      }

      const botMessage: Message = {
        content: "",
        type: 'bot',
        id: Date.now().toString(),
        status: 'complete',
        isTyping: true,
        additional_data: data.additional_data,
      };

      setMessages((prev) => [...prev, botMessage]);
      scrollToBottom();

      const typingDuration = 10;
      const typingInterval = typingDuration / data.response.length;

      let currentCharIndex = 0;
      const typingIntervalId = setInterval(() => {
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === botMessage.id
              ? {
                  ...msg,
                  content: data.response.slice(0, currentCharIndex + 1),
                  additional_data: data.additional_data,
                }
              : msg
          )
        );

        currentCharIndex += 1;
        if (currentCharIndex >= data.response.length) {
          clearInterval(typingIntervalId);
          setMessages((prev) =>
            prev.map((msg) => (msg.id === botMessage.id ? { ...msg, isTyping: false } : msg))
          );
        }
      }, typingInterval);

      if (data.additional_data?.product && data.additional_data.open) {
        const requestId = Date.now().toString();
        await fetchProducts(data.additional_data.product, requestId);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsTyping(false);
      setIsLoading(false);
    }
  };

  return (
    <div className="relative flex flex-col h-[100svh] h-[100vh] bg-white">
      <div className="h-16 flex-shrink-0" />
      <div className="relative flex-1 min-h-0">
        {messages.length === 0 ? (
          <div className="bg-white p-8 aline-center justify-center flex flex-col h-full">
            <div className="text-center mb-8">
              <h2 className="text-lg font-bold">Discover Kluret AI</h2>
            </div>
            <div className="bullet-point-kluret-a39d">
              <div className="flex flex-col items-center gap-5 md:flex-row md:justify-center w-full max-w-4xl mx-auto px-4">
                <div className="border rounded-lg p-4 shadow w-full md:w-80">
                  <h3 className="font-semibold">AI-Powered Insights</h3>
                  <p className="text-sm text-gray-600">Get tailored recommendations based on your needs.</p>
                  <p className="text-sm text-gray-400">Example: Personalized shopping suggestions just for you.</p>
                </div>
                <div className="border rounded-lg p-4 shadow w-full md:w-80">
                  <h3 className="font-semibold">Efficient Shopping Experience</h3>
                  <p className="text-sm text-gray-600">Quickly find what you're looking for with advanced search tools.</p>
                  <p className="text-sm text-gray-400">Example: Search filters that help narrow down choices.</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div
            ref={chatContainerRef}
            className="absolute pb-[50px] pt-[50px] inset-0 overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent"
            style={{ scrollBehavior: 'smooth' }}
          >
            <div className="relative pb-[50px] pt-[50px] min-h-full flex flex-col justify-end">
              <div className="max-w-4xl w-full mx-auto px-4 py-6">
                <AnimatePresence initial={false}>
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'} mb-4`}
                    >
                      <div className="max-w-[100%]">
                        {message.type === 'bot' ? (
                          <div className="relative">
                            <BotMessage 
                              message={message} 
                              onViewProduct={() => handleViewProduct(message.additional_data?.product || '')}
                            />
                            {message.additional_data?.product && message.additional_data?.open && (
                              <>
                                <button
                                  onClick={() => handleViewProduct(message.additional_data?.product || '')}
                                  className="view-product-engine"
                                  style={{
                                    background: 'linear-gradient(to bottom right, rgb(255, 234, 244), rgb(228, 229, 255), rgb(241, 214, 255))',
                                    color: 'rgb(0, 0, 0)',
                                    padding: '10px 30px',
                                    marginTop: '10px',
                                    borderRadius: '0px 15px 15px 15px',
                                    fontSize: '15px',
                                    animation: 'shine 2s infinite linear',
                                    backgroundSize: '200% 200%',
                                  }}
                                >
                                  View Product⚡
                                </button>
                                <div className="quick-engine-suggestions mt-4">
                                <div
                                  className="flex overflow-x-auto space-x-4"
                                  style={{ maxHeight: '220px' }}
                                >
                                  {isFetchingProductsMap[message.id] ? (
                                    // Show loading shimmer
                                    Array.from({ length: 5 }).map((_, index) => (
                                      <div
                                        key={index}
                                        className="flex-shrink-0 w-40 h-36 border rounded-lg p-2 relative overflow-hidden"
                                        style={{
                                          background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
                                          backgroundSize: '200% 100%',
                                          animation: 'shimmer 2s infinite linear',
                                        }}
                                      >
                                        <style jsx>{`
                                          @keyframes shimmer {
                                            0% {
                                              background-position: 200% 0;
                                            }
                                            100% {
                                              background-position: -200% 0;
                                            }
                                          }
                                        `}</style>
                                      </div>
                                    ))
                                  ) : (
                                    // Render actual product cards
                                    productSuggestionsMap[message.id]?.map((product) => (
                                      <div
                                        key={product.product_id}
                                        className="flex-shrink-0 w-40 border rounded-lg p-2 cursor-pointer hover:shadow-lg bg-white"
                                        onClick={() => openModal(product)}
                                      >
                                        <img
                                          src={product.cover_image_url}
                                          alt={product.name}
                                          className="w-full h-24 object-contain rounded"
                                        />
                                        <p className="text-sm font-semibold mt-2 truncate">{product.name}</p>
                                        <p className="text-sm text-gray-600">{product.price}</p>
                                        <div className="quickpay-monthly">
                                            <div>
                                              {Math.round(parseFloat(product.price.replace(/[^0-9.-]+/g, '')) / 24)} kr
                                            </div>
                                            <div>
                                              <svg
                                                width="15"
                                                height="20"
                                                viewBox="0 0 19 20"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                              >
                                                <path
                                                  d="M16.443 -9.15527e-05H12.0894C12.0894 3.57134 9.89835 6.77134 6.56912 9.05705L5.26019 9.97134V-9.15527e-05H0.73584V19.9999H5.26019V10.0856L12.7439 19.9999H18.2641L11.065 10.5142C14.3374 8.14277 16.4715 4.45705 16.443 -9.15527e-05Z"
                                                  fill="#0B051D"
                                                ></path>
                                              </svg>
                                            </div>
                                          </div>
                                      </div>
                                    ))
                                  )}
                                </div>


                                      <ProductDetailModal
                                        product={selectedProduct}
                                        isOpen={isModalOpen}
                                        onClose={closeModal}
                                      />
                                    </div>
                              </>
                            )}
                          </div>
                        ) : (
                          <UserMessage message={message} />
                        )}
                      </div>

                    </motion.div>
                  ))}
                </AnimatePresence>
                {isTyping && (
                  <div className="flex justify-start mb-4">
                    <TypingIndicator />
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="fixed bottom-0 left-0 right-0 flex-shrink-0 bg-gradient-to-t from-white via-white/95 to-transparent pb-6 pt-4">
        <div className="max-w-4xl mx-auto px-4">
          <ChatInput onSendMessage={sendMessage} isLoading={isLoading} />
        </div>
      </div>

      <SearchOverlay 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)}
        initialSearchQuery={searchQuery}
        shouldTriggerSearch={shouldTriggerSearch}
      />
    </div>
  );
};

export default ChatWindow;
