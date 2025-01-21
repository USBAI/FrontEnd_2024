import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ChatInput from './ChatInput';
import BotMessage from './components/BotMessage';
import UserMessage from './components/UserMessage';
import SearchOverlay from '../search/SearchOverlay';
import { Message } from './types';

const ProductDetailModal = ({ product, isOpen, onClose }) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        initial={{ y: '100vh' }}
        animate={{ y: '0vh' }}
        exit={{ y: '100vh' }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="fixed bottom-0 left-0 right-0 px-[30px] z-50 rounded-t-lg p-4"
        style={{ 
          height: '80vh',
          background: 'white'
        }}
      >
        <div className="flex justify-between items-center mb-4">
          <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-200">
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
        <div className="flex flex-col items-center">
          <img
            src={product.cover_image_url}
            alt={product.name}
            className="w-cuver h-32 object-contain rounded mb-4"
          />
          <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
          <p className="text-lg text-gray-700 mb-2">{product.price}</p>
          <p className="text-md text-gray-500">
            Klarna: {Math.round(parseFloat(product.price.replace(/[^0-9.-]+/g, '')) / 24)} kr / month
          </p>
        </div>
      </motion.div>
    )}
  </AnimatePresence>
);

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
        'https://engine1-f36f7fb18f56.herokuapp.com/openai_google_computing/jdb/',
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
        formData.append('user_id', 'ckWh4hcLqQD4DLioKvyIZubI9r2qL0pkEx9D');
        formData.append('image', image);

        response = await fetch('https://engine1-f36f7fb18f56.herokuapp.com/imagebase_api_ai/chatbot/', {
          method: 'POST',
          body: formData,
        });
      } else {
        response = await fetch('https://engine1-f36f7fb18f56.herokuapp.com/textbase_api/chatbot/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            user_input: text,
            user_history: userHistory,
            user_id: 'ckWh4hcLqQD4DLioKvyIZubI9r2qL0pkEx9D',
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
