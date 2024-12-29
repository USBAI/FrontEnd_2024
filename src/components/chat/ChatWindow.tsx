import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ChatInput from './ChatInput';
import BotMessage from './components/BotMessage';
import UserMessage from './components/UserMessage';
import SearchOverlay from '../search/SearchOverlay';
import { Message } from './types';

interface Product {
  name: string;
  price: string;
  product_id: string;
  cover_image_url: string;
  product_page_url: string;
}

const QuickSuggestions = ({ onSelect }: { onSelect: (suggestion: string) => void }) => (
  <div className="w-full relative">
    <div className="flex items-center justify-center h-full w-full mx-auto overflow-x-auto space-x-4 px-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent no-scrollbar">
      {[
        'Nike Shoes',
        'Adidas Shoes',
        'Running Shoes',
        'Sports Wear',
        'Training Shoes',
        'Casual Shoes'
      ].map((suggestion, index) => (
        <button
          key={index}
          onClick={() => onSelect(suggestion)}
          className="px-4 py-2 bg-blue-500 text-white rounded-full whitespace-nowrap flex-shrink-0 hover:bg-blue-600 transition-colors"
        >
          {suggestion}
        </button>
      ))}
    </div>
  </div>
);

const ProductList = ({ products }: { products: Product[] }) => (
  <div className="relative w-full mt-4">
    <div className="flex overflow-x-auto space-x-4 pb-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
      {products.map((product, index) => (
        <div 
          key={product.product_id} 
          className="flex-shrink-0 w-48 bg-white rounded-lg shadow-md overflow-hidden"
        >
          <div className="relative h-48 w-full">
            {product.cover_image_url ? (
              <img
                src={product.cover_image_url}
                alt={product.name}
                className="object-cover w-full h-full"
              />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                <span className="text-gray-400">No image</span>
              </div>
            )}
          </div>
          <div className="p-3">
            <h3 className="text-sm font-medium text-gray-900 truncate">
              {product.name || 'Product Name'}
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              {product.price || 'Price not available'}
            </p>
            {product.product_page_url && (
              <a
                href={product.product_page_url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 block text-center text-sm text-blue-500 hover:text-blue-600"
              >
                View Details
              </a>
            )}
          </div>
        </div>
      ))}
    </div>
  </div>
);

const TypingIndicator = () => (
  <div className="flex items-center space-x-1">
    <span className="dot bg-gray-400 rounded-full w-2 h-2 animate-bounce"></span>
    <span className="dot bg-gray-400 rounded-full w-2 h-2 animate-bounce delay-200"></span>
    <span className="dot bg-gray-400 rounded-full w-2 h-2 animate-bounce delay-400"></span>
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
  const [isLoadingProducts, setIsLoadingProducts] = useState(false);
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

  const handleViewProduct = (product: string) => {
    setIsSearchOpen(true);
    setSearchQuery(product);
    setShouldTriggerSearch(true);
  };

  const handleSearchClose = () => {
    setIsSearchOpen(false);
    setSearchQuery('');
    setShouldTriggerSearch(false);
  };

  const fetchProducts = async (productName: string, messageId: string) => {
    setIsLoadingProducts(true);
    try {
      const response = await fetch('https://engine1-f36f7fb18f56.herokuapp.com/openai_google_computing/jdb/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          product_name: productName,
          page_index: 1,
          min_price: 0,
          max_price: 10000
        })
      });

      const products: Product[] = await response.json();
      
      setMessages(prev => prev.map(msg =>
        msg.id === messageId
          ? { ...msg, products: products }
          : msg
      ));

    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setIsLoadingProducts(false);
    }
  };

  const handleQuickSuggestion = (suggestion: string) => {
    sendMessage(suggestion);
  };

  const sendMessage = async (text: string, image?: File) => {
    if (!text.trim() && !image) return;
  
    const messageId = Date.now().toString();
    const userMessage: Message = {
      content: text,
      type: 'user',
      id: messageId,
      image: image ? URL.createObjectURL(image) : undefined,
      status: image ? 'processing' : 'complete'
    };
  
    setMessages(prev => [...prev, userMessage]);
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
          body: formData
        });
      } else {
        response = await fetch('https://engine1-f36f7fb18f56.herokuapp.com/textbase_api/chatbot/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            user_input: text,
            user_history: userHistory,
            user_id: 'ckWh4hcLqQD4DLioKvyIZubI9r2qL0pkEx9D'
          })
        });
      }
  
      const data = await response.json();
      setUserHistory(data.updated_user_history);
  
      if (image) {
        setMessages(prev => prev.map(msg =>
          msg.id === messageId ? { ...msg, status: 'complete' } : msg
        ));
      }
  
      const botMessage: Message = {
        content: "",
        type: 'bot',
        id: Date.now().toString(),
        status: 'complete',
        isTyping: true,
        additional_data: data.additional_data
      };
  
      setMessages(prev => [...prev, botMessage]);
      scrollToBottom();
  
      const typingDuration = 4000;
      const typingInterval = typingDuration / data.response.length;
  
      let currentCharIndex = 0;
      const typingIntervalId = setInterval(() => {
        setMessages(prev => prev.map(msg =>
          msg.id === botMessage.id
            ? { 
                ...msg, 
                content: data.response.slice(0, currentCharIndex + 1),
                additional_data: data.additional_data
              }
            : msg
        ));
  
        currentCharIndex += 1;
        if (currentCharIndex >= data.response.length) {
          clearInterval(typingIntervalId);
          setMessages(prev => prev.map(msg =>
            msg.id === botMessage.id ? { ...msg, isTyping: false } : msg
          ));
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
    <div className="relative flex flex-col h-[100vh] h-[100svh] bg-gray-50">
      <div className="h-16 flex-shrink-0" />
      <div className="relative flex-1 min-h-0">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full w-full mx-auto">
            <img
              src="/path/to/your/logo.svg"
              alt="Logo"
              className="w-24 h-24 mb-4"
            />
            <p className="text-gray-500 mb-4">Find what you are looking for</p>
            <QuickSuggestions onSelect={handleQuickSuggestion} />
          </div>
        ) : (
          <div
            ref={chatContainerRef}
            className="absolute inset-0 overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent"
          >
            <div className="relative min-h-full flex flex-col justify-end">
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
                          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                            <img
                              src="https://www.kluret.se/static/media/kluret_wt.ad13e882d6d5f566612d2b35479039fd.svg"
                              alt="Kluret"
                              className="w-4 h-4"
                            />
                          </div>
                        </div>
                      )}
                      <div className="max-w-[80%]">
                        {message.type === 'bot' ? (
                          <div className="relative">
                            <BotMessage 
                              message={message} 
                              onViewProduct={handleViewProduct}
                            />
                            {message.additional_data?.product && message.additional_data?.open && (
                              <>
                                <button
                                  onClick={() => fetchProducts(message.additional_data?.product || '', message.id)}
                                  className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                                >
                                  View Product
                                </button>
                                {isLoadingProducts && (
                                  <div className="mt-2 text-sm text-gray-500">
                                    Loading products...
                                  </div>
                                )}
                                {message.products && message.products.length > 0 && (
                                  <ProductList products={message.products} />
                                )}
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
                    <div className="flex-shrink-0 mr-2">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                        <img
                          src="https://www.kluret.se/static/media/kluret_wt.ad13e882d6d5f566612d2b35479039fd.svg"
                          alt="Kluret"
                          className="w-4 h-4"
                        />
                      </div>
                    </div>
                    <TypingIndicator />
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="flex-shrink-0 bg-gradient-to-t from-white via-white/95 to-transparent pb-6 pt-4">
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