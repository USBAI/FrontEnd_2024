import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, Sparkles } from 'lucide-react';
import ChatInput from './ChatInput';

interface Message {
  content: string;
  type: 'user' | 'bot';
  id: string;
  image?: string;
  status?: 'sending' | 'processing' | 'complete';
}

const ChatWindow = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [userHistory, setUserHistory] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async (text: string, image?: File) => {
    if (!text.trim() && !image) return;

    const messageId = Date.now().toString();
    const userMessage: Message = {
      content: text,
      type: 'user',
      id: messageId,
      image: image ? URL.createObjectURL(image) : undefined,
      status: 'sending'
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
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            user_input: text,
            user_history: userHistory,
            user_id: 'ckWh4hcLqQD4DLioKvyIZubI9r2qL0pkEx9D'
          })
        });
      }

      const data = await response.json();
      setUserHistory(data.updated_user_history);

      setMessages(prev => 
        prev.map(msg => 
          msg.id === messageId ? { ...msg, status: 'complete' } : msg
        )
      );

      const botMessage: Message = {
        content: data.response,
        type: 'bot',
        id: Date.now().toString(),
        status: 'complete'
      };

      setMessages(prev => [...prev, botMessage]);
      scrollToBottom();
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full relative">
      <div 
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto p-6 pb-32 space-y-6"
      >
        <div className="flex flex-col justify-end min-h-full">
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'} mb-4`}
              >
                {message.type === 'bot' && (
                  <img
                    src="https://www.kluret.se/static/media/kluret_wt.ad13e882d6d5f566612d2b35479039fd.svg"
                    alt="Kluret"
                    className="h-8 w-8 mr-2 self-start mt-2"
                  />
                )}
                <div
                  className={`max-w-[80%] rounded-2xl px-6 py-4 ${
                    message.type === 'user'
                      ? 'bg-white/10 backdrop-blur-sm text-white border border-white/20'
                      : 'bg-gray-800/50 backdrop-blur-xl border border-white/10'
                  }`}
                >
                  {message.image && (
                    <div className="relative group mb-4">
                      <img
                        src={message.image}
                        alt="Uploaded"
                        className="max-h-48 rounded-lg mx-auto"
                      />
                      {message.status === 'processing' && (
                        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm rounded-lg flex items-center justify-center">
                          <div className="flex flex-col items-center gap-2">
                            <Sparkles className="h-6 w-6 text-blue-400 animate-pulse" />
                            <p className="text-sm text-blue-200">AI Processing Image...</p>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                  <div className="relative">
                    <TypewriterText text={message.content} isBot={message.type === 'bot'} />
                    {message.status === 'sending' && (
                      <div className="absolute -right-8 top-1/2 -translate-y-1/2">
                        <Loader2 className="h-4 w-4 text-blue-400 animate-spin" />
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        <div ref={messagesEndRef} />
      </div>

      <div className="h-24">
        <ChatInput onSendMessage={sendMessage} isLoading={isLoading} />
      </div>
    </div>
  );
};

const TypewriterText = ({ text, isBot }: { text: string; isBot: boolean }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    if (!isBot) {
      setDisplayText(text);
      return;
    }

    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
        setScale(s => s === 1 ? 1.02 : 1);
      }, 20);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, isBot]);

  useEffect(() => {
    setDisplayText('');
    setCurrentIndex(0);
    setScale(1);
  }, [text]);

  return (
    <motion.p 
      className="whitespace-pre-wrap text-white font-medium"
      animate={{ scale }}
      transition={{ duration: 0.1 }}
    >
      {displayText}
    </motion.p>
  );
};

export default ChatWindow;