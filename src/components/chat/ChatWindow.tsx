import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, Sparkles, Edit2, Check, X } from 'lucide-react';
import ChatInput from './ChatInput';

interface Message {
  content: string;
  type: 'user' | 'bot';
  id: string;
  image?: string;
  status?: 'sending' | 'processing' | 'complete';
  isEditing?: boolean;
}

const ChatWindow = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [userHistory, setUserHistory] = useState('');
  const [editingContent, setEditingContent] = useState('');
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
          status: 'complete'
        }
      ]);
    }
  }, []);

  const startEditing = (messageId: string, content: string) => {
    setMessages(prev => prev.map(msg => 
      msg.id === messageId ? { ...msg, isEditing: true } : msg
    ));
    setEditingContent(content);
  };

  const saveEdit = async (messageId: string) => {
    if (!editingContent.trim()) return;

    const editedMessage = messages.find(m => m.id === messageId);
    if (!editedMessage) return;

    setMessages(prev => prev.map(msg =>
      msg.id === messageId ? { ...msg, content: editingContent, isEditing: false } : msg
    ));

    // Resend the edited message to get new response
    setIsLoading(true);
    try {
      const response = await fetch('https://engine1-f36f7fb18f56.herokuapp.com/textbase_api/chatbot/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user_input: editingContent,
          user_history: userHistory,
          user_id: 'ckWh4hcLqQD4DLioKvyIZubI9r2qL0pkEx9D'
        })
      });

      const data = await response.json();
      setUserHistory(data.updated_user_history);

      // Update bot's response
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

  const cancelEdit = (messageId: string) => {
    setMessages(prev => prev.map(msg =>
      msg.id === messageId ? { ...msg, isEditing: false } : msg
    ));
    setEditingContent('');
  };

  const sendMessage = async (text: string, image?: File) => {
    if (!text.trim() && !image) return;

    // Immediately add user message to the chat
    const messageId = Date.now().toString();
    const userMessage: Message = {
      content: text,
      type: 'user',
      id: messageId,
      image: image ? URL.createObjectURL(image) : undefined,
      status: 'complete'
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

      // Add bot's response
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
        className="flex-1 overflow-y-auto"
        style={{
          scrollBehavior: 'smooth',
          WebkitOverflowScrolling: 'touch'
        }}
      >
        <div className="min-h-full flex flex-col justify-end px-4 md:px-6 pb-24 pt-4">
          <AnimatePresence initial={false}>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'} mb-4 max-w-full`}
              >
                {message.type === 'bot' && (
                  <div className="flex-shrink-0 mr-2">
                    <img
                      src="https://www.kluret.se/static/media/kluret_wt.ad13e882d6d5f566612d2b35479039fd.svg"
                      alt="Kluret"
                      className="w-[10px] h-[10px]"
                    />
                  </div>
                )}
                <div
                  className={`rounded-2xl px-4 py-3 ${
                    message.type === 'user'
                      ? 'bg-white/10 backdrop-blur-sm text-white border border-white/20 ml-auto max-w-[85%] group relative'
                      : 'bg-gray-800/50 backdrop-blur-xl border border-white/10 max-w-[85%]'
                  }`}
                >
                  {message.image && (
                    <div className="relative group mb-2">
                      <img
                        src={message.image}
                        alt="Uploaded"
                        className="max-h-48 rounded-lg mx-auto"
                      />
                      {message.status === 'processing' && (
                        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm rounded-lg flex items-center justify-center">
                          <div className="flex flex-col items-center gap-2">
                            <Sparkles className="h-6 w-6 text-blue-400 animate-pulse" />
                            <p className="text-xs text-blue-200">AI Processing Image...</p>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                  <div className="relative">
                    {message.type === 'user' && message.isEditing ? (
                      <div className="flex flex-col gap-2">
                        <textarea
                          value={editingContent}
                          onChange={(e) => setEditingContent(e.target.value)}
                          className="w-full bg-white/5 border border-white/10 rounded-lg p-2 text-base md:text-lg text-white resize-none focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                          rows={3}
                          autoFocus
                        />
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => cancelEdit(message.id)}
                            className="p-1 hover:bg-white/10 rounded-full"
                          >
                            <X className="h-4 w-4 text-red-400" />
                          </button>
                          <button
                            onClick={() => saveEdit(message.id)}
                            className="p-1 hover:bg-white/10 rounded-full"
                          >
                            <Check className="h-4 w-4 text-green-400" />
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="relative group">
                        <p className={`whitespace-pre-wrap font-medium ${
                          message.type === 'user' ? 'text-base md:text-lg' : 'text-xs md:text-sm'
                        }`}>
                          {message.content}
                        </p>
                        {message.type === 'user' && (
                          <button
                            onClick={() => startEditing(message.id, message.content)}
                            className="absolute -right-8 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-white/5 opacity-0 group-hover:opacity-100 hover:bg-white/10 transition-all"
                          >
                            <Edit2 className="h-3.5 w-3.5 text-white/70" />
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-gray-900 via-gray-900/95 to-transparent">
        <div className="max-w-[800px] mx-auto px-4 pb-4">
          <ChatInput onSendMessage={sendMessage} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;