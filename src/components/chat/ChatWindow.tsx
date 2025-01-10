import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ChatInput from './ChatInput';
import BotMessage from './components/BotMessage';
import UserMessage from './components/UserMessage';
import SearchOverlay from '../search/SearchOverlay';
import { Message } from './types';

// Add interface for API response
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
  <div className="flex flex-col gap-2 min-h-[20px] p-2">
    <p className='text-white'>ppppppppppppppppppppppppppppppppppppppppppppppppppppppppp</p>
    <div className="h-[5px] w-[90%] bg-gradient-to-r from-gray-200 via-gray-600 to-gray-200 rounded-full animate-[pulse_1s_ease-in-out_infinite] opacity-100"></div>
    <div className="h-[5px] w-[75%] bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-full animate-[pulse_1s_ease-in-out_infinite] animation-delay-300 opacity-100"></div>
    <div className="h-[5px] w-[60%] bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-full animate-[pulse_1s_ease-in-out_infinite] animation-delay-600 opacity-100"></div>
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
  const [productSuggestions, setProductSuggestions] = useState<Product[]>([]);
  const [isFetchingProducts, setIsFetchingProducts] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const fetchProducts = async (productName: string) => {
    if (isFetchingProducts || !productName.trim()) return; // Prevent multiple requests or empty searches
  
    setIsFetchingProducts(true);
  
    try {
      // Prepare the payload for the API call
      const formData = new FormData();
      formData.append('product_name', productName);
      formData.append('page_index', '1');
      formData.append('min_price', '0');
      formData.append('max_price', '10000');
  
      const response = await fetch('https://engine1-f36f7fb18f56.herokuapp.com/openai_google_computing/jdb/', {
        method: 'POST',
        body: formData,
        headers: {
          'X-CSRFToken': '', // Include CSRF token if required
        },
      });
  
      if (!response.ok) {
        throw new Error(`Failed to fetch products: ${response.statusText}`);
      }
  
      const data = await response.json();
  
      // Transform and filter valid products
      const validProducts = data
        .filter((product: any) => 
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
  
      // Set product suggestions in state
      setProductSuggestions(validProducts);
    } catch (error) {
      console.error('Error fetching product suggestions:', error);
      setProductSuggestions([]);
    } finally {
      setIsFetchingProducts(false);
    }
  };
  

  useEffect(() => {
    const latestMessage = messages[messages.length - 1];
    if (
      latestMessage?.type === 'bot' &&
      latestMessage.additional_data?.product &&
      latestMessage.additional_data.open
    ) {
      fetchProducts(latestMessage.additional_data.product);
    }
  }, [messages]);

  const handleSearchClose = () => {
    setIsSearchOpen(false);
    setSearchQuery('');
    setShouldTriggerSearch(false);
  };

  const handleViewProduct = async (productName: string) => {
    if (!productName.trim()) return;
  
    setProductSuggestions([]); // Clear previous product suggestions
    setSearchQuery(productName);
    setIsSearchOpen(true);
    setShouldTriggerSearch(true);
  
    await fetchProducts(productName); // Fetch suggestions specific to this product name
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
        additional_data: data.additional_data, // Store additional_data in the message
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
                  additional_data: data.additional_data, // Make sure additional_data persists
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
            {/* AI-Powered Insights Card */}
            <div className="border rounded-lg p-4 shadow w-full md:w-80">
              <h3 className="font-semibold">AI-Powered Insights</h3>
              <p className="text-sm text-gray-600">Get tailored recommendations based on your needs.</p>
              <p className="text-sm text-gray-400">Example: Personalized shopping suggestions just for you.</p>
            </div>
            {/* Seamless Integration Card */}
            <div className="border rounded-lg p-4 shadow w-full md:w-80">
              <h3 className="font-semibold">Seamless Integration</h3>
              <p className="text-sm text-gray-600">Connect with various platforms effortlessly.</p>
              <p className="text-sm text-gray-400">Example: Use Kluret AI with your favorite e-commerce tools.</p>
            </div>
          </div>        
        </div>

        <div className="auth-chatwindow-39d34 flex justify-center mt-8">
          <button className="px-0 py-2 bg-gray-700 text-white font-semibold rounded-lg shadow-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 mr-4 transition duration-300">
            Login
          </button>
          <button className="px-0 py-2 bg-gray-200 text-gray-700 font-semibold rounded-lg shadow-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition duration-300">
            Create Account
          </button>
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
                  {message.type === 'bot' && (
                    <div className="flex-shrink-0 mr-2">
                      {/* <div className="w-4 h-4 mt-[5px] rounded-full bg-blue-100 flex items-center justify-center">
                      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="40" height="40" rx="20" fill="url(#paint0_linear_0_1)"/>
                        <rect x="19" y="8" width="18" height="18" rx="9" fill="white"/>
                        <defs>
                        <linearGradient id="paint0_linear_0_1" x1="20" y1="0" x2="20" y2="40" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#C4ABFF"/>
                        <stop offset="1" stop-color="#FF7EBC"/>
                        </linearGradient>
                        </defs>
                      </svg>
                      </div> */}
                    </div>
                  )}
                  <div className="max-w-[95%]">
                    {message.type === 'bot' ? (
                      <div className="relative">
                        <BotMessage 
                          message={message} 
                          onViewProduct={() => handleViewProduct(message.additional_data?.product || '')}
                        />
                        {message.additional_data?.product && message.additional_data?.open && (
                          <div>
                            <button>
                              <br />
                              <span
                                onClick={() => handleViewProduct(message.additional_data?.product || '')}
                                className="view-product-engine"
                              >
                                View Product⚡
                              </span>
                            </button>
                            <div className='quick-engine-sugection'>
                              <div>
                                <span>Quick Sugections</span>
                              </div>
                              <div className="flex overflow-x-auto space-x-4 mt-2" style={{ overflowY: 'auto', maxHeight: '220px' }}>
                                {isFetchingProducts ? (
                                  Array.from({ length: 5 }).map((_, index) => (
                                    <div
                                    key={index}
                                    className="flex-shrink-0 w-40 h-36 border rounded-lg p-2 relative overflow-hidden"
                                    style={{
                                      background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
                                      backgroundSize: '200% 100%',
                                      animation: 'shimmer 2s infinite linear'
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
                                  productSuggestions.map((product) => (
                                    <div
                                      key={product.product_id}
                                      className="flex-shrink-0 w-40 h-fit border rounded-lg p-2 cursor-pointer hover:shadow-lg bg-white"
                                      onClick={() => handleViewProduct(product.name)}
                                    >
                                      <img
                                        src={product.cover_image_url}
                                        alt={product.name}
                                        className="w-full h-24 object-contain rounded"
                                      />
                                      <p className="text-sm font-semibold mt-2 truncate">{product.name}</p>
                                      <p className="text-sm text-gray-600">{product.price}</p>
                                      <div className='quickpay-monthly'>
                                        <div>
                                          {Math.round(parseFloat(product.price.replace(/[^0-9.-]+/g, '')) / 24)} kr
                                        </div>
                                        <div>
                                          <svg width="15" height="20" viewBox="0 0 19 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16.443 -9.15527e-05H12.0894C12.0894 3.57134 9.89835 6.77134 6.56912 9.05705L5.26019 9.97134V-9.15527e-05H0.73584V19.9999H5.26019V10.0856L12.7439 19.9999H18.2641L11.065 10.5142C14.3374 8.14277 16.4715 4.45705 16.443 -9.15527e-05Z" fill="#0B051D"></path></svg>
                                        </div>
                                      </div>
                                    </div>
                                  ))
                                )}
                              </div>
                            </div>
                          </div>
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
    onClose={handleSearchClose}
    initialSearchQuery={searchQuery}
    shouldTriggerSearch={shouldTriggerSearch}
  />
</div>

  );
};

export default ChatWindow;
