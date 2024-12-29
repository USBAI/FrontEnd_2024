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
  
      const data: ApiResponse = await response.json();
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
        additional_data: data.additional_data // Store additional_data in the message
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
                additional_data: data.additional_data // Make sure additional_data persists
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
            <div className="w-full relative">
              <div className="flex items-center justify-center h-full w-full mx-auto overflow-x-auto space-x-4 px-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent no-scrollbar">
                {['Category 1', 'Category 2', 'Category 3'].map((category, index) => (
                  <button
                    key={index}
                    onClick={() => handleViewProduct(category)}
                    className="px-4 py-2 bg-blue-500 text-white rounded-full whitespace-nowrap flex-shrink-0"
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
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
                            {/* View Button - Show only when additional_data contains product and open is true */}
                            {message.additional_data?.product && message.additional_data?.open && (
                              <button>
                                <br />
                                <span
                                  onClick={() => handleViewProduct(message.additional_data?.product || '')}
                                  className="view-product-engine"
                                >
                                  View Product⚡
                                </span>
                              </button>
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