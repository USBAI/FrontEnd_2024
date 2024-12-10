import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ChatInput from './ChatInput';
import MessageBubble from './components/MessageBubble';
import { Message } from './types';
import TypingAnimation from './components/TypingAnimation';
import ImageProcessingOverlay from './components/ImageProcessingOverlay';

const ChatWindow = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [userHistory, setUserHistory] = useState('');
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

  // Initialize with welcome message
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          content: "Hello! I'm Kluret AI. How can I help you today?",
          type: 'bot',
          id: 'welcome',
          status: 'complete',
          isTyping: true
        }
      ]);

      // Simulate typing animation for welcome message
      setTimeout(() => {
        setMessages(prev => prev.map(msg =>
          msg.id === 'welcome' ? { ...msg, isTyping: false } : msg
        ));
      }, 1000);
    }
  }, []);

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

      // Update user message status
      if (image) {
        setMessages(prev => prev.map(msg =>
          msg.id === messageId ? { ...msg, status: 'complete' } : msg
        ));
      }

      // Add bot's response with typing animation
      const botMessage: Message = {
        content: data.response,
        type: 'bot',
        id: Date.now().toString(),
        status: 'complete',
        isTyping: true
      };

      setMessages(prev => [...prev, botMessage]);
      scrollToBottom();

      // Simulate typing animation
      const typingDuration = Math.min(data.response.length * 20, 2000);
      setTimeout(() => {
        setMessages(prev => prev.map(msg =>
          msg.id === botMessage.id ? { ...msg, isTyping: false } : msg
        ));
      }, typingDuration);

    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[100vh] h-[100svh] bg-gradient-to-br from-gray-900 via-gray-900 to-black">
      <div
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent pb-32 md:pb-24"
      >
        <div className="max-w-4xl mx-auto px-4 py-6">
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
                    <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                      <img
                        src="https://www.kluret.se/static/media/kluret_wt.ad13e882d6d5f566612d2b35479039fd.svg"
                        alt="Kluret"
                        className="w-4 h-4"
                      />
                    </div>
                  </div>
                )}
                <div className="max-w-[80%]">
                  <MessageBubble message={message} />
                  {message.image && message.status === 'processing' && (
                    <ImageProcessingOverlay image={message.image} />
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-gray-900 via-gray-900/95 to-transparent">
        <div className="max-w-4xl mx-auto px-4 pb-6">
          <ChatInput onSendMessage={sendMessage} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;